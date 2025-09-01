import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Search, 
  Settings, 
  Trash2, 
  Download,
  Edit,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Zap,
  BarChart3,
  Filter
} from "lucide-react";

export function KnowledgeBase() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const knowledgePacks = [
    {
      id: 1,
      name: "Product Catalog 2024",
      status: "HOT",
      size: "18.4 MB",
      files: 47,
      lastUsed: "2 hours ago",
      uploaded: "2024-08-15",
      usage: 95,
      retrievals: 1247
    },
    {
      id: 2,
      name: "Pricing & Packages",
      status: "HOT",
      size: "2.1 MB",
      files: 12,
      lastUsed: "1 day ago",
      uploaded: "2024-08-18",
      usage: 87,
      retrievals: 542
    },
    {
      id: 3,
      name: "Competitor Analysis",
      status: "COLD",
      size: "24.8 MB",
      files: 63,
      lastUsed: "16 days ago",
      uploaded: "2024-07-28",
      usage: 15,
      retrievals: 89
    },
    {
      id: 4,
      name: "Objection Handling Scripts",
      status: "WARMING",
      size: "5.3 MB",
      files: 28,
      lastUsed: "3 hours ago",
      uploaded: "2024-08-19",
      usage: 72,
      retrievals: 234
    },
    {
      id: 5,
      name: "Industry Reports Q3",
      status: "HOT",
      size: "15.7 MB",
      files: 34,
      lastUsed: "5 hours ago",
      uploaded: "2024-08-12",
      usage: 91,
      retrievals: 678
    }
  ];

  const fileTypes = [
    { type: "PDF", count: 89, size: "45.2 MB" },
    { type: "MD", count: 34, size: "12.1 MB" },
    { type: "HTML", count: 28, size: "8.7 MB" },
    { type: "TXT", count: 45, size: "3.4 MB" },
    { type: "CSV", count: 12, size: "6.8 MB" },
    { type: "JSON", count: 8, size: "2.1 MB" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HOT': return <Zap className="w-4 h-4 text-success" />;
      case 'WARMING': return <RefreshCw className="w-4 h-4 text-warning animate-spin" />;
      case 'COLD': return <Database className="w-4 h-4 text-muted-foreground" />;
      default: return <Database className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HOT': return 'bg-success/20 text-success';
      case 'WARMING': return 'bg-warning/20 text-warning';
      case 'COLD': return 'bg-muted/20 text-muted-foreground';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Knowledge Base</h1>
          <p className="text-muted-foreground">Manage your AI agent's knowledge packs and documents</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Search Documents
          </Button>
          <Button onClick={handleFileUpload} disabled={isUploading}>
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Pack'}
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Upload className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Uploading "Customer FAQ Pack"</span>
                  <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Packs</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hot Packs</p>
                <p className="text-2xl font-bold text-foreground">3</p>
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
                <p className="text-sm text-muted-foreground">Total Size</p>
                <p className="text-2xl font-bold text-foreground">66.3 MB</p>
              </div>
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Retrievals (24h)</p>
                <p className="text-2xl font-bold text-foreground">2,790</p>
              </div>
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="packs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="packs">Knowledge Packs</TabsTrigger>
          <TabsTrigger value="files">File Browser</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="packs" className="space-y-6">
          {/* Knowledge Packs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {knowledgePacks.map((pack) => (
              <Card key={pack.id} className="bg-gradient-card border-border/50 shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <span>{pack.name}</span>
                    </CardTitle>
                    <Badge className={`${getStatusColor(pack.status)} flex items-center space-x-1`}>
                      {getStatusIcon(pack.status)}
                      <span>{pack.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Size: </span>
                      <span className="text-foreground font-medium">{pack.size}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Files: </span>
                      <span className="text-foreground font-medium">{pack.files}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Used: </span>
                      <span className="text-foreground font-medium">{pack.lastUsed}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Retrievals: </span>
                      <span className="text-foreground font-medium">{pack.retrievals}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usage Score</span>
                      <span className="text-foreground font-medium">{pack.usage}%</span>
                    </div>
                    <Progress value={pack.usage} className="h-2" />
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Status Legend */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Pack Status Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-success" />
                  <div>
                    <div className="font-medium text-foreground">HOT</div>
                    <div className="text-sm text-muted-foreground">Ready for instant retrieval</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RefreshCw className="w-5 h-5 text-warning" />
                  <div>
                    <div className="font-medium text-foreground">WARMING</div>
                    <div className="text-sm text-muted-foreground">Loading into memory</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium text-foreground">COLD</div>
                    <div className="text-sm text-muted-foreground">Inactive for 15+ days</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          {/* File Type Overview */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>File Types Overview</span>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {fileTypes.map((type) => (
                  <div key={type.type} className="text-center p-4 bg-accent/20 rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{type.count}</div>
                    <div className="text-sm text-muted-foreground">{type.type} files</div>
                    <div className="text-xs text-muted-foreground">{type.size}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Uploads */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Product_Pricing_2024.pdf", pack: "Pricing & Packages", size: "2.1 MB", uploaded: "2 hours ago", status: "processed" },
                  { name: "FAQ_Customer_Service.md", pack: "Product Catalog 2024", size: "456 KB", uploaded: "1 day ago", status: "processed" },
                  { name: "Competitor_Analysis_Q3.xlsx", pack: "Competitor Analysis", size: "8.7 MB", uploaded: "3 days ago", status: "processing" },
                  { name: "Objection_Scripts_Sales.txt", pack: "Objection Handling Scripts", size: "234 KB", uploaded: "5 days ago", status: "processed" },
                ].map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{file.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {file.pack} • {file.size} • {file.uploaded}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {file.status === 'processed' ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <Clock className="w-4 h-4 text-warning" />
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Retrieval Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Top Performing Packs (7 days)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {knowledgePacks
                  .sort((a, b) => b.retrievals - a.retrievals)
                  .slice(0, 4)
                  .map((pack) => (
                    <div key={pack.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{pack.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{pack.retrievals}</div>
                        <div className="text-xs text-muted-foreground">retrievals</div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Retrieval Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Response Time</span>
                    <span className="text-sm font-medium text-success">89ms</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Cache Hit Rate</span>
                    <span className="text-sm font-medium text-success">92.4%</span>
                  </div>
                  <Progress value={92.4} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-medium text-success">98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-2" />
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-foreground">2,790</div>
                      <div className="text-xs text-muted-foreground">Total Retrievals</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-foreground">47</div>
                      <div className="text-xs text-muted-foreground">Failed Queries</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost & Usage */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Cost & Resource Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">$47.23</div>
                  <div className="text-sm text-muted-foreground">Storage Cost (Monthly)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">$12.48</div>
                  <div className="text-sm text-muted-foreground">Processing Cost (7 days)</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">73%</div>
                  <div className="text-sm text-muted-foreground">Storage Utilization</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">2.1GB</div>
                  <div className="text-sm text-muted-foreground">Memory Usage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}