import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  CheckCircle2,
  Star,
  Clock,
  Volume2,
  Users,
  Target
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ClientCallAudit {
  id: string;
  sessionId: string;
  timestamp: string;
  speechToText: string[];
  aiBusinessLogic: string[];
  textToSpeech: string[];
  callExperience: string[];
  systemLevel: string[];
  overallFeedback: string;
  rating?: number;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'resolved';
  createdBy: string;
}

interface ClientCallAuditDialogProps {
  sessionId: string;
  onSave: (auditData: Omit<ClientCallAudit, 'id' | 'timestamp' | 'status' | 'createdBy'>) => void;
}

const auditCategories = {
  speechToText: [
    { id: 'wrong-transcription', label: 'Wrong transcription', icon: MessageSquare },
    { id: 'background-noise', label: 'Background noise', icon: Volume2 },
    { id: 'partial-transcription', label: 'Partial transcription', icon: MessageSquare },
    { id: 'language-mismatch', label: 'Language/dialect mismatch', icon: MessageSquare }
  ],
  aiBusinessLogic: [
    { id: 'script-deviation', label: 'Script deviation', icon: Target },
    { id: 'hallucination', label: 'Hallucination', icon: MessageSquare },
    { id: 'unhandled-case', label: 'Unhandled case', icon: CheckCircle2 },
    { id: 'logical-inconsistency', label: 'Logical inconsistency', icon: Target },
    { id: 'tone-mismatch', label: 'Tone mismatch', icon: Users }
  ],
  textToSpeech: [
    { id: 'robotic-voice', label: 'Robotic voice', icon: Volume2 },
    { id: 'wrong-pronunciation', label: 'Wrong pronunciation', icon: Volume2 },
    { id: 'speech-rate-issues', label: 'Speech rate issues', icon: Clock },
    { id: 'gibberish-speech', label: 'Gibberish speech', icon: Volume2 },
    { id: 'voice-modulation-issues', label: 'Voice modulation issues', icon: Volume2 }
  ],
  callExperience: [
    { id: 'delay-opening-message', label: 'Delay in opening message', icon: Clock },
    { id: 'high-latency', label: 'High latency', icon: Clock },
    { id: 'interruption-handling-failure', label: 'Interruption handling failure', icon: MessageSquare },
    { id: 'awkward-pauses', label: 'Awkward pauses', icon: Clock },
    { id: 'echo-audio-quality', label: 'Echo/audio quality issues', icon: Volume2 }
  ],
  systemLevel: [
    { id: 'agent-transfer-failure', label: 'Agent transfer failure', icon: Users },
    { id: 'incomplete-transfer-statement', label: 'Incomplete transfer statement', icon: MessageSquare },
    { id: 'wrong-disposition', label: 'Wrong disposition', icon: Target },
    { id: 'missing-incorrect-transcript', label: 'Missing/incorrect transcript', icon: MessageSquare },
    { id: 'session-drop', label: 'Session drop', icon: CheckCircle2 }
  ]
};

