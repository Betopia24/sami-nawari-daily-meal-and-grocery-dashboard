import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Activity, ShoppingBag, Star, Utensils } from "lucide-react";
import { Seller } from "../types";

interface SellerDetailsSheetProps {
  seller: Seller | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SellerDetailsSheet({ seller, isOpen, onOpenChange }: SellerDetailsSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md border-l-0 shadow-2xl bg-background/95 backdrop-blur-xl">
        <SheetHeader className="mb-2">
          <SheetTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Seller Profile
          </SheetTitle>
        </SheetHeader>
        {seller && (
          <div className="mt-6 flex flex-col gap-10 w-full animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Header / Avatar Section */}
            <div className="flex flex-col items-center gap-5 text-center w-full">
              <Avatar className="h-[84px] w-[84px]">
                <AvatarFallback className="bg-[#3A8F5C] text-white text-[32px] font-medium">
                  {seller.kitchenName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-foreground tracking-tight">{seller.kitchenName}</h3>
                <p className="text-[15px] font-medium text-muted-foreground mt-1 bg-muted/50 px-3 py-1 rounded-full">{seller.ownerName}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Status Card */}
              <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-medium uppercase tracking-wider">Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${seller.status === 'Approved' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : seller.status === 'Suspended' ? 'bg-red-500' : 'bg-amber-500'} animate-pulse`} />
                  <span className="text-[16px] font-semibold text-foreground">{seller.status}</span>
                </div>
              </div>

              {/* Rating Card */}
              <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="w-4 h-4 text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-medium uppercase tracking-wider">Rating</span>
                </div>
                <span className="text-[16px] font-semibold text-foreground">{seller.rating !== null ? seller.rating : "—"}</span>
              </div>

              {/* Orders Card */}
              <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShoppingBag className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-medium uppercase tracking-wider">Orders</span>
                </div>
                <span className="text-[16px] font-semibold text-foreground">{seller.orders}</span>
              </div>

              {/* Foods Card */}
              <div className="flex flex-col gap-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Utensils className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                  <span className="text-[13px] font-medium uppercase tracking-wider">Foods</span>
                </div>
                <span className="text-[16px] font-semibold text-foreground">{seller.foods}</span>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
