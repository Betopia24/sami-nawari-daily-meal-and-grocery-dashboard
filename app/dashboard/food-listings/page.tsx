"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PageHeader } from "@/components/common/PageHeader";

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
      <PageHeader 
        title="Food Listings" 
        description="Manage all marketplace food items" 
      />

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

      <FoodTable 
        foods={paginatedFoods}
        onAction={handleAction}
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
    </div>
  );
}
