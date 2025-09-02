import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Phone,
  Zap,
  TrendingUp,
  TrendingDown,
  Wifi,
  WifiOff,
  Shield,
  ShieldCheck,
  Brain,
  Volume2,
  Headphones
} from "lucide-react";

export function OperationsWallboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const realTimeMetrics = {
    activeCalls: 127,
    idleWorkerRatio: 0.012, // Target: 0.015
    p95TurnLatency: 1.34, // Target: ≤1.5s
    amdDistribution: {
      human: 64.2,
      voicemail: 28.5,
      robokiller: 7.3
    },
    errorRate: 0.8 // %
  };

  const providerHealth = [
    {
      provider: "Deepgram Nova-2",
      type: "STT",
      status: "healthy",
      latency: "235ms",
      errorRate: "0.2%",
      uptime: "99.98%"
    },
    {
      provider: "GPT-4 Turbo",
      type: "LLM", 
      status: "healthy",
      latency: "387ms",
      errorRate: "0.1%",
      uptime: "99.99%"
    },
    {
      provider: "ElevenLabs",
      type: "TTS",
      status: "degraded",
      latency: "245ms",
      errorRate: "1.2%",
      uptime: "99.85%"
    },
    {
      provider: "Azure Speech",
      type: "TTS",
      status: "healthy",
      latency: "198ms", 
      errorRate: "0.3%",
      uptime: "99.97%"
    }
  ];

  const alerts = [
    {
      id: 1,
      severity: "warning",
      message: "ElevenLabs TTS error rate above 1% for 8 minutes",
      time: "2 min ago",
      component: "TTS"
    },
    {
      id: 2,
      severity: "info",
      message: "Auto-failover activated: ElevenLabs → Azure Speech",
      time: "1 min ago",  
      component: "TTS"
    },
    {
      id: 3,
      severity: "resolved",
      message: "KB retrieval P95 latency back to normal",
      time: "5 min ago",
      component: "Knowledge Base"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'degraded': return 'text-warning';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'down': return <WifiOff className="w-4 h-4 text-destructive" />;
      default: return <Wifi className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'warning': return 'bg-warning/20 text-warning border-warning/30';
      case 'info': return 'bg-primary/20 text-primary border-primary/30';
      case 'resolved': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Operations Wallboard</h1>
          <p className="text-muted-foreground">Real-time system monitoring and health dashboard</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-foreground">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentTime.toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Calls</p>
                <p className="text-3xl font-bold text-foreground">{realTimeMetrics.activeCalls}</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Idle Worker Ratio</p>
                <p className="text-3xl font-bold text-success">{(realTimeMetrics.idleWorkerRatio * 100).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Target: 1.5%</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">P95 Turn Latency</p>
                <p className="text-3xl font-bold text-success">{realTimeMetrics.p95TurnLatency}s</p>
                <p className="text-xs text-muted-foreground">Target: ≤1.50s</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Error Rate</p>
                <p className="text-3xl font-bold text-success">{realTimeMetrics.errorRate}%</p>
                <p className="text-xs text-muted-foreground">Last 5 min</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AMD Human Rate</p>
                <p className="text-3xl font-bold text-foreground">{realTimeMetrics.amdDistribution.human}%</p>
                <p className="text-xs text-muted-foreground">VM: {realTimeMetrics.amdDistribution.voicemail}%</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provider Health & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Provider Health</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Latency</TableHead>
                  <TableHead>Error Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providerHealth.map((provider, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{provider.provider}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {provider.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex items-center space-x-2">
                      {getStatusIcon(provider.status)}
                      <span className={`text-sm ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={provider.latency.includes('ms') && parseInt(provider.latency) < 300 ? 'default' : 'destructive'}>
                        {provider.latency}
                      </Badge>
                    </TableCell>
                    <TableCell>{provider.errorRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <span>Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {alert.component}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-sm">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latency Breakdown */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Component Latency Breakdown (P95)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Headphones className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">STT First Partial</span>
                </div>
                <span className="text-sm text-success font-medium">235ms</span>
              </div>
              <Progress value={94} className="h-2" /> {/* 235/250 * 100 */}
              <div className="text-xs text-muted-foreground">Target: ≤250ms</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">LLM First Token</span>
                </div>
                <span className="text-sm text-success font-medium">387ms</span>
              </div>
              <Progress value={97} className="h-2" /> {/* 387/400 * 100 */}
              <div className="text-xs text-muted-foreground">Target: ≤400ms</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">TTS First Chunk</span>
                </div>
                <span className="text-sm text-warning font-medium">245ms</span>
              </div>
              <Progress value={122} className="h-2" /> {/* Over target */}
              <div className="text-xs text-muted-foreground">Target: ≤200ms</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Network RTT</span>
                </div>
                <span className="text-sm text-success font-medium">45ms</span>
              </div>
              <Progress value={45} className="h-2" />
              <div className="text-xs text-muted-foreground">Typical: 40-60ms</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}