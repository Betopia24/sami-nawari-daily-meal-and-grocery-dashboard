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
      <SheetContent className="sm:max-w-md border-l-0 shadow-2xl bg-background/95 backdrop-blur-xl">
        <SheetHeader className="mb-2">
          <SheetTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            {food.name}
          </SheetTitle>
          <SheetDescription className="mt-2 text-[13px]">
            Detailed information about this food listing and its seller.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-8 w-full animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="space-y-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <Tag className="w-3.5 h-3.5 text-primary" /> Category
              </div>
              <div className="font-bold text-foreground text-[15px]">{food.category}</div>
            </div>
            <div className="space-y-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
              <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
                <span className="font-bold text-[14px] leading-none text-primary">$</span> Price
              </div>
              <div className="font-bold text-foreground text-[15px]">{food.price}</div>
            </div>
          </div>

          <div className="space-y-2 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 w-full">
            <div className="text-[11px] font-bold text-muted-foreground flex items-center gap-2 mb-3 uppercase tracking-wide">
              <Store className="w-3.5 h-3.5 text-primary" /> Seller Information
            </div>
            <div className="font-bold text-[16px] text-foreground">{food.seller}</div>
            <div className="text-[13px] text-muted-foreground mt-2 leading-relaxed">
              This food is managed and sold by {food.seller}. You can contact them directly or review their other listings.
            </div>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-card border border-border/40 shadow-[0_2px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 w-full">
            <h3 className="font-bold text-[11px] text-muted-foreground uppercase tracking-wider">Current Status</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
              <Badge variant="secondary" className={`px-4 py-2 rounded-full font-bold text-[12px] border-none ${getStatusBadgeStyles(food.status)}`}>
                {food.status}
              </Badge>
              <span className="text-[13px] font-medium text-muted-foreground">
                Currently {food.status.toLowerCase()} on the marketplace.
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
