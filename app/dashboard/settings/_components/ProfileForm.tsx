"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { EditIcon, CameraIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const [avatarUrl, setAvatarUrl] = useState<string>("/placeholder-avatar.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "Rafiul",
      lastName: "Islam",
      phone: "+880",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    toast.success("Profile updated successfully!");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-2">
        <EditIcon className="w-5 h-5 text-foreground" />
        <h2 className="text-xl font-bold">Edit Profile</h2>
      </div>

      <div className="flex justify-center relative w-fit mx-auto">
        <Avatar className="w-24 h-24 border-2 border-border">
          <AvatarImage src={avatarUrl} alt="Profile" className="object-cover" />
          <AvatarFallback className="bg-muted text-muted-foreground text-xl">RI</AvatarFallback>
        </Avatar>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 p-1.5 bg-[#3A8F5C] text-white rounded-full hover:bg-[#2d7348] transition-colors border-2 border-background cursor-pointer"
        >
          <CameraIcon className="w-3.5 h-3.5" />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">First Name</label>
            <Input 
              {...register("firstName")}
              placeholder="First Name" 
              className="rounded-xl h-11 px-4 border-border focus:border-primary"
            />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">Last Name</label>
            <Input 
              {...register("lastName")}
              placeholder="Last Name" 
              className="rounded-xl h-11 px-4 border-border focus:border-primary"
            />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">Email (Not Changeable)</label>
            <Input 
              value="rafi@gmail.com"
              disabled
              className="rounded-xl h-11 px-4 border-border bg-muted/50 cursor-not-allowed text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">Phone</label>
            <Input 
              {...register("phone")}
              placeholder="Phone Number" 
              className="rounded-xl h-11 px-4 border-border focus:border-primary"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          <Button 
            type="button" 
            variant="outline" 
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
