"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BellIcon } from "@/components/icons";
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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-border text-foreground">
          <BellIcon className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>
        <div className="flex items-center gap-3 border border-border rounded-full pl-1.5 pr-5 py-1.5 cursor-pointer hover:bg-muted/50 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#e8f3ec] text-primary font-medium text-[16px]">S</AvatarFallback>
          </Avatar>
          <span className="text-[16px] font-medium text-foreground">Super Admin</span>
        </div>
      </div>
    </header>
  );
}
