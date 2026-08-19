"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LockIcon } from "@/components/icons";
import { Eye, EyeOff } from "lucide-react";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function PasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: PasswordFormValues) => {
    console.log("Password updated:", data);
    toast.success("Password changed successfully!");
    reset(); // Clear form on success
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mt-10">
      <div className="flex items-center gap-2">
        <LockIcon className="w-5 h-5 text-foreground" />
        <h2 className="text-xl font-bold">Change Password</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">Current Password</label>
            <div className="relative">
              <Input 
                type={showCurrent ? "text" : "password"}
                {...register("currentPassword")}
                placeholder="Enter your current password" 
                className="rounded-xl h-11 px-4 border-border focus:border-primary pr-11"
              />
              <button 
                type="button" 
                onClick={() => setShowCurrent(!showCurrent)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.currentPassword && <p className="text-red-500 text-xs">{errors.currentPassword.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">New Password</label>
            <div className="relative">
              <Input 
                type={showNew ? "text" : "password"}
                {...register("newPassword")}
                placeholder="Enter a new password" 
                className="rounded-xl h-11 px-4 border-border focus:border-primary pr-11"
              />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">Confirm Password</label>
            <div className="relative">
              <Input 
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Re-enter your new password" 
                className="rounded-xl h-11 px-4 border-border focus:border-primary pr-11"
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => reset()}
            className="w-full rounded-xl h-11 font-bold border-border hover:bg-muted transition-colors cursor-pointer text-muted-foreground"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="w-full rounded-xl h-11 font-bold bg-[#3A8F5C] text-white hover:bg-[#2d7348] transition-colors cursor-pointer"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
