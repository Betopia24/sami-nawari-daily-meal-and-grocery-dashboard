"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { navigationConfig, type Role, type NavItem } from "./navigation";
import { useMemo, memo } from "react";

interface SidebarProps {
  currentRole: Role;
  className?: string;
  onNavigate?: () => void;
}

interface NavItemButtonProps {
  item: NavItem;
  currentRole: Role;
  isActive: boolean;
  onNavigate?: () => void;
}

const NavItemButton = memo(function NavItemButton({ item, currentRole, isActive, onNavigate }: NavItemButtonProps) {
  const IconToUse = item.icons[currentRole] || item.defaultIcon;
  
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start text-xs font-medium"
      render={<Link href={item.href} />}
      nativeButton={false}
      onClick={onNavigate}
    >
      <IconToUse className="mr-2 h-4 w-4" />
      {item.title}
    </Button>
  );
});

export const Sidebar = memo(function Sidebar({ currentRole, className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const navItems = useMemo(() => {
    return navigationConfig.filter((item) => item.roles.includes(currentRole));
  }, [currentRole]);

  return (
    <div className={cn("pb-12 h-full border-r bg-card text-card-foreground", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Overview
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavItemButton
                  key={item.href}
                  item={item}
                  currentRole={currentRole}
                  isActive={isActive}
                  onNavigate={onNavigate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});
