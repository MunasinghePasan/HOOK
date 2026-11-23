import { Instagram, Linkedin, Facebook, Youtube, Mail } from "lucide-react";
import { email, instagram } from "../../shared/inquiry.mjs";

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.5L5.3 22H2.1l8.3-9.5L.8 2h6.5l4.6 6.7L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z" />
    </svg>
  );
}
const profiles: {
  name: string;
  icon: typeof XIcon | typeof Instagram;
  url: string | null;
}[] = [
  { name: "Instagram", icon: Instagram, url: instagram },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/company/hookbysemicolon/",
  },
  { name: "Facebook", icon: Facebook, url: null },
  { name: "YouTube", icon: Youtube, url: null },
  { name: "X", icon: XIcon, url: null },
];
export function FooterContact() {
  return (
    <>
      <a className="footer-email" href={"mailto:" + email}>
        <Mail size={15} />
        {email}
      </a>
      <div className="social-links" aria-label="Social profiles">
        {profiles.map(({ name, icon: Icon, url }) =>
          url ? (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"HOOK on " + name + " (opens in a new tab)"}
            >
              <Icon size={17} />
            </a>
          ) : (
            <span
              key={name}
              role="link"
              aria-disabled="true"
              aria-label={name + " (unavailable)"}
              title={name + " (unavailable)"}
            >
              <Icon size={17} />
            </span>
          ),
        )}
      </div>
    </>
  );
}
