import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  CheckCircle,
  Volume2,
  MessageSquare,
  Phone,
  Shield,
  Target,
  ClipboardList,
  Star,
  Save,
  X
} from "lucide-react";
import { toast } from "sonner";

export interface CallAudit {
  id: string;
  sessionId: string;
  timestamp: string;
  auditorName: string;
  overallRating: number;
  categories: {
    voiceAudio: VoiceAudioAudit;
    transcription: TranscriptionAudit;
    botBehavior: BotBehaviorAudit;
    callExperience: CallExperienceAudit;
    compliance: ComplianceAudit;
    outcome: OutcomeAudit;
  };
  generalNotes: string;
  recommendations: string;
}

interface VoiceAudioAudit {
  issues: string[];
  severity: 'low' | 'medium' | 'high';
  notes: string;
  backgroundNoiseType?: string;
  volumeLevel?: number;
}

interface TranscriptionAudit {
  issues: string[];
  accuracy: number;
  notes: string;
  keywordMisses: string[];
}

interface BotBehaviorAudit {
  issues: string[];
  scriptCompliance: number;
  responseLatency: 'too-fast' | 'optimal' | 'too-slow';
  notes: string;
}

interface CallExperienceAudit {
  issues: string[];
  telephonyQuality: number;
  notes: string;
}

interface ComplianceAudit {
  issues: string[];
  complianceScore: number;
  notes: string;
}

interface OutcomeAudit {
  issues: string[];
  dispositionAccuracy: number;
  notes: string;
}

interface CallAuditDialogProps {
  sessionId: string;
  sessionDetails: {
    phoneNumber: string;
    duration: string;
    campaign: string;
    outcome: string;
  };
  children: React.ReactNode;
  onSaveAudit?: (audit: Omit<CallAudit, 'id' | 'timestamp'>) => void;
}

const voiceAudioIssues = [
  "Robotic/unnatural prosody",
  "Pronunciation error (TTS mispronounced word/name)",
  "Voice mismatch (wrong persona/gender vs agent config)",
  "Speaking too fast",
  "Speaking too slow", 
  "Volume too high",
  "Volume too low",
  "Background noise",
  "Audio clipping/distortion",
  "Cross-talk/overlap (AI + human speaking together)",
  "Silence gap too long (awkward pause)",
  "Jarring language switch audio"
];

const transcriptionIssues = [
  "Misrecognition (detected text ≠ actual speech)",
  "Missed speech (no transcript for audible speech)",
  "False positive (transcript when no speech)",
  "Wrong language tag",
  "Keyword miss (brand/SKU/proper noun missed)",
  "Speaker attribution wrong (agent vs customer)"
];

const botBehaviorIssues = [
  "Incorrect/irrelevant response",
  "Did not follow script/policy",
  "Response too slow (high latency)",
  "Response too fast (interruptive)",
  "Over-interrupting user (barge-in too aggressive)",
  "Failed to recover after barge-in",
  "Missed handoff opportunity",
  "Unnecessary handoff",
  "Tool misuse (SMS/DTMF/API called wrong time)",
  "IVR navigation error",
  "Language switch error",
  "RAG/Knowledge error (used stale/irrelevant info)",
  "Success evaluator mismatch"
];

const callExperienceIssues = [
  "Auto-disconnected call (unexpected drop)",
  "Did not disconnect properly",
  "Bad carrier quality/jitter/packet loss",
  "AMD error (human/voicemail detection wrong)",
  "Voicemail drop issue",
  "Wrong number masking/CLID rotation",
  "Time window violation (call outside schedule)"
];

const complianceIssues = [
  "Missing disclosure (TCPA/TRAI)",
  "Opt-out not honored",
  "Honorific/pronoun misuse",
  "Wrong formality level",
  "PII redaction miss",
  "Sensitive topic handling issue"
];

const outcomeIssues = [
  "Disposition misclassified",
  "Outcome fields wrong/missing",
  "Handoff packet incomplete"
];

const backgroundNoiseTypes = [
  "Line noise",
  "Office noise", 
  "Street noise",
  "Echo",
  "Other"
];

