"use client";

import React, { useRef, memo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import {
  ArrowUpRight,
  ExternalLink,
  GraduationCap,
  Building,
  Gamepad2,
  UtensilsCrossed,
  Coins,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.416 22 12c0-5.523-4.477-10-10-10z"
    />
  </svg>
);

export type ProjectEntry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
};

export interface ProjectsTimelineProps {
  title?: string;
  description?: string;
  entries?: ProjectEntry[];
  className?: string;
}

export const defaultEntries: ProjectEntry[] = [
  {
    icon: GraduationCap,
    title: "Pathly",
    subtitle: "AI Education Platform • Vercel Host",
    description:
      "Web education platform with smart learning paths and integrated AI support to customize study programs for each student.",
    items: [
      "Custom smart paths based on student competency goals",
      "Integrated AI assistant for code execution and debugging",
      "Progress tracking dashboard with interactive charts",
    ],
    image: "/Screenshot 2026-04-30 221346.png",
    demoUrl: "https://pathly-six.vercel.app/",
    githubUrl: "https://github.com/Jullystian017/Pathly",
  },
  {
    icon: Building,
    title: "NusaEstate",
    subtitle: "Smart Real Estate & Leads • Vercel Host",
    description:
      "Real estate web platform with smart lead management and an intelligent AI helper to match buyers with properties.",
    items: [
      "AI helper with smart matching algorithm for listings",
      "Interactive real-time lead generation forms",
      "Advanced dashboard with analytics and contact pipeline",
    ],
    image: "/Screenshot 2026-06-06 220128.png",
    demoUrl: "https://nusaestate.vercel.app/",
    githubUrl: "https://github.com/Jullystian017/Nusaestate",
  },
  {
    icon: Gamepad2,
    title: "LifeQuest",
    subtitle: "Gamified Developer Productivity • RPG Concept",
    description:
      "A premium, developer-centric productivity platform that gamifies the software development lifecycle. Built for those who want to track their progress, crush their bugs, and level up their careers with the same intensity as an open-world RPG.",
    items: [
      "Experience points and level-up mechanics for task completion",
      "Interactive RPG quests for debugging and feature implementation",
      "Multiplayer developer parties and achievements system",
    ],
    image: "/Screenshot 2026-03-21 215446.png",
    demoUrl: "https://lifequest.web.id/",
    githubUrl: "https://github.com/Jullystian017/Lifequest",
  },
  {
    icon: UtensilsCrossed,
    title: "TakumaEat",
    subtitle: "Japanese Online Ordering System • Premium Restaurant",
    description:
      "An online ordering system designed for premium Japanese dining experiences, focusing on speed, minimal aesthetics, and catalog tracking.",
    items: [
      "Premium aesthetics mimicking authentic Japanese style",
      "Fast ordering queue processing and checkout flow",
      "Advanced admin dashboard for dish catalog management",
    ],
    image: "/Screenshot 2026-06-06 220441.png",
    demoUrl: "https://takumaeat.vercel.app/",
    githubUrl: "https://github.com/Jullystian017/TakumaEat",
  },
  {
    icon: Coins,
    title: "CashMind",
    subtitle: "AI Personal Finance Manager • Budgeting",
    description:
      "An AI-powered personal finance management web application. Helps users track income/expenses, set budgets, save for goals, and get smart financial insights.",
    items: [
      "AI financial insights and smart expense forecasts",
      "Budgeting systems with dynamic goals and achievements",
      "Clean interactive charts for transaction categorization",
    ],
    image: "/Screenshot 2026-02-20 124416.png",
    demoUrl: "https://cashmind-chi.vercel.app/",
    githubUrl: "https://github.com/Jullystian017/cashmind",
  },
];

