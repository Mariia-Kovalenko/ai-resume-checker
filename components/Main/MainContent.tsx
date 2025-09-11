"use client";
import React, { ReactNode, useState, useEffect } from "react";
import MainSidebar from "../sidebar/main-sidebar";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const [collapsed, setCollapsed] = useState(true); // default to collapsed (mobile/SSR)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.innerWidth >= 640) {
      setCollapsed(false); // open by default on desktop
    }
  }, []);

  // Handler to collapse sidebar on mobile after navigation
  const handleNavClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setCollapsed(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex">
      <MainSidebar collapsed={collapsed} setCollapsed={setCollapsed} handleNavClick={handleNavClick} />
      <main className="flex-1 transition-all duration-300 max-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 