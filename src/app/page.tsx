"use client";

import React, { useState, useEffect } from "react";
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
import CustomCursor from "@/components/ui/custom-cursor";
import KineticServicesList from "@/components/ui/kinetic-team-hybrid";
import { CinematicFooter } from "@/components/ui/motion-footer";
import ProjectsTimeline from "@/components/ui/release-time-line";

// Custom Premium SVG Brand Icons matching the exact Nyro design
const DribbbleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
  </svg>
);

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 12a3 3 0 0 0-3-3H4v6h5a3 3 0 0 0 3-3z" />
    <path d="M9 9a3 3 0 0 0-3-3H4v6h2a3 3 0 0 0 3-3z" />
    <path d="M14 12h7" />
    <path d="M14 9h7a3 3 0 0 0-6 0z" />
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
      <CustomCursor />

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
          <div className="absolute top-[10%] right-[-5%] w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.38)_0%,rgba(185,28,28,0.1)_45%,transparent_100%)] blur-[80px] sm:blur-[110px] mix-blend-screen animate-aurora-red" />
          {/* Light 2: Soft Peach (Middle-Right / Bottom-Right) */}
          <div className="absolute top-[30%] right-[-10%] w-[65vw] h-[65vw] sm:w-[55vw] sm:h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.35)_0%,rgba(244,63,94,0.1)_45%,transparent_100%)] blur-[95px] sm:blur-[120px] mix-blend-screen animate-aurora-peach" />
          {/* Light 3: Yellow-Gold (Bottom-Right) */}
          <div className="absolute bottom-[-15%] right-[-15%] w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.45)_0%,rgba(234,179,8,0.12)_45%,transparent_100%)] blur-[75px] sm:blur-[100px] mix-blend-screen animate-aurora-gold" />
          {/* Light 4: Left Aurora behind Hero Text (Crimson-Rose) - Compact focused glow */}
          <div className="absolute top-[28%] left-[-10%] w-[38vw] h-[38vw] sm:w-[28vw] sm:h-[28vw] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.3)_0%,rgba(244,63,94,0.08)_45%,transparent_100%)] blur-[60px] sm:blur-[80px] mix-blend-screen animate-aurora-left" />
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
            className="min-h-[calc(100vh-6rem)] flex flex-col justify-end pb-12 sm:pb-20 relative"
          >
            {/* Main Hero Layout Row - Flex container containing title */}
            <div className="w-full flex flex-col lg:flex-row lg:items-end">

              {/* Title Container */}
              <div className="pl-16 sm:pl-20 md:pl-24 relative w-full">
                {/* Absolute Socials stacked vertically, perfectly centered relative to the title's vertical height */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-30">
                  <a
                    href="https://dribbble.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    <DribbbleIcon className="h-5.5 w-5.5" />
                  </a>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors duration-300"
                  >
                    <BehanceIcon className="h-5.5 w-5.5" />
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
                  <span className="inline-block opacity-0 animate-hero-text [animation-delay:250ms]">
                    Designing
                  </span>
                  <br />
                  <span className="inline-flex items-baseline opacity-0 animate-hero-text [animation-delay:550ms]">
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
            <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300">
              <DribbbleIcon className="h-5 w-5" />
            </a>
            <a href="https://behance.net" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300">
              <BehanceIcon className="h-5 w-5" />
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
          <div className="relative max-w-3xl mx-auto text-center z-10 px-4 my-auto">

            {/* 1. Centered Strategic Statement Paragraph */}
            <h2 className="font-jakarta font-medium text-3xl sm:text-5xl lg:text-[3.8rem] lg:leading-[1.1] tracking-tight text-white max-w-3xl mx-auto select-none">
              At Jullystian© simplicity <br className="hidden sm:inline" />
              meets strategy to craft <br className="hidden sm:inline" />
              bold, intuitive websites <br className="hidden sm:inline" />
              that b<span className="text-zinc-600">ring your vision</span> <br />
              <span className="text-zinc-600">to life.</span>
            </h2>

            {/* 2. Lowercase contact button matching the outline menu button style */}
            <div className="mt-12 sm:mt-16 flex flex-col items-center select-none">
              <button
                onClick={() => navigateTo("contact")}
                className="text-white text-xs sm:text-sm font-sans tracking-widest lowercase px-8 py-3.5 border border-white/20 rounded-lg bg-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer flex items-center gap-2 font-light"
              >
                contact me <span className="text-[10px] sm:text-xs">↗</span>
              </button>
            </div>

            {/* 3. Floating, rotated artistic photos framing the typography */}
            {/* Top-Left Portrait */}
            <div className="absolute -top-12 -left-12 sm:-top-16 sm:-left-20 lg:-top-24 lg:-left-28 w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-xl overflow-hidden border border-white/10 shadow-2xl rotate-[-8deg] hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out select-none">
              <img
                src="/nyro_portrait_1.png"
                alt="Studio portrait 1"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top-Right Portrait */}
            <div className="absolute -top-16 -right-12 sm:-top-24 sm:-right-20 lg:-top-32 lg:-right-28 w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-xl overflow-hidden border border-white/10 shadow-2xl rotate-[6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out select-none">
              <img
                src="/nyro_portrait_2.png"
                alt="Studio portrait 2"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom-Left Portrait */}
            <div className="absolute -bottom-16 -left-10 sm:-bottom-24 sm:-left-16 lg:-bottom-32 lg:-left-24 w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-xl overflow-hidden border border-white/10 shadow-2xl rotate-[-6deg] hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out select-none">
              <img
                src="/nyro_portrait_3.png"
                alt="Studio portrait 3"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom-Right Portrait */}
            <div className="absolute -bottom-12 -right-8 sm:-bottom-16 sm:-right-12 lg:-bottom-20 lg:-right-16 w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-xl overflow-hidden border border-white/10 shadow-2xl rotate-[8deg] hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out select-none">
              <img
                src="/nyro_portrait_4.png"
                alt="Studio portrait 4"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Subtle decorative dot floating on the right side */}
            <div className="absolute -right-16 sm:-right-24 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none">
              <span className="h-2 w-2 rounded-full bg-white opacity-85 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
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
              Design & Architecture Services
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
