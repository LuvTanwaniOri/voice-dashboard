import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  FileText, 
  Phone, 
  CheckCircle, 
  ArrowRight,
  Plus,
  Settings,
  ChevronRight,
  PlayCircle
} from "lucide-react";

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  completed: boolean;
  active?: boolean;
}

interface WorkflowGuideProps {
  onNavigate: (section: string) => void;
}

export function WorkflowGuide({ onNavigate }: WorkflowGuideProps) {
  const [steps] = useState<WorkflowStep[]>([
    {
      id: "agent",
      title: "Create Your AI Assistant",
      description: "Set up your voice agent with personality, language, and compliance settings",
      icon: Bot,
      completed: false,
      active: true
    },
    {
      id: "knowledge",
      title: "Add Knowledge Base",
      description: "Upload documents and data your agent needs to handle conversations",
      icon: FileText,
      completed: false
    },
    {
      id: "campaign",
      title: "Launch Campaign",
      description: "Configure audience, schedule, and pacing to start making calls",
      icon: Phone,
      completed: false
    }
  ]);

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground">Welcome to Voice AI</h1>
        <p className="text-xl text-muted-foreground">
          Get started in 3 simple steps - we'll guide you through creating your first voice campaign
        </p>
        
        {/* Progress Overview */}
        <div className="bg-gradient-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">Setup Progress</span>
            <span className="text-sm font-medium text-foreground">{completedSteps} of {steps.length} completed</span>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            {completedSteps === 0 && "Ready to get started? Let's create your first AI assistant!"}
            {completedSteps === 1 && "Great progress! Now add some knowledge to your assistant."}
            {completedSteps === 2 && "Almost there! Time to launch your first campaign."}
            {completedSteps === 3 && "🎉 All set! Your voice AI is ready to start making calls."}
          </p>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.active && !step.completed;
          
          return (
            <Card 
              key={step.id}
              className={`relative transition-all duration-300 ${
                step.completed 
                  ? 'bg-success/10 border-success/30' 
                  : isActive 
                    ? 'bg-primary/10 border-primary/30 shadow-glow' 
                    : 'bg-gradient-card border-border/50'
              }`}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-background border-2 border-current flex items-center justify-center text-sm font-bold">
                {step.completed ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <span className={step.active ? 'text-primary' : 'text-muted-foreground'}>
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-8 w-16 h-px bg-border">
                  <ChevronRight className="w-4 h-4 text-muted-foreground absolute -top-2 right-0" />
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  step.completed 
                    ? 'bg-success/20 text-success' 
                    : isActive 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted/20 text-muted-foreground'
                }`}>
                  <Icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>

              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>

                <div className="space-y-2">
                  {step.completed ? (
                    <Badge className="bg-success/20 text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  ) : isActive ? (
                    <Button 
                      className="w-full"
                      onClick={() => onNavigate(step.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      disabled
                      className="w-full"
                    >
                      Coming Next
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-center">Need Help Getting Started?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <PlayCircle className="w-6 h-6 text-primary" />
                <div className="text-center">
                  <div className="font-medium">Watch Tutorial</div>
                  <div className="text-xs text-muted-foreground">5-minute quickstart</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <FileText className="w-6 h-6 text-primary" />
                <div className="text-center">
                  <div className="font-medium">Documentation</div>
                  <div className="text-xs text-muted-foreground">Step-by-step guides</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Settings className="w-6 h-6 text-primary" />
                <div className="text-center">
                  <div className="font-medium">Use Template</div>
                  <div className="text-xs text-muted-foreground">Pre-configured setups</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}