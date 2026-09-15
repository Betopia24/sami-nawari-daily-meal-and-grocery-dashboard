import { DashboardLayoutClient } from "./_components/DashboardLayoutClient";
import type { Role } from "./_components/navigation";
import { getCurrentUser } from "@/app/actions/profile";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  // Convert API role (e.g., 'ADMIN') to lowercase for the navigation config
  const currentRole = (user.role?.toLowerCase() || "user") as Role;

  return (
    <DashboardLayoutClient currentRole={currentRole}>
      {children}
    </DashboardLayoutClient>
  );
}
