"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { FlapWord } from "./hero/FlapWord";
import { EventDeck } from "./hero/EventDeck";
import { SpinBadge } from "./hero/SpinBadge";
import { ParallaxShape, type ShapeKind } from "./hero/Shapes";
import { introOffset } from "./Splash";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const FLAP_WORDS = ["BREAK.", "DEBUG.", "LEARN.", "SCALE."];

const WIPE_COLORS = ["bg-g-blue", "bg-g-red", "bg-g-yellow", "bg-g-green"];

const SHAPES: {
  kind: ShapeKind;
  color: string;
  size: number;
  depth: number;
  className: string;
  bobDelay: number;
  bobDuration: number;
}[] = [
  { kind: "sparkle", color: "#FBBC04", size: 46, depth: 34, className: "left-[47%] top-[7%] hidden sm:block", bobDelay: 0, bobDuration: 5.2 },
  { kind: "circle", color: "#4285F4", size: 34, depth: -22, className: "right-[4%] top-[6%] hidden lg:block", bobDelay: 1.1, bobDuration: 6 },
  { kind: "triangle", color: "#EA4335", size: 36, depth: 26, className: "left-[44%] bottom-[16%] hidden lg:block", bobDelay: 0.6, bobDuration: 4.6 },
  { kind: "squiggle", color: "#34A853", size: 84, depth: -18, className: "right-[3%] bottom-[5%] hidden md:block", bobDelay: 1.8, bobDuration: 5.6 },
  { kind: "plus", color: "#FFFFFF", size: 26, depth: 40, className: "left-[2%] top-[3%] hidden xl:block", bobDelay: 0.3, bobDuration: 4.2 },
  { kind: "half", color: "#34A853", size: 40, depth: -30, className: "right-[7%] top-[9%] block sm:hidden", bobDelay: 0.9, bobDuration: 5 },
];

/* Deterministic per-letter tilt so server and client render identically. */
const letterTilt = (i: number) => ((i * 47) % 13) - 6;

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function DropLetters({ text, delay, reduced }: { text: string; delay: number; reduced: boolean }) {
  return (
    <>
      {text.split("").map((ch, i) => {
        const r = letterTilt(i);
        return (
          <motion.span
            key={i}
            className="inline-block origin-bottom"
            initial={reduced ? false : { y: "-130%", rotate: r * 4, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 520, damping: 17, delay: delay + i * 0.055 }}
            whileHover={
              reduced
                ? undefined
                : { y: "-14%", rotate: r * 1.6, transition: { type: "spring", stiffness: 700, damping: 11 } }
            }
          >
            {ch}
          </motion.span>
        );
      })}
    </>
  );
}

