"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonPagination } from "@/components/common/CommonPagination";
import { MetricCard } from "@/app/dashboard/_components/MetricCard";
import { TransactionTable } from "./_components/TransactionTable";
import { Transaction } from "./types";

const mockTransactions: Transaction[] = [
  { id: 1, txnId: "TXN-001", user: "Emily Chen", type: "Order Payment", amount: "$14.99", method: "Card", date: "Aug 7", status: "Success" },
  { id: 2, txnId: "TXN-002", user: "Marcus Johnson", type: "Order Payment", amount: "$8.99", method: "Cash", date: "Aug 7", status: "Pending" },
  { id: 3, txnId: "TXN-003", user: "Maria Santos", type: "Seller Payout", amount: "$120.00", method: "Bank", date: "Aug 6", status: "Success" },
  { id: 4, txnId: "TXN-004", user: "Sofia Reyes", type: "Refund", amount: "$9.99", method: "Card", date: "Aug 6", status: "Refunded" },
];

export default function PaymentsPage() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [currentPage, setCurrentPage] = useState(1);
  const TRANSACTIONS_PER_PAGE = 5;

  const totalPages = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);
  const paginatedTransactions = transactions.slice((currentPage - 1) * TRANSACTIONS_PER_PAGE, currentPage * TRANSACTIONS_PER_PAGE);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <PageHeader 
        title="Payments" 
        description="Revenue & transaction overview" 
      />

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <MetricCard 
          title="Total Revenue" 
          value="$18,420" 
          trendText="+ 8% this week" 
          showTrendIcon={true} 
        />
        <MetricCard 
          title="Online Payments" 
          value="$14,200" 
        />
        <MetricCard 
          title="Cash Orders" 
          value="$4,220" 
        />
        <MetricCard 
          title="Pending Payouts" 
          value="$1,340" 
          hasAlert={true} 
        />
        <MetricCard 
          title="Refunds" 
          value="$280" 
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <TransactionTable transactions={paginatedTransactions} />
        
        <CommonPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
