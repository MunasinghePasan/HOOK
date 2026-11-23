import express from "express";
import { rateLimit } from "express-rate-limit";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { limits, validate } from "../shared/inquiry.mjs";
import { messages } from "./mail.mjs";

export async function verifyCaptcha(token, config, request = fetch) {
  const response = await request(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({ secret: config.secret, response: token }),
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!response.ok) throw new Error("Verification unavailable");
  const data = await response.json();
  return (
    data.success === true &&
    config.domains.includes(data.hostname?.toLowerCase())
  );
}

export function createApp(
  config,
  {
    send,
    verify = verifyCaptcha,
    maxRequests = 10,
    ready = () => !config.problems.length,
  },
) {
  const app = express();
  app.disable("x-powered-by");
  // Same-origin only. Vite proxies this path during development.
  app.get("/api/inquiry/status", async (_req, res) => {
    res.set("Cache-Control", "no-store").json({ available: await ready() });
  });
  const receipts = new Map();
  const lifetime = 30 * 60 * 1000;
  app.post(
    "/api/inquiry",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: maxRequests,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      message: { code: "rate_limit" },
    }),
    express.json({ limit: "24kb" }),
    async (req, res) => {
      res.set("Cache-Control", "no-store");
      if (!req.is("application/json"))
        return res.status(415).json({ code: "json_required" });
      if (config.problems.length)
        return res.status(503).json({ code: "unavailable" });
      const fields = req.body;
      const errors = validate(fields);
      if (Object.keys(errors).length) return res.status(422).json({ errors });
      const { requestId, token } = fields;
      if (
        typeof requestId !== "string" ||
        !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(requestId)
      )
        return res.status(400).json({ code: "invalid_request" });
      const clean = Object.fromEntries(
        Object.keys(limits).map((key) => [key, fields[key].trim()]),
      );
      const digest = createHash("sha256")
        .update(JSON.stringify(clean))
        .digest("hex");
      for (const [id, record] of receipts)
        if (record.expires < Date.now()) receipts.delete(id);
      const existing = receipts.get(requestId);
      if (existing) {
        if (existing.digest !== digest || !existing.result)
          return res.status(409).json({ code: "in_progress" });
        return res.json(existing.result);
      }
      if (typeof token !== "string" || !token.trim() || token.length > 8192)
        return res.status(422).json({ code: "captcha" });
      const record = { digest, expires: Date.now() + lifetime };
      receipts.set(requestId, record);
      try {
        if (!(await verify(token, config)))
          return res.status(422).json({ code: "captcha" });
        const mail = messages(clean, config);
        await send(mail.admin);
        record.result = { received: true, acknowledged: false };
        try {
          await send(mail.acknowledgement);
          record.result.acknowledged = true;
        } catch {
          console.warn("Inquiry acknowledgement was not accepted by SMTP.");
        }
        return res.json(record.result);
      } catch {
        console.warn(
          "Inquiry verification or administrator notification failed.",
        );
        return res.status(503).json({ code: "submission_failed" });
      } finally {
        if (!record.result) receipts.delete(requestId);
      }
    },
  );
  app.use(
    express.static(fileURLToPath(new URL("../dist/", import.meta.url)), {
      dotfiles: "deny",
    }),
  );
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res
      .status(err.status === 413 ? 413 : 400)
      .json({ code: "invalid_request" });
  });
  return app;
}
