import { PageHeader } from "@/components/common/PageHeader";
import { ProfileForm } from "./_components/ProfileForm";
import { PasswordForm } from "./_components/PasswordForm";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full pb-10">
      <PageHeader 
        title="Settings" 
        description="Configure account information" 
      />

      <div className="flex flex-col w-full">
        <ProfileForm />
        
        {/* Divider */}
        <div className="h-px w-full max-w-4xl mx-auto bg-border my-8" />
        
        <PasswordForm />
      </div>
    </div>
  );
}
