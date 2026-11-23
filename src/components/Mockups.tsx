import { brand } from "../config";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  FileText,
  Flag,
  FolderOpen,
  LayoutDashboard,
  Link2,
  ListFilter,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DemoLabel, Pill } from "./UI";

const applications = [
  {
    company: "Forma Studio",
    initial: "f",
    role: "Product Designer",
    source: "HOOK",
    status: "Interview",
    tone: "mint" as const,
    color: "lavender",
    date: "24 Oct",
  },
  {
    company: "Orbit Labs",
    initial: "o",
    role: "Frontend Developer",
    source: "External",
    status: "In review",
    tone: "blue" as const,
    color: "peach",
    date: "22 Oct",
  },
  {
    company: "Layers Digital",
    initial: "l",
    role: "UX Designer",
    source: "Manual",
    status: "Applied",
    tone: "gray" as const,
    color: "sky",
    date: "20 Oct",
  },
];

export function CompanyIcon({
  initial,
  color = "sky",
}: {
  initial: string;
  color?: string;
}) {
  return (
    <span className={`company-icon ${color}`} aria-hidden="true">
      {initial}
      <span>°</span>
    </span>
  );
}

function MiniMetric({
  label,
  value,
  detail,
  icon: Icon,
  tone = "",
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone?: string;
}) {
  return (
    <div className={`mini-metric ${tone}`}>
      <div className="metric-top">
        {label}
        <Icon size={15} />
      </div>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

export function HeroDashboard() {
  return (
    <div className="hero-product">
      <div className="floating-note note-interview">
        <span className="note-icon mint">
          <CalendarDays size={19} />
        </span>
        <div>
          <strong>Your next chapter is closer.</strong>
          <span>Interview invitation from Forma Studio</span>
        </div>
        <span className="notification-dot" />
      </div>
      <div className="dashboard-frame">
        <aside
          className="dashboard-sidebar"
          aria-label="Illustrative dashboard sidebar"
        >
          <span className="mini-wordmark">
            <img src={brand.logo} alt="HOOK" width="930" height="532" />
          </span>
          <span className="workspace-label">YOUR WORKSPACE</span>
          {[
            { icon: LayoutDashboard, label: "Overview" },
            { icon: Search, label: "Discover jobs" },
            { icon: BriefcaseBusiness, label: "My applications" },
            { icon: MessageSquare, label: "HOOK BRIDGE" },
            { icon: ChartNoAxesCombined, label: "Career insights" },
            { icon: FileText, label: "My CVs" },
          ].map(({ icon: Icon, label }, i) => (
            <div
              className={`sidebar-item ${i === 0 ? "selected" : ""}`}
              key={label}
            >
              <Icon size={15} />
              {label}
              {i === 3 && <b>2</b>}
            </div>
          ))}
          <div className="sidebar-growth">
            <Sparkles size={18} />
            <strong>A little better, every day.</strong>
            <span>Your next opportunity starts with you.</span>
            <span className="mock-link">
              Explore your insights <ArrowRight size={13} />
            </span>
          </div>
          <div className="mock-user">
            <span>AJ</span>
            <div>
              <strong>Alex Jordan</strong>
              <small>Personal workspace</small>
            </div>
          </div>
        </aside>
        <div className="dashboard-main">
          <div className="dashboard-topbar">
            <span>
              My workspace <ChevronRight size={12} /> <b>Overview</b>
            </span>
            <div>
              <Search size={15} />
              <Bell size={15} />
              <span className="tiny-avatar">AJ</span>
            </div>
          </div>
          <div className="dashboard-body">
            <div className="dashboard-welcome">
              <div>
                <span>LET’S MAKE YOUR NEXT MOVE</span>
                <h3>A little progress. A lot of possibility.</h3>
                <p>Here’s where your career journey stands today.</p>
              </div>
              <span className="mock-control">
                <CalendarDays size={13} /> This month <ChevronDown size={12} />
              </span>
            </div>
            <div className="hero-metrics">
              <MiniMetric
                label="Total applications"
                value="24"
                detail="+6 this month"
                icon={BriefcaseBusiness}
              />
              <MiniMetric
                label="Awaiting response"
                value="12"
                detail="Every next step, in sight"
                icon={Clock3}
              />
              <MiniMetric
                label="Interview invitations"
                value="04"
                detail="Good things are happening"
                icon={CalendarDays}
                tone="metric-mint"
              />
            </div>
            <div className="dashboard-columns">
              <div className="mock-panel recent-applications">
                <div className="mock-panel-heading">
                  <h4>Recent applications</h4>
                  <span>
                    View all <ArrowUpRight size={12} />
                  </span>
                </div>
                <div className="table-caption">
                  <span>OPPORTUNITY</span>
                  <span>STATUS</span>
                </div>
                {applications.map((app) => (
                  <div className="application-row" key={app.company}>
                    <CompanyIcon initial={app.initial} color={app.color} />
                    <div>
                      <strong>{app.role}</strong>
                      <span>
                        {app.company} · {app.source}
                      </span>
                    </div>
                    <Pill tone={app.tone}>{app.status}</Pill>
                  </div>
                ))}
                <div className="activity-line">
                  <span className="activity-dot" />
                  <span>Forma Studio updated your application</span>
                  <small>2h ago</small>
                </div>
              </div>
              <div className="mock-panel progress-panel">
                <div className="mock-panel-heading">
                  <h4>Your career progress</h4>
                  <TrendingUp size={15} />
                </div>
                <div className="progress-ring">
                  <div>
                    <strong>
                      78<span>%</span>
                    </strong>
                    <span>Profile strength</span>
                  </div>
                </div>
                <p>
                  A strong foundation.
                  <br />
                  <b>Keep building on it.</b>
                </p>
              </div>
            </div>
            <div className="dashboard-bottom">
              <div>
                <span className="note-icon sky">
                  <Target size={17} />
                </span>
                <div>
                  <strong>A role worth a closer look</strong>
                  <span>UI Designer · Northstar Creative · Remote</span>
                </div>
                <ArrowUpRight size={16} />
              </div>
              <div>
                <span className="note-icon peach">
                  <Clock3 size={17} />
                </span>
                <div>
                  <strong>A little follow-up goes a long way</strong>
                  <span>Orbit Labs · 14-day reminder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="floating-note note-saved">
        <span className="note-icon sky">
          <CircleCheck size={19} />
        </span>
        <div>
          <strong>One less thing to keep in your head.</strong>
          <span>Application saved to your workspace</span>
        </div>
        <Check size={15} />
      </div>
      <DemoLabel />
    </div>
  );
}

export function CatsMockup() {
  return (
    <div className="cats-visual">
      <div className="product-window">
        <div className="window-bar">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>
            <ShieldCheck size={12} /> Your application workspace
          </span>
          <MoreHorizontal size={17} />
        </div>
        <div className="cats-body">
          <div className="mock-title">
            <div>
              <span className="mini-eyebrow">CATS / MY APPLICATIONS</span>
              <h3>Your next move, organised.</h3>
            </div>
            <span className="mock-add">
              <Plus size={13} /> Add application
            </span>
          </div>
          <div className="mock-tabs">
            <span className="selected">
              All applications <b>24</b>
            </span>
            <span>In progress</span>
            <span>Archived</span>
            <ListFilter size={15} />
          </div>
          <div className="cats-table">
            {applications.map((app) => (
              <div className="application-row" key={app.company}>
                <CompanyIcon initial={app.initial} color={app.color} />
                <div>
                  <strong>{app.role}</strong>
                  <span>{app.company}</span>
                </div>
                <span className="source-tag">{app.source}</span>
                <Pill tone={app.tone}>{app.status}</Pill>
                <span className="app-date">{app.date}</span>
              </div>
            ))}
          </div>
          <div className="duplicate-notice">
            <Link2 size={15} />
            <span>
              Already applied? Duplicate detection helps keep your workspace
              tidy.
            </span>
          </div>
          <div className="reminder-line">
            <div className="reminder-event">
              <span />
              <strong>Application sent</strong>
              <small>Day 1</small>
            </div>
            <div className="timeline-dash" />
            <div className="reminder-event reminder-due">
              <span />
              <strong>Time to follow up</strong>
              <small>Day 14 · No response</small>
            </div>
            <Bell size={18} />
          </div>
        </div>
      </div>
      <div className="extension-card">
        <span className="extension-icon">
          <FolderOpen size={21} />
        </span>
        <div>
          <strong>Keep this opportunity in sight?</strong>
          <p>Save this detected application to HOOK.</p>
          <div>
            <span className="mock-save">
              <Check size={12} /> Yes, save application
            </span>
            <span className="mock-later">Not now</span>
          </div>
        </div>
      </div>
      <DemoLabel />
    </div>
  );
}

export function BridgeMockup() {
  return (
    <div className="bridge-mockups">
      <div className="bridge-seeker">
        <div className="bridge-window-title">
          <span>
            <MessageSquare size={17} /> HOOK BRIDGE
          </span>
          <Pill>Job seeker view</Pill>
        </div>
        <div className="chat-layout">
          <aside className="chat-list">
            <span className="mini-eyebrow">RECENTLY APPLIED · 3</span>
            {applications.map((app, i) => (
              <div
                className={`chat-contact ${i === 0 ? "selected" : ""}`}
                key={app.company}
              >
                <CompanyIcon initial={app.initial} color={app.color} />
                <div>
                  <strong>{app.company}</strong>
                  <small>
                    {i === 0
                      ? "Looking forward to meeting you!"
                      : i === 1
                        ? "Thanks for your application."
                        : "Your conversation starts here."}
                  </small>
                </div>
                {i === 0 && <b>1</b>}
              </div>
            ))}
            <div className="chat-context-note">
              <Link2 size={15} />
              <p>
                Every conversation.
                <br />
                The right context.
              </p>
            </div>
          </aside>
          <div className="chat-thread">
            <div className="chat-person">
              <CompanyIcon initial="f" color="lavender" />
              <div>
                <strong>Jamie · Forma Studio</strong>
                <span>Recruitment team</span>
              </div>
              <MoreHorizontal size={18} />
            </div>
            <div className="linked-application">
              <BriefcaseBusiness size={14} />
              <span>Product Designer</span>
              <Pill tone="mint">Interview</Pill>
            </div>
            <span className="chat-date">TODAY</span>
            <div className="message received">
              Hi Alex! We enjoyed reviewing your portfolio. Would you be
              available for a conversation on Thursday?<small>10:24 AM</small>
            </div>
            <div className="message sent">
              Hi Jamie, that sounds great. Thursday works for me. Looking
              forward to it!
              <small>
                10:28 AM <Check size={11} />
              </small>
            </div>
            <div className="chat-input">
              <span>Your next conversation starts here</span>
              <Send size={16} />
            </div>
          </div>
        </div>
      </div>
      <div className="bridge-recruiter">
        <div className="bridge-window-title">
          <span>
            <Users size={16} /> Candidate context
          </span>
          <Pill tone="mint">Recruiter view</Pill>
        </div>
        <div className="candidate-profile">
          <span className="candidate-avatar">AJ</span>
          <div>
            <strong>Alex Jordan</strong>
            <span>Product Designer</span>
          </div>
          <ShieldCheck size={19} />
        </div>
        <dl className="candidate-details">
          <div>
            <dt>Linked vacancy</dt>
            <dd>Product Designer</dd>
          </div>
          <div>
            <dt>Application</dt>
            <dd>
              <Check size={13} /> Applied
            </dd>
          </div>
          <div>
            <dt>Current stage</dt>
            <dd>
              <Pill tone="mint">Interview</Pill>
            </dd>
          </div>
        </dl>
        <div className="conversation-history">
          <span className="mini-eyebrow">CONVERSATION HISTORY</span>
          <p>
            <span />
            Application received <small>20 Oct</small>
          </p>
          <p>
            <span />
            Portfolio reviewed <small>23 Oct</small>
          </p>
          <p>
            <span />
            Interview conversation <small>Today</small>
          </p>
        </div>
        <div className="context-footer">
          <Link2 size={14} /> Connected to the application.
        </div>
      </div>
    </div>
  );
}

export function SkillsMockup() {
  return (
    <div className="product-window skill-window">
      <div className="mock-panel-heading">
        <h3>Your next level starts here.</h3>
        <Sparkles size={20} />
      </div>
      <div className="skill-target">
        <span className="note-icon sky">
          <Target size={20} />
        </span>
        <div>
          <small>YOUR TARGET ROLE</small>
          <strong>Frontend Developer</strong>
        </div>
        <div className="match-score">
          <strong>
            76<span>%</span>
          </strong>
          <small>skill match</small>
        </div>
      </div>
      <div className="skill-legend">
        <span>
          <i />
          Your skills
        </span>
        <span>
          <i />
          Role requirements
        </span>
      </div>
      {[
        { skill: "React", yours: 88, required: 90, label: "Strong foundation" },
        { skill: "TypeScript", yours: 62, required: 85, label: "Room to grow" },
        { skill: "Testing", yours: 35, required: 75, label: "Focus area" },
        {
          skill: "Accessibility",
          yours: 0,
          required: 70,
          label: "Skill to add",
        },
      ].map((row) => (
        <div className="skill-row" key={row.skill}>
          <div>
            <strong>{row.skill}</strong>
            <span>{row.label}</span>
          </div>
          <div
            className="skill-track"
            role="img"
            aria-label={`${row.skill}: current ${row.yours}%, role requires ${row.required}%`}
          >
            <div
              className="skill-required"
              style={{ width: `${row.required}%` }}
            />
            <div className="skill-current" style={{ width: `${row.yours}%` }} />
          </div>
        </div>
      ))}
      <div className="insight-note">
        <Sparkles size={17} />
        <p>
          <strong>Your next small step</strong>Practise component testing, then
          build accessibility into your next project.
        </p>
      </div>
      <DemoLabel />
    </div>
  );
}

export function AnalyticsMockup() {
  return (
    <div className="product-window analytics-window">
      <div className="mock-panel-heading">
        <div>
          <span className="mini-eyebrow">YOUR CAREER, IN PERSPECTIVE</span>
          <h3>Small steps. Visible progress.</h3>
        </div>
        <span className="mock-control">
          Last 6 months <ChevronDown size={12} />
        </span>
      </div>
      <div className="analytics-metrics">
        <div>
          <span>Applications</span>
          <strong>24</strong>
        </div>
        <div>
          <span>Interview conversion</span>
          <strong>
            25<span>%</span>
          </strong>
        </div>
        <div>
          <span>Selection rate</span>
          <strong>
            8<span>%</span>
          </strong>
        </div>
        <div>
          <span>Rejection rate</span>
          <strong>
            17<span>%</span>
          </strong>
        </div>
      </div>
      <div className="chart-heading">
        <strong>Application & interview performance</strong>
        <div>
          <span>
            <i />
            Applications
          </span>
          <span>
            <i />
            Interviews
          </span>
        </div>
      </div>
      <div
        className="bar-chart"
        role="img"
        aria-label="Illustrative monthly applications and interviews. May: 2 and 0; June: 3 and 1; July: 3 and 0; August: 4 and 1; September: 5 and 2; October: 7 and 2."
      >
        {[
          { m: "May", a: 29, i: 0 },
          { m: "Jun", a: 43, i: 14 },
          { m: "Jul", a: 43, i: 0 },
          { m: "Aug", a: 57, i: 14 },
          { m: "Sep", a: 71, i: 29 },
          { m: "Oct", a: 100, i: 29 },
        ].map((bar) => (
          <div className="bar-group" key={bar.m}>
            <div className="bars">
              <span style={{ height: `${bar.a}%` }} />
              <span style={{ height: `${bar.i}%` }} />
            </div>
            <small>{bar.m}</small>
          </div>
        ))}
      </div>
      <div className="analytics-insight">
        <TrendingUp size={17} />
        <p>
          <strong>Give your next application a stronger start.</strong>Tailor
          your CV to the role and review your interview preparation.
        </p>
      </div>
      <DemoLabel />
    </div>
  );
}

export function CVMockup() {
  return (
    <div className="cv-visual">
      <div className="cv-tools">
        <span className="selected">
          <FileText size={16} /> My CVs
        </span>
        <span>
          <Plus size={16} /> Create from profile
        </span>
        <span>
          <ArrowDownLeft size={16} /> Upload existing CV
        </span>
        <div className="template-picker">
          <small>TEMPLATES</small>
          <span>
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="cv-version">
          <Check size={13} />
          <span>
            Product design
            <br />
            <small>Version 02</small>
          </span>
        </div>
      </div>
      <div className="cv-paper">
        <div className="cv-paper-top">
          <span className="cv-monogram">AJ</span>
          <small>ILLUSTRATIVE CV</small>
        </div>
        <h3>Alex Jordan</h3>
        <p className="cv-job">PRODUCT DESIGNER</p>
        <div className="cv-rule" />
        <h4>PROFILE</h4>
        <p>
          A thoughtful designer focused on clear, useful digital experiences.
        </p>
        <h4>SELECTED EXPERIENCE</h4>
        <div className="cv-position">
          <strong>Product Designer</strong>
          <span>Example studio · 2024 to 2026</span>
        </div>
        <p>
          Translated product challenges into accessible interfaces and
          considered user journeys.
        </p>
        <h4>SKILLS</h4>
        <div className="cv-skills">
          <span>Interface design</span>
          <span>Prototyping</span>
          <span>User research</span>
        </div>
        <h4>SELECTED PROJECT</h4>
        <p>A simpler application journey</p>
        <div className="cv-skeleton">
          <span />
          <span />
        </div>
      </div>
      <div className="cv-suggestion">
        <Sparkles size={16} />
        <span>
          <strong>A little more relevant.</strong>Add a research example for
          this role.
        </span>
      </div>
      <DemoLabel />
    </div>
  );
}

export function BadgeMockup() {
  return (
    <div className="assessment-visual">
      <div className="assessment-card">
        <div className="mock-panel-heading">
          <span>
            <ShieldCheck size={17} /> Knowledge check
          </span>
          <span className="assessment-timer">
            <Clock3 size={13} /> 08:42
          </span>
        </div>
        <span className="mini-eyebrow">
          FRONTEND FUNDAMENTALS · QUESTION 04 / 10
        </span>
        <h3>Which approach improves keyboard accessibility?</h3>
        <div className="assessment-choice">
          <span>A</span> Remove all visible focus indicators
        </div>
        <div className="assessment-choice selected">
          <span>B</span> Use semantic, focusable controls{" "}
          <CircleCheck size={16} />
        </div>
        <div className="assessment-choice">
          <span>C</span> Rely only on mouse interactions
        </div>
        <div className="assessment-progress">
          <span />
        </div>
        <span className="assessment-note">
          Static assessment preview · timer is illustrative
        </span>
      </div>
      <div className="earned-badge">
        <div>
          <ShieldCheck size={29} />
        </div>
        <span>KNOWLEDGE VERIFIED</span>
        <strong>Frontend foundations</strong>
        <small>Illustrative profile badge</small>
      </div>
    </div>
  );
}

export function RecruiterMockup() {
  return (
    <div className="product-window recruiter-window">
      <div className="recruiter-toolbar">
        <span className="mini-wordmark">
          <img src={brand.logo} alt="HOOK" width="930" height="532" />
          <small>FOR TEAMS</small>
        </span>
        <span className="mock-add">
          <Plus size={13} /> New vacancy
        </span>
      </div>
      <div className="recruiter-overview">
        <div>
          <span className="mini-eyebrow">YOUR RECRUITMENT WORKSPACE</span>
          <h3>Great teams start here.</h3>
        </div>
        <span className="mock-control">
          <Settings2 size={13} /> Company profile
        </span>
      </div>
      <div className="recruiter-metrics">
        <div>
          <BriefcaseBusiness size={18} />
          <strong>03</strong>
          <span>Active vacancies</span>
        </div>
        <div>
          <Users size={18} />
          <strong>42</strong>
          <span>Applicants</span>
        </div>
        <div>
          <CalendarDays size={18} />
          <strong>06</strong>
          <span>Interviews scheduled</span>
        </div>
      </div>
      <div className="recruiter-pipeline">
        <div className="mock-panel-heading">
          <h4>Product Designer</h4>
          <Pill tone="mint">Open vacancy</Pill>
        </div>
        <div className="pipeline-columns">
          <div>
            <span className="pipeline-heading">
              <i /> Applied <b>18</b>
            </span>
            <div className="candidate-card">
              <span className="tiny-avatar">MR</span>
              <strong>Morgan Reed</strong>
              <small>View candidate profile</small>
              <span>Application received</span>
            </div>
          </div>
          <div>
            <span className="pipeline-heading">
              <i /> Shortlisted <b>5</b>
            </span>
            <div className="candidate-card">
              <span className="tiny-avatar lavender">AJ</span>
              <strong>Alex Jordan</strong>
              <small>Product Designer</small>
              <span>
                <Flag size={11} /> Shortlisted
              </span>
            </div>
          </div>
          <div>
            <span className="pipeline-heading">
              <i /> Interview <b>3</b>
            </span>
            <div className="candidate-card">
              <span className="tiny-avatar peach">JT</span>
              <strong>Jordan Taylor</strong>
              <small>UX / UI Designer</small>
              <span>
                <CalendarDays size={11} /> Thu, 10:30 AM
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="recruiter-bottom">
        <ShieldCheck size={14} />
        <span>Company verification request</span>
        <Pill tone="gray">Ready to submit</Pill>
      </div>
      <DemoLabel />
    </div>
  );
}
