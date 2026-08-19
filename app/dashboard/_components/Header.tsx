"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import type { Role } from "./navigation";
import { useState, useCallback } from "react";

interface HeaderProps {
  currentRole: Role;
}

export function Header({ currentRole }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavigate = useCallback(() => setIsOpen(false), []);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger render={<Button variant="outline" size="icon" className="shrink-0 md:hidden" />}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <Sidebar currentRole={currentRole} onNavigate={handleNavigate} />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
      </div>
    </header>
  );
}
