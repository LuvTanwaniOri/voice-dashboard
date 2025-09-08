import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Bot, 
  Check, 
  ChevronDown, 
  Upload, 
  Phone, 
  Play, 
  Pause,
  Download,
  Mic,
  Volume2,
  Settings,
  FileText,
  Users,
  Zap,
  Shield,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AgentCreationWizardProps {
  onComplete: (agentData: any) => void;
  onBack: () => void;
}

interface WizardData {
  goal_preset: string;
  use_case_brief: string;
  success_criteria_custom: string;
  success_template: string;
  caller_geographies: string[];
  tts_provider: string;
  tts_voice: string;
  voice_tone: string;
  voice_speed: string;
  knowledge_mode: string;
  knowledge_files: File[];
  handoff_enabled: boolean;
  handoff_rules: string[];
  handoff_method: string;
  handoff_phone: string;
  handoff_sip: string;
  enabled_tools: string[];
  results_destination: string;
  guardrails_text: string;
  test_completed: boolean;
}

const TOTAL_STEPS = 11;

const goals = [
  { value: "lead_qualification", label: "Lead qualification (recommended)", recommended: true },
  { value: "collections", label: "Collections" },
  { value: "survey", label: "Survey / CSAT" },
  { value: "appointment", label: "Appointment setting" },
  { value: "notification", label: "Notification / Reminder" },
  { value: "other", label: "Other (describe)" }
];

const countries = [
  "United States", "India", "United Kingdom", "Canada", "Australia", 
  "Germany", "France", "Spain", "Italy", "Japan", "South Korea", "Singapore"
];

const voices = [
  { id: "aria", name: "Aria", provider: "ElevenLabs", gender: "Female", accent: "American", specialty: "General" },
  { id: "roger", name: "Roger", provider: "ElevenLabs", gender: "Male", accent: "British", specialty: "Professional" },
  { id: "sarah", name: "Sarah", provider: "ElevenLabs", gender: "Female", accent: "American", specialty: "Friendly" },
  { id: "charlie", name: "Charlie", provider: "ElevenLabs", gender: "Male", accent: "American", specialty: "Sales" },
  { id: "emily", name: "Emily", provider: "Azure", gender: "Female", accent: "American", specialty: "Empathetic" }
];

const tools = [
  "Send SMS follow-up",
  "Book calendar", 
  "Update CRM",
  "No tools"
];

