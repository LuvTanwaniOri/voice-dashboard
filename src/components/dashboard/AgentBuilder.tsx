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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Mic,
  MicOff,
  HelpCircle,
  Sparkles,
  Eye
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AgentBuilderProps {
  agentId?: string | null;
  onBack?: () => void;
  isCreating?: boolean;
}

export function AgentBuilder({ agentId, onBack, isCreating }: AgentBuilderProps) {
  const [agentName, setAgentName] = useState("Sarah - Lead Qualifier");
  const [selectedVoice, setSelectedVoice] = useState("neural-sarah-us");
  const [selectedLanguages, setSelectedLanguages] = useState(["en-US", "hi-IN"]);
  const [selectedProvider, setSelectedProvider] = useState("OpenAI");
  const [selectedModel, setSelectedModel] = useState("gpt-4-turbo");
  const [selectedTemplate, setSelectedTemplate] = useState("lead-collection");
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  
  // Brain section text areas
  const [brainSections, setBrainSections] = useState({
    identity: "",
    conversation: "",
    rebuttal: "",
    closing: "",
    compliance: "",
    guardrail: ""
  });

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

  const providers = [
    { 
      id: "OpenAI", 
      name: "OpenAI", 
      models: [
        { id: "gpt-4-turbo", name: "GPT-4 Turbo", cost: "$0.03", latency: "380ms", markers: ["Standard", "Conversational"] },
        { id: "gpt-4", name: "GPT-4", cost: "$0.06", latency: "450ms", markers: ["Premium", "Multimodal"] },
        { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", cost: "$0.001", latency: "280ms", markers: ["Cheapest", "Fastest"] }
      ]
    },
    { 
      id: "Groq", 
      name: "Groq", 
      models: [
        { id: "llama-3-70b", name: "Llama 3 70B", cost: "$0.02", latency: "120ms", markers: ["Fastest", "Open Source"] },
        { id: "mixtral-8x7b", name: "Mixtral 8x7B", cost: "$0.015", latency: "150ms", markers: ["Fast", "Efficient"] }
      ]
    },
    { 
      id: "Anthropic", 
      name: "Anthropic", 
      models: [
        { id: "claude-3-sonnet", name: "Claude 3 Sonnet", cost: "$0.015", latency: "320ms", markers: ["Balanced", "Reasoning"] },
        { id: "claude-3-haiku", name: "Claude 3 Haiku", cost: "$0.008", latency: "250ms", markers: ["Fast", "Concise"] }
      ]
    }
  ];

  const templates = [
    { 
      id: "lead-collection", 
      name: "Lead Collection Sample",
      description: "Perfect for B2B lead qualification and nurturing",
      data: {
        identity: "You are Sarah, a professional and friendly lead qualification agent representing our SaaS company. You have 5+ years of experience in B2B sales and understand the importance of building rapport while efficiently qualifying prospects.",
        conversation: "Start each conversation with a warm greeting and introduce yourself. Ask for the prospect's name and use it throughout the conversation. Listen actively and ask follow-up questions to understand their business needs deeply.",
        rebuttal: "When handling objections, acknowledge the prospect's concerns first. Use the 'Feel, Felt, Found' method: 'I understand how you feel, many of our clients felt the same way, but they found that...' Always provide specific examples and social proof.",
        closing: "Summarize the key pain points discussed and how our solution addresses them. Ask for a clear next step: either a demo, a meeting with decision makers, or a trial. Create urgency by mentioning limited-time offers or competitor risks.",
        compliance: "Always identify yourself and your company at the beginning of the call. Respect opt-out requests immediately. Follow TCPA guidelines for US prospects and TRAI guidelines for Indian prospects. Record consent when required.",
        guardrail: "Never make false claims about pricing or features. Don't commit to delivery timelines without checking with the team. If asked about technical details you're unsure about, admit you'll need to follow up with an expert."
      }
    },
    { 
      id: "customer-service", 
      name: "Customer Service", 
      description: "Handle support inquiries and troubleshooting",
      data: {
        identity: "You are Alex, a patient and knowledgeable customer service representative with 3+ years of experience in technical support. You excel at troubleshooting issues and making customers feel heard and valued.",
        conversation: "Begin with empathy and understanding. Ask clarifying questions to identify the root cause of issues. Guide customers through solutions step-by-step, ensuring they understand each action.",
        rebuttal: "When customers are frustrated, acknowledge their feelings first. Use phrases like 'I understand your frustration' and focus on solutions rather than limitations. Offer alternatives when the primary solution isn't available.",
        closing: "Summarize the resolution provided and confirm the customer's satisfaction. Provide reference numbers for future contact and offer additional assistance if needed.",
        compliance: "Follow data protection guidelines when accessing customer information. Document all interactions accurately and escalate to supervisors when required by company policy.",
        guardrail: "Never promise refunds or discounts without proper authorization. Don't access customer accounts beyond what's necessary for the issue at hand. Always verify customer identity before sharing sensitive information."
      }
    },
    { 
      id: "appointment-setting", 
      name: "Appointment Setting", 
      description: "Schedule meetings and consultations",
      data: {
        identity: "You are Jordan, an efficient and courteous appointment scheduler with 4+ years of experience in calendar management. You're skilled at finding optimal meeting times and managing complex scheduling requirements.",
        conversation: "Start with a clear purpose for the call and respect the prospect's time. Present available time slots clearly and be flexible with scheduling preferences. Confirm all details before ending the call.",
        rebuttal: "When prospects say they're too busy, acknowledge their schedule challenges and offer flexible options like early morning, evening, or brief 15-minute calls. Emphasize the value of the meeting.",
        closing: "Confirm the scheduled appointment with date, time, and duration. Send calendar invites immediately and provide clear instructions for joining the meeting. Set expectations for what will be discussed.",
        compliance: "Respect time zone preferences and confirm appointment details in writing. Honor cancellation requests promptly and maintain accurate scheduling records.",
        guardrail: "Never schedule meetings without clear availability confirmation. Don't commit to agenda items outside your scope of knowledge. Always provide clear cancellation and rescheduling policies."
      }
    }
  ];

  const tools = [
    { id: "transfer", name: "Transfer Call", enabled: true, description: "Transfer to human agent" },
    { id: "sms", name: "Send SMS", enabled: true, description: "Send follow-up messages" },
    { id: "dtmf", name: "DTMF Input", enabled: true, description: "Navigate IVR systems" },
    { id: "calendar", name: "Schedule Meeting", enabled: false, description: "Book calendar appointments" },
    { id: "api", name: "API Request", enabled: true, description: "Custom webhook calls" },
  ];

  const handleSpeechInput = (sectionKey: string, mode: 'replace' | 'append' | 'edit') => {
    setIsRecording(sectionKey);
    // TODO: Implement speech recognition
    console.log(`Starting speech input for ${sectionKey} in ${mode} mode`);
    
    // Simulate speech recognition (replace with actual implementation)
    setTimeout(() => {
      setIsRecording(null);
      console.log("Speech recognition completed");
    }, 3000);
  };

  const applyTemplate = (templateId: string) => {
    if (templateId === "lead-collection") {
      setBrainSections({
        identity: "You are Sarah, a professional and friendly lead qualification agent representing our SaaS company. You have 5+ years of experience in B2B sales and understand the importance of building rapport while efficiently qualifying prospects.",
        conversation: "Start each conversation with a warm greeting and introduce yourself. Ask for the prospect's name and use it throughout the conversation. Listen actively and ask follow-up questions to understand their business needs deeply.",
        rebuttal: "When handling objections, acknowledge the prospect's concerns first. Use the 'Feel, Felt, Found' method: 'I understand how you feel, many of our clients felt the same way, but they found that...' Always provide specific examples and social proof.",
        closing: "Summarize the key pain points discussed and how our solution addresses them. Ask for a clear next step: either a demo, a meeting with decision makers, or a trial. Create urgency by mentioning limited-time offers or competitor risks.",
        compliance: "Always identify yourself and your company at the beginning of the call. Respect opt-out requests immediately. Follow TCPA guidelines for US prospects and TRAI guidelines for Indian prospects. Record consent when required.",
        guardrail: "Never make false claims about pricing or features. Don't commit to delivery timelines without checking with the team. If asked about technical details you're unsure about, admit you'll need to follow up with an expert."
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="text-text-muted hover:text-text-primary hover:bg-surface-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isCreating ? "Create AI Agent" : agentId ? "Edit AI Agent" : "AI Agent Builder"}
            </h1>
            <p className="text-muted-foreground">Configure your voice AI agent's personality and capabilities</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <TestTube className="w-4 h-4" />
            <span>Test Call</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>{isCreating ? "Create Agent" : "Save Changes"}</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="persona" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="persona" className="flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <span>Persona</span>
          </TabsTrigger>
          <TabsTrigger value="brain" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Brain</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Language</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
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
          <TabsTrigger value="voice-lexicon" className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span>Voice & Lexicon</span>
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

        <TabsContent value="brain" className="space-y-6">
          <TooltipProvider>
            {/* Header with Template Reference */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">AI Agent Brain</h2>
                <p className="text-muted-foreground mt-1">Configure your agent's intelligence and behavior patterns</p>
              </div>
              <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Saved Templates for Reference</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Template Reference - {templates.find(t => t.id === selectedTemplate)?.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Label className="text-sm font-medium">Select Template:</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger className="w-64">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {(() => {
                      const template = templates.find(t => t.id === selectedTemplate);
                      return template ? (
                        <div className="space-y-4">
                          {[
                            { key: "identity", title: "Identity & Persona" },
                            { key: "conversation", title: "Conversation Instructions" },
                            { key: "rebuttal", title: "Comprehensive Rebuttal Handling" },
                            { key: "closing", title: "Call Closing" },
                            { key: "compliance", title: "Compliance Rules" },
                            { key: "guardrail", title: "Guardrail" }
                          ].map((section) => (
                            <div key={section.key} className="space-y-2">
                              <h4 className="font-medium text-foreground">{section.title}</h4>
                              <div className="p-3 bg-muted/30 rounded-md text-sm text-muted-foreground">
                                {template.data[section.key as keyof typeof template.data]}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null;
                    })()}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Compact AI Model Selection */}
            <Card className="bg-gradient-card border-border/50 shadow-card mb-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <span>AI Model Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Provider</Label>
                    <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.find(p => p.id === selectedProvider)?.models.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            <div className="flex flex-col">
                              <span>{model.name}</span>
                              <div className="text-xs text-muted-foreground">
                                {model.cost}/1k tokens • First token: {model.latency} P95
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* Categories directly below model selection */}
                    {(() => {
                      const currentModel = providers
                        .find(p => p.id === selectedProvider)
                        ?.models.find(m => m.id === selectedModel);
                      return currentModel ? (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {currentModel.markers.map((marker, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-xs font-medium bg-primary/10 text-primary border-primary/20"
                            >
                              {marker}
                            </Badge>
                          ))}
                        </div>
                      ) : null;
                    })()}
                  </div>
                </div>
                
                {/* Cost and Latency Info */}
                {(() => {
                  const currentModel = providers
                    .find(p => p.id === selectedProvider)
                    ?.models.find(m => m.id === selectedModel);
                  return currentModel ? (
                    <div className="mt-4 p-3 bg-muted/20 rounded-md border border-border/10">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground text-sm">Cost:</span>
                          <span className="font-semibold text-foreground">{currentModel.cost}/1k tokens</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground text-sm">Latency:</span>
                          <span className="font-semibold text-foreground">~{currentModel.latency} P95</span>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </CardContent>
            </Card>

            {/* AI Agent Configuration Sections */}
            <div className="space-y-8">
              {[
                {
                  key: "identity",
                  title: "Identity & Persona", 
                  tooltip: "Define your AI agent's professional background, personality, and role. Be specific about experience level, communication style, and industry expertise. Include details like years of experience, industry knowledge, and personality traits.",
                  icon: <Bot className="w-5 h-5 text-primary" />,
                  placeholder: "Example: You are Sarah, a professional and friendly lead qualification agent representing our SaaS company. You have 5+ years of experience in B2B sales and understand the importance of building rapport while efficiently qualifying prospects..."
                },
                {
                  key: "conversation", 
                  title: "Conversation Instructions",
                  tooltip: "Outline how your agent should structure conversations, handle greetings, build rapport, and guide the flow of dialogue. Include opening lines, question sequences, and conversation pacing.",
                  icon: <Volume2 className="w-5 h-5 text-primary" />,
                  placeholder: "Example: Start each conversation with a warm greeting and introduce yourself. Ask for the prospect's name and use it throughout the conversation. Listen actively and ask follow-up questions to understand their business needs deeply..."
                },
                {
                  key: "rebuttal",
                  title: "Comprehensive Rebuttal Handling", 
                  tooltip: "Provide strategies for handling objections and concerns. Include specific phrases and techniques for overcoming common sales barriers. Use proven frameworks like Feel-Felt-Found method.",
                  icon: <Shield className="w-5 h-5 text-primary" />,
                  placeholder: "Example: When handling objections, acknowledge the prospect's concerns first. Use the 'Feel, Felt, Found' method: 'I understand how you feel, many of our clients felt the same way, but they found that...' Always provide specific examples and social proof..."
                },
                {
                  key: "closing",
                  title: "Call Closing",
                  tooltip: "Define how your agent should wrap up conversations, summarize key points, and secure next steps or commitments. Include techniques for creating urgency and clear call-to-actions.",
                  icon: <TestTube className="w-5 h-5 text-primary" />,
                  placeholder: "Example: Summarize the key pain points discussed and how our solution addresses them. Ask for a clear next step: either a demo, a meeting with decision makers, or a trial. Create urgency by mentioning limited-time offers or competitor risks..."
                },
                {
                  key: "compliance",
                  title: "Compliance Rules", 
                  tooltip: "Set legal and regulatory guidelines your agent must follow, including disclosure requirements and consent protocols. Specify TCPA, TRAI, or other regional compliance needs.",
                  icon: <FileText className="w-5 h-5 text-primary" />,
                  placeholder: "Example: Always identify yourself and your company at the beginning of the call. Respect opt-out requests immediately. Follow TCPA guidelines for US prospects and TRAI guidelines for Indian prospects. Record consent when required..."
                },
                {
                  key: "guardrail",
                  title: "Guardrail",
                  tooltip: "Establish boundaries and limitations for your agent. Define what it should never do or promise to maintain trust and accuracy. Include escalation triggers and safety measures.",
                  icon: <Settings className="w-5 h-5 text-primary" />,
                  placeholder: "Example: Never make false claims about pricing or features. Don't commit to delivery timelines without checking with the team. If asked about technical details you're unsure about, admit you'll need to follow up with an expert..."
                }
              ].map((section) => (
                <Card key={section.key} className="bg-gradient-card border-border/50 shadow-card hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {section.icon}
                        <span className="text-lg font-semibold">{section.title}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0 h-6 w-6 hover:bg-muted">
                              <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm p-4">
                            <p className="text-sm leading-relaxed">{section.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSpeechInput(section.key, 'replace')}
                        disabled={isRecording === section.key}
                        className="flex items-center space-x-2 bg-background hover:bg-muted"
                      >
                        {isRecording === section.key ? (
                          <>
                            <MicOff className="w-4 h-4 text-destructive animate-pulse" />
                            <span className="text-xs text-destructive">Recording...</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4 text-primary" />
                            <span className="text-xs">Speak</span>
                          </>
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder={section.placeholder}
                      className="min-h-[140px] resize-y text-sm leading-relaxed bg-background/50 border-border/60 focus:border-primary/60 focus:bg-background"
                      value={brainSections[section.key as keyof typeof brainSections]}
                      onChange={(e) => setBrainSections(prev => ({
                        ...prev,
                        [section.key]: e.target.value
                      }))}
                      style={{
                        minHeight: '140px',
                        lineHeight: '1.6'
                      }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TooltipProvider>
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

        <TabsContent value="voice-lexicon" className="space-y-6">
          <div className="space-y-6">
            <Tabs defaultValue="lexicon" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lexicon" className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span>TTS Lexicon</span>
                </TabsTrigger>
                <TabsTrigger value="stt-boost" className="flex items-center space-x-2">
                  <span className="w-4 h-4 flex items-center justify-center text-xs">🎧</span>
                  <span>STT Phrase Boost</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lexicon" className="space-y-6">
                {/* Add New Entry */}
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5 text-primary" />
                      <span>Add Pronunciation Entry</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="original">Original Word</Label>
                        <Input id="original" placeholder="e.g., Rohit" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pronunciation">Pronunciation</Label>
                        <Input id="pronunciation" placeholder="e.g., roʊˈhɪt" />
                      </div>
                      <div className="space-y-2">
                        <Label>Format</Label>
                        <Select defaultValue="ipa">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ipa">IPA</SelectItem>
                            <SelectItem value="arpabet">ARPABET</SelectItem>
                            <SelectItem value="respell">Respelling</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end space-x-2">
                        <Button className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          Add Entry
                        </Button>
                        <Button variant="outline" size="icon">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lexicon Entries */}
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="w-5 h-5 text-primary" />
                        <span>Pronunciation Entries</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Import CSV
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg">
                      <div className="grid grid-cols-6 gap-4 p-4 bg-muted/50 font-medium text-sm">
                        <div>Original</div>
                        <div>Pronunciation</div>
                        <div>Format</div>
                        <div>Locale</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y">
                        {[
                          { id: 1, original: "Rohit", pronunciation: "roʊˈhɪt", format: "ipa", locale: "en-US", status: "active" },
                          { id: 2, original: "Shri", pronunciation: "ʃriː", format: "ipa", locale: "en-US", status: "active" },
                          { id: 3, original: "Mumbai", pronunciation: "mʊmˈbaɪ", format: "ipa", locale: "en-US", status: "active" },
                          { id: 4, original: "Lakhs", pronunciation: "L AE K S", format: "arpabet", locale: "en-US", status: "active" }
                        ].map((entry) => (
                          <div key={entry.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                            <div className="font-medium">{entry.original}</div>
                            <div>
                              <code className="bg-accent px-2 py-1 rounded text-sm">
                                {entry.pronunciation}
                              </code>
                            </div>
                            <div>
                              <Badge variant="outline" className="text-xs">
                                {entry.format.toUpperCase()}
                              </Badge>
                            </div>
                            <div>{entry.locale}</div>
                            <div>
                              <Badge variant={entry.status === 'active' ? 'default' : 'secondary'}>
                                {entry.status}
                              </Badge>
                            </div>
                            <div>
                              <div className="flex space-x-1">
                                <Button variant="outline" size="sm">
                                  <Play className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stt-boost" className="space-y-6">
                {/* Add Boost Phrase */}
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5 text-primary" />
                      <span>Add STT Boost Phrase</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="boost-phrase">Phrase</Label>
                        <Input id="boost-phrase" placeholder="e.g., budget range" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Boost Weight</Label>
                        <Select defaultValue="1.5">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1.1">1.1x (Light boost)</SelectItem>
                            <SelectItem value="1.3">1.3x (Medium boost)</SelectItem>
                            <SelectItem value="1.5">1.5x (Strong boost)</SelectItem>
                            <SelectItem value="2.0">2.0x (Maximum boost)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button className="w-full">
                          <Save className="w-4 h-4 mr-2" />
                          Add Phrase
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Boost Phrases */}
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="w-5 h-5 flex items-center justify-center text-lg">🎧</span>
                      <span>STT Boost Phrases</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg">
                      <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 font-medium text-sm">
                        <div>Phrase</div>
                        <div>Weight</div>
                        <div>Locale</div>
                        <div>Actions</div>
                      </div>
                      <div className="divide-y">
                        {[
                          { id: 1, text: "budget range", weight: 1.5, locale: "en-US" },
                          { id: 2, text: "decision maker", weight: 1.3, locale: "en-US" },
                          { id: 3, text: "timeline for implementation", weight: 1.4, locale: "en-US" },
                          { id: 4, text: "not interested", weight: 1.2, locale: "en-US" }
                        ].map((phrase) => (
                          <div key={phrase.id} className="grid grid-cols-4 gap-4 p-4 items-center">
                            <div className="font-medium">{phrase.text}</div>
                            <div>
                              <Badge variant="outline">
                                {phrase.weight}x
                              </Badge>
                            </div>
                            <div>{phrase.locale}</div>
                            <div>
                              <div className="flex space-x-1">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bulk Import */}
                <Card className="bg-gradient-card border-border/50 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="w-5 h-5 text-primary" />
                      <span>Bulk Import Phrases</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bulk-phrases">Phrases (one per line)</Label>
                      <Textarea 
                        id="bulk-phrases"
                        className="min-h-[120px]"
                        placeholder={`budget range
decision maker
timeline for implementation
not interested
qualified lead`}
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="space-y-2">
                        <Label>Default Weight</Label>
                        <Select defaultValue="1.3">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1.1">1.1x</SelectItem>
                            <SelectItem value="1.3">1.3x</SelectItem>
                            <SelectItem value="1.5">1.5x</SelectItem>
                            <SelectItem value="2.0">2.0x</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1 flex justify-end">
                        <Button>
                          <Upload className="w-4 h-4 mr-2" />
                          Import Phrases
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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