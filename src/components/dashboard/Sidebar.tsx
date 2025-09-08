import { 
  Phone, 
  BarChart3, 
  Bot, 
  Database, 
  Users, 
  Zap,
  Activity,
  Volume2,
  Target,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OnboardingProgress } from "./OnboardingProgress";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
  { id: 'conversations', name: 'Conversations', icon: MessageSquare },
  { id: 'campaigns', name: 'Campaigns', icon: Target },
  { id: 'agents', name: 'AI Agents', icon: Bot },
  { id: 'analytics', name: 'Analytics', icon: Activity },
  { id: 'knowledge', name: 'Knowledge Base', icon: Database },
  { id: 'operations', name: 'Operations', icon: Zap },
  { id: 'voice', name: 'Voice & Lexicon', icon: Volume2 },
  { id: 'auditing', name: 'Auditing History', icon: Activity },
  { id: 'workspace', name: 'Settings', icon: Users },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 neural-glass h-screen flex flex-col shadow-neural border-r border-border-glass/60 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-border-glass/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow neural-pulse">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">VoiceBot AI</h1>
            <p className="text-xs text-accent-blue font-medium">Neural Platform</p>
          </div>
        </div>
      </div>

      {/* Onboarding Progress */}
      <div className="p-4">
        <OnboardingProgress />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left font-medium transition-all duration-300 group relative overflow-hidden",
                isActive
                  ? "bg-gradient-primary text-white shadow-glow scale-[1.02] neural-pulse"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-glass/50 hover:scale-[1.01] hover:shadow-glow-subtle"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-all duration-300 relative z-10",
                isActive ? "text-white" : "text-text-muted group-hover:text-accent-blue"
              )} />
              <span className="font-medium tracking-wide relative z-10">{item.name}</span>
              {isActive && (
                <div className="ml-auto flex items-center space-x-2 relative z-10">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-neural opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Status */}
      <div className="p-4 border-t border-border-glass/50">
        <div className="neural-status flex items-center space-x-3 p-4 rounded-xl bg-success/10 border border-success/30 backdrop-blur-sm relative overflow-hidden">
          <div className="w-2.5 h-2.5 bg-success rounded-full neural-pulse" />
          <div className="flex-1">
            <span className="text-sm font-semibold text-success">AI Systems Online</span>
            <div className="text-xs text-text-muted mt-0.5">Neural networks active • 99.9% uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}