import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { Application } from "../types";

interface ApplicationCardProps {
  application: Application;
  onApprove: (id: string | number) => void;
  onReject: (id: string | number) => void;
}

export function ApplicationCard({ application, onApprove, onReject }: ApplicationCardProps) {
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-[#e8f3ec] text-[#3A8F5C] hover:bg-[#e8f3ec]";
      case "Rejected":
        return "bg-[#ffe5e5] text-[#EF4444] hover:bg-[#ffe5e5]";
      case "Pending":
      default:
        return "bg-[#fff0e5] text-[#F59E0B] hover:bg-[#fff0e5]";
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 bg-[#3A8F5C]">
            <AvatarFallback className="bg-[#3A8F5C] text-white text-lg font-semibold">
              {application.ownerName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-foreground text-[16px]">{application.ownerName}</h3>
            <p className="text-muted-foreground text-[13px] mt-0.5">{application.kitchenName}</p>
          </div>
        </div>
        <Badge variant="secondary" className={`rounded-full px-3 py-1.5 font-bold border-none text-[12px] ${getStatusBadgeStyles(application.status)}`}>
          {application.status}
        </Badge>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-muted-foreground">Category</span>
          <span className="font-bold text-foreground">{application.category}</span>
        </div>
        <div className="flex justify-between items-center text-[13px]">
          <span className="text-muted-foreground">Applied</span>
          <span className="font-bold text-foreground">{application.appliedDate}</span>
        </div>
      </div>

      <div className="h-10 mt-auto">
        {application.status === 'Pending' ? (
          <div className="flex items-center gap-3 h-full">
            <Button 
              className="flex-1 bg-[#3A8F5C] text-white hover:bg-[#2d7348] rounded-full cursor-pointer font-bold h-10"
              onClick={() => onApprove(application.id)}
            >
              Approve
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-[#EF4444]/30 text-[#EF4444] hover:bg-[#ffe5e5] hover:text-[#EF4444] hover:border-[#EF4444]/50 rounded-full cursor-pointer font-bold h-10 bg-transparent"
              onClick={() => onReject(application.id)}
            >
              Reject
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-[13px] font-medium text-muted-foreground opacity-50">
              Application has been reviewed
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
