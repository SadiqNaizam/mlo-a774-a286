import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: React.ElementType;
  changeType?: 'positive' | 'negative';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  description,
  icon: Icon,
  changeType = 'positive'
}) => {
  console.log('StatsCard loaded for:', title);

  const changeColorClass = changeType === 'positive' ? 'text-emerald-500 dark:text-emerald-400' : 'text-red-500 dark:text-red-400';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={`font-medium ${changeColorClass}`}>{change}</span> {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;