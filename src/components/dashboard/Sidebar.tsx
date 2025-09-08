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
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OnboardingProgress } from "./OnboardingProgress";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Overview', icon: BarChart3, description: 'System health & insights' },
  { id: 'conversations', name: 'Conversations', icon: MessageSquare, description: 'Live calls & history' },
  { id: 'campaigns', name: 'Campaigns', icon: Target, description: 'Outreach management' },
  { id: 'agents', name: 'AI Agents', icon: Bot, description: 'Voice AI configuration' },
  { id: 'analytics', name: 'Analytics', icon: Activity, description: 'Performance metrics' },
  { id: 'knowledge', name: 'Knowledge', icon: Database, description: 'Training materials' },
  { id: 'operations', name: 'Operations', icon: Zap, description: 'System monitoring' },
  { id: 'auditing', name: 'Auditing', icon: Activity, description: 'Quality assurance' },
  { id: 'workspace', name: 'Settings', icon: Users, description: 'Team & configuration' },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen flex flex-col bg-surface border-r border-border shadow-neural">
      {/* Brand Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="narrative-section">
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
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-base relative overflow-hidden",
                isActive
                  ? "bg-gradient-elevated text-text-primary shadow-glow border border-accent-primary/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "w-5 h-5 transition-colors duration-base",
                  isActive 
                    ? "text-accent-primary" 
                    : "text-text-muted group-hover:text-accent-primary"
                )} />
                <div className="narrative-section">
                  <span className="font-medium text-sm">{item.name}</span>
                  <p className="narrative-context">{item.description}</p>
                </div>
              </div>
              
              {isActive && (
                <>
                  <div className="w-2 h-2 bg-accent-primary rounded-full animate-neural-pulse" />
                  <div className="absolute inset-0 bg-gradient-neural pointer-events-none opacity-20" />
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-border">
        <div className="status-indicator operational p-3 rounded-lg bg-success/10 border border-success/20">
          <span className="text-sm font-medium text-success">System Operational</span>
        </div>
      </div>
    </div>
  );
}