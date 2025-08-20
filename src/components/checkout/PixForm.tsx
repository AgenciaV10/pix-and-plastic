import { useState } from "react";
import { Copy, QrCode as QrCodeIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function PixForm() {
  const [pixCode] = useState("00020126580014BR.GOV.BCB.PIX013629f6b7e3-b8c4-4d2b-8b1e-0123456789ab5204000053039865802BR5925ANTONIO LUIZ MONTEIRO6009SAO PAULO61080000000062070503***6304B123");
  const { toast } = useToast();

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    toast({
      title: "Código PIX copiado!",
      description: "Cole no seu app de banco para finalizar o pagamento",
    });
  };

  return (
    <div className="space-y-6 text-center">
      {/* QR Code Placeholder */}
      <div className="flex justify-center">
        <div className="w-48 h-48 bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center">
          <div className="text-center space-y-2">
            <QrCodeIcon className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">QR Code PIX</p>
          </div>
        </div>
      </div>

      {/* Copy Code Section */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Ou copie e cole o código abaixo no seu app de banco:
        </p>
        
        <div className="bg-muted p-3 rounded-lg">
          <p className="text-xs font-mono break-all text-muted-foreground mb-2">
            {pixCode.slice(0, 50)}...
          </p>
          <Button 
            onClick={copyPixCode}
            variant="outline" 
            className="w-full gap-2"
          >
            <Copy className="w-4 h-4" />
            Copiar código PIX
          </Button>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-4 h-4 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
          <span className="text-sm font-medium text-blue-800">Aguardando pagamento</span>
        </div>
        <p className="text-xs text-blue-600">
          Seu pagamento será confirmado automaticamente após a aprovação
        </p>
      </div>

      {/* Instructions */}
      <div className="text-left space-y-2 text-sm text-muted-foreground">
        <p className="font-medium">Como pagar com PIX:</p>
        <ol className="list-decimal list-inside space-y-1 pl-4">
          <li>Abra o app do seu banco</li>
          <li>Procure pela opção PIX</li>
          <li>Escaneie o QR Code ou cole o código</li>
          <li>Confirme o pagamento</li>
        </ol>
      </div>
    </div>
  );
}