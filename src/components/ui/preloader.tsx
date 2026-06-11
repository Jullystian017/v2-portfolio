"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef({ val: 0 });

  // Prevent scrolling while preloader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Bring custom cursor to front if it exists
    const cursorEl = document.querySelector<HTMLElement>("[data-custom-cursor]");
    if (cursorEl) cursorEl.style.zIndex = "9999999";

    return () => {
      document.body.style.overflow = "";
      if (cursorEl) cursorEl.style.zIndex = "";
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the preloader with a smooth premium ease
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: () => {
            onComplete();
          }
        });
      }
    });

    // Initial fade in for the elements
    gsap.fromTo(
      contentRef.current ? contentRef.current.children : [],
      { opacity: 0, y: 30, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.15, ease: "power3.out" }
    );

    // Simple progress counter
    tl.to(counterRef.current, {
      val: 100,
      duration: 2.4,
      ease: "power3.inOut",
      onUpdate: () => {
        setProgress(Math.round(counterRef.current.val));
      }
    });

    // Elegantly fade out content before sliding container up
    tl.to(contentRef.current, {
      opacity: 0,
      y: -30,
      filter: "blur(6px)",
      duration: 0.65,
      ease: "power3.inOut"
    }, "+=0.15");
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050506] text-white overflow-hidden select-none"
    >
      {/* 1. Shifting Organic Glow Mesh / Aurora Blobs in Preloader Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none opacity-60">
        {/* Light 1: Crimson Red (Top-Right / Middle-Right) */}
        <div className="absolute top-[10%] right-[-5%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.4)_0%,rgba(185,28,28,0.08)_50%,transparent_100%)] blur-[90px] sm:blur-[120px] mix-blend-screen animate-aurora-red" />
        {/* Light 2: Soft Peach (Middle-Right / Bottom-Right) */}
        <div className="absolute top-[30%] right-[-10%] w-[75vw] h-[75vw] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.35)_0%,rgba(244,63,94,0.06)_50%,transparent_100%)] blur-[100px] sm:blur-[130px] mix-blend-screen animate-aurora-peach" />
        {/* Light 3: Yellow-Gold (Bottom-Right) */}
        <div className="absolute bottom-[-15%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.35)_0%,rgba(234,179,8,0.05)_50%,transparent_100%)] blur-[80px] sm:blur-[110px] mix-blend-screen animate-aurora-gold" />
        {/* Light 4: Left Aurora (Crimson-Rose) */}
        <div className="absolute top-[28%] left-[-15%] w-[48vw] h-[48vw] rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.3)_0%,rgba(244,63,94,0.05)_50%,transparent_100%)] blur-[70px] sm:blur-[90px] mix-blend-screen animate-aurora-left" />
      </div>

      {/* 2. Premium Frosted Glass Effect (Backdrop Blur / Burem) */}
      <div className="absolute inset-0 z-[1] backdrop-blur-[50px] bg-[#050506]/75 pointer-events-none" />

      {/* 3. Subtle Reference Grid Overlap (Matches Home Hero) */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 80 74 L 80 86 M 74 80 L 86 80' stroke='%23ffffff' stroke-width='1.2'/%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 L 20 40 M 0 20 L 40 20' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")
          `
        }}
      />

      {/* 4. Fine-Grained Texture Overlay (Brintik) */}
      <div 
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.24] mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url%28%23noiseFilter%29'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat"
        }}
      />

      {/* 5. Preloader Content */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center preloader-content">
        {/* Brand Name */}
        <div className="font-instrument font-medium text-xs sm:text-sm tracking-[0.25em] text-zinc-400 uppercase mb-6 sm:mb-8 flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse-slow" />
          <span>Jullystian Portfolio</span>
        </div>
        
        {/* Large Progress Counter */}
        <div className="font-sans font-light text-7xl sm:text-[9.5rem] tabular-nums tracking-tighter leading-none flex items-baseline drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]">
          {progress}
          <span className="text-3xl sm:text-5xl text-zinc-500 font-light ml-2">%</span>
        </div>
        
        {/* Progress Line */}
        <div className="mt-10 sm:mt-12 w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <div 
            className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 transition-all duration-75 ease-linear rounded-full shadow-[0_0_12px_rgba(251,146,60,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
