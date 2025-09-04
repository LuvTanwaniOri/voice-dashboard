import { useState } from "react";
import { ArrowLeft, Edit3, Share2, Copy, TestTube, TrendingUp, Clock, DollarSign, Activity, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

interface AgentOverviewProps {
  agentId: string;
  onBack: () => void;
  onEdit: () => void;
}

export const AgentOverview = ({ agentId, onBack, onEdit }: AgentOverviewProps) => {
  // Mock data - replace with real data from your API
  const agent = {
    id: agentId,
    name: "Sarah",
    role: "Lead Qualifier",
    status: "active",
    version: "v1.3",
    successRate: 71,
    qo100cm: 12.1,
    p95Latency: "1.34s",
    effectiveCost: "$0.15",
    totalCalls: 12467,
    lastUpdated: "2 days ago"
  };

  const performanceData = [
    { date: "Jan 1", successRate: 68, calls: 145 },
    { date: "Jan 2", successRate: 72, calls: 189 },
    { date: "Jan 3", successRate: 71, calls: 167 },
    { date: "Jan 4", successRate: 75, calls: 203 },
    { date: "Jan 5", successRate: 73, calls: 178 },
    { date: "Jan 6", successRate: 71, calls: 156 },
    { date: "Jan 7", successRate: 74, calls: 192 }
  ];

  const versions = [
    { version: "v1.3", released: "2 days ago", qo100cm: 12.1, successRate: 71, p95Latency: "1.34s", connects: 2147 },
    { version: "v1.2", released: "17 days ago", qo100cm: 10.8, successRate: 68, p95Latency: "1.39s", connects: 4802 },
    { version: "v1.1", released: "1 mo ago", qo100cm: 9.9, successRate: 64, p95Latency: "1.42s", connects: 5518 }
  ];

  const campaigns = [
    { name: "Q4 Lead Gen", variant: "A/B", connects: 987, qualified: 312, outcome: "+6.8%" },
    { name: "Collections Overdue", variant: "A only", connects: 642, qualified: null, outcome: null }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Back to Agents
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              {agent.name} - {agent.role}
            </h1>
            <p className="text-muted-foreground">
              Version {agent.version} • Updated {agent.lastUpdated}
            </p>
          </div>
          <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
            {agent.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
          <Button onClick={onEdit}>
            <Edit3 className="h-4 w-4" />
            Edit Agent
          </Button>
          <Button variant="secondary">
            <TestTube className="h-4 w-4" />
            Quick Test
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <TrendingUp className="h-4 w-4" />
              Success Rate
            </div>
            <div className="text-2xl font-semibold text-foreground">{agent.successRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Activity className="h-4 w-4" />
              QO/100 CM
            </div>
            <div className="text-2xl font-semibold text-foreground">{agent.qo100cm}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <Clock className="h-4 w-4" />
              P95 Turn Latency
            </div>
            <div className="text-2xl font-semibold text-foreground">{agent.p95Latency}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
              <DollarSign className="h-4 w-4" />
              Effective $/min
            </div>
            <div className="text-2xl font-semibold text-foreground">{agent.effectiveCost}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Line 
                      type="monotone" 
                      dataKey="successRate" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Knowledge Base</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <Badge variant="secondary" className="bg-green-100 text-green-800">HOT</Badge>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Voice Engine</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Healthy</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Latency</span>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">245ms</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Error Rate</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">0.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="versions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="versions">Versions & Performance</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Usage</TabsTrigger>
          <TabsTrigger value="experiments">Experiments</TabsTrigger>
        </TabsList>

        <TabsContent value="versions">
          <Card>
            <CardHeader>
              <CardTitle>Version History & Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Version</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Released</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">QO/100 CM</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Success Rate</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">P95 Latency</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Connects</th>
                    </tr>
                  </thead>
                  <tbody>
                    {versions.map((version, index) => (
                      <tr key={version.version} className="border-b border-border/50">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {version.version}
                            {index === 0 && <Badge variant="secondary" className="text-xs">current</Badge>}
                          </div>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">{version.released}</td>
                        <td className="py-3 font-medium">{version.qo100cm}</td>
                        <td className="py-3 font-medium">{version.successRate}%</td>
                        <td className="py-3">{version.p95Latency}</td>
                        <td className="py-3">{version.connects.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Campaign</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Variant</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Connects</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Qualified</th>
                      <th className="text-left py-2 text-sm font-medium text-muted-foreground">Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 font-medium">{campaign.name}</td>
                        <td className="py-3">{campaign.variant}</td>
                        <td className="py-3">{campaign.connects}</td>
                        <td className="py-3">{campaign.qualified || '—'}</td>
                        <td className="py-3">
                          {campaign.outcome ? (
                            <span className="text-green-600 font-semibold">{campaign.outcome}</span>
                          ) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiments">
          <Card>
            <CardHeader>
              <CardTitle>A/B Testing & Experiments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Active Experiment — v1.3</h4>
                  <p className="text-sm text-muted-foreground mb-4">A: Baseline Prompt (60%) | B: Revised Prompt (40%)</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <h5 className="font-medium mb-2">Variant A — Baseline (60% traffic)</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Success Rate</span>
                          <span className="font-medium">69%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>QO/100 CM</span>
                          <span className="font-medium">11.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span>P95 Latency</span>
                          <span className="font-medium">1.33s</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-border rounded-lg">
                      <h5 className="font-medium mb-2">Variant B — Revised (40% traffic)</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Success Rate</span>
                          <span className="font-medium">74%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>QO/100 CM</span>
                          <span className="font-medium">12.9</span>
                        </div>
                        <div className="flex justify-between">
                          <span>P95 Latency</span>
                          <span className="font-medium">1.36s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};