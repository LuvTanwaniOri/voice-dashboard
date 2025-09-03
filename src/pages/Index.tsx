import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { OnboardingDrawer } from "@/components/dashboard/OnboardingDrawer";
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
