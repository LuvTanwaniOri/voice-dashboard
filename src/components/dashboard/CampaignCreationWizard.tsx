import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight,
  Settings,
  Users,
  Calendar,
  Gauge,
  Clock,
  Phone,
  Plus,
  X
} from "lucide-react";

interface CampaignData {
  overview: {
    name: string;
    agent: string;
    successTemplate: string;
    knowledgePack: string;
    maxContacts: string;
    maxMinutesPerDay: string;
    stopOnLowCredits: boolean;
  };
  audience: {
    scrubContacts: boolean;
    selectedLists: string[];
    dncLists: string[];
  };
  schedule: {
    days: string[];
    timezone: string;
    holidays: string;
    callingWindows: {
      start: string;
      end: string;
    };
    carryOverCalls: boolean;
  };
  pacing: {
    cps: string;
    maxConcurrent: string;
    retryLogic: string;
    abandonmentThreshold: string;
  };
}

interface WizardProps {
  onClose: () => void;
  onSave: (data: CampaignData) => void;
}

export function CampaignCreationWizard({ onClose, onSave }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    overview: {
      name: '',
      agent: '',
      successTemplate: '',
      knowledgePack: '',
      maxContacts: '5000',
      maxMinutesPerDay: '10000',
      stopOnLowCredits: false,
    },
    audience: {
      scrubContacts: true,
      selectedLists: [],
      dncLists: [],
    },
    schedule: {
      days: [],
      timezone: '',
      holidays: '',
      callingWindows: {
        start: '9:00',
        end: '17:00',
      },
      carryOverCalls: false,
    },
    pacing: {
      cps: '2.5',
      maxConcurrent: '50',
      retryLogic: 'standard',
      abandonmentThreshold: '3',
    },
  });

  const steps = [
    { 
      id: 'overview', 
      title: 'Overview', 
      icon: Settings,
      description: 'Basic campaign settings and agent configuration'
    },
    { 
      id: 'audience', 
      title: 'Audience', 
      icon: Users,
      description: 'Select contact lists and configure audience targeting'
    },
    { 
      id: 'schedule', 
      title: 'Schedule & Windows', 
      icon: Calendar,
      description: 'Set calling schedule and time windows'
    },
    { 
      id: 'pacing', 
      title: 'Pacing & Capacity', 
      icon: Gauge,
      description: 'Configure dialing pace and capacity limits'
    },
  ];

  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // Overview
        return !!(campaignData.overview.name && campaignData.overview.agent && campaignData.overview.successTemplate);
      case 1: // Audience
        return campaignData.audience.selectedLists.length > 0;
      case 2: // Schedule
        return campaignData.schedule.days.length > 0 && !!campaignData.schedule.timezone;
      case 3: // Pacing
        return !!(campaignData.pacing.cps && campaignData.pacing.maxConcurrent);
      default:
        return false;
    }
  };

  const completedSteps = steps.filter((_, index) => isStepComplete(index)).length;
  const progress = (completedSteps / steps.length) * 100;

  const updateCampaignData = (section: keyof CampaignData, data: any) => {
    setCampaignData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    onSave(campaignData);
  };

  const renderOverviewStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              placeholder="Enter campaign name"
              value={campaignData.overview.name}
              onChange={(e) => updateCampaignData('overview', { name: e.target.value })}
            />
          </div>

          <div>
            <Label>Agent/Persona</Label>
            <Select 
              value={campaignData.overview.agent} 
              onValueChange={(value) => updateCampaignData('overview', { agent: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english-agent1">English (US) - Agent 1</SelectItem>
                <SelectItem value="english-agent2">English (US) - Agent 2</SelectItem>
                <SelectItem value="spanish-agent1">Spanish - Agent 1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Success Template</Label>
            <Select 
              value={campaignData.overview.successTemplate} 
              onValueChange={(value) => updateCampaignData('overview', { successTemplate: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead-qualification">Lead Qualification Success</SelectItem>
                <SelectItem value="appointment-setting">Appointment Setting</SelectItem>
                <SelectItem value="survey-completion">Survey Completion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Knowledge Pack(s)</Label>
            <Select 
              value={campaignData.overview.knowledgePack} 
              onValueChange={(value) => updateCampaignData('overview', { knowledgePack: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select knowledge pack" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="objection-handling">Objection Handling</SelectItem>
                <SelectItem value="product-knowledge">Product Knowledge</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-accent/20">
            <h4 className="font-medium mb-3 text-foreground">Status & Limits</h4>
            <div className="space-y-4">
              <div>
                <Label htmlFor="max-contacts">Max Contacts</Label>
                <Input
                  id="max-contacts"
                  value={campaignData.overview.maxContacts}
                  onChange={(e) => updateCampaignData('overview', { maxContacts: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="max-minutes">Max connected minutes/day</Label>
                <Input
                  id="max-minutes"
                  value={campaignData.overview.maxMinutesPerDay}
                  onChange={(e) => updateCampaignData('overview', { maxMinutesPerDay: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="stop-credits"
                  checked={campaignData.overview.stopOnLowCredits}
                  onCheckedChange={(checked) => updateCampaignData('overview', { stopOnLowCredits: checked })}
                />
                <Label htmlFor="stop-credits">Stop on low credits</Label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderAudienceStep = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 p-4 bg-accent/20 rounded-lg">
        <Switch
          id="scrub-contacts"
          checked={campaignData.audience.scrubContacts}
          onCheckedChange={(checked) => updateCampaignData('audience', { scrubContacts: checked })}
        />
        <Label htmlFor="scrub-contacts">Scrub contacts</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h4 className="font-medium mb-4 text-foreground">Available Lists</h4>
          <div className="space-y-3">
            {[
              { id: 'demo-a', name: 'Demo List A', contacts: 500 },
              { id: 'demo-b', name: 'Demo List B', contacts: 350 },
              { id: 'rental-leads', name: 'Rental Leads', contacts: 553 },
              { id: 'home-buyer', name: 'Home Buyer Leads', contacts: 245 },
              { id: 'car-insurance', name: 'Car Insurance Leads', contacts: 346 },
            ].map((list) => (
              <div key={list.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={list.id}
                  checked={campaignData.audience.selectedLists.includes(list.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateCampaignData('audience', {
                        selectedLists: [...campaignData.audience.selectedLists, list.id]
                      });
                    } else {
                      updateCampaignData('audience', {
                        selectedLists: campaignData.audience.selectedLists.filter(id => id !== list.id)
                      });
                    }
                  }}
                />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{list.name}</div>
                  <div className="text-sm text-muted-foreground">{list.contacts} contacts</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            New list
          </Button>
        </Card>

        <Card className="p-4">
          <h4 className="font-medium mb-4 text-foreground">DNC Lists</h4>
          <div className="text-sm text-muted-foreground mb-4">
            Select which contacts to exclude using Do Not Call (DNC) lists.
          </div>
          <div className="text-sm text-muted-foreground">None selected</div>
          <Button variant="outline" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-2" />
            New DNC
          </Button>
        </Card>
      </div>
    </div>
  );

  const renderScheduleStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Days of Week</Label>
            <div className="grid grid-cols-7 gap-2 mt-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <Button
                  key={day}
                  variant={campaignData.schedule.days.includes(day) ? "default" : "outline"}
                  size="sm"
                  className="aspect-square"
                  onClick={() => {
                    const days = campaignData.schedule.days.includes(day)
                      ? campaignData.schedule.days.filter(d => d !== day)
                      : [...campaignData.schedule.days, day];
                    updateCampaignData('schedule', { days });
                  }}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Policy</Label>
            <Select 
              value={campaignData.schedule.timezone} 
              onValueChange={(value) => updateCampaignData('schedule', { timezone: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lead-timezone">Lead's local timezone</SelectItem>
                <SelectItem value="company-timezone">Company timezone</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
                <SelectItem value="pst">Pacific Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Holidays</Label>
            <Select 
              value={campaignData.schedule.holidays} 
              onValueChange={(value) => updateCampaignData('schedule', { holidays: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select holiday policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-holidays">No holidays</SelectItem>
                <SelectItem value="us-holidays">US Holidays</SelectItem>
                <SelectItem value="custom">Custom holidays</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="p-4">
          <h4 className="font-medium mb-4 text-foreground">Calling Windows</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={campaignData.schedule.callingWindows.start}
                  onChange={(e) => updateCampaignData('schedule', {
                    callingWindows: { ...campaignData.schedule.callingWindows, start: e.target.value }
                  })}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={campaignData.schedule.callingWindows.end}
                  onChange={(e) => updateCampaignData('schedule', {
                    callingWindows: { ...campaignData.schedule.callingWindows, end: e.target.value }
                  })}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="carry-over"
                checked={campaignData.schedule.carryOverCalls}
                onCheckedChange={(checked) => updateCampaignData('schedule', { carryOverCalls: !!checked })}
              />
              <Label htmlFor="carry-over">Carry over calls to next day</Label>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderPacingStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="cps">Calls Per Second (CPS)</Label>
            <Input
              id="cps"
              placeholder="2.5"
              value={campaignData.pacing.cps}
              onChange={(e) => updateCampaignData('pacing', { cps: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">Recommended: 1.5 - 3.0 CPS</p>
          </div>

          <div>
            <Label htmlFor="max-concurrent">Max Concurrent Calls</Label>
            <Input
              id="max-concurrent"
              placeholder="50"
              value={campaignData.pacing.maxConcurrent}
              onChange={(e) => updateCampaignData('pacing', { maxConcurrent: e.target.value })}
            />
          </div>

          <div>
            <Label>Retry Logic</Label>
            <Select 
              value={campaignData.pacing.retryLogic} 
              onValueChange={(value) => updateCampaignData('pacing', { retryLogic: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select retry logic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (3 attempts)</SelectItem>
                <SelectItem value="aggressive">Aggressive (5 attempts)</SelectItem>
                <SelectItem value="conservative">Conservative (2 attempts)</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="p-4 bg-accent/20">
          <h4 className="font-medium mb-4 text-foreground">Advanced Settings</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="abandonment">Abandonment Threshold (%)</Label>
              <Input
                id="abandonment"
                placeholder="3"
                value={campaignData.pacing.abandonmentThreshold}
                onChange={(e) => updateCampaignData('pacing', { abandonmentThreshold: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Auto-adjust pace if abandonment exceeds this</p>
            </div>
            
            <div className="pt-4 border-t">
              <h5 className="font-medium mb-2">Estimated Performance</h5>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Calls per hour:</span>
                  <span className="text-foreground">~180</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected connects:</span>
                  <span className="text-foreground">~115/hour</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-subtle border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Create New Campaign</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Complete all sections to create your campaign
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground">{completedSteps}/{steps.length} completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step navigation */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isComplete = isStepComplete(index);
              const isCurrent = index === currentStep;
              
              return (
                <Button
                  key={step.id}
                  variant={isCurrent ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center space-x-2 p-3 h-auto ${
                    isComplete ? 'bg-success/20 text-success hover:bg-success/30' : ''
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {isComplete ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <div className="text-left">
                    <div className="font-medium text-xs">{step.title}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-96">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground">{steps[currentStep].title}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
          </div>

          {currentStep === 0 && renderOverviewStep()}
          {currentStep === 1 && renderAudienceStep()}
          {currentStep === 2 && renderScheduleStep()}
          {currentStep === 3 && renderPacingStep()}
        </CardContent>

        <div className="border-t p-4 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-2">
            {currentStep === steps.length - 1 ? (
              <Button 
                onClick={handleSave}
                disabled={!isStepComplete(currentStep)}
              >
                Create Campaign
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}