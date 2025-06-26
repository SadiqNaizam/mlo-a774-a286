import React from 'react';
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File, ListFilter, PlusCircle, MoreHorizontal } from 'lucide-react';

// Placeholder data for products
const products = [
  {
    id: 'prod_001',
    name: "Acoustic Guitar",
    sku: "AG-100",
    price: 299.99,
    stock: 25,
    status: "In Stock",
    imageUrl: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 'prod_002',
    name: "Electric Keyboard",
    sku: "EK-250",
    price: 449.00,
    stock: 15,
    status: "In Stock",
    imageUrl: "https://images.unsplash.com/photo-1629429408209-1f9129f17173?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 'prod_003',
    name: "Drum Set",
    sku: "DS-400",
    price: 799.50,
    stock: 8,
    status: "In Stock",
    imageUrl: "https://images.unsplash.com/photo-1595160397514-e65953503f90?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 'prod_004',
    name: "Professional Microphone",
    sku: "PM-550",
    price: 150.00,
    stock: 0,
    status: "Out of Stock",
    imageUrl: "https://images.unsplash.com/photo-1590602848952-e224a1c645ce?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 'prod_005',
    name: "Studio Headphones",
    sku: "SH-300",
    price: 199.99,
    stock: 50,
    status: "In Stock",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf4022?q=80&w=400&auto=format&fit=crop",
  },
];

const ProductsManagement = () => {
  console.log('ProductsManagement loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <LeftSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Stock
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.imageUrl}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                        <div className="text-xs text-muted-foreground md:hidden">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.status === "In Stock" ? "default" : "destructive"}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.stock}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-5</strong> of <strong>{products.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ProductsManagement;