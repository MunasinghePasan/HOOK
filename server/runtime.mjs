import nodemailer from "nodemailer";
import { readConfig } from "./config.mjs";
import { createApp } from "./app.mjs";

export function makeServer(env) {
  const config = readConfig(env);
  if (config.problems.length)
    console.warn(
      "Inquiry unavailable. Configure " + config.problems.join(", "),
    );
  const smtp = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  let check;
  let refreshAt = 0;
  function ready() {
    if (config.problems.length) return false;
    if (Date.now() >= refreshAt) {
      refreshAt = Date.now() + 60000;
      check = smtp
        .verify()
        .then(() => true)
        .catch((error) => {
          console.warn(
            "Inquiry SMTP check failed:",
            error.code || "SMTP unavailable",
          );
          return false;
        });
    }
    return check;
  }
  const app = createApp(config, {
    ready,
    send: async (message) => {
      try {
        const info = await smtp.sendMail(message);
        if (!info.accepted.length) throw new Error("Recipient not accepted");
      } catch (error) {
        refreshAt = 0;
        console.warn(
          "Inquiry SMTP delivery failed:",
          error.code || "recipient unavailable",
        );
        throw error;
      }
    },
  });
  if (env.TRUSTED_PROXY_IP) app.set("trust proxy", env.TRUSTED_PROXY_IP);
  return app;
}
