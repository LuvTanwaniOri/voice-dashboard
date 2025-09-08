import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function OnboardingProgress() {
  const { progress, openDrawer, isOnboardingComplete } = useOnboarding();

  if (isOnboardingComplete) return null;

  return (
    <button
      onClick={openDrawer}
      className={cn(
        "w-full p-4 mb-2 rounded-xl border border-border/50 transition-all duration-base group",
        "bg-gradient-to-r from-surface to-surface-2 hover:from-surface-2 hover:to-surface",
        "hover:border-accent-blue/30 hover:shadow-glow/20"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            {progress === 100 ? (
              <CheckCircle2 className="w-4 h-4 text-white" />
            ) : (
              <span className="text-xs font-bold text-white">{progress}%</span>
            )}
          </div>
          <div className="text-left">
            <h4 className="text-sm font-semibold text-text-primary">Setup</h4>
            <p className="text-xs text-text-muted">{progress}% complete</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent-blue transition-colors duration-base" />
      </div>
      
      <Progress 
        value={progress} 
        className="h-2 bg-surface-2"
      />
      
      <p className="text-xs text-text-muted mt-2 text-left">
        Complete setup to unlock full features
      </p>
    </button>
  );
}