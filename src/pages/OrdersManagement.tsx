import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  MoreHorizontal,
  Filter,
} from 'lucide-react';

import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from "sonner";

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

interface Order {
  id: string;
  customerName: string;
  email: string;
  date: string;
  status: OrderStatus;
  total: number;
  shippingAddress: string;
  items: { id: string; name: string; quantity: number; price: number }[];
}

const mockOrders: Order[] = [
  { id: 'ORD001', customerName: 'Alice Johnson', email: 'alice@example.com', date: '2023-10-26', status: 'Shipped', total: 150.00, shippingAddress: '123 Maple St, Anytown, USA', items: [{id: 'P01', name: 'Wireless Mouse', quantity: 2, price: 25.00}, {id: 'P02', name: 'USB-C Hub', quantity: 1, price: 100.00}] },
  { id: 'ORD002', customerName: 'Bob Smith', email: 'bob@example.com', date: '2023-10-25', status: 'Delivered', total: 75.50, shippingAddress: '456 Oak Ave, Somecity, USA', items: [{id: 'P03', name: 'Ergonomic Keyboard', quantity: 1, price: 75.50}] },
  { id: 'ORD003', customerName: 'Charlie Brown', email: 'charlie@example.com', date: '2023-10-27', status: 'Pending', total: 250.75, shippingAddress: '789 Pine Ln, Yourtown, USA', items: [{id: 'P04', name: '4K Monitor', quantity: 1, price: 250.75}] },
  { id: 'ORD004', customerName: 'Diana Prince', email: 'diana@example.com', date: '2023-10-24', status: 'Cancelled', total: 30.00, shippingAddress: '101 Starfish Rd, Metropolis, USA', items: [{id: 'P05', name: 'Mouse Pad', quantity: 1, price: 30.00}] },
  { id: 'ORD005', customerName: 'Ethan Hunt', email: 'ethan@example.com', date: '2023-10-28', status: 'Pending', total: 1200.00, shippingAddress: '21 Mission St, Impossible City, USA', items: [{id: 'P06', name: 'Gaming Laptop', quantity: 1, price: 1200.00}] },
];

const OrdersManagement = () => {
  console.log('OrdersManagement loaded');

  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => statusFilter === 'all' || order.status === statusFilter)
      .filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [orders, searchTerm, statusFilter]);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };
  
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}.`);
    setIsDialogOpen(false);
  };

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'default'; // default is green-ish/blue-ish in shadcn
      case 'Shipped':
        return 'secondary'; // secondary is grey-ish
      case 'Pending':
        return 'outline'; // outline with default text color
      case 'Cancelled':
        return 'destructive'; // destructive is red
      default:
        return 'default';
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Manage your orders and view their details.
              </CardDescription>
              <div className="flex items-center gap-2 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by Order ID or Customer..."
                    className="w-full rounded-lg bg-background pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={statusFilter === 'all'} onCheckedChange={() => setStatusFilter('all')}>All</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={statusFilter === 'Pending'} onCheckedChange={() => setStatusFilter('Pending')}>Pending</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={statusFilter === 'Shipped'} onCheckedChange={() => setStatusFilter('Shipped')}>Shipped</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={statusFilter === 'Delivered'} onCheckedChange={() => setStatusFilter('Delivered')}>Delivered</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={statusFilter === 'Cancelled'} onCheckedChange={() => setStatusFilter('Cancelled')}>Cancelled</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="cursor-pointer" onClick={() => handleViewDetails(order)}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewDetails(order); }}>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
      
      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Customer: {selectedOrder.customerName} ({selectedOrder.email})
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                 <p className="text-sm text-muted-foreground">
                    Address: {selectedOrder.shippingAddress}
                </p>
                <div className="font-semibold">Items</div>
                <ul className="grid gap-3">
                  {selectedOrder.items.map(item => (
                    <li key={item.id} className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {item.name} x <span>{item.quantity}</span>
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <div>
                    Current Status: <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>{selectedOrder.status}</Badge>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => handleUpdateStatus(selectedOrder.id, 'Shipped')} disabled={selectedOrder.status === 'Shipped'}>Mark as Shipped</Button>
                    <Button onClick={() => handleUpdateStatus(selectedOrder.id, 'Delivered')} disabled={selectedOrder.status === 'Delivered'}>Mark as Delivered</Button>
                    <Button variant="destructive" onClick={() => handleUpdateStatus(selectedOrder.id, 'Cancelled')} disabled={selectedOrder.status === 'Cancelled'}>Cancel Order</Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersManagement;