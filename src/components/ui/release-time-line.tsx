"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, GraduationCap, Building, Gamepad2, UtensilsCrossed, Coins } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://pathly-six.vercel.app/",
    githubUrl: "https://github.com/Jullystian017",
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
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://nusaestate.vercel.app/",
    githubUrl: "https://github.com/Jullystian017",
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
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://lifequest.web.id/",
    githubUrl: "https://github.com/Jullystian017",
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
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://takumaeat.vercel.app/",
    githubUrl: "https://github.com/Jullystian017",
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
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://cashmind-chi.vercel.app/",
    githubUrl: "https://github.com/Jullystian017",
  },
];

/**
 * Behavior: Only the card that is currently centered in the viewport is "open".
 * As you scroll, the active card expands to reveal its full content. Others stay collapsed.
 */
export default function ProjectsTimeline({
  title = "Featured Projects & Works",
  description = "A curated collection of web applications, AI platforms, and online systems built with a focus on details, clean code, and premium performance.",
  entries = defaultEntries,
}: ProjectsTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Create stable setters for refs inside map
  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      // Compute distance of each sentinel to viewport center
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section className="py-20 w-full bg-transparent text-neutral-200">
      <div className="w-full">
        <div className="mx-auto max-w-3xl border-b border-white/5 pb-8 mb-10">
          <h2 className="font-instrument font-medium text-3xl sm:text-5xl text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm text-zinc-500 font-light leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className="relative flex flex-col gap-4 md:flex-row md:gap-16"
                ref={(el) => setItemRef(el, index)}
                aria-current={isActive ? "true" : "false"}
              >
                {/* Sticky meta column */}
                <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl transition-colors duration-300 ${
                      isActive ? "bg-white text-black shadow-lg" : "bg-white/5 text-zinc-500 border border-white/5"
                    }`}>
                      <entry.icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-400"}`}>
                        {entry.title}
                      </span>
                      <span className="text-xs text-zinc-600 font-mono tracking-tighter">
                        {entry.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invisible sentinel near the card title to measure proximity to viewport center */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                {/* Content column */}
                <article
                  className={
                    "flex flex-col rounded-3xl border p-4 transition-all duration-500 " +
                    (isActive
                      ? "border-white/15 bg-white/[0.02] shadow-2xl backdrop-blur-md"
                      : "border-white/5 bg-white/[0.005] opacity-50")
                  }
                >
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt={`${entry.title} preview`}
                      className="mb-4 w-full h-64 rounded-2xl object-cover border border-white/5"
                      loading="lazy"
                    />
                  )}
                  <div className="space-y-4">
                    {/* Header with improved typography */}
                    <div className="space-y-2">
                      <h3
                        className={
                          "text-lg font-medium leading-tight tracking-tight md:text-xl transition-colors duration-200 " +
                          (isActive ? "text-white" : "text-zinc-400")
                        }
                      >
                        {entry.title}
                      </h3>
                      
                      {/* Improved description with better spacing */}
                      <p
                        className={
                          "text-xs leading-relaxed md:text-sm transition-all duration-300 " +
                          (isActive 
                            ? "text-zinc-400 line-clamp-none font-light" 
                            : "text-zinc-500 line-clamp-2 font-light")
                        }
                      >
                        {entry.description}
                      </p>
                    </div>

                    {/* Enhanced expandable content */}
                    <div
                      aria-hidden={!isActive}
                      className={
                        "grid transition-all duration-500 ease-out " +
                        (isActive 
                          ? "grid-rows-[1fr] opacity-100" 
                          : "grid-rows-[0fr] opacity-0")
                      }
                    >
                      <div className="overflow-hidden">
                        <div className="space-y-5 pt-2">
                          {entry.items && entry.items.length > 0 && (
                            <div className="rounded-2xl border border-white/5 bg-black/20 p-4">
                              <ul className="space-y-2.5">
                                {entry.items.map((item, itemIndex) => (
                                  <li 
                                    key={itemIndex} 
                                    className="flex items-start gap-2.5 text-xs text-zinc-400"
                                  >
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-400 flex-shrink-0" />
                                    <span className="leading-relaxed font-light">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center justify-end gap-3">
                            {entry.githubUrl && (
                              <a
                                href={entry.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(
                                  buttonVariants({ variant: "outline", size: "sm" }),
                                  "border-white/10 hover:bg-white/5 hover:text-white rounded-xl text-xs flex items-center gap-1.5 font-normal transition-all duration-200"
                                )}
                              >
                                <GithubIcon className="h-3.5 w-3.5" />
                                GitHub
                              </a>
                            )}

                            {entry.demoUrl && (
                              <a
                                href={entry.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className={cn(
                                  buttonVariants({ variant: "default", size: "sm" }),
                                  "bg-white text-black hover:bg-zinc-200 rounded-xl text-xs flex items-center gap-1.5 font-normal transition-all duration-200 cursor-pointer"
                                )}
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Live Demo
                                <ArrowUpRight className="ml-0.5 h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
