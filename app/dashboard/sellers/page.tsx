"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommonPagination } from "@/components/common/CommonPagination";
import { PageHeader } from "@/components/common/PageHeader";

import { Seller } from "./types";
import { SellerTable } from "./_components/SellerTable";
import { SellerDetailsSheet } from "./_components/SellerDetailsSheet";
import { SellerActionDialogs } from "./_components/SellerActionDialogs";

const mockSellers: Seller[] = [
  { id: 1, kitchenName: "Maria's Kitchen", ownerName: "Maria Santos", status: "Approved", rating: 4.9, orders: 124, foods: 8 },
  { id: 2, kitchenName: "Raj's Spice House", ownerName: "Raj Patel", status: "Pending", rating: null, orders: 0, foods: 0 },
  { id: 3, kitchenName: "Mama Rose Bakes", ownerName: "Rose Morales", status: "Approved", rating: 4.7, orders: 89, foods: 12 },
  { id: 4, kitchenName: "Green Bowl by Aiko", ownerName: "Aiko Tanaka", status: "Suspended", rating: 4.2, orders: 31, foods: 5 },
];

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>(mockSellers);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sellerToSuspend, setSellerToSuspend] = useState<number | null>(null);
  const [sellerToActivate, setSellerToActivate] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const SELLERS_PER_PAGE = 5;

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.kitchenName.toLowerCase().includes(debouncedSearch.toLowerCase()) || seller.ownerName.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesTab = activeTab === "All" || seller.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeTab]);

  const totalPages = Math.ceil(filteredSellers.length / SELLERS_PER_PAGE);
  const paginatedSellers = filteredSellers.slice((currentPage - 1) * SELLERS_PER_PAGE, currentPage * SELLERS_PER_PAGE);

  const handleToggleStatus = (sellerId: number) => {
    setSellers(sellers.map(seller => {
      if (seller.id === sellerId) {
        return { ...seller, status: seller.status === "Suspended" ? "Approved" : "Suspended" };
      }
      return seller;
    }));
  };

  const handleViewSeller = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsSheetOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader 
        title="Sellers" 
        description="Manage verified home kitchen sellers" 
      />

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input 
          placeholder="Search sellers..." 
          className="w-full sm:max-w-[250px] rounded-xl border-border h-10 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent gap-3 h-auto p-0">
            {["All", "Approved", "Pending", "Suspended"].map((tab) => (
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

      <SellerTable 
        sellers={paginatedSellers}
        onViewSeller={handleViewSeller}
        onSuspendSeller={setSellerToSuspend}
        onActivateSeller={setSellerToActivate}
      />

      <CommonPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />

      <SellerDetailsSheet 
        seller={selectedSeller} 
        isOpen={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
      />

      <SellerActionDialogs 
        sellerToSuspend={sellerToSuspend}
        sellerToActivate={sellerToActivate}
        onCloseSuspend={() => setSellerToSuspend(null)}
        onCloseActivate={() => setSellerToActivate(null)}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}
