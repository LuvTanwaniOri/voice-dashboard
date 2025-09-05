import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, X, Volume2, MessageSquare, Bot, Phone, Shield, Target, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AudioWaveform } from "./AudioWaveform";

export interface DetailedAuditItem {
  issueType: string;
  hasTimeRange?: boolean;
  startTime?: number;
  endTime?: number;
  specificDetails?: {
    mispronuncedWord?: string;
    correctPronunciation?: string;
    backgroundNoiseType?: string;
    detectedText?: string;
    actualText?: string;
    incorrectResponse?: string;
    expectedResponse?: string;
    transferReason?: string;
    keywordMissed?: string;
    [key: string]: any;
  };
  severity: 'low' | 'medium' | 'high';
  notes: string;
  confidence: number;
}

export interface CallAudit {
  id: string;
  sessionId: string;
  auditorName: string;
  overallRating: number;
  overallSeverity: 'low' | 'medium' | 'high';
  categories: {
    voiceAudio: {
      items: DetailedAuditItem[];
      notes: string;
    };
    sttAccuracy: {
      items: DetailedAuditItem[];
      notes: string;
    };
    botBehavior: {
      items: DetailedAuditItem[];
      notes: string;
    };
    callExperience: {
      items: DetailedAuditItem[];
      notes: string;
    };
    compliance: {
      items: DetailedAuditItem[];
      notes: string;
    };
    outcome: {
      items: DetailedAuditItem[];
      notes: string;
    };
  };
  timestamp: string;
}

interface CallAuditDialogProps {
  sessionId: string;
  audioUrl?: string;
  callDuration: number;
  onSave?: (audit: CallAudit) => void;
}

const VOICE_AUDIO_ISSUES = [
  { id: "robotic_prosody", label: "Robotic/unnatural prosody", requiresTimeRange: true, hasSpecificFields: false },
  { id: "pronunciation_error", label: "Pronunciation error", requiresTimeRange: true, hasSpecificFields: true },
  { id: "voice_mismatch", label: "Voice mismatch (wrong persona/gender)", requiresTimeRange: false, hasSpecificFields: false },
  { id: "speaking_pace", label: "Speaking too fast / too slow", requiresTimeRange: true, hasSpecificFields: false },
  { id: "volume_issue", label: "Volume too high/low", requiresTimeRange: true, hasSpecificFields: false },
  { id: "background_noise", label: "Background noise", requiresTimeRange: true, hasSpecificFields: true },
  { id: "audio_distortion", label: "Audio clipping/distortion", requiresTimeRange: true, hasSpecificFields: false },
  { id: "cross_talk", label: "Cross-talk/overlap", requiresTimeRange: true, hasSpecificFields: false },
  { id: "silence_gap", label: "Silence gap too long", requiresTimeRange: true, hasSpecificFields: false },
  { id: "language_switch", label: "Jarring language switch audio", requiresTimeRange: true, hasSpecificFields: false }
];

const STT_ACCURACY_ISSUES = [
  { id: "misrecognition", label: "Misrecognition (detected ≠ actual)", requiresTimeRange: true, hasSpecificFields: true },
  { id: "missed_speech", label: "Missed speech (no transcript)", requiresTimeRange: true, hasSpecificFields: false },
  { id: "false_positive", label: "False positive (transcript when no speech)", requiresTimeRange: true, hasSpecificFields: false },
  { id: "wrong_language", label: "Wrong language tag", requiresTimeRange: false, hasSpecificFields: false },
  { id: "keyword_miss", label: "Keyword miss", requiresTimeRange: true, hasSpecificFields: true },
  { id: "speaker_attribution", label: "Speaker attribution wrong", requiresTimeRange: true, hasSpecificFields: false }
];

