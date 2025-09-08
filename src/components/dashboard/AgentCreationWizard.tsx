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
  agent_name: string;
  agent_gender: string;
  goal_preset: string;
  custom_goal: string;
  use_case_brief: string;
  success_criteria_custom: string;
  caller_geographies: string[];
  knowledge_mode: string;
  knowledge_files: File[];
  handoff_enabled: boolean;
  handoff_rules: string[];
  handoff_custom_rule: string;
  handoff_method: string;
  handoff_phone: string;
  handoff_sip: string;
  enabled_tools: string[];
  results_destination: string;
  guardrails_text: string;
  test_completed: boolean;
}

const TOTAL_STEPS = 10;

const goals = [
  { value: "lead_qualification", label: "Lead qualification" },
  { value: "collections", label: "Collections" },
  { value: "survey", label: "Survey / CSAT" },
  { value: "appointment", label: "Appointment setting" },
  { value: "notification", label: "Notification / Reminder" },
  { value: "other", label: "Other" }
];

const useCaseTemplates = [
  {
    title: "Lead Qualification",
    description: "Perfect for qualifying potential customers and identifying sales-ready prospects",
    details: "Target high-intent prospects who have shown interest in your product/service. The agent will assess budget, authority, need, and timeline (BANT criteria). Common objections include price concerns, timing issues, and decision-maker availability. Mandatory information to capture: contact details, budget range, decision timeline, current solution, pain points. Brand voice should be professional yet approachable, focusing on value proposition and building trust."
  },
  {
    title: "Collections",
    description: "Designed for debt collection and payment reminder calls",
    details: "Target customers with overdue payments or outstanding balances. The agent will work to secure payment commitments and arrange payment plans. Common objections include financial hardship, disputed charges, and payment method issues. Mandatory information: payment amount, due date, preferred payment method, contact verification. Brand voice should be firm but respectful, compliant with FDCPA regulations, and focused on finding mutually acceptable solutions."
  },
  {
    title: "Survey / CSAT",
    description: "Ideal for customer satisfaction surveys and feedback collection",
    details: "Target existing customers to gather feedback on products, services, or experiences. The agent will guide customers through structured questionnaires while maintaining engagement. Common objections include time constraints and privacy concerns. Mandatory information: customer identification, completion of all required questions, satisfaction scores. Brand voice should be appreciative, concise, and focused on the value of customer feedback."
  },
  {
    title: "Appointment Setting", 
    description: "Optimized for scheduling meetings and consultations",
    details: "Target prospects interested in consultations, demos, or sales meetings. The agent will find mutually convenient times and handle calendar coordination. Common objections include scheduling conflicts, preference for email communication, and hesitation to commit time. Mandatory information: preferred dates/times, meeting type, contact details, calendar integration. Brand voice should be accommodating, professional, and focused on the value of the meeting."
  }
];

const successTemplates = [
  {
    title: "Lead Qualification Success",
    criteria: "Prospect confirms budget availability ($X+ range), has decision-making authority or direct access to decision maker, expresses clear need for solution, and provides realistic timeline (within 6 months). Contact information verified and follow-up appointment scheduled."
  },
  {
    title: "Collections Success", 
    criteria: "Customer acknowledges debt, commits to specific payment amount and date, provides valid payment method, and confirms contact information. Payment arrangement documented and follow-up scheduled if needed."
  },
  {
    title: "Survey Success",
    criteria: "All mandatory questions answered completely, satisfaction scores provided on required scales, additional feedback captured where applicable, and customer expresses appreciation for the opportunity to provide input."
  },
  {
    title: "Appointment Success",
    criteria: "Meeting scheduled for specific date and time, calendar invite sent and acknowledged, meeting type and agenda confirmed, all required attendees identified, and confirmation details provided to prospect."
  }
];

