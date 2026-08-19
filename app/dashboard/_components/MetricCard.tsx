import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trendText?: string;
  showTrendIcon?: boolean;
  hasAlert?: boolean;
}

export function MetricCard({ title, value, trendText, showTrendIcon, hasAlert }: MetricCardProps) {
  return (
    <Card className="rounded-xl border-border shadow-sm relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
        <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
        {hasAlert && (
          <Badge variant="destructive" className="bg-red-100 text-red-600 hover:bg-red-100 border-none rounded-full px-2 py-0 text-[10px] absolute top-4 right-4">
            Alert
          </Badge>
        )}
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-2xl font-bold">{value}</div>
        {trendText && (
          <p className="text-xs text-primary flex items-center mt-1 font-medium">
            {showTrendIcon && <ArrowUpIcon className="mr-1 h-3 w-3" />}
            {trendText}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
