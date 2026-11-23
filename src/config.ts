// Replace null with the official asset URL when supplied. Never substitute fictional portraits.
export const brand = {
  logo: "/images/hook-logo.jpeg",
  copyrightYear: 2026,
};

export const team = [
  {
    name: "Nirmal Kalubowila",
    role: "Scrum Master",
    initials: "NK",
    photo: "public/images/team/Nirmal.jpeg",
  },
  {
    name: "Pasan Munasinghe",
    role: "Product Owner",
    initials: "PM",
    photo: "public/images/team/Pasan.png",
  },
  {
    name: "Rumeth Renuja",
    role: "Developer",
    initials: "RR",
    photo: "public/images/team/Rumeth.jpeg",
  },
  {
    name: "Sanuthmi Rasanga",
    role: "Developer",
    initials: "SR",
    photo: "public/images/team/Rasanga.jpeg",
  },
  {
    name: "Nindya Kotuwila",
    role: "Developer",
    initials: "NK",
    photo: "public/images/team/Nindya.jpeg",
  },
];

const destination = (value: string | undefined) => {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
};

export const destinations = {
  login: destination(import.meta.env.VITE_LOGIN_URL),
  signup: destination(import.meta.env.VITE_SIGNUP_URL),
  recruiter: destination(import.meta.env.VITE_RECRUITER_URL),
  privacy: destination(import.meta.env.VITE_PRIVACY_URL),
  terms: destination(import.meta.env.VITE_TERMS_URL),

};
export type Destination = keyof typeof destinations;

export const notices: Record<Destination, { title: string; body: string }> = {
  login: {
    title: "Your HOOK workspace is on its way.",
    body: "Login is not available from this preview yet. Explore the platform below to see how HOOK brings your career journey together.",
  },
  signup: {
    title: "Your next chapter is coming.",
    body: "HOOK registration is not open from this page yet. Explore the features and plans while we prepare the next step in your career journey.",
  },
  recruiter: {
    title: "A better way to recruit is coming.",
    body: "Recruiter onboarding is not available from this preview yet. Explore the recruitment workspace and planned tools on this page.",
  },
  privacy: {
    title: "Privacy policy coming soon.",
    body: "The official privacy policy has not been published here yet. HOOK uses the contact details and message you submit to respond to your inquiry.",
  },
  terms: {
    title: "Terms of service coming soon.",
    body: "The official terms of service will be linked here when available. This page is a product preview; it does not create an account or a subscription.",
  },

};