/* ─────────────────────────────────────────────────────────────
   PORTAL MODAL — always centered in viewport, never clipped
───────────────────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectEntry;
  onClose: () => void;
}) {
  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Bring native cursor to front while modal is open
    const cursorEl = document.querySelector<HTMLElement>(
      "[data-custom-cursor]"
    );
    if (cursorEl) cursorEl.style.zIndex = "999999";

    return () => {
      document.body.style.overflow = prev;
      if (cursorEl) cursorEl.style.zIndex = "";
    };
  }, []);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    /* Fixed overlay — position:fixed + 100dvh guarantees true viewport center */
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        // make this layer own a new stacking context
        isolation: "isolate",
      }}
      className="select-none animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        style={{ position: "absolute", inset: 0 }}
        className="bg-black/85 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-3xl bg-[#0c0c0e] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.9)] flex flex-col animate-in zoom-in-95 duration-300 ease-out"
        style={{
          zIndex: 1,
          maxHeight: "calc(100dvh - 2rem)",
          /* allow native cursor to show on top of this stacking context */
          cursor: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600 hover:rotate-90 transition-all duration-300 cursor-pointer active:scale-90 shadow-lg"
          aria-label="Close details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ── IMAGE (full width, full height, no crop) ── */}
        {project.image && (
          <div
            className="w-full bg-[#080809] shrink-0 flex items-center justify-center overflow-hidden"
            style={{ minHeight: "260px", maxHeight: "500px" }}
          >
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="w-full h-auto block object-contain"
              style={{ maxHeight: "500px" }}
            />
            {/* Fade edge */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0c0c0e] to-transparent pointer-events-none" />
          </div>
        )}

        {/* ── CONTENT (scrollable) ── */}
        <div className="flex flex-col overflow-y-auto p-6 sm:p-8 gap-5">

          {/* ── ACTION BUTTONS — at the top ── */}
          <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-white/5 shrink-0">
            {/* GitHub */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group/btn relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-normal",
                  "border border-white/10 bg-white/[0.03] text-zinc-300 overflow-hidden",
                  "transition-all duration-300",
                  "hover:border-white/30 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]",
                  "active:scale-95 cursor-pointer"
                )}
              >
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                <GithubIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
                <span>GitHub</span>
              </a>
            )}
            {/* Live Demo */}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group/btn relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-normal",
                  "bg-white text-black overflow-hidden",
                  "transition-all duration-300",
                  "hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.03]",
                  "active:scale-95 cursor-pointer"
                )}
              >
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/20 via-white/5 to-white/20 pointer-events-none" />
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                <span>Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
            )}
          </div>

          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/5 text-rose-400 border border-white/10">
                <project.icon className="h-5 w-5" />
              </div>
              <span className="text-xs text-zinc-500 font-mono tracking-tighter uppercase">
                {project.subtitle}
              </span>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-zinc-400 font-light">
            {project.description}
          </p>

          {/* Key Features */}
          {project.items && project.items.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Key Features
              </h4>
              <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                <ul className="space-y-3">
                  {project.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300"
                    >
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                      <span className="leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
const ProjectsTimeline = memo(function ProjectsTimeline({
  title = "Featured Projects",
  description =
    "A curated collection of web applications, AI platforms, and online systems built with a focus on details, clean code, and premium performance.",
  entries = defaultEntries,
}: ProjectsTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<ProjectEntry | null>(null);

  useGSAP(
    () => {
      const mediaQuery = window.matchMedia("(min-width: 768px)");
      if (!mediaQuery.matches) return;

      const section = sectionRef.current;
      const pinEl = pinRef.current;
      const scroll = scrollRef.current;
      const container = containerRef.current;
      if (!section || !pinEl || !scroll || !container) return;

      const getScrollAmount = () => {
        const rect = container.getBoundingClientRect();
        const style = window.getComputedStyle(container);
        const paddingLeft = parseFloat(style.paddingLeft) || 0;
        const leftOffset = rect.left + paddingLeft;
        return -(scroll.scrollWidth - window.innerWidth + leftOffset);
      };

      gsap.to(scroll, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: pinEl,
          start: "top top",
          end: () => {
            const rect = container.getBoundingClientRect();
            const style = window.getComputedStyle(container);
            const paddingLeft = parseFloat(style.paddingLeft) || 0;
            const leftOffset = rect.left + paddingLeft;
            return `+=${scroll.scrollWidth - window.innerWidth + leftOffset}`;
          },
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t1 = setTimeout(refresh, 200);
      const t2 = setTimeout(refresh, 800);
      const t3 = setTimeout(refresh, 2000);

      return () => {
        window.removeEventListener("load", refresh);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full bg-transparent text-neutral-200 overflow-x-clip py-12 sm:py-20 md:py-0"
      >
        <div
          ref={pinRef}
          className="w-full h-full md:h-screen md:flex md:items-center"
        >
          <div
            ref={containerRef}
            className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative md:h-full md:flex md:flex-col md:justify-center"
          >
            {/* Section Header */}
            <div className="md:absolute md:top-12 md:left-8 md:z-10 w-full border-b border-white/5 pb-8 mb-10 md:mb-0 max-w-3xl">
              <h2 className="font-instrument font-medium text-3xl sm:text-5xl text-white tracking-tight">
                {title}
              </h2>
              <p className="mt-3 text-sm text-zinc-500 font-light leading-relaxed">
                {description}
              </p>
            </div>

            {/* Horizontal Scroll Track */}
            <div
              ref={scrollRef}
              className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8 mt-8 md:mt-0 md:pt-40 w-full md:w-max"
            >
              {entries.map((entry, index) => (
                <div
                  key={index}
                  data-cursor="open"
                  onClick={() => setActiveProject(entry)}
                  className="relative flex flex-col w-full md:w-[38vw] md:max-w-[520px] shrink-0 group cursor-pointer active:scale-[0.99] transition-all duration-300"
                >
                  <article className="flex flex-col flex-1 w-full rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.04]">
                    {/* Fixed-height image container — uniform across all cards */}
                    {entry.image && (
                      <div
                        className="w-full bg-black/30 overflow-hidden flex items-center justify-center shrink-0"
                        style={{ height: "260px" }}
                      >
                        <img
                          src={entry.image}
                          alt={`${entry.title} preview`}
                          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                          onLoad={() => ScrollTrigger.refresh()}
                        />
                      </div>
                    )}

                    {/* Text below image */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-white/5 text-white border border-white/10">
                            <entry.icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono tracking-tighter uppercase">
                            {entry.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-600 font-sans tracking-wide block md:hidden">
                          tap to open ↗
                        </span>
                      </div>

                      <h3 className="text-lg font-medium leading-tight tracking-tight md:text-xl text-white">
                        {entry.title}
                      </h3>

                      <p className="text-xs leading-relaxed md:text-sm text-zinc-400 font-light line-clamp-2">
                        {entry.description}
                      </p>
                    </div>
                  </article>
                </div>
              ))}

              {/* Trailing spacer */}
              <div className="hidden md:block shrink-0 w-[8vw]" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* Portal modal — outside section, always viewport-centered */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
});

export default ProjectsTimeline;
