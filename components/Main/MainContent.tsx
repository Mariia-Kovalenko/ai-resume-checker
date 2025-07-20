"use client";
import React, { ReactNode, useState } from "react";
import MainSidebar from "../sidebar/main-sidebar";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  const [collapsed, setCollapsed] = useState(false);
  // const sidebarWidth = collapsed ? 'ml-20' : 'ml-80';

  return (
    <div className="flex">
      <MainSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 transition-all duration-300 max-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 