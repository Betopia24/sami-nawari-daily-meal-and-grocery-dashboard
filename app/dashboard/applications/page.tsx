"use client";

import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonPagination } from "@/components/common/CommonPagination";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { ApplicationCard } from "./_components/ApplicationCard";
import { Application } from "./types";

const mockApplications: Application[] = [
  { id: 1, ownerName: "Raj Patel", kitchenName: "Raj's Spice House", category: "Indian", appliedDate: "Aug 5, 2024", status: "Pending" },
  { id: 2, ownerName: "Fatima Al-Hasan", kitchenName: "Al-Hasan Home Eats", category: "Middle Eastern", appliedDate: "Aug 4, 2024", status: "Pending" },
  { id: 3, ownerName: "Lin Wei", kitchenName: "Wei family Kitchen", category: "Chinese", appliedDate: "Aug 3, 2024", status: "Pending" },
  { id: 4, ownerName: "Raj Patel", kitchenName: "Raj's Spice House", category: "Indian", appliedDate: "Aug 5, 2024", status: "Pending" },
  { id: 5, ownerName: "Fatima Al-Hasan", kitchenName: "Al-Hasan Home Eats", category: "Middle Eastern", appliedDate: "Aug 4, 2024", status: "Pending" },
  { id: 6, ownerName: "Lin Wei", kitchenName: "Wei family Kitchen", category: "Chinese", appliedDate: "Aug 3, 2024", status: "Pending" },
  { id: 7, ownerName: "Maria Garcia", kitchenName: "Maria's Tacos", category: "Mexican", appliedDate: "Aug 2, 2024", status: "Pending" },
  { id: 8, ownerName: "John Smith", kitchenName: "Burger Joint", category: "American", appliedDate: "Aug 1, 2024", status: "Pending" },
  { id: 9, ownerName: "Sushi Master", kitchenName: "Tokyo Sushi", category: "Japanese", appliedDate: "Jul 30, 2024", status: "Pending" },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const currentApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = (id: number) => {
    // Update the status to Approved instead of removing from UI
    setApplications(apps => apps.map(app => app.id === id ? { ...app, status: "Approved" } : app));
  };

  const handleReject = (id: number) => {
    // Update the status to Rejected instead of removing from UI
    setApplications(apps => apps.map(app => app.id === id ? { ...app, status: "Rejected" } : app));
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <MotionWrapper delay={0.1}>
        <PageHeader 
          title="Sellers Application" 
          description="Review & approve new seller request" 
        />
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentApplications.map(app => (
          <ApplicationCard 
            key={app.id} 
            application={app} 
            onApprove={handleApprove}
            onReject={handleReject}
          />
        ))}
        {applications.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-card border border-border rounded-2xl">
            <h3 className="text-lg font-semibold text-foreground mb-1">No pending applications</h3>
            <p className="text-muted-foreground text-sm">You have reviewed all seller requests.</p>
          </div>
        )}
        </div>
      </MotionWrapper>

      {applications.length > 0 && (
        <MotionWrapper delay={0.3}>
          <CommonPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </MotionWrapper>
      )}
    </div>
  );
}
