import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ReactNode } from "react";

interface KPITileProps {
  title: string;
  value: string | number;
  delta?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
    period?: string;
  };
  sparkline?: ReactNode;
  footnote?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
  onClick?: () => void;
}

export function KPITile({
  title,
  value,
  delta,
  sparkline,
  footnote,
  variant = 'default',
  className,
  onClick
}: KPITileProps) {
  const getTrendIcon = () => {
    switch (delta?.trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />;
      case 'down':
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getTrendColor = () => {
    switch (delta?.trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-danger';
      default:
        return 'text-text-muted';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'danger':
        return 'border-danger/20 bg-danger/5';
      default:
        return 'border-border bg-surface';
    }
  };

  return (
    <div
      className={cn(
        "card-apple p-6 transition-all duration-base cursor-pointer interactive",
        "hover:shadow-soft hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30",
        getVariantStyles(),
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-meta font-medium text-text-muted leading-tight">
          {title}
        </h3>
        {sparkline && (
          <div className="w-16 h-8 opacity-60">
            {sparkline}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <span className="font-mono-nums text-3xl font-bold text-text-primary leading-none">
          {value}
        </span>
      </div>

      {/* Delta and Period */}
      {delta && (
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
            getTrendColor(),
            "bg-current/10"
          )}>
            {getTrendIcon()}
            <span>{delta.value}</span>
          </div>
          {delta.period && (
            <span className="text-xs text-text-muted">
              vs {delta.period}
            </span>
          )}
        </div>
      )}

      {/* Footnote */}
      {footnote && (
        <p className="text-xs text-text-muted mt-3 leading-normal">
          {footnote}
        </p>
      )}
    </div>
  );
}