const BOT_BEHAVIOR_ISSUES = [
  { id: "incorrect_response", label: "Incorrect/irrelevant response", requiresTimeRange: false, hasSpecificFields: true },
  { id: "script_violation", label: "Did not follow script/policy", requiresTimeRange: false, hasSpecificFields: false },
  { id: "response_timing", label: "Latent response / Too snappy", requiresTimeRange: false, hasSpecificFields: false },
  { id: "over_interrupting", label: "Over-interrupting user", requiresTimeRange: true, hasSpecificFields: false },
  { id: "missed_handoff", label: "Missed handoff opportunity", requiresTimeRange: false, hasSpecificFields: true },
  { id: "unnecessary_handoff", label: "Unnecessary handoff", requiresTimeRange: false, hasSpecificFields: true },
  { id: "tool_misuse", label: "Tool misuse (SMS/DTMF/API)", requiresTimeRange: false, hasSpecificFields: false },
  { id: "ivr_error", label: "IVR navigation error", requiresTimeRange: false, hasSpecificFields: false },
  { id: "language_switch_error", label: "Language switch error", requiresTimeRange: false, hasSpecificFields: false },
  { id: "rag_error", label: "RAG/Knowledge error", requiresTimeRange: false, hasSpecificFields: false },
  { id: "evaluator_mismatch", label: "Success evaluator mismatch", requiresTimeRange: false, hasSpecificFields: false }
];

const CALL_EXPERIENCE_ISSUES = [
  { id: "auto_disconnect", label: "Auto-disconnected call", requiresTimeRange: false, hasSpecificFields: false },
  { id: "no_disconnect", label: "Did not disconnect", requiresTimeRange: false, hasSpecificFields: false },
  { id: "bad_quality", label: "Bad carrier quality", requiresTimeRange: true, hasSpecificFields: false },
  { id: "amd_error", label: "AMD error (misclassification)", requiresTimeRange: false, hasSpecificFields: false },
  { id: "voicemail_issue", label: "Voicemail drop issue", requiresTimeRange: false, hasSpecificFields: false },
  { id: "number_masking", label: "Wrong number masking", requiresTimeRange: false, hasSpecificFields: false },
  { id: "time_violation", label: "Time window violation", requiresTimeRange: false, hasSpecificFields: false }
];

const COMPLIANCE_ISSUES = [
  { id: "missing_disclosure", label: "Missing disclosure (TCPA/TRAI)", requiresTimeRange: false, hasSpecificFields: false },
  { id: "opt_out_ignored", label: "Opt-out not honored", requiresTimeRange: false, hasSpecificFields: false },
  { id: "honorific_misuse", label: "Honorific/pronoun misuse", requiresTimeRange: false, hasSpecificFields: false },
  { id: "formality_wrong", label: "Formality wrong", requiresTimeRange: false, hasSpecificFields: false },
  { id: "pii_redaction", label: "PII redaction miss", requiresTimeRange: true, hasSpecificFields: false },
  { id: "sensitive_topic", label: "Sensitive topic handling issue", requiresTimeRange: false, hasSpecificFields: false }
];

const OUTCOME_ISSUES = [
  { id: "disposition_wrong", label: "Disposition misclassified", requiresTimeRange: false, hasSpecificFields: false },
  { id: "outcome_fields", label: "Outcome fields wrong/missing", requiresTimeRange: false, hasSpecificFields: false },
  { id: "handoff_incomplete", label: "Handoff packet incomplete", requiresTimeRange: false, hasSpecificFields: false }
];

