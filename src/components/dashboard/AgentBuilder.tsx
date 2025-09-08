import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { 
  Bot, 
  Settings, 
  Globe, 
  Volume2, 
  Brain, 
  Wrench,
  FileText,
  Shield,
  TestTube,
  Save,
  Play,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  Upload,
  Download,
  CheckCircle,
  Mic,
  BookOpen,
  Sliders,
  User
} from "lucide-react";

interface AgentBuilderProps {
  agentId?: string | null;
  onBack?: () => void;
  isCreating?: boolean;
}

const agentTabs = [
  { id: 'persona', name: 'Agent Persona', icon: Bot, description: 'Configure basic agent information and personality' },
  { id: 'language', name: 'Language & Region', icon: Globe, description: 'Set up multilingual support and regional settings' },
  { id: 'models', name: 'AI Models', icon: Brain, description: 'Choose and configure AI models for different capabilities' },
  { id: 'tools', name: 'Tools & Actions', icon: Wrench, description: 'Enable tools and integrations for your agent' },
  { id: 'knowledge', name: 'Knowledge Base', icon: FileText, description: 'Upload and manage agent knowledge sources' },
  { id: 'voice-lexicon', name: 'Voice & Pronunciation', icon: Volume2, description: 'Customize voice settings and pronunciation' },
  { id: 'compliance', name: 'Compliance & Safety', icon: Shield, description: 'Configure compliance rules and safety measures' }
];

