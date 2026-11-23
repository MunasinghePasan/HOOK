import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Mail, Send } from "lucide-react";
import { SectionHeading, Reveal } from "./UI";
import { email, limits, validate } from "../../shared/inquiry.mjs";
import type { Fields } from "../../shared/inquiry.mjs";
import "./inquiry.css";

const empty: Fields = { name: "", email: "", phone: "", description: "" };
const fields = [
  {
    key: "name",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
    autoComplete: "name",
  },
  {
    key: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    type: "email",
    autoComplete: "email",
  },
  {
    key: "phone",
    label: "Contact Number",
    placeholder: "Enter your contact number",
    type: "tel",
    autoComplete: "tel",
  },
  {
    key: "description",
    label: "Inquiry Description",
    placeholder: "Tell us how we can help you...",
    type: "textarea",
    autoComplete: "off",
  },
] as const;
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY?.trim();
const failure =
  "We couldn't submit your inquiry right now. Please try again shortly.";

function InquiryForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [challengeUsed, setChallengeUsed] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    async function check() {
      try {
        const response = await fetch("/api/inquiry/status", {
          signal: controller.signal,
        });
        const result = await response.json();
        if (!controller.signal.aborted)
          setAvailable(response.ok && result.available === true);
      } catch {
        if (!controller.signal.aborted) setAvailable(false);
      }
    }
    if (siteKey) void check();
    return () => controller.abort();
  }, []);
  const widget = useRef<ReCAPTCHA>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [captchaSize, setCaptchaSize] = useState<"normal" | "compact" | null>(
    null,
  );
  const lastSize = useRef<"normal" | "compact" | null>(null);
  useEffect(() => {
    if (!panel.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const size = entry.contentRect.width >= 304 ? "normal" : "compact";
      if (size === lastSize.current) return;
      lastSize.current = size;
      setToken("");
      setChallengeUsed(false);
      setCaptchaSize(size);
    });
    observer.observe(panel.current);
    return () => observer.disconnect();
  }, [available]);
  const lock = useRef(false);
  const requestId = useRef("");
  function restartChallenge() {
    widget.current?.reset();
    setToken("");
    setChallengeUsed(false);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const problems = validate(values);
    setErrors(problems);
    setStatus("");
    const first = Object.keys(problems)[0];
    if (first) {
      (event.currentTarget.elements.namedItem(first) as HTMLElement)?.focus();
      return;
    }
    if (!available || !siteKey || !token || challengeUsed) {
      setStatus(
        siteKey
          ? "Complete the verification before submitting."
          : "Online inquiries are unavailable. Please email our team.",
      );
      return;
    }
    lock.current = true;
    setBusy(true);
    try {
      requestId.current ||= crypto.randomUUID();
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          token,
          requestId: requestId.current,
        }),
      });
      const result = await response.json();
      if (response.ok && result.received === true) {
        setStatus(
          result.acknowledged === true
            ? "Thank you for contacting HOOK! Your inquiry has been received successfully. Our team will get back to you as soon as possible. A confirmation email has been sent to your email address."
            : "Thank you for contacting HOOK! Your inquiry was received, but we couldn't send your confirmation email.",
        );
        setValues(empty);
        requestId.current = "";
        restartChallenge();
      } else {
        setStatus(
          result.code === "captcha"
            ? "Verification expired or could not be confirmed. Please verify again."
            : response.status === 429
              ? "Too many attempts. Please try again in 15 minutes."
              : failure,
        );
        if (result.errors) setErrors(result.errors);
        setChallengeUsed(true);
      }
    } catch {
      setStatus(failure);
      setChallengeUsed(true);
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <form
      className="inquiry-form"
      aria-label="Website inquiry"
      noValidate
      onSubmit={submit}
    >
      {fields.map(({ key, label, placeholder, type, autoComplete }) => {
        const props = {
          id: "inquiry-" + key,
          name: key,
          placeholder,
          autoComplete,
          required: true,
          maxLength: limits[key],
          disabled: busy,
          value: values[key],
          "aria-invalid": Boolean(errors[key]),
          "aria-describedby": errors[key] ? "error-" + key : undefined,
          onChange: (
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            setValues({ ...values, [key]: e.target.value });
            setErrors({ ...errors, [key]: undefined });
            setStatus("");
            requestId.current = "";
          },
        };
        return (
          <div className="inquiry-field" key={key}>
            <label htmlFor={props.id}>{label}</label>
            {type === "textarea" ? (
              <textarea {...props} rows={5} />
            ) : (
              <input {...props} type={type} />
            )}
            {errors[key] && (
              <span id={"error-" + key} className="field-error">
                {errors[key]}
              </span>
            )}
          </div>
        );
      })}
      {siteKey && available === null ? (
        <p role="status">Checking inquiry availability…</p>
      ) : siteKey && available ? (
        <div className="captcha-box" ref={panel}>
          {captchaSize && (
            <ReCAPTCHA
              key={captchaSize}
              ref={widget}
              sitekey={siteKey}
              size={captchaSize}
              onChange={(value) => {
                setToken(value || "");
                setStatus("");
              }}
              onExpired={() => {
                setToken("");
                setChallengeUsed(true);
                setStatus("Verification expired. Please verify again.");
              }}
              onErrored={() => {
                setToken("");
                setChallengeUsed(true);
                setStatus(
                  "Verification couldn't load. Try again or email our team.",
                );
              }}
            />
          )}
          {!token && (
            <p className="inquiry-privacy">
              Complete the Google verification to enable submission.
            </p>
          )}
          {challengeUsed && (
            <button
              type="button"
              className="text-link"
              onClick={restartChallenge}
              disabled={busy}
            >
              Verify again
            </button>
          )}
        </div>
      ) : (
        <p className="inquiry-unavailable">
          Online inquiries are currently unavailable.{" "}
          <a href={"mailto:" + email}>Email the HOOK team</a>.
        </p>
      )}
      <p className="inquiry-privacy">
        HOOK uses these details to respond to your inquiry. Google reCAPTCHA
        helps protect this form.
      </p>
      <button
        disabled={busy || !siteKey || !available || !token || challengeUsed}
        className="button button-primary"
        type="submit"
      >
        {busy ? "Sending inquiry…" : "Submit Inquiry"}
        <Send size={16} aria-hidden="true" />
      </button>
      <p className="inquiry-status" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
export function InquirySection() {
  return (
    <section className="section inquiry-section" id="inquiry">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="INQUIRY"
            title="Have a Question? Let's Connect."
            text="Have a question about HOOK, our features or how the platform works? Send us an inquiry and our team will get back to you as soon as possible."
          />
        </Reveal>
        <div className="inquiry-grid">
          <div className="inquiry-info">
            <span className="inquiry-mail-icon">
              <Mail size={27} />
            </span>
            <h3>We're Here to Help.</h3>
            <p>
              Whether you're a job seeker, recruiter or simply exploring HOOK,
              we'd love to hear from you.
            </p>
            <p>Prefer email? Reach us directly.</p>
            <a href={"mailto:" + email}>{email}</a>
          </div>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
