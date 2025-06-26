import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import SalesChart from '@/components/SalesChart';
import { DateRangePicker } from '@/components/DateRangePicker';

// Placeholder data for Top Selling Products
const topProducts = [
  { id: 'PROD-001', name: 'Quantum Hoodie', sales: 150, revenue: '$12,000' },
  { id: 'PROD-002', name: 'Nebula T-Shirt', sales: 120, revenue: '$4,800' },
  { id: 'PROD-003', name: 'Galaxy Sneakers', sales: 95, revenue: '$14,250' },
  { id: 'PROD-004', name: 'Orbit Watch', sales: 80, revenue: '$24,000' },
];

const Analytics: React.FC = () => {
  console.log('Analytics page loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Analytics</h1>
          </div>
          <Tabs defaultValue="overview">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DateRangePicker />
              </div>
            </div>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                  <SalesChart />
                </div>
                <div className="col-span-3">
                   <Card>
                    <CardHeader>
                      <CardTitle>Top Selling Products</CardTitle>
                      <CardDescription>
                        A list of your best-performing products in the selected date range.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Sales</TableHead>
                            <TableHead>Revenue</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topProducts.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>{product.sales}</TableCell>
                              <TableCell>{product.revenue}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
               <Card>
                <CardHeader>
                  <CardTitle>Advanced Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed reporting and export options will be available here soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Analytics;