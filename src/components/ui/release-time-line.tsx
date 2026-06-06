"use client";

import React, { useRef, memo, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ExternalLink, GraduationCap, Building, Gamepad2, UtensilsCrossed, Coins, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.164 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
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
    image:
      "/Screenshot 2026-04-30 221346.png",
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
    image:
      "/Screenshot 2026-06-06 220128.png",
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
    image:
      "/Screenshot 2026-03-21 215446.png",
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
    image:
      "/Screenshot 2026-06-06 220441.png",
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
    image:
      "/Screenshot 2026-02-20 124416.png",
    demoUrl: "https://cashmind-chi.vercel.app/",
    githubUrl: "https://github.com/Jullystian017/cashmind",
  },
];

const ProjectsTimeline = memo(function ProjectsTimeline({
  title = "Featured Projects",
  description = "A curated collection of web applications, AI platforms, and online systems built with a focus on details, clean code, and premium performance.",
  entries = defaultEntries,
}: ProjectsTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState<ProjectEntry | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProject]);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  useGSAP(() => {
    // Only set up ScrollTrigger on larger screens (desktop)
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
      // Subtract leftOffset from both sides so last card stops flush with where first card started
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

    // Refresh ScrollTrigger when everything is loaded
    const refreshTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshTrigger);
    
    // Fallback timeouts to capture any late layout changes or hydration shifts
    const timer1 = setTimeout(refreshTrigger, 200);
    const timer2 = setTimeout(refreshTrigger, 800);
    const timer3 = setTimeout(refreshTrigger, 2000);

    return () => {
      window.removeEventListener("load", refreshTrigger);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, { scope: sectionRef });

  return (
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
          {entries.map((entry, index) => {
            return (
              <div
                key={index}
                data-cursor="open"
                onClick={() => setActiveProject(entry)}
                className="relative flex flex-col w-full md:w-[35vw] md:max-w-[480px] shrink-0 group cursor-pointer active:scale-[0.99] transition-all duration-300"
              >
                {/* Content column */}
                <article
                  className="flex flex-col flex-1 w-full rounded-3xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-md p-4 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.04]"
                >
                  {entry.image && (
                    <div className="overflow-hidden rounded-2xl border border-white/5 mb-4">
                      <img
                        src={entry.image}
                        alt={`${entry.title} preview`}
                        className="w-full h-56 sm:h-72 md:h-[380px] object-cover transform transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                        onLoad={() => {
                          ScrollTrigger.refresh();
                        }}
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="space-y-2">
                      {/* Mobile Meta Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="p-1.5 rounded-lg bg-white/5 text-white border border-white/10">
                            <entry.icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono tracking-tighter uppercase">
                            {entry.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-sans tracking-wide block md:hidden">
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
                  </div>
                </article>
              </div>
            );
          })}
          {/* Trailing spacer so last card stops flush at scroll end */}
          <div className="hidden md:block shrink-0 w-[8vw]" aria-hidden="true" />
        </div>
      </div>

      {/* Glassmorphic Project Details Modal */}
      {activeProject && (
        <div 
          className="fixed inset-0 z-[10000] select-none cursor-auto animate-in fade-in duration-300"
          aria-modal="true"
          role="dialog"
        >
          {/* Full-screen backdrop blur — must be a direct child of fixed inset-0 with no padding */}
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          />
          {/* Centering wrapper above the backdrop */}
          <div className="relative z-10 flex items-center justify-center w-full h-full p-4 sm:p-6 md:p-10">

          {/* Modal Container */}
          <div 
            className="relative w-full max-w-4xl bg-[#09090b]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-in zoom-in-95 duration-300 ease-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300 cursor-pointer active:scale-90"
              aria-label="Close details"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Visual Column */}
            {activeProject.image && (
              <div className="w-full md:w-1/2 h-48 sm:h-64 md:h-auto relative shrink-0 border-b md:border-b-0 md:border-r border-white/5 overflow-hidden">
                <img
                  src={activeProject.image}
                  alt={`${activeProject.title} detail`}
                  className="w-full h-full object-cover"
                />
                {/* Visual overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 via-transparent to-[#09090b]/80" />
              </div>
            )}

            {/* Right Information Column */}
            <div className="flex-grow flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[85vh] p-6 sm:p-8 md:p-10">
              <div className="space-y-6 flex-grow">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white/5 text-rose-400 border border-white/10">
                      <activeProject.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-zinc-500 font-mono tracking-tighter uppercase">
                      {activeProject.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {activeProject.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-zinc-400 font-light">
                  {activeProject.description}
                </p>

                {/* Feature/Items bullet lists */}
                {activeProject.items && activeProject.items.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Key Features
                    </h4>
                    <div className="rounded-2xl border border-white/5 bg-black/40 p-5">
                      <ul className="space-y-3">
                        {activeProject.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex} 
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

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 mt-8 pt-4 border-t border-white/5 shrink-0">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "default" }),
                      "border-white/10 hover:bg-white/5 hover:text-white rounded-xl text-xs sm:text-sm flex items-center gap-2 font-normal transition-all duration-200"
                    )}
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                )}

                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default", size: "default" }),
                      "bg-white text-black hover:bg-zinc-200 rounded-xl text-xs sm:text-sm flex items-center gap-2 font-normal transition-all duration-200 cursor-pointer"
                    )}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                    <ArrowUpRight className="ml-0.5 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  </section>
  );
});

export default ProjectsTimeline;
