import { useState } from "react";
import { WorkflowGuide } from "./WorkflowGuide";
import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Phone, 
  Clock, 
  Target, 
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Activity,
  Headphones,
  BarChart3,
  PhoneCall,
  MessageSquare,
  Calendar,
  AlertCircle,
  Bot,
  FileText
} from "lucide-react";

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  // Check if user needs onboarding (in a real app, this would come from user state)
  const [hasAgents] = useState(false);
  const [hasCampaigns] = useState(false);
  
  const needsOnboarding = !hasAgents && !hasCampaigns;

  // Show onboarding workflow if user needs setup
  if (needsOnboarding) {
    return <WorkflowGuide onNavigate={onNavigate} />;
  }

  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your voice bot performance and campaigns</p>
        </div>
        <div className="flex space-x-3">
          <Card className="bg-gradient-card border-border/50 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">2 Agents</div>
                <div className="text-xs text-muted-foreground">Active</div>
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-card border-border/50 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">4 Knowledge Packs</div>
                <div className="text-xs text-muted-foreground">Ready</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Key Metrics - Simplified */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Connected Minutes"
          value="2,847"
          change={12.5}
          trend="up"
          icon={<Phone className="w-4 h-4" />}
          className="lg:col-span-1"
        />
        <MetricCard
          title="Qualified Leads"
          value="342"
          change={8.7}
          trend="up"
          icon={<Target className="w-4 h-4" />}
          className="lg:col-span-1"
        />
        <MetricCard
          title="Success Rate"
          value="19.5%"
          change={6.3}
          trend="up"
          icon={<TrendingUp className="w-4 h-4" />}
          className="lg:col-span-1"
        />
        <MetricCard
          title="Cost Per Lead"
          value="$3.42"
          change={-5.2}
          trend="up"
          icon={<BarChart3 className="w-4 h-4" />}
          className="lg:col-span-1"
        />
      </div>

      {/* Live Campaign Activity - Simplified */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Active Campaign</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <span className="font-medium text-foreground block">Lead Qualification Campaign</span>
                    <span className="text-sm text-muted-foreground">147 of 200 contacts completed</span>
                  </div>
                </div>
                <Badge className="bg-success/20 text-success">Live</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">5</div>
                  <div className="text-sm text-muted-foreground">Active Calls</div>
                </div>
                <div className="text-center p-3 bg-accent/20 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">47</div>
                  <div className="text-sm text-muted-foreground">Calls/Hour</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Performance Today</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Connect Rate</span>
                  <span className="text-sm font-medium text-foreground">64.0%</span>
                </div>
                <Progress value={64} className="h-2" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Qualification Rate</span>
                  <span className="text-sm font-medium text-success">19.5%</span>
                </div>
                <Progress value={19.5} className="h-2" />
              </div>

              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-success">156</div>
                    <div className="text-xs text-muted-foreground">Qualified Today</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">$3.42</div>
                    <div className="text-xs text-muted-foreground">Avg Cost/Lead</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '2 min ago', action: 'Campaign "Lead Gen Q3" completed batch of 150 calls', status: 'success' },
              { time: '12 min ago', action: 'AI Agent "Sarah" updated with new knowledge base', status: 'info' },
              { time: '1 hour ago', action: 'Collections campaign paused - low success rate detected', status: 'warning' },
              { time: '3 hours ago', action: 'New workspace member invited: john@company.com', status: 'info' },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-accent/50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.status === 'success' ? 'bg-success' : 
                  item.status === 'warning' ? 'bg-warning' : 'bg-primary'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}