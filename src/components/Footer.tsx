import { BracketMarkSmall } from "./Navbar";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/gdgc_viit/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/gdg-oncampus-viit/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="8" y1="11" x2="8" y2="16" />
        <line x1="8" y1="8" x2="8" y2="8.01" />
        <path d="M12 16V11M12 13C12 11.5 13.5 11 14.5 11C15.5 11 16.5 11.8 16.5 13.5V16" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t-[3px] border-ink bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Column 1: Brand + Campus Address */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-[4px] border-2 border-cream bg-cream px-1.5 py-0.5">
                <BracketMarkSmall />
              </div>
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-cream">
                GDG on Campus · VIIT
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm sm:text-base text-cream/85 leading-relaxed">
              Vignan&apos;s Institute of Information Technology (Autonomous),
              Beside VSEZ, Duvvada, Visakhapatnam, Andhra Pradesh 530049.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target={soc.href.startsWith("http") ? "_blank" : undefined}
                  rel={soc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={soc.name}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border-2 border-cream bg-ink text-cream shadow-[3px_3px_0_#FBBC04] transition-transform duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-g-yellow hover:text-ink hover:border-ink"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-extrabold uppercase tracking-widest text-g-yellow">
              {"Navigation"}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 font-mono text-sm font-bold">
              <li>
                <a href="#about" className="hover:text-g-yellow transition-colors">
                  01 — What We Do
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-g-yellow transition-colors">
                  02 — Events Spotlight
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-g-yellow transition-colors">
                  03 — Core Crew
                </a>
              </li>
              <li>
                <a href="#upcoming" className="hover:text-g-yellow transition-colors">
                  05 — Event Queue
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-g-yellow transition-colors">
                  06 — FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/Jd97wtBkfiO9ghDFb2rNKF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-g-yellow transition-colors text-g-yellow"
                >
                  07 — Join the Chapter ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Handles (vertical) */}
          <div className="md:col-span-4">
            <h2 className="font-mono text-xs font-extrabold uppercase tracking-widest text-g-green">
              {"Social Handles"}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {SOCIAL_LINKS.map((soc) => (
                <li key={soc.name}>
                  <a
                    href={soc.href}
                    aria-label={soc.name}
                    className="inline-flex items-center gap-3 rounded-[4px] px-3 py-2 font-mono text-sm font-bold text-cream hover:text-g-yellow transition-colors w-full"
                  >
                    {soc.icon}
                    <span>{soc.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="mt-12 flex flex-col gap-3 border-t-2 border-cream/20 pt-8 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-cream/75">
          <p className="font-extrabold text-g-yellow">
            Built by GDG Team VIIT
          </p>
        </div>
      </div>
    </footer>
  );
}
