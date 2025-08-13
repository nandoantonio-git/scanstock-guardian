import { useState } from "react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  Search, 
  Filter,
  Wifi,
  WifiOff,
  Eye,
  Download,
  Plus
} from "lucide-react";

export function MovementsInterface() {
  const [filterType, setFilterType] = useState("all");
  const [filterDate, setFilterDate] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");

  const metrics = [
    {
      title: "Movimentos Hoje",
      value: "247",
      subtitle: "+12% vs ontem",
      icon: RefreshCcw,
      variant: "default" as const,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Retiradas",
      value: "189",
      subtitle: "76% do total",
      icon: ArrowUpRight,
      variant: "destructive" as const
    },
    {
      title: "Inserções",
      value: "58",
      subtitle: "24% do total", 
      icon: ArrowDownLeft,
      variant: "success" as const
    },
    {
      title: "Pendentes Sync",
      value: "3",
      subtitle: "Aguardando conexão",
      icon: WifiOff,
      variant: "warning" as const
    }
  ];

  const movements = [
    {
      id: "MOV-001",
      tipo: "Retirada",
      item: "Seringa 10ml BD",
      lote: "LOT2024A1",
      quantidade: 5,
      usuario: "Ana Silva",
      setor: "UTI",
      timestamp: "14:32",
      status: "Sincronizado",
      modo: "online"
    },
    {
      id: "MOV-002", 
      tipo: "Inserção",
      item: "Cateter Venoso 22G",
      lote: "CAT2024B2",
      quantidade: 10,
      usuario: "Carlos Santos",
      setor: "Emergência",
      timestamp: "14:15",
      status: "Sincronizado",
      modo: "online"
    },
    {
      id: "MOV-003",
      tipo: "Retirada",
      item: "Luva Nitrílica M",
      lote: "GLV2024C3",
      quantidade: 2,
      usuario: "Maria Costa",
      setor: "Cirurgia",
      timestamp: "13:58",
      status: "Pendente",
      modo: "offline"
    },
    {
      id: "MOV-004",
      tipo: "Ajuste",
      item: "Gaze Estéril 7.5x7.5",
      lote: "GAZ2024D4",
      quantidade: -3,
      usuario: "Pedro Lima",
      setor: "Almoxarifado",
      timestamp: "13:45",
      status: "Aprovado",
      modo: "online"
    }
  ];

  const getStatusBadge = (status: string, modo: string) => {
    if (status === "Pendente") return <Badge variant="outline" className="text-warning"><WifiOff className="w-3 h-3 mr-1" />Pendente</Badge>;
    if (modo === "offline") return <Badge variant="secondary"><WifiOff className="w-3 h-3 mr-1" />Offline</Badge>;
    return <Badge variant="outline" className="text-success"><Wifi className="w-3 h-3 mr-1" />Sync</Badge>;
  };

  const getTipoBadge = (tipo: string) => {
    const variants = {
      "Retirada": "destructive",
      "Inserção": "default", 
      "Ajuste": "secondary"
    } as const;
    return <Badge variant={variants[tipo as keyof typeof variants] || "outline"}>{tipo}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Movimentações</h1>
          <p className="text-muted-foreground">Histórico e controle de movimentações de estoque</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Movimentação
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Filters */}
      <MedicalCard>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Buscar por item, lote ou usuário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo de movimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="retirada">Retirada</SelectItem>
              <SelectItem value="insercao">Inserção</SelectItem>
              <SelectItem value="ajuste">Ajuste</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDate} onValueChange={setFilterDate}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </MedicalCard>

      {/* Movements Table */}
      <MedicalCard>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Movimentações Recentes</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Qtd</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-16">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell className="font-mono text-sm">{movement.id}</TableCell>
                  <TableCell>{getTipoBadge(movement.tipo)}</TableCell>
                  <TableCell className="font-medium">{movement.item}</TableCell>
                  <TableCell className="font-mono text-sm">{movement.lote}</TableCell>
                  <TableCell className={movement.quantidade < 0 ? "text-destructive" : "text-success"}>
                    {movement.quantidade > 0 ? "+" : ""}{movement.quantidade}
                  </TableCell>
                  <TableCell>{movement.usuario}</TableCell>
                  <TableCell>{movement.setor}</TableCell>
                  <TableCell>{movement.timestamp}</TableCell>
                  <TableCell>{getStatusBadge(movement.status, movement.modo)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Detalhes da Movimentação</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">ID</label>
                              <p className="font-mono">{movement.id}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Tipo</label>
                              <p>{movement.tipo}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Item</label>
                              <p className="font-medium">{movement.item}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Lote</label>
                              <p className="font-mono">{movement.lote}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Quantidade</label>
                              <p className={movement.quantidade < 0 ? "text-destructive" : "text-success"}>
                                {movement.quantidade > 0 ? "+" : ""}{movement.quantidade}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Status</label>
                              <div>{getStatusBadge(movement.status, movement.modo)}</div>
                            </div>
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
    </div>
  );
}