export function CallAuditDialog({ 
  sessionId, 
  sessionDetails, 
  children, 
  onSaveAudit 
}: CallAuditDialogProps) {
  const [open, setOpen] = useState(false);
  const [overallRating, setOverallRating] = useState(5);
  
  // Voice & Audio state
  const [voiceAudioIssuesList, setVoiceAudioIssuesList] = useState<string[]>([]);
  const [voiceAudioSeverity, setVoiceAudioSeverity] = useState<'low' | 'medium' | 'high'>('low');
  const [voiceAudioNotes, setVoiceAudioNotes] = useState("");
  const [backgroundNoiseType, setBackgroundNoiseType] = useState("");
  const [volumeLevel, setVolumeLevel] = useState([5]);

  // Transcription state
  const [transcriptionIssuesList, setTranscriptionIssuesList] = useState<string[]>([]);
  const [transcriptionAccuracy, setTranscriptionAccuracy] = useState([85]);
  const [transcriptionNotes, setTranscriptionNotes] = useState("");
  const [keywordMisses, setKeywordMisses] = useState("");

  // Bot Behavior state
  const [botBehaviorIssuesList, setBotBehaviorIssuesList] = useState<string[]>([]);
  const [scriptCompliance, setScriptCompliance] = useState([80]);
  const [responseLatency, setResponseLatency] = useState<'too-fast' | 'optimal' | 'too-slow'>('optimal');
  const [botBehaviorNotes, setBotBehaviorNotes] = useState("");

  // Call Experience state
  const [callExperienceIssuesList, setCallExperienceIssuesList] = useState<string[]>([]);
  const [telephonyQuality, setTelephonyQuality] = useState([8]);
  const [callExperienceNotes, setCallExperienceNotes] = useState("");

  // Compliance state
  const [complianceIssuesList, setComplianceIssuesList] = useState<string[]>([]);
  const [complianceScore, setComplianceScore] = useState([90]);
  const [complianceNotes, setComplianceNotes] = useState("");

  // Outcome state
  const [outcomeIssuesList, setOutcomeIssuesList] = useState<string[]>([]);
  const [dispositionAccuracy, setDispositionAccuracy] = useState([85]);
  const [outcomeNotes, setOutcomeNotes] = useState("");

  // General
  const [generalNotes, setGeneralNotes] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleIssueToggle = (
    issue: string, 
    currentList: string[], 
    setter: (list: string[]) => void
  ) => {
    if (currentList.includes(issue)) {
      setter(currentList.filter(item => item !== issue));
    } else {
      setter([...currentList, issue]);
    }
  };

  const handleSave = () => {
    const audit: Omit<CallAudit, 'id' | 'timestamp'> = {
      sessionId,
      auditorName: "System Auditor", // Default auditor name
      overallRating,
      categories: {
        voiceAudio: {
          issues: voiceAudioIssuesList,
          severity: voiceAudioSeverity,
          notes: voiceAudioNotes,
          backgroundNoiseType: backgroundNoiseType || undefined,
          volumeLevel: volumeLevel[0]
        },
        transcription: {
          issues: transcriptionIssuesList,
          accuracy: transcriptionAccuracy[0],
          notes: transcriptionNotes,
          keywordMisses: keywordMisses.split(',').map(k => k.trim()).filter(k => k)
        },
        botBehavior: {
          issues: botBehaviorIssuesList,
          scriptCompliance: scriptCompliance[0],
          responseLatency,
          notes: botBehaviorNotes
        },
        callExperience: {
          issues: callExperienceIssuesList,
          telephonyQuality: telephonyQuality[0],
          notes: callExperienceNotes
        },
        compliance: {
          issues: complianceIssuesList,
          complianceScore: complianceScore[0],
          notes: complianceNotes
        },
        outcome: {
          issues: outcomeIssuesList,
          dispositionAccuracy: dispositionAccuracy[0],
          notes: outcomeNotes
        }
      },
      generalNotes,
      recommendations
    };

    onSaveAudit?.(audit);
    toast.success("Call audit saved successfully");
    setOpen(false);
  };

  const resetForm = () => {
    setOverallRating(5);
    setVoiceAudioIssuesList([]);
    setVoiceAudioSeverity('low');
    setVoiceAudioNotes("");
    setBackgroundNoiseType("");
    setVolumeLevel([5]);
    setTranscriptionIssuesList([]);
    setTranscriptionAccuracy([85]);
    setTranscriptionNotes("");
    setKeywordMisses("");
    setBotBehaviorIssuesList([]);
    setScriptCompliance([80]);
    setResponseLatency('optimal');
    setBotBehaviorNotes("");
    setCallExperienceIssuesList([]);
    setTelephonyQuality([8]);
    setCallExperienceNotes("");
    setComplianceIssuesList([]);
    setComplianceScore([90]);
    setComplianceNotes("");
    setOutcomeIssuesList([]);
    setDispositionAccuracy([85]);
    setOutcomeNotes("");
    setGeneralNotes("");
    setRecommendations("");
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-accent-blue" />
            Call Quality Audit
          </DialogTitle>
          <div className="flex items-center gap-4 text-sm text-text-muted">
            <Badge variant="outline">{sessionDetails.phoneNumber}</Badge>
            <span>Duration: {sessionDetails.duration}</span>
            <span>Campaign: {sessionDetails.campaign}</span>
            <span>Outcome: {sessionDetails.outcome}</span>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-140px)]">
          <div className="space-y-6 p-1">
            {/* Auditor Info & Overall Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Audit Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Overall Issue Severity</Label>
                    <Select value={voiceAudioSeverity} onValueChange={(value: 'low' | 'medium' | 'high') => setVoiceAudioSeverity(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Impact</SelectItem>
                        <SelectItem value="medium">Medium Impact</SelectItem>
                        <SelectItem value="high">High Impact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Overall Call Rating</Label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setOverallRating(rating)}
                          className={`w-8 h-8 rounded-full border transition-all ${
                            rating <= overallRating
                              ? 'bg-accent-blue text-white border-accent-blue'
                              : 'border-border hover:border-accent-blue/50'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="voice" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="voice" className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4" />
                  Voice & Audio
                </TabsTrigger>
                <TabsTrigger value="transcription" className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  Transcription
                </TabsTrigger>
                <TabsTrigger value="bot" className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Bot Behavior
                </TabsTrigger>
                <TabsTrigger value="call" className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Call Experience
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Compliance
                </TabsTrigger>
                <TabsTrigger value="outcome" className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  Outcome
                </TabsTrigger>
              </TabsList>

              <TabsContent value="voice" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Voice & Audio Quality Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Identified Issues</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {voiceAudioIssues.map((issue) => (
                          <div key={issue} className="flex items-center space-x-2">
                            <Checkbox
                              id={`voice-${issue}`}
                              checked={voiceAudioIssuesList.includes(issue)}
                              onCheckedChange={() => 
                                handleIssueToggle(issue, voiceAudioIssuesList, setVoiceAudioIssuesList)
                              }
                            />
                            <Label htmlFor={`voice-${issue}`} className="text-sm">
                              {issue}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      
                      {voiceAudioIssuesList.includes("Background noise") && (
                        <div className="space-y-2">
                          <Label>Background Noise Type</Label>
                          <Select value={backgroundNoiseType} onValueChange={setBackgroundNoiseType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select noise type" />
                            </SelectTrigger>
                            <SelectContent>
                              {backgroundNoiseTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {(voiceAudioIssuesList.includes("Volume too high") || voiceAudioIssuesList.includes("Volume too low")) && (
                      <div className="space-y-2">
                        <Label>Volume Level (1-10)</Label>
                        <Slider
                          value={volumeLevel}
                          onValueChange={setVolumeLevel}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-sm text-text-muted">Current: {volumeLevel[0]}/10</div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        value={voiceAudioNotes}
                        onChange={(e) => setVoiceAudioNotes(e.target.value)}
                        placeholder="Detailed observations about voice and audio quality..."
                        className="min-h-20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transcription" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      STT / Transcription Accuracy (ASR)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Transcription Issues</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {transcriptionIssues.map((issue) => (
                          <div key={issue} className="flex items-center space-x-2">
                            <Checkbox
                              id={`transcription-${issue}`}
                              checked={transcriptionIssuesList.includes(issue)}
                              onCheckedChange={() => 
                                handleIssueToggle(issue, transcriptionIssuesList, setTranscriptionIssuesList)
                              }
                            />
                            <Label htmlFor={`transcription-${issue}`} className="text-sm">
                              {issue}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Overall Transcription Accuracy (%)</Label>
                      <Slider
                        value={transcriptionAccuracy}
                        onValueChange={setTranscriptionAccuracy}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-sm text-text-muted">Current: {transcriptionAccuracy[0]}%</div>
                    </div>

                    <div className="space-y-2">
                      <Label>Keyword Misses (comma-separated)</Label>
                      <input
                        type="text"
                        value={keywordMisses}
                        onChange={(e) => setKeywordMisses(e.target.value)}
                        placeholder="brand names, SKUs, proper nouns..."
                        className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        value={transcriptionNotes}
                        onChange={(e) => setTranscriptionNotes(e.target.value)}
                        placeholder="Detailed observations about transcription accuracy..."
                        className="min-h-20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Continue with other tabs... */}
              <TabsContent value="bot" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Bot Behavior & Dialogue Quality
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Bot Behavior Issues</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {botBehaviorIssues.map((issue) => (
                          <div key={issue} className="flex items-center space-x-2">
                            <Checkbox
                              id={`bot-${issue}`}
                              checked={botBehaviorIssuesList.includes(issue)}
                              onCheckedChange={() => 
                                handleIssueToggle(issue, botBehaviorIssuesList, setBotBehaviorIssuesList)
                              }
                            />
                            <Label htmlFor={`bot-${issue}`} className="text-sm">
                              {issue}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Script Compliance (%)</Label>
                        <Slider
                          value={scriptCompliance}
                          onValueChange={setScriptCompliance}
                          max={100}
                          min={0}
                          step={5}
                          className="w-full"
                        />
                        <div className="text-sm text-text-muted">Current: {scriptCompliance[0]}%</div>
                      </div>

                      <div className="space-y-2">
                        <Label>Response Latency</Label>
                        <Select value={responseLatency} onValueChange={(value: 'too-fast' | 'optimal' | 'too-slow') => setResponseLatency(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="too-fast">Too Fast (Interruptive)</SelectItem>
                            <SelectItem value="optimal">Optimal</SelectItem>
                            <SelectItem value="too-slow">Too Slow (High Latency)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        value={botBehaviorNotes}
                        onChange={(e) => setBotBehaviorNotes(e.target.value)}
                        placeholder="Detailed observations about bot behavior and dialogue quality..."
                        className="min-h-20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="call" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call Experience & Telephony
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Call Experience Issues</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {callExperienceIssues.map((issue) => (
                          <div key={issue} className="flex items-center space-x-2">
                            <Checkbox
                              id={`call-${issue}`}
                              checked={callExperienceIssuesList.includes(issue)}
                              onCheckedChange={() => 
                                handleIssueToggle(issue, callExperienceIssuesList, setCallExperienceIssuesList)
                              }
                            />
                            <Label htmlFor={`call-${issue}`} className="text-sm">
                              {issue}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Telephony Quality (1-10)</Label>
                      <Slider
                        value={telephonyQuality}
                        onValueChange={setTelephonyQuality}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-sm text-text-muted">Current: {telephonyQuality[0]}/10</div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        value={callExperienceNotes}
                        onChange={(e) => setCallExperienceNotes(e.target.value)}
                        placeholder="Detailed observations about call experience and telephony quality..."
                        className="min-h-20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Compliance & Etiquette
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Compliance Issues</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {complianceIssues.map((issue) => (
                          <div key={issue} className="flex items-center space-x-2">
                            <Checkbox
                              id={`compliance-${issue}`}
                              checked={complianceIssuesList.includes(issue)}
                              onCheckedChange={() => 
                                handleIssueToggle(issue, complianceIssuesList, setComplianceIssuesList)
                              }
                            />
                            <Label htmlFor={`compliance-${issue}`} className="text-sm">
                              {issue}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Compliance Score (%)</Label>
                      <Slider
                        value={complianceScore}
                        onValueChange={setComplianceScore}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-sm text-text-muted">Current: {complianceScore[0]}%</div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        value={complianceNotes}
                        onChange={(e) => setComplianceNotes(e.target.value)}
                        placeholder="Detailed observations about compliance and etiquette..."
                        className="min-h-20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="outcome" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Outcome & Funnel Integrity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Label>Outcome Issues</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {outcomeIssues.map((issue) => (
                          <div key={issue} className="flex items-center space-x-2">
                            <Checkbox
                              id={`outcome-${issue}`}
                              checked={outcomeIssuesList.includes(issue)}
                              onCheckedChange={() => 
                                handleIssueToggle(issue, outcomeIssuesList, setOutcomeIssuesList)
                              }
                            />
                            <Label htmlFor={`outcome-${issue}`} className="text-sm">
                              {issue}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Disposition Accuracy (%)</Label>
                      <Slider
                        value={dispositionAccuracy}
                        onValueChange={setDispositionAccuracy}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-sm text-text-muted">Current: {dispositionAccuracy[0]}%</div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        value={outcomeNotes}
                        onChange={(e) => setOutcomeNotes(e.target.value)}
                        placeholder="Detailed observations about outcome accuracy and funnel integrity..."
                        className="min-h-20"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* General Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">General Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>General Notes</Label>
                  <Textarea
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    placeholder="Overall observations about the call..."
                    className="min-h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Recommendations for Improvement</Label>
                  <Textarea
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    placeholder="Specific recommendations for improving call quality..."
                    className="min-h-20"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <Separator />

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={() => setOpen(false)}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetForm}>
              Reset Form
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Audit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}