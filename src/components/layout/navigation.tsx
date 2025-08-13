import { 
  BarChart3, 
  Camera, 
  Package, 
  Plus, 
  Settings, 
  TrendingUp, 
  Users,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "scan", label: "Escanear", icon: Camera },
  { id: "inventory", label: "Estoque", icon: Package },
  { id: "movements", label: "Movimentos", icon: Plus },
  { id: "counting", label: "Contagem", icon: ClipboardList },
  { id: "reports", label: "Relatórios", icon: TrendingUp },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="border-r border-border bg-card/30 backdrop-blur-sm w-64 p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full justify-start gap-3 h-12 text-left",
                isActive 
                  ? "bg-primary/10 text-primary hover:bg-primary/15 border-r-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configurações</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 text-muted-foreground hover:text-foreground hover:bg-muted/50"
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Usuários</span>
        </Button>
      </div>
    </nav>
  );
}