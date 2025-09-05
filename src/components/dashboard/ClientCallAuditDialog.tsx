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
  callQuality: string[];
  botBehavior: string[];
  customerExperience: string[];
  overallFeedback: string;
  rating?: number;
}

interface ClientCallAuditDialogProps {
  sessionId: string;
  onSave: (auditData: Omit<ClientCallAudit, 'id' | 'timestamp'>) => void;
}

const auditCategories = {
  callQuality: [
    { id: 'clear-audio', label: 'Clear Audio Quality', icon: Volume2 },
    { id: 'no-interruptions', label: 'No Technical Interruptions', icon: CheckCircle2 },
    { id: 'good-connection', label: 'Stable Connection', icon: Target },
    { id: 'appropriate-timing', label: 'Appropriate Call Timing', icon: Clock }
  ],
  botBehavior: [
    { id: 'polite', label: 'Polite and Professional', icon: Users },
    { id: 'understood-query', label: 'Understood Customer Query', icon: MessageSquare },
    { id: 'helpful-responses', label: 'Provided Helpful Responses', icon: CheckCircle2 },
    { id: 'natural-conversation', label: 'Natural Conversation Flow', icon: MessageSquare }
  ],
  customerExperience: [
    { id: 'problem-solved', label: 'Problem Was Resolved', icon: CheckCircle2 },
    { id: 'satisfying-experience', label: 'Overall Satisfying Experience', icon: Star },
    { id: 'would-recommend', label: 'Would Recommend to Others', icon: Users },
    { id: 'efficient-service', label: 'Quick and Efficient Service', icon: Target }
  ]
};

export function ClientCallAuditDialog({ sessionId, onSave }: ClientCallAuditDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<{
    callQuality: string[];
    botBehavior: string[];
    customerExperience: string[];
  }>({
    callQuality: [],
    botBehavior: [],
    customerExperience: []
  });
  const [overallFeedback, setOverallFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);

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
      callQuality: selectedCategories.callQuality,
      botBehavior: selectedCategories.botBehavior,
      customerExperience: selectedCategories.customerExperience,
      overallFeedback,
      rating: rating || undefined
    };

    onSave(auditData);
    
    // Reset form
    setSelectedCategories({
      callQuality: [],
      botBehavior: [],
      customerExperience: []
    });
    setOverallFeedback("");
    setRating(null);
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
            
            {/* Overall Rating */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block">
                  Overall Call Rating
                </Label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={cn(
                        "p-1 rounded transition-colors",
                        rating && rating >= star
                          ? "text-warning hover:text-warning/80"
                          : "text-muted hover:text-text-muted"
                      )}
                    >
                      <Star className={cn(
                        "w-6 h-6",
                        rating && rating >= star ? "fill-current" : ""
                      )} />
                    </button>
                  ))}
                  {rating && (
                    <span className="ml-2 text-sm text-text-muted">
                      {rating} out of 5 stars
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Call Quality */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block flex items-center">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Call Quality
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCategories.callQuality.length} selected
                  </Badge>
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {auditCategories.callQuality.map((item) => {
                    const isSelected = selectedCategories.callQuality.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryToggle('callQuality', item.id)}
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

            {/* Bot Behavior */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Bot Behavior
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCategories.botBehavior.length} selected
                  </Badge>
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {auditCategories.botBehavior.map((item) => {
                    const isSelected = selectedCategories.botBehavior.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryToggle('botBehavior', item.id)}
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

            {/* Customer Experience */}
            <Card>
              <CardContent className="pt-4">
                <Label className="text-sm font-medium text-text-primary mb-3 block flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Customer Experience
                  <Badge variant="secondary" className="ml-auto">
                    {selectedCategories.customerExperience.length} selected
                  </Badge>
                </Label>
                <div className="grid grid-cols-1 gap-2">
                  {auditCategories.customerExperience.map((item) => {
                    const isSelected = selectedCategories.customerExperience.includes(item.id);
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleCategoryToggle('customerExperience', item.id)}
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