"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

interface UpcomingEvent {
  id: string;
  date: string;
  stickerColor: string;
  stickerRotate: string;
  tag: string;
  tagColor: string;
  title: string;
  meta: string;
  image: string;
  alt: string;
}

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: "build-with-ai",
    date: "SOON...",
    stickerColor: "bg-g-yellow text-ink",
    stickerRotate: "-rotate-3",
    tag: "AI / ML",
    tagColor: "bg-g-yellow text-ink",
    title: "Build with AI",
    meta: "Gemini Lab · 10:00 AM",
    image: "/images/gallery-5.svg",
    alt: "Build with AI workshop poster",
  },
  {
    id: "cloud-study-jam",
    date: "SOON...",
    stickerColor: "bg-g-green text-ink",
    stickerRotate: "rotate-2",
    tag: "CLOUD",
    tagColor: "bg-g-green text-ink",
    title: "Cloud Study Jam",
    meta: "Lab 04 · 2:00 PM",
    image: "/images/past-2.svg",
    alt: "Google Cloud Study Jam poster",
  },
  {
    id: "hack-viit",
    date: "SOON...",
    stickerColor: "bg-g-red text-white",
    stickerRotate: "-rotate-2",
    tag: "HACKATHON",
    tagColor: "bg-g-blue text-white",
    title: "HackVIIT 36h",
    meta: "Main Block · 36 hrs",
    image: "/images/past-1.svg",
    alt: "HackVIIT hackathon poster",
  },
  {
    id: "compose-camp",
    date: "SOON...",
    stickerColor: "bg-g-blue text-white",
    stickerRotate: "rotate-3",
    tag: "ANDROID",
    tagColor: "bg-g-red text-white",
    title: "Compose Camp",
    meta: "Auditorium · 11:00 AM",
    image: "/images/past-3.svg",
    alt: "Android Compose Camp poster",
  },
];

export default function UpcomingEvents() {
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 500, damping: 28 } as const);

  return (
    <section
      id="upcoming"
      aria-labelledby="upcoming-heading"
      className="py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-[4px] border-[3px] border-ink bg-g-red px-3 py-1 font-mono text-xs font-extrabold uppercase text-white shadow-[3px_3px_0_#111]">
              <span>03 — &lt;events/&gt; queue</span>
            </div>
            <h2
              id="upcoming-heading"
              className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[0.95] text-ink"
            >
              Coming{" "}
              <span className="inline-block rounded-[4px] border-[3px] border-ink bg-g-yellow px-2 py-0.5 text-ink shadow-[4px_4px_0_#111] rotate-1">
                up next.
              </span>
            </h2>
          </div>

          <p className="max-w-sm font-mono text-xs font-bold text-ink/80">
            {"Free for all VIIT students. Grab a seat early."}
          </p>
        </div>

        {/* Compact Card Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {UPCOMING_EVENTS.map((event, idx) => (
            <motion.article
              key={event.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 36 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                ...springConfig,
                delay: prefersReducedMotion ? 0 : idx * 0.07,
              }}
              className="group relative flex flex-col justify-between rounded-[6px] bg-white p-3 brutal-card-interactive"
            >
              {/* Rotated Date Sticker */}
              <div
                className={`absolute -top-3 right-3 z-10 rounded-[4px] px-2 py-0.5 font-mono text-[11px] font-extrabold uppercase brutal-sticker ${event.stickerColor} ${event.stickerRotate}`}
              >
                {event.date}
              </div>

              <div>
                {/* Image: grayscale -> color + tilt on hover */}
                <div className="relative overflow-hidden rounded-[4px] border-[3px] border-ink bg-cream">
                  <Image
                    src={event.image}
                    alt={event.alt}
                    width={480}
                    height={330}
                    className="aspect-[16/10] h-auto w-full object-cover grayscale transition-all duration-200 ease-out group-hover:grayscale-0 group-hover:rotate-[1.5deg] group-hover:scale-[1.04]"
                  />
                  <span
                    className={`absolute bottom-1.5 left-1.5 rounded-[3px] border-2 border-ink px-1.5 py-0.5 font-mono text-[10px] font-extrabold uppercase shadow-[2px_2px_0_#111] ${event.tagColor}`}
                  >
                    {event.tag}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-base sm:text-lg font-extrabold uppercase tracking-tight leading-tight text-ink">
                  {event.title}
                </h3>
                <p className="mt-0.5 font-mono text-[11px] font-bold text-ink/70">
                  {event.meta}
                </p>
              </div>

              {/* Footer Link */}
              <a
                href="#join"
                className="mt-3 flex items-center justify-between border-t-[3px] border-ink pt-2 font-mono text-[11px] font-extrabold uppercase text-ink"
              >
                <span>RSVP</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-[4px] border-2 border-ink bg-g-yellow transition-transform duration-120 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
