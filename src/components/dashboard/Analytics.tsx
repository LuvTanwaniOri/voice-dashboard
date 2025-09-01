import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Phone,
  Clock,
  Target,
  DollarSign,
  Globe,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Plus,
  Zap
} from "lucide-react";

export function Analytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  const insightTemplates = [
    {
      id: 1,
      name: "Sales Objections",
      description: "Extract and categorize customer objections",
      runs: 1247,
      lastRun: "2 hours ago",
      avgTokens: 450,
      status: "active"
    },
    {
      id: 2,
      name: "Lead Quality Score",
      description: "Score leads based on BANT criteria",
      runs: 856,
      lastRun: "4 hours ago",
      avgTokens: 280,
      status: "active"
    },
    {
      id: 3,
      name: "Sentiment Analysis",
      description: "Analyze customer sentiment and mood",
      runs: 2134,
      lastRun: "1 hour ago",
      avgTokens: 320,
      status: "active"
    },
    {
      id: 4,
      name: "Collections PTP Analysis",
      description: "Extract payment promises and commitments",
      runs: 423,
      lastRun: "6 hours ago",
      avgTokens: 520,
      status: "paused"
    }
  ];

  const performanceMetrics = [
    {
      metric: "QO/100 CM",
      current: "12.1",
      previous: "11.2",
      change: "+8.0%",
      trend: "up",
      target: "15.0"
    },
    {
      metric: "P95 Turn Latency",
      current: "1.34s",
      previous: "1.54s",
      change: "-13.0%",
      trend: "up",
      target: "1.50s"
    },
    {
      metric: "ASR WER (US EN)",
      current: "8.7%",
      previous: "9.2%",
      change: "-5.4%",
      trend: "up",
      target: "10.0%"
    },
    {
      metric: "Barge-in Recovery",
      current: "96.8%",
      previous: "94.6%",
      change: "+2.3%",
      trend: "up",
      target: "95.0%"
    },
    {
      metric: "Handoff Precision",
      current: "84.1%",
      previous: "79.3%",
      change: "+6.1%",
      trend: "up",
      target: "80.0%"
    },
    {
      metric: "Connect Rate",
      current: "64.0%",
      previous: "61.8%",
      change: "+3.6%",
      trend: "up",
      target: "65.0%"
    }
  ];

  const campaignBreakdown = [
    {
      campaign: "Q4 Lead Generation",
      attempts: 2847,
      connects: 1823,
      qualified: 342,
      cost: "$1,234.56",
      qo100cm: "18.8",
      avgLatency: "1.28s"
    },
    {
      campaign: "Collections - Overdue 30+",
      attempts: 1250,
      connects: 892,
      qualified: 127,
      cost: "$587.23",
      qo100cm: "14.2",
      avgLatency: "1.41s"
    },
    {
      campaign: "Customer Survey",
      attempts: 3420,
      connects: 2456,
      qualified: 2198,
      cost: "$892.14",
      qo100cm: "89.5",
      avgLatency: "1.15s"
    }
  ];

  const languageMetrics = [
    {
      language: "English (US)",
      calls: 1847,
      switches: 89,
      avgSwitchTime: "2.3s",
      wer: "8.7%",
      regretRate: "3.2%"
    },
    {
      language: "Hindi (India)",
      calls: 1000,
      switches: 156,
      avgSwitchTime: "2.8s",
      wer: "11.2%",
      regretRate: "5.1%"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground">Deep analysis of your voice bot performance and custom insights</p>
        </div>
        <div className="flex space-x-3">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="insights">Custom Insights</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Performance Overview (Last 7 Days)</span>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="p-4 bg-accent/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{metric.metric}</span>
                      <Badge variant={metric.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{metric.current}</div>
                    <div className="text-xs text-muted-foreground">
                      Target: {metric.target} | Previous: {metric.previous}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversation Funnel */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>Conversion Funnel Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">5,517</div>
                  <div className="text-sm text-muted-foreground">Attempts</div>
                  <div className="text-xs text-success">100%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">3,171</div>
                  <div className="text-sm text-muted-foreground">Connects</div>
                  <div className="text-xs text-success">57.5%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">2,674</div>
                  <div className="text-sm text-muted-foreground">Talk Start</div>
                  <div className="text-xs text-success">84.3%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">1,456</div>
                  <div className="text-sm text-muted-foreground">Info Captured</div>
                  <div className="text-xs text-success">54.5%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">667</div>
                  <div className="text-sm text-muted-foreground">Qualified</div>
                  <div className="text-xs text-success">45.8%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">347</div>
                  <div className="text-sm text-muted-foreground">Handoffs</div>
                  <div className="text-xs text-success">52.0%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language Performance */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-primary" />
                <span>Multilingual Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Language</TableHead>
                    <TableHead>Calls</TableHead>
                    <TableHead>Language Switches</TableHead>
                    <TableHead>Avg Switch Time</TableHead>
                    <TableHead>WER</TableHead>
                    <TableHead>Regret Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languageMetrics.map((lang) => (
                    <TableRow key={lang.language}>
                      <TableCell className="font-medium">{lang.language}</TableCell>
                      <TableCell>{lang.calls.toLocaleString()}</TableCell>
                      <TableCell>{lang.switches}</TableCell>
                      <TableCell>{lang.avgSwitchTime}</TableCell>
                      <TableCell>
                        <Badge variant={parseFloat(lang.wer) < 10 ? 'default' : 'destructive'}>
                          {lang.wer}
                        </Badge>
                      </TableCell>
                      <TableCell>{lang.regretRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Campaign Performance Comparison</span>
                <div className="flex space-x-2">
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="lead-gen">Q4 Lead Generation</SelectItem>
                      <SelectItem value="collections">Collections Campaign</SelectItem>
                      <SelectItem value="survey">Customer Survey</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Connects</TableHead>
                    <TableHead>Qualified</TableHead>
                    <TableHead>QO/100 CM</TableHead>
                    <TableHead>Avg Latency</TableHead>
                    <TableHead>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignBreakdown.map((campaign) => (
                    <TableRow key={campaign.campaign}>
                      <TableCell className="font-medium">{campaign.campaign}</TableCell>
                      <TableCell>{campaign.attempts.toLocaleString()}</TableCell>
                      <TableCell>{campaign.connects.toLocaleString()}</TableCell>
                      <TableCell>{campaign.qualified.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={parseFloat(campaign.qo100cm) > 15 ? 'default' : 'secondary'}>
                          {campaign.qo100cm}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={parseFloat(campaign.avgLatency) < 1.5 ? 'default' : 'destructive'}>
                          {campaign.avgLatency}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>ASR Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">US English WER</span>
                    <span className="text-sm font-medium text-success">8.7%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-success h-2 rounded-full" style={{ width: '91.3%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hindi WER</span>
                    <span className="text-sm font-medium text-success">11.2%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-success h-2 rounded-full" style={{ width: '88.8%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">94.2%</div>
                    <div className="text-xs text-muted-foreground">Confidence Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">89ms</div>
                    <div className="text-xs text-muted-foreground">Avg Processing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Latency Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">STT Processing</span>
                    <span className="text-sm text-foreground">245ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">LLM Inference</span>
                    <span className="text-sm text-foreground">487ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">TTS Generation</span>
                    <span className="text-sm text-foreground">312ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Network + Audio</span>
                    <span className="text-sm text-foreground">296ms</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Total P95 Latency</span>
                    <span className="text-lg font-bold text-success">1.34s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Custom Insight Templates</span>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insightTemplates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium text-foreground">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {template.runs} runs • Avg {template.avgTokens} tokens • Last run {template.lastRun}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={template.status === 'active' ? 'default' : 'secondary'}
                        className={template.status === 'active' ? 'bg-success/20 text-success' : ''}
                      >
                        {template.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sample Insight Results */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Sales Objections Analysis (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">147</div>
                  <div className="text-sm text-muted-foreground">Pricing</div>
                  <div className="text-xs text-warning">32.4%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">89</div>
                  <div className="text-sm text-muted-foreground">Timing</div>
                  <div className="text-xs text-warning">19.6%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">76</div>
                  <div className="text-sm text-muted-foreground">Authority</div>
                  <div className="text-xs text-warning">16.8%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">65</div>
                  <div className="text-sm text-muted-foreground">Need</div>
                  <div className="text-xs text-warning">14.3%</div>
                </div>
                <div className="text-center p-4 bg-accent/30 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">77</div>
                  <div className="text-sm text-muted-foreground">Trust</div>
                  <div className="text-xs text-warning">17.0%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Spend (7d)</p>
                    <p className="text-2xl font-bold text-foreground">$2,713.92</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Fee</p>
                    <p className="text-2xl font-bold text-foreground">$847.20</p>
                  </div>
                  <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">LLM Tokens</p>
                    <p className="text-2xl font-bold text-foreground">$1,124.45</p>
                  </div>
                  <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">TTS/STT</p>
                    <p className="text-2xl font-bold text-foreground">$742.27</p>
                  </div>
                  <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Cost per Qualified Outcome by Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Platform Cost</TableHead>
                    <TableHead>LLM Cost</TableHead>
                    <TableHead>TTS/STT Cost</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Qualified Outcomes</TableHead>
                    <TableHead>Cost per QO</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignBreakdown.map((campaign) => (
                    <TableRow key={campaign.campaign}>
                      <TableCell className="font-medium">{campaign.campaign}</TableCell>
                      <TableCell>$567.12</TableCell>
                      <TableCell>$423.45</TableCell>
                      <TableCell>$243.99</TableCell>
                      <TableCell className="font-medium">{campaign.cost}</TableCell>
                      <TableCell>{campaign.qualified}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          ${(parseFloat(campaign.cost.replace('$', '').replace(',', '')) / campaign.qualified).toFixed(2)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}