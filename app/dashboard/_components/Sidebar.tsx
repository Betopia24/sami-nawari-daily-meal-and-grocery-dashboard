"use client";
import Image from "next/image";
import { LogoutIcon } from "@/components/icons";

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
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "w-full justify-start text-[15px] font-semibold h-12 px-5 rounded-lg",
        !isActive && "text-foreground hover:bg-muted/50"
      )}
      render={<Link href={item.href} />}
      nativeButton={false}
      onClick={onNavigate}
    >
      <IconToUse className="mr-4 h-6 w-6" />
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
    <div className={cn("h-full bg-card text-card-foreground flex flex-col", className)}>
      <div className="flex items-center gap-3 px-6 py-6 mb-2">
        <Image src="/dashboard-logo.png" alt="Logo" width={40} height={40} className="rounded-lg object-contain" />
        <div className="flex flex-col">
          <span className="font-bold text-foreground text-[17px] leading-tight">Daily Meal</span>
          <span className="text-[11px] text-muted-foreground font-medium mt-0.5">Admin Panel</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 space-y-2">
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
        <div className="p-4 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-[15px] font-semibold h-12 px-5 rounded-lg text-[#E7000B] hover:text-[#E7000B] hover:bg-red-50/50"
            nativeButton={false}
          >
            <LogoutIcon className="mr-4 h-5 w-5" />
            Log Out
          </Button>
        </div>
    </div>
  );
});
