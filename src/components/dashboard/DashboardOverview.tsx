import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MetricCard } from "./MetricCard";
import { 
  Activity, 
  Phone, 
  Users, 
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Play,
  Settings,
  ArrowRight,
  Clock,
  BarChart3,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const callVolumeData = [
  { time: '00:00', calls: 12, success: 11 },
  { time: '04:00', calls: 8, success: 7 },
  { time: '08:00', calls: 45, success: 42 },
  { time: '12:00', calls: 67, success: 63 },
  { time: '16:00', calls: 89, success: 84 },
  { time: '20:00', calls: 34, success: 32 },
];

const responseTimeData = [
  { time: '00:00', responseTime: 1.4 },
  { time: '04:00', responseTime: 1.2 },
  { time: '08:00', responseTime: 1.8 },
  { time: '12:00', responseTime: 2.1 },
  { time: '16:00', responseTime: 1.6 },
  { time: '20:00', responseTime: 1.3 },
];

const agentPerformanceData = [
  { name: 'Sales Agent', calls: 156, success: 147 },
  { name: 'Support Agent', calls: 89, success: 85 },
  { name: 'Lead Gen', calls: 234, success: 198 },
  { name: 'Scheduler', calls: 67, success: 64 },
];

const outcomeDistribution = [
  { name: 'Successful', value: 68, color: 'hsl(var(--success))' },
  { name: 'Transferred', value: 18, color: 'hsl(var(--accent-primary))' },
  { name: 'Voicemail', value: 10, color: 'hsl(var(--warning))' },
  { name: 'No Answer', value: 4, color: 'hsl(var(--text-muted))' },
];

export function DashboardOverview() {
  const [isSystemHealthy, setIsSystemHealthy] = useState(true);
  const [activeCallsCount, setActiveCallsCount] = useState(23);
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCallsCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Simulated activity stream
  const liveActivity = [
    { id: 1, type: 'call_connected', message: 'Lead qualification agent connected to Sarah M.', time: '2m ago', status: 'active' },
    { id: 2, type: 'agent_response', message: 'Response latency improved to 1.2s average', time: '5m ago', status: 'good' },
    { id: 3, type: 'system_update', message: 'Knowledge base synchronized successfully', time: '8m ago', status: 'completed' },
    { id: 4, type: 'call_completed', message: 'Appointment scheduled with John D.', time: '12m ago', status: 'success' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Narrative Header */}
      <div className="narrative-section">
        <h1 className="narrative-title text-3xl">AI Voice Platform</h1>
        <p className="narrative-purpose">Your system is live and performing optimally</p>
        <p className="narrative-context">Monitor real-time activity, track performance, and optimize agent behavior</p>
      </div>

      {/* System Status Banner */}
      <div className="glass-panel p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="status-indicator operational">
              <span className="font-medium">All systems operational</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span>8 agents online</span>
              <span>•</span>
              <span>{activeCallsCount} active calls</span>
              <span>•</span>
              <span>94.2% success rate</span>
            </div>
          </div>
          <div className="narrative-action">
            <Button className="bg-gradient-primary text-white hover:shadow-glow">
              Run System Check
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Calls"
          value={activeCallsCount.toString()}
          change={12}
          trend="up"
          icon={<Phone className="w-5 h-5" />}
          description="Currently in progress"
        />
        <MetricCard
          title="Success Rate"
          value="94.2%"
          change={2.1}
          trend="up"
          icon={<CheckCircle2 className="w-5 h-5" />}
          description="Last 24 hours"
        />
        <MetricCard
          title="Avg Response"
          value="1.2s"
          change={-15.3}
          trend="up"
          icon={<Activity className="w-5 h-5" />}
          description="Latency improved"
        />
        <MetricCard
          title="Agents Online"
          value="8"
          trend="neutral"
          icon={<Users className="w-5 h-5" />}
          description="Ready to assist"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Volume Chart */}
        <Card className="card-neural p-6">
          <div className="narrative-section mb-6">
            <h3 className="narrative-title">Call Volume & Success Rate</h3>
            <p className="narrative-purpose">24-hour activity overview</p>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--text-muted))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--text-muted))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--surface))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--text-primary))'
                }}
              />
              <Area
                type="monotone"
                dataKey="calls"
                stackId="1"
                stroke="hsl(var(--accent-primary))"
                fill="hsl(var(--accent-primary) / 0.2)"
                name="Total Calls"
              />
              <Area
                type="monotone"
                dataKey="success"
                stackId="2"
                stroke="hsl(var(--success))"
                fill="hsl(var(--success) / 0.2)"
                name="Successful"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Response Time Chart */}
        <Card className="card-neural p-6">
          <div className="narrative-section mb-6">
            <h3 className="narrative-title">Response Time Trends</h3>
            <p className="narrative-purpose">Average response latency</p>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--text-muted))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--text-muted))"
                fontSize={12}
                label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--surface))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--text-primary))'
                }}
                formatter={(value) => [`${value}s`, 'Response Time']}
              />
              <Line
                type="monotone"
                dataKey="responseTime"
                stroke="hsl(var(--accent-primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--accent-primary))', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--accent-primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Agent Performance & Outcome Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance */}
        <Card className="card-neural p-6">
          <div className="narrative-section mb-6">
            <h3 className="narrative-title">Agent Performance</h3>
            <p className="narrative-purpose">Calls handled by each agent</p>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--text-muted))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--text-muted))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--surface))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--text-primary))'
                }}
              />
              <Bar
                dataKey="calls"
                fill="hsl(var(--accent-primary) / 0.3)"
                stroke="hsl(var(--accent-primary))"
                strokeWidth={1}
                name="Total Calls"
              />
              <Bar
                dataKey="success"
                fill="hsl(var(--success) / 0.6)"
                stroke="hsl(var(--success))"
                strokeWidth={1}
                name="Successful"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Call Outcomes */}
        <Card className="card-neural p-6">
          <div className="narrative-section mb-6">
            <h3 className="narrative-title">Call Outcomes</h3>
            <p className="narrative-purpose">Distribution of call results</p>
          </div>
          
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={outcomeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {outcomeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--surface))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--text-primary))'
                  }}
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {outcomeDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-secondary">{item.name}</span>
                <span className="text-sm font-medium text-text-primary ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity */}
        <Card className="card-neural p-6">
          <div className="narrative-section mb-4">
            <h3 className="narrative-title">Live Activity</h3>
            <p className="narrative-purpose">What's happening right now</p>
          </div>
          
          <div className="space-y-4">
            {liveActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-2 transition-colors duration-base">
                <div className={cn(
                  "w-2 h-2 rounded-full mt-2 animate-neural-pulse",
                  activity.status === 'active' && "bg-accent-primary",
                  activity.status === 'good' && "bg-success",
                  activity.status === 'completed' && "bg-text-muted",
                  activity.status === 'success' && "bg-success"
                )} />
                <div className="flex-1">
                  <p className="text-sm text-text-primary">{activity.message}</p>
                  <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="narrative-section mb-4">
              <h4 className="text-sm font-semibold text-text-primary">Quick Actions</h4>
            </div>
            
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start interactive-glow">
                <Play className="w-4 h-4 mr-2" />
                Test agent response
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start interactive-glow">
                <Target className="w-4 h-4 mr-2" />
                Start new campaign
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start interactive-glow">
                <Settings className="w-4 h-4 mr-2" />
                System settings
              </Button>
            </div>
          </div>
        </Card>

        {/* Recent Conversations */}
        <Card className="card-neural p-6">
          <div className="narrative-section mb-4">
            <h3 className="narrative-title">Recent Conversations</h3>
            <p className="narrative-purpose">Latest agent interactions</p>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 1, caller: "Sarah M.", outcome: "Qualified", duration: "3:24", agent: "Sales Agent" },
              { id: 2, caller: "John D.", outcome: "Transferred", duration: "1:45", agent: "Support Agent" },
              { id: 3, caller: "Lisa K.", outcome: "Completed", duration: "2:18", agent: "Sales Agent" },
              { id: 4, caller: "Mike R.", outcome: "Scheduled", duration: "4:12", agent: "Scheduler" },
              { id: 5, caller: "Anna T.", outcome: "Qualified", duration: "2:56", agent: "Lead Gen" },
            ].map((conversation) => (
              <div key={conversation.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors duration-base">
                <div>
                  <p className="font-medium text-text-primary">{conversation.caller}</p>
                  <p className="text-xs text-text-muted">{conversation.agent} • {conversation.duration}</p>
                </div>
                <Badge variant={conversation.outcome === 'Qualified' ? 'default' : 'secondary'}>
                  {conversation.outcome}
                </Badge>
              </div>
            ))}
            
            <Button variant="ghost" size="sm" className="w-full interactive-glow">
              View all conversations <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Performance Insights */}
        <Card className="card-neural p-6">
          <div className="narrative-section mb-4">
            <h3 className="narrative-title">Performance Insights</h3>
            <p className="narrative-purpose">AI-powered recommendations</p>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-neural border border-accent-primary/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-accent-primary mt-1" />
                <div>
                  <h4 className="font-medium text-text-primary">Conversion improving</h4>
                  <p className="text-sm text-text-secondary">Your Sales Agent shows 15% better performance this week</p>
                  <p className="text-xs text-text-muted mt-1">Consider expanding its training data</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning mt-1" />
                <div>
                  <h4 className="font-medium text-text-primary">Response time spike</h4>
                  <p className="text-sm text-text-secondary">Slight delay detected during peak hours</p>
                  <p className="text-xs text-text-muted mt-1">We'll auto-scale capacity if this continues</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                <div>
                  <h4 className="font-medium text-text-primary">Peak efficiency reached</h4>
                  <p className="text-sm text-text-secondary">All agents operating at optimal parameters</p>
                  <p className="text-xs text-text-muted mt-1">System health: Excellent</p>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="w-full interactive-glow">
              View detailed analytics <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}