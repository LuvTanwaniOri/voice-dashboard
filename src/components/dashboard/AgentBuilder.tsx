import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
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
  Edit
} from "lucide-react";

export function AgentBuilder() {
  const [agentName, setAgentName] = useState("Sarah - Lead Qualifier");
  const [selectedVoice, setSelectedVoice] = useState("neural-sarah-us");
  const [selectedLanguages, setSelectedLanguages] = useState(["en-US", "hi-IN"]);

  const voices = [
    { id: "neural-sarah-us", name: "Sarah (Neural)", language: "en-US", gender: "Female" },
    { id: "neural-john-us", name: "John (Neural)", language: "en-US", gender: "Male" },
    { id: "neural-priya-hi", name: "Priya (Neural)", language: "hi-IN", gender: "Female" },
    { id: "neural-arjun-hi", name: "Arjun (Neural)", language: "hi-IN", gender: "Male" },
  ];

  const knowledgePacks = [
    { id: 1, name: "Product Catalog", status: "HOT", size: "18.4 MB", updated: "2 hours ago" },
    { id: 2, name: "Pricing Guidelines", status: "HOT", size: "2.1 MB", updated: "1 day ago" },
    { id: 3, name: "Competitor Analysis", status: "COLD", size: "24.8 MB", updated: "12 days ago" },
    { id: 4, name: "Objection Handling", status: "WARMING", size: "5.3 MB", updated: "3 hours ago" },
  ];

  const tools = [
    { id: "transfer", name: "Transfer Call", enabled: true, description: "Transfer to human agent" },
    { id: "sms", name: "Send SMS", enabled: true, description: "Send follow-up messages" },
    { id: "dtmf", name: "DTMF Input", enabled: true, description: "Navigate IVR systems" },
    { id: "calendar", name: "Schedule Meeting", enabled: false, description: "Book calendar appointments" },
    { id: "api", name: "API Request", enabled: true, description: "Custom webhook calls" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Agent Builder</h1>
          <p className="text-muted-foreground">Configure your voice AI agent's personality and capabilities</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <TestTube className="w-4 h-4" />
            <span>Test Call</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Agent</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="persona" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="persona" className="flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <span>Persona</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Language</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Models</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center space-x-2">
            <Wrench className="w-4 h-4" />
            <span>Tools</span>
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Knowledge</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Compliance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="persona" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="agent-name">Agent Display Name</Label>
                  <Input 
                    id="agent-name" 
                    value={agentName} 
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g., Aarav"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry Context</Label>
                  <Select defaultValue="lead-gen">
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <Label htmlFor="geography">Compliance Geography</Label>
                  <Select defaultValue="US">
                    <SelectTrigger>
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

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span>Etiquette & Formality</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Honorific Style</Label>
                  <Select defaultValue="india">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India (Shri/Smt)</SelectItem>
                      <SelectItem value="western">Western (Mr/Ms)</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Formality Level</Label>
                  <Select defaultValue="formal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Address Fallback</Label>
                  <Select defaultValue="name_gee">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name_gee">Name + "gee"</SelectItem>
                      <SelectItem value="sir_madam">Sir/Madam</SelectItem>
                      <SelectItem value="first_name">First Name Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pronoun Check Policy</Label>
                  <Select defaultValue="on-ambiguous">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on-ambiguous">On Ambiguous</SelectItem>
                      <SelectItem value="always">Always Ask</SelectItem>
                      <SelectItem value="never">Never Ask</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="w-5 h-5 text-primary" />
                  <span>Voice & Style</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Voice</Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger>
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
                <div className="space-y-2">
                  <Label>Communication Style</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="honorifics">Use Honorifics</Label>
                  <Switch id="honorifics" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="pronoun-check">Pronoun Sensitivity</Label>
                  <Switch id="pronoun-check" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>System Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter your agent's system prompt and instructions..."
                className="min-h-[200px]"
                defaultValue="You are Sarah, a professional lead qualification agent for a SaaS company. Your goal is to identify qualified prospects by understanding their budget, authority, need, and timeline. Be conversational, helpful, and respectful. Always ask for permission before asking qualifying questions."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-primary" />
                <span>Multilingual Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Language</Label>
                  <Select defaultValue="en-US">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="hi-IN">Hindi (India)</SelectItem>
                      <SelectItem value="en-IN">English (India)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Supported Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {["en-US", "hi-IN", "en-IN"].map((lang) => (
                      <Badge 
                        key={lang} 
                        variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                        className="cursor-pointer"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Switching Behavior</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Detection Sensitivity</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Min Switch Words</Label>
                      <Input defaultValue="4" type="number" min="1" max="10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Hysteresis (seconds)</Label>
                      <Input defaultValue="25" type="number" min="5" max="60" />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Switches Per Call</Label>
                      <Input defaultValue="2" type="number" min="1" max="5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="announce-switch">Announce Language Switch</Label>
                      <Switch id="announce-switch" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Voice Mapping</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-accent/30 rounded">
                      <span className="text-sm">English (US)</span>
                      <span className="text-sm text-muted-foreground">Sarah (Neural)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-accent/30 rounded">
                      <span className="text-sm">Hindi (India)</span>
                      <span className="text-sm text-muted-foreground">Priya (Neural)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Language Model (LLM)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Provider Policy</Label>
                  <Select defaultValue="quality-first">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quality-first">Quality First</SelectItem>
                      <SelectItem value="cost-first">Cost First</SelectItem>
                      <SelectItem value="latency-first">Latency First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select defaultValue="gpt-4-turbo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3 Sonnet</SelectItem>
                    <SelectItem value="llama-2">Llama 2 70B</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  <div>Cost: $0.03/1K tokens</div>
                  <div>First Token: ~380ms P95</div>
                  <div>Target: ≤400ms</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Text-to-Speech (TTS)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Voice Mapping</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-accent/30 rounded">
                        <span className="text-sm">en-US</span>
                        <Select defaultValue="11L:ArianaEN">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="11L:ArianaEN">11L: Ariana EN</SelectItem>
                            <SelectItem value="Azure:SarahUS">Azure: Sarah US</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-accent/30 rounded">
                        <span className="text-sm">hi-IN</span>
                        <Select defaultValue="Azure:ArianaHI">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Azure:ArianaHI">Azure: Ariana HI</SelectItem>
                            <SelectItem value="11L:PriyaIN">11L: Priya IN</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Crossfade (ms)</Label>
                    <Input defaultValue="180" type="number" min="100" max="500" />
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div>Cost: $0.30/1K chars</div>
                  <div>First Chunk: ~185ms P95</div>
                  <div>Target: ≤200ms</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle>Speech-to-Text (STT)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Provider Policy</Label>
                  <Select defaultValue="quality-first">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quality-first">Quality First</SelectItem>
                      <SelectItem value="cost-first">Cost First</SelectItem>
                      <SelectItem value="latency-first">Latency First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select defaultValue="deepgram">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deepgram">Deepgram Nova-2</SelectItem>
                    <SelectItem value="azure-stt">Azure Speech</SelectItem>
                    <SelectItem value="google-stt">Google Speech-to-Text</SelectItem>
                    <SelectItem value="aws-transcribe">AWS Transcribe</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  <div>Cost: $0.0043/min</div>
                  <div>WER: 8.7% (US EN), 11.2% (Hindi)</div>
                  <div>First Partial: ~235ms P95</div>
                  <div>Target: ≤250ms</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="w-5 h-5 text-primary" />
                <span>Available Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Switch defaultChecked={tool.enabled} />
                      <div>
                        <div className="font-medium text-foreground">{tool.name}</div>
                        <div className="text-sm text-muted-foreground">{tool.description}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Custom Webhooks</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-accent/20 rounded border-2 border-dashed border-border">
                    <span className="text-sm text-muted-foreground">No custom webhooks configured</span>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Webhook
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Knowledge Base Packs</span>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Pack
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {knowledgePacks.map((pack) => (
                  <div key={pack.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">{pack.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {pack.size} • Updated {pack.updated}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={pack.status === "HOT" ? "default" : pack.status === "WARMING" ? "secondary" : "outline"}
                        className={
                          pack.status === "HOT" ? "bg-success/20 text-success" :
                          pack.status === "WARMING" ? "bg-warning/20 text-warning" :
                          "bg-muted/20 text-muted-foreground"
                        }
                      >
                        {pack.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">Knowledge Pack Status</div>
                    <div className="text-muted-foreground mt-1">
                      <strong>HOT:</strong> Ready for use • <strong>WARMING:</strong> Loading into memory • <strong>COLD:</strong> Inactive (15+ days)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>TCPA Compliance (US)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tcpa-disclosure">Auto Disclosure</Label>
                  <Switch id="tcpa-disclosure" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Disclosure Message</Label>
                  <Textarea 
                    placeholder="Enter TCPA disclosure message..."
                    defaultValue="This call may be recorded for quality and training purposes. By continuing, you consent to receive future calls from us."
                    className="h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Opt-out Phrases</Label>
                  <div className="flex flex-wrap gap-2">
                    {["stop calling", "remove me", "do not call", "unsubscribe"].map((phrase) => (
                      <Badge key={phrase} variant="outline" className="cursor-pointer">
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>TRAI Compliance (India)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="trai-disclosure">Auto Disclosure</Label>
                  <Switch id="trai-disclosure" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Disclosure Message (Hindi)</Label>
                  <Textarea 
                    placeholder="Enter TRAI disclosure message in Hindi..."
                    defaultValue="यह कॉल गुणवत्ता और प्रशिक्षण उद्देश्यों के लिए रिकॉर्ड किया जा सकता है।"
                    className="h-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label>DND Respect</Label>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Honor DND Registry</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}