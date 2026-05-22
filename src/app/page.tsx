"use client";

import React, { useState, useEffect } from "react";
import {
  Globe,
  ExternalLink,
  Code,
  Sparkles,
  Cpu,
  Layers,
  Heart,
  Send,
  CheckCircle2,
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
import { Input } from "@/components/ui/input";

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
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "ai">("all");

  // Dynamic project showcase data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Synthetix AI Engine",
      description: "A state-of-the-art developer platform featuring real-time code generation, refactoring, and agentic orchestration workflows.",
      category: "ai",
      tags: ["Next.js 16", "TypeScript", "Google Gemini API", "Tailwind 4"],
      likes: 42,
      liked: false,
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      image: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)", // Matches warm amber/orange mesh
    },
    {
      id: 2,
      title: "Nebula Commerce Dashboard",
      description: "An ultra-premium analytical dashboard with real-time financial tracking, custom data visualization charts, and user behavior heatmaps.",
      category: "frontend",
      tags: ["React 19", "shadcn/ui", "Recharts", "Framer Motion"],
      likes: 28,
      liked: false,
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      image: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)", // Matches teal/blue mesh
    },
    {
      id: 3,
      title: "Hyperion Edge Sync",
      description: "High-performance distributed database synchronization engine optimized for edge networks, yielding sub-millisecond latencies.",
      category: "backend",
      tags: ["Node.js", "Redis Edge", "gRPC", "PostgreSQL"],
      likes: 19,
      liked: false,
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      image: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)", // Matches magenta/purple mesh
    },
    {
      id: 4,
      title: "Visionary ML Playground",
      description: "Interactive web canvas enabling real-time visual model training, dataset curation, and instant testing directly in the browser environment.",
      category: "ai",
      tags: ["TensorFlow.js", "Next.js", "WebAssembly", "Shadcn Layout"],
      likes: 35,
      liked: false,
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      image: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)", // Matches green/teal mesh
    }
  ]);

  // Contact form submission states
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Services list (replaces skills in the layout to better suit the menu drawer)
  const services = [
    {
      name: "Frontend Architecture",
      level: 95,
      desc: "Creating high-fidelity, pixel-perfect user interfaces with React 19, Next.js, and modern CSS systems.",
      icon: <Layers className="h-5 w-5 text-pink-400 animate-pulse" />
    },
    {
      name: "Serverless & Edge Compute",
      level: 88,
      desc: "Architecting hyper-scalable serverless runtimes and sub-millisecond edge database distribution architectures.",
      icon: <Cpu className="h-5 w-5 text-amber-400" />
    },
    {
      name: "AI/LLM System Integration",
      level: 90,
      desc: "Integrating state-of-the-art LLMs, multi-agent frameworks, vector search engines, and prompt pipelines.",
      icon: <Sparkles className="h-5 w-5 text-teal-400 animate-bounce" />
    },
    {
      name: "Database Engineering",
      level: 82,
      desc: "Optimizing structured schemas, transaction processing pipelines, and caching layers with Redis and PostgreSQL.",
      icon: <Workflow className="h-5 w-5 text-violet-400" />
    }
  ];

  // Toggle "Like" state for a project
  const handleLike = (id: number) => {
    setProjects(prevProjects =>
      prevProjects.map(project => {
        if (project.id === id) {
          return {
            ...project,
            liked: !project.liked,
            likes: project.liked ? project.likes - 1 : project.likes + 1
          };
        }
        return project;
      })
    );
  };

  // Submit contact form
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  // Filtered projects selector
  const filteredProjects = activeTab === "all"
    ? projects
    : projects.filter(p => p.category === activeTab);

  // Close menu drawer on anchor navigation
  const navigateTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-[#f3f4f6] font-sans selection:bg-teal-500/30 selection:text-teal-200 relative overflow-x-hidden flex flex-col">

      {/* FULL-WIDTH HERO WRAPPER (Grainy color mesh background only for the top section) */}
      <div className="w-full bg-nyro-hero relative overflow-hidden flex flex-col">

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
                className="text-white text-sm font-sans tracking-wide hover:opacity-80 transition-all px-6 py-2 border border-white/20 rounded-none bg-transparent cursor-pointer font-light"
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

              {/* Title */}
              <div className="pl-16 sm:pl-20 md:pl-24">
                <h1 className="font-instrument font-medium text-[11vw] sm:text-[8vw] lg:text-[7.5vw] leading-[0.98] tracking-tighter text-white select-none">
                  Designing <br />
                  <span className="font-sans font-light text-zinc-500 mr-4 opacity-60 lowercase">for</span>
                  <span className="text-white">Startups</span>
                </h1>
              </div>

            </div>

            {/* Absolute Socials stacked vertically, aligned with the left edge of container */}
            <div className="absolute left-0 bottom-12 sm:bottom-20 flex flex-col items-center gap-6 pb-2.5 z-30">
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
          </section>
        </div>

      </div>

      {/* FULL SCREEN GLASSMORPHIC MENU DRAWER */}
      <div
        className={`fixed inset-0 z-50 bg-black/45 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 h-24 flex items-center justify-between">
          <span className="font-instrument font-medium text-xl sm:text-2xl tracking-tight text-white/50">
            Jullystian<sup>®</sup>
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 font-sans tracking-widest uppercase text-xs p-2"
          >
            <span>close</span>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col justify-center items-center h-[calc(100vh-12rem)] max-w-4xl mx-auto px-6">
          <nav className="flex flex-col items-center gap-6 sm:gap-10 text-center">
            {[
              { label: "Home", id: "home" },
              { label: "Projects", id: "projects" },
              { label: "Services", id: "services" },
              { label: "Contact", id: "contact" }
            ].map((link, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo(link.id)}
                className="group relative font-instrument font-medium text-4xl sm:text-7xl text-zinc-500 hover:text-white transition-colors duration-500 ease-out py-1 block leading-none overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-teal-400 group-hover:w-full transition-all duration-500 ease-out" />
              </button>
            ))}
          </nav>

          <div className="mt-16 w-full max-w-xs border-t border-white/5 pt-8 flex justify-center gap-8">
            <a href="https://dribbble.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
              <DribbbleIcon className="h-5 w-5" />
            </a>
            <a href="https://behance.net" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
              <BehanceIcon className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors duration-300">
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>



      {/* MAIN CONTAINER */}
      <main className="flex-1 w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative z-20 flex flex-col gap-32">

        {/* STRATEGIC STATEMENT SECTION */}
        <section
          id="about"
          className="relative py-28 sm:py-36 lg:py-48 flex items-center justify-center overflow-visible"
        >
          {/* Main typography container */}
          <div className="relative max-w-3xl mx-auto text-center z-10 px-4">

            {/* 1. Centered Strategic Statement Paragraph */}
            <h2 className="font-jakarta font-medium text-3xl sm:text-5xl lg:text-[3.8rem] lg:leading-[1.1] tracking-tight text-white max-w-3xl mx-auto select-none">
              At Jullystian© simplicity <br className="hidden sm:inline" />
              meets strategy to craft <br className="hidden sm:inline" />
              bold, intuitive websites <br className="hidden sm:inline" />
              that b<span className="text-zinc-600">ring your vision</span> <br />
              <span className="text-zinc-600">to life.</span>
            </h2>

            {/* 2. Lowercase contact button bordered above and below */}
            <div className="mt-12 sm:mt-16 flex flex-col items-center select-none">
              <div className="w-28 sm:w-36 h-[1px] bg-white/15" />
              <button
                onClick={() => navigateTo("contact")}
                className="py-3 px-6 text-xs sm:text-sm font-sans tracking-widest lowercase text-white hover:opacity-85 transition-all cursor-pointer flex items-center gap-1.5 font-light"
              >
                contact me <span className="text-[10px] sm:text-xs">↗</span>
              </button>
              <div className="w-28 sm:w-36 h-[1px] bg-white/15" />
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
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-12 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
            <div>
              <h2 className="font-instrument font-medium text-3xl sm:text-5xl text-white tracking-tight">
                Featured Works
              </h2>
              <p className="text-zinc-500 text-sm mt-2 font-light">
                Curated compilation of software architectures and interface engines.
              </p>
            </div>

            {/* Premium Filter Tabs */}
            <div className="flex flex-wrap gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-full w-fit">
              {(["all", "frontend", "backend", "ai"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                    ? "bg-white text-black shadow-lg scale-105"
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout - Clean, minimalist 2x2 modular blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-white/[0.01] border-white/5 backdrop-blur-md rounded-3xl overflow-hidden hover:border-white/15 hover:bg-white/[0.02] transition-all duration-500 flex flex-col group h-full shadow-2xl relative"
              >

                {/* Glow outline on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/0 via-teal-500/0 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Project Visual Cover with modern gradient block */}
                <div
                  className="h-56 w-full relative transition-all duration-700 group-hover:scale-[1.01] flex items-center justify-center overflow-hidden"
                  style={{ background: project.image }}
                >
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                  <Code className="h-16 w-16 text-white/20 group-hover:text-white/40 backdrop-blur-md p-4 rounded-full border border-white/10 transition-colors duration-300" />

                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/55 text-white border border-white/5 backdrop-blur-md uppercase text-[9px] font-medium tracking-wider py-1 px-2.5">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="p-6 pb-2">
                  <CardTitle className="text-xl font-medium text-white flex items-center justify-between">
                    {project.title}
                    <div className="flex gap-2">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1 hover:scale-105 active:scale-95 transition-transform">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
                          <Code className="h-4 w-4" />
                        </Button>
                      </a>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-1 hover:scale-105 active:scale-95 transition-transform">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-white/5 hover:bg-white/10 text-zinc-400 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-zinc-500 text-sm font-normal line-clamp-2 mt-2 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-6 py-4 flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/[0.03] border border-white/[0.04] text-zinc-400 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-zinc-600 font-light flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-zinc-600" />
                    Apache-2.0 Open Source
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(project.id)}
                    className={`rounded-full border text-xs gap-1.5 px-3 py-1.5 transition-all duration-300 ${project.liked
                      ? "bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20"
                      : "border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <Heart className={`h-3.5 w-3.5 ${project.liked ? "fill-current" : ""}`} />
                    <span>{project.likes}</span>
                  </Button>
                </CardFooter>

              </Card>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="scroll-mt-12 flex flex-col gap-10">
          <div className="border-b border-white/5 pb-8">
            <h2 className="font-instrument font-medium text-3xl sm:text-5xl text-white tracking-tight">
              Design & Architecture Services
            </h2>
            <p className="text-zinc-500 text-sm mt-2 font-light">
              High-performance solutions designed to solve critical engineering challenges.
            </p>
          </div>

          {/* Grid list of services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {services.map((svc, index) => (
              <Card key={index} className="bg-white/[0.01] border-white/5 backdrop-blur-md rounded-3xl p-8 flex flex-col justify-between hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 group shadow-lg">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="h-10 w-10 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      {svc.icon}
                    </div>
                    <span className="font-instrument font-medium text-2xl text-teal-400">{svc.level}%</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-white mt-2 group-hover:text-teal-300 transition-colors">{svc.name}</h3>
                    <p className="text-zinc-500 text-sm font-light mt-3 leading-relaxed">{svc.desc}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-2">
                  <div className="h-1.5 w-full bg-zinc-900 border border-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${svc.level}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-600 font-medium tracking-widest uppercase mt-1">System Competency Score</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 text-zinc-500 text-sm font-light leading-relaxed flex items-center gap-4">
            <Terminal className="h-5 w-5 text-teal-500 shrink-0" />
            <span>
              Proactive engineer specialized in asynchronous event-driven queues, serverless RESTful routing protocols, and multi-tenant authentication patterns.
            </span>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-12 flex flex-col gap-10">
          <div className="border-b border-white/5 pb-8">
            <h2 className="font-instrument font-medium text-3xl sm:text-5xl text-white tracking-tight">
              Initiate Connection
            </h2>
            <p className="text-zinc-500 text-sm mt-2 font-light">
              Submit your project blueprints to establish secure socket communication.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Connection Information */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-8 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-md">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                    <span className="h-3 w-3 rounded-full bg-teal-400" />
                  </div>
                  <span className="text-white font-medium text-sm tracking-wider uppercase">Active Network Status</span>
                </div>

                <div className="flex flex-col gap-4 text-sm font-light text-zinc-500">
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span>Target Node</span>
                    <span className="text-white font-medium">Banten, Indonesia</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span>Protocol Focus</span>
                    <span className="text-white font-medium">Next.js / AI Orchestration</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span>Availability</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      100% Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/20 border border-white/5 text-xs text-zinc-500 leading-relaxed italic">
                &ldquo;Building software feels like anti-gravity: lifting concepts up without constraints.&rdquo;
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7">
              <Card className="bg-white/[0.01] border-white/5 backdrop-blur-md rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-full shadow-2xl">

                {submitSuccess ? (
                  <div className="my-auto p-8 border border-emerald-500/10 bg-emerald-500/5 rounded-3xl flex flex-col items-center text-center gap-4 animate-fade-in">
                    <CheckCircle2 className="h-12 w-12 text-teal-400" />
                    <h4 className="font-instrument font-medium text-white text-xl">Connection Transmitted</h4>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed max-w-sm">
                      Your signal has successfully integrated with my local socket. Expect an encrypted dispatch back within 12 standard business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-medium tracking-widest text-zinc-500">Secure Dispatch Email</label>
                      <Input
                        type="email"
                        placeholder="your-node@network.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/25 border-white/5 hover:border-white/10 focus:border-teal-500 rounded-xl px-4 py-6 text-sm text-white placeholder-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs uppercase font-medium tracking-widest text-zinc-500">Architecture Blueprint / Message</label>
                      <textarea
                        placeholder="Describe your design parameters or project specifications..."
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-black/25 border border-white/5 hover:border-white/10 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-4 text-sm text-white placeholder-zinc-600 transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 bg-white text-black hover:bg-zinc-200 rounded-full font-medium text-xs uppercase tracking-widest py-6 shadow-xl shadow-white/5 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? "Transmitting..." : "Send Connection Dispatch"}
                    </Button>
                  </form>
                )}

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-zinc-600 font-medium tracking-wider">
                  <span>SHA-256 SECURE LINK</span>
                  <span>SYSTEM VERSION v4.16.2</span>
                </div>
              </Card>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 mt-32 bg-black/40 relative z-30 text-xs text-zinc-500">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("home")}>
            <span className="font-instrument font-medium text-white text-lg tracking-tight">Jullystian<sup>®</sup></span>
          </div>
          <p className="font-light text-zinc-600">
            © {new Date().getFullYear()} Jullystian Studio. Handcrafted in Indonesia. All Rights Reserved.
          </p>
          <div className="flex gap-6 font-medium uppercase tracking-wider text-[10px]">
            <a href="#" className="hover:text-white transition-colors duration-300">Security</a>
            <a href="#" className="hover:text-white transition-colors duration-300">API Status</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
