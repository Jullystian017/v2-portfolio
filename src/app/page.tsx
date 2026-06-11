"use client";

import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  Globe,
  ExternalLink,
  Sparkles,
  Cpu,
  Layers,
  Send,
  Flame,
  GraduationCap,
  Workflow,
  Sun,
  Moon,
  Command,
  X,
  ArrowRight,
  ShieldCheck,
  Terminal
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import Cursor from "@/components/ui/inverted-cursor";
import KineticServicesList from "@/components/ui/kinetic-team-hybrid";
import { CinematicFooter } from "@/components/ui/motion-footer";
import ProjectsTimeline from "@/components/ui/release-time-line";
import Preloader from "@/components/ui/preloader";

// Custom Premium SVG Brand Icons matching the exact Nyro design
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Types for our project schema
interface Project {
  id: number;
  title: string;
  description: string;
  category: "frontend" | "backend" | "ai";
  tags: string[];
  likes: number;
  liked: boolean;
  demoUrl: string;
  githubUrl: string;
  image: string;
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const aboutContainerRef = React.useRef<HTMLDivElement>(null);

  // Rotating words in the Hero section (with duplicate at end for infinite upward scroll)
  const heroWords = ["Startups", "You", "Brands", "Products", "Startups"];
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentWordIdx((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentWordIdx === 4) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentWordIdx(0);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentWordIdx]);
  // Hero Section Intro Animations (No specific scope needed since it targets unique classes)
  useGSAP(() => {
    if (!preloaderFinished) return;

    // Hero Text Intro
    gsap.fromTo(
      ".hero-text-reveal",
      { opacity: 0, y: 40, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", stagger: 0.3 }
    );

    // Aurora Light Bloom Intro
    gsap.fromTo(
      ".aurora-light",
      { opacity: 0.1, scale: 0.35 },
      { opacity: 1, scale: 1, duration: 3.2, ease: "power3.out", stagger: 0.2 }
    );
  }, [preloaderFinished]);

  // GSAP scroll-reveal animation for the about section words
  useGSAP(() => {
    if (!aboutContainerRef.current) return;

    gsap.fromTo(
      ".about-reveal-word",
      { color: "rgba(255, 255, 255, 0.15)" },
      {
        color: "rgba(255, 255, 255, 1)",
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: aboutContainerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: true,
        },
      }
    );
  }, { scope: aboutContainerRef });

  // Close menu drawer on anchor navigation
  const navigateTo = (id: string) => {
    setIsMenuOpen(false);
    if (id === "contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#f3f4f6] font-sans selection:bg-teal-500/30 selection:text-teal-200 relative overflow-x-hidden flex flex-col">
      {!preloaderFinished && (
        <Preloader onComplete={() => setPreloaderFinished(true)} />
      )}
      <Cursor />

      {/* FLOW ART - wraps only Hero and About */}
      <FlowArt aria-label="Jullystian Portfolio Presentation" className="relative z-20 flex-1">

        {/* FULL-WIDTH HERO WRAPPER (Grainy color mesh background only for the top section) */}
        <section
          id="home"
          data-flow-section
          aria-label="Home"
          className="w-full bg-nyro-hero relative overflow-hidden flex flex-col min-h-screen"
        >
          <div
            className="flow-art-container w-full flex-grow flex flex-col relative"
            style={{ transformOrigin: 'bottom left' }}
          >

        {/* Organic Animated Glow Mesh / Aurora Layers */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          {/* Light 1: Crimson Red (Top-Right / Middle-Right) */}
          <div className="aurora-light absolute top-[10%] right-[-5%] w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.38)_0%,rgba(185,28,28,0.1)_45%,transparent_100%)] blur-[80px] sm:blur-[110px] mix-blend-screen animate-aurora-red" />
          {/* Light 2: Soft Peach (Middle-Right / Bottom-Right) */}
          <div className="aurora-light absolute top-[30%] right-[-10%] w-[65vw] h-[65vw] sm:w-[55vw] sm:h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.35)_0%,rgba(244,63,94,0.1)_45%,transparent_100%)] blur-[95px] sm:blur-[120px] mix-blend-screen animate-aurora-peach" />
          {/* Light 3: Yellow-Gold (Bottom-Right) */}
          <div className="aurora-light absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.45)_0%,rgba(234,179,8,0.12)_45%,transparent_100%)] blur-[75px] sm:blur-[100px] mix-blend-screen animate-aurora-gold" />
          {/* Light 4: Left Aurora behind Hero Text (Crimson-Rose) - Compact focused glow */}
          <div className="aurora-light absolute top-[28%] left-[-10%] w-[38vw] h-[38vw] sm:w-[28vw] sm:h-[28vw] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.3)_0%,rgba(244,63,94,0.08)_45%,transparent_100%)] blur-[60px] sm:blur-[80px] mix-blend-screen animate-aurora-left" />
        </div>

        {/* PREMIUM NAVIGATION HEADER */}
        <header className="w-full relative z-40">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 h-24 flex items-center justify-between">
            {/* Logo Branding */}
            <div className="flex items-center gap-1 group cursor-pointer" onClick={() => navigateTo("home")}>
              <span className="font-instrument font-medium text-xl sm:text-2xl tracking-tight text-white hover:opacity-85 transition-opacity">
                Jullystian<sup className="text-[10px] font-sans font-light tracking-widest relative -top-2">®</sup>
              </span>
            </div>

            {/* Interactive Kustom Hamburgerless Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-white text-sm font-sans tracking-wide hover:bg-white hover:text-black hover:border-white transition-all duration-300 px-6 py-2 border border-white/20 rounded-lg bg-transparent cursor-pointer font-light"
              >
                menu
              </button>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative z-20">
          <section
            id="home"
            className="min-h-[calc(100vh-6rem)] flex flex-col justify-center md:justify-end pt-8 md:pt-0 pb-12 md:pb-20 relative"
          >
            {/* Main Hero Layout Row - Flex container containing title */}
            <div className="w-full flex flex-col lg:flex-row lg:items-end">

              {/* Title Container */}
              <div className="pl-16 sm:pl-20 md:pl-24 relative w-full">
                {/* Absolute Socials stacked vertically, perfectly centered relative to the title's vertical height */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-30">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    <InstagramIcon className="h-5.5 w-5.5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    <LinkedInIcon className="h-5.5 w-5.5" />
                  </a>
                </div>

                <h1 className="font-instrument font-medium text-[11vw] sm:text-[8vw] lg:text-[7.5vw] leading-[0.98] tracking-tighter text-white select-none">
                  <span className="hero-text-reveal inline-block opacity-0">
                    Designing
                  </span>
                  <br />
                  <span className="hero-text-reveal inline-flex items-baseline opacity-0">
                    <span className="font-sans font-light text-zinc-500 mr-4 opacity-60 lowercase">for</span>
                    <span className="inline-flex flex-col h-[1.1em] overflow-hidden align-bottom relative">
                      <span
                        className={`flex flex-col text-white ${
                          isTransitioning ? "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
                        }`}
                        style={{ transform: `translateY(-${currentWordIdx * 20}%)` }}
                      >
                        {heroWords.map((word, idx) => (
                          <span key={idx} className="h-[1.1em] flex items-center">
                            {word}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </h1>
              </div>

            </div>
          </section>
        </div>

          </div>
        </section>

      {/* FULL SCREEN GLASSMORPHIC MENU DRAWER */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Soft, highly blurred background mesh for the menu drawer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-40">
          <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.15)_0%,transparent_70%)] blur-[100px] mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.12)_0%,transparent_70%)] blur-[120px] mix-blend-screen" />
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 h-24 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1 group cursor-pointer" onClick={() => navigateTo("home")}>
            <span className="font-instrument font-medium text-xl sm:text-2xl tracking-tight text-white/50 hover:text-white transition-colors duration-300">
              Jullystian<sup className="text-[10px] font-sans font-light tracking-widest relative -top-2">®</sup>
            </span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300 font-sans tracking-widest uppercase text-xs px-4 py-2 border border-white/10 hover:border-white/30 rounded-lg bg-transparent cursor-pointer group active:scale-95"
          >
            <span>close</span>
            <X className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col justify-center items-center h-[calc(100vh-12rem)] w-full relative z-10">
          <nav className="flex flex-col items-center w-full text-center">
            {[
              { label: "Home", id: "home", gradient: "bg-gradient-to-r from-[#ec4899] via-[#f97316] to-[#f59e0b]" },
              { label: "Projects", id: "projects", gradient: "bg-gradient-to-r from-[#06b6d4] via-[#0d9488] to-[#10b981]" },
              { label: "Services", id: "services", gradient: "bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#ec4899]" },
              { label: "Contact", id: "contact", gradient: "bg-gradient-to-r from-[#f43f5e] via-[#e11d48] to-[#be123c]" }
            ].map((link, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo(link.id)}
                className="group relative w-full py-4 sm:py-5 flex items-center justify-center overflow-hidden cursor-pointer active:scale-95 transition-all duration-300 border-y border-white/[0.01]"
              >
                {/* Default Text (Centered) */}
                <div className="relative z-10 font-instrument font-medium text-2xl sm:text-4xl lg:text-5xl text-zinc-500 group-hover:opacity-0 transition-opacity duration-300 flex items-center gap-2">
                  <span>{link.label.toLowerCase()}</span>
                  <sup className="text-[10px] font-mono text-zinc-700 ml-1">0{idx + 1}</sup>
                </div>

                {/* Hover State: Seamless Infinite Marquee */}
                <div className="absolute inset-0 z-20 flex items-center overflow-hidden opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 bg-white">
                  <div className="flex w-max animate-marquee">
                    {/* Loop 1 */}
                    <div className="flex items-center gap-10 sm:gap-16 lg:gap-24 px-5 sm:px-8 lg:px-12 shrink-0">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <React.Fragment key={i}>
                          <span className="font-instrument font-medium text-2xl sm:text-4xl lg:text-5xl text-black lowercase">
                            {link.label.toLowerCase()}
                          </span>
                          <div className={`w-28 sm:w-48 lg:w-60 h-6 sm:h-9 lg:h-10 rounded-sm ${link.gradient}`} />
                        </React.Fragment>
                      ))}
                    </div>
                    {/* Loop 2 (exact duplicate for seamless loop) */}
                    <div className="flex items-center gap-10 sm:gap-16 lg:gap-24 px-5 sm:px-8 lg:px-12 shrink-0" aria-hidden="true">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <React.Fragment key={i}>
                          <span className="font-instrument font-medium text-2xl sm:text-4xl lg:text-5xl text-black lowercase">
                            {link.label.toLowerCase()}
                          </span>
                          <div className={`w-28 sm:w-48 lg:w-60 h-6 sm:h-9 lg:h-10 rounded-sm ${link.gradient}`} />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </nav>

          <div className="mt-16 w-full max-w-xs border-t border-white/5 pt-8 flex justify-center gap-8">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300">
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300">
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>



        {/* SECTION 1: STRATEGIC STATEMENT */}
        <FlowSection
          id="about"
          aria-label="About Jullystian"
          style={{ backgroundColor: "#050506" }}
          className="flex items-center justify-center"
        >
          {/* Main typography container */}
          <div ref={aboutContainerRef} className="relative max-w-4xl mx-auto text-center z-10 px-4 my-auto">

            {/* 1. Centered Strategic Statement Paragraph with Scroll Reveal */}
            <h2 className="font-jakarta font-medium text-3xl sm:text-5xl lg:text-[3.8rem] lg:leading-[1.1] tracking-tight text-white max-w-3xl mx-auto select-none">
              {[
                "Hello,", "I,m", "Jullystian",
                "I", "design", "and", "build",
                "digital", "products", "with",
                "intuitive","UI", "and", "UX",
                "bring", "your", "vision",
                "to", "life."
              ].map((word, idx) => (
                <React.Fragment key={idx}>
                  <span className="about-reveal-word inline-block mr-[0.25em] text-white/15">
                    {word}
                  </span>
                  {idx === 2 && <br className="hidden sm:inline" />}
                  {idx === 6 && <br className="hidden sm:inline" />}
                  {idx === 9 && <br className="hidden sm:inline" />}
                  {idx === 13 && <br className="hidden sm:inline" />}
                </React.Fragment>
              ))}
            </h2>

            {/* 2. Lowercase contact button matching the outline menu button style pointing to WhatsApp */}
            <div className="mt-12 sm:mt-16 flex flex-col items-center select-none">
              <a
                href="https://wa.me/6285798051625"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xs sm:text-sm font-sans tracking-widest lowercase px-8 py-3.5 border border-white/20 rounded-lg bg-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer flex items-center gap-2 font-light"
              >
                contact me <span className="text-[10px] sm:text-xs">↗</span>
              </a>
            </div>

          </div>
        </FlowSection>
      </FlowArt>

      {/* SECTION 2: PROJECTS (Moved outside main container to allow full-width desktop pinning without layout shifting) */}
      <section id="projects" className="w-full relative z-20 bg-[#050506] scroll-mt-24">
        <ProjectsTimeline />
      </section>

      {/* Main container for other sections (standard scroll) */}
      <main className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20 flex flex-col gap-24 sm:gap-32 relative z-20 bg-[#050506]">

        {/* SECTION 3: SERVICES */}
        <section id="services" className="scroll-mt-12 flex flex-col gap-10">
          <div className="border-b border-white/5 pb-8">
            <h2 className="font-instrument font-medium text-3xl sm:text-5xl text-white tracking-tight">
              Services
            </h2>
            <p className="text-zinc-500 text-sm mt-2 font-light">
              High-performance solutions designed to solve critical engineering challenges.
            </p>
          </div>

          <KineticServicesList />

          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 text-zinc-500 text-sm font-light leading-relaxed flex items-center gap-4">
            <Terminal className="h-5 w-5 text-teal-500 shrink-0" />
            <span>
              Proactive engineer specialized in high-fidelity user interface design, modern full-stack web applications, and responsive native mobile interfaces.
            </span>
          </div>
        </section>

      </main>

      <CinematicFooter />
    </div>
  );
}
