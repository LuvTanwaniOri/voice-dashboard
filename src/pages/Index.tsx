import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'campaigns':
        return <div className="p-6"><h2 className="text-2xl font-bold text-foreground">Campaigns</h2><p className="text-muted-foreground">Campaign management coming soon...</p></div>;
      case 'agents':
        return <div className="p-6"><h2 className="text-2xl font-bold text-foreground">AI Agents</h2><p className="text-muted-foreground">Agent configuration coming soon...</p></div>;
      case 'analytics':
        return <div className="p-6"><h2 className="text-2xl font-bold text-foreground">Analytics</h2><p className="text-muted-foreground">Advanced analytics coming soon...</p></div>;
      case 'knowledge':
        return <div className="p-6"><h2 className="text-2xl font-bold text-foreground">Knowledge Base</h2><p className="text-muted-foreground">Knowledge management coming soon...</p></div>;
      case 'workspace':
        return <div className="p-6"><h2 className="text-2xl font-bold text-foreground">Workspace</h2><p className="text-muted-foreground">Workspace settings coming soon...</p></div>;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold text-foreground">Settings</h2><p className="text-muted-foreground">Platform settings coming soon...</p></div>;
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
