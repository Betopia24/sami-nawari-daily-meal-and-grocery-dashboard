import { PageHeader } from "@/components/common/PageHeader";
import { MotionWrapper } from "@/components/common/MotionWrapper";
import { MetricCard } from "./_components/MetricCard";
import { DashboardCharts } from "./_components/DashboardCharts";
import { RecentActivity } from "./_components/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      
      {/* Header */}
      <MotionWrapper delay={0.1}>
        <PageHeader 
          title="Dashboard" 
          description="Platform overview and key metrics" 
        />
      </MotionWrapper>

      {/* Metrics Grid */}
      <MotionWrapper delay={0.2}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Total Users" value="2,847" trendText="+ 12% this week" showTrendIcon />
          <MetricCard title="Active Sellers" value="48" trendText="+ 3 new" showTrendIcon />
          <MetricCard title="Pending Applications" value="7" trendText="Needs action" hasAlert />
          <MetricCard title="Active Orders" value="23" />
          <MetricCard title="Total Revenue" value="$18,420" trendText="+ 8% this month" showTrendIcon />
          <MetricCard title="Food Listings" value="312" trendText="+ 14 new" showTrendIcon />
          <MetricCard title="Reported Content" value="4" hasAlert />
          <MetricCard title="Completed Orders" value="1,204" trendText="this month" />
        </div>
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        <DashboardCharts />
      </MotionWrapper>
      
      <MotionWrapper delay={0.4}>
        <RecentActivity />
      </MotionWrapper>
      
    </div>
  );
}