export function AgentBuilder({ agentId, onBack, isCreating }: AgentBuilderProps) {
  const [activeTab, setActiveTab] = useState("persona");
  const [agentName, setAgentName] = useState("Sarah - Lead Qualifier");
  const [selectedVoice, setSelectedVoice] = useState("neural-sarah-us");
  const [selectedLanguages, setSelectedLanguages] = useState(["en-US", "hi-IN"]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const voices = [
    { id: "neural-sarah-us", name: "Sarah (Neural)", language: "en-US", gender: "Female", accent: "American" },
    { id: "neural-john-us", name: "John (Neural)", language: "en-US", gender: "Male", accent: "American" },
    { id: "neural-priya-hi", name: "Priya (Neural)", language: "hi-IN", gender: "Female", accent: "Indian" },
    { id: "neural-arjun-hi", name: "Arjun (Neural)", language: "hi-IN", gender: "Male", accent: "Indian" },
  ];

  const knowledgePacks = [
    { id: 1, name: "Product Catalog", status: "HOT", size: "18.4 MB", updated: "2 hours ago" },
    { id: 2, name: "Pricing Guidelines", status: "HOT", size: "2.1 MB", updated: "1 day ago" },
    { id: 3, name: "Competitor Analysis", status: "COLD", size: "24.8 MB", updated: "12 days ago" },
    { id: 4, name: "Objection Handling", status: "WARMING", size: "5.3 MB", updated: "3 hours ago" },
  ];

  const tools = [
    { id: "transfer", name: "Transfer Call", enabled: true, description: "Transfer to human agent when needed" },
    { id: "sms", name: "Send SMS", enabled: true, description: "Send follow-up messages after calls" },
    { id: "dtmf", name: "DTMF Input", enabled: true, description: "Navigate IVR systems" },
    { id: "calendar", name: "Schedule Meeting", enabled: false, description: "Book calendar appointments" },
    { id: "api", name: "API Request", enabled: true, description: "Custom webhook calls to your systems" },
  ];

  const pronunciationEntries = [
    { word: "Amdocs", pronunciation: "am-DAWKS", type: "Company" },
    { word: "Gujarat", pronunciation: "goo-juh-RAHT", type: "Location" },
    { word: "Mihir", pronunciation: "mee-HEER", type: "Name" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "persona":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold">Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="agent-name" className="text-sm font-medium text-text-primary">Agent Display Name</Label>
                    <Input 
                      id="agent-name" 
                      value={agentName} 
                      onChange={(e) => setAgentName(e.target.value)}
                      placeholder="e.g., Aarav"
                      className="h-12 bg-surface-2/50 border-border/60 focus:border-primary transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="industry" className="text-sm font-medium text-text-primary">Industry Context</Label>
                    <Select defaultValue="lead-gen">
                      <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead-gen">Lead Generation</SelectItem>
                        <SelectItem value="collections">Collections</SelectItem>
                        <SelectItem value="customer-service">Customer Service</SelectItem>
                        <SelectItem value="surveys">Surveys & Research</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="geography" className="text-sm font-medium text-text-primary">Compliance Geography</Label>
                    <Select defaultValue="US">
                      <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States (TCPA)</SelectItem>
                        <SelectItem value="IN">India (TRAI)</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold">Etiquette & Formality</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-text-primary">Honorific Style</Label>
                    <Select defaultValue="india">
                      <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="india">India (Shri/Smt)</SelectItem>
                        <SelectItem value="western">Western (Mr/Ms)</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-text-primary">Formality Level</Label>
                    <Select defaultValue="formal">
                      <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-text-primary">Communication Style</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warm">Warm & Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">System Prompt</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your agent's system prompt and instructions..."
                  className="min-h-[200px] bg-surface-2/30 border-border/60 focus:border-primary transition-all duration-300"
                  defaultValue="You are Sarah, a professional lead qualification agent for a SaaS company. Your goal is to identify qualified prospects by understanding their budget, authority, need, and timeline. Be conversational, helpful, and respectful. Always ask for permission before asking qualifying questions."
                />
              </CardContent>
            </Card>
          </div>
        );

      case "language":
        return (
          <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg font-semibold">Multilingual Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-text-primary">Default Language</Label>
                    <Select defaultValue="en-US">
                      <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="hi-IN">Hindi (India)</SelectItem>
                        <SelectItem value="en-IN">English (India)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-text-primary">Supported Languages</Label>
                    <div className="flex flex-wrap gap-2">
                      {["en-US", "hi-IN", "en-IN"].map((lang) => (
                        <Badge 
                          key={lang} 
                          variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                          className="cursor-pointer px-3 py-1 text-sm transition-all duration-200 hover:scale-105"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-semibold text-text-primary flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-primary" />
                    <span>Detection Settings</span>
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-text-primary">Detection Sensitivity</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-text-primary">Min Switch Words</Label>
                        <Input defaultValue="4" type="number" min="1" max="10" className="h-12 bg-surface-2/50 border-border/60" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-text-primary">Max Switches</Label>
                        <Input defaultValue="2" type="number" min="1" max="5" className="h-12 bg-surface-2/50 border-border/60" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "voice-lexicon":
        return (
          <div className="space-y-8">
            <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Volume2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">Voice Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-text-primary">Primary Voice</Label>
                      <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {voices.map((voice) => (
                            <SelectItem key={voice.id} value={voice.id}>
                              {voice.name} ({voice.language}) - {voice.gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-text-primary">Voice Preview</h4>
                      <div className="space-y-3">
                        {voices.filter(v => v.id === selectedVoice).map((voice) => (
                          <div key={voice.id} className="p-4 bg-surface-2/30 rounded-lg border border-border/40">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h5 className="font-medium text-text-primary">{voice.name}</h5>
                                <p className="text-sm text-text-muted">{voice.gender} • {voice.accent} Accent</p>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsPlaying(isPlaying === voice.id ? null : voice.id)}
                                className="flex items-center space-x-2"
                              >
                                <Play className="w-4 h-4" />
                                <span>{isPlaying === voice.id ? "Stop" : "Preview"}</span>
                              </Button>
                            </div>
                            <p className="text-sm text-text-muted italic">
                              "Hello, this is {voice.name.split(' ')[0]}. I'm calling to help you with your inquiry today."
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-text-primary">Voice Settings</h4>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-text-primary">Speaking Speed</Label>
                          <Select defaultValue="normal">
                            <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="slow">Slower</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="fast">Faster</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-text-primary">Voice Stability</Label>
                          <Select defaultValue="balanced">
                            <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="consistent">More Consistent</SelectItem>
                              <SelectItem value="balanced">Balanced</SelectItem>
                              <SelectItem value="expressive">More Expressive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-medium text-text-primary">Similarity Enhancement</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger className="h-12 bg-surface-2/50 border-border/60">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mic className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold">Pronunciation Dictionary</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Entry</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pronunciationEntries.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-2/30 rounded-lg border border-border/40">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <p className="font-medium text-text-primary">{entry.word}</p>
                            <p className="text-sm text-text-muted">/{entry.pronunciation}/</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {entry.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "models":
        return (
          <div className="space-y-8">
            <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">AI Model Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <p>Configure AI Models here</p>
              </CardContent>
            </Card>
          </div>
        );

      case "tools":
        return (
          <div className="space-y-8">
            <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">Tools & Integrations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {tools.map((tool) => (
                    <div key={tool.id} className="flex items-center justify-between p-4 bg-surface-2/30 rounded-lg border border-border/40">
                      <div className="flex-1">
                        <p className="font-medium text-text-primary">{tool.name}</p>
                        <p className="text-sm text-text-muted">{tool.description}</p>
                      </div>
                      <Switch id={tool.id} defaultChecked={tool.enabled} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "knowledge":
        return (
          <div className="space-y-8">
            <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-semibold">Knowledge Base</span>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Pack</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {knowledgePacks.map((pack) => (
                    <div key={pack.id} className="flex items-center justify-between p-4 bg-surface-2/30 rounded-lg border border-border/40">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <p className="font-medium text-text-primary">{pack.name}</p>
                            <p className="text-sm text-text-muted">{pack.size} • Updated {pack.updated}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {pack.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "compliance":
        return (
          <div className="space-y-8">
            <Card className="bg-gradient-subtle border-border/40 shadow-elegant backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">Compliance & Safety</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <p>Configure Compliance settings here</p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <div className="text-center py-12 text-text-muted">Select a tab to configure your agent</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/30 to-surface-2/50">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-80 bg-surface/80 backdrop-blur-md border-r border-border/50 min-h-screen shadow-elegant">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center space-x-4">
              {onBack && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onBack}
                  className="text-text-muted hover:text-text-primary hover:bg-surface-2/50"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {isCreating ? "Create Agent" : agentId ? "Edit Agent" : "Agent Builder"}
                </h1>
                <p className="text-sm text-text-muted">Configure your voice AI agent</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            {agentTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-start space-x-4 p-4 rounded-xl text-left transition-all duration-300 group",
                    isActive
                      ? "bg-primary/10 border border-primary/20 shadow-glow/20 scale-[1.02]"
                      : "hover:bg-surface-2/50 hover:scale-[1.01]"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-colors duration-300",
                    isActive 
                      ? "bg-primary text-white shadow-glow/30" 
                      : "bg-surface-2/50 text-text-muted group-hover:bg-primary/20 group-hover:text-primary"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-semibold transition-colors duration-300",
                      isActive ? "text-primary" : "text-text-primary group-hover:text-primary"
                    )}>
                      {tab.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {tab.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-4 mt-6 border-t border-border/50">
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1 h-12 text-sm">
                <TestTube className="w-4 h-4 mr-2" />
                Test Call
              </Button>
              <Button className="flex-1 h-12 text-sm">
                <Save className="w-4 h-4 mr-2" />
                {isCreating ? "Create" : "Save"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
