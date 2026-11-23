import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { readConfig } from "../server/config.mjs";
import { createApp, verifyCaptcha } from "../server/app.mjs";
import { email } from "../shared/inquiry.mjs";

const config = readConfig({
  SMTP_USER: email,
  SMTP_PASSWORD: "fixture",
  RECAPTCHA_SECRET_KEY: "fixture",
});
const inquiry = () => ({
  name: "Alex <Lee>",
  email: "alex@example.org",
  phone: "+94 (77) 123-4567",
  description: "First line\nA & B < C",
  token: "fixture",
  requestId: randomUUID(),
});
async function endpoint(t, options = {}, settings = config) {
  const sent = [];
  const server = createApp(settings, {
    verify: async () => true,
    send: async (msg) => sent.push(msg),
    ...options,
  }).listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => server.close(resolve)));
  return {
    sent,
    post: (data) =>
      fetch("http://127.0.0.1:" + server.address().port + "/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
  };
}
test("missing configuration disables submissions and malformed settings are identified", async (t) => {
  const settings = readConfig({
    SMTP_PORT: "invalid",
    SMTP_SECURE: "sometimes",
    NODE_ENV: "production",
  });
  for (const name of [
    "SMTP_USER",
    "SMTP_PASSWORD",
    "RECAPTCHA_SECRET_KEY",
    "RECAPTCHA_HOSTNAMES",
    "SMTP_PORT",
    "SMTP_SECURE",
  ])
    assert.ok(settings.problems.includes(name));
  const { post, sent } = await endpoint(t, {}, settings);
  assert.equal((await post(inquiry())).status, 503);
  assert.equal(sent.length, 0);
});
test("required fields, lengths, phone, email and header controls are validated before services", async (t) => {
  const { post, sent } = await endpoint(t, {
    verify: async () => assert.fail(),
  });
  for (const patch of [
    { name: "" },
    { description: "   " },
    { email: "two@example.org,three@example.org" },
    { phone: "abc" },
    { name: "A\r\nB" },
    { description: "x".repeat(3001) },
  ]) {
    const res = await post({ ...inquiry(), ...patch });
    assert.equal(res.status, 422);
    assert.ok((await res.json()).errors[Object.keys(patch)[0]]);
  }
  assert.equal(sent.length, 0);
});
test("siteverify receives the secret via POST and enforces hostname, expiry and Google success", async () => {
  for (const [body, ok] of [
    [{ success: true, hostname: "localhost" }, true],
    [{ success: true, hostname: "elsewhere" }, false],
    [{ success: false, "error-codes": ["timeout-or-duplicate"] }, false],
  ]) {
    assert.equal(
      await verifyCaptcha("sample", config, async (url, opts) => {
        assert.equal(url, "https://www.google.com/recaptcha/api/siteverify");
        assert.equal(opts.method, "POST");
        assert.equal(opts.body.get("secret"), config.secret);
        assert.equal(opts.body.get("response"), "sample");
        return Response.json(body);
      }),
      ok,
    );
  }
});
test("missing or invalid verification cannot send email", async (t) => {
  let calls = 0;
  const { post, sent } = await endpoint(t, {
    verify: async () => {
      calls++;
      return false;
    },
  });
  for (const token of ["", "invalid"]) {
    assert.equal((await post({ ...inquiry(), token })).status, 422);
  }
  assert.equal(calls, 1);
  assert.deepEqual(sent, []);
});
test("successful receipt sends two distinct escaped multipart messages, with idempotent retries", async (t) => {
  const { post, sent } = await endpoint(t);
  const data = inquiry();
  const result = { received: true, acknowledged: true };
  assert.deepEqual(await (await post(data)).json(), result);
  assert.deepEqual(await (await post(data)).json(), result);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to, email);
  assert.equal(sent[0].replyTo, data.email);
  assert.equal(sent[1].to, data.email);
  assert.equal(sent[1].subject, "We've Received Your Inquiry | HOOK");
  for (const m of sent) {
    assert.match(m.html, /Alex &lt;Lee&gt;/);
    assert.ok(m.text.includes(data.name));
    assert.equal(m.from, email);
  }
  assert.match(sent[0].text, /Asia\/Colombo/);
  assert.match(sent[0].html, /A &amp; B &lt; C/);
});
test("admin failure blocks acknowledgement; acknowledgement failure preserves original receipt", async (t) => {
  for (const failAt of [1, 2]) {
    let calls = 0;
    const { post } = await endpoint(t, {
      send: async () => {
        if (++calls === failAt) throw Error();
      },
    });
    const data = inquiry();
    const res = await post(data);
    if (failAt === 1) {
      assert.equal(res.status, 503);
      assert.equal(calls, 1);
    } else {
      assert.deepEqual(await res.json(), {
        received: true,
        acknowledged: false,
      });
      await post(data);
      assert.equal(calls, 2);
    }
  }
});
test("concurrent duplicate requests share one delivery and the endpoint limits body size and rate", async (t) => {
  let release, started;
  const waiting = new Promise((resolve) => {
    started = resolve;
  });
  const { post, sent } = await endpoint(t, {
    verify: async () => {
      started();
      await new Promise((resolve) => {
        release = resolve;
      });
      return true;
    },
  });
  const data = inquiry();
  const first = post(data);
  await waiting;
  try {
    assert.equal((await post(data)).status, 409);
  } finally {
    release();
  }
  assert.equal((await first).status, 200);
  assert.equal(sent.length, 2);
  assert.equal(
    (await post({ ...data, description: "a".repeat(25000) })).status,
    413,
  );
  const limited = await endpoint(t, { maxRequests: 1 });
  await limited.post({});
  assert.equal((await limited.post({})).status, 429);
});