const guardrailsTemplates = [
  {
    title: "General Business Compliance",
    description: "Standard compliance and professional conduct guidelines",
    details: "Never discuss competitor pricing or make negative comparisons. Always maintain professional tone and avoid casual language. Do not make promises about specific outcomes or guarantees. Respect Do Not Call lists and honor opt-out requests immediately. Never request sensitive information like SSN, passwords, or full credit card numbers. Maintain TCPA compliance for all communications."
  },
  {
    title: "Healthcare/Medical Restrictions",
    description: "HIPAA-compliant guidelines for healthcare-related communications", 
    details: "Never discuss specific medical conditions, treatments, or diagnoses. Do not provide medical advice or interpretations of health information. Avoid scheduling for emergency or urgent medical situations. Always verify patient identity before discussing any health-related information. Maintain strict confidentiality and never share patient information across calls."
  },
  {
    title: "Financial Services Compliance",
    description: "Banking and financial industry compliance guidelines",
    details: "Never provide specific financial advice or investment recommendations. Do not discuss account balances, transaction details, or credit scores unless properly authenticated. Avoid making promises about loan approvals, interest rates, or specific terms. Always disclose any fees or charges associated with services. Maintain SOX compliance and follow anti-money laundering protocols."
  },
  {
    title: "Sales Ethics Guidelines", 
    description: "Ethical sales practices and customer protection",
    details: "Never use high-pressure tactics or create false urgency. Do not misrepresent product features, pricing, or availability. Always provide accurate information about contracts, cancellation policies, and terms. Respect customer budget constraints and do not push beyond stated limits. Honor all promotional offers and pricing as advertised."
  }
];

const popularRegions = [
  "United States", "India", "United Kingdom", "Canada", "Australia"
];

