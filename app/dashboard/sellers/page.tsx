"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommonPagination } from "@/components/common/CommonPagination";
import { PageHeader } from "@/components/common/PageHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

import { Seller } from "./types";
import { SellerTable } from "./_components/SellerTable";
import { SellerDetailsSheet } from "./_components/SellerDetailsSheet";
import { SellerActionDialogs } from "./_components/SellerActionDialogs";

import { TableSkeleton } from "@/components/common/TableSkeleton";
import { PaginationSkeleton } from "@/components/common/PaginationSkeleton";
import { TablePageSkeleton } from "@/components/common/TablePageSkeleton";
import { toast } from "sonner";
import { getSellers, changeSellerStatus } from "@/app/actions/sellers";

function SellersPageContent() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sellerToSuspend, setSellerToSuspend] = useState<string | null>(null);
  const [sellerToActivate, setSellerToActivate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const SELLERS_PER_PAGE = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeTab]);

  const fetchSellers = async () => {
    setIsLoading(true);
    try {
      const response = await getSellers({
        searchTerm: debouncedSearch,
        status: activeTab === "All" ? undefined : activeTab,
        page: currentPage,
        limit: SELLERS_PER_PAGE,
      });

      if (response && response.success) {
        setSellers(response.data.data);
        setTotalPages(response.data.meta.totalPage);
      } else {
        toast.error(response?.message || "Failed to fetch sellers");
        setSellers([]);
      }
    } catch (error) {
      toast.error("An error occurred while fetching sellers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [debouncedSearch, activeTab, currentPage]);

  const handleToggleStatus = async (sellerId: string) => {
    // Determine the target status based on current action
    let targetStatus: "APPROVED" | "SUSPENDED" | "REJECTED" = "APPROVED";
    if (sellerToSuspend === sellerId) targetStatus = "SUSPENDED";
    if (sellerToActivate === sellerId) targetStatus = "APPROVED";

    try {
      const response = await changeSellerStatus(sellerId, targetStatus);
      if (response && response.success) {
        toast.success(response.message || `Seller status updated successfully`);
        
        // Optimistically update the UI without reloading
        setSellers(prev => prev.map(seller => {
          if (seller.id === sellerId) {
            return {
              ...seller,
              status: targetStatus
            };
          }
          return seller;
        }));
      } else {
        // Fallback or toast error if the endpoint doesn't match
        toast.error(response?.message || "Failed to update seller status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
    }
  };

  const handleViewSeller = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsSheetOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <MotionWrapper delay={0.1}>
        <PageHeader
          title="Sellers"
          description="Manage verified home kitchen sellers"
        />
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
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
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <SellerTable
            sellers={sellers}
            onViewSeller={handleViewSeller}
            onSuspendSeller={setSellerToSuspend}
            onActivateSeller={setSellerToActivate}
          />
        )}
      </MotionWrapper>

      {isLoading ? (
        <MotionWrapper delay={0.4}>
          <PaginationSkeleton />
        </MotionWrapper>
      ) : totalPages > 1 ? (
        <MotionWrapper delay={0.4}>
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </MotionWrapper>
      ) : null}

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

export default function SellersPage() {
  return (
    <React.Suspense fallback={<TablePageSkeleton />}>
      <SellersPageContent />
    </React.Suspense>
  );
}
