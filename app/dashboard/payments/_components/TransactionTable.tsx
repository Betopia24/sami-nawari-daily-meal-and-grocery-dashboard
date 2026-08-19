import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "../types";

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Success":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Pending":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      case "Refunded":
        return "bg-[#ffe5e5] text-[#EF4444] hover:bg-[#ffe5e5]";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border bg-card">
        <h2 className="font-bold text-foreground">Recent Transactions</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">
                ID
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[200px]">
                User
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[180px]">
                Type
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">
                Amount
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">
                Method
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider w-[120px]">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((txn) => (
                <TableRow key={txn.id} className="hover:bg-muted/30 transition-colors border-b border-border last:border-0">
                  <TableCell className="px-6 py-4 text-[#3A8F5C] text-[13px] font-bold">
                    {txn.txnId}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-foreground text-[14px] font-medium">
                    {txn.user}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">
                    {txn.type}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-foreground text-[14px] font-bold">
                    {txn.amount}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">
                    {txn.method}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">
                    {txn.date}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="secondary" className={`rounded-full px-4 py-3 border-none text-[11px] font-bold ${getStatusBadgeStyles(txn.status)}`}>
                      {txn.status}
                    </Badge>
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
