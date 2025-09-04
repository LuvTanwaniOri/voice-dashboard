import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  variant?: 'default' | 'glass' | 'accent';
  trendData?: Array<{ value: number }>;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  trend = 'neutral',
  variant = 'default',
  className,
  trendData
}: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    if (change === undefined) return null;
    
    const Icon = trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→';
    return <span className="ml-1 text-xs">{Icon}</span>;
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'glass':
        return 'glass-panel border-border/50';
      case 'accent':
        return 'bg-gradient-primary border-accent-blue/20 shadow-glow/20';
      default:
        return 'metric-card-enhanced';
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-base hover:scale-[1.02] hover:shadow-lg",
      getVariantClasses(),
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-text-secondary flex items-center justify-between">
          <span>{title}</span>
          <div className={cn(
            "p-2 rounded-lg transition-colors duration-base",
            variant === 'accent' ? 'bg-white/10' : 'bg-accent-blue/10 text-accent-blue'
          )}>
            {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className={cn(
              "text-3xl font-bold tracking-tight",
              variant === 'accent' ? 'text-white' : 'text-text-primary'
            )}>
              {value}
            </div>
            {change !== undefined && (
              <div className={cn(
                "text-sm flex items-center",
                getTrendColor()
              )}>
                <span className="font-medium">
                  {change > 0 ? '+' : ''}{change}%
                </span>
                {getTrendIcon()}
                <span className="ml-2 text-text-muted">vs last period</span>
              </div>
            )}
          </div>
          {trendData && trendData.length > 0 && (
            <div className="w-20 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={trend === 'up' ? 'hsl(var(--success))' : trend === 'down' ? 'hsl(var(--destructive))' : 'hsl(var(--accent-blue))'} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}