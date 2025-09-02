import { cn } from "@/lib/utils";
import { Mic, Brain, Volume2, Pause, MicOff } from "lucide-react";

interface VoiceStateChipProps {
  state: 'listening' | 'thinking' | 'speaking' | 'idle' | 'muted';
  latencyMs?: number;
  className?: string;
}

export function VoiceStateChip({ state, latencyMs, className }: VoiceStateChipProps) {
  const getStateConfig = () => {
    switch (state) {
      case 'listening':
        return {
          icon: Mic,
          label: 'Listening',
          bgClass: 'bg-accent-blue/20 border-accent-blue/40',
          textClass: 'text-accent-blue',
          iconClass: 'text-accent-blue',
          animation: 'animate-listening-pulse'
        };
      case 'thinking':
        return {
          icon: Brain,
          label: 'Thinking',
          bgClass: 'bg-warning/20 border-warning/40 thinking-shimmer',
          textClass: 'text-warning',
          iconClass: 'text-warning',
          animation: ''
        };
      case 'speaking':
        return {
          icon: Volume2,
          label: 'Speaking',
          bgClass: 'bg-success/20 border-success/40',
          textClass: 'text-success',
          iconClass: 'text-success speaking-waveform',
          animation: 'animate-waveform'
        };
      case 'muted':
        return {
          icon: MicOff,
          label: 'Muted',
          bgClass: 'bg-danger/20 border-danger/40',
          textClass: 'text-danger',
          iconClass: 'text-danger',
          animation: ''
        };
      default:
        return {
          icon: Pause,
          label: 'Idle',
          bgClass: 'bg-text-muted/20 border-text-muted/40',
          textClass: 'text-text-muted',
          iconClass: 'text-text-muted',
          animation: ''
        };
    }
  };

  const { icon: Icon, label, bgClass, textClass, iconClass, animation } = getStateConfig();

  return (
    <div className={cn(
      "inline-flex items-center space-x-2 px-3 py-2 rounded-lg border backdrop-blur-sm transition-all duration-base voice-state-chip",
      bgClass,
      animation,
      className
    )}>
      <Icon className={cn("w-4 h-4", iconClass)} />
      <span className={cn("text-sm font-medium", textClass)}>
        {label}
      </span>
      {latencyMs && (
        <span className={cn(
          "text-xs px-2 py-1 rounded-md font-mono bg-black/20",
          latencyMs > 1500 ? 'text-danger' : latencyMs > 1000 ? 'text-warning' : 'text-success'
        )}>
          {latencyMs}ms
        </span>
      )}
    </div>
  );
}