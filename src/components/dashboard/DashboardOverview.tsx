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
  DollarSign,
  Zap
} from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-text-primary tracking-tight">Dashboard</h1>
        <p className="text-text-secondary text-lg">Monitor your voice bot performance and campaigns</p>
      </div>

      {/* Hero Metrics - Top 3 KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard
          title="QO/100 CM"
          value="12.1"
          change={8.7}
          trend="up"
          icon={<Target className="w-6 h-6" />}
          variant="glass"
          className="bg-gradient-glass backdrop-blur-xl border-border/30 shadow-lg hover:shadow-glow transition-all duration-300"
        />
        <MetricCard
          title="P95 Turn Latency"
          value="1.34s"
          change={-12.3}
          trend="up"
          icon={<Clock className="w-6 h-6" />}
          variant="glass"
          className="bg-gradient-glass backdrop-blur-xl border-border/30 shadow-lg hover:shadow-glow transition-all duration-300"
        />
        <MetricCard
          title="Connected Minutes"
          value="2,847"
          change={12.5}
          trend="up"
          icon={<Phone className="w-6 h-6" />}
          variant="glass"
          className="bg-gradient-glass backdrop-blur-xl border-border/30 shadow-lg hover:shadow-glow transition-all duration-300"
        />
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Campaigns */}
        <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-text-primary flex items-center gap-3">
              <div className="p-2 bg-accent-blue/10 rounded-lg">
                <Activity className="w-5 h-5 text-accent-blue" />
              </div>
              <span>Live Campaigns</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-success/5 border border-success/20 rounded-xl hover:bg-success/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <div className="font-semibold text-text-primary">Lead Qualification</div>
                    <div className="text-sm text-text-muted">147/200 contacts processed</div>
                  </div>
                </div>
                <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
              </div>
            </div>
            
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-xl hover:bg-warning/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <div>
                    <div className="font-semibold text-text-primary">Collections</div>
                    <div className="text-sm text-text-muted">Capacity preparing</div>
                  </div>
                </div>
                <Badge className="bg-warning/20 text-warning border-warning/30">Preparing</Badge>
              </div>
            </div>

            <div className="p-4 bg-accent-blue/5 border border-accent-blue/20 rounded-xl hover:bg-accent-blue/10 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-accent-blue" />
                  <div>
                    <div className="font-semibold text-text-primary">CSAT Survey</div>
                    <div className="text-sm text-text-muted">Starts 2:00 PM EST</div>
                  </div>
                </div>
                <Badge className="bg-accent-blue/20 text-accent-blue border-accent-blue/30">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality & Performance */}
        <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-text-primary flex items-center gap-3">
              <div className="p-2 bg-accent-blue/10 rounded-lg">
                <BarChart3 className="w-5 h-5 text-accent-blue" />
              </div>
              <span>Quality Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">ASR WER (US)</span>
                  <span className="font-semibold text-success">8.7%</span>
                </div>
                <Progress value={91.3} className="h-2 bg-surface-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Barge-in Recovery</span>
                  <span className="font-semibold text-success">96.8%</span>
                </div>
                <Progress value={96.8} className="h-2 bg-surface-2" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 bg-surface-2/50 rounded-lg">
                <div className="text-lg font-semibold text-text-primary">84.1%</div>
                <div className="text-xs text-text-muted">Handoff Precision</div>
              </div>
              <div className="text-center p-3 bg-surface-2/50 rounded-lg">
                <div className="text-lg font-semibold text-text-primary">96.8%</div>
                <div className="text-xs text-text-muted">Barge-in Recovery</div>
              </div>
              <div className="text-center p-3 bg-surface-2/50 rounded-lg">
                <div className="text-lg font-semibold text-text-primary">8.7%</div>
                <div className="text-xs text-text-muted">ASR WER</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-gradient-card border border-border/50 rounded-xl shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <DollarSign className="w-4 h-4 text-success" />
            </div>
            <span className="font-medium text-text-secondary">Credits Remaining</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">$2,847.50</div>
        </div>

        <div className="p-6 bg-gradient-card border border-border/50 rounded-xl shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-accent-blue/10 rounded-lg">
              <Target className="w-4 h-4 text-accent-blue" />
            </div>
            <span className="font-medium text-text-secondary">Avg $/QO</span>
          </div>
          <div className="text-2xl font-bold text-success">$3.42</div>
        </div>

        <div className="p-6 bg-gradient-card border border-border/50 rounded-xl shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <MessageSquare className="w-4 h-4 text-warning" />
            </div>
            <span className="font-medium text-text-secondary">LLM Tokens</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">247K</div>
          <div className="text-xs text-text-muted">Last 24h</div>
        </div>

        <div className="p-6 bg-gradient-card border border-border/50 rounded-xl shadow-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-info/10 rounded-lg">
              <Headphones className="w-4 h-4 text-info" />
            </div>
            <span className="font-medium text-text-secondary">Voice Minutes</span>
          </div>
          <div className="text-2xl font-bold text-text-primary">132</div>
          <div className="text-xs text-text-muted">TTS + STT combined</div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold text-text-primary flex items-center gap-3">
            <div className="p-2 bg-accent-blue/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-accent-blue" />
            </div>
            <span>Lead Qualification Funnel</span>
            <span className="text-sm font-normal text-text-muted">(Last 7 Days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { value: '2,847', label: 'Attempts', rate: '100%', color: 'text-text-primary' },
              { value: '1,823', label: 'Connects', rate: '64.0%', color: 'text-success' },
              { value: '1,542', label: 'Talk Start', rate: '84.6%', color: 'text-success' },
              { value: '847', label: 'Info Captured', rate: '54.9%', color: 'text-warning' },
              { value: '342', label: 'Qualified', rate: '40.4%', color: 'text-accent-blue' },
              { value: '187', label: 'Meetings', rate: '54.7%', color: 'text-success' }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 bg-surface-2/30 rounded-xl border border-border/30 hover:bg-surface-2/50 transition-colors">
                <div className="text-2xl font-bold text-text-primary mb-1">{item.value}</div>
                <div className="text-sm text-text-secondary mb-2">{item.label}</div>
                <div className={`text-xs font-medium ${item.color}`}>{item.rate}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity - Simplified */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-text-primary flex items-center gap-3">
            <div className="p-2 bg-accent-blue/10 rounded-lg">
              <Zap className="w-5 h-5 text-accent-blue" />
            </div>
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: '2 min ago', action: 'Campaign "Lead Gen Q3" completed batch of 150 calls', status: 'success' },
              { time: '12 min ago', action: 'AI Agent "Sarah" updated with new knowledge base', status: 'info' },
              { time: '1 hour ago', action: 'Collections campaign paused - low success rate detected', status: 'warning' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 hover:bg-surface-2/30 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-3 ${
                  item.status === 'success' ? 'bg-success' : 
                  item.status === 'warning' ? 'bg-warning' : 'bg-accent-blue'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary leading-relaxed">{item.action}</p>
                  <p className="text-xs text-text-muted mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}