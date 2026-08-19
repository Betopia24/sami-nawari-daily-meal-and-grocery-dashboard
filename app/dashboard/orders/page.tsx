"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonPagination } from "@/components/common/CommonPagination";

import { Order } from "./types";
import { OrderTable } from "./_components/OrderTable";
import { OrderDetailsSheet } from "./_components/OrderDetailsSheet";

const mockOrders: Order[] = [
  { id: 1, orderId: "#2024-091", buyer: "Emily Chen", seller: "Maria's Kitchen", item: "Chicken Biryani", total: "$14.99", payment: "Online", status: "Completed", date: "Aug 7" },
  { id: 2, orderId: "#2024-090", buyer: "Marcus Johnson", seller: "Mama Rose Bakes", item: "Sourdough Loaf", total: "$8.99", payment: "Cash on Pickup", status: "Delivered", date: "Aug 7" },
  { id: 3, orderId: "#2024-089", buyer: "Aisha Okonkwo", seller: "Maria's Kitchen", item: "Beef Tacos", total: "$11.99", payment: "Online", status: "Preparing", date: "Aug 7" },
  { id: 4, orderId: "#2024-088", buyer: "Sofia Reyes", seller: "Green Bowl by Aiko", item: "Greek Salad", total: "$9.99", payment: "Online", status: "Cancelled", date: "Aug 6" },
  { id: 5, orderId: "#2024-087", buyer: "Emily Chen", seller: "Mama Rose Bakes", item: "Sourdough Loaf", total: "$8.99", payment: "Cash on Delivery", status: "Completed", date: "Aug 6" },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [activeTab, setActiveTab] = useState("All");
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 5;

  const filteredOrders = orders.filter(order => {
    const searchLower = debouncedSearch.toLowerCase();
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchLower) || 
      order.buyer.toLowerCase().includes(searchLower) ||
      order.seller.toLowerCase().includes(searchLower) ||
      order.item.toLowerCase().includes(searchLower);
      
    const matchesTab = activeTab === "All" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeTab]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ORDERS_PER_PAGE, currentPage * ORDERS_PER_PAGE);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsSheetOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader 
        title="Orders" 
        description="Manage & monitor marketplace orders" 
      />

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input 
          placeholder="Search order ID, buyer or seller..." 
          className="w-full sm:max-w-[280px] rounded-xl border-border h-10 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent gap-3 h-auto p-0 flex-wrap">
            {["All", "Completed", "Delivered", "Cancelled"].map((tab) => (
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

      <OrderTable 
        orders={paginatedOrders}
        onViewOrder={handleViewOrder}
      />

      <CommonPagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />

      <OrderDetailsSheet 
        order={selectedOrder} 
        isOpen={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
      />
    </div>
  );
}