function Sticker({
  children,
  className,
  rotate,
  delay,
  reduced,
  constraints,
}: {
  children: ReactNode;
  className: string;
  rotate: number;
  delay: number;
  reduced: boolean;
  constraints: RefObject<HTMLElement | null>;
}) {
  return (
    <motion.div
      drag
      dragConstraints={constraints}
      dragElastic={0.15}
      initial={reduced ? false : { scale: 1.6, rotate: rotate * 4, opacity: 0 }}
      animate={{ scale: 1, rotate, opacity: 1 }}
      transition={{ type: "spring", stiffness: 560, damping: 20, delay }}
      whileHover={{ scale: 1.06, rotate: 0 }}
      whileDrag={{ scale: 1.12, rotate: 0, boxShadow: "9px 9px 0 #111" }}
      className={`absolute z-30 cursor-grab touch-none select-none rounded-[4px] font-mono text-xs font-extrabold uppercase tracking-tight brutal-sticker active:cursor-grabbing sm:text-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const reduced = useReducedMotion() ?? false;
  const heroRef = useRef<HTMLElement | null>(null);
  // hold entrances while the first-visit splash plays
  const [o] = useState(introOffset);

  // failsafe: unmount the intro wipe even if CSS animations are throttled/paused
  const [wipeDone, setWipeDone] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setWipeDone(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  // cursor parallax (mouse only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 110, damping: 18, mass: 0.5 });
  const smy = useSpring(my, { stiffness: 110, damping: 18, mass: 0.5 });

  // scroll: hero exit progress + page scroll velocity
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const line1X = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const line3X = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const enter = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 26 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 480, damping: 28, delay: delay + o },
  });

  return (
    <section
      ref={heroRef}
      aria-labelledby="hero-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden pb-12 pt-6 sm:pb-14 sm:pt-8 lg:flex lg:min-h-[calc(85svh-5rem)] lg:items-center lg:py-10"
    >
      {/* intro wipe: four brand bars lift off the stage (pure CSS so it runs before hydration) */}
      {!wipeDone && (
        <div aria-hidden="true" className="hero-wipe pointer-events-none absolute inset-0 z-50 flex">
          {WIPE_COLORS.map((c, i) => (
            <div
              key={c}
              className={`hero-wipe-bar h-full flex-1 border-b-[3px] border-r-[3px] border-ink last:border-r-0 ${c}`}
              style={{ animationDelay: `${0.05 + i * 0.07}s` }}
            />
          ))}
        </div>
      )}

      {/* parallax background shapes */}
      {SHAPES.map((s) => (
        <ParallaxShape key={s.kind + s.className} {...s} mx={smx} my={smy} />
      ))}

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* ---------------- Left: copy ---------------- */}
          <div className="flex flex-col items-start lg:col-span-7">
            <motion.div
              {...enter(0.35)}
              className="mb-4 inline-flex items-center gap-2.5 rounded-[4px] border-[3px] border-ink bg-white px-3.5 py-1.5 font-mono text-xs font-extrabold tracking-tight text-ink shadow-[4px_4px_0_#111] sm:text-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-g-green opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-ink bg-g-green" />
              </span>
              <span>{"google developer groups on campus"}</span>
            </motion.div>

            <h1
              id="hero-heading"
              className="select-none font-display text-[2.6rem] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl md:text-7xl xl:text-[5rem]"
            >
              <span className="sr-only">Build. Break. Ship.</span>
              <span aria-hidden="true" className="block">
                <motion.span style={reduced ? undefined : { x: line1X }} className="block whitespace-nowrap">
                  <DropLetters text="BUILD." delay={o + 0.4} reduced={reduced} />
                </motion.span>
                <span className="my-2 block sm:my-3">
                  <FlapWord words={FLAP_WORDS} reduced={reduced} delay={o + 0.7} hold={2800} />
                </span>
                <motion.span
                  style={reduced ? undefined : { x: line3X }}
                  className="flex items-center gap-[0.12em] whitespace-nowrap"
                >
                  <span>
                    <DropLetters text="SHIP." delay={o + 1.05} reduced={reduced} />
                  </span>
                  <motion.span
                    initial={reduced ? false : { scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 14, delay: o + 1.45 }}
                    className="inline-block"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="hero-spin h-[0.5em] w-[0.5em]"
                      style={{ filter: "drop-shadow(3px 3px 0 #111)", overflow: "visible" }}
                    >
                      <path
                        d="M50 2 C55 36 64 45 98 50 C64 55 55 64 50 98 C45 64 36 55 2 50 C36 45 45 36 50 2Z"
                        fill="#EA4335"
                        stroke="#111"
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </motion.span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...enter(1.15)}
              className="mt-5 max-w-lg text-sm font-medium leading-relaxed text-ink/90 sm:text-base"
            >
              The student developer community at{" "}
              <strong className="font-extrabold underline decoration-g-red decoration-[3px] underline-offset-4">
                Vignan&apos;s Institute of Information Technology
              </strong>
              . Workshops, hackathons &amp; study jams, by students for students.
            </motion.p>

            <motion.div {...enter(1.25)} className="mt-6 flex w-full flex-wrap items-center gap-3 sm:w-auto">
              <a
                href="#events"
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-[6px] bg-g-blue px-5 py-3 font-mono text-sm font-extrabold uppercase tracking-tight text-white brutal-btn sm:flex-initial"
              >
                <span>Upcoming events</span>
                <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:translate-y-1">
                  ↓
                </span>
              </a>
              <a
                href="#join"
                className="group inline-flex flex-1 items-center justify-center gap-2.5 rounded-[6px] bg-white px-5 py-3 font-mono text-sm font-extrabold uppercase tracking-tight text-ink brutal-btn sm:flex-initial"
              >
                <span>Join us</span>
                <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>

            <motion.div
              {...enter(1.35)}
              className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-ink/80"
            >
              <span className="rounded-[4px] border-2 border-ink bg-white px-2.5 py-1">17.71° N · 83.17° E</span>
              <span className="rounded-[4px] border-2 border-dashed border-ink px-2.5 py-1">
                ✋ fling the polaroids · peel the stickers
              </span>
            </motion.div>
          </div>

          {/* ---------------- Right: event polaroid deck ---------------- */}
          <motion.div
            style={reduced ? undefined : { y: stageY }}
            className="relative flex items-center justify-center lg:col-span-5"
          >
            <EventDeck reduced={reduced} delay={o + 0.45} />

            {/* spinning badge — spins up with scroll speed */}
            <motion.div
              initial={reduced ? false : { scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 15, delay: o + 1.3 }}
              className="absolute -left-1 -top-14 z-20 sm:-left-10 sm:top-[4%]"
            >
              <SpinBadge reduced={reduced} velocity={scrollVelocity} className="w-24 sm:w-32" />
            </motion.div>

            {/* peelable stickers */}
            <Sticker
              constraints={heroRef}
              reduced={reduced}
              rotate={-5}
              delay={o + 1.5}
              className="-bottom-12 left-0 hidden bg-g-yellow px-3.5 py-1.5 text-ink sm:-left-6 sm:block"
            >
              ✦ est. on campus
            </Sticker>
            <Sticker
              constraints={heroRef}
              reduced={reduced}
              rotate={4}
              delay={o + 1.6}
              className="-right-1 -top-4 bg-g-green px-3.5 py-1.5 text-ink sm:-right-5"
            >
              free to join
            </Sticker>
            <Sticker
              constraints={heroRef}
              reduced={reduced}
              rotate={-3}
              delay={o + 1.7}
              className="-bottom-14 right-0 bg-g-red px-4 py-2 text-white sm:-right-4"
            >
              ⚡ CSE &amp; allied branches
            </Sticker>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
