import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SellerActionDialogsProps {
  sellerToSuspend: number | null;
  sellerToActivate: number | null;
  onCloseSuspend: () => void;
  onCloseActivate: () => void;
  onToggleStatus: (sellerId: number) => void;
}

export function SellerActionDialogs({
  sellerToSuspend,
  sellerToActivate,
  onCloseSuspend,
  onCloseActivate,
  onToggleStatus,
}: SellerActionDialogsProps) {
  return (
    <>
      {/* Suspend Confirmation Dialog */}
      <Dialog open={sellerToSuspend !== null} onOpenChange={(open) => !open && onCloseSuspend()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Suspend Seller</DialogTitle>
            <DialogDescription className="text-[15px] mt-2">
              Are you sure you want to suspend this seller? They will immediately lose access to their account and their foods will be hidden from the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3">
            <Button variant="outline" className="cursor-pointer" onClick={onCloseSuspend}>Cancel</Button>
            <Button variant="destructive" className="cursor-pointer" onClick={() => {
              if (sellerToSuspend !== null) {
                onToggleStatus(sellerToSuspend);
                onCloseSuspend();
              }
            }}>
              Suspend Seller
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Activate Confirmation Dialog */}
      <Dialog open={sellerToActivate !== null} onOpenChange={(open) => !open && onCloseActivate()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Activate Seller</DialogTitle>
            <DialogDescription className="text-[15px] mt-2">
              Are you sure you want to activate this seller? They will regain full access to their account and their foods will be visible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-3">
            <Button variant="outline" className="cursor-pointer" onClick={onCloseActivate}>Cancel</Button>
            <Button className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => {
              if (sellerToActivate !== null) {
                onToggleStatus(sellerToActivate);
                onCloseActivate();
              }
            }}>
              Activate Seller
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
