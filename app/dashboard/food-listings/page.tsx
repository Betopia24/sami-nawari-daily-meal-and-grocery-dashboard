"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommonPagination } from "@/components/common/CommonPagination";
import { PageHeader } from "@/components/common/PageHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { PaginationSkeleton } from "@/components/common/PaginationSkeleton";

import { Food } from "./types";
import { FoodTable } from "./_components/FoodTable";
import { getAdminFoods, reviewFoodListing, toggleFoodVisibility, deleteFoodListing } from "@/app/actions/foods";

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const FOODS_PER_PAGE = 5;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeTab]);

  const fetchFoods = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminFoods({
        searchTerm: debouncedSearch,
        status: activeTab === "All" ? undefined : activeTab.toUpperCase(),
        page: currentPage,
        limit: FOODS_PER_PAGE,
      });

      if (response && response.success) {
        const formattedData: Food[] = response.data.data.map((item: any) => {
          let parsedIngredients = item.ingredients;
          if (typeof item.ingredients === 'string') {
            try {
              parsedIngredients = JSON.parse(item.ingredients);
            } catch (e) {
              parsedIngredients = [];
            }
          }

          return {
            id: item.id,
            name: item.name,
            seller: item.seller?.sellerProfile?.businessName || item.seller?.name || "Unknown Seller",
            sellerEmail: item.seller?.email,
            sellerProfilePicture: item.seller?.profilePicture,
            sellerCuisineTypes: item.seller?.sellerProfile?.cuisineTypes,
            category: item.category || "Unknown",
            subcategory: item.subcategory,
            price: `$${item.price}`,
            status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase() : "Pending",
            description: item.description,
            images: item.images,
            preparationTime: item.preparationTime,
            ingredients: parsedIngredients,
            pickupAvailable: item.pickupAvailable,
            deliveryAvailable: item.deliveryAvailable,
            deliveryFee: item.deliveryFee,
            createdAt: item.createdAt,
          };
        });
        setFoods(formattedData);
        setTotalPages(response.data.meta.totalPage || 1);
      } else {
        toast.error(response?.message || "Failed to fetch foods");
        setFoods([]);
      }
    } catch (error) {
      toast.error("An error occurred while fetching foods");
      setFoods([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [debouncedSearch, activeTab, currentPage]);

  const handleAction = async (id: string, actionType: string) => {
    let targetStatus = "PENDING";
    let isVisibilityAction = false;
    let isRemoveAction = false;
    
    if (actionType === 'hide') { targetStatus = "HIDDEN"; isVisibilityAction = true; }
    else if (actionType === 'unhide') { targetStatus = "PUBLISHED"; isVisibilityAction = true; }
    else if (actionType === 'approve') targetStatus = "PUBLISHED";
    else if (actionType === 'reject') targetStatus = "REJECTED";
    else if (actionType === 'remove') { targetStatus = "DELETED"; isRemoveAction = true; }

    const toastId = toast.loading(`Processing action "${actionType}"...`);

    try {
      let result;
      if (isVisibilityAction) {
        result = await toggleFoodVisibility(id, targetStatus as "PUBLISHED" | "HIDDEN");
      } else if (isRemoveAction) {
        result = await deleteFoodListing(id);
      } else {
        result = await reviewFoodListing(id, targetStatus);
      }
      
      if (result && result.success) {
        toast.success(result.message || `Food status updated successfully.`, { id: toastId });
        
        setFoods(currentFoods => currentFoods.map(food => {
          if (food.id === id) {
            // Optimistic mapping back to Title Case if we didn't remove it
            return { ...food, status: targetStatus === "HIDDEN" ? "Hidden" : targetStatus === "PUBLISHED" ? "Published" : targetStatus === "REJECTED" ? "Rejected" : "Pending" };
          }
          return food;
        }).filter(food => {
          if (food.id === id && actionType === 'remove') return false;
          return true;
        }));
      } else {
        toast.error(result?.message || `Failed to update food status`, { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred while updating the food listing", { id: toastId });
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <MotionWrapper delay={0.1}>
        <PageHeader 
          title="Food Listings" 
          description="Manage all marketplace food items" 
        />
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input 
          placeholder="Search food, sellers, category..." 
          className="w-full sm:max-w-[280px] rounded-xl border-border h-10 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent gap-3 h-auto p-0 flex-wrap">
            {["All", "Published", "Pending", "Hidden"].map((tab) => (
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
          <FoodTable 
            foods={foods}
            onAction={handleAction}
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
    </div>
  );
}
