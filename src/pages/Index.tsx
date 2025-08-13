import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { ScanInterface } from "@/components/scan/scan-interface";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "scan":
        return <ScanInterface />;
      case "inventory":
        return <div className="p-6"><h2 className="text-2xl font-bold">Estoque</h2></div>;
      case "movements":
        return <div className="p-6"><h2 className="text-2xl font-bold">Movimentos</h2></div>;
      case "counting":
        return <div className="p-6"><h2 className="text-2xl font-bold">Contagem Cíclica</h2></div>;
      case "reports":
        return <div className="p-6"><h2 className="text-2xl font-bold">Relatórios</h2></div>;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="flex">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