const allCountries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria",
  "Canada", "Chile", "China", "Colombia", "Croatia", "Czech Republic", "Denmark", "Ecuador", "Egypt",
  "Estonia", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "South Korea", "Kuwait", "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Malaysia", "Mexico", "Morocco",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Saudi Arabia", "Singapore", "Slovakia", "Slovenia", "South Africa", "Spain",
  "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Venezuela", "Vietnam"
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
  
  const [data, setData] = useState<WizardData>({
    agent_name: "",
    agent_gender: "female",
    goal_preset: "lead_qualification", 
    custom_goal: "",
    use_case_brief: "",
    success_criteria_custom: "",
    caller_geographies: ["United States"],
    knowledge_mode: "built_in",
    knowledge_files: [],
    handoff_enabled: false,
    handoff_rules: [],
    handoff_custom_rule: "",
    handoff_method: "phone",
    handoff_phone: "",
    handoff_sip: "",
    enabled_tools: ["Send SMS follow-up"],
    results_destination: "dashboard",
    guardrails_text: "",
    test_completed: false
  });

  const [regionSearch, setRegionSearch] = useState("");
  const [showUseCaseTemplates, setShowUseCaseTemplates] = useState(false);
  const [showSuccessTemplates, setShowSuccessTemplates] = useState(false);
  const [showGuardrailsTemplates, setShowGuardrailsTemplates] = useState(false);
  const [selectedUseCaseTemplate, setSelectedUseCaseTemplate] = useState<any>(null);
  const [selectedSuccessTemplate, setSelectedSuccessTemplate] = useState<any>(null);
  const [selectedGuardrailsTemplate, setSelectedGuardrailsTemplate] = useState<any>(null);

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

  const filteredCountries = allCountries.filter(country =>
    country.toLowerCase().includes(regionSearch.toLowerCase())
  );

  const handleComplete = () => {
    // Generate agent configuration from wizard data
    const agentConfig = {
      id: `agent_${Date.now()}`,
      name: data.agent_name || "New Agent",
      type: "Wizard Created",
      status: "Draft",
      voice: data.agent_gender === "female" ? "Aria" : "Roger", // Auto-select based on gender
      creator: { name: "You", avatar: "" },
      lastEdited: new Date().toLocaleString(),
      wizardData: data,
      createdFromWizard: true
    };
    
    onComplete(agentConfig);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return data.agent_name.trim().length > 0;
      case 2: return data.goal_preset !== "other" ? true : data.custom_goal.trim().length > 0;
      case 3: return data.use_case_brief.trim().length > 0;
      case 4: return data.success_criteria_custom.trim().length > 0;
      case 5: return data.caller_geographies.length > 0;
      case 6: return true; // Knowledge is optional
      case 7: return true; // Handoff is optional
      case 8: return true; // Tools have defaults
      case 9: return true; // Results have defaults
      case 10: return true; // Guardrails are optional
      default: return true;
    }
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
                <Bot className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Let's create your agent</h2>
                <p className="text-text-secondary">First, tell us the basic details about your agent</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="agent-name" className="text-text-primary font-medium">
                    Agent Name *
                  </Label>
                  <Input
                    id="agent-name"
                    placeholder="e.g. Sales Assistant, Lead Qualifier"
                    value={data.agent_name}
                    onChange={(e) => updateData('agent_name', e.target.value)}
                    className="bg-surface-2 border-border/50 text-text-primary"
                  />
                </div>
                
                <div>
                  <Label className="text-text-primary font-medium mb-3 block">Agent Gender</Label>
                  <Select value={data.agent_gender} onValueChange={(value) => updateData('agent_gender', value)}>
                    <SelectTrigger className="bg-surface-2 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-surface border-border/50">
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>
        );

      case 2:
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
                  <div key={goal.value}>
                    {goal.value !== "other" ? (
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          data.goal_preset === goal.value
                            ? "border-accent-blue bg-accent-blue/5"
                            : "border-border hover:border-border-hover bg-surface-2"
                        }`}
                        onClick={() => updateData('goal_preset', goal.value)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-text-primary">{goal.label}</span>
                          {data.goal_preset === goal.value && (
                            <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            data.goal_preset === goal.value
                              ? "border-accent-blue bg-accent-blue/5"
                              : "border-border hover:border-border-hover bg-surface-2"
                          }`}
                          onClick={() => updateData('goal_preset', goal.value)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-text-primary">{goal.label}</span>
                            {data.goal_preset === goal.value && (
                              <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                            )}
                          </div>
                        </div>
                        {data.goal_preset === "other" && (
                          <Textarea
                            placeholder="Describe your specific use case..."
                            value={data.custom_goal}
                            onChange={(e) => updateData('custom_goal', e.target.value)}
                            className="bg-surface-2 border-border/50 text-text-primary"
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <FileText className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Describe your use case in detail</h2>
                <p className="text-text-secondary">Help us understand your specific requirements</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="use-case" className="text-text-primary font-medium">
                    Detailed Description *
                  </Label>
                  <Dialog open={showUseCaseTemplates} onOpenChange={setShowUseCaseTemplates}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-text-muted hover:text-text-primary">
                        <FileText className="w-4 h-4 mr-2" />
                        View Templates
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-surface border-border/50">
                      <DialogHeader>
                        <DialogTitle className="text-text-primary">Use Case Templates</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {useCaseTemplates.map((template, index) => (
                          <div key={index} className="space-y-2">
                            <div
                              className="p-4 border border-border/50 rounded-lg cursor-pointer hover:border-accent-blue bg-surface-2"
                              onClick={() => {
                                setSelectedUseCaseTemplate(template);
                                updateData('use_case_brief', template.details);
                                setShowUseCaseTemplates(false);
                              }}
                            >
                              <h3 className="font-medium text-text-primary">{template.title}</h3>
                              <p className="text-sm text-text-muted">{template.description}</p>
                            </div>
                            {selectedUseCaseTemplate?.title === template.title && (
                              <div className="p-4 bg-accent-blue/5 border border-accent-blue/20 rounded-lg">
                                <p className="text-sm text-text-primary">{template.details}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
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

      case 4:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <CheckCircle2 className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">What counts as a successful call?</h2>
                <p className="text-text-secondary">Define your success criteria</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-text-primary font-medium">Success Criteria *</Label>
                  <Dialog open={showSuccessTemplates} onOpenChange={setShowSuccessTemplates}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-text-muted hover:text-text-primary">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        View Templates
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-surface border-border/50">
                      <DialogHeader>
                        <DialogTitle className="text-text-primary">Success Criteria Templates</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {successTemplates.map((template, index) => (
                          <div key={index} className="space-y-2">
                            <div
                              className="p-4 border border-border/50 rounded-lg cursor-pointer hover:border-accent-blue bg-surface-2"
                              onClick={() => {
                                setSelectedSuccessTemplate(template);
                                updateData('success_criteria_custom', template.criteria);
                                setShowSuccessTemplates(false);
                              }}
                            >
                              <h3 className="font-medium text-text-primary">{template.title}</h3>
                              <p className="text-sm text-text-muted">{template.criteria}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea
                  placeholder="Describe what makes a call successful for your specific use case..."
                  value={data.success_criteria_custom}
                  onChange={(e) => updateData('success_criteria_custom', e.target.value)}
                  className="min-h-[100px] bg-surface-2 border-border/50 text-text-primary"
                />
              </div>
            </div>
          </Card>
        );

      case 5:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Users className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Where are most of your callers located?</h2>
                <p className="text-text-secondary">Select regions for optimal voice and locale settings</p>
              </div>
              
              <div className="space-y-6">
                {/* Popular regions as tabs */}
                <div>
                  <Label className="text-text-primary font-medium mb-3 block">Popular Regions</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {popularRegions.map((region) => (
                      <div
                        key={region}
                        className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                          data.caller_geographies.includes(region)
                            ? "border-accent-blue bg-accent-blue/5"
                            : "border-border hover:border-border-hover bg-surface-2"
                        }`}
                        onClick={() => {
                          const current = data.caller_geographies;
                          if (current.includes(region)) {
                            updateData('caller_geographies', current.filter(c => c !== region));
                          } else {
                            updateData('caller_geographies', [...current, region]);
                          }
                        }}
                      >
                        <span className="text-text-primary text-sm">{region}</span>
                        {data.caller_geographies.includes(region) && (
                          <CheckCircle2 className="w-4 h-4 text-accent-blue mx-auto mt-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Search for other regions */}
                <div>
                  <Label className="text-text-primary font-medium mb-3 block">Other Regions</Label>
                  <Input
                    placeholder="Search for a country or region..."
                    value={regionSearch}
                    onChange={(e) => setRegionSearch(e.target.value)}
                    className="bg-surface-2 border-border/50 text-text-primary mb-3"
                  />
                  {regionSearch.length > 0 && (
                    <div className="max-h-32 overflow-y-auto border border-border/50 rounded-lg bg-surface-2">
                      {filteredCountries.slice(0, 5).map((country) => (
                        <div
                          key={country}
                          className={`p-2 cursor-pointer hover:bg-accent-blue/5 border-b border-border/30 last:border-b-0 ${
                            data.caller_geographies.includes(country) ? "bg-accent-blue/5" : ""
                          }`}
                          onClick={() => {
                            const current = data.caller_geographies;
                            if (current.includes(country)) {
                              updateData('caller_geographies', current.filter(c => c !== country));
                            } else {
                              updateData('caller_geographies', [...current, country]);
                            }
                            setRegionSearch("");
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-text-primary text-sm">{country}</span>
                            {data.caller_geographies.includes(country) && (
                              <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-text-muted">
                    Selected: {data.caller_geographies.length} regions
                  </p>
                  <p className="text-xs text-accent-blue mt-1">
                    Voice will be automatically selected based on your region and gender preferences
                  </p>
                </div>
              </div>
            </div>
          </Card>
        );

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
                  <div className="mt-6">
                    <input
                      type="file"
                      id="knowledge-files"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        updateData('knowledge_files', files);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="knowledge-files"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-surface-2 hover:bg-accent-blue/5 hover:border-accent-blue/50"
                    >
                      <Upload className="w-8 h-8 text-text-muted mb-2" />
                      <p className="text-text-primary font-medium">Upload Documents</p>
                      <p className="text-text-muted text-sm">PDF, DOC, TXT files up to 10MB each</p>
                    </label>
                    {data.knowledge_files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {data.knowledge_files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-surface border border-border/50 rounded">
                            <span className="text-text-primary text-sm">{file.name}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                const newFiles = data.knowledge_files.filter((_, i) => i !== index);
                                updateData('knowledge_files', newFiles);
                              }}
                              className="text-text-muted hover:text-destructive"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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
                    <p className="font-medium text-text-primary">Enable Human Transfer</p>
                    <p className="text-sm text-text-muted">Allow the agent to transfer calls to human representatives</p>
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
                        ].map((condition) => (
                          <div
                            key={condition}
                            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                              data.handoff_rules.includes(condition)
                                ? "border-accent-blue bg-accent-blue/5"
                                : "border-border hover:border-border-hover bg-surface-2"
                            }`}
                            onClick={() => {
                              const current = data.handoff_rules;
                              if (current.includes(condition)) {
                                updateData('handoff_rules', current.filter(r => r !== condition));
                              } else {
                                updateData('handoff_rules', [...current, condition]);
                              }
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-text-primary text-sm">{condition}</span>
                              {data.handoff_rules.includes(condition) && (
                                <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-text-primary font-medium mb-2 block">Custom Transfer Rule</Label>
                      <Textarea
                        placeholder="Describe any custom conditions for transferring calls..."
                        value={data.handoff_custom_rule}
                        onChange={(e) => updateData('handoff_custom_rule', e.target.value)}
                        className="bg-surface-2 border-border/50 text-text-primary"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      
                      <div>
                        <Label className="text-text-primary font-medium mb-2 block">
                          {data.handoff_method === "phone" ? "Phone Number" : "SIP Details"}
                        </Label>
                        <Input
                          placeholder={data.handoff_method === "phone" ? "+1 (555) 123-4567" : "sip:transfer@domain.com"}
                          value={data.handoff_method === "phone" ? data.handoff_phone : data.handoff_sip}
                          onChange={(e) => updateData(data.handoff_method === "phone" ? 'handoff_phone' : 'handoff_sip', e.target.value)}
                          className="bg-surface-2 border-border/50 text-text-primary"
                        />
                      </div>
                    </div>
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
                <Zap className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">What tools can the agent use during the call?</h2>
                <p className="text-text-secondary">Enable integrations and capabilities</p>
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
                      if (current.includes(tool)) {
                        updateData('enabled_tools', current.filter(t => t !== tool));
                      } else {
                        updateData('enabled_tools', [...current, tool]);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary">{tool}</span>
                      {data.enabled_tools.includes(tool) && (
                        <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );

      case 9:
        return (
          <Card className="p-8 bg-surface border-border/50">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Settings className="w-12 h-12 text-accent-blue mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Where should we send call results?</h2>
                <p className="text-text-secondary">Choose how you want to receive call summaries and data</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: "dashboard", label: "Keep in dashboard only (recommended)" },
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
                      <span className="font-medium text-text-primary">{option.label}</span>
                      {data.results_destination === option.value && (
                        <CheckCircle2 className="w-5 h-5 text-accent-blue" />
                      )}
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
                <h2 className="text-2xl font-bold text-text-primary mb-2">Guardrails and Restrictions</h2>
                <p className="text-text-secondary">Define what your agent must never say or do (optional)</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-text-primary font-medium">Restrictions and Guidelines</Label>
                  <Dialog open={showGuardrailsTemplates} onOpenChange={setShowGuardrailsTemplates}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-text-muted hover:text-text-primary">
                        <Shield className="w-4 h-4 mr-2" />
                        Brief Overview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-surface border-border/50">
                      <DialogHeader>
                        <DialogTitle className="text-text-primary">Guardrails & Restrictions Templates</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {guardrailsTemplates.map((template, index) => (
                          <div key={index} className="space-y-2">
                            <div
                              className="p-4 border border-border/50 rounded-lg cursor-pointer hover:border-accent-blue bg-surface-2"
                              onClick={() => {
                                setSelectedGuardrailsTemplate(template);
                                updateData('guardrails_text', template.details);
                                setShowGuardrailsTemplates(false);
                              }}
                            >
                              <h3 className="font-medium text-text-primary">{template.title}</h3>
                              <p className="text-sm text-text-muted">{template.description}</p>
                            </div>
                            {selectedGuardrailsTemplate?.title === template.title && (
                              <div className="p-4 bg-accent-blue/5 border border-accent-blue/20 rounded-lg">
                                <p className="text-sm text-text-primary">{template.details}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <Textarea
                  placeholder="e.g., Don't discuss pricing; always use respectful forms of address; never make guarantees about outcomes..."
                  value={data.guardrails_text}
                  onChange={(e) => updateData('guardrails_text', e.target.value)}
                  className="min-h-[100px] bg-surface-2 border-border/50 text-text-primary"
                />
                <div className="bg-surface-2 border border-border/50 rounded-lg p-4">
                  <p className="text-sm text-text-muted mb-2">💡 <strong>Note:</strong> Compliance features are enabled by default:</p>
                  <ul className="text-sm text-text-muted space-y-1 ml-4">
                    <li>• TCPA/TRAI compliance for call regulations</li>
                    <li>• Professional etiquette and respectful communication</li>
                    <li>• No sharing of sensitive customer information</li>
                    <li>• Proper handling of opt-out requests</li>
                  </ul>
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
      
      <div className="max-w-4xl mx-auto p-6">
        {renderStep()}
        
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="text-text-muted hover:text-text-primary border-border/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-sm text-text-muted">
            {currentStep} of {TOTAL_STEPS} steps completed
          </div>
          
          {currentStep < TOTAL_STEPS ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="bg-accent-blue hover:bg-accent-blue/90 text-white"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!isStepValid()}
              className="bg-success hover:bg-success/90 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}