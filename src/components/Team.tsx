"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Role styling + back-of-card copy, shared by everyone in that role  */
/* ------------------------------------------------------------------ */

interface RoleStyle {
  roleBg: string;
  backBg: string;
  backText: string;
  focus: string;
  stack: string;
}

const ROLE_STYLES: Record<string, RoleStyle> = {
  Organiser: {
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-blue",
    backText: "text-white",
    focus: "Bringing vision to life through leadership and collaboration.",
    stack: "Planning · Community",
  },
  "Co-Lead": {
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-red",
    backText: "text-white",
    focus: "Empowering people, strengthening ideas and driving impact.",
    stack: "Leadership · Ops",
  },
  "Web Dev Lead": {
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Building impactful digital experiences through innovation.",
    stack: "Next.js · TypeScript",
  },
  "Cloud Lead": {
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Connecting ideas to scalable, cloud-powered possibilities.",
    stack: "Google Cloud · Docker",
  },
  "AI/ML Lead": {
    roleBg: "bg-g-yellow text-ink",
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Exploring intelligence, shaping innovation and building the future.",
    stack: "Gemini · Python",
  },
  "CP/DSA Lead": {
    roleBg: "bg-g-green text-ink",
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Sharpening problem-solving skills and building coding excellence.",
    stack: "C++ · Algorithms",
  },
  "UI/UX Lead": {
    roleBg: "bg-g-yellow text-ink",
    backBg: "bg-g-green",
    backText: "text-ink",
    focus: "Turning creativity into meaningful user experiences.",
    stack: "Figma · Design",
  },
  "Events Lead": {
    roleBg: "bg-g-red text-white",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    focus: "Creating experiences that bring ideas and people together.",
    stack: "Logistics · Ops",
  },
  "Content Lead": {
    roleBg: "bg-g-green text-ink",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    focus: "Crafting stories that inform, inspire and connect.",
    stack: "Writing · Docs",
  },
  "Social Media Lead": {
    roleBg: "bg-g-blue text-white",
    backBg: "bg-g-yellow",
    backText: "text-ink",
    focus: "Amplifying our voice and growing our community.",
    stack: "Instagram · LinkedIn",
  },
};

/* ------------------------------------------------------------------ */
/*  Team members, in display order                                     */
/*                                                                     */
/*  To add a photo: put the image in /public/team/ and set `photo`,    */
/*  e.g.  photo: "/team/anshika.jpg"  (square images work best).       */
/*  Until then the card shows a photo slot with the person's initials. */
/* ------------------------------------------------------------------ */

interface TeamMember {
  id: string;
  name: string;
  role: keyof typeof ROLE_STYLES;
  branchYear: string;
  photo?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  // Organisers
  { id: "anshika", name: "Anshika Vishwakarma", role: "Organiser", branchYear: "CSE (AI) · IV Year", photo: "/team/Anshika.jpg" },
  { id: "deepanwitha", name: "Deepanwitha Gopisetty", role: "Organiser", branchYear: "CSE · III Year", photo: "/team/Deepanwitha Gopisetty.jpg" },
  { id: "manivarshith", name: "Manivarshith Rongali", role: "Organiser", branchYear: "CSE · III Year", photo: "/team/Manivarshith.jpeg" },
  // Co-Lead
  { id: "danush", name: "Kaviti Danush", role: "Co-Lead", branchYear: "CSE (AI) · III Year", photo: "/team/Kaviti Danush.jpg" },
  // Technical leads
  { id: "neela-ganesh", name: "D. Neela Ganesh", role: "Web Dev Lead", branchYear: "CSE · III Year", photo: "/team/Neelaganesh D.jpg" },
  { id: "kousik", name: "Kousik Puppala", role: "Web Dev Lead", branchYear: "CSE · III Year", photo: "/team/kousik Puppala.png" },
  { id: "sahithi", name: "Sahithi", role: "Cloud Lead", branchYear: "CSE · III Year", photo: "/team/Sahithi.png" },
  { id: "siri-vennela", name: "Siri Vennela", role: "AI/ML Lead", branchYear: "CSE (AI) · III Year", photo: "/team/Siri Vennela.jpg" },
  { id: "sri-praneeth", name: "Chakka Sri Praneeth", role: "CP/DSA Lead", branchYear: "CSE · III Year", photo: "/team/Praneeth Chakka.png" },
  { id: "harshitha", name: "Channa Venkata Harshitha", role: "UI/UX Lead", branchYear: "CSE · III Year", photo: "/team/Harshitha Channa.jpg" },
  // Events, content & outreach
  { id: "ahamed-raza", name: "Md Ahamed Raza", role: "Events Lead", branchYear: "CSE · III Year", photo: "/team/Raza.jpeg" },
  { id: "jahnavi", name: "Yenneti Jahnavi", role: "Events Lead", branchYear: "CSE (AI) · III Year", photo: "/team/Yenneti JAHNAVI.jpg" },
  { id: "nishanth", name: "Nishanth Varma", role: "Content Lead", branchYear: "CSE · III Year", photo: "/team/nishanth-varma.jpg" },
  { id: "prasanna", name: "Prasanna Yerra", role: "Content Lead", branchYear: "CSE (AI) · III Year", photo: "/team/Prasanna Yerra.png" },
  { id: "srikanth", name: "Srikanth Kadiri", role: "Social Media Lead", branchYear: "CSE (AI) · II Year", photo: "/team/Srikanth.jpg" },
];

