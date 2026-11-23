import { useContext, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { brand, destinations, notices } from "../config";
import type { Destination } from "../config";
import { NoticeContext } from "../notice-context";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? "brand-light" : ""}`}
      href="#home"
      aria-label="HOOK home"
    >
      <img src={brand.logo} alt="HOOK" width="930" height="532" />
    </a>
  );
}

export function Action({
  to = "signup",
  children,
  className = "button button-primary",
  arrow = false,
}: {
  to?: Destination;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  const openNotice = useContext(NoticeContext);
  const content = (
    <>
      {children}
      {arrow && <ArrowUpRight size={17} aria-hidden="true" />}
    </>
  );
  return destinations[to] ? (
    <a className={className} href={destinations[to]!}>
      {content}
    </a>
  ) : (
    <button className={className} onClick={() => openNotice(to)}>
      {content}
    </button>
  );
}

export function NoticeDialog({
  kind,
  onClose,
}: {
  kind: Destination | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !kind) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [kind]);
  return (
    <dialog
      ref={ref}
      className="notice-dialog"
      aria-labelledby="notice-title"
      aria-describedby="notice-body"
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {kind && (
        <div className="notice-inner">
          <button
            className="icon-button dialog-close"
            onClick={onClose}
            aria-label="Close notice"
            autoFocus
          >
            <X size={22} />
          </button>
          <span className="eyebrow">THE NEXT CHAPTER</span>
          <h2 id="notice-title">{notices[kind].title}</h2>
          <p id="notice-body">{notices[kind].body}</p>
          <button className="button button-primary" onClick={onClose}>
            Keep exploring <ArrowUpRight size={17} />
          </button>
        </div>
      )}
    </dialog>
  );
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="eyebrow">
        <span />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function Checklist({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <ul className={`checklist ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <Check size={16} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function DemoLabel({ dark = false }: { dark?: boolean }) {
  return (
    <p className={`demo-label ${dark ? "demo-label-dark" : ""}`}>
      <span />
      Product preview · Illustrative data
    </p>
  );
}

export function Pill({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "mint" | "amber" | "gray";
}) {
  return <span className={`pill pill-${tone}`}>{children}</span>;
}
