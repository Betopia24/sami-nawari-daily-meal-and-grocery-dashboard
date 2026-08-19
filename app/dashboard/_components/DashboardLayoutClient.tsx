"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import type { Role } from "./navigation";
import { cn } from "@/lib/utils";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  currentRole: Role;
}

export function DashboardLayoutClient({ children, currentRole }: DashboardLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={cn(
        "grid h-screen w-full bg-background overflow-hidden transition-all duration-300",
        isCollapsed 
          ? "md:grid-cols-[80px_1fr]" 
          : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
      )}
    >
      <div className="hidden bg-muted/40 md:block h-full overflow-hidden transition-all duration-300">
        <Sidebar 
          currentRole={currentRole} 
          isCollapsed={isCollapsed} 
          onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
      </div>
      <div className="flex flex-col h-full overflow-hidden">
        <Header currentRole={currentRole} onToggle={() => setIsCollapsed(!isCollapsed)} />
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
