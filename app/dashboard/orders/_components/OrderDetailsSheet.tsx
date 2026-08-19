import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Order } from "../types";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, User, Store, DollarSign, Calendar, CreditCard } from "lucide-react";

interface OrderDetailsSheetProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsSheet({ order, isOpen, onOpenChange }: OrderDetailsSheetProps) {
  if (!order) return null;

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Delivered":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Preparing":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      case "Cancelled":
        return "bg-[#ffe5e5] text-[#EF4444] hover:bg-[#ffe5e5]";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPaymentBadgeStyles = (payment: string) => {
    switch (payment) {
      case "Online":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Cash on Pickup":
      case "Cash on Delivery":
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l border-border p-0">
        <SheetHeader className="p-6 border-b border-border bg-muted/20">
          <SheetTitle className="text-lg font-bold flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <ShoppingBag className="w-5 h-5" />
            </div>
            Order {order.orderId}
          </SheetTitle>
          <SheetDescription className="mt-2 text-[13px]">
            Detailed view of the order information and status.
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-4 rounded-xl border border-border bg-card shadow-sm">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Date
              </div>
              <div className="font-bold text-foreground text-[14px]">{order.date}</div>
            </div>
            <div className="space-y-2 p-4 rounded-xl border border-border bg-card shadow-sm">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <DollarSign className="w-3.5 h-3.5 text-primary" /> Total
              </div>
              <div className="font-bold text-foreground text-[14px]">{order.total}</div>
            </div>
          </div>

          <div className="space-y-2 p-5 rounded-xl border border-border bg-card shadow-sm">
            <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 mb-3 uppercase tracking-wide">
              <ShoppingBag className="w-3.5 h-3.5 text-primary" /> Item Ordered
            </div>
            <div className="font-bold text-[15px] text-foreground">{order.item}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-4 rounded-xl border border-border bg-card shadow-sm">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <User className="w-3.5 h-3.5 text-primary" /> Buyer
              </div>
              <div className="font-bold text-foreground text-[14px]">{order.buyer}</div>
            </div>
            <div className="space-y-2 p-4 rounded-xl border border-border bg-card shadow-sm">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <Store className="w-3.5 h-3.5 text-primary" /> Seller
              </div>
              <div className="font-bold text-foreground text-[14px]">{order.seller}</div>
            </div>
          </div>

          <div className="space-y-3 p-5 rounded-xl bg-muted/30 border border-border">
            <h3 className="font-bold text-[11px] text-muted-foreground uppercase tracking-wider">Payment & Status</h3>
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Payment Method
                </span>
                <Badge variant="secondary" className={`px-4 py-3 rounded-full font-bold text-[11px] border-none ${getPaymentBadgeStyles(order.payment)}`}>
                  {order.payment}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Order Status
                </span>
                <Badge variant="secondary" className={`px-4 py-3 rounded-full font-bold text-[11px] border-none ${getStatusBadgeStyles(order.status)}`}>
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
