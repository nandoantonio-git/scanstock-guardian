import { useState } from "react";
import { Camera, Scan, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalCard } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";

export function ScanInterface() {
  const [scanMode, setScanMode] = useState<"camera" | "manual">("camera");
  const [scannedItem, setScannedItem] = useState<any>(null);

  const mockScanResult = {
    sku: "SER001",
    name: "Seringa Descartável 20ml",
    gtin: "7891234567890",
    lot: "ABC123",
    expiry: "2024-12-31",
    quantity: 150,
    unit: "UN",
    status: "Íntegro",
    location: "Sala de Procedimentos",
    minStock: 50
  };

  const handleScan = () => {
    // Simulate scanning
    setTimeout(() => {
      setScannedItem(mockScanResult);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Scan Mode Selection */}
      <MedicalCard variant="gradient">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Scanner de Códigos</h2>
          <div className="flex gap-2">
            <Button
              variant={scanMode === "camera" ? "default" : "outline"}
              size="sm"
              onClick={() => setScanMode("camera")}
              className="gap-2"
            >
              <Camera className="w-4 h-4" />
              Câmera
            </Button>
            <Button
              variant={scanMode === "manual" ? "default" : "outline"}
              size="sm"
              onClick={() => setScanMode("manual")}
              className="gap-2"
            >
              <Scan className="w-4 h-4" />
              Manual
            </Button>
          </div>
        </div>

        {scanMode === "camera" ? (
          <div className="space-y-4">
            {/* Camera Preview Simulation */}
            <div className="relative aspect-video bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Posicione o código dentro do quadro</p>
              </div>
              {/* Scan Frame */}
              <div className="absolute inset-4 border-2 border-primary rounded-lg opacity-50" />
            </div>
            <Button onClick={handleScan} className="w-full" size="lg">
              <Scan className="w-4 h-4 mr-2" />
              Escanear Código
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gtin">GTIN/Código</Label>
                <Input id="gtin" placeholder="Digite o código do produto" />
              </div>
              <div>
                <Label htmlFor="lot">Lote</Label>
                <Input id="lot" placeholder="Número do lote" />
              </div>
            </div>
            <Button onClick={handleScan} className="w-full" size="lg">
              <Package className="w-4 h-4 mr-2" />
              Buscar Item
            </Button>
          </div>
        )}
      </MedicalCard>

      {/* Scan Result */}
      {scannedItem && (
        <MedicalCard variant="elevated" className="animate-slide-up">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{scannedItem.name}</h3>
              <p className="text-sm text-muted-foreground">SKU: {scannedItem.sku}</p>
            </div>
            <Badge variant={scannedItem.quantity > scannedItem.minStock ? "default" : "destructive"}>
              {scannedItem.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">{scannedItem.quantity}</p>
              <p className="text-xs text-muted-foreground">Disponível</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground">{scannedItem.lot}</p>
              <p className="text-xs text-muted-foreground">Lote</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground">{scannedItem.expiry}</p>
              <p className="text-xs text-muted-foreground">Validade</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium text-foreground">{scannedItem.location}</p>
              <p className="text-xs text-muted-foreground">Localização</p>
            </div>
          </div>

          {scannedItem.quantity <= scannedItem.minStock && (
            <div className="flex items-center gap-2 p-3 bg-warning-light rounded-lg mb-4">
              <AlertCircle className="w-4 h-4 text-warning" />
              <p className="text-sm text-warning font-medium">
                Estoque baixo! Quantidade abaixo do mínimo ({scannedItem.minStock} {scannedItem.unit})
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="default" size="lg" className="w-full">
              Registrar Retirada
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Registrar Entrada
            </Button>
          </div>
        </MedicalCard>
      )}
    </div>
  );
}