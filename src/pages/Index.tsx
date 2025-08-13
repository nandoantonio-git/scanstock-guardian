import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { ScanInterface } from "@/components/scan/scan-interface";
import { InventoryInterface } from "@/components/inventory/inventory-interface";
import { MovementsInterface } from "@/components/movements/movements-interface";
import { CountingInterface } from "@/components/counting/counting-interface";
import { ReportsInterface } from "@/components/reports/reports-interface";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "scan":
        return <ScanInterface />;
      case "inventory":
        return <InventoryInterface />;
      case "movements":
        return <MovementsInterface />;
      case "counting":
        return <CountingInterface />;
      case "reports":
        return <ReportsInterface />;
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
