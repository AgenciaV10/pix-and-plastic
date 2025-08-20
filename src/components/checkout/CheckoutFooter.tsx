import { ExternalLink } from "lucide-react";

interface CheckoutFooterProps {
  termsUrl?: string;
  privacyUrl?: string;
  reportUrl?: string;
}

export function CheckoutFooter({ 
  termsUrl = "#", 
  privacyUrl = "#", 
  reportUrl = "#" 
}: CheckoutFooterProps) {
  return (
    <footer className="text-center space-y-4 pt-6 border-t border-border">
      {/* Links */}
      <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
        <a 
          href={termsUrl} 
          className="hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Termos de Compra
        </a>
        <span>•</span>
        <a 
          href={termsUrl} 
          className="hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Termos de Uso
        </a>
        <span>•</span>
        <a 
          href={privacyUrl} 
          className="hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Privacidade
        </a>
      </div>

      {/* Report Link */}
      <div>
        <a 
          href={reportUrl} 
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Denunciar este produto
        </a>
      </div>

      {/* Powered by */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>Powered by</span>
        <div className="flex items-center gap-1 font-medium text-foreground">
          <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">k</span>
          </div>
          <span>kiwify</span>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>Este site está protegido pelo Google reCAPTCHA.</p>
        <div className="flex flex-wrap justify-center gap-2">
          <a href="#" className="hover:text-foreground transition-colors">
            Política de Privacidade
          </a>
          <span>e</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Termos de Serviço
          </a>
        </div>
      </div>
    </footer>
  );
}