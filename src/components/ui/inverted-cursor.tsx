"use client";

import React, { useState, useEffect, useRef } from "react";

interface CursorProps {
  size?: number;
}

export const Cursor: React.FC<CursorProps> = ({ size = 20 }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const previousPos = useRef({ x: -size, y: -size }); // start off-screen
  const targetPos = useRef({ x: -size, y: -size });

  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);

  // Keep a ref of the active size so the animation loop always uses the correct dimensions
  const activeSizeRef = useRef(size);
  activeSizeRef.current = isHovering ? 90 : size;

  // Animation loop for smooth cursor follow
  const animate = () => {
    if (!cursorRef.current) return;

    const currentX = previousPos.current.x;
    const currentY = previousPos.current.y;
    
    const currentSize = activeSizeRef.current;
    const targetX = targetPos.current.x - currentSize / 2;
    const targetY = targetPos.current.y - currentSize / 2;

    const deltaX = (targetX - currentX) * 0.15;
    const deltaY = (targetY - currentY) * 0.15;

    const newX = currentX + deltaX;
    const newY = currentY + deltaY;

    previousPos.current = { x: newX, y: newY };
    cursorRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Enable only on devices with a fine pointer (desktop mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setHasMouse(true);

    const handleMouseMove = (e: MouseEvent) => {
      setVisible(true);
      targetPos.current = { x: e.clientX, y: e.clientY };

      // Detect if hover target is a project card with cursor action
      const target = e.target as HTMLElement | null;
      const hoverTarget = target?.closest('[data-cursor="open"]');
      setIsHovering(!!hoverTarget);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    document.body.style.cursor = "none"; // hide native cursor

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.body.style.cursor = "auto"; // restore native cursor
    };
  }, []);

  if (!hasMouse) return null;

  const currentSize = isHovering ? 90 : size;

  return (
    <div
      ref={cursorRef}
      data-custom-cursor
      className="fixed pointer-events-none rounded-full bg-white mix-blend-difference z-[9999] flex items-center justify-center text-[10px] font-sans font-semibold tracking-widest text-black uppercase transition-[width,height,opacity] duration-300 ease-out"
      style={{
        width: currentSize,
        height: currentSize,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <span className={`transition-opacity duration-200 ${isHovering ? "opacity-100" : "opacity-0"}`}>
        open
      </span>
    </div>
  );
};

export default Cursor;
