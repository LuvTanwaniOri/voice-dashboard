import React, { createContext, useContext, useState, useEffect } from 'react';

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: 'setup' | 'configuration' | 'launch';
}

interface OnboardingContextType {
  tasks: OnboardingTask[];
  isDrawerOpen: boolean;
  progress: number;
  isOnboardingComplete: boolean;
  toggleTask: (taskId: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const defaultTasks: OnboardingTask[] = [
  {
    id: 'create-assistant',
    title: 'Create your AI Assistant',
    description: 'Set up your voice, language, and assistant personality',
    completed: false,
    category: 'setup'
  },
  {
    id: 'add-knowledge',
    title: 'Add Knowledge Base',
    description: 'Upload documents or link data sources your assistant will use',
    completed: false,
    category: 'setup'
  },
  {
    id: 'configure-settings',
    title: 'Configure Voice Settings',
    description: 'Customize voice parameters and response behavior',
    completed: false,
    category: 'configuration'
  },
  {
    id: 'test-assistant',
    title: 'Test Your Assistant',
    description: 'Make a test call to ensure everything works correctly',
    completed: false,
    category: 'configuration'
  },
  {
    id: 'launch-campaign',
    title: 'Launch Your First Campaign',
    description: 'Create and launch your first voice bot campaign',
    completed: false,
    category: 'launch'
  }
];

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<OnboardingTask[]>(() => {
    const saved = localStorage.getItem('onboarding-tasks');
    return saved ? JSON.parse(saved) : defaultTasks;
  });
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const completedTasks = tasks.filter(task => task.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100);
  const isOnboardingComplete = progress === 100;

  useEffect(() => {
    localStorage.setItem('onboarding-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <OnboardingContext.Provider value={{
      tasks,
      isDrawerOpen,
      progress,
      isOnboardingComplete,
      toggleTask,
      openDrawer,
      closeDrawer
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}