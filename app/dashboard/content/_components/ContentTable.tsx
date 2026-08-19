import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "../types";

interface ContentTableProps {
  content: ContentItem[];
  onEdit: (item: ContentItem) => void;
  onToggleArchive: (item: ContentItem) => void;
  onDelete: (item: ContentItem) => void;
}

export function ContentTable({ content, onEdit, onToggleArchive, onDelete }: ContentTableProps) {
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Draft":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      case "Archived":
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mt-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[40%]">
                Title
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[20%]">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[20%]">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[20%]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  No content found.
                </TableCell>
              </TableRow>
            ) : (
              content.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30 transition-colors border-b border-border last:border-0">
                  <TableCell className="px-6 py-4 text-foreground text-[14px] font-bold">
                    {item.title}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="secondary" className={`rounded-full px-4 py-3 border-none text-[11px] font-bold ${getStatusBadgeStyles(item.status)}`}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">
                    {item.date}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onEdit(item)}
                        className="text-[#3A8F5C] font-bold text-[13px] hover:text-[#2d7348] transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onToggleArchive(item)}
                        className="text-gray-500 font-bold text-[13px] hover:text-gray-700 transition-colors cursor-pointer"
                      >
                        {item.status === "Archived" ? "Restore" : "Archive"}
                      </button>
                      <button 
                        onClick={() => onDelete(item)}
                        className="text-[#EF4444] font-bold text-[13px] hover:text-red-700 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