export function ClientCallAuditDialog({ sessionId, onSave }: ClientCallAuditDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<{
    speechToText: string[];
    aiBusinessLogic: string[];
    textToSpeech: string[];
    callExperience: string[];
    systemLevel: string[];
  }>({
    speechToText: [],
    aiBusinessLogic: [],
    textToSpeech: [],
    callExperience: [],
    systemLevel: []
  });
  const [overallFeedback, setOverallFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');

  const handleCategoryToggle = (category: keyof typeof selectedCategories, itemId: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: prev[category].includes(itemId)
        ? prev[category].filter(id => id !== itemId)
        : [...prev[category], itemId]
    }));
  };

  const handleSubmit = () => {
    const auditData = {
      sessionId,
      speechToText: selectedCategories.speechToText,
      aiBusinessLogic: selectedCategories.aiBusinessLogic,
      textToSpeech: selectedCategories.textToSpeech,
      callExperience: selectedCategories.callExperience,
      systemLevel: selectedCategories.systemLevel,
      overallFeedback,
      rating: rating || undefined,
      severity
    };

    onSave(auditData);
    
    // Reset form
    setSelectedCategories({
      speechToText: [],
      aiBusinessLogic: [],
      textToSpeech: [],
      callExperience: [],
      systemLevel: []
    });
    setOverallFeedback("");
    setRating(null);
    setSeverity('medium');
    setOpen(false);
  };

  const getTotalSelected = () => {
    return Object.values(selectedCategories).reduce((acc, arr) => acc + arr.length, 0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="shadow-sm">
          <MessageSquare className="w-4 h-4 mr-1" />
          Client Call Audit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-accent-blue" />
            <span>Client Call Audit</span>
            <Badge variant="secondary" className="ml-2">
              Session {sessionId.slice(-8)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 py-4">
            
            {/* Overall Rating and Severity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Compact Overall Rating */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Overall Call Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={cn(
                        "p-0.5 transition-colors rounded",
                        star <= (rating || 0) 
                          ? 'text-yellow-500 hover:text-yellow-600' 
                          : 'text-muted-foreground hover:text-yellow-400 border border-muted-foreground/30'
                      )}
                    >
                      <Star className={`h-5 w-5 ${star <= (rating || 0) ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {rating ? `${rating}/5` : 'No rating'}
                  </span>
                </div>
              </div>

              {/* Issue Severity Dropdown */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Issue Severity</Label>
                <Select value={severity} onValueChange={(value) => setSeverity(value as 'low' | 'medium' | 'high')}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Low</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>Medium</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>High</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Speech-to-Text Issues */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Speech-to-Text (STT) Issues
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCategories.speechToText.length} selected
                  </Badge>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {auditCategories.speechToText.map((item) => {
                    const isSelected = selectedCategories.speechToText.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryToggle('speechToText', item.id)}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg border text-left transition-all",
                          isSelected
                            ? "bg-accent-blue/10 border-accent-blue/30 text-accent-blue"
                            : "bg-surface hover:bg-surface-2 border-border/50 text-text-secondary hover:text-text-primary"
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* AI & Business Logic Issues */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  LLM / Gen AI & Business Logic Issues
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCategories.aiBusinessLogic.length} selected
                  </Badge>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {auditCategories.aiBusinessLogic.map((item) => {
                    const isSelected = selectedCategories.aiBusinessLogic.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryToggle('aiBusinessLogic', item.id)}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg border text-left transition-all",
                          isSelected
                            ? "bg-success/10 border-success/30 text-success"
                            : "bg-surface hover:bg-surface-2 border-border/50 text-text-secondary hover:text-text-primary"
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Text-to-Speech Issues */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block flex items-center">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Text-to-Speech (TTS) Issues
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCategories.textToSpeech.length} selected
                  </Badge>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {auditCategories.textToSpeech.map((item) => {
                    const isSelected = selectedCategories.textToSpeech.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryToggle('textToSpeech', item.id)}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg border text-left transition-all",
                          isSelected
                            ? "bg-warning/10 border-warning/30 text-warning"
                            : "bg-surface hover:bg-surface-2 border-border/50 text-text-secondary hover:text-text-primary"
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Call Experience Issues */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Call Experience Issues
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCategories.callExperience.length} selected
                  </Badge>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {auditCategories.callExperience.map((item) => {
                    const isSelected = selectedCategories.callExperience.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryToggle('callExperience', item.id)}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg border text-left transition-all",
                          isSelected
                            ? "bg-error/10 border-error/30 text-error"
                            : "bg-surface hover:bg-surface-2 border-border/50 text-text-secondary hover:text-text-primary"
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System-Level Issues */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  System-Level Issues
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCategories.systemLevel.length} selected
                  </Badge>
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {auditCategories.systemLevel.map((item) => {
                    const isSelected = selectedCategories.systemLevel.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryToggle('systemLevel', item.id)}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg border text-left transition-all",
                          isSelected
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-surface hover:bg-surface-2 border-border/50 text-text-secondary hover:text-text-primary"
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Overall Feedback */}
            <Card>
              <CardContent className="pt-4">
                <Label htmlFor="feedback" className="text-sm font-medium text-text-primary mb-3 block">
                  Additional Feedback
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your overall experience with this call. What went well? What could be improved?"
                  value={overallFeedback}
                  onChange={(e) => setOverallFeedback(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Badge variant="secondary" className="bg-accent-blue/10 text-accent-blue">
              {getTotalSelected()} items selected
            </Badge>
            {rating && (
              <Badge variant="secondary" className="bg-warning/10 text-warning">
                {rating}★ rating
              </Badge>
            )}
            <Badge variant="secondary" className={cn(
              severity === 'low' ? "bg-success/10 text-success" :
              severity === 'medium' ? "bg-warning/10 text-warning" :
              "bg-error/10 text-error"
            )}>
              {severity} severity
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={getTotalSelected() === 0 && !overallFeedback.trim()}
              className="shadow-sm"
            >
              Save Audit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}