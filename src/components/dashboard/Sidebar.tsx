import { 
  Phone, 
  BarChart3, 
  Bot, 
  Database, 
  Settings, 
  Users, 
  Zap,
  Activity,
  Volume2,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  { id: 'workspace', name: 'Workspace Settings', icon: Users },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">VoiceBot</h1>
            <p className="text-xs text-muted-foreground">AI Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-muted-foreground">System Operational</span>
        </div>
      </div>
    </div>
  );
}