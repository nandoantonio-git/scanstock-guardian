import { useState } from "react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Search,
  Filter,
  Eye,
  Edit,
  Plus,
  Download,
  Calendar,
  Zap
} from "lucide-react";

export function InventoryInterface() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const metrics = [
    {
      title: "Total de Itens",
      value: "2,847",
      subtitle: "Em estoque",
      icon: Package,
      variant: "default" as const
    },
    {
      title: "Estoque Baixo",
      value: "23",
      subtitle: "Abaixo do mínimo",
      icon: TrendingDown,
      variant: "warning" as const
    },
    {
      title: "Vencendo em 30 dias",
      value: "156",
      subtitle: "Requer atenção",
      icon: Calendar,
      variant: "destructive" as const
    },
    {
      title: "Valor do Estoque",
      value: "R$ 1.2M",
      subtitle: "+2.3% vs mês anterior",
      icon: Zap,
      variant: "success" as const,
      trend: { value: 2.3, isPositive: true }
    }
  ];

  const inventory = [
    {
      id: "ITM-001",
      codigo: "7891234567890",
      nome: "Seringa 10ml BD",
      categoria: "Material",
      lote: "LOT2024A1",
      validade: "2025-03-15",
      quantidade: 150,
      minimo: 50,
      maximo: 300,
      custo: "R$ 2,50",
      status: "Normal",
      setor: "UTI"
    },
    {
      id: "ITM-002",
      codigo: "7891234567891", 
      nome: "Dipirona 500mg",
      categoria: "Medicamento",
      lote: "DIP2024B2",
      validade: "2024-12-20",
      quantidade: 25,
      minimo: 30,
      maximo: 200,
      custo: "R$ 0,85",
      status: "Baixo",
      setor: "Farmácia"
    },
    {
      id: "ITM-003",
      codigo: "7891234567892",
      nome: "Cateter Venoso 22G",
      categoria: "Material",
      lote: "CAT2024C3",
      validade: "2026-01-10",
      quantidade: 80,
      minimo: 40,
      maximo: 150,
      custo: "R$ 12,90",
      status: "Normal",
      setor: "Emergência"
    },
    {
      id: "ITM-004",
      codigo: "7891234567893",
      nome: "Paracetamol 750mg",
      categoria: "Medicamento",
      lote: "PAR2024D4",
      validade: "2024-09-15",
      quantidade: 95,
      minimo: 50,
      maximo: 250,
      custo: "R$ 0,65",
      status: "Vencendo",
      setor: "Farmácia"
    },
    {
      id: "ITM-005",
      codigo: "7891234567894",
      nome: "Luva Nitrílica M",
      categoria: "EPI",
      lote: "GLV2024E5",
      validade: "2025-11-30",
      quantidade: 500,
      minimo: 200,
      maximo: 1000,
      custo: "R$ 0,45",
      status: "Normal",
      setor: "Geral"
    }
  ];

  const getStatusBadge = (status: string, quantidade: number, minimo: number) => {
    if (status === "Vencendo") return <Badge variant="destructive">Vencendo</Badge>;
    if (quantidade <= minimo) return <Badge variant="outline" className="text-warning">Estoque Baixo</Badge>;
    return <Badge variant="outline" className="text-success">Normal</Badge>;
  };

  const getCategoryBadge = (category: string) => {
    const variants = {
      "Medicamento": "default",
      "Material": "secondary",
      "EPI": "outline"
    } as const;
    return <Badge variant={variants[category as keyof typeof variants] || "outline"}>{category}</Badge>;
  };

  const getDaysUntilExpiry = (validade: string) => {
    const today = new Date();
    const expiryDate = new Date(validade);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const lowStockItems = inventory.filter(item => item.quantidade <= item.minimo);
  const expiringItems = inventory.filter(item => getDaysUntilExpiry(item.validade) <= 30);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estoque</h1>
          <p className="text-muted-foreground">Gestão e monitoramento do inventário</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Item
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
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos os Itens</TabsTrigger>
          <TabsTrigger value="low-stock">Estoque Baixo ({lowStockItems.length})</TabsTrigger>
          <TabsTrigger value="expiring">Vencendo ({expiringItems.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Filters */}
          <MedicalCard>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Buscar por nome, código ou lote..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="medicamento">Medicamentos</SelectItem>
                  <SelectItem value="material">Materiais</SelectItem>
                  <SelectItem value="epi">EPI</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="baixo">Estoque Baixo</SelectItem>
                  <SelectItem value="vencendo">Vencendo</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </MedicalCard>

          {/* Inventory Table */}
          <MedicalCard>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Inventário Completo</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Min/Máx</TableHead>
                    <TableHead>Custo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-24">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.id}</TableCell>
                      <TableCell className="font-medium">{item.nome}</TableCell>
                      <TableCell>{getCategoryBadge(item.categoria)}</TableCell>
                      <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{new Date(item.validade).toLocaleDateString('pt-BR')}</span>
                          <span className="text-xs text-muted-foreground">
                            {getDaysUntilExpiry(item.validade)} dias
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.quantidade}</TableCell>
                      <TableCell className="text-sm">
                        {item.minimo} / {item.maximo}
                      </TableCell>
                      <TableCell>{item.custo}</TableCell>
                      <TableCell>{getStatusBadge(item.status, item.quantidade, item.minimo)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Detalhes do Item</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Nome</label>
                                    <p className="font-medium">{item.nome}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Código</label>
                                    <p className="font-mono">{item.codigo}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                                    <p>{item.categoria}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Setor</label>
                                    <p>{item.setor}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Lote</label>
                                    <p className="font-mono">{item.lote}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Validade</label>
                                    <p>{new Date(item.validade).toLocaleDateString('pt-BR')}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Quantidade</label>
                                    <p className="font-medium">{item.quantidade}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Custo Unitário</label>
                                    <p>{item.custo}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="low-stock" className="space-y-6">
          <MedicalCard>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Itens com Estoque Baixo
                </h3>
                <Badge variant="outline" className="text-warning">
                  {lowStockItems.length} itens
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="border border-warning/20 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.nome}</h4>
                        <p className="text-sm text-muted-foreground">{item.categoria}</p>
                      </div>
                      <Badge variant="outline" className="text-warning">Baixo</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Atual:</span>
                        <span className="font-medium text-warning">{item.quantidade}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Mínimo:</span>
                        <span>{item.minimo}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Máximo:</span>
                        <span>{item.maximo}</span>
                      </div>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      Solicitar Reposição
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="expiring" className="space-y-6">
          <MedicalCard>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-destructive" />
                  Itens Vencendo em 30 Dias
                </h3>
                <Badge variant="outline" className="text-destructive">
                  {expiringItems.length} itens
                </Badge>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Dias Restantes</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiringItems.map((item) => {
                    const daysLeft = getDaysUntilExpiry(item.validade);
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.nome}</TableCell>
                        <TableCell className="font-mono text-sm">{item.lote}</TableCell>
                        <TableCell>{item.quantidade}</TableCell>
                        <TableCell>{new Date(item.validade).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <Badge variant={daysLeft <= 7 ? "destructive" : "outline"} className="text-destructive">
                            {daysLeft} dias
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(item.quantidade * parseFloat(item.custo.replace('R$ ', '').replace(',', '.')))}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Marcar Descarte
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </MedicalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}