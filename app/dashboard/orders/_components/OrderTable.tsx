import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order } from "../types";

interface OrderTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

export function OrderTable({ orders, onViewOrder }: OrderTableProps) {
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Delivered":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Preparing":
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
      case "Cancelled":
        return "bg-[#ffe5e5] text-[#EF4444] hover:bg-[#ffe5e5]";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPaymentBadgeStyles = (payment: string) => {
    switch (payment) {
      case "Online":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Cash on Pickup":
      case "Cash on Delivery":
        return "bg-gray-100 text-gray-700 hover:bg-gray-100";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Order ID
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Buyer
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Seller
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Item
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Total
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Payment
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 text-[12px] font-bold text-muted-foreground uppercase tracking-wider">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/30 transition-colors border-b border-border">
                  <TableCell className="px-6 py-4 text-[#3A8F5C] text-[13px] font-bold">
                    {order.orderId}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-foreground text-[14px] font-medium">
                    {order.buyer}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">
                    {order.seller}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-foreground text-[13px]">
                    {order.item}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-foreground text-[14px] font-bold">
                    {order.total}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="secondary" className={`rounded-full px-4 py-3 border-none text-[11px] font-bold ${getPaymentBadgeStyles(order.payment)}`}>
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge variant="secondary" className={`rounded-full px-4 py-3 border-none text-[11px] font-bold ${getStatusBadgeStyles(order.status)}`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground text-[13px]">
                    {order.date}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <button 
                      onClick={() => onViewOrder(order)} 
                      className="cursor-pointer text-[#3A8F5C] font-bold text-[13px] hover:text-[#2d7348] transition-colors"
                    >
                      View
                    </button>
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
