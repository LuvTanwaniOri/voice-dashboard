import { MetricCard } from "./MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList
} from "recharts";

export function DashboardOverview() {
  // Chart data
  const performanceTrendData = [
    { name: 'Mon', qo: 8.2, latency: 1.45, minutes: 2340 },
    { name: 'Tue', qo: 9.1, latency: 1.38, minutes: 2567 },
    { name: 'Wed', qo: 10.8, latency: 1.42, minutes: 2789 },
    { name: 'Thu', qo: 11.3, latency: 1.35, minutes: 2654 },
    { name: 'Fri', qo: 11.8, latency: 1.34, minutes: 2847 },
    { name: 'Sat', qo: 12.1, latency: 1.34, minutes: 2847 },
    { name: 'Sun', qo: 12.1, latency: 1.34, minutes: 2847 }
  ];

  const funnelData = [
    { name: 'Total Attempts', value: 3247, rate: 100, fill: '#3b82f6', description: 'All outbound calls initiated' },
    { name: 'Connected Calls', value: 2087, rate: 64.3, fill: '#8b5cf6', description: 'Successfully connected to prospect' },
    { name: 'Conversation Started', value: 1842, rate: 88.3, fill: '#06b6d4', description: 'Prospect engaged in conversation' },
    { name: 'Information Gathered', value: 1234, rate: 67.0, fill: '#10b981', description: 'Key prospect data collected' },
    { name: 'Lead Qualified', value: 687, rate: 55.7, fill: '#f59e0b', description: 'Meets qualification criteria' },
    { name: 'Meeting Scheduled', value: 342, rate: 49.8, fill: '#ef4444', description: 'Appointments successfully booked' },
    { name: 'Show Rate', value: 287, rate: 83.9, fill: '#8b5cf6', description: 'Prospects attended meetings' }
  ];

  const qualityData = [
    { name: 'ASR Accuracy', value: 91.3, target: 90, fill: 'hsl(var(--success))', status: 'excellent', trend: '+2.1%' },
    { name: 'Response Latency', value: 87.4, target: 85, fill: 'hsl(var(--accent-blue))', status: 'good', trend: '+1.8%' },
    { name: 'Barge-in Recovery', value: 96.8, target: 95, fill: 'hsl(var(--chart-2))', status: 'excellent', trend: '+0.3%' },
    { name: 'Natural Conversation', value: 84.1, target: 80, fill: 'hsl(var(--chart-3))', status: 'good', trend: '+3.2%' },
    { name: 'Context Retention', value: 92.7, target: 85, fill: 'hsl(var(--chart-4))', status: 'excellent', trend: '+1.5%' },
    { name: 'Error Handling', value: 88.9, target: 85, fill: 'hsl(var(--warning))', status: 'good', trend: '+2.7%' }
  ];

  const chartConfig = {
    qo: { label: "QO/100 CM", color: "hsl(var(--chart-1))" },
    latency: { label: "Latency (s)", color: "hsl(var(--chart-2))" },
    minutes: { label: "Minutes", color: "hsl(var(--chart-3))" },
  };

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
          trendData={[
            { value: 8.2 }, { value: 9.1 }, { value: 10.8 }, 
            { value: 11.3 }, { value: 11.8 }, { value: 12.1 }, { value: 12.1 }
          ]}
        />
        <MetricCard
          title="P95 Turn Latency"
          value="1.34s"
          change={-12.3}
          trend="up"
          icon={<Clock className="w-6 h-6" />}
          variant="glass"
          className="bg-gradient-glass backdrop-blur-xl border-border/30 shadow-lg hover:shadow-glow transition-all duration-300"
          trendData={[
            { value: 1.45 }, { value: 1.38 }, { value: 1.42 }, 
            { value: 1.35 }, { value: 1.34 }, { value: 1.34 }, { value: 1.34 }
          ]}
        />
        <MetricCard
          title="Connected Minutes"
          value="2,847"
          change={12.5}
          trend="up"
          icon={<Phone className="w-6 h-6" />}
          variant="glass"
          className="bg-gradient-glass backdrop-blur-xl border-border/30 shadow-lg hover:shadow-glow transition-all duration-300"
          trendData={[
            { value: 2340 }, { value: 2567 }, { value: 2789 }, 
            { value: 2654 }, { value: 2847 }, { value: 2847 }, { value: 2847 }
          ]}
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
        <Card className="bg-gradient-to-br from-background via-surface to-surface-2/30 border border-border/30 shadow-elegant hover:shadow-glow transition-all duration-500 backdrop-blur-sm">
          <CardHeader className="pb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/5 via-transparent to-success/5 opacity-50"></div>
            <CardTitle className="text-xl font-semibold text-text-primary flex items-center gap-4 relative z-10">
              <div className="p-3 bg-gradient-to-br from-accent-blue/20 to-accent-blue/10 rounded-xl shadow-sm border border-accent-blue/20">
                <BarChart3 className="w-5 h-5 text-accent-blue" />
              </div>
              <span>Quality Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 relative">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">ASR WER (US)</span>
                  <div className="px-3 py-1 bg-success/10 rounded-full border border-success/20">
                    <span className="font-semibold text-success text-sm">8.7%</span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={91.3} className="h-3 bg-surface-2/60 rounded-full shadow-inner" />
                  <div className="absolute inset-0 bg-gradient-to-r from-success/20 to-success/40 rounded-full opacity-30"></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">Barge-in Recovery</span>
                  <div className="px-3 py-1 bg-success/10 rounded-full border border-success/20">
                    <span className="font-semibold text-success text-sm">96.8%</span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={96.8} className="h-3 bg-surface-2/60 rounded-full shadow-inner" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-blue/40 rounded-full opacity-30"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-gradient-to-br from-surface-2/80 to-surface-2/40 rounded-xl border border-border/20 hover:border-warning/30 transition-all duration-300 group">
                <div className="text-2xl font-bold text-warning mb-1 group-hover:scale-105 transition-transform">84.1%</div>
                <div className="text-xs text-text-muted font-medium">Handoff Precision</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-surface-2/80 to-surface-2/40 rounded-xl border border-border/20 hover:border-success/30 transition-all duration-300 group">
                <div className="text-2xl font-bold text-success mb-1 group-hover:scale-105 transition-transform">96.8%</div>
                <div className="text-xs text-text-muted font-medium">Barge-in Recovery</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-surface-2/80 to-surface-2/40 rounded-xl border border-border/20 hover:border-success/30 transition-all duration-300 group">
                <div className="text-2xl font-bold text-success mb-1 group-hover:scale-105 transition-transform">8.7%</div>
                <div className="text-xs text-text-muted font-medium">ASR WER</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends Chart */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-text-primary flex items-center gap-3">
            <div className="p-2 bg-accent-blue/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-accent-blue" />
            </div>
            <span>Performance Trends</span>
            <span className="text-sm font-normal text-text-muted">(Last 7 Days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceTrendData}>
                <defs>
                  <linearGradient id="qoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--text-secondary))' }}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="qo"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#qoGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lead Qualification Funnel */}
        <Card className="bg-gradient-to-br from-background via-surface to-surface-2/20 border border-border/30 shadow-elegant hover:shadow-glow transition-all duration-500 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-chart-1/3 via-accent-blue/3 to-success/3 opacity-60"></div>
            <CardTitle className="text-xl font-semibold text-text-primary flex items-center gap-4 relative z-10">
              <div className="p-3 bg-gradient-to-br from-chart-1/20 to-accent-blue/20 rounded-xl shadow-sm border border-chart-1/20">
                <BarChart3 className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <span>Lead Qualification Pipeline</span>
                <div className="text-sm font-normal text-text-muted mt-1">Real-time conversion tracking • Last 30 days</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="mb-6 grid grid-cols-3 gap-4 p-4 bg-surface-2/30 rounded-xl border border-border/20">
              <div className="text-center">
                <div className="text-lg font-bold text-chart-1">8.8%</div>
                <div className="text-xs text-text-muted">Final Conversion</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent-blue">$142</div>
                <div className="text-xs text-text-muted">Cost per Meeting</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-success">+15.2%</div>
                <div className="text-xs text-text-muted">vs Last Month</div>
              </div>
            </div>
            
            {/* Funnel Visualization */}
            <div className="space-y-3 mb-6">
              {funnelData.map((stage, index) => {
                const width = (stage.value / funnelData[0].value) * 100;
                const isLast = index === funnelData.length - 1;
                
                return (
                  <div key={stage.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-secondary">{stage.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text-primary">{stage.value.toLocaleString()}</span>
                        <span className="text-xs text-text-muted">({stage.rate}%)</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="h-4 bg-surface-2/60 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLast ? 'bg-gradient-to-r from-success to-success/80' :
                            index <= 1 ? 'bg-gradient-to-r from-chart-1 to-chart-1/80' :
                            index <= 3 ? 'bg-gradient-to-r from-accent-blue to-accent-blue/80' :
                            'bg-gradient-to-r from-chart-3 to-chart-3/80'
                          }`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                      {index < funnelData.length - 1 && (
                        <div className="absolute -bottom-2 right-0 text-xs text-text-muted">
                          -{(((funnelData[index].value - funnelData[index + 1].value) / funnelData[index].value) * 100).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Actionable Insights */}
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-warning/5 to-warning/10 rounded-xl border border-warning/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-warning mb-1">Improvement Opportunity</div>
                    <div className="text-xs text-text-secondary">
                      32.0% drop from Information Gathered to Lead Qualified. Consider refining qualification criteria.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-success/5 to-success/10 rounded-xl border border-success/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-success mb-1">Strong Performance</div>
                    <div className="text-xs text-text-secondary">
                      88.3% conversation rate is excellent. Focus on scaling connection volume.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-br from-surface-2/60 to-surface-2/30 rounded-lg border border-border/20">
                  <div className="text-xs text-text-muted mb-1">Peak Hours</div>
                  <div className="text-sm font-bold text-text-primary">2-4 PM EST</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-surface-2/60 to-surface-2/30 rounded-lg border border-border/20">
                  <div className="text-xs text-text-muted mb-1">Best Day</div>
                  <div className="text-sm font-bold text-text-primary">Tuesday</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality Metrics Chart */}
        <Card className="bg-gradient-to-br from-background via-surface to-surface-2/20 border border-border/30 shadow-elegant hover:shadow-glow transition-all duration-500 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-success/3 via-chart-3/3 to-accent-blue/3 opacity-60"></div>
            <CardTitle className="text-xl font-semibold text-text-primary flex items-center gap-4 relative z-10">
              <div className="p-3 bg-gradient-to-br from-success/20 to-accent-blue/20 rounded-xl shadow-sm border border-success/20">
                <Target className="w-5 h-5 text-success" />
              </div>
              <div>
                <span>Quality Performance</span>
                <div className="text-sm font-normal text-text-muted mt-1">AI model metrics • Real-time monitoring</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="mb-6 grid grid-cols-3 gap-4 p-4 bg-surface-2/30 rounded-xl border border-border/20">
              <div className="text-center">
                <div className="text-lg font-bold text-success">90.2%</div>
                <div className="text-xs text-text-muted">Avg Quality Score</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-chart-3">6/6</div>
                <div className="text-xs text-text-muted">Metrics Above Target</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent-blue">1.24s</div>
                <div className="text-xs text-text-muted">Avg Response Time</div>
              </div>
            </div>
            
            <ChartContainer config={{}} className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qualityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.9}/>
                      <stop offset="50%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="hsl(var(--accent-blue))" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: 'hsl(var(--text-secondary))' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'hsl(var(--text-secondary))' }}
                    domain={[0, 100]}
                  />
                  <ChartTooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-elegant animate-scale-in">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.fill }}></div>
                              <p className="font-semibold text-text-primary text-sm">{label}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-lg font-bold text-text-primary">
                                {data.value}%
                              </p>
                              <p className="text-sm text-text-secondary">
                                Target: {data.target}% • Status: <span className={`font-semibold ${data.status === 'excellent' ? 'text-success' : 'text-accent-blue'}`}>{data.status}</span>
                              </p>
                              <p className="text-xs text-text-muted">
                                Trend: <span className="text-success font-medium">{data.trend}</span> vs last week
                              </p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[6, 6, 0, 0]} 
                    fill="url(#qualityGradient)"
                    className="drop-shadow-sm"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <div className="mt-4 space-y-3">
              <div className="p-4 bg-gradient-to-r from-success/5 to-chart-3/5 rounded-xl border border-success/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Top performer:</span>
                  <span className="font-semibold text-success">Barge-in Recovery (96.8%)</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gradient-to-br from-surface-2/60 to-surface-2/30 rounded-lg border border-border/20">
                  <div className="text-xs text-text-muted mb-1">Model Health</div>
                  <div className="text-lg font-bold text-success">Optimal</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-surface-2/60 to-surface-2/30 rounded-lg border border-border/20">
                  <div className="text-xs text-text-muted mb-1">Last Updated</div>
                  <div className="text-lg font-bold text-text-primary">2m ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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