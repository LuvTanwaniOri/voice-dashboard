import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { OnboardingDrawer } from "@/components/dashboard/OnboardingDrawer";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { CampaignManager } from "@/components/dashboard/CampaignManager";
import { AgentBuilder } from "@/components/dashboard/AgentBuilder";
import { AgentList } from "@/components/dashboard/AgentList";
import { AgentOverview } from "@/components/dashboard/AgentOverview";
import { Analytics } from "@/components/dashboard/Analytics";
import { KnowledgeBase } from "@/components/dashboard/KnowledgeBase";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { OperationsWallboard } from "@/components/dashboard/OperationsWallboard";
import { VoiceLexicon } from "@/components/dashboard/VoiceLexicon";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);
  const [isEditingAgent, setIsEditingAgent] = useState(false);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgentId(agentId);
    setIsCreatingAgent(false);
    setIsEditingAgent(false);
  };

  const handleCreateAgent = () => {
    setSelectedAgentId(null);
    setIsCreatingAgent(true);
    setIsEditingAgent(false);
  };

  const handleEditAgent = () => {
    setIsEditingAgent(true);
  };

  const handleBackToAgentList = () => {
    setSelectedAgentId(null);
    setIsCreatingAgent(false);
    setIsEditingAgent(false);
  };

  const handleBackToAgentOverview = () => {
    setIsEditingAgent(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'campaigns':
        return <CampaignManager />;
      case 'agents':
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
      case 'workspace':
        return <UserManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-0 top-0 h-full z-30">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <main className="ml-64 min-h-screen overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
      <OnboardingDrawer />
    </div>
  );
};

export default Index;
