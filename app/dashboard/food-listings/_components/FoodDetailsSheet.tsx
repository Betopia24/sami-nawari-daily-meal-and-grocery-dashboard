import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Food } from "../types";
import { Badge } from "@/components/ui/badge";
import { Utensils, Store, Tag } from "lucide-react";

interface FoodDetailsSheetProps {
  food: Food | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FoodDetailsSheet({ food, open, onOpenChange }: FoodDetailsSheetProps) {
  if (!food) return null;

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Pending":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      case "Hidden":
        return "bg-muted text-muted-foreground hover:bg-muted";
      default:
        return "";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l border-border p-0">
        <SheetHeader className="p-6 border-b border-border bg-muted/20">
          <SheetTitle className="text-lg font-bold flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <Utensils className="w-5 h-5" />
            </div>
            {food.name}
          </SheetTitle>
          <SheetDescription className="mt-2 text-[13px]">
            Detailed information about this food listing and its seller.
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <Tag className="w-3.5 h-3.5 text-primary" /> Category
              </div>
              <div className="font-bold text-foreground text-[14px]">{food.category}</div>
            </div>
            <div className="space-y-2 p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <span className="font-bold text-[14px] leading-none text-primary">$</span> Price
              </div>
              <div className="font-bold text-foreground text-[14px]">{food.price}</div>
            </div>
          </div>

          <div className="space-y-2 p-5 rounded-xl border border-border bg-card shadow-sm">
            <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 mb-3 uppercase tracking-wide">
              <Store className="w-3.5 h-3.5 text-primary" /> Seller Information
            </div>
            <div className="font-bold text-[15px] text-foreground">{food.seller}</div>
            <div className="text-[12px] text-muted-foreground mt-2 leading-relaxed">
              This food is managed and sold by {food.seller}. You can contact them directly or review their other listings.
            </div>
          </div>

          <div className="space-y-3 p-5 rounded-xl bg-muted/30 border border-border">
            <h3 className="font-bold text-[11px] text-muted-foreground uppercase tracking-wider">Current Status</h3>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className={`px-4 py-3 rounded-full font-bold text-[11px] border-none ${getStatusBadgeStyles(food.status)}`}>
                {food.status}
              </Badge>
              <span className="text-[12px] font-medium text-muted-foreground">
                Currently {food.status.toLowerCase()} on the marketplace.
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
