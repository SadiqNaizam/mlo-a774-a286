import React from 'react';
import {
  Activity,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";

import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import StatsCard from '@/components/StatsCard';
import RecentSalesList from '@/components/RecentSalesList';
import SalesChart from '@/components/SalesChart';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  console.log('Dashboard page loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* Top Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <StatsCard
              title="Total Revenue"
              value="$45,231.89"
              change="+20.1%"
              description="from last month"
              icon={DollarSign}
              changeType="positive"
            />
            <StatsCard
              title="Subscriptions"
              value="+2350"
              change="+180.1%"
              description="from last month"
              icon={Users}
              changeType="positive"
            />
            <StatsCard
              title="Sales"
              value="+12,234"
              change="+19%"
              description="from last month"
              icon={CreditCard}
              changeType="positive"
            />
            <StatsCard
              title="Active Now"
              value="+573"
              change="+201"
              description="since last hour"
              icon={Activity}
              changeType="positive"
            />
          </div>
          
          {/* Main Chart and Recent Sales Section */}
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSalesList />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;