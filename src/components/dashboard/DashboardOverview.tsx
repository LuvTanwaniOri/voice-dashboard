import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Zap,
  Activity,
  Headphones,
  BarChart3,
  PhoneCall,
  MessageSquare,
  Calendar,
  AlertCircle
} from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your voice bot performance and campaigns</p>
      </div>

      {/* Key Metrics - PRD KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <MetricCard
          title="QO/100 CM"
          value="12.1"
          change={8.7}
          trend="up"
          icon={<Target className="w-4 h-4" />}
          className="lg:col-span-1"
        />
        <MetricCard
          title="P95 Turn Latency"
          value="1.34s"
          change={-12.3}
          trend="up"
          icon={<Clock className="w-4 h-4" />}
          className="lg:col-span-1"
        />
        <MetricCard
          title="Connected Minutes"
          value="2,847"
          change={12.5}
          trend="up"
          icon={<Phone className="w-4 h-4" />}
          className="lg:col-span-1"
        />
        <MetricCard
          title="ASR WER (US)"
          value="8.7%"
          change={-5.2}
          trend="up"
          icon={<Headphones className="w-4 h-4" />}
          className="lg:col-span-1"
        />
        <MetricCard
          title="Barge-in Recovery"
          value="96.8%"
          change={2.1}
          trend="up"
          icon={<MessageSquare className="w-4 h-4" />}
          className="lg:col-span-1"
        />
        <MetricCard
          title="Handoff Precision"
          value="84.1%"
          change={6.3}
          trend="up"
          icon={<Users className="w-4 h-4" />}
          className="lg:col-span-1"
        />
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Live Campaign Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <div>
                    <span className="text-sm font-medium text-foreground block">Lead Qualification</span>
                    <span className="text-xs text-muted-foreground">147/200 contacts</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <div>
                    <span className="text-sm font-medium text-foreground block">Collections</span>
                    <span className="text-xs text-muted-foreground">Capacity preparing</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-warning/20 text-warning">Preparing</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <span className="text-sm font-medium text-foreground block">CSAT Survey</span>
                    <span className="text-xs text-muted-foreground">Starts 2:00 PM EST</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/20 text-primary">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Quality Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ASR WER (US EN)</span>
                  <span className="text-sm font-medium text-success">8.7%</span>
                </div>
                <Progress value={91.3} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ASR WER (Hindi)</span>
                  <span className="text-sm font-medium text-success">11.2%</span>
                </div>
                <Progress value={88.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Barge-in Recovery</span>
                  <span className="text-sm font-medium text-success">96.8%</span>
                </div>
                <Progress value={96.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Handoff Precision</span>
                  <span className="text-sm font-medium text-success">84.1%</span>
                </div>
                <Progress value={84.1} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <PhoneCall className="w-5 h-5 text-primary" />
              <span>Cost & Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Credits Remaining</span>
                <span className="text-sm font-medium text-foreground">$2,847.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg $/QO</span>
                <span className="text-sm font-medium text-success">$3.42</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">LLM Tokens (24h)</span>
                <span className="text-sm font-medium text-foreground">247K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">TTS Minutes (24h)</span>
                <span className="text-sm font-medium text-foreground">42.3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">STT Minutes (24h)</span>
                <span className="text-sm font-medium text-foreground">89.7</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversation Funnel */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Lead Qualification Funnel (Last 7 Days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4">
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">2,847</div>
                <div className="text-sm text-muted-foreground">Attempts</div>
                <div className="text-xs text-success">100%</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">1,823</div>
                <div className="text-sm text-muted-foreground">Connects</div>
                <div className="text-xs text-success">64.0%</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">1,542</div>
                <div className="text-sm text-muted-foreground">Talk Start</div>
                <div className="text-xs text-success">84.6%</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">847</div>
                <div className="text-sm text-muted-foreground">Info Captured</div>
                <div className="text-xs text-success">54.9%</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">342</div>
                <div className="text-sm text-muted-foreground">Qualified</div>
                <div className="text-xs text-success">40.4%</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">187</div>
                <div className="text-sm text-muted-foreground">Meetings</div>
                <div className="text-xs text-success">54.7%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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