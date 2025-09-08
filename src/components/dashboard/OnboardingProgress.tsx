import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function OnboardingProgress() {
  const { progress, openDrawer, isOnboardingComplete } = useOnboarding();

  if (isOnboardingComplete) return null;

  return (
    <button
      onClick={openDrawer}
      className={cn(
        "w-full p-4 rounded-xl border border-border transition-all duration-base group",
        "bg-gradient-elevated hover:bg-gradient-card",
        "hover:border-accent-primary/30 hover:shadow-glow interactive-glow"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
            {progress === 100 ? (
              <CheckCircle2 className="w-4 h-4 text-white" />
            ) : (
              <Sparkles className="w-4 h-4 text-white animate-neural-pulse" />
            )}
          </div>
          <div className="narrative-section text-left">
            <h4 className="text-sm font-semibold text-text-primary">Platform Setup</h4>
            <p className="narrative-context">{progress}% complete</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent-primary transition-colors duration-base" />
      </div>
      
      <Progress 
        value={progress} 
        className="h-2 bg-surface-3"
      />
      
      <p className="narrative-context mt-2 text-left">
        Finish setup to unlock full AI capabilities
      </p>
    </button>
  );
}