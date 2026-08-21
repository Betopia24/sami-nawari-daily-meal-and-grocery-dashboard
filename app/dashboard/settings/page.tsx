import { PageHeader } from "@/components/common/PageHeader";
import { ProfileForm } from "./_components/ProfileForm";
import { PasswordForm } from "./_components/PasswordForm";
import { MotionWrapper } from "@/components/common/MotionWrapper";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full pb-10">
      <MotionWrapper delay={0.1}>
        <PageHeader 
          title="Settings" 
          description="Configure account information" 
        />
      </MotionWrapper>

      <div className="flex flex-col w-full">
        <MotionWrapper delay={0.2}>
          <ProfileForm />
        </MotionWrapper>
        
        <MotionWrapper delay={0.3}>
          {/* Divider */}
          <div className="h-px w-full max-w-4xl mx-auto bg-border my-8" />
        </MotionWrapper>
        
        <MotionWrapper delay={0.4}>
          <PasswordForm />
        </MotionWrapper>
      </div>
    </div>
  );
}
