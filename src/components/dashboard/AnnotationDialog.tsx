import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { AudioWaveform } from "./AudioWaveform";
import { Save, X, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export interface Annotation {
  id: string;
  messageIndex: number;
  type: 'correction' | 'missing_detection' | 'false_detection';
  actualText: string;
  detectedText: string;
  startTime: number;
  endTime: number;
  confidence: number;
  notes?: string;
  timestamp: string;
}

interface AnnotationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (annotation: Omit<Annotation, 'id' | 'timestamp'>) => void;
  messageIndex: number;
  detectedText: string;
  audioUrl?: string;
  callDuration: number;
  messageStartTime?: number;
  messageEndTime?: number;
  existingAnnotation?: Annotation;
}

export function AnnotationDialog({
  open,
  onClose,
  onSave,
  messageIndex,
  detectedText,
  audioUrl,
  callDuration,
  messageStartTime = 0,
  messageEndTime,
  existingAnnotation
}: AnnotationDialogProps) {
  const [annotationType, setAnnotationType] = useState<Annotation['type']>(
    existingAnnotation?.type || 'correction'
  );
  const [actualText, setActualText] = useState(existingAnnotation?.actualText || '');
  const [notes, setNotes] = useState(existingAnnotation?.notes || '');
  const [timeRange, setTimeRange] = useState({
    start: existingAnnotation?.startTime || messageStartTime,
    end: existingAnnotation?.endTime || messageEndTime || Math.min(messageStartTime + 5, callDuration)
  });
  const [confidence, setConfidence] = useState(existingAnnotation?.confidence || 5);

  const handleSave = () => {
    const annotation: Omit<Annotation, 'id' | 'timestamp'> = {
      messageIndex,
      type: annotationType,
      actualText: actualText.trim(),
      detectedText,
      startTime: timeRange.start,
      endTime: timeRange.end,
      confidence,
      notes: notes.trim() || undefined
    };

    onSave(annotation);
    onClose();
  };

  const handleTimeSelect = useCallback((startTime: number, endTime: number) => {
    setTimeRange({ start: startTime, end: endTime });
  }, []);

  const getAnnotationTypeIcon = (type: Annotation['type']) => {
    switch (type) {
      case 'correction':
        return <AlertTriangle className="w-4 h-4" />;
      case 'missing_detection':
        return <XCircle className="w-4 h-4" />;
      case 'false_detection':
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getAnnotationTypeColor = (type: Annotation['type']) => {
    switch (type) {
      case 'correction':
        return 'bg-warning/10 text-warning border-warning/30';
      case 'missing_detection':
        return 'bg-destructive/10 text-destructive border-destructive/30';
      case 'false_detection':
        return 'bg-accent-blue/10 text-accent-blue border-accent-blue/30';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Annotate Customer Message</span>
            <Badge variant="outline" className="text-xs">
              Message #{messageIndex + 1}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Detected Text */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Currently Detected Text</Label>
            <div className="p-3 bg-surface-2/50 rounded-lg border border-border/30">
              <p className="text-sm text-text-secondary italic">
                {detectedText || "No text detected"}
              </p>
            </div>
          </div>

          {/* Annotation Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Annotation Type</Label>
            <RadioGroup 
              value={annotationType} 
              onValueChange={(value) => setAnnotationType(value as Annotation['type'])}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="correction" id="correction" />
                <label 
                  htmlFor="correction" 
                  className="flex items-center space-x-2 cursor-pointer flex-1"
                >
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getAnnotationTypeColor('correction')}`}>
                    {getAnnotationTypeIcon('correction')}
                    <div>
                      <span className="font-medium">Transcription Correction</span>
                      <p className="text-xs opacity-80">Customer said something different than detected</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="missing_detection" id="missing_detection" />
                <label 
                  htmlFor="missing_detection" 
                  className="flex items-center space-x-2 cursor-pointer flex-1"
                >
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getAnnotationTypeColor('missing_detection')}`}>
                    {getAnnotationTypeIcon('missing_detection')}
                    <div>
                      <span className="font-medium">Missing Detection</span>
                      <p className="text-xs opacity-80">Customer spoke but system detected nothing</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false_detection" id="false_detection" />
                <label 
                  htmlFor="false_detection" 
                  className="flex items-center space-x-2 cursor-pointer flex-1"
                >
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getAnnotationTypeColor('false_detection')}`}>
                    {getAnnotationTypeIcon('false_detection')}
                    <div>
                      <span className="font-medium">False Detection</span>
                      <p className="text-xs opacity-80">System detected text but customer said nothing</p>
                    </div>
                  </div>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Audio Timeline Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Audio Timeline Selection</Label>
            <div className="p-4 bg-surface-2/30 rounded-lg border border-border/30">
              <AudioWaveform
                audioUrl={audioUrl}
                duration={callDuration}
                onTimeSelect={handleTimeSelect}
                selectedRange={timeRange}
              />
            </div>
          </div>

          {/* Actual Text Input */}
          {(annotationType === 'correction' || annotationType === 'missing_detection') && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                What the customer actually said
              </Label>
              <Textarea
                value={actualText}
                onChange={(e) => setActualText(e.target.value)}
                placeholder="Enter what the customer actually said during the selected time period..."
                className="min-h-[80px] resize-none"
              />
            </div>
          )}

          {/* Confidence Level */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Confidence Level (1-10)</Label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="10"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="flex-1 h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer slider"
              />
              <Badge variant="outline" className="min-w-[3rem] text-center">
                {confidence}/10
              </Badge>
            </div>
            <p className="text-xs text-text-muted">
              How confident are you about this annotation?
            </p>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Additional Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional context or notes about this annotation..."
              className="min-h-[60px] resize-none"
            />
          </div>
        </div>

        <DialogFooter className="flex items-center space-x-2">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={
              (annotationType === 'correction' || annotationType === 'missing_detection') && 
              !actualText.trim()
            }
          >
            <Save className="w-4 h-4 mr-2" />
            Save Annotation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}