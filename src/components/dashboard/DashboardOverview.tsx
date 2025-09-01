import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  Clock, 
  Target, 
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Zap,
  Activity
} from "lucide-react";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your voice bot performance and campaigns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Connected Minutes"
          value="2,847"
          change={12.5}
          trend="up"
          icon={<Phone className="w-4 h-4" />}
        />
        <MetricCard
          title="Avg Turn Latency"
          value="1.2s"
          change={-8.3}
          trend="up"
          icon={<Clock className="w-4 h-4" />}
        />
        <MetricCard
          title="Qualified Outcomes"
          value="342"
          change={15.2}
          trend="up"
          icon={<Target className="w-4 h-4" />}
        />
        <MetricCard
          title="Success Rate"
          value="87.3%"
          change={4.1}
          trend="up"
          icon={<TrendingUp className="w-4 h-4" />}
        />
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-foreground">Lead Qualification</span>
                </div>
                <span className="text-sm text-success font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-sm font-medium text-foreground">Collections Campaign</span>
                </div>
                <span className="text-sm text-warning font-medium">Pending</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Customer Survey</span>
                </div>
                <span className="text-sm text-primary font-medium">Scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>AI Agent Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">ASR Word Error Rate</span>
                <span className="text-sm font-medium text-success">8.2%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-success h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Barge-in Recovery</span>
                <span className="text-sm font-medium text-success">96.8%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-success h-2 rounded-full" style={{ width: '97%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Human Handoff Precision</span>
                <span className="text-sm font-medium text-success">84.1%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-success h-2 rounded-full" style={{ width: '84%' }}></div>
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