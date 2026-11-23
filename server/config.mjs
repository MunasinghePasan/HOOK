import { email, validEmail } from "../shared/inquiry.mjs";

export function readConfig(env) {
  const config = {
    user: env.SMTP_USER || "",
    password: env.SMTP_PASSWORD?.trim() || "",
    receiver: env.INQUIRY_RECEIVER_EMAIL || email,
    host: env.SMTP_HOST || "smtp.gmail.com",
    port: Number(env.SMTP_PORT || 465),
    secure: (env.SMTP_SECURE || "true") === "true",
    secret: env.RECAPTCHA_SECRET_KEY?.trim(),
    domains: (
      env.RECAPTCHA_HOSTNAMES ||
      (env.NODE_ENV === "production" ? "" : "localhost,127.0.0.1")
    )
      .toLowerCase()
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
  };
  const problems = [];
  if (!validEmail(config.user)) problems.push("SMTP_USER");
  if (!validEmail(config.receiver)) problems.push("INQUIRY_RECEIVER_EMAIL");
  if (!config.password) problems.push("SMTP_PASSWORD");
  if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535)
    problems.push("SMTP_PORT");
  if (!["true", "false"].includes(env.SMTP_SECURE || "true"))
    problems.push("SMTP_SECURE");
  if (!config.secret) problems.push("RECAPTCHA_SECRET_KEY");
  if (!config.domains.length) problems.push("RECAPTCHA_HOSTNAMES");
  return { ...config, problems };
}
