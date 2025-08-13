import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Calendar,
  Zap,
  CheckCircle2
} from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { MedicalCard } from "@/components/ui/medical-card";

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Itens em Estoque"
          value="2,847"
          subtitle="Total de SKUs ativos"
          icon={Package}
          variant="default"
          trend={{ value: 3.2, isPositive: true }}
        />
        <MetricCard
          title="Baixo Estoque"
          value="23"
          subtitle="Itens abaixo do mínimo"
          icon={AlertTriangle}
          variant="warning"
          trend={{ value: -12, isPositive: true }}
        />
        <MetricCard
          title="Vencendo em 30 dias"
          value="8"
          subtitle="Requer atenção urgente"
          icon={Calendar}
          variant="destructive"
          trend={{ value: -25, isPositive: true }}
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Movimentações Hoje"
          value="156"
          subtitle="Retiradas e inserções"
          icon={Zap}
          variant="success"
        />
        <MetricCard
          title="Acurácia do Estoque"
          value="98.7%"
          subtitle="Última contagem cíclica"
          icon={CheckCircle2}
          variant="success"
        />
        <MetricCard
          title="Giro Médio"
          value="45"
          subtitle="Dias de cobertura"
          icon={TrendingDown}
          variant="default"
        />
      </div>

      {/* Quick Actions */}
      <MedicalCard variant="gradient" className="animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Ações Rápidas</h3>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Escanear Item", color: "bg-primary/10 text-primary" },
            { label: "Registrar Entrada", color: "bg-success/10 text-success" },
            { label: "Contagem Rápida", color: "bg-warning/10 text-warning" },
            { label: "Ver Alertas", color: "bg-destructive/10 text-destructive" }
          ].map((action, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg transition-smooth hover:scale-105 ${action.color}`}
            >
              <div className="text-sm font-medium">{action.label}</div>
            </button>
          ))}
        </div>
      </MedicalCard>

      {/* Recent Activity */}
      <MedicalCard variant="elevated">
        <h3 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          {[
            {
              action: "Retirada",
              item: "Seringa 20ml - Lote ABC123",
              user: "Ana Silva",
              time: "há 2 min",
              status: "success"
            },
            {
              action: "Entrada",
              item: "Luvas Cirúrgicas M - Lote DEF456",
              user: "Carlos Santos",
              time: "há 15 min",
              status: "info"
            },
            {
              action: "Ajuste",
              item: "Gaze Estéril 10x10 - Lote GHI789",
              user: "Maria Costa",
              time: "há 1 hora",
              status: "warning"
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'success' ? 'bg-success' :
                activity.status === 'info' ? 'bg-primary' : 'bg-warning'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {activity.action}: {activity.item}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </MedicalCard>
    </div>
  );
}