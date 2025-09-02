import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, HelpCircle, X } from "lucide-react";
import { useState } from "react";

interface GuideBarProps {
  title?: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  learnMoreUrl?: string;
  className?: string;
  onDismiss?: () => void;
  dismissible?: boolean;
}

export function GuideBar({
  title,
  description,
  primaryAction,
  learnMoreUrl,
  className,
  onDismiss,
  dismissible = true
}: GuideBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className={cn(
      "guide-bar sticky top-0 z-50 border-b border-border/50",
      className
    )}>
      <div className="guide-content max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex-1 min-w-0">
          {title && (
            <h2 className="text-card-title font-semibold text-text-primary mb-1 truncate">
              {title}
            </h2>
          )}
          <p className="text-body text-text-secondary leading-normal">
            {description}
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          {learnMoreUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="text-text-muted hover:text-accent-primary"
              onClick={() => window.open(learnMoreUrl, '_blank')}
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Learn more
            </Button>
          )}
          
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="touch-target bg-accent-primary hover:bg-accent-primary-hover text-white font-medium"
            >
              {primaryAction.label}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-text-muted hover:text-text-secondary touch-target"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}