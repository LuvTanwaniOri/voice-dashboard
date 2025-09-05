import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, XCircle, CheckCircle, Edit, Trash2 } from "lucide-react";
import type { Annotation } from "./AnnotationDialog";

interface AnnotationIndicatorProps {
  annotation: Annotation;
  onEdit: () => void;
  onDelete: () => void;
}

export function AnnotationIndicator({ annotation, onEdit, onDelete }: AnnotationIndicatorProps) {
  const getAnnotationIcon = (type: Annotation['type']) => {
    switch (type) {
      case 'correction':
        return <AlertTriangle className="w-3 h-3" />;
      case 'missing_detection':
        return <XCircle className="w-3 h-3" />;
      case 'false_detection':
        return <CheckCircle className="w-3 h-3" />;
    }
  };

  const getAnnotationColor = (type: Annotation['type']) => {
    switch (type) {
      case 'correction':
        return 'bg-warning/20 text-warning border-warning/40 hover:bg-warning/30';
      case 'missing_detection':
        return 'bg-destructive/20 text-destructive border-destructive/40 hover:bg-destructive/30';
      case 'false_detection':
        return 'bg-accent-blue/20 text-accent-blue border-accent-blue/40 hover:bg-accent-blue/30';
    }
  };

  const getAnnotationLabel = (type: Annotation['type']) => {
    switch (type) {
      case 'correction':
        return 'Transcription Correction';
      case 'missing_detection':
        return 'Missing Detection';
      case 'false_detection':
        return 'False Detection';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2 mt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className={`${getAnnotationColor(annotation.type)} cursor-pointer transition-colors`}
            >
              {getAnnotationIcon(annotation.type)}
              <span className="ml-1 text-xs">Annotated</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-sm">
            <div className="space-y-2">
              <div className="font-semibold text-sm">{getAnnotationLabel(annotation.type)}</div>
              <div className="text-xs space-y-1">
                <div>
                  <span className="font-medium">Time: </span>
                  {formatTime(annotation.startTime)} - {formatTime(annotation.endTime)}
                </div>
                <div>
                  <span className="font-medium">Detected: </span>
                  "{annotation.detectedText || 'Nothing'}"
                </div>
                {annotation.actualText && (
                  <div>
                    <span className="font-medium">Actual: </span>
                    "{annotation.actualText}"
                  </div>
                )}
                <div>
                  <span className="font-medium">Confidence: </span>
                  {annotation.confidence}/10
                </div>
                {annotation.notes && (
                  <div>
                    <span className="font-medium">Notes: </span>
                    {annotation.notes}
                  </div>
                )}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
            className="h-6 w-6 p-0 hover:bg-accent-blue/20"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onDelete}
            className="h-6 w-6 p-0 hover:bg-destructive/20 text-destructive"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}