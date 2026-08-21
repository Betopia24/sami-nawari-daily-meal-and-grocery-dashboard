import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContentItem } from "../types";
import { EditIcon } from "@/components/icons";

interface ContentEditSheetProps {
  itemToEdit: ContentItem | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedItem: ContentItem) => void;
}

export function ContentEditSheet({
  itemToEdit,
  isOpen,
  onOpenChange,
  onSave,
}: ContentEditSheetProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
    }
  }, [itemToEdit]);

  const handleSave = () => {
    if (itemToEdit) {
      onSave({ ...itemToEdit, title });
    }
    onOpenChange(false);
  };

  if (!itemToEdit) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md border-l-0 shadow-2xl bg-background/95 backdrop-blur-xl">
        <SheetHeader className="mb-2">
          <SheetTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0">
              <EditIcon className="w-5 h-5" />
            </div>
            Edit Content
          </SheetTitle>
          <SheetDescription className="mt-2 text-[13px]">
            Make changes to the content title and settings.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6 w-full animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
          <div className="space-y-3">
            <label className="text-[13px] font-bold text-muted-foreground uppercase tracking-wide">
              Title
            </label>
            <Input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl border-border h-11 px-4 text-[14px]"
            />
          </div>
        </div>

        <SheetFooter className="mt-auto pt-6 border-t border-border/40 w-full">
          <div className="flex justify-end gap-3 w-full">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="rounded-full px-6 font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="rounded-full px-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Save Changes
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
