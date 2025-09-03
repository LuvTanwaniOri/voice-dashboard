import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CampaignCreationWizard } from "./CampaignCreationWizard";
import { 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Settings, 
  Users, 
  Clock, 
  Target,
  Phone,
  Calendar,
  BarChart3,
  Edit,
  Copy,
  Archive,
  Upload,
  AlertCircle,
  CheckCircle,
  TrendingUp
} from "lucide-react";

export function CampaignManager() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [showCreateWizard, setShowCreateWizard] = useState<boolean>(false);

  const campaigns = [
    {
      id: 1,
      name: "Q4 Lead Generation",
      status: "active",
      agent: "Sarah - Lead Qualifier",
      contacts: { total: 2500, completed: 1247, remaining: 1253 },
      metrics: { attempts: 1247, connects: 798, qualified: 156 },
      created: "2024-08-15",
      updated: "2 hours ago"
    },
    {
      id: 2,
      name: "Collections - Overdue 30+",
      status: "preparing",
      agent: "Alex - Collections",
      contacts: { total: 850, completed: 0, remaining: 850 },
      metrics: { attempts: 0, connects: 0, qualified: 0 },
      created: "2024-08-20",
      updated: "45 min ago"
    },
    {
      id: 3,
      name: "Customer Satisfaction Survey",
      status: "scheduled",
      agent: "Maya - Survey Bot",
      contacts: { total: 1200, completed: 0, remaining: 1200 },
      metrics: { attempts: 0, connects: 0, qualified: 0 },
      created: "2024-08-19",
      updated: "1 day ago"
    },
    {
      id: 4,
      name: "Product Demo Follow-up",
      status: "paused",
      agent: "Sarah - Lead Qualifier",
      contacts: { total: 450, completed: 320, remaining: 130 },
      metrics: { attempts: 320, connects: 198, qualified: 47 },
      created: "2024-08-10",
      updated: "3 days ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success';
      case 'preparing': return 'bg-warning/20 text-warning';
      case 'scheduled': return 'bg-primary/20 text-primary';
      case 'paused': return 'bg-muted/20 text-muted-foreground';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="w-3 h-3" />;
      case 'preparing': return <Clock className="w-3 h-3" />;
      case 'scheduled': return <Calendar className="w-3 h-3" />;
      case 'paused': return <Pause className="w-3 h-3" />;
      default: return <Square className="w-3 h-3" />;
    }
  };

  const handleCreateCampaign = (campaignData: any) => {
    console.log('Creating campaign:', campaignData);
    // TODO: Implement campaign creation logic
    setShowCreateWizard(false);
  };

  return (
    <>
      {showCreateWizard && (
        <CampaignCreationWizard
          onClose={() => setShowCreateWizard(false)}
          onSave={handleCreateCampaign}
        />
      )}
      
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaign Manager</h1>
          <p className="text-muted-foreground">Create and monitor your voice bot campaigns</p>
        </div>
        <Button 
          className="flex items-center space-x-2"
          onClick={() => setShowCreateWizard(true)}
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </Button>
      </div>

      {/* Campaign Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold text-foreground">5,000</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Calls Today</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
              </div>
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">19.5%</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Campaigns</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import Contacts
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">Created {campaign.created}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(campaign.status)} flex items-center space-x-1 w-fit`}>
                      {getStatusIcon(campaign.status)}
                      <span className="capitalize">{campaign.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-foreground">{campaign.agent}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2 min-w-[200px]">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {campaign.contacts.completed}/{campaign.contacts.total}
                        </span>
                        <span className="text-foreground">
                          {Math.round((campaign.contacts.completed / campaign.contacts.total) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(campaign.contacts.completed / campaign.contacts.total) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    {campaign.metrics.attempts > 0 ? (
                      <div className="text-sm">
                        <div className="text-foreground">
                          {campaign.metrics.connects}/{campaign.metrics.attempts} connects
                        </div>
                        <div className="text-muted-foreground">
                          {campaign.metrics.qualified} qualified
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">No data</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{campaign.updated}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Active Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Q4 Lead Generation - Live Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Dialer Pace</span>
                <span className="text-sm text-foreground">2.3 CPS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Idle Workers</span>
                <span className="text-sm text-foreground">2 (Target: 1-2)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Abandonment Rate</span>
                <span className="text-sm text-success">0.0%</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Real-time Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connect Rate</span>
                <span className="text-sm text-foreground">64.0%</span>
              </div>
              <Progress value={64} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Talk Start Rate</span>
                <span className="text-sm text-foreground">84.6%</span>
              </div>
              <Progress value={84.6} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Qualification Rate</span>
                <span className="text-sm text-success">19.5%</span>
              </div>
              <Progress value={19.5} className="h-2" />
            </div>

            <div className="pt-2 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-success">156</div>
                  <div className="text-xs text-muted-foreground">Qualified Today</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">$3.42</div>
                  <div className="text-xs text-muted-foreground">Avg Cost/QO</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaign Activity */}
      <Card className="bg-gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { 
                time: '2 min ago', 
                campaign: 'Q4 Lead Generation',
                event: 'Qualified lead: John Smith (+1-555-0123)', 
                status: 'success',
                icon: CheckCircle
              },
              { 
                time: '5 min ago', 
                campaign: 'Q4 Lead Generation',
                event: 'Call transferred to sales team', 
                status: 'info',
                icon: Phone
              },
              { 
                time: '12 min ago', 
                campaign: 'Collections - Overdue 30+',
                event: 'Capacity preparation started (850 contacts)', 
                status: 'warning',
                icon: Clock
              },
              { 
                time: '25 min ago', 
                campaign: 'Q4 Lead Generation',
                event: 'Knowledge pack "Objection Handling" updated', 
                status: 'info',
                icon: Settings
              },
              { 
                time: '1 hour ago', 
                campaign: 'Product Demo Follow-up',
                event: 'Campaign paused - low success rate detected', 
                status: 'warning',
                icon: AlertCircle
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-accent/50 rounded-lg transition-colors">
                  <IconComponent className={`w-4 h-4 mt-1 ${
                    item.status === 'success' ? 'text-success' : 
                    item.status === 'warning' ? 'text-warning' : 'text-primary'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{item.campaign}</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.event}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
      </div>
    </>
  );
}