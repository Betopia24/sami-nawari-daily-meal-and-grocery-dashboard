"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PageHeader } from "@/components/common/PageHeader";

import { User } from "./types";
import { UserTable } from "./_components/UserTable";
import { UserDetailsSheet } from "./_components/UserDetailsSheet";
import { UserActionDialogs } from "./_components/UserActionDialogs";

const mockUsers: User[] = [
  { id: 1, name: "Emily Chen", email: "emily@example.com", status: "Active", joined: "Jan 2024", orders: 14, role: "Buyer" },
  { id: 2, name: "Marcus Johnson", email: "marcus@example.com", status: "Active", joined: "Feb 2024", orders: 8, role: "Buyer" },
  { id: 3, name: "Sofia Reyes", email: "sofia@example.com", status: "Suspended", joined: "Mar 2024", orders: 2, role: "Buyer" },
  { id: 4, name: "Raj Patel", email: "raj@example.com", status: "Pending", joined: "Jul 2024", orders: 0, role: "Applicant" },
  { id: 5, name: "Maria Santos", email: "maria@example.com", status: "Active", joined: "Dec 2023", orders: 0, role: "Seller" },
  { id: 6, name: "Aisha Okonkwo", email: "aisha@example.com", status: "Active", joined: "Apr 2024", orders: 5, role: "Buyer" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [userToSuspend, setUserToSuspend] = useState<number | null>(null);
  const [userToActivate, setUserToActivate] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 5;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || user.email.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesTab = activeTab === "All" || user.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeTab]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: user.status === "Suspended" ? "Active" : "Suspended" };
      }
      return user;
    }));
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsSheetOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader 
        title="Users" 
        description="Manage registered users" 
      />

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input 
          placeholder="Search users..." 
          className="w-full sm:max-w-[250px] rounded-xl border-border h-10 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent gap-3 h-auto p-0">
            {["All", "Active", "Suspended", "Pending"].map((tab) => (
              <TabsTrigger 
                key={tab} 
                value={tab}
                className="rounded-full cursor-pointer px-5 py-2 bg-card border border-border shadow-sm text-sm font-semibold transition-all duration-300 ease-out hover:bg-muted data-active:bg-primary data-active:text-primary-foreground data-active:border-primary"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <UserTable 
        users={paginatedUsers}
        onViewUser={handleViewUser}
        onSuspendUser={setUserToSuspend}
        onActivateUser={setUserToActivate}
      />

      {totalPages > 0 && (
        <div className="flex items-center justify-end mt-2">
          <Pagination className="justify-end w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  className={`border-border text-muted-foreground hover:bg-muted transition-colors duration-300 ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    href="#" 
                    isActive={currentPage === page} 
                    className={currentPage === page ? "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300" : "border-border text-foreground hover:bg-muted cursor-pointer transition-colors duration-300"}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  className={`border-border text-muted-foreground hover:bg-muted transition-colors duration-300 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <UserDetailsSheet 
        user={selectedUser} 
        isOpen={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
      />

      <UserActionDialogs 
        userToSuspend={userToSuspend}
        userToActivate={userToActivate}
        onCloseSuspend={() => setUserToSuspend(null)}
        onCloseActivate={() => setUserToActivate(null)}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}
