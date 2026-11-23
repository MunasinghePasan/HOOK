import { FooterContact } from "./SocialLinks";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  CircleCheck,
  ClipboardList,
  FileText,
  Layers3,
  Link2,
  Menu,
  MessageSquare,
  MousePointer2,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { brand, team } from "../config";
import {
  Action,
  Brand,
  Checklist,
  DemoLabel,
  Reveal,
  SectionHeading,
} from "./UI";
import {
  AnalyticsMockup,
  BadgeMockup,
  BridgeMockup,
  CatsMockup,
  CVMockup,
  HeroDashboard,
  RecruiterMockup,
  SkillsMockup,
} from "./Mockups";
import { featureIcons } from "../icons";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Recruiters", href: "#recruiters" },
  { label: "Pricing", href: "#pricing" },
  { label: "About Us", href: "#about" },
  { label: "Inquiry", href: "#inquiry" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-12% 0px -62% 0px" },
    );
    navLinks.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 1050) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              className={active === link.href ? "active" : ""}
              aria-current={active === link.href ? "location" : undefined}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Action to="login" className="login-link">
            Log In
          </Action>
          <Action className="button button-primary button-small" arrow>
            Get Started
          </Action>
        </div>
        <button
          ref={menuButton}
          className="menu-toggle icon-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        hidden={!open}
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <a
            href={link.href}
            key={link.href}
            aria-current={active === link.href ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <ArrowUpRight size={16} />
          </a>
        ))}
        <div onClick={() => setOpen(false)}>
          <Action to="login" className="button button-secondary">
            Log In
          </Action>
          <Action arrow>Get Started</Action>
        </div>
      </nav>
    </header>
  );
}

export function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="hero-copy">
          <span className="hero-tag">
            <span /> A clearer path to your next chapter{" "}
            <ArrowUpRight size={13} />
          </span>
          <h1>
            Find Your Next
            <br /> <span>Opportunity</span> Here.
          </h1>
          <p>
            Your career journey, organised in one place. Discover opportunities,
            track every application, connect with recruiters and take control of
            your professional growth with HOOK.
          </p>
          <div className="hero-buttons">
            <Action arrow>Get Started</Action>
            <a className="button button-secondary" href="#features">
              Explore Features <ArrowDown size={16} />
            </a>
          </div>
          <span className="hero-support">
            <Layers3 size={14} /> One platform. Your entire job-search journey.
          </span>
        </Reveal>
        <Reveal delay={0.12}>
          <HeroDashboard />
        </Reveal>
        <div className="hero-foundation">
          <span>LESS CHASING. MORE PROGRESS.</span>
          <div>
            <span>
              <BriefcaseBusiness size={16} /> Track with clarity
            </span>
            <span>
              <MessageSquare size={16} /> Connect with context
            </span>
            <span>
              <TrendingIcon /> Grow with purpose
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
function TrendingIcon() {
  return <Sparkles size={16} />;
}

