"use client";

import { useState } from "react";
import { useEffect } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { CommonPagination } from "@/components/common/CommonPagination";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { ApplicationCard } from "./_components/ApplicationCard";
import { Application } from "./types";
import { getSellerRequests, reviewSellerRequest } from "@/app/actions/admin";
import { toast } from "sonner";


export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      const data = await getSellerRequests();
      if (data && Array.isArray(data)) {
        const formattedData: Application[] = data.map((req: any) => {
          // Format date like "Aug 5, 2024"
          const date = new Date(req.createdAt);
          const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          
          // Format status like "PENDING" -> "Pending"
          const statusStr = req.status || "PENDING";
          const formattedStatus = statusStr.charAt(0).toUpperCase() + statusStr.slice(1).toLowerCase();

          // Format category (cuisine) to handle multiple types: ["MEDITERRANEAN", "ITALIAN", "CHINESE"] -> "Mediterranean, Italian, +1 More"
          let formattedCategory = "Other";
          if (Array.isArray(req.cuisineTypes) && req.cuisineTypes.length > 0) {
            const firstTwo = req.cuisineTypes.slice(0, 2).map((cuisine: string) => 
              cuisine.charAt(0).toUpperCase() + cuisine.slice(1).toLowerCase()
            );
            
            if (req.cuisineTypes.length > 2) {
              const remainingCount = req.cuisineTypes.length - 2;
              formattedCategory = `${firstTwo.join(", ")}, +${remainingCount} More`;
            } else {
              formattedCategory = firstTwo.join(", ");
            }
          }

          return {
            id: req.id,
            ownerName: req.ownerName || "Unknown",
            kitchenName: req.businessName || "Unknown",
            category: formattedCategory,
            appliedDate: formattedDate,
            status: formattedStatus,
          };
        });
        setApplications(formattedData);
      }
    }
    fetchData();
  }, []);
  
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const currentApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = async (id: number | string) => {
    const toastId = toast.loading("Approving application...");
    const result = await reviewSellerRequest(id.toString(), "APPROVED", "N/A");
    if (result.success) {
      toast.success(result.message || "Application approved!", { id: toastId });
      setApplications(apps => apps.map(app => app.id === id ? { ...app, status: "Approved" } : app));
    } else {
      toast.error(result.error || "Failed to approve", { id: toastId });
    }
  };

  const handleReject = async (id: number | string) => {
    const toastId = toast.loading("Rejecting application...");
    const result = await reviewSellerRequest(id.toString(), "REJECTED", "N/A");
    if (result.success) {
      toast.success(result.message || "Application rejected!", { id: toastId });
      setApplications(apps => apps.map(app => app.id === id ? { ...app, status: "Rejected" } : app));
    } else {
      toast.error(result.error || "Failed to reject", { id: toastId });
    }
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

      {applications.length > 6 && (
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
