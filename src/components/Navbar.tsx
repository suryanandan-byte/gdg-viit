"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const NAV_LINKS = [
  { label: "About", href: "#about", tag: "01", color: "bg-g-blue text-white" },
  { label: "Events", href: "#events", tag: "02", color: "bg-g-green text-ink" },
  { label: "Team", href: "#team", tag: "03", color: "bg-g-yellow text-ink" },
  { label: "Contact Us", href: "#footer", tag: "04", color: "bg-g-red text-white" },
];

export function BracketMarkSmall() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex items-center justify-center w-11 h-9 select-none shrink-0"
    >
      {/* Left '<' top stroke (Red) */}
      <span className="absolute left-0.5 top-1.5 w-4 h-2 bg-g-red border-2 border-ink rounded-[2px] -rotate-[32deg] shadow-[1.5px_1.5px_0_#111]" />
      {/* Left '<' bottom stroke (Blue) */}
      <span className="absolute left-0.5 bottom-1.5 w-4 h-2 bg-g-blue border-2 border-ink rounded-[2px] rotate-[32deg] shadow-[1.5px_1.5px_0_#111]" />
      {/* Right '>' top stroke (Green) */}
      <span className="absolute right-0.5 top-1.5 w-4 h-2 bg-g-green border-2 border-ink rounded-[2px] rotate-[32deg] shadow-[1.5px_1.5px_0_#111]" />
      {/* Right '>' bottom stroke (Yellow) */}
      <span className="absolute right-0.5 bottom-1.5 w-4 h-2 bg-g-yellow border-2 border-ink rounded-[2px] -rotate-[32deg] shadow-[1.5px_1.5px_0_#111]" />
    </span>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-cream border-b-[3px] border-ink">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <a
            href="#"
            className="group flex items-center gap-3 focus-visible:outline-3 focus-visible:outline-ink"
          >
            <div className="flex items-center justify-center rounded-[4px] border-[3px] border-ink bg-white px-1.5 py-0.5 shadow-[3px_3px_0_#111] transition-transform duration-120 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
              <BracketMarkSmall />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-extrabold tracking-tight leading-none text-ink">
                GDG on Campus · VIIT
              </span>
              <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-ink/75 mt-0.5">
                Visakhapatnam · IN
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 font-mono text-sm font-bold text-ink rounded-[4px] border-2 border-transparent hover:border-ink hover:bg-white hover:shadow-[3px_3px_0_#111] transition-all duration-120"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#join"
              className="hidden sm:inline-flex items-center gap-2 rounded-[6px] bg-g-yellow px-4 py-2 font-mono text-sm font-extrabold uppercase tracking-tight text-ink brutal-btn"
            >
              <span>Join the chapter</span>
              <span aria-hidden="true">→</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-brutalist-menu"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-[4px] bg-g-yellow text-ink brutal-btn"
            >
              <span className="sr-only">Menu</span>
              <div className="relative flex h-5 w-6 flex-col justify-between">
                <span
                  className={`block h-[3px] w-full bg-ink transition-transform duration-150 ${
                    menuOpen ? "translate-y-[8.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[3px] w-full bg-ink transition-opacity duration-150 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-[3px] w-full bg-ink transition-transform duration-150 ${
                    menuOpen ? "-translate-y-[8.5px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Brutalist Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-brutalist-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            className="fixed inset-0 top-[67px] z-40 flex flex-col justify-between bg-cream p-4 sm:p-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70 pb-1 border-b-2 border-ink">
                {"Navigation Directory"}
              </div>
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={
                    prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }
                  }
                  transition={{
                    ...springConfig,
                    delay: prefersReducedMotion ? 0 : idx * 0.05,
                  }}
                  className={`flex items-center justify-between rounded-[6px] p-4 font-display text-2xl font-extrabold uppercase tracking-tight brutal-btn ${link.color}`}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-sm font-extrabold border-2 border-current px-2 py-0.5 rounded-[4px]">
                    {link.tag} ↗
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={
                prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...springConfig,
                delay: prefersReducedMotion ? 0 : 0.25,
              }}
              className="mt-6 flex flex-col gap-3 border-t-[3px] border-ink pt-4"
            >
              <a
                href="#join"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-[6px] bg-g-yellow py-4 font-display text-xl font-extrabold uppercase text-ink brutal-btn"
              >
                <span>Join the chapter</span>
                <span aria-hidden="true">→</span>
              </a>
              <p className="font-mono text-xs font-bold text-center text-ink/80">
                Vignan&apos;s Institute of Information Technology · Duvvada
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
