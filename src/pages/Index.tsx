import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { CampaignManager } from "@/components/dashboard/CampaignManager";
import { AgentBuilder } from "@/components/dashboard/AgentBuilder";
import { Analytics } from "@/components/dashboard/Analytics";
import { KnowledgeBase } from "@/components/dashboard/KnowledgeBase";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { OperationsWallboard } from "@/components/dashboard/OperationsWallboard";
import { VoiceLexicon } from "@/components/dashboard/VoiceLexicon";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'campaigns':
        return <CampaignManager />;
      case 'agents':
        return <AgentBuilder />;
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
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
