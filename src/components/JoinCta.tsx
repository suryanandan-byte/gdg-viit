"use client";

import { motion, useReducedMotion } from "motion/react";
import Faq from "@/components/Faq";

export default function JoinCta() {
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  const stampSpring = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 550, damping: 24 } as const);

  return (
    <section
      id="join"
      aria-labelledby="join-heading"
      className="relative w-full border-t-[3px] border-ink bg-g-red bg-halftone py-10 sm:py-12 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left: Join CTA */}
        <div className="lg:col-span-7 lg:pt-4">
        {/* Floating Sticker Top Left */}
        <motion.div
          initial={
            prefersReducedMotion
              ? { scale: 1, rotate: -3, opacity: 1 }
              : { scale: 1.4, rotate: -14, opacity: 0 }
          }
          whileInView={{ scale: 1, rotate: -3, opacity: 1 }}
          viewport={{ once: true }}
          transition={stampSpring}
          className="mb-4 inline-flex items-center gap-2 rounded-[4px] bg-g-yellow px-4 py-1.5 font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink brutal-sticker"
        >
          <span>Join GDG on Campus VIIT</span>
        </motion.div>

        {/* Huge White Headline */}
        <motion.h2
          id="join-heading"
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={springConfig}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[-0.03em] leading-[0.94] text-white drop-shadow-[4px_4px_0_#111]"
        >
          Your next commit starts here.
        </motion.h2>

        <motion.p
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            ...springConfig,
            delay: prefersReducedMotion ? 0 : 0.08,
          }}
          className="mt-3 max-w-md text-sm sm:text-base font-semibold leading-relaxed text-white/95"
        >
          Join 500+ builders at VIIT. Early RSVPs to every workshop and
          hackathon.
        </motion.p>

        {/* Black CTA Button + Sticker Pill */}
        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            ...springConfig,
            delay: prefersReducedMotion ? 0 : 0.15,
          }}
          className="mt-6 flex flex-wrap items-center gap-4"
        >
          <a
            href="https://chat.whatsapp.com/Jd97wtBkfiO9ghDFb2rNKF"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-[6px] border-[3px] border-cream bg-ink px-5 py-3 font-display text-base sm:text-lg font-extrabold uppercase tracking-tight text-cream shadow-[6px_6px_0_#FFF8E7] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_#FFF8E7] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <span>Join the chapter now</span>
            <span aria-hidden="true" className="text-g-yellow">
              →
            </span>
          </a>

          <span className="rounded-[4px] bg-g-green px-4 py-2 font-mono text-xs sm:text-sm font-extrabold uppercase text-ink brutal-sticker rotate-2">
            ✦ Open to CSE &amp; allied branches
          </span>
        </motion.div>
        </div>

        {/* Right: compact FAQ sub-section */}
        <div className="lg:col-span-5">
          <Faq />
        </div>
      </div>
    </section>
  );
}
