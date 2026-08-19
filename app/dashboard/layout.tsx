import { Sidebar } from "./_components/Sidebar";
import { Header } from "./_components/Header";
import type { Role } from "./_components/navigation";

// Mocking a server-side session fetch
// In a real application, replace this with your Auth library (NextAuth, Supabase, Clerk, etc.)
async function getUserSession() {
  return { role: "admin" as Role };
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUserSession();
  const currentRole = session.role;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar currentRole={currentRole} />
      </div>
      <div className="flex flex-col">
        <Header currentRole={currentRole} />
        <main className="flex flex-1 flex-col gap-4 lg:gap-6 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
