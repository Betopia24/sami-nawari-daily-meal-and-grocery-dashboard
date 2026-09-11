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
import { CardGridPageSkeleton } from "@/components/common/CardGridPageSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const MOCK_APPLICATIONS: Application[] = [
  {
    id: "m1",
    ownerName: "John Doe",
    kitchenName: "John's Pizza & Pasta",
    category: "Italian, Fast Food",
    appliedDate: "Sep 10, 2024",
    status: "Pending",
  },
  {
    id: "m2",
    ownerName: "Sarah Smith",
    kitchenName: "Healthy Bites",
    category: "Vegan, Salad",
    appliedDate: "Sep 09, 2024",
    status: "Pending",
  },
  {
    id: "m3",
    ownerName: "Ahmed Ali",
    kitchenName: "Spice Route",
    category: "Indian, Curry",
    appliedDate: "Sep 08, 2024",
    status: "Pending",
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  // Rejection Modal State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedAppIdToReject, setSelectedAppIdToReject] = useState<string | number | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSellerRequests();
        let formattedData: Application[] = [];
        if (data && Array.isArray(data)) {
          formattedData = data.map((req: any) => {
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
        }
        
        // Append Mock Data
        formattedData = [...formattedData, ...MOCK_APPLICATIONS];
        
        setApplications(formattedData);
      } finally {
        setIsLoading(false);
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
    if (String(id).startsWith('m')) {
      setTimeout(() => {
        toast.success("Application approved!", { id: toastId });
        setApplications(apps => apps.map(app => app.id === id ? { ...app, status: "Approved" } : app));
      }, 500);
      return;
    }
    
    const result = await reviewSellerRequest(id.toString(), "APPROVED", "N/A");
    if (result.success) {
      toast.success(result.message || "Application approved!", { id: toastId });
      setApplications(apps => apps.map(app => app.id === id ? { ...app, status: "Approved" } : app));
    } else {
      toast.error(result.error || "Failed to approve", { id: toastId });
    }
  };

  const handleRejectClick = (id: number | string) => {
    setSelectedAppIdToReject(id);
    setRejectReason("");
    setRejectModalOpen(true);
  };

  const confirmReject = async () => {
    if (!selectedAppIdToReject) return;
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    const toastId = toast.loading("Rejecting application...");
    setRejectModalOpen(false);

    if (String(selectedAppIdToReject).startsWith('m')) {
      setTimeout(() => {
        toast.success("Application rejected!", { id: toastId });
        setApplications(apps => apps.map(app => app.id === selectedAppIdToReject ? { ...app, status: "Rejected" } : app));
      }, 500);
      return;
    }

    const result = await reviewSellerRequest(selectedAppIdToReject.toString(), "REJECTED", rejectReason);
    if (result.success) {
      toast.success(result.message || "Application rejected!", { id: toastId });
      setApplications(apps => apps.map(app => app.id === selectedAppIdToReject ? { ...app, status: "Rejected" } : app));
    } else {
      toast.error(result.error || "Failed to reject", { id: toastId });
    }
  };

  if (isLoading) {
    return <CardGridPageSkeleton />;
  }

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
            onReject={handleRejectClick}
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

      {/* Reject Reason Dialog */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Reject Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this seller application. This reason will be recorded.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 py-4">
            <div className="grid flex-1 gap-2">
              <textarea
                id="reason"
                placeholder="Enter rejection reason..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[120px] w-full rounded-xl border border-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#EF4444] focus-visible:border-[#EF4444] disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end gap-2 sm:gap-0 mt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setRejectModalOpen(false)}
              className="rounded-full font-bold px-6"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={confirmReject}
              className="bg-[#EF4444] text-white hover:bg-[#dc2626] rounded-full font-bold px-6"
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
