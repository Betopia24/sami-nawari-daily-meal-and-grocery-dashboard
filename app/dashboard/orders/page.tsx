"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonPagination } from "@/components/common/CommonPagination";
import { MotionWrapper } from "@/components/common/MotionWrapper";

import { Order } from "./types";
import { OrderTable } from "./_components/OrderTable";
import { OrderDetailsSheet } from "./_components/OrderDetailsSheet";

import { getAdminOrders } from "@/app/actions/orders";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { PaginationSkeleton } from "@/components/common/PaginationSkeleton";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ORDERS_PER_PAGE = 5;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, activeTab]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminOrders({
        searchTerm: debouncedSearch,
        status: activeTab === "All" ? undefined : activeTab.replace(/ /g, "_").toUpperCase(),
        page: currentPage,
        limit: ORDERS_PER_PAGE,
      });

      if (response && response.success) {
        const formattedData: Order[] = response.data.data.map((item: any) => {
          let itemString = "No items";
          if (item.items && item.items.length > 0) {
            itemString = item.items[0].foodName;
            if (item.items.length > 1) {
              itemString += ` + ${item.items.length - 1} more`;
            }
          }

          const sellerString = "Multiple Sellers";

          return {
            id: item.id,
            orderId: item.orderNumber,
            buyer: item.recipientName || "Unknown Buyer",
            seller: sellerString,
            item: itemString,
            total: `$${item.totalPrice}`,
            payment: item.paymentMethod ? item.paymentMethod.replace(/_/g, " ") : "N/A",
            status: item.status ? item.status.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : "Pending",
            date: new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            items: item.items,
            contactPhone: item.contactPhone,
            deliveryAddress: item.deliveryAddress,
            note: item.note,
            subTotal: item.subTotal,
            deliveryFee: item.deliveryFee,
            tax: item.tax,
            discount: item.discount,
          };
        });
        setOrders(formattedData);
        setTotalPages(response.data.meta.totalPage || 1);
      } else {
        toast.error(response?.message || "Failed to fetch orders");
        setOrders([]);
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [debouncedSearch, activeTab, currentPage]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsSheetOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <MotionWrapper delay={0.1}>
        <PageHeader
          title="Orders"
          description="Manage & monitor marketplace orders"
        />
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input
            placeholder="Search order ID, buyer or seller..."
            className="w-full sm:max-w-[280px] rounded-xl border-border h-10 px-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList className="bg-transparent gap-3 h-auto p-0 flex-wrap">
              {["All", "Pending Payment", "Confirmed", "Accepted", "Preparing", "Out For Delivery", "Delivered", "Completed", "Cancelled", "Failed"].map((tab) => (
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
          <OrderTable
            orders={orders}
            onViewOrder={handleViewOrder}
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

      <OrderDetailsSheet
        order={selectedOrder}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  );
}
