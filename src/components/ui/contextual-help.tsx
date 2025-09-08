import { useState } from "react";
import { Info, X, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface ContextualHelpProps {
  title?: string;
  content: string;
  learnMoreUrl?: string;
  className?: string;
  variant?: "inline" | "tooltip" | "drawer";
  size?: "sm" | "md" | "lg";
}

export function ContextualHelp({ 
  title, 
  content, 
  learnMoreUrl,
  className,
  variant = "tooltip",
  size = "sm"
}: ContextualHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  const iconSize = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  }[size];

  if (variant === "tooltip") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className={cn(
              "inline-flex items-center justify-center rounded-full transition-all duration-200",
              "text-text-muted hover:text-accent-blue hover:bg-accent-blue/10",
              "focus:outline-none focus:ring-2 focus:ring-accent-blue/30",
              size === "sm" ? "p-1" : size === "md" ? "p-1.5" : "p-2",
              className
            )}>
              <Info className={iconSize} />
            </button>
          </TooltipTrigger>
          <TooltipContent 
            className="max-w-xs p-4 bg-gradient-glass backdrop-blur-xl border-border/50 shadow-lg"
            sideOffset={8}
          >
            {title && (
              <div className="font-semibold text-text-primary mb-2 text-sm">
                {title}
              </div>
            )}
            <p className="text-sm text-text-secondary leading-relaxed">
              {content}
            </p>
            {learnMoreUrl && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-3 p-0 h-auto text-accent-blue hover:text-accent-blue-hover text-xs"
                asChild
              >
                <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer">
                  Learn more →
                </a>
              </Button>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn(
        "inline-flex items-start gap-3 p-4 rounded-xl border transition-all duration-300",
        "bg-accent-blue/5 border-accent-blue/20 hover:bg-accent-blue/10",
        className
      )}>
        <Info className={cn("text-accent-blue mt-0.5 flex-shrink-0", iconSize)} />
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold text-text-primary mb-1 text-sm">
              {title}
            </div>
          )}
          <p className="text-sm text-text-secondary leading-relaxed">
            {content}
          </p>
          {learnMoreUrl && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2 p-0 h-auto text-accent-blue hover:text-accent-blue-hover text-xs"
              asChild
            >
              <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer">
                Learn more →
              </a>
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Drawer variant (expandable help panel)
  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-200",
          "text-text-muted hover:text-accent-blue hover:bg-accent-blue/10",
          "focus:outline-none focus:ring-2 focus:ring-accent-blue/30",
          size === "sm" ? "p-1" : size === "md" ? "p-1.5" : "p-2"
        )}
      >
        <HelpCircle className={iconSize} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-2 p-4 bg-gradient-glass backdrop-blur-xl border border-border/50 rounded-xl shadow-lg max-w-sm animate-scale-in">
          <div className="flex items-start justify-between mb-3">
            {title && (
              <div className="font-semibold text-text-primary text-sm pr-2">
                {title}
              </div>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            {content}
          </p>
          {learnMoreUrl && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto text-accent-blue hover:text-accent-blue-hover text-xs"
              asChild
            >
              <a href={learnMoreUrl} target="_blank" rel="noopener noreferrer">
                Learn more →
              </a>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Metric explanation component
interface MetricExplainerProps {
  metric: string;
  definition: string;
  target?: string;
  why?: string;
  className?: string;
}

export function MetricExplainer({ 
  metric, 
  definition, 
  target, 
  why,
  className 
}: MetricExplainerProps) {
  return (
    <ContextualHelp
      title={metric}
      content={`${definition}${target ? ` Target: ${target}.` : ''}${why ? ` ${why}` : ''}`}
      className={className}
      variant="tooltip"
      size="sm"
    />
  );
}

// Status indicator with help
interface StatusHelpProps {
  status: "excellent" | "good" | "fair" | "poor";
  context: string;
  suggestion?: string;
  className?: string;
}

export function StatusHelp({ status, context, suggestion, className }: StatusHelpProps) {
  const statusConfig = {
    excellent: { color: "text-success", bg: "bg-success/10", border: "border-success/20" },
    good: { color: "text-accent-blue", bg: "bg-accent-blue/10", border: "border-accent-blue/20" },
    fair: { color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
    poor: { color: "text-danger", bg: "bg-danger/10", border: "border-danger/20" }
  };

  const config = statusConfig[status];

  return (
    <ContextualHelp
      title={`${status.charAt(0).toUpperCase()}${status.slice(1)} Status`}
      content={`${context}${suggestion ? ` ${suggestion}` : ''}`}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        config.bg, 
        config.border,
        "border",
        className
      )}
      variant="tooltip"
      size="sm"
    />
  );
}