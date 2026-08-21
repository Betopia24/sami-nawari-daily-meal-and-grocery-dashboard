"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommonPagination } from "@/components/common/CommonPagination";
import { PageHeader } from "@/components/common/PageHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";

import { Food } from "./types";
import { FoodTable } from "./_components/FoodTable";

const mockFoods: Food[] = [
  { id: 1, name: "Chicken Biryani", seller: "Maria's Kitchen", category: "Indian", price: "$14.99", status: "Published" },
  { id: 2, name: "Beef Tacos", seller: "Maria's Kitchen", category: "Mexican", price: "$11.99", status: "Published" },
  { id: 3, name: "Greek Salad", seller: "Green Bowl by Aiko", category: "Mediterranean", price: "$9.99", status: "Pending" },
  { id: 4, name: "Sourdough Loaf", seller: "Mama Rose Bakes", category: "Bakery", price: "$8.99", status: "Published" },
  { id: 5, name: "Spicy Curry", seller: "Raj's Spice House", category: "Indian", price: "$13.99", status: "Pending" },
  { id: 6, name: "Pad Thai", seller: "Green Bowl by Aiko", category: "Thai", price: "$12.99", status: "Hidden" },
];

export default function FoodsPage() {
  const [foods, setFoods] = useState<Food[]>(mockFoods);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [activeTab, setActiveTab] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const FOODS_PER_PAGE = 5;

  const filteredFoods = foods.filter(food => {
    const matchesSearch = 
      food.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
      food.seller.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      food.category.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesTab = activeTab === "All" || food.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeTab]);

  const totalPages = Math.ceil(filteredFoods.length / FOODS_PER_PAGE);
  const paginatedFoods = filteredFoods.slice((currentPage - 1) * FOODS_PER_PAGE, currentPage * FOODS_PER_PAGE);

  const handleAction = (id: number, actionType: string) => {
    setFoods(currentFoods => currentFoods.map(food => {
      if (food.id === id) {
        if (actionType === 'hide') return { ...food, status: "Hidden" };
        if (actionType === 'unhide') return { ...food, status: "Published" };
        if (actionType === 'approve') return { ...food, status: "Published" };
        if (actionType === 'reject') return { ...food, status: "Hidden" }; // Or you could remove it
      }
      return food;
    }).filter(food => {
      if (food.id === id && actionType === 'remove') return false;
      return true;
    }));
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
        <FoodTable 
          foods={paginatedFoods}
          onAction={handleAction}
        />
      </MotionWrapper>

      <MotionWrapper delay={0.4}>
        <CommonPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </MotionWrapper>
    </div>
  );
}
