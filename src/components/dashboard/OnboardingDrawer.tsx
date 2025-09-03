import { useOnboarding } from "@/contexts/OnboardingContext";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Bot, 
  Database, 
  Settings, 
  TestTube, 
  Rocket,
  CheckCircle2,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";

const taskIcons = {
  'create-assistant': Bot,
  'add-knowledge': Database,
  'configure-settings': Settings,
  'test-assistant': TestTube,
  'launch-campaign': Rocket,
};

const categoryColors = {
  setup: 'bg-accent-blue/10 text-accent-blue border-accent-blue/20',
  configuration: 'bg-warning/10 text-warning border-warning/20',
  launch: 'bg-success/10 text-success border-success/20',
};

export function OnboardingDrawer() {
  const { 
    tasks, 
    isDrawerOpen, 
    progress, 
    closeDrawer, 
    toggleTask,
    isOnboardingComplete 
  } = useOnboarding();

  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) acc[task.category] = [];
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={closeDrawer} direction="right">
      <DrawerContent className="h-full w-[400px] ml-auto fixed right-0 top-0">
        <DrawerHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold text-text-primary flex items-center space-x-2">
                {isOnboardingComplete ? (
                  <CheckCircle2 className="w-6 h-6 text-success" />
                ) : (
                  <Circle className="w-6 h-6 text-accent-blue" />
                )}
                <span>Getting Started</span>
              </DrawerTitle>
              <DrawerDescription className="text-text-muted">
                {isOnboardingComplete 
                  ? "🎉 Setup complete! You're ready to go."
                  : "Complete these steps to set up your voice bot platform"
                }
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </div>
          
          {!isOnboardingComplete && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary">Progress</span>
                <span className="text-sm font-bold text-accent-blue">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          )}
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
            <div key={category} className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={cn("text-xs font-medium", categoryColors[category as keyof typeof categoryColors])}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
                <div className="h-px bg-border/50 flex-1" />
              </div>

              <div className="space-y-3">
                {categoryTasks.map((task) => {
                  const IconComponent = taskIcons[task.id as keyof typeof taskIcons];
                  
                  return (
                    <div
                      key={task.id}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-base group",
                        task.completed
                          ? "bg-success/5 border-success/20 shadow-sm"
                          : "bg-surface border-border/50 hover:border-accent-blue/30 hover:shadow-glow/10"
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center mt-0.5">
                          <Checkbox
                            id={task.id}
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="data-[state=checked]:bg-success data-[state=checked]:border-success"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-base",
                              task.completed 
                                ? "bg-success text-white" 
                                : "bg-surface-2 text-text-muted group-hover:bg-accent-blue group-hover:text-white"
                            )}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <label 
                              htmlFor={task.id}
                              className={cn(
                                "font-semibold cursor-pointer transition-colors duration-base",
                                task.completed 
                                  ? "text-text-primary line-through decoration-success/50" 
                                  : "text-text-primary hover:text-accent-blue"
                              )}
                            >
                              {task.title}
                            </label>
                          </div>
                          
                          <p className={cn(
                            "text-sm transition-colors duration-base",
                            task.completed 
                              ? "text-text-muted line-through decoration-success/30" 
                              : "text-text-secondary"
                          )}>
                            {task.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {isOnboardingComplete && (
            <div className="mt-8 p-6 rounded-xl bg-gradient-success text-white text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">All Set!</h3>
              <p className="text-white/90 text-sm">
                Your voice bot platform is ready to use. Start creating campaigns and engage with your audience!
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}