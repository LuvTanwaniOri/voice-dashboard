import { Search, Bell, User, Activity, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CallBarProps {
  activeCalls?: number;
  systemHealth?: 'operational' | 'degraded' | 'down';
  className?: string;
}

export function CallBar({ activeCalls = 0, systemHealth = 'operational', className }: CallBarProps) {
  const getHealthConfig = () => {
    switch (systemHealth) {
      case 'operational':
        return { color: 'text-success', bgColor: 'bg-success/10', label: 'Operational' };
      case 'degraded':
        return { color: 'text-warning', bgColor: 'bg-warning/10', label: 'Degraded' };
      case 'down':
        return { color: 'text-danger', bgColor: 'bg-danger/10', label: 'Down' };
    }
  };

  const healthConfig = getHealthConfig();

  return (
    <div className={cn(
      "h-16 bg-surface border-b border-border/50 px-6 flex items-center justify-between shadow-sm",
      className
    )}>
      {/* Left section */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary tracking-tight">Operations Center</h2>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
          <Input 
            placeholder="Search calls, campaigns..."
            className="w-80 pl-10 bg-surface-2 border-border/50 focus:border-accent-blue"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Active Calls */}
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-accent-blue" />
          <span className="text-sm font-medium text-text-secondary">Active Calls:</span>
          <Badge variant="secondary" className="bg-accent-blue/10 text-accent-blue border-accent-blue/20">
            {activeCalls}
          </Badge>
        </div>

        {/* System Health */}
        <div className={cn(
          "flex items-center space-x-2 px-3 py-1.5 rounded-lg border",
          healthConfig.bgColor,
          `border-${systemHealth === 'operational' ? 'success' : systemHealth === 'degraded' ? 'warning' : 'danger'}/20`
        )}>
          <div className={cn("w-2 h-2 rounded-full animate-pulse", 
            systemHealth === 'operational' ? 'bg-success' : 
            systemHealth === 'degraded' ? 'bg-warning' : 'bg-danger'
          )} />
          <span className={cn("text-sm font-medium", healthConfig.color)}>
            {healthConfig.label}
          </span>
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-blue rounded-full" />
        </Button>

        {/* User Menu */}
        <Button variant="ghost" size="icon">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}