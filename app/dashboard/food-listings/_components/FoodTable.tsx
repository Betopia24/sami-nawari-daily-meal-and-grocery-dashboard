import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Utensils } from "lucide-react";
import { Food } from "../types";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FoodDetailsSheet } from "./FoodDetailsSheet";

interface FoodTableProps {
  foods: Food[];
  onAction: (id: string, actionType: string) => void;
}

export function FoodTable({ foods, onAction }: FoodTableProps) {
  type ActionType = 'hide' | 'unhide' | 'approve' | 'reject' | 'remove';
  const [dialogState, setDialogState] = useState<{ id: string; type: ActionType } | null>(null);
  const [foodToView, setFoodToView] = useState<Food | null>(null);

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
    <>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Food</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Seller</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Category</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Price</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Status</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foods.map((food) => (
            <TableRow key={food.id} className="border-border hover:bg-muted/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {food.images && food.images.length > 0 ? (
                    <img src={food.images[0]} alt={food.name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-muted/30 shrink-0">
                      <Utensils className="w-5 h-5 text-muted-foreground/60" />
                    </div>
                  )}
                  <span className="font-semibold text-foreground text-sm">{food.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">{food.seller}</TableCell>
              <TableCell className="px-6 py-4 text-foreground text-[13px] font-medium">{food.category}</TableCell>
              <TableCell className="px-6 py-4 text-foreground text-sm font-bold">{food.price}</TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="secondary" className={`rounded-full px-4 py-3 font-bold border-none text-[11px] ${getStatusBadgeStyles(food.status)}`}>
                  {food.status}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {food.status !== "Pending" && (
                    <button onClick={() => setFoodToView(food)} className="cursor-pointer text-muted-foreground font-bold text-[13px] hover:text-foreground transition-colors">
                      View
                    </button>
                  )}
                  {food.status === "Published" && (
                    <button onClick={() => setDialogState({ id: food.id, type: 'hide' })} className="cursor-pointer text-muted-foreground font-bold text-[13px] hover:text-foreground transition-colors">
                      Hide
                    </button>
                  )}
                  {food.status === "Hidden" && (
                    <button onClick={() => setDialogState({ id: food.id, type: 'unhide' })} className="cursor-pointer text-foreground font-bold text-[13px] hover:underline transition-colors">
                      Unhide
                    </button>
                  )}
                  {food.status === "Pending" && (
                    <button onClick={() => setDialogState({ id: food.id, type: 'approve' })} className="cursor-pointer text-primary font-bold text-[13px] hover:underline transition-colors">
                      Approve
                    </button>
                  )}
                  {food.status === "Pending" ? (
                    <button onClick={() => setDialogState({ id: food.id, type: 'reject' })} className="cursor-pointer text-destructive font-bold text-[13px] hover:underline transition-colors">
                      Reject
                    </button>
                  ) : (
                    <button onClick={() => setDialogState({ id: food.id, type: 'remove' })} className="cursor-pointer text-destructive font-bold text-[13px] hover:underline transition-colors">
                      Remove
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {foods.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No foods found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>

      <Dialog open={dialogState !== null} onOpenChange={(open) => !open && setDialogState(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogState?.type === 'hide' && 'Hide Food Listing'}
              {dialogState?.type === 'unhide' && 'Unhide Food Listing'}
              {dialogState?.type === 'approve' && 'Approve Food Listing'}
              {dialogState?.type === 'reject' && 'Reject Food Listing'}
              {dialogState?.type === 'remove' && 'Are you sure?'}
            </DialogTitle>
            <DialogDescription>
              {dialogState?.type === 'hide' && 'This will hide the food listing from the marketplace. You can unhide it later.'}
              {dialogState?.type === 'unhide' && 'This will make the food listing visible on the marketplace again.'}
              {dialogState?.type === 'approve' && 'This will approve the food listing and make it visible on the marketplace.'}
              {dialogState?.type === 'reject' && 'This will reject the pending food listing. It will be hidden from the marketplace.'}
              {dialogState?.type === 'remove' && 'This action cannot be undone. This will permanently remove the food listing.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogState(null)}>Cancel</Button>
            <Button 
              variant={dialogState?.type === 'remove' || dialogState?.type === 'reject' ? 'destructive' : 'default'} 
              onClick={() => {
                if (dialogState) {
                  onAction(dialogState.id, dialogState.type);
                  setDialogState(null);
                }
              }}
            >
              {dialogState?.type === 'hide' && 'Hide'}
              {dialogState?.type === 'unhide' && 'Unhide'}
              {dialogState?.type === 'approve' && 'Approve'}
              {dialogState?.type === 'reject' && 'Reject'}
              {dialogState?.type === 'remove' && 'Remove'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FoodDetailsSheet 
        food={foodToView} 
        open={foodToView !== null} 
        onOpenChange={(open) => !open && setFoodToView(null)} 
      />
    </>
  );
}
