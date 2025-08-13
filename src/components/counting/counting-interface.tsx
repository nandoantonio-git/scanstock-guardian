import { useState } from "react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardList, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  Play,
  Eye,
  Plus,
  Calendar
} from "lucide-react";

export function CountingInterface() {
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = [
    {
      title: "Acurácia Atual",
      value: "98.2%",
      subtitle: "+0.3% vs mês anterior",
      icon: TrendingUp,
      variant: "success" as const,
      trend: { value: 0.3, isPositive: true }
    },
    {
      title: "Contagens Ativas",
      value: "12",
      subtitle: "Em execução",
      icon: Clock,
      variant: "default" as const
    },
    {
      title: "Divergências",
      value: "8",
      subtitle: "Aguardando resolução",
      icon: AlertTriangle,
      variant: "warning" as const
    },
    {
      title: "Completadas Hoje",
      value: "45",
      subtitle: "92% da meta diária",
      icon: CheckCircle,
      variant: "success" as const
    }
  ];

  const activeCounts = [
    {
      id: "CC-001",
      setor: "UTI",
      responsavel: "Ana Silva",
      progresso: 75,
      total: 48,
      contados: 36,
      divergencias: 2,
      inicio: "08:30",
      previsao: "16:45"
    },
    {
      id: "CC-002", 
      setor: "Emergência",
      responsavel: "Carlos Santos",
      progresso: 45,
      total: 64,
      contados: 29,
      divergencias: 1,
      inicio: "09:15",
      previsao: "17:30"
    },
    {
      id: "CC-003",
      setor: "Centro Cirúrgico",
      responsavel: "Maria Costa",
      progresso: 20,
      total: 82,
      contados: 16,
      divergencias: 0,
      inicio: "10:00",
      previsao: "18:15"
    }
  ];

  const divergences = [
    {
      id: "DIV-001",
      item: "Seringa 10ml BD",
      lote: "LOT2024A1",
      sistema: 25,
      contado: 23,
      diferenca: -2,
      contador: "Ana Silva",
      setor: "UTI",
      status: "Pendente"
    },
    {
      id: "DIV-002",
      item: "Cateter Venoso 22G", 
      lote: "CAT2024B2",
      sistema: 15,
      contado: 18,
      diferenca: +3,
      contador: "Carlos Santos",
      setor: "Emergência",
      status: "Investigando"
    },
    {
      id: "DIV-003",
      item: "Luva Nitrílica M",
      lote: "GLV2024C3",
      sistema: 50,
      contado: 47,
      diferenca: -3,
      contador: "Ana Silva",
      setor: "UTI",
      status: "Resolvido"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "Pendente": "secondary",
      "Investigando": "destructive", 
      "Resolvido": "default"
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contagem Cíclica</h1>
          <p className="text-muted-foreground">Monitoramento e execução de contagens para acurácia do estoque</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Agendar Contagem
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Contagem
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="active">Contagens Ativas</TabsTrigger>
          <TabsTrigger value="divergences">Divergências</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Plano Semanal */}
            <MedicalCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Plano Semanal ABC
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                    <div>
                      <p className="font-medium">Classe A - Alta Rotação</p>
                      <p className="text-sm text-muted-foreground">15 itens planejados</p>
                    </div>
                    <Badge variant="outline" className="text-success">100% Completo</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-warning/10">
                    <div>
                      <p className="font-medium">Classe B - Média Rotação</p>
                      <p className="text-sm text-muted-foreground">28 itens planejados</p>
                    </div>
                    <Badge variant="outline" className="text-warning">75% Completo</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Classe C - Baixa Rotação</p>
                      <p className="text-sm text-muted-foreground">67 itens planejados</p>
                    </div>
                    <Badge variant="outline">25% Completo</Badge>
                  </div>
                </div>
              </div>
            </MedicalCard>

            {/* Histórico de Acurácia */}
            <MedicalCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Histórico de Acurácia
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Esta semana</span>
                    <span className="font-medium text-success">98.2%</span>
                  </div>
                  <Progress value={98.2} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Semana anterior</span>
                    <span className="font-medium">97.9%</span>
                  </div>
                  <Progress value={97.9} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mês atual</span>
                    <span className="font-medium">98.0%</span>
                  </div>
                  <Progress value={98.0} className="h-2" />
                </div>
              </div>
            </MedicalCard>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <MedicalCard>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contagens em Andamento</h3>
              <div className="space-y-4">
                {activeCounts.map((count) => (
                  <div key={count.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{count.setor}</h4>
                        <p className="text-sm text-muted-foreground">
                          Responsável: {count.responsavel} • ID: {count.id}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Detalhes
                        </Button>
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-1" />
                          Continuar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Progresso</span>
                        <p className="font-medium">{count.contados}/{count.total} itens</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Divergências</span>
                        <p className="font-medium text-warning">{count.divergencias}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Início</span>
                        <p className="font-medium">{count.inicio}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Previsão</span>
                        <p className="font-medium">{count.previsao}</p>
                      </div>
                    </div>
                    
                    <Progress value={count.progresso} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="divergences" className="space-y-6">
          <MedicalCard>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Divergências Encontradas</h3>
                <Badge variant="outline" className="text-warning">
                  {divergences.filter(d => d.status !== "Resolvido").length} Pendentes
                </Badge>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Sistema</TableHead>
                    <TableHead>Contado</TableHead>
                    <TableHead>Diferença</TableHead>
                    <TableHead>Contador</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-16">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {divergences.map((div) => (
                    <TableRow key={div.id}>
                      <TableCell className="font-mono text-sm">{div.id}</TableCell>
                      <TableCell className="font-medium">{div.item}</TableCell>
                      <TableCell className="font-mono text-sm">{div.lote}</TableCell>
                      <TableCell>{div.sistema}</TableCell>
                      <TableCell>{div.contado}</TableCell>
                      <TableCell className={div.diferenca < 0 ? "text-destructive" : "text-success"}>
                        {div.diferenca > 0 ? "+" : ""}{div.diferenca}
                      </TableCell>
                      <TableCell>{div.contador}</TableCell>
                      <TableCell>{div.setor}</TableCell>
                      <TableCell>{getStatusBadge(div.status)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Resolução de Divergência</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Item</label>
                                  <p className="font-medium">{div.item}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Lote</label>
                                  <p className="font-mono">{div.lote}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Quantidade Sistema</label>
                                  <p>{div.sistema}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Quantidade Contada</label>
                                  <p>{div.contado}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">Recontar</Button>
                                <Button className="flex-1">Aprovar Ajuste</Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </MedicalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}