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
import { Edit3 } from "lucide-react";

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
      <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l border-border p-0">
        <SheetHeader className="p-6 border-b border-border bg-muted/20">
          <SheetTitle className="text-lg font-bold flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <Edit3 className="w-5 h-5" />
            </div>
            Edit Content
          </SheetTitle>
          <SheetDescription className="mt-2 text-[13px]">
            Make changes to the content title and settings.
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-6">
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

        <SheetFooter className="p-6 border-t border-border mt-auto">
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
