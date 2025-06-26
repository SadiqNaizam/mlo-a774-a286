import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

// Mock data for recent sales to demonstrate the component's appearance.
// In a real application, this data would be fetched from an API.
const recentSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatarSrc: "/avatars/01.png", // Using placeholder paths for images
    avatarFallback: "OM",
    amount: 1999.00,
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatarSrc: "/avatars/02.png",
    avatarFallback: "JL",
    amount: 39.00,
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatarSrc: "/avatars/03.png",
    avatarFallback: "IN",
    amount: 299.00,
  },
  {
    name: "William Kim",
    email: "will@email.com",
    avatarSrc: "/avatars/04.png",
    avatarFallback: "WK",
    amount: 99.00,
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatarSrc: "/avatars/05.png",
    avatarFallback: "SD",
    amount: 39.00,
  },
];

const RecentSalesList: React.FC = () => {
  console.log('RecentSalesList loaded');

  return (
    <div className="space-y-8">
      {recentSalesData.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            {/* The avatar images are placeholders and will show the fallback if not found. */}
            <AvatarImage src={sale.avatarSrc} alt={`${sale.name}'s Avatar`} />
            <AvatarFallback>{sale.avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">
            +${sale.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSalesList;