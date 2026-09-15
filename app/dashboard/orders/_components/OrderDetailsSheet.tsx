import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Order } from "../types";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, User, Store, DollarSign, Calendar, CreditCard, Loader2 } from "lucide-react";
import { getAdminOrderDetails } from "@/app/actions/orders";
import { OrderDetailsSkeleton } from "./OrderDetailsSkeleton";

interface OrderDetailsSheetProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsSheet({ order, isOpen, onOpenChange }: OrderDetailsSheetProps) {
  const [fullOrder, setFullOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && order?.id) {
      const fetchDetails = async () => {
        setIsLoading(true);
        try {
          const response = await getAdminOrderDetails(order.id);
          if (response && response.success) {
            const item = response.data;
            let itemString = "No items";
            if (item.items && item.items.length > 0) {
              itemString = item.items[0].foodName;
              if (item.items.length > 1) {
                itemString += ` + ${item.items.length - 1} more`;
              }
            }

            const mapped: Order = {
              id: item.id,
              orderId: item.orderNumber,
              buyer: item.recipientName || "Unknown Buyer",
              seller: "Multiple Sellers",
              item: itemString,
              total: `$${item.totalPrice}`,
              payment: item.paymentMethod ? item.paymentMethod.replace(/_/g, " ") : "N/A",
              status: item.status ? item.status.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : "Pending",
              date: new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
              items: item.items,
              childOrders: item.childOrders,
              contactPhone: item.contactPhone,
              deliveryAddress: item.deliveryAddress,
              note: item.note,
              subTotal: item.subTotal,
              deliveryFee: item.deliveryFee,
              tax: item.tax,
              discount: item.discount,
            };
            setFullOrder(mapped);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    } else {
      setFullOrder(null);
    }
  }, [isOpen, order]);

  if (!order) return null;

  const displayOrder = fullOrder || order;

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Pending Payment":
      case "Preparing":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      case "Confirmed":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Accepted":
        return "bg-teal-100 text-teal-700 hover:bg-teal-100";
      case "Out For Delivery":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "Delivered":
      case "Completed":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Cancelled":
      case "Failed":
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
      <SheetContent className="sm:max-w-md border-l-0 shadow-2xl bg-background/95 backdrop-blur-xl overflow-y-auto">
        <SheetHeader className="mb-2">
          <SheetTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            Order {displayOrder.orderId}
          </SheetTitle>
          <SheetDescription className="mt-2 text-[13px]">
            Detailed view of the order information and status.
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <OrderDetailsSkeleton />
        ) : (
          <div className="mt-6 flex flex-col gap-6 w-full animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="space-y-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Date
              </div>
              <div className="font-bold text-foreground text-[14px]">{displayOrder.date}</div>
            </div>
            <div className="space-y-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <DollarSign className="w-3.5 h-3.5 text-primary" /> Total
              </div>
              <div className="font-bold text-foreground text-[14px]">{displayOrder.total}</div>
            </div>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 w-full">
            <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 mb-3 uppercase tracking-wide">
              <ShoppingBag className="w-3.5 h-3.5 text-primary" /> Items Ordered
            </div>
            
            {displayOrder.childOrders && displayOrder.childOrders.length > 0 ? (
              <div className="space-y-4">
                {displayOrder.childOrders.map((childOrder: any, idx) => (
                  <div key={idx} className="space-y-2 border border-border/50 rounded-lg p-3 bg-muted/20">
                    <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide border-b border-border/50 pb-2 mb-2">
                      Sub-order {childOrder.orderNumber}
                    </div>
                    {childOrder.items?.map((item: any, iIdx: number) => (
                      <div key={iIdx} className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-[13px] text-foreground">{item.foodName}</div>
                          <div className="text-[11px] text-muted-foreground">{item.quantity} x ${item.unitPrice}</div>
                        </div>
                        <div className="font-bold text-[13px] text-foreground">${item.subtotal}</div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center border-t border-border/50 pt-2 mt-2">
                      <div className="text-[11px] text-muted-foreground">Sub-order Total (inc. Delivery)</div>
                      <div className="font-bold text-[13px] text-primary">${childOrder.totalPrice}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : displayOrder.items && displayOrder.items.length > 0 ? (
              <div className="space-y-3">
                {displayOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 last:pb-0">
                    <div>
                      <div className="font-bold text-[14px] text-foreground">{item.foodName}</div>
                      <div className="text-[12px] text-muted-foreground">{item.quantity} x ${item.unitPrice}</div>
                    </div>
                    <div className="font-bold text-[14px] text-foreground">${item.subtotal}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="font-bold text-[15px] text-foreground">{displayOrder.item}</div>
            )}
            
            <div className="mt-4 pt-3 border-t border-border/50 flex flex-col gap-1 text-[13px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${displayOrder.subTotal || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Delivery Fee</span>
                <span className="font-medium">${displayOrder.deliveryFee || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax / Discount</span>
                <span className="font-medium">
                  {displayOrder.tax ? `+$${displayOrder.tax}` : ''} {displayOrder.discount ? `-$${displayOrder.discount}` : ''}
                  {!displayOrder.tax && !displayOrder.discount && '$0'}
                </span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t border-border/50 font-bold text-[15px]">
                <span>Grand Total</span>
                <span className="text-primary">{displayOrder.total}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="space-y-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <User className="w-3.5 h-3.5 text-primary" /> Buyer
              </div>
              <div className="font-bold text-foreground text-[14px]">{displayOrder.buyer}</div>
            </div>
            <div className="space-y-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <Store className="w-3.5 h-3.5 text-primary" /> Seller
              </div>
              <div className="font-bold text-foreground text-[14px]">{displayOrder.seller}</div>
            </div>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 w-full">
            <h3 className="font-bold text-[11px] text-muted-foreground uppercase tracking-wider">Payment & Status</h3>
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Payment Method
                </span>
                <Badge variant="secondary" className={`px-4 py-2 rounded-full font-bold text-[11px] border-none ${getPaymentBadgeStyles(displayOrder.payment)}`}>
                  {displayOrder.payment}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-muted-foreground flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Order Status
                </span>
                <Badge variant="secondary" className={`px-4 py-2 rounded-full font-bold text-[11px] border-none ${getStatusBadgeStyles(displayOrder.status)}`}>
                  {displayOrder.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
