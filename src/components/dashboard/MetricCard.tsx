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
  description?: string;
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
  description,
  trendData
}: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-danger';
      default:
        return 'text-text-muted';
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
        return 'bg-gradient-primary border-accent-primary/20 shadow-glow/20';
      default:
        return 'card-neural';
    }
  };

  return (
    <Card className={cn(
      "interactive-glow transition-all duration-base",
      getVariantClasses(),
      className
    )}>
      <CardHeader className="pb-3">
        <div className="narrative-section">
          <CardTitle className="text-sm font-medium text-text-secondary flex items-center justify-between">
            <div>
              <span>{title}</span>
              {description && <p className="narrative-context mt-1">{description}</p>}
            </div>
            <div className={cn(
              "p-2 rounded-lg transition-colors duration-base",
              variant === 'accent' ? 'bg-white/10' : 'bg-accent-primary/10 text-accent-primary'
            )}>
              {icon}
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main metrics row */}
          <div className="flex items-start justify-between">
            <div className={cn(
              "text-3xl font-bold tracking-tight",
              variant === 'accent' ? 'text-white' : 'text-text-primary'
            )}>
              {value}
            </div>
            {trendData && trendData.length > 0 && (
              <div className="flex flex-col items-end space-y-1">
                <div className="text-xs text-text-muted font-medium">Last 7 days</div>
                <div className="w-24 h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={trend === 'up' ? 'hsl(var(--success))' : trend === 'down' ? 'hsl(var(--danger))' : 'hsl(var(--accent-primary))'} 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 3, fill: trend === 'up' ? 'hsl(var(--success))' : trend === 'down' ? 'hsl(var(--danger))' : 'hsl(var(--accent-primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom aligned info row */}
          {(change !== undefined || (trendData && trendData.length > 0)) && (
            <div className="flex items-center justify-between">
              {change !== undefined ? (
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
              ) : <div />}
              
              {trendData && trendData.length > 0 && (
                <div className="flex items-center gap-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-neural-pulse",
                    trend === 'up' ? 'bg-success' : trend === 'down' ? 'bg-danger' : 'bg-accent-primary'
                  )}></div>
                  <span className={cn(
                    "text-xs font-medium",
                    trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-accent-primary'
                  )}>
                    {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}