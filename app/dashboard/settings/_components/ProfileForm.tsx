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
import { updateProfileAction } from "@/app/actions/profile";


const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData?: any; // The user data from the backend
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>(initialData?.profilePicture || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData?.name || "",
      username: initialData?.username || "",
      phone: initialData?.phone || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    
    const payload = {
      name: data.name,
      username: data.username,
      phone: data.phone,
    };
    formData.append("data", JSON.stringify(payload));
    
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PNG, JPEG, and WebP images are allowed.");
        return;
      }
      formData.append("file", file);
    }
    
    const toastId = toast.loading("Updating profile...");
    
    try {
      const result = await updateProfileAction(formData);
      if (result.success) {
        toast.success(result.message || "Profile updated successfully!", { id: toastId });
      } else {
        toast.error(result.error || "Failed to update profile", { id: toastId });
      }
    } catch (err) {
      toast.error("An unexpected error occurred", { id: toastId });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a PNG, JPEG, or WebP image");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
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
          <AvatarFallback className="bg-[#3A8F5C]/10 text-[#3A8F5C] text-3xl font-bold">{watch("name")?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 p-1.5 bg-[#3A8F5C] text-white rounded-full hover:bg-[#2d7348] transition-colors border-2 border-background cursor-pointer"
          type="button"
        >
          <CameraIcon className="w-3.5 h-3.5" />
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/png, image/jpeg, image/webp" 
          className="hidden" 
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">Full Name</label>
            <Input 
              {...register("name")}
              placeholder="Full Name" 
              className="rounded-xl h-11 px-4 border-border focus:border-primary"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">Username</label>
            <Input 
              {...register("username")}
              placeholder="Username" 
              className="rounded-xl h-11 px-4 border-border focus:border-primary"
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-bold text-foreground">Email (Not Changeable)</label>
            <Input 
              value={initialData?.email || ""}
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