/** Two tiers: core leadership (Organisers + Co-Lead) on top, domain leads below. */
const LEADERSHIP = TEAM_MEMBERS.filter((m) => m.role === "Organiser" || m.role === "Co-Lead");
const DOMAIN_LEADS = TEAM_MEMBERS.filter((m) => m.role !== "Organiser" && m.role !== "Co-Lead");

function initials(name: string) {
  const parts = name.replace(/\./g, " ").split(/\s+/).filter((p) => p.length > 1);
  const picked = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : parts;
  return picked.map((p) => p[0]).join("").toUpperCase();
}

/** Photo slot: shows the photo when set, otherwise a dashed placeholder with initials. */
function PhotoSlot({ member }: { member: TeamMember }) {
  return (
    <div className="relative h-32 w-32 overflow-hidden rounded-[8px] border-[3px] border-ink bg-cream shadow-[4px_4px_0_#111]">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Photo of ${member.name}, ${member.role}`}
          width={320}
          height={320}
          className="h-full w-full object-cover object-[center_25%]"
        />
      ) : (
        <div
          role="img"
          aria-label={`Photo placeholder for ${member.name}`}
          className="flex h-full w-full flex-col items-center justify-center gap-1 bg-halftone"
        >
          <div className="flex h-[78%] w-[78%] flex-col items-center justify-center rounded-[4px] border-2 border-dashed border-ink/60 bg-white/80">
            <span className="font-display text-4xl sm:text-3xl font-extrabold leading-none text-ink">
              {initials(member.name)}
            </span>
            <span className="mt-1 font-mono text-[9px] font-extrabold uppercase tracking-wider text-ink/60">
              Photo
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Profile links, keyed by member id. Leave a field out if a member   */
/*  has no profile yet: that button is shown greyed out.               */
/* ------------------------------------------------------------------ */

const PROFILE_LINKS: Record<string, { github?: string; linkedin?: string }> = {
  anshika: { linkedin: "https://www.linkedin.com/in/anshika-vishwakarma/" },
  deepanwitha: { linkedin: "https://www.linkedin.com/in/deepanwitha-gopisetty-17a183303/" },
  manivarshith: {
    github: "https://github.com/varshhhy7",
    linkedin: "https://www.linkedin.com/in/mani-varshith-b06ba3329/",
  },
  danush: {
    github: "https://github.com/danushkaviti-tech",
    linkedin: "https://www.linkedin.com/in/kaviti-danush-180095325",
  },
  "neela-ganesh": {
    github: "https://github.com/Neelaganes",
    linkedin: "https://www.linkedin.com/in/neelaganeshd/",
  },
  kousik: {
    github: "https://github.com/suryanandan-byte",
    linkedin: "https://www.linkedin.com/in/kousik-puppala-22653a323/",
  },
  sahithi: {
    github: "https://github.com/Sahithi7396",
    linkedin: "https://www.linkedin.com/in/sahithi-gannavarapu-a0a126316/",
  },
  "siri-vennela": {
    github: "https://github.com/sirivennelauddagiri-eng",
    linkedin: "https://www.linkedin.com/in/siri-vennela11",
  },
  "sri-praneeth": {
    github: "https://github.com/sripraneeth09",
    linkedin: "https://www.linkedin.com/in/sri-praneeth-chakka-28581a31b",
  },
  harshitha: {
    github: "https://github.com/Harshithachanna",
    linkedin: "https://www.linkedin.com/in/harshitha-channa-388363324",
  },
  "ahamed-raza": {
    github: "https://github.com/Codex-39",
    linkedin: "https://www.linkedin.com/in/mohammed-ahamed-raza-0b0319382/",
  },
  jahnavi: {
    github: "https://github.com/yennetijahnavi-AI28",
    linkedin: "https://www.linkedin.com/in/yenneti-jahnavi-532b04323",
  },
  nishanth: {
    github: "https://github.com/nishanthxvarma",
    linkedin: "https://www.linkedin.com/in/nishanthxvarma/",
  },
  prasanna: {
    github: "https://github.com/prassu-codes",
    linkedin: "https://www.linkedin.com/in/yerra-prasanna",
  },
  srikanth: {
    github: "https://github.com/srikanthkadiri",
    linkedin: "https://www.linkedin.com/in/srikanth-kadiri-7b8049377",
  },
};

const SOCIALS = [
  { key: "github", label: "GH", title: "GitHub" },
  { key: "linkedin", label: "IN", title: "LinkedIn" },
] as const;

interface IdCardProps {
  member: TeamMember;
  badgeNo: number;
  delay: number;
  isFlipped: boolean;
  onToggle: () => void;
  springConfig: { duration: number } | { type: "spring"; stiffness: number; damping: number };
  reducedMotion: boolean;
}

function IdCard({ member, badgeNo, delay, isFlipped, onToggle, springConfig, reducedMotion }: IdCardProps) {
  const style = ROLE_STYLES[member.role];
  const badgeCode = `VIIT-ID-${String(badgeNo).padStart(3, "0")}`;

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springConfig, delay: reducedMotion ? 0 : delay }}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      aria-pressed={isFlipped}
      tabIndex={0}
      aria-label={`${member.role} ID card for ${member.name}. Tap, click or press Enter to flip.`}
      className={`group perspective-1000 h-[350px] w-full cursor-pointer select-none ${
        isFlipped ? "is-flipped" : ""
      }`}
    >
      <div className="preserve-3d group-hover-flip relative h-full w-full">
        {/* FRONT OF ID BADGE */}
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-[10px] border-[3px] border-ink bg-white p-3 sm:p-4 shadow-[5px_5px_0_#111]">
          {/* Top Lanyard Slot Notch + Serial Header */}
          <div>
            <div className="mx-auto mb-2 flex flex-col items-center">
              <div className="h-2.5 w-5 border-x-[3px] border-t-[3px] border-ink bg-g-yellow" />
              <div
                aria-hidden="true"
                className="h-3.5 w-14 rounded-full border-[3px] border-ink bg-cream shadow-inner"
              />
            </div>

            <div className="flex items-center justify-between gap-1 border-b-[3px] border-ink pb-2">
              <span className="truncate font-mono text-[10px] sm:text-[11px] font-extrabold text-ink">
                {badgeCode}
              </span>
              <span className="shrink-0 rounded-[3px] border-2 border-ink bg-cream px-1.5 font-mono text-[10px] font-extrabold uppercase text-ink">
                ↻
              </span>
            </div>
          </div>

          {/* Photo slot */}
          <div className="my-2 flex justify-center">
            <PhotoSlot member={member} />
          </div>

          {/* Role, Name & Branch Footer */}
          <div className="border-t-[3px] border-ink pt-2">
            <span
              className={`inline-block max-w-full truncate rounded-[3px] border-2 border-ink px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-extrabold uppercase shadow-[2px_2px_0_#111] ${style.roleBg}`}
            >
              {member.role}
            </span>
            <h3 className="mt-2 line-clamp-2 font-display text-sm sm:text-lg font-extrabold uppercase tracking-tight leading-[1.05] text-ink">
              {member.name}
            </h3>
            <p className="mt-1 truncate font-mono text-[10px] sm:text-[11px] font-bold text-ink/75">
              {member.branchYear}
            </p>
          </div>
        </div>

        {/* BACK OF ID BADGE (3D rotateY 180deg) */}
        <div
          className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-[10px] border-[3px] border-ink p-3.5 sm:p-5 shadow-[5px_5px_0_#111] ${style.backBg} ${style.backText}`}
        >
          {/* Lanyard Hole on Back */}
          <div>
            <div className="mx-auto mb-2 flex flex-col items-center">
              <div
                aria-hidden="true"
                className="h-3.5 w-14 rounded-full border-[3px] border-ink bg-cream"
              />
            </div>

            <div className="border-b-[3px] border-ink pb-2">
              <span className="inline-block max-w-full truncate rounded-[3px] border-2 border-ink bg-white px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-extrabold uppercase text-ink">
                {member.role}
              </span>
            </div>
          </div>

          {/* Focus & Stack */}
          <div className="my-auto rounded-[8px] border-[3px] border-ink bg-white p-2.5 sm:p-3.5 text-ink shadow-[4px_4px_0_#111]">
            <span className="inline-block rounded-[3px] border-2 border-ink bg-g-yellow px-1.5 font-mono text-[10px] font-extrabold uppercase text-ink">
              FOCUS
            </span>
            <p className="mt-1.5 text-[11px] sm:text-sm font-semibold leading-snug text-ink">
              {style.focus}
            </p>
          </div>

          {/* Social Links & Barcode Strip */}
          <div>
            <div className="flex items-center justify-between gap-2">
              {SOCIALS.map((soc) => {
                const href = PROFILE_LINKS[member.id]?.[soc.key];
                return href ? (
                  <a
                    key={soc.label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                    aria-label={`${member.name} on ${soc.title} (opens in a new tab)`}
                    className="flex-1 rounded-[4px] bg-cream py-1 text-center font-mono text-[10px] sm:text-xs font-extrabold text-ink brutal-btn"
                  >
                    {soc.label}
                  </a>
                ) : (
                  <span
                    key={soc.label}
                    aria-label={`${member.name} has no ${soc.title} link yet`}
                    title={`No ${soc.title} link yet`}
                    className="flex-1 cursor-not-allowed rounded-[4px] border-2 border-dashed border-ink/50 bg-white/40 py-1 text-center font-mono text-[10px] sm:text-xs font-extrabold text-ink/40"
                  >
                    {soc.label}
                  </span>
                );
              })}
            </div>
            <div
              aria-hidden="true"
              className="mt-2.5 flex h-5 items-center justify-center overflow-hidden rounded-[3px] border-2 border-ink bg-white px-2 font-mono text-[10px] font-black tracking-[0.2em] text-ink"
            >
              <span className="shrink-0 tracking-[0.08em]">GDG ON CAMPUS · VIIT26</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TierLabel({ label, count, bg }: { label: string; count: number; bg: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className={`shrink-0 rounded-[4px] border-[3px] border-ink px-2.5 py-1 font-mono text-[11px] font-extrabold uppercase shadow-[3px_3px_0_#111] ${bg}`}
      >
        {label}
      </span>
      <span aria-hidden="true" className="h-[3px] flex-1 bg-ink/15" />
      <span className="shrink-0 font-mono text-[11px] font-extrabold text-ink/60">
        {String(count).padStart(2, "0")} MEMBERS
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Phones: no flip cards and no sideways scrolling. Core leadership   */
/*  is a 2x2 photo grid, domain leads a compact roster that scrolls    */
/*  with the page. From `sm` up the flip ID cards take over.           */
/* ------------------------------------------------------------------ */

function ProfileButtons({ member }: { member: TeamMember }) {
  return (
    <>
      {SOCIALS.map((soc) => {
        const href = PROFILE_LINKS[member.id]?.[soc.key];
        const box = "grid h-8 min-w-10 flex-1 place-items-center rounded-[4px] px-2 font-mono text-[11px] font-extrabold";
        return href ? (
          <a
            key={soc.key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on ${soc.title} (opens in a new tab)`}
            className={`${box} bg-cream text-ink brutal-btn`}
          >
            {soc.label}
          </a>
        ) : (
          <span
            key={soc.key}
            aria-label={`${member.name} has no ${soc.title} link yet`}
            className={`${box} border-2 border-dashed border-ink/40 text-ink/35`}
          >
            {soc.label}
          </span>
        );
      })}
    </>
  );
}

function MiniPhoto({ member, sizes }: { member: TeamMember; sizes: string }) {
  return member.photo ? (
    <Image
      src={member.photo}
      alt={`Photo of ${member.name}, ${member.role}`}
      fill
      sizes={sizes}
      className="object-cover object-[center_25%]"
    />
  ) : (
    <div
      role="img"
      aria-label={`Photo placeholder for ${member.name}`}
      className="grid h-full w-full place-items-center bg-halftone font-display text-xl font-extrabold text-ink"
    >
      {initials(member.name)}
    </div>
  );
}

function LeaderTile({ member }: { member: TeamMember }) {
  const style = ROLE_STYLES[member.role];
  return (
    <li className="flex flex-col rounded-[8px] border-[3px] border-ink bg-white p-2 shadow-[4px_4px_0_#111]">
      <div className="relative aspect-square w-full overflow-hidden rounded-[5px] border-[3px] border-ink bg-cream">
        <MiniPhoto member={member} sizes="(max-width: 639px) 45vw, 1px" />
        <span
          className={`absolute left-1.5 top-1.5 rounded-[3px] border-2 border-ink px-1.5 py-px font-mono text-[9px] font-extrabold uppercase shadow-[2px_2px_0_#111] ${style.roleBg}`}
        >
          {member.role}
        </span>
      </div>
      <h3 className="mt-2 line-clamp-2 min-h-[2.1em] font-display text-[13px] font-extrabold uppercase leading-[1.05] tracking-tight text-ink">
        {member.name}
      </h3>
      <p className="mt-0.5 truncate font-mono text-[10px] font-bold text-ink/70">{member.branchYear}</p>
      <div className="mt-2 flex gap-2">
        <ProfileButtons member={member} />
      </div>
    </li>
  );
}

function LeadRow({ member }: { member: TeamMember }) {
  const style = ROLE_STYLES[member.role];
  return (
    <li className="flex items-center gap-3 rounded-[8px] border-[3px] border-ink bg-white p-2 shadow-[4px_4px_0_#111]">
      <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[5px] border-[3px] border-ink bg-cream">
        <MiniPhoto member={member} sizes="68px" />
      </div>
      <div className="min-w-0 flex-1">
        <span
          className={`inline-block max-w-full truncate rounded-[3px] border-2 border-ink px-1.5 py-px font-mono text-[9px] font-extrabold uppercase ${style.roleBg}`}
        >
          {member.role}
        </span>
        <h3 className="mt-1 line-clamp-2 font-display text-[15px] font-extrabold uppercase leading-[1.05] tracking-tight text-ink">
          {member.name}
        </h3>
        <p className="mt-0.5 truncate font-mono text-[10px] font-bold text-ink/70">{member.branchYear}</p>
      </div>
      <div className="flex w-11 shrink-0 flex-col gap-1.5">
        <ProfileButtons member={member} />
      </div>
    </li>
  );
}

export default function Team() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  const renderTier = (members: TeamMember[], offset: number) =>
    members.map((member, i) => (
      <IdCard
        key={member.id}
        member={member}
        badgeNo={offset + i + 1}
        delay={(i % 4) * 0.06}
        isFlipped={Boolean(flippedIds[member.id])}
        onToggle={() => toggleFlip(member.id)}
        springConfig={springConfig}
        reducedMotion={prefersReducedMotion}
      />
    ));

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="overflow-x-clip py-10 sm:py-12 border-t-[3px] border-ink bg-white/50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-yellow px-3 py-1 font-mono text-xs font-extrabold uppercase text-ink shadow-[3px_3px_0_#111]">
              <span>05 — &lt;team/&gt; core crew</span>
            </div>
            <h2
              id="team-heading"
              className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Meet the{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-blue px-2.5 py-0.5 text-white shadow-[4px_4px_0_#111] -rotate-1">
                organizers.
              </span>
            </h2>
          </div>

          <p className="hidden max-w-md font-mono text-sm font-bold text-ink/80 sm:block">
            {"Hover or tap a badge to flip it. Tap again to flip back."}
          </p>
        </div>

        {/* Tier 1: Core leadership (3 Organisers + Co-Lead) */}
        <TierLabel label="Core leadership" count={LEADERSHIP.length} bg="bg-g-blue text-white" />
        <ul aria-label="Core leadership" className="grid grid-cols-2 gap-3 sm:hidden">
          {LEADERSHIP.map((m) => (
            <LeaderTile key={m.id} member={m} />
          ))}
        </ul>
        <div role="group" aria-label="Core leadership" className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {renderTier(LEADERSHIP, 0)}
        </div>

        {/* Tier 2: Domain leads, below a divider */}
        <div className="mt-8 sm:mt-10 border-t-[3px] border-dashed border-ink/25 pt-6 sm:pt-8">
          <TierLabel label="Domain leads" count={DOMAIN_LEADS.length} bg="bg-g-green text-ink" />
          <ul aria-label="Domain leads" className="flex flex-col gap-3 sm:hidden">
            {DOMAIN_LEADS.map((m) => (
              <LeadRow key={m.id} member={m} />
            ))}
          </ul>
          <div
            role="group"
            aria-label="Domain leads"
            className="hidden gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {renderTier(DOMAIN_LEADS, LEADERSHIP.length)}
          </div>
        </div>
      </div>
    </section>
  );
}
