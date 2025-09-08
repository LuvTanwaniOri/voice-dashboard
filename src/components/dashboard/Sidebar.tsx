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
  Sparkles,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OnboardingProgress } from "./OnboardingProgress";
import { StatusIndicator, ContextualHelp } from "@/components/ui/contextual-help";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { 
    id: 'dashboard', 
    name: 'Neural Dashboard', 
    icon: BarChart3,
    description: "Real-time AI performance metrics and insights"
  },
  { 
    id: 'conversations', 
    name: 'Live Conversations', 
    icon: MessageSquare,
    description: "Monitor active AI conversations and interactions"
  },
  { 
    id: 'campaigns', 
    name: 'AI Campaigns', 
    icon: Target,
    description: "Manage and optimize your AI voice campaigns"
  },
  { 
    id: 'agents', 
    name: 'AI Agents', 
    icon: Bot,
    description: "Build and configure your intelligent voice agents"
  },
  { 
    id: 'analytics', 
    name: 'Smart Analytics', 
    icon: Activity,
    description: "Deep insights into AI performance and outcomes"
  },
  { 
    id: 'knowledge', 
    name: 'Neural Knowledge', 
    icon: Database,
    description: "AI knowledge base and training data management"
  },
  { 
    id: 'operations', 
    name: 'AI Operations', 
    icon: Zap,
    description: "Real-time operational monitoring and alerts"
  },
  { 
    id: 'voice', 
    name: 'Voice Intelligence', 
    icon: Volume2,
    description: "Advanced voice synthesis and recognition settings"
  },
  { 
    id: 'auditing', 
    name: 'AI Audit Trail', 
    icon: Activity,
    description: "Complete audit history of AI decisions and actions"
  },
  { 
    id: 'workspace', 
    name: 'AI Workspace', 
    icon: Users,
    description: "Team management and AI workspace settings"
  },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-72 bg-gradient-to-b from-surface via-surface to-surface-2 border-r border-border/30 h-screen flex flex-col shadow-ai-elegant backdrop-blur-sm overflow-y-auto">
      {/* AI Brand Header */}
      <div className="p-6 border-b border-border/30 relative">
        <div className="absolute inset-0 bg-gradient-neural-mesh opacity-20"></div>
        <div className="flex items-center space-x-4 relative z-10">
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-neural relative">
            <div className="absolute inset-0 bg-gradient-ai-glow rounded-2xl opacity-30"></div>
            <Brain className="w-7 h-7 text-white relative z-10" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
              VoiceBot AI
              <Sparkles className="w-4 h-4 text-accent-neural animate-ai-pulse" />
            </h1>
            <p className="text-xs text-text-accent font-medium">Neural Intelligence Platform</p>
          </div>
        </div>
      </div>

      {/* AI Status Banner */}
      <div className="px-4 py-3">
        <div className="bg-gradient-to-r from-success/10 via-success/5 to-transparent p-3 rounded-xl border border-success/20">
          <StatusIndicator 
            status="active"
            label="AI Systems Online"
            description="All neural networks are operational and processing optimally"
          />
          <div className="mt-2 text-xs text-text-muted">
            <span className="text-success font-medium">99.7%</span> uptime • 
            <span className="text-accent-blue font-medium"> 2.1ms</span> avg response
          </div>
        </div>
      </div>

      {/* Smart Onboarding */}
      <div className="px-4 pb-4">
        <OnboardingProgress />
      </div>

      {/* Neural Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <div className="mb-4">
          <div className="flex items-center gap-2 px-2 mb-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">AI Control Center</span>
            <ContextualHelp 
              title="AI Control Center"
              description="Your central hub for managing all AI operations. Each section provides deep insights and control over different aspects of your voice AI system."
              variant="tooltip"
            />
          </div>
        </div>
        
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-left font-medium transition-all duration-300 group relative overflow-hidden",
                  isActive
                    ? "bg-gradient-primary text-white shadow-glow scale-[1.02] border border-accent-blue/30"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-2/60 hover:scale-[1.01] border border-transparent hover:border-border/30"
                )}
              >
                {/* Animated background for active state */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-neural-mesh opacity-30 animate-neural-shimmer"></div>
                )}
                
                <Icon className={cn(
                  "w-5 h-5 transition-colors duration-300 relative z-10",
                  isActive 
                    ? "text-white" 
                    : "text-text-muted group-hover:text-accent-blue"
                )} />
                
                <div className="flex-1 relative z-10">
                  <span className="font-medium tracking-wide">{item.name}</span>
                  {!isActive && (
                    <div className="text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5">
                      {item.description}
                    </div>
                  )}
                </div>
                
                {isActive && (
                  <div className="w-2 h-2 bg-white/40 rounded-full animate-ai-pulse relative z-10" />
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* AI Health Status Footer */}
      <div className="p-4 border-t border-border/30 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent"></div>
        <div className="space-y-3 relative z-10">
          <ContextualHelp 
            title="Why This Matters"
            description="Real-time system health ensures your AI agents deliver consistent, reliable performance. We monitor neural network response times, accuracy rates, and system availability."
            details="Green indicates optimal performance. Yellow suggests monitoring needed. Red requires immediate attention."
            variant="inline"
          />
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-surface-2/50 rounded-lg border border-border/20">
              <div className="text-text-muted">Neural Load</div>
              <div className="text-success font-medium">23%</div>
            </div>
            <div className="p-2 bg-surface-2/50 rounded-lg border border-border/20">
              <div className="text-text-muted">Active Agents</div>
              <div className="text-accent-blue font-medium">12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}