import { 
  Phone, 
  BarChart3, 
  Bot, 
  Database, 
  Users, 
  Zap,
  Activity,
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
  { id: 'telephony', name: 'Telephony', icon: Phone },
  { id: 'analytics', name: 'Analytics', icon: Activity },
  { id: 'knowledge', name: 'Knowledge Base', icon: Database },
  { id: 'operations', name: 'Live Monitoring', icon: Zap },
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
                  ? "bg-gradient-primary text-white shadow-glow scale-[1.02]"
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
                  <div className="w-1.5 h-1.5 bg-white/80 rounded-full" />
                  <div className="w-1 h-1 bg-white/60 rounded-full" />
                </div>
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-neural opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Credits Wallet */}
      <div className="p-4 border-t border-border-glass/50">
        <div 
          className="neural-status p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 border border-primary/30 backdrop-blur-sm relative overflow-hidden cursor-pointer hover:from-primary/15 hover:to-accent-blue/15 transition-all duration-300 group"
          onClick={() => {
            // TODO: Open billing page
            console.log('Opening billing page...');
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">$</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-text-primary">Credits Wallet</span>
                <div className="text-xs text-text-muted">Click to manage</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">$24.50</div>
              <div className="text-xs text-text-muted">Remaining</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>Usage</span>
              <span>75% used</span>
            </div>
            <div className="w-full bg-surface-glass/50 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-primary h-full rounded-full transition-all duration-500" style={{ width: '75%' }} />
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Last recharge:</span>
              <span className="text-accent-blue font-medium">Dec 15, $50.00</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-muted">Credits used:</span>
              <span className="text-warning font-medium">$25.50 this month</span>
            </div>
          </div>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-neural opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}