export function CallAuditDialog({
  sessionId,
  audioUrl,
  callDuration,
  onSave
}: CallAuditDialogProps) {
  const [open, setOpen] = useState(false);
  const [overallRating, setOverallRating] = useState(5);
  const [overallSeverity, setOverallSeverity] = useState<'low' | 'medium' | 'high'>('low');
  
  // Category items state
  const [voiceAudioItems, setVoiceAudioItems] = useState<DetailedAuditItem[]>([]);
  const [voiceAudioNotes, setVoiceAudioNotes] = useState("");
  
  const [sttAccuracyItems, setSttAccuracyItems] = useState<DetailedAuditItem[]>([]);
  const [sttAccuracyNotes, setSttAccuracyNotes] = useState("");
  
  const [botBehaviorItems, setBotBehaviorItems] = useState<DetailedAuditItem[]>([]);
  const [botBehaviorNotes, setBotBehaviorNotes] = useState("");
  
  const [callExperienceItems, setCallExperienceItems] = useState<DetailedAuditItem[]>([]);
  const [callExperienceNotes, setCallExperienceNotes] = useState("");
  
  const [complianceItems, setComplianceItems] = useState<DetailedAuditItem[]>([]);
  const [complianceNotes, setComplianceNotes] = useState("");
  
  const [outcomeItems, setOutcomeItems] = useState<DetailedAuditItem[]>([]);
  const [outcomeNotes, setOutcomeNotes] = useState("");

  // Current editing state
  const [editingItem, setEditingItem] = useState<{
    category: string;
    issue: any;
    timeRange?: { start: number; end: number };
    specificDetails?: any;
    severity: 'low' | 'medium' | 'high';
    notes: string;
    confidence: number;
  } | null>(null);

  const { toast } = useToast();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'voiceAudio':
        return <Volume2 className="w-4 h-4" />;
      case 'sttAccuracy':
        return <MessageSquare className="w-4 h-4" />;
      case 'botBehavior':
        return <Bot className="w-4 h-4" />;
      case 'callExperience':
        return <Phone className="w-4 h-4" />;
      case 'compliance':
        return <Shield className="w-4 h-4" />;
      case 'outcome':
        return <Target className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleIssueSelect = (category: string, issue: any, checked: boolean) => {
    if (checked) {
      setEditingItem({
        category,
        issue,
        timeRange: issue.requiresTimeRange ? { start: 0, end: Math.min(5, callDuration) } : undefined,
        specificDetails: {},
        severity: 'low',
        notes: '',
        confidence: 5
      });
    } else {
      // Remove existing item
      const setterMap: any = {
        voiceAudio: setVoiceAudioItems,
        sttAccuracy: setSttAccuracyItems,
        botBehavior: setBotBehaviorItems,
        callExperience: setCallExperienceItems,
        compliance: setComplianceItems,
        outcome: setOutcomeItems
      };
      
      const setter = setterMap[category];
      if (setter) {
        setter((prev: DetailedAuditItem[]) => prev.filter(item => item.issueType !== issue.id));
      }
    }
  };

  const handleTimeSelect = useCallback((startTime: number, endTime: number) => {
    if (editingItem) {
      setEditingItem(prev => prev ? {
        ...prev,
        timeRange: { start: startTime, end: endTime }
      } : null);
    }
  }, [editingItem]);

  const saveEditingItem = () => {
    if (!editingItem) return;

    const newItem: DetailedAuditItem = {
      issueType: editingItem.issue.id,
      hasTimeRange: editingItem.issue.requiresTimeRange,
      startTime: editingItem.timeRange?.start,
      endTime: editingItem.timeRange?.end,
      specificDetails: editingItem.specificDetails,
      severity: editingItem.severity,
      notes: editingItem.notes,
      confidence: editingItem.confidence
    };

    const setterMap: any = {
      voiceAudio: setVoiceAudioItems,
      sttAccuracy: setSttAccuracyItems,
      botBehavior: setBotBehaviorItems,
      callExperience: setCallExperienceItems,
      compliance: setComplianceItems,
      outcome: setOutcomeItems
    };

    const setter = setterMap[editingItem.category];
    if (setter) {
      setter((prev: DetailedAuditItem[]) => {
        const filtered = prev.filter(item => item.issueType !== editingItem.issue.id);
        return [...filtered, newItem];
      });
    }

    setEditingItem(null);
  };

  const handleSave = () => {
    const audit: Omit<CallAudit, 'id' | 'timestamp'> = {
      sessionId,
      auditorName: "System Auditor",
      overallRating,
      overallSeverity,
      categories: {
        voiceAudio: { items: voiceAudioItems, notes: voiceAudioNotes },
        sttAccuracy: { items: sttAccuracyItems, notes: sttAccuracyNotes },
        botBehavior: { items: botBehaviorItems, notes: botBehaviorNotes },
        callExperience: { items: callExperienceItems, notes: callExperienceNotes },
        compliance: { items: complianceItems, notes: complianceNotes },
        outcome: { items: outcomeItems, notes: outcomeNotes }
      }
    };

    const fullAudit: CallAudit = {
      ...audit,
      id: `audit-${sessionId}-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    onSave?.(fullAudit);
    toast({
      title: "Audit Saved",
      description: "Call audit has been successfully saved with detailed analysis."
    });
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setOverallRating(5);
    setOverallSeverity('low');
    setVoiceAudioItems([]);
    setVoiceAudioNotes("");
    setSttAccuracyItems([]);
    setSttAccuracyNotes("");
    setBotBehaviorItems([]);
    setBotBehaviorNotes("");
    setCallExperienceItems([]);
    setCallExperienceNotes("");
    setComplianceItems([]);
    setComplianceNotes("");
    setOutcomeItems([]);
    setOutcomeNotes("");
    setEditingItem(null);
  };

  const getIssuesForCategory = (category: string) => {
    switch (category) {
      case 'voiceAudio': return VOICE_AUDIO_ISSUES;
      case 'sttAccuracy': return STT_ACCURACY_ISSUES;
      case 'botBehavior': return BOT_BEHAVIOR_ISSUES;
      case 'callExperience': return CALL_EXPERIENCE_ISSUES;
      case 'compliance': return COMPLIANCE_ISSUES;
      case 'outcome': return OUTCOME_ISSUES;
      default: return [];
    }
  };

  const getItemsForCategory = (category: string) => {
    switch (category) {
      case 'voiceAudio': return voiceAudioItems;
      case 'sttAccuracy': return sttAccuracyItems;
      case 'botBehavior': return botBehaviorItems;
      case 'callExperience': return callExperienceItems;
      case 'compliance': return complianceItems;
      case 'outcome': return outcomeItems;
      default: return [];
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" size="sm">
        Audit Call
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span>Call Quality Audit - Detailed Analysis</span>
              <Badge variant="outline" className="text-xs">
                Session #{sessionId}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Audit Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Audit Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Overall Issue Severity</Label>
                    <Select value={overallSeverity} onValueChange={(value: 'low' | 'medium' | 'high') => setOverallSeverity(value)}>
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
                    <div className="flex items-center space-x-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={overallRating}
                        onChange={(e) => setOverallRating(Number(e.target.value))}
                        className="flex-1 h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <Badge variant="outline" className="min-w-[3rem] text-center">
                        {overallRating}/10
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Tabs */}
            <Tabs defaultValue="voiceAudio" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="voiceAudio" className="flex items-center space-x-1">
                  <Volume2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Voice</span>
                </TabsTrigger>
                <TabsTrigger value="sttAccuracy" className="flex items-center space-x-1">
                  <MessageSquare className="w-3 h-3" />
                  <span className="hidden sm:inline">Transcription</span>
                </TabsTrigger>
                <TabsTrigger value="botBehavior" className="flex items-center space-x-1">
                  <Bot className="w-3 h-3" />
                  <span className="hidden sm:inline">Bot</span>
                </TabsTrigger>
                <TabsTrigger value="callExperience" className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span className="hidden sm:inline">Call</span>
                </TabsTrigger>
                <TabsTrigger value="compliance" className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span className="hidden sm:inline">Compliance</span>
                </TabsTrigger>
                <TabsTrigger value="outcome" className="flex items-center space-x-1">
                  <Target className="w-3 h-3" />
                  <span className="hidden sm:inline">Outcome</span>
                </TabsTrigger>
              </TabsList>

              {/* Dynamic category rendering */}
              {['voiceAudio', 'sttAccuracy', 'botBehavior', 'callExperience', 'compliance', 'outcome'].map((category) => (
                <TabsContent key={category} value={category} className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        {getCategoryIcon(category)}
                        <span>{category === 'voiceAudio' ? 'Voice & Audio Quality' : 
                               category === 'sttAccuracy' ? 'STT / Transcription Accuracy' :
                               category === 'botBehavior' ? 'Bot Behavior & Dialogue' :
                               category === 'callExperience' ? 'Call Experience & Telephony' :
                               category === 'compliance' ? 'Compliance & Etiquette' :
                               'Outcome & Funnel Integrity'} Issues</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {getIssuesForCategory(category).map((issue) => {
                          const isSelected = getItemsForCategory(category).some(item => item.issueType === issue.id);
                          return (
                            <div key={issue.id} className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${category}-${issue.id}`}
                                  checked={isSelected}
                                  onCheckedChange={(checked) => handleIssueSelect(category, issue, !!checked)}
                                />
                                <label
                                  htmlFor={`${category}-${issue.id}`}
                                  className="text-sm text-text-primary cursor-pointer flex-1"
                                >
                                  {issue.label}
                                </label>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-text-muted">
                                {issue.requiresTimeRange && <Clock className="w-3 h-3" />}
                                {issue.hasSpecificFields && <MapPin className="w-3 h-3" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Show selected items summary */}
                      {getItemsForCategory(category).length > 0 && (
                        <div className="pt-4 border-t border-border/30">
                          <h4 className="text-sm font-medium mb-2">Selected Issues ({getItemsForCategory(category).length})</h4>
                          <div className="space-y-2">
                            {getItemsForCategory(category).map((item, index) => {
                              const issue = getIssuesForCategory(category).find(i => i.id === item.issueType);
                              return (
                                <div key={index} className="flex items-center justify-between p-2 bg-surface-2/50 rounded text-xs">
                                  <span>{issue?.label}</span>
                                  <div className="flex items-center space-x-2">
                                    {item.hasTimeRange && (
                                      <Badge variant="outline" className="text-xs">
                                        {Math.floor(item.startTime || 0)}s-{Math.floor(item.endTime || 0)}s
                                      </Badge>
                                    )}
                                    <Badge variant={item.severity === 'high' ? 'destructive' : 
                                                  item.severity === 'medium' ? 'secondary' : 'default'} 
                                           className="text-xs capitalize">
                                      {item.severity}
                                    </Badge>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label>Category Notes</Label>
                        <Textarea
                          value={category === 'voiceAudio' ? voiceAudioNotes :
                                 category === 'sttAccuracy' ? sttAccuracyNotes :
                                 category === 'botBehavior' ? botBehaviorNotes :
                                 category === 'callExperience' ? callExperienceNotes :
                                 category === 'compliance' ? complianceNotes : outcomeNotes}
                          onChange={(e) => {
                            const value = e.target.value;
                            switch (category) {
                              case 'voiceAudio': setVoiceAudioNotes(value); break;
                              case 'sttAccuracy': setSttAccuracyNotes(value); break;
                              case 'botBehavior': setBotBehaviorNotes(value); break;
                              case 'callExperience': setCallExperienceNotes(value); break;
                              case 'compliance': setComplianceNotes(value); break;
                              case 'outcome': setOutcomeNotes(value); break;
                            }
                          }}
                          placeholder={`Add specific observations about ${category === 'voiceAudio' ? 'voice and audio quality' : 
                                      category === 'sttAccuracy' ? 'transcription accuracy' :
                                      category === 'botBehavior' ? 'bot behavior' :
                                      category === 'callExperience' ? 'call experience' :
                                      category === 'compliance' ? 'compliance issues' :
                                      'outcome and funnel integrity'}...`}
                          className="min-h-[80px] resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Issue Detail Modal */}
            {editingItem && (
              <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <span>Issue Details: {editingItem.issue.label}</span>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Time Range Selection */}
                    {editingItem.issue.requiresTimeRange && (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Time Range Selection</Label>
                        <div className="p-4 bg-surface-2/30 rounded-lg border border-border/30">
                          <AudioWaveform
                            audioUrl={audioUrl}
                            duration={callDuration}
                            onTimeSelect={handleTimeSelect}
                            selectedRange={editingItem.timeRange}
                          />
                        </div>
                      </div>
                    )}

                    {/* Specific Fields */}
                    {editingItem.issue.hasSpecificFields && (
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">Specific Details</Label>
                        
                        {editingItem.issue.id === 'pronunciation_error' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Mispronounced Word</Label>
                              <input
                                type="text"
                                placeholder="e.g., 'Customer Name'"
                                value={editingItem.specificDetails?.mispronuncedWord || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {
                                  ...prev,
                                  specificDetails: { ...prev.specificDetails, mispronuncedWord: e.target.value }
                                } : null)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Correct Pronunciation</Label>
                              <input
                                type="text"
                                placeholder="e.g., 'KUST-uh-mer'"
                                value={editingItem.specificDetails?.correctPronunciation || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {
                                  ...prev,
                                  specificDetails: { ...prev.specificDetails, correctPronunciation: e.target.value }
                                } : null)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary"
                              />
                            </div>
                          </div>
                        )}

                        {editingItem.issue.id === 'background_noise' && (
                          <div className="space-y-2">
                            <Label>Background Noise Type</Label>
                            <Select 
                              value={editingItem.specificDetails?.backgroundNoiseType || ''} 
                              onValueChange={(value) => setEditingItem(prev => prev ? {
                                ...prev,
                                specificDetails: { ...prev.specificDetails, backgroundNoiseType: value }
                              } : null)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select noise type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="line">Line noise</SelectItem>
                                <SelectItem value="office">Office noise</SelectItem>
                                <SelectItem value="street">Street noise</SelectItem>
                                <SelectItem value="echo">Echo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {editingItem.issue.id === 'misrecognition' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>What was detected</Label>
                              <input
                                type="text"
                                placeholder="e.g., 'I want to buy insurance'"
                                value={editingItem.specificDetails?.detectedText || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {
                                  ...prev,
                                  specificDetails: { ...prev.specificDetails, detectedText: e.target.value }
                                } : null)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>What was actually said</Label>
                              <input
                                type="text"
                                placeholder="e.g., 'I want to cancel insurance'"
                                value={editingItem.specificDetails?.actualText || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {
                                  ...prev,
                                  specificDetails: { ...prev.specificDetails, actualText: e.target.value }
                                } : null)}
                                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary"
                              />
                            </div>
                          </div>
                        )}

                        {editingItem.issue.id === 'keyword_miss' && (
                          <div className="space-y-2">
                            <Label>Missed Keyword</Label>
                            <input
                              type="text"
                              placeholder="e.g., 'Brand Name XYZ'"
                              value={editingItem.specificDetails?.keywordMissed || ''}
                              onChange={(e) => setEditingItem(prev => prev ? {
                                ...prev,
                                specificDetails: { ...prev.specificDetails, keywordMissed: e.target.value }
                              } : null)}
                              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary"
                            />
                          </div>
                        )}

                        {editingItem.issue.id === 'incorrect_response' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Bot's Response</Label>
                              <Textarea
                                placeholder="What the bot said..."
                                value={editingItem.specificDetails?.incorrectResponse || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {
                                  ...prev,
                                  specificDetails: { ...prev.specificDetails, incorrectResponse: e.target.value }
                                } : null)}
                                className="min-h-[60px]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Expected Response</Label>
                              <Textarea
                                placeholder="What it should have said..."
                                value={editingItem.specificDetails?.expectedResponse || ''}
                                onChange={(e) => setEditingItem(prev => prev ? {
                                  ...prev,
                                  specificDetails: { ...prev.specificDetails, expectedResponse: e.target.value }
                                } : null)}
                                className="min-h-[60px]"
                              />
                            </div>
                          </div>
                        )}

                        {(editingItem.issue.id === 'missed_handoff' || editingItem.issue.id === 'unnecessary_handoff') && (
                          <div className="space-y-2">
                            <Label>Transfer Reason / Context</Label>
                            <Textarea
                              placeholder="Why should/shouldn't the call have been transferred..."
                              value={editingItem.specificDetails?.transferReason || ''}
                              onChange={(e) => setEditingItem(prev => prev ? {
                                ...prev,
                                specificDetails: { ...prev.specificDetails, transferReason: e.target.value }
                              } : null)}
                              className="min-h-[60px]"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Severity */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Issue Severity</Label>
                        <Select 
                          value={editingItem.severity} 
                          onValueChange={(value: 'low' | 'medium' | 'high') => setEditingItem(prev => prev ? {
                            ...prev,
                            severity: value
                          } : null)}
                        >
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
                        <Label>Confidence Level (1-10)</Label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={editingItem.confidence}
                            onChange={(e) => setEditingItem(prev => prev ? {
                              ...prev,
                              confidence: Number(e.target.value)
                            } : null)}
                            className="flex-1 h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <Badge variant="outline" className="min-w-[3rem] text-center">
                            {editingItem.confidence}/10
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label>Additional Notes</Label>
                      <Textarea
                        placeholder="Add specific context about this issue..."
                        value={editingItem.notes}
                        onChange={(e) => setEditingItem(prev => prev ? {
                          ...prev,
                          notes: e.target.value
                        } : null)}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditingItem(null)}>
                      Cancel
                    </Button>
                    <Button onClick={saveEditingItem}>
                      Save Issue Details
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <DialogFooter className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Audit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}