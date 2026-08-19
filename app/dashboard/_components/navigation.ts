import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Settings,
  UserCircle,
  Shield,
  BarChart,
  Target,
  UsersRound,
  ClipboardList,
  type LucideIcon
} from "lucide-react";

export type Role = "admin" | "manager" | "user";

export interface NavItem {
  title: string;
  href: string; // Absolute path, e.g., "/dashboard/..."
  roles: Role[];
  icons: Partial<Record<Role, LucideIcon>>;
  defaultIcon: LucideIcon;
}

export const navigationConfig: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    roles: ["admin", "manager", "user"],
    defaultIcon: LayoutDashboard,
    icons: {
      admin: Shield,
      manager: Target, // Distinct icon for manager
      user: UserCircle
    }
  },
  {
    title: "Users",
    href: "/dashboard/users",
    roles: ["admin"], // Removed manager from general users, they get "Team" instead
    defaultIcon: Users,
    icons: {}
  },
  {
    title: "Team",
    href: "/dashboard/team",
    roles: ["manager"], // Manager only route
    defaultIcon: UsersRound,
    icons: {}
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    roles: ["admin", "manager", "user"],
    defaultIcon: Briefcase,
    icons: {
      manager: ClipboardList // Distinct icon for manager
    }
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    roles: ["manager"], // Manager only route
    defaultIcon: BarChart,
    icons: {}
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    roles: ["admin"], // Removed manager, they get Analytics instead
    defaultIcon: FileText,
    icons: {}
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    roles: ["admin"],
    defaultIcon: Settings,
    icons: {}
  }
];
