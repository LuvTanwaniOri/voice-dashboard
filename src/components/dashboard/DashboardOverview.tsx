import { MetricCard } from "./MetricCard";
import { GuideBar } from "@/components/ui/GuideBar";
import { KPITile } from "@/components/ui/KPITile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Target,
  Play,
  Plus
} from "lucide-react";

export function DashboardOverview() {
  const handleStartFirstCampaign = () => {
    console.log("Starting guided campaign setup...");
  };

  const handleOpenLiveMonitor = () => {
    console.log("Opening live monitor...");
  };

  return (
    <div className="space-y-0 animate-subtle-slide-up">
      {/* Guide Bar */}
      <GuideBar
        title="Welcome to your voice operations center"
        description="Monitor campaigns, review calls, and track outcomes all in one place. Let's start with your first campaign."
        primaryAction={{
          label: "Create First Campaign",
          onClick: handleStartFirstCampaign
        }}
        learnMoreUrl="/docs/getting-started"
      />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-page-title font-bold text-text-primary tracking-tight">
              Today's Overview
            </h1>
            <p className="text-meta text-text-muted mt-1">
              Real-time performance across all campaigns
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <KPITile
            title="Total Calls Today"
            value="1,247"
            delta={{
              value: "+12%",
              trend: "up",
              period: "yesterday"
            }}
            footnote="Peak hours: 10-11 AM"
          />
          <KPITile
            title="Qualified Leads"
            value="89"
            delta={{
              value: "+8%",
              trend: "up",
              period: "yesterday"
            }}
            variant="success"
            footnote="Target: 100/day"
          />
          <KPITile
            title="Avg Turn Latency"
            value="1.2s"
            delta={{
              value: "-200ms",
              trend: "up",
              period: "yesterday"
            }}
            footnote="Target: ≤1.5s"
          />
          <KPITile
            title="Connect Rate"
            value="94.2%"
            delta={{
              value: "+2.1%",
              trend: "up",
              period: "yesterday"
            }}
            variant="success"
            footnote="Industry avg: 87%"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-apple interactive cursor-pointer" onClick={handleStartFirstCampaign}>
            <CardContent className="p-6 text-center">
              <Plus className="w-8 h-8 mx-auto mb-3 text-accent-primary" />
              <h3 className="text-card-title font-semibold text-text-primary mb-1">
                New Campaign
              </h3>
              <p className="text-meta text-text-muted">
                Set up lead qualification or collections
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-apple interactive cursor-pointer" onClick={handleOpenLiveMonitor}>
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 mx-auto mb-3 text-accent-primary" />
              <h3 className="text-card-title font-semibold text-text-primary mb-1">
                Live Monitor
              </h3>
              <p className="text-meta text-text-muted">
                Watch calls in real-time
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-apple interactive cursor-pointer">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-3 text-accent-primary" />
              <h3 className="text-card-title font-semibold text-text-primary mb-1">
                Analytics
              </h3>
              <p className="text-meta text-text-muted">
                Review performance metrics
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-apple interactive cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3 text-accent-primary" />
              <h3 className="text-card-title font-semibold text-text-primary mb-1">
                AI Agents
              </h3>
              <p className="text-meta text-text-muted">
                Build and test personas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-apple">
          <CardHeader>
            <CardTitle className="text-section font-semibold text-text-primary">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { 
                time: '2 min ago', 
                action: 'Campaign "Lead Gen Q3" completed batch of 150 calls',
                type: 'success' 
              },
              { 
                time: '12 min ago', 
                action: 'AI Agent "Sarah" updated with new knowledge base',
                type: 'info' 
              },
              { 
                time: '1 hour ago', 
                action: 'Collections campaign paused - low success rate detected',
                type: 'warning' 
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface-2 transition-all duration-base">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.type === 'success' ? 'bg-success' : 
                  item.type === 'warning' ? 'bg-warning' : 'bg-accent-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-body text-text-primary leading-normal">
                    {item.action}
                  </p>
                  <p className="text-meta text-text-muted mt-1">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}