export function ProblemSolutionSection() {
  return (
    <section className="section problem-section">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="A BETTER WAY FORWARD"
            title={
              <>
                Your Job Search Shouldn’t
                <br className="desktop-break" /> Feel Like a Full-Time Job.
              </>
            }
            text="Too many tabs. Too many unanswered questions. Too much to keep in your head. Your next opportunity deserves a little more clarity."
          />
        </Reveal>
        <Reveal className="problem-comparison">
          <div className="before-panel">
            <span className="comparison-label">THE SCATTERED SEARCH</span>
            <h3>
              All the effort.
              <br /> None of the overview.
            </h3>
            <div className="scattered-items">
              <span>
                <FileText size={16} /> Another spreadsheet
              </span>
              <span>
                <Bell size={16} /> A missed follow-up
              </span>
              <span>
                <MessageSquare size={16} /> A lost conversation
              </span>
              <span>
                <Search size={16} /> Where did I apply?
              </span>
            </div>
            <p>
              Scattered applications, unclear progress and no clear idea of what
              to improve.
            </p>
          </div>
          <div className="comparison-arrow">
            <ArrowRight size={20} />
          </div>
          <div className="after-panel">
            <span className="comparison-label">
              <span /> THE HOOK WAY
            </span>
            <h3>
              One clear view.
              <br /> A more confident next step.
            </h3>
            <Checklist
              items={[
                "Every application, organised together",
                "The right conversation, in context",
                "Timely reminders and clearer progress",
                "Insights that show you where to grow",
              ]}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const features = [
  {
    number: "01",
    icon: featureIcons.tracking,
    name: "Every application, accounted for.",
    label: "CENTRALISED APPLICATION TRACKING",
    text: "Bring your applications into one organised workspace. Know where you stand, and what comes next.",
    href: "#cats",
    className: "feature-wide",
  },
  {
    number: "02",
    icon: featureIcons.bridge,
    name: "More context. Better conversations.",
    label: "HOOK BRIDGE",
    text: "Connect with recruiters through conversations linked to the opportunity.",
    href: "#bridge",
    className: "feature-wide",
  },
  {
    number: "03",
    icon: featureIcons.skills,
    name: "See your next step.",
    label: "SKILL GAP ANALYSIS",
    text: "Turn missing skills into a clearer path forward.",
    href: "#skills",
  },
  {
    number: "04",
    icon: featureIcons.analytics,
    name: "Make progress visible.",
    label: "CAREER ANALYTICS",
    text: "Understand the patterns in your job search.",
    href: "#analytics",
  },
  {
    number: "05",
    icon: featureIcons.cv,
    name: "Put your best self forward.",
    label: "CV & RESUME MANAGEMENT",
    text: "Build, refine and organise your professional story.",
    href: "#cv",
  },
  {
    number: "06",
    icon: featureIcons.badges,
    name: "Show what you know.",
    label: "KNOWLEDGE VERIFICATION",
    text: "Let your skills speak through assessments and badges.",
    href: "#badges",
  },
];
export function FeaturesSection() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="YOUR CAREER, CONNECTED"
            title={
              <>
                Everything You Need to
                <br /> Move Your Career Forward.
              </>
            }
            text="Thoughtful tools for every part of the journey. Built to work better, together."
          />
        </Reveal>
        <div className="feature-grid">
          {features.map(({ icon: Icon, ...feature }, i) => (
            <Reveal
              key={feature.number}
              className={`feature-card ${feature.className || ""}`}
              delay={(i % 2) * 0.06}
            >
              <a href={feature.href}>
                <div className="feature-card-top">
                  <span className="feature-icon">
                    <Icon size={23} strokeWidth={1.6} />
                  </span>
                  <span>{feature.number}</span>
                </div>
                <span className="mini-eyebrow">{feature.label}</span>
                <h3>{feature.name}</h3>
                <p>{feature.text}</p>
                <span className="feature-discover">
                  Explore feature <ArrowUpRight size={16} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CATSSection() {
  return (
    <section className="section cats-section" id="cats">
      <div className="container">
        <div className="section-split cats-split">
          <Reveal className="section-copy">
            <SectionHeading
              eyebrow="01 / CENTRALISED APPLICATION TRACKING"
              title={
                <>
                  Every Application.
                  <br /> One Place.
                </>
              }
              text="Stop switching between platforms to remember where you applied. HOOK brings your job applications together in one organised workspace."
            />
            <Checklist
              items={[
                "Track status, sources and application history",
                "Spot duplicates before you apply again",
                "Add applications manually, whenever you need",
              ]}
            />
            <div className="text-callout">
              <Bell size={20} />
              <p>
                When a company hasn’t responded for <strong>14 days</strong>,
                HOOK can remind you to follow up.
              </p>
            </div>
          </Reveal>
          <Reveal className="section-visual">
            <CatsMockup />
          </Reveal>
        </div>
        <Reveal className="extension-workflow">
          <div>
            <span className="eyebrow">FROM APPLICATION TO OVERVIEW</span>
            <h3>Apply there. Keep track here.</h3>
          </div>
          <ol>
            {[
              "Apply on a supported platform",
              "Extension detects available activity",
              "HOOK asks to save it",
              "You confirm",
              "See it in your dashboard",
            ].map((step, i) => (
              <li key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{step}</p>
                {i < 4 && <ChevronDown size={15} />}
              </li>
            ))}
          </ol>
          <p className="workflow-note">
            <Link2 size={14} /> Detection depends on supported platforms and
            available information. You stay in control. Manual entry is always
            an option.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function BridgeSection() {
  return (
    <section className="section bridge-section" id="bridge">
      <div className="container">
        <Reveal>
          <div className="bridge-heading">
            <SectionHeading
              eyebrow="02 / HOOK BRIDGE"
              title={
                <>
                  Conversations That Understand
                  <br /> Your Applications.
                </>
              }
              text="HOOK BRIDGE connects job seekers and recruiters through application-aware communication, bringing conversations closer to the recruitment process."
            />
            <span className="bridge-symbol" aria-hidden="true">
              <MessageSquare size={38} strokeWidth={1.2} />
              <Link2 size={24} />
            </span>
          </div>
        </Reveal>
        <Reveal>
          <BridgeMockup />
          <DemoLabel dark />
        </Reveal>
        <div className="bridge-benefits">
          <span>
            <Link2 size={17} /> Connected to the right application
          </span>
          <span>
            <UsersIcon /> Context on both sides
          </span>
          <span>
            <Bell size={17} /> Keep the conversation moving
          </span>
        </div>
      </div>
    </section>
  );
}
function UsersIcon() {
  return <MessageSquare size={17} />;
}

export function SkillGapSection() {
  return (
    <section className="section" id="skills">
      <div className="container section-split">
        <Reveal className="section-copy">
          <SectionHeading
            eyebrow="03 / SKILL GAP ANALYSIS"
            title={
              <>
                Know What to Improve.
                <br /> Know Where to Grow.
              </>
            }
            text="Understand how your current skills compare with the requirements of your target roles and identify areas where you can improve."
          />
          <Checklist
            items={[
              "See existing skills alongside role requirements",
              "Identify missing skills and weaker areas",
              "Get focused suggestions for your next step",
            ]}
          />
          <a className="text-link" href="#how-it-works">
            Build a more intentional career <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <Reveal>
          <SkillsMockup />
        </Reveal>
      </div>
    </section>
  );
}

export function AnalyticsSection() {
  return (
    <section className="section analytics-section" id="analytics">
      <div className="container section-split reverse-copy">
        <Reveal>
          <AnalyticsMockup />
        </Reveal>
        <Reveal className="section-copy">
          <SectionHeading
            eyebrow="04 / CAREER & APPLICATION ANALYTICS"
            title={
              <>
                Turn Your Job Search
                <br /> Into Measurable Progress.
              </>
            }
            text="A clearer picture of your efforts. A better understanding of what to do next. See your career journey from a new perspective."
          />
          <Checklist
            items={[
              "Understand application and interview performance",
              "Track interview, selection and rejection rates",
              "Find practical, personalised ways to improve",
            ]}
          />
          <div className="quiet-note">
            <span /> Your progress, measured against your own journey.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CVSection() {
  return (
    <section className="section cv-section" id="cv">
      <div className="container section-split">
        <Reveal className="section-copy">
          <SectionHeading
            eyebrow="05 / CV & RESUME MANAGEMENT"
            title={
              <>
                Build a Stronger
                <br /> Professional Profile.
              </>
            }
            text="Your experience has a story to tell. Give it a clear, considered home and the right version for every opportunity."
          />
          <Checklist
            items={[
              "Generate a CV from your profile or upload your own",
              "Choose a template, edit and manage multiple versions",
              "Compare your CV with a job description",
              "Refine each application with role-specific suggestions",
            ]}
          />
          <div className="feature-inline-tags">
            <span>
              <FileText size={14} /> Create
            </span>
            <span>
              <Layers3 size={14} /> Organise
            </span>
            <span>
              <Sparkles size={14} /> Refine
            </span>
          </div>
        </Reveal>
        <Reveal>
          <CVMockup />
        </Reveal>
      </div>
    </section>
  );
}

export function BadgesSection() {
  return (
    <section className="section badges-section" id="badges">
      <div className="container section-split reverse-copy">
        <Reveal>
          <BadgeMockup />
        </Reveal>
        <Reveal className="section-copy">
          <SectionHeading
            eyebrow="06 / RANKING BADGES & KNOWLEDGE VERIFICATION"
            title={
              <>
                Let Your
                <br /> Knowledge Speak.
              </>
            }
            text="Go beyond listing your skills. Demonstrate your knowledge through assessments and earn badges for your professional profile."
          />
          <Checklist
            items={[
              "Timed questions and knowledge evaluation",
              "Recruiter-created assessments for relevant roles",
              "Job-specific badge requirements",
            ]}
          />
          <p className="body-note">
            An additional signal of knowledge, alongside your experience,
            portfolio and conversations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function RecruiterSection() {
  return (
    <section className="section recruiter-section" id="recruiters">
      <div className="container">
        <div className="section-split">
          <Reveal className="section-copy">
            <SectionHeading
              eyebrow="BUILT FOR BOTH SIDES OF THE OPPORTUNITY"
              title={
                <>
                  Find the Right Talent.
                  <br /> Manage Recruitment Better.
                </>
              }
              text="HOOK gives recruiters a centralised environment to publish opportunities, review applicants, manage recruitment progress and connect with candidates."
            />
            <Checklist
              items={[
                "Publish vacancies and review candidate profiles",
                "Shortlist applicants and update their status",
                "Schedule interviews and track recruitment progress",
                "Manage your company profile and request verification",
              ]}
            />
            <Action to="recruiter" arrow>
              Explore Recruiter Features
            </Action>
          </Reveal>
          <Reveal>
            <RecruiterMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    icon: UserIcon,
    title: "Create Your Profile",
    text: "Build your professional profile and showcase your skills and experience.",
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    text: "Explore jobs and identify opportunities that match your interests.",
  },
  {
    icon: ClipboardList,
    title: "Apply & Track",
    text: "Manage applications from HOOK and supported external platforms using CATS.",
  },
  {
    icon: Sparkles,
    title: "Connect & Grow",
    text: "Communicate with recruiters, understand your performance and improve your career prospects.",
  },
];
function UserIcon({ size }: { size?: number }) {
  return <featureIcons.profile size={size} />;
}
export function HowItWorksSection() {
  return (
    <section className="section how-section" id="how-it-works">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="A LITTLE STRUCTURE. A LOT OF POSSIBILITY."
            title="Your Next Chapter, in Four Steps."
            text="From your first profile to your next opportunity. A clearer journey starts here."
          />
        </Reveal>
        <div className="steps-grid">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} className="step-card" delay={i * 0.06}>
              <div className="step-top">
                <span className="step-icon">
                  <Icon size={24} />
                </span>
                <span>0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const freeFeatures = [
  "Job discovery and search",
  "Standard job seeker profile",
  "Limited daily applications",
  "Basic application tracking",
  "Saved jobs and basic notifications",
  "Essential platform features",
  "Watch ads for additional applications",
  "Premium trial access where available",
];
const premiumFeatures = [
  "Unlimited applications",
  "Advanced application tracking",
  "Skill Gap Analysis",
  "CV generator and management",
  "Career and application analytics",
  "Ad-free experience",
  "Exclusive content and opportunities",
  "Job/profile match insights",
  "Salary range information",
  "Early access to selected opportunities",
  "Email reminders",
];
export function PricingSection() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="ROOM TO START. SPACE TO GROW."
            title="Your Ambition. Your Pace."
            text="Start with the essentials. Go further with tools designed for a more intentional career journey."
          />
        </Reveal>
        <div className="pricing-grid">
          <Reveal className="pricing-card">
            <span className="plan-label">FREE</span>
            <h3>A strong place to start.</h3>
            <p>Make your next move with the essentials.</p>
            <div className="plan-price">
              Free<span>Essential access</span>
            </div>
            <Action className="button button-secondary" arrow>
              Get Started
            </Action>
            <div className="pricing-rule" />
            <Checklist items={freeFeatures} />
          </Reveal>
          <Reveal className="pricing-card premium-card">
            <div className="premium-tag">
              <Sparkles size={13} /> MORE ROOM TO GROW
            </div>
            <span className="plan-label">PREMIUM</span>
            <h3>More insight. More possibility.</h3>
            <p>A deeper understanding of your next move.</p>
            <div className="plan-price coming-soon">
              Coming Soon<span>Pricing will be announced</span>
            </div>
            <Action arrow>Explore Premium</Action>
            <div className="pricing-rule" />
            <Checklist items={premiumFeatures} />
          </Reveal>
        </div>
        <p className="pricing-note">
          Plan availability and application limits will be confirmed at launch.
          No subscription or payment is taken on this page.
        </p>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <Reveal className="about-layout">
          <div>
            <span className="eyebrow">
              <span /> OUR PURPOSE
            </span>
            <h2>
              More Than
              <br /> a Job Portal.
            </h2>
          </div>
          <div>
            <p>
              HOOK aims to make the job-search journey more organised,
              transparent and productive by bringing job discovery, application
              tracking, recruiter communication and career development together
              in one platform.
            </p>
            <span className="about-statement">
              Because a career is a journey.
              <br /> <strong>Not just the next application.</strong>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TeamSection() {
  return (
    <section className="section team-section" id="team">
      <div className="container">
        <Reveal>
          <SectionHeading
            centered
            eyebrow="THE PEOPLE BEHIND THE PLATFORM"
            title="Meet the Team Behind HOOK."
            text="Building a more connected career journey, together."
          />
        </Reveal>
        <div className="team-grid">
          {team.map((person, i) => (
            <Reveal className="team-card" key={person.name} delay={i * 0.035}>
              <div className={`team-photo team-tone-${i}`}>
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    loading="lazy"
                    width="400"
                    height="460"
                  />
                ) : (
                  <>
                    <span
                      className="team-initials"
                      aria-label={`${person.name}, photo coming soon`}
                    >
                      {person.initials}
                    </span>
                    <span className="photo-placeholder">PHOTO COMING SOON</span>
                  </>
                )}
              </div>
              <div className="team-info">
                <h3>{person.name}</h3>
                <p>{person.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "What is HOOK?",
    a: "HOOK is a job portal and career management platform. It brings job discovery, application tracking, recruiter communication, CV management and career development into one organised workspace.",
  },
  {
    q: "How does CATS work?",
    a: "The Centralised Application Tracking System brings your applications together with source labels, status updates, history, duplicate detection and follow-up reminders. For supported external platforms, the browser extension can detect available application activity and ask for your confirmation before saving it.",
  },
  {
    q: "Can I add applications from other job platforms?",
    a: "Yes. You can add an application manually, including its source and current status. The browser extension can also help on supported platforms when application information is available. It does not provide universal integration or guaranteed real-time synchronisation.",
  },
  {
    q: "What is HOOK BRIDGE?",
    a: "HOOK BRIDGE is application-aware communication between job seekers and recruiters. Conversations sit alongside the relevant vacancy and application status, so both sides have useful context. It is an in-platform experience, not an external email or messaging integration.",
  },
  {
    q: "How does the 14-day follow-up reminder work?",
    a: "When an application has had no recorded company response for 14 days, HOOK can remind you to follow up. Keep application information current so reminders reflect your progress. Reminders prompt you to take action; they do not automatically contact a recruiter.",
  },
  {
    q: "What does Skill Gap Analysis do?",
    a: "It compares the skills in your profile with the requirements of your target roles. You can see existing strengths, missing skills, areas to improve and suggestions for what to work on next. Match indicators are guidance, not a guarantee of an interview or an offer.",
  },
  {
    q: "Is HOOK free to use?",
    a: "HOOK plans include Free access to essential job-search tools and a Premium tier with advanced career features. Premium pricing, application limits and availability will be announced. Trial access may be offered where available; this landing page does not accept subscriptions or payments.",
  },
  {
    q: "How can recruiters use HOOK?",
    a: "Recruiters can publish vacancies, review candidate profiles, shortlist applicants, update application statuses, schedule interviews and communicate through HOOK BRIDGE. A centralised workspace brings recruitment progress and company profile management together.",
  },
  {
    q: "How does company verification work?",
    a: "Recruiters can request verification through their company profile. The required information and review process will be provided in the platform. A request does not guarantee approval, and verification should not be treated as a guarantee of a job offer or employer conduct.",
  },
];
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <Reveal className="faq-intro">
          <SectionHeading
            eyebrow="A LITTLE MORE CLARITY"
            title={
              <>
                Good Questions.
                <br /> Clear Answers.
              </>
            }
            text="A closer look at HOOK and how it brings your career journey together."
          />
          <span className="faq-caption">
            <MessageSquare size={19} /> Built around your next step.
          </span>
        </Reveal>
        <Reveal className="faq-list">
          {faqs.map((faq, i) => (
            <div
              className={`faq-item ${open === i ? "is-open" : ""}`}
              key={faq.q}
            >
              <h3>
                <button
                  id={`faq-question-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {faq.q}
                  <Plus size={19} aria-hidden="true" />
                </button>
              </h3>
              <div
                className="faq-answer"
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                hidden={open !== i}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="final-cta-section" id="get-started">
      <div className="container">
        <Reveal className="final-cta">
          <span className="eyebrow">
            <span /> YOUR NEXT CHAPTER
          </span>
          <h2>
            Your Next Opportunity
            <br /> <span>Starts Here.</span>
          </h2>
          <p>
            Take control of your job search. Discover opportunities, manage
            applications and move your career forward with HOOK.
          </p>
          <div className="hero-buttons">
            <Action arrow>Get Started</Action>
            <a className="button button-secondary" href="#features">
              Explore HOOK <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="cta-decoration" aria-hidden="true">
            <MousePointer2 size={38} strokeWidth={1} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <h3>Find Your Next Opportunity Here.</h3>
            <p>
              Your job search. Your career growth.
              <br /> One connected workspace.
            </p>
            <FooterContact />
          </div>
          <div className="footer-links">
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About Us</a>
          </div>
          <div className="footer-links">
            <h4>For Job Seekers</h4>
            <a href="#cats">Application Tracking</a>
            <a href="#bridge">HOOK BRIDGE</a>
            <a href="#skills">Skill Gap Analysis</a>
            <a href="#cv">CV Management</a>
          </div>
          <div className="footer-links">
            <h4>For Recruiters</h4>
            <a href="#recruiters">Recruitment Tools</a>
            <a href="#bridge">Candidate Conversations</a>
            <a href="#badges">Knowledge Assessments</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {brand.copyrightYear} HOOK. All rights reserved.</span>
          <div>
            <Action to="privacy" className="footer-legal">
              Privacy Policy
            </Action>
            <Action to="terms" className="footer-legal">
              Terms of Service
            </Action>
            <a href="#inquiry" className="footer-legal">Contact</a>
          </div>
          <a href="#home" className="back-top">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
        <p className="footer-preview">
          <CircleCheck size={12} /> A preview of the HOOK experience. Product
          interfaces and company records are illustrative.
        </p>
      </div>
    </footer>
  );
}
