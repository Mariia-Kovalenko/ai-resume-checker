"use client";
import React, { useState } from "react";
import MainSidebar from "../sidebar/main-sidebar";

export default function MainContent({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  // const sidebarWidth = collapsed ? 'ml-20' : 'ml-80';

  return (
    <div className="flex">
      <MainSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
} 