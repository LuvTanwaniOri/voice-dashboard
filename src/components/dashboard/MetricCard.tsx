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
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
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
            <div className="flex flex-col items-end space-y-1 ml-4">
              <div className="text-xs text-text-muted font-medium">Last 7 days</div>
              <div className="w-24 h-12 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={trend === 'up' ? 'hsl(var(--success))' : trend === 'down' ? 'hsl(var(--destructive))' : 'hsl(var(--accent-blue))'} 
                      strokeWidth={2}
                      dot={{ fill: trend === 'up' ? 'hsl(var(--success))' : trend === 'down' ? 'hsl(var(--destructive))' : 'hsl(var(--accent-blue))', strokeWidth: 0, r: 1.5 }}
                      activeDot={{ r: 3, fill: trend === 'up' ? 'hsl(var(--success))' : trend === 'down' ? 'hsl(var(--destructive))' : 'hsl(var(--accent-blue))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  trend === 'up' ? 'bg-success' : trend === 'down' ? 'bg-destructive' : 'bg-accent-blue'
                )}></div>
                <span className={cn(
                  "text-xs font-medium",
                  trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-accent-blue'
                )}>
                  {trend === 'up' ? 'Trending up' : trend === 'down' ? 'Trending down' : 'Stable'}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}