export function AgentCreationWizard({ onComplete, onBack }: AgentCreationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTestCallActive, setIsTestCallActive] = useState(false);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false);
  
  const [data, setData] = useState<WizardData>({
    goal_preset: "lead_qualification",
    use_case_brief: "",
    success_criteria_custom: "",
    success_template: "Qualified when budget + authority + timeline confirmed",
    caller_geographies: ["United States", "India"],
    tts_provider: "ElevenLabs (recommended)",
    tts_voice: "aria",
    voice_tone: "Friendly-professional (recommended)",
    voice_speed: "Normal (recommended)",
    knowledge_mode: "built_in",
    knowledge_files: [],
    handoff_enabled: false,
    handoff_rules: [],
    handoff_method: "phone",
    handoff_phone: "",
    handoff_sip: "",
    enabled_tools: ["Send SMS follow-up"],
    results_destination: "dashboard",
    guardrails_text: "",
    test_completed: false
  });

  const updateData = (field: keyof WizardData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    // Generate agent configuration from wizard data
    const agentConfig = {
      id: `agent_${Date.now()}`,
      name: data.use_case_brief.split(' ').slice(0, 3).join(' ') || "New Agent",
      type: "Wizard Created",
      status: "Draft",
      voice: voices.find(v => v.id === data.tts_voice)?.name || "Aria",
      creator: { name: "You", avatar: "" },
      lastEdited: new Date().toLocaleString(),
      wizardData: data,
      createdFromWizard: true
    };
    
    onComplete(agentConfig);
  };

  const renderProgressHeader = () => (
    <div className="bg-surface border-b border-border/50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-text-muted hover:text-text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Button>
          <div className="text-text-muted text-sm">
            Step {currentStep} of {TOTAL_STEPS}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <Bot className="w-8 h-8 text-accent-blue" />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Agent Creation — Express</h1>
            <p className="text-text-secondary">Create your AI agent in just a few simple steps</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
          <div className="flex justify-between text-xs text-text-muted">
            <span>Getting started</span>
            <span>Ready to launch</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Zap className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">What do you want this agent to do?</h2>
                <p className="text-text-secondary">Choose the primary goal for your AI agent</p>
              </div>
              
              <div className="space-y-3">
                {goals.map((goal) => (
                  <div
                    key={goal.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      data.goal_preset === goal.value
                        ? "border-accent-blue bg-accent-blue/5"
                        : "border-border hover:border-border-hover bg-surface-2"
                    }`}
                    onClick={() => updateData('goal_preset', goal.value)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary">{goal.label}</span>
                      {goal.recommended && (
                        <Badge className="bg-success/10 text-success border-success/20">
                          Recommended
                        </Badge>
                      )}
                      {data.goal_preset === goal.value && (
                        <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <FileText className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Describe your use case in detail</h2>
                <p className="text-text-secondary">Help us understand your specific requirements</p>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="use-case" className="text-text-primary font-medium">
                  Detailed Description *
                </Label>
                <Textarea
                  id="use-case"
                  placeholder="Describe your target audience, typical objections, mandatory info to capture, disallowed topics, handoff expectations, and any brand phrasing..."
                  value={data.use_case_brief}
                  onChange={(e) => updateData('use_case_brief', e.target.value)}
                  className="min-h-[120px] bg-surface-2 border-border/50 text-text-primary"
                />
                <div className="bg-surface-2 border border-border/50 rounded-lg p-4">
                  <p className="text-sm text-text-muted mb-2">💡 <strong>Tip:</strong> Include details about:</p>
                  <ul className="text-sm text-text-muted space-y-1 ml-4">
                    <li>• Who will be calling (demographics, pain points)</li>
                    <li>• Common objections you expect</li>
                    <li>• Must-have information to collect</li>
                    <li>• When to transfer to human agents</li>
                    <li>• Your brand voice and messaging guidelines</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <CheckCircle2 className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">What counts as a successful call?</h2>
                <p className="text-text-secondary">Define your success criteria</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    "Qualified when budget + authority + timeline confirmed",
                    "Collections: promise-to-pay scheduled",
                    "Survey completed with all mandatory answers",
                    "Appointment booked and calendar invite sent"
                  ].map((template) => (
                    <div
                      key={template}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        data.success_template === template
                          ? "border-accent-blue bg-accent-blue/5"
                          : "border-border hover:border-border-hover bg-surface-2"
                      }`}
                      onClick={() => updateData('success_template', template)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary">{template}</span>
                        {data.success_template === template && (
                          <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label className="text-text-primary font-medium">Or describe your custom success criteria</Label>
                  <Textarea
                    placeholder="Describe what makes a call successful for your specific use case..."
                    value={data.success_criteria_custom}
                    onChange={(e) => updateData('success_criteria_custom', e.target.value)}
                    className="bg-surface-2 border-border/50 text-text-primary"
                  />
                </div>
              </div>
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Users className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Where are most of your callers located?</h2>
                <p className="text-text-secondary">Select all regions that apply</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {countries.map((country) => (
                  <div
                    key={country}
                    className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                      data.caller_geographies.includes(country)
                        ? "border-accent-blue bg-accent-blue/5"
                        : "border-border hover:border-border-hover bg-surface-2"
                    }`}
                    onClick={() => {
                      const current = data.caller_geographies;
                      if (current.includes(country)) {
                        updateData('caller_geographies', current.filter(c => c !== country));
                      } else {
                        updateData('caller_geographies', [...current, country]);
                      }
                    }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-text-primary text-sm">{country}</span>
                      {data.caller_geographies.includes(country) && (
                        <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-text-muted">
                  Selected: {data.caller_geographies.length} regions
                </p>
              </div>
            </div>
          </Card>
        );

      case 5:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Volume2 className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Choose the agent's voice</h2>
                <p className="text-text-secondary">Select a voice that matches your brand</p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-text-primary font-medium mb-2 block">Provider</Label>
                    <Select value={data.tts_provider} onValueChange={(value) => updateData('tts_provider', value)}>
                      <SelectTrigger className="bg-surface-2 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-surface border-border/50">
                        <SelectItem value="ElevenLabs (recommended)">ElevenLabs (recommended)</SelectItem>
                        <SelectItem value="Azure Neural">Azure Neural</SelectItem>
                        <SelectItem value="Amazon Polly">Amazon Polly</SelectItem>
                        <SelectItem value="Google TTS">Google TTS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-text-primary font-medium mb-2 block">Speaking Speed</Label>
                    <Select value={data.voice_speed} onValueChange={(value) => updateData('voice_speed', value)}>
                      <SelectTrigger className="bg-surface-2 border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-surface border-border/50">
                        <SelectItem value="Normal (recommended)">Normal (recommended)</SelectItem>
                        <SelectItem value="Slower">Slower</SelectItem>
                        <SelectItem value="Faster">Faster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label className="text-text-primary font-medium mb-3 block">Voice Selection</Label>
                  <div className="grid gap-3">
                    {voices.slice(0, 3).map((voice) => (
                      <div
                        key={voice.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          data.tts_voice === voice.id
                            ? "border-accent-blue bg-accent-blue/5"
                            : "border-border hover:border-border-hover bg-surface-2"
                        }`}
                        onClick={() => updateData('tts_voice', voice.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-accent-blue/10 rounded-full flex items-center justify-center">
                              {voice.gender === 'Female' ? '👩' : '👨'}
                            </div>
                            <div>
                              <div className="font-medium text-text-primary">{voice.name}</div>
                              <div className="text-sm text-text-muted">
                                {voice.gender} • {voice.accent} • {voice.specialty}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="text-text-muted hover:text-text-primary">
                              <Play className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                            {data.tts_voice === voice.id && (
                              <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full mt-3 text-text-muted hover:text-text-primary border-border/50"
                    onClick={() => setShowVoiceSelector(true)}
                  >
                    Browse More Voices ({voices.length - 3} more available)
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );

      // Continue with remaining steps...
      case 6:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <FileText className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Should the agent use any reference material?</h2>
                <p className="text-text-secondary">Add knowledge to help your agent provide better responses</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  {[
                    { value: "built_in", label: "Use built-in script only (recommended quick start)", recommended: true },
                    { value: "upload", label: "Attach documents/FAQs now" }
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        data.knowledge_mode === option.value
                          ? "border-accent-blue bg-accent-blue/5"
                          : "border-border hover:border-border-hover bg-surface-2"
                      }`}
                      onClick={() => updateData('knowledge_mode', option.value)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary">{option.label}</span>
                        <div className="flex items-center space-x-2">
                          {option.recommended && (
                            <Badge className="bg-success/10 text-success border-success/20">
                              Recommended
                            </Badge>
                          )}
                          {data.knowledge_mode === option.value && (
                            <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {data.knowledge_mode === "upload" && (
                  <div className="mt-6 p-6 border-2 border-dashed border-border rounded-lg text-center">
                    <Upload className="w-8 h-8 text-text-muted mx-auto mb-2" />
                    <p className="text-text-primary font-medium mb-1">Upload Documents</p>
                    <p className="text-text-muted text-sm mb-4">
                      Support for PDF, DOC, TXT files up to 10MB each
                    </p>
                    <Button variant="outline" className="text-text-muted hover:text-text-primary">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );

      case 7:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Phone className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">When should we transfer to a human?</h2>
                <p className="text-text-secondary">Configure human handoff rules (optional)</p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-surface-2 rounded-lg">
                  <div>
                    <div className="font-medium text-text-primary">Enable Human Handoff</div>
                    <div className="text-sm text-text-muted">Allow transfers to human agents when needed</div>
                  </div>
                  <Switch
                    checked={data.handoff_enabled}
                    onCheckedChange={(checked) => updateData('handoff_enabled', checked)}
                  />
                </div>
                
                {data.handoff_enabled && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-text-primary font-medium mb-3 block">Transfer Conditions</Label>
                      <div className="space-y-2">
                        {[
                          "When the caller asks",
                          "When success criteria are met",
                          "If the caller sounds frustrated or confused"
                        ].map((rule) => (
                          <div key={rule} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={data.handoff_rules.includes(rule)}
                              onChange={(e) => {
                                const current = data.handoff_rules;
                                if (e.target.checked) {
                                  updateData('handoff_rules', [...current, rule]);
                                } else {
                                  updateData('handoff_rules', current.filter(r => r !== rule));
                                }
                              }}
                              className="rounded border-border"
                            />
                            <span className="text-text-primary text-sm">{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-text-primary font-medium mb-2 block">Transfer Method</Label>
                      <Select value={data.handoff_method} onValueChange={(value) => updateData('handoff_method', value)}>
                        <SelectTrigger className="bg-surface-2 border-border/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-surface border-border/50">
                          <SelectItem value="phone">Phone number (PSTN)</SelectItem>
                          <SelectItem value="sip">SIP transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {data.handoff_method === "phone" && (
                      <div>
                        <Label className="text-text-primary font-medium mb-2 block">Phone Number</Label>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          value={data.handoff_phone}
                          onChange={(e) => updateData('handoff_phone', e.target.value)}
                          className="bg-surface-2 border-border/50"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );

      case 8:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Settings className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">What tools can the agent use during the call?</h2>
                <p className="text-text-secondary">Enable additional capabilities for your agent</p>
              </div>
              
              <div className="space-y-3">
                {tools.map((tool) => (
                  <div
                    key={tool}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      data.enabled_tools.includes(tool)
                        ? "border-accent-blue bg-accent-blue/5"
                        : "border-border hover:border-border-hover bg-surface-2"
                    }`}
                    onClick={() => {
                      const current = data.enabled_tools;
                      if (tool === "No tools") {
                        updateData('enabled_tools', current.includes(tool) ? [] : [tool]);
                      } else {
                        if (current.includes(tool)) {
                          updateData('enabled_tools', current.filter(t => t !== tool));
                        } else {
                          updateData('enabled_tools', [...current.filter(t => t !== "No tools"), tool]);
                        }
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">{tool}</span>
                      {data.enabled_tools.includes(tool) && (
                        <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-text-muted">
                  Selected: {data.enabled_tools.length} tools
                </p>
              </div>
            </div>
          </Card>
        );

      case 9:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Download className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Where should we send call results and summaries?</h2>
                <p className="text-text-secondary">Choose how to receive your call data</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: "dashboard", label: "Keep in dashboard only (recommended)", recommended: true },
                  { value: "crm", label: "CRM (e.g., Salesforce/GHL)" },
                  { value: "webhook", label: "Zapier or n8n webhook" }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      data.results_destination === option.value
                        ? "border-accent-blue bg-accent-blue/5"
                        : "border-border hover:border-border-hover bg-surface-2"
                    }`}
                    onClick={() => updateData('results_destination', option.value)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">{option.label}</span>
                      <div className="flex items-center space-x-2">
                        {option.recommended && (
                          <Badge className="bg-success/10 text-success border-success/20">
                            Recommended
                          </Badge>
                        )}
                        {data.results_destination === option.value && (
                          <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );

      case 10:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Shield className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Anything the agent must never say or do?</h2>
                <p className="text-text-secondary">Set guardrails and restrictions (optional)</p>
              </div>
              
              <div className="space-y-4">
                <Label className="text-text-primary font-medium">Guardrails and Restrictions</Label>
                <Textarea
                  placeholder="e.g., Don't discuss pricing; always use Shri/Smt forms of address; never make promises about delivery dates..."
                  value={data.guardrails_text}
                  onChange={(e) => updateData('guardrails_text', e.target.value)}
                  className="min-h-[100px] bg-surface-2 border-border/50 text-text-primary"
                />
                <div className="bg-surface-2 border border-border/50 rounded-lg p-4">
                  <p className="text-sm text-text-muted mb-2">💡 <strong>Examples of good guardrails:</strong></p>
                  <ul className="text-sm text-text-muted space-y-1 ml-4">
                    <li>• "Never quote specific prices without manager approval"</li>
                    <li>• "Always address customers formally (Mr./Ms.)"</li>
                    <li>• "Don't make commitments about technical implementation"</li>
                    <li>• "Transfer immediately if legal questions arise"</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        );

      case 11:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Mic className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Run a 60-second test call to verify</h2>
                <p className="text-text-secondary">Test your agent before going live</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-surface-2 border border-border/50 rounded-lg p-6 text-center">
                  {!data.test_completed ? (
                    <>
                      <div className="mb-4">
                        <div className="w-16 h-16 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Phone className="w-8 h-8 text-accent-blue" />
                        </div>
                        <h3 className="font-medium text-text-primary mb-2">Ready to test your agent?</h3>
                        <p className="text-text-muted text-sm">
                          We'll call you to test the agent's responses and performance
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <Button
                          className="bg-accent-blue hover:bg-accent-blue-hover text-white"
                          onClick={() => {
                            setIsTestCallActive(true);
                            setTimeout(() => {
                              setIsTestCallActive(false);
                              updateData('test_completed', true);
                            }, 3000);
                          }}
                          disabled={isTestCallActive}
                        >
                          {isTestCallActive ? (
                            <>
                              <Mic className="w-4 h-4 mr-2 animate-pulse" />
                              Testing in progress...
                            </>
                          ) : (
                            <>
                              <Phone className="w-4 h-4 mr-2" />
                              Start Test Call (recommended)
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => updateData('test_completed', true)}
                          className="block mx-auto text-text-muted hover:text-text-primary"
                        >
                          Skip for now
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-3" />
                      <h3 className="font-medium text-text-primary mb-2">Test completed successfully!</h3>
                      <p className="text-text-muted text-sm mb-4">
                        Your agent is ready to handle real calls
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-text-primary font-medium">Response Time</div>
                          <div className="text-success">1.2s avg</div>
                        </div>
                        <div>
                          <div className="text-text-primary font-medium">Voice Quality</div>
                          <div className="text-success">Excellent</div>
                        </div>
                        <div>
                          <div className="text-text-primary font-medium">Accuracy</div>
                          <div className="text-success">94%</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={handleComplete}
                    disabled={!data.test_completed && !isTestCallActive}
                    className="bg-success hover:bg-success-hover text-white px-8 py-3 text-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Complete Agent Setup
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderProgressHeader()}
      
      <div className="max-w-4xl mx-auto py-8 px-6">
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="text-text-muted hover:text-text-primary border-border/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < TOTAL_STEPS && (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 2 && !data.use_case_brief.trim()) ||
                (currentStep === 4 && data.caller_geographies.length === 0)
              }
              className="bg-accent-blue hover:bg-accent-blue-hover text-white"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}