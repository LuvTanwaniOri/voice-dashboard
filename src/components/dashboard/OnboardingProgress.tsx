import { Progress } from "@/components/ui/progress";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { CheckCircle2, ChevronRight, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function OnboardingProgress() {
  const { progress, openDrawer, isOnboardingComplete } = useOnboarding();

  if (isOnboardingComplete) return null;

  return (
    <button
      onClick={openDrawer}
      className={cn(
        "w-full p-4 mb-2 rounded-2xl border transition-all duration-300 group relative overflow-hidden",
        "bg-gradient-to-br from-surface-2/80 to-surface-3/60 backdrop-blur-sm",
        "border-border/30 hover:border-accent-blue/40",
        "shadow-md hover:shadow-glow/20 hover:scale-[1.01]"
      )}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-ai-glow opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow/30 relative">
            {progress === 100 ? (
              <CheckCircle2 className="w-5 h-5 text-white" />
            ) : (
              <div className="relative">
                <Zap className="w-5 h-5 text-white" />
                <Sparkles className="w-3 h-3 text-white/80 absolute -top-1 -right-1 animate-ai-pulse" />
              </div>
            )}
          </div>
          <div className="text-left">
            <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              AI Setup Wizard
              <span className="text-xs px-2 py-0.5 bg-accent-neural/20 text-accent-neural rounded-full font-medium">
                {progress}%
              </span>
            </h4>
            <p className="text-xs text-text-muted">
              {progress === 100 
                ? "Setup complete! Your AI is ready" 
                : "Complete setup to unlock full AI capabilities"
              }
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent-blue transition-colors duration-300 group-hover:translate-x-0.5" />
      </div>
      
      <div className="relative z-10">
        <Progress 
          value={progress} 
          className="h-2 bg-surface-3/60 rounded-full shadow-inner"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/30 via-accent-neural/20 to-accent-quantum/10 rounded-full opacity-50"></div>
      </div>
      
      <div className="mt-3 text-xs text-text-muted text-left relative z-10">
        Next: {progress < 50 ? "Configure your first AI agent" : "Test your AI setup"}
      </div>
    </button>
  );
}