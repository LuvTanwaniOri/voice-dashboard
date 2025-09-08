import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { OnboardingDrawer } from "@/components/dashboard/OnboardingDrawer";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { CampaignManager } from "@/components/dashboard/CampaignManager";
import { AgentBuilder } from "@/components/dashboard/AgentBuilder";
import { AgentCreationWizard } from "@/components/dashboard/AgentCreationWizard";
import { AgentList } from "@/components/dashboard/AgentList";
import { AgentOverview } from "@/components/dashboard/AgentOverview";
import { Analytics } from "@/components/dashboard/Analytics";
import { KnowledgeBase } from "@/components/dashboard/KnowledgeBase";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { OperationsWallboard } from "@/components/dashboard/OperationsWallboard";
import { VoiceLexicon } from "@/components/dashboard/VoiceLexicon";
import { Conversations } from "@/components/dashboard/Conversations";
import { AuditingHistory } from "@/components/dashboard/AuditingHistory";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const [isEditingAgent, setIsEditingAgent] = useState(false);
  const [isUsingWizard, setIsUsingWizard] = useState(false);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgentId(agentId);
    setIsCreatingAgent(false);
    setIsEditingAgent(false);
  };

  const handleCreateAgent = () => {
    setSelectedAgentId(null);
    setIsCreatingAgent(true);
    setIsEditingAgent(false);
    setIsUsingWizard(true);
  };

  const handleWizardComplete = (agentData: any) => {
    // Here you would typically save the agent data to your backend
    console.log('Agent created:', agentData);
    
    // Reset states and show the new agent
    setIsCreatingAgent(false);
    setIsUsingWizard(false);
    setSelectedAgentId(agentData.id);
  };

  const handleEditAgent = () => {
    setIsEditingAgent(true);
  };

  const handleBackToAgentList = () => {
    setSelectedAgentId(null);
    setIsCreatingAgent(false);
    setIsEditingAgent(false);
    setIsUsingWizard(false);
  };

  const handleBackToAgentOverview = () => {
    setIsEditingAgent(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'conversations':
        return <Conversations />;
      case 'campaigns':
        return <CampaignManager />;
      case 'agents':
        if (isCreatingAgent && isUsingWizard) {
          return (
            <AgentCreationWizard 
              onComplete={handleWizardComplete}
              onBack={handleBackToAgentList}
            />
          );
        }
        if (isCreatingAgent || isEditingAgent) {
          return (
            <AgentBuilder 
              agentId={selectedAgentId} 
              onBack={isEditingAgent ? handleBackToAgentOverview : handleBackToAgentList}
              isCreating={isCreatingAgent}
            />
          );
        }
        if (selectedAgentId) {
          return (
            <AgentOverview 
              agentId={selectedAgentId}
              onBack={handleBackToAgentList}
              onEdit={handleEditAgent}
            />
          );
        }
        return (
          <AgentList 
            onSelectAgent={handleAgentSelect}
            onCreateAgent={handleCreateAgent}
          />
        );
      case 'analytics':
        return <Analytics />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'operations':
        return <OperationsWallboard />;
      case 'voice':
        return <VoiceLexicon />;
      case 'auditing':
        return <AuditingHistory />;
      case 'workspace':
        return <UserManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Neural Background Glow */}
      <div className="fixed inset-0 bg-gradient-glow pointer-events-none opacity-30" />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full z-30">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      
      {/* Main Content */}
      <main className="ml-64 min-h-screen overflow-auto relative">
        <div className="p-8 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            {renderContent()}
          </div>
        </div>
      </main>
      
      <OnboardingDrawer />
    </div>
  );
};

export default Index;
