import { useState } from "react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MetricCard } from "@/components/ui/metric-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Download,
  FileText,
  PieChart as PieChartIcon,
  Activity,
  Calendar,
  Filter
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

export function ReportsInterface() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedClinic, setSelectedClinic] = useState("all");

  const metrics = [
    {
      title: "DOH Médio",
      value: "12.5",
      subtitle: "Dias de estoque",
      icon: Calendar,
      variant: "default" as const,
      trend: { value: -1.2, isPositive: false }
    },
    {
      title: "Giro do Estoque",
      value: "8.4x",
      subtitle: "Vezes por ano",
      icon: Activity,
      variant: "success" as const,
      trend: { value: 5.2, isPositive: true }
    },
    {
      title: "Itens Vencendo",
      value: "23",
      subtitle: "Próximos 30 dias",
      icon: AlertTriangle,
      variant: "warning" as const
    },
    {
      title: "Perda por Vencimento",
      value: "R$ 2.847",
      subtitle: "Este mês",
      icon: TrendingUp,
      variant: "destructive" as const,
      trend: { value: -15.3, isPositive: false }
    }
  ];

  const consumptionData = [
    { name: "Jan", value: 45000 },
    { name: "Fev", value: 52000 },
    { name: "Mar", value: 48000 },
    { name: "Abr", value: 55000 },
    { name: "Mai", value: 58000 },
    { name: "Jun", value: 60000 }
  ];

  const categoryData = [
    { name: "Medicamentos", value: 45, color: "hsl(var(--primary))" },
    { name: "Materiais", value: 30, color: "hsl(var(--primary-glow))" },
    { name: "Equipamentos", value: 15, color: "hsl(var(--success))" },
    { name: "Outros", value: 10, color: "hsl(var(--muted))" }
  ];

  const turnoverData = [
    { name: "UTI", atual: 8.2, anterior: 7.8 },
    { name: "Emergência", atual: 12.5, anterior: 11.2 },
    { name: "Cirurgia", atual: 6.8, anterior: 7.1 },
    { name: "Internação", atual: 9.3, anterior: 8.9 }
  ];

  const topItems = [
    {
      item: "Seringa 10ml BD",
      categoria: "Material",
      consumo: "2,450 un",
      valor: "R$ 12.250",
      giro: "15.2x"
    },
    {
      item: "Dipirona 500mg",
      categoria: "Medicamento", 
      consumo: "1,820 cp",
      valor: "R$ 8.920",
      giro: "12.8x"
    },
    {
      item: "Cateter Venoso 22G",
      categoria: "Material",
      consumo: "1,200 un",
      valor: "R$ 18.600",
      giro: "11.5x"
    },
    {
      item: "Luva Nitrílica M",
      categoria: "EPI",
      consumo: "5,600 un",
      valor: "R$ 6.720",
      giro: "24.3x"
    }
  ];

  const reports = [
    {
      name: "Consumo por Setor",
      description: "Análise detalhada do consumo por setor",
      type: "Operacional",
      lastGenerated: "Hoje, 09:30",
      status: "Disponível"
    },
    {
      name: "Vencimentos e Recalls",
      description: "Itens próximos ao vencimento ou com recall",
      type: "Compliance",
      lastGenerated: "Ontem, 18:45",
      status: "Disponível"
    },
    {
      name: "Análise ABC",
      description: "Classificação de itens por importância",
      type: "Estratégico",
      lastGenerated: "Há 2 dias",
      status: "Processando"
    },
    {
      name: "Acurácia de Estoque",
      description: "Precisão dos dados de inventário",
      type: "Qualidade",
      lastGenerated: "Há 3 dias",
      status: "Disponível"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análises e insights do desempenho do estoque</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedClinic} onValueChange={setSelectedClinic}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecionar clínica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as clínicas</SelectItem>
              <SelectItem value="clinic1">Clínica Central</SelectItem>
              <SelectItem value="clinic2">Clínica Norte</SelectItem>
              <SelectItem value="clinic3">Clínica Sul</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dashboards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboards" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Consumo Mensal */}
            <MedicalCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Consumo Mensal
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={consumptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Valor"]} />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </MedicalCard>

            {/* Distribuição por Categoria */}
            <MedicalCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Distribuição por Categoria
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </MedicalCard>
          </div>

          {/* Giro por Setor */}
          <MedicalCard>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Giro do Estoque por Setor
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={turnoverData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="atual" fill="hsl(var(--primary))" name="Atual" />
                  <Bar dataKey="anterior" fill="hsl(var(--muted))" name="Anterior" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <MedicalCard>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Top Itens por Consumo</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Exportar
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Consumo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Giro</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell>{item.consumo}</TableCell>
                      <TableCell className="font-medium">{item.valor}</TableCell>
                      <TableCell className="text-success font-medium">{item.giro}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <MedicalCard>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Relatórios Disponíveis</h3>
                <Button className="gap-2">
                  <FileText className="w-4 h-4" />
                  Novo Relatório
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Gerado: {report.lastGenerated}
                      </span>
                      <Badge 
                        variant={report.status === "Disponível" ? "default" : "secondary"}
                      >
                        {report.status}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Visualizar
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        disabled={report.status !== "Disponível"}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MedicalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}