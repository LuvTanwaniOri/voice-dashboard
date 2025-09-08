import { useState } from "react";
import { HelpCircle, Info, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { cn } from "@/lib/utils";

interface ContextualHelpProps {
  title: string;
  description: string;
  details?: string;
  learnMoreUrl?: string;
  variant?: "info" | "tooltip" | "inline";
  className?: string;
}

export function ContextualHelp({ 
  title, 
  description, 
  details, 
  learnMoreUrl, 
  variant = "tooltip",
  className 
}: ContextualHelpProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (variant === "tooltip") {
    return (
      <div className="group relative inline-block">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-5 w-5 p-0 text-text-muted hover:text-text-accent rounded-full"
        >
          <HelpCircle className="h-3 w-3" />
        </Button>
        <div className="absolute bottom-full left-1/2 mb-2 hidden w-64 -translate-x-1/2 transform group-hover:block z-50">
          <div className="ai-tooltip">
            <div className="text-xs font-medium text-text-primary mb-1">{title}</div>
            <div className="text-xs text-text-secondary">{description}</div>
            {details && (
              <div className="text-xs text-text-muted mt-2 pt-2 border-t border-border/20">
                {details}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <Card className={cn("bg-accent-blue/5 border-accent-blue/20", className)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-4 w-4 text-accent-blue mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <div className="text-sm font-medium text-text-primary">{title}</div>
              <div className="text-sm text-text-secondary">{description}</div>
              {details && (
                <div className="text-xs text-text-muted">{details}</div>
              )}
              {learnMoreUrl && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-accent-blue hover:text-accent-blue-hover p-0 h-auto text-xs"
                >
                  Learn more <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Info variant
  return (
    <div className={cn("bg-surface-2/30 border border-border/20 rounded-lg p-3", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-accent-blue" />
          <span className="text-sm font-medium text-text-primary">{title}</span>
        </div>
        <ChevronRight 
          className={cn(
            "h-4 w-4 text-text-muted transition-transform",
            isExpanded && "rotate-90"
          )} 
        />
      </button>
      
      {isExpanded && (
        <div className="mt-3 pl-6 space-y-2">
          <div className="text-sm text-text-secondary">{description}</div>
          {details && (
            <div className="text-xs text-text-muted">{details}</div>
          )}
          {learnMoreUrl && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-accent-blue hover:text-accent-blue-hover p-0 h-auto text-xs"
            >
              Learn more <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

interface StatusIndicatorProps {
  status: "active" | "processing" | "warning" | "error" | "success";
  label: string;
  description?: string;
  className?: string;
}

export function StatusIndicator({ status, label, description, className }: StatusIndicatorProps) {
  const statusConfig = {
    active: {
      color: "text-success",
      bg: "bg-success/15",
      border: "border-success/30",
      dot: "bg-success"
    },
    processing: {
      color: "text-accent-blue",
      bg: "bg-accent-blue/15", 
      border: "border-accent-blue/30",
      dot: "bg-accent-blue animate-ai-pulse"
    },
    warning: {
      color: "text-warning",
      bg: "bg-warning/15",
      border: "border-warning/30", 
      dot: "bg-warning"
    },
    error: {
      color: "text-danger",
      bg: "bg-danger/15",
      border: "border-danger/30",
      dot: "bg-danger"
    },
    success: {
      color: "text-success",
      bg: "bg-success/15",
      border: "border-success/30",
      dot: "bg-success"
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
      config.bg,
      config.border,
      config.color,
      "border",
      className
    )}>
      <div className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      <span>{label}</span>
      {description && (
        <ContextualHelp 
          title={label}
          description={description}
          variant="tooltip"
        />
      )}
    </div>
  );
}