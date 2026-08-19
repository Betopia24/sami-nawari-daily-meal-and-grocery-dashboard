import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContentItem } from "../types";

interface ContentActionDialogsProps {
  itemToArchive: ContentItem | null;
  itemToDelete: ContentItem | null;
  onCloseArchive: () => void;
  onCloseDelete: () => void;
  onConfirmArchive: (id: number) => void;
  onConfirmDelete: (id: number) => void;
}

export function ContentActionDialogs({
  itemToArchive,
  itemToDelete,
  onCloseArchive,
  onCloseDelete,
  onConfirmArchive,
  onConfirmDelete,
}: ContentActionDialogsProps) {
  const isArchiving = itemToArchive?.status !== "Archived";

  return (
    <>
      <Dialog open={!!itemToArchive} onOpenChange={onCloseArchive}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {isArchiving ? "Archive Content" : "Restore Content"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Are you sure you want to {isArchiving ? "archive" : "restore"} "{itemToArchive?.title}"?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={onCloseArchive}
              className="rounded-full px-6 font-bold border-border hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (itemToArchive) onConfirmArchive(itemToArchive.id);
                onCloseArchive();
              }}
              className="rounded-full px-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
            >
              {isArchiving ? "Archive" : "Restore"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!itemToDelete} onOpenChange={onCloseDelete}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl border-border bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-destructive">
              Delete Content
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Are you sure you want to delete "{itemToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={onCloseDelete}
              className="rounded-full px-6 font-bold border-border hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (itemToDelete) onConfirmDelete(itemToDelete.id);
                onCloseDelete();
              }}
              className="rounded-full px-6 font-bold transition-colors cursor-pointer"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
