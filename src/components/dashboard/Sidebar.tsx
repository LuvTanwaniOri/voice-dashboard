import { 
  Phone, 
  BarChart3, 
  Bot, 
  Database, 
  Users, 
  Zap,
  Activity,
  Volume2,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OnboardingProgress } from "./OnboardingProgress";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
  { id: 'campaigns', name: 'Campaigns', icon: Target },
  { id: 'agents', name: 'AI Agents', icon: Bot },
  { id: 'analytics', name: 'Analytics', icon: Activity },
  { id: 'knowledge', name: 'Knowledge Base', icon: Database },
  { id: 'operations', name: 'Operations', icon: Zap },
  { id: 'voice', name: 'Voice & Lexicon', icon: Volume2 },
  { id: 'workspace', name: 'Settings', icon: Users },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-surface border-r border-border/50 h-full flex flex-col shadow-md">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow/30">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">VoiceBot</h1>
            <p className="text-xs text-text-muted font-medium">AI Platform</p>
          </div>
        </div>
      </div>

      {/* Onboarding Progress */}
      <div className="p-4">
        <OnboardingProgress />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-base group",
                isActive
                  ? "bg-accent-blue text-white shadow-glow/40 scale-[1.02]"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2 hover:scale-[1.01]"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-colors duration-base",
                isActive ? "text-white" : "text-text-muted group-hover:text-accent-blue"
              )} />
              <span className="font-medium tracking-wide">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white/30 rounded-full animate-listening-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm font-medium text-success">System Operational</span>
        </div>
      </div>
    </div>
  );
}