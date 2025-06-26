import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

// Mock data representing monthly sales
const chartData = [
  { month: "Jan", sales: 1860 },
  { month: "Feb", sales: 3050 },
  { month: "Mar", sales: 2370 },
  { month: "Apr", sales: 730 },
  { month: "May", sales: 2090 },
  { month: "Jun", sales: 2140 },
  { month: "Jul", sales: 2580 },
  { month: "Aug", sales: 1920 },
  { month: "Sep", sales: 2880 },
  { month: "Oct", sales: 3120 },
  { month: "Nov", sales: 2450 },
  { month: "Dec", sales: 3570 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const SalesChart: React.FC = () => {
  console.log('SalesChart loaded');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>An overview of monthly sales performance.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => {
                if (typeof value === 'number') {
                  if (value >= 1000) {
                    return `$${value / 1000}k`;
                  }
                  return `$${value}`;
                }
                return String(value);
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value))}
                  labelFormatter={(label) => `Month: ${label}`}
                  indicator="dot"
                />
              }
            />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;