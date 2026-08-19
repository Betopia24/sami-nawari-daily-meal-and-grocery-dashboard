"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip
} from "recharts";

const barChartData = [
  { name: "Mon", total: 32 },
  { name: "Tue", total: 48 },
  { name: "Wed", total: 41 },
  { name: "Thu", total: 56 },
  { name: "Fri", total: 38 },
  { name: "Sat", total: 62 },
  { name: "Sun", total: 70 },
];

const lineChartData = [
  { name: "Mon", total: 5 },
  { name: "Tue", total: 9 },
  { name: "Wed", total: 7 },
  { name: "Thu", total: 12 },
  { name: "Fri", total: 10 },
  { name: "Sat", total: 15 },
  { name: "Sun", total: 13 },
];

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* User Growth */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-bold text-foreground">User Growth — Last 7 Days</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 4, 4]} label={{ position: 'top', fill: 'var(--primary)', fontSize: 14, fontWeight: 'bold' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Orders This Week */}
      <Card className="rounded-xl border-border shadow-sm">
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-bold text-foreground">Orders This Week</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#888888" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="linear" 
                  dataKey="total" 
                  stroke="var(--primary)" 
                  strokeWidth={3} 
                  activeDot={{ r: 6, fill: "var(--primary)" }} 
                  dot={{ r: 4, fill: "var(--primary)", strokeWidth: 2, stroke: "#fff" }} 
                  label={{ position: 'top', fill: 'var(--primary)', fontSize: 14, fontWeight: 'bold' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
