import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, ShoppingCart, Package, LineChart } from 'lucide-react';

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
      isActive
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink to="/" end className={navLinkClasses}>
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink to="/orders-management" className={navLinkClasses}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Orders</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Orders</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink to="/products-management" className={navLinkClasses}>
              <Package className="h-5 w-5" />
              <span className="sr-only">Products</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Products</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink to="/analytics" className={navLinkClasses}>
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Analytics</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Analytics</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default LeftSidebar;