import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Seller } from "../types";

interface SellerTableProps {
  sellers: Seller[];
  onViewSeller: (seller: Seller) => void;
  onSuspendSeller: (sellerId: number) => void;
  onActivateSeller: (sellerId: number) => void;
}

export function SellerTable({ sellers, onViewSeller, onSuspendSeller, onActivateSeller }: SellerTableProps) {
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Suspended":
        return "bg-[#ffe5e5] text-[#EF4444] hover:bg-[#ffe5e5]";
      case "Pending":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Kitchen</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Owner</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Status</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Rating</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Orders</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Foods</TableHead>
            <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers.map((seller) => (
            <TableRow key={seller.id} className="border-border hover:bg-muted/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <TableCell className="px-6 py-4">
                <span className="font-semibold text-foreground text-sm">{seller.kitchenName}</span>
              </TableCell>
              <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">{seller.ownerName}</TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant="secondary" className={`rounded-full px-4 py-3 border-none text-[11px] font-bold ${getStatusBadgeStyles(seller.status)}`}>
                  {seller.status}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4 text-foreground text-sm font-medium">{seller.rating !== null ? seller.rating : "—"}</TableCell>
              <TableCell className="px-6 py-4 text-foreground text-sm font-medium">{seller.orders}</TableCell>
              <TableCell className="px-6 py-4 text-foreground text-sm font-medium">{seller.foods}</TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => onViewSeller(seller)} className="cursor-pointer text-primary font-bold text-[13px] hover:underline">View Profile</button>
                  {seller.status === "Suspended" ? (
                    <button onClick={() => onActivateSeller(seller.id)} className="cursor-pointer text-primary font-bold text-[13px] hover:underline">Activate</button>
                  ) : (
                    <button onClick={() => onSuspendSeller(seller.id)} className="cursor-pointer text-destructive font-bold text-[13px] hover:underline">Suspend</button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {sellers.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                No sellers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
