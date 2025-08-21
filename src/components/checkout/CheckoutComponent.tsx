import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { PaymentTabs } from "@/components/checkout/PaymentTabs";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { CardForm } from "@/components/checkout/CardForm";
import { PixForm } from "@/components/checkout/PixForm";
import { SecurityMessage } from "@/components/checkout/SecurityMessage";
import { CheckoutFooter } from "@/components/checkout/CheckoutFooter";
import { CountdownTimer } from "@/components/countdown/CountdownTimer";

type PaymentMethod = "card" | "pix" | "card_pix";

interface Country {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  currency: string;
}

interface CheckoutComponentProps {
  /** Lista de países disponíveis */
  countries?: Country[];
  /** País selecionado por padrão */
  defaultCountry?: Country;
  /** Método de pagamento padrão */
  defaultPaymentMethod?: PaymentMethod;
  /** Callback chamado quando o pagamento é processado */
  onPayment?: (data: {
    paymentMethod: PaymentMethod;
    selectedCountry: Country;
    saveData: boolean;
    acceptTerms: boolean;
    customerName: string;
  }) => Promise<void> | void;
  /** Se deve mostrar o loading durante o processamento */
  showLoading?: boolean;
  /** Classe CSS adicional para o container */
  className?: string;
  /** Se deve mostrar o footer */
  showFooter?: boolean;
  /** Componentes customizados para renderizar */
  components?: any[];
  /** Modo de visualização */
  viewMode?: 'desktop' | 'mobile';
  /** Se está em modo de pré-visualização */
  isPreview?: boolean;
}

const defaultCountries: Country[] = [
  { code: "BR", name: "Brazil (Brasil)", flag: "/flags/br.svg", phoneCode: "+55", currency: "R$" },
  { code: "US", name: "United States", flag: "/flags/us.svg", phoneCode: "+1", currency: "$" },
  { code: "MX", name: "Mexico (México)", flag: "/flags/mx.svg", phoneCode: "+52", currency: "$" },
  { code: "CO", name: "Colombia", flag: "/flags/co.svg", phoneCode: "+57", currency: "$" },
  { code: "AR", name: "Argentina", flag: "/flags/ar.svg", phoneCode: "+54", currency: "$" },
  { code: "PE", name: "Peru", flag: "/flags/pe.svg", phoneCode: "+51", currency: "S/" },
  { code: "CL", name: "Chile", flag: "/flags/cl.svg", phoneCode: "+56", currency: "$" },
  { code: "EC", name: "Ecuador", flag: "/flags/ec.svg", phoneCode: "+593", currency: "$" },
  { code: "UY", name: "Uruguay", flag: "/flags/uy.svg", phoneCode: "+598", currency: "$" },
  { code: "PY", name: "Paraguay", flag: "/flags/py.svg", phoneCode: "+595", currency: "₲" },
  { code: "BO", name: "Bolivia", flag: "/flags/bo.svg", phoneCode: "+591", currency: "Bs" },
  { code: "VE", name: "Venezuela", flag: "/flags/ve.svg", phoneCode: "+58", currency: "Bs" },
  { code: "GT", name: "Guatemala", flag: "/flags/gt.svg", phoneCode: "+502", currency: "Q" },
  { code: "CR", name: "Costa Rica", flag: "/flags/cr.svg", phoneCode: "+506", currency: "₡" },
  { code: "PA", name: "Panama", flag: "/flags/pa.svg", phoneCode: "+507", currency: "B/." },
  { code: "ES", name: "Spain (España)", flag: "/flags/es.svg", phoneCode: "+34", currency: "€" },
  { code: "PT", name: "Portugal", flag: "/flags/pt.svg", phoneCode: "+351", currency: "€" },
  { code: "FR", name: "France", flag: "/flags/fr.svg", phoneCode: "+33", currency: "€" },
  { code: "IT", name: "Italy", flag: "/flags/it.svg", phoneCode: "+39", currency: "€" },
  { code: "DE", name: "Germany", flag: "/flags/de.svg", phoneCode: "+49", currency: "€" },
  { code: "GB", name: "United Kingdom", flag: "/flags/gb.svg", phoneCode: "+44", currency: "£" },
  { code: "CA", name: "Canada", flag: "/flags/ca.svg", phoneCode: "+1", currency: "$" },
  { code: "AU", name: "Australia", flag: "/flags/au.svg", phoneCode: "+61", currency: "$" },
  { code: "JP", name: "Japan", flag: "/flags/jp.svg", phoneCode: "+81", currency: "¥" },
  { code: "CN", name: "China", flag: "/flags/cn.svg", phoneCode: "+86", currency: "¥" },
  { code: "IN", name: "India", flag: "/flags/in.svg", phoneCode: "+91", currency: "₹" },
];

export function CheckoutComponent({
  countries = defaultCountries,
  defaultCountry,
  defaultPaymentMethod = "card",
  onPayment,
  showLoading = true,
  className = "",
  showFooter = true,
  components = [],
  viewMode = 'desktop',
  isPreview = false,
}: CheckoutComponentProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(defaultCountry || countries[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(defaultPaymentMethod);
  const [saveData, setSaveData] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handlePayment = async () => {
    if (showLoading) {
      setIsLoading(true);
    }
    
    try {
      if (onPayment) {
        await onPayment({
          paymentMethod,
          selectedCountry,
          saveData,
          acceptTerms,
          customerName,
        });
      } else {
        // Simulate payment processing if no custom handler
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Default behavior - log to console
        console.log("Processing payment...", {
          paymentMethod,
          selectedCountry,
          saveData,
          acceptTerms,
          customerName,
        });
      }
    } finally {
      if (showLoading) {
        setIsLoading(false);
      }
    }
  };

  const renderCustomComponent = (component: any) => {
    const componentData = JSON.parse(component.content || '{}');
    
    switch (component.type) {
      case 'text':
        return (
          <div 
            key={component.id}
            className="p-3 border rounded-lg"
            style={{
              backgroundColor: component.props?.backgroundColor || '#ffffff',
              borderColor: component.props?.borderColor || '#e5e7eb',
              borderWidth: `${component.props?.borderWidth || 1}px`,
              borderRadius: `${component.props?.borderRadius || 8}px`,
              color: component.props?.color || '#000000'
            }}
          >
            {component.content}
          </div>
        );
      
      case 'countdown':
        return (
          <div key={component.id} className="mb-4">
            <CountdownTimer
              type={componentData.type || 'minutes'}
              backgroundColor={componentData.backgroundColor || '#ef4444'}
              textColor={componentData.textColor || '#ffffff'}
              duration={componentData.duration || '00:15:00'}
              activeText={componentData.activeText || 'Oferta por tempo limitado'}
              finishedText={componentData.finishedText || 'O tempo acabou!'}
              stickyTop={componentData.stickyTop || false}
            />
          </div>
        );
      
      case 'image':
        return (
          <div key={component.id} className="mb-4">
            <img 
              src={component.content || 'https://via.placeholder.com/300x200?text=Imagem'} 
              alt="Componente" 
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Imagem';
              }}
            />
          </div>
        );
      
      case 'advantages':
        const advantages = JSON.parse(component.content || '[]');
        return (
          <div key={component.id} className="p-4 border rounded-lg mb-4">
            <h4 className="font-semibold mb-3">Vantagens</h4>
            <ul className="space-y-2">
              {advantages.map((advantage: string, index: number) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>{advantage}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      
      case 'testimonial':
        const testimonial = JSON.parse(component.content || '{}');
        return (
          <div 
            key={component.id} 
            className="p-4 border rounded-lg mb-4"
            style={{
              backgroundColor: testimonial.backgroundColor || '#ffffff',
              color: testimonial.textColor || '#000000'
            }}
          >
            <div className={`${testimonial.horizontalMode ? 'flex items-start gap-4' : 'text-center'}`}>
              {testimonial.image && (
                <div className={`${testimonial.horizontalMode ? 'flex-shrink-0' : 'mb-3'}`}>
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name || 'Cliente'}
                    className={`rounded-full object-cover ${
                      testimonial.horizontalMode ? 'w-16 h-16' : 'w-20 h-20 mx-auto'
                    }`}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80x80?text=👤';
                    }}
                  />
                </div>
              )}
              <div className={testimonial.horizontalMode ? 'flex-1' : ''}>
                <div className={`flex items-center gap-1 mb-2 ${
                  testimonial.horizontalMode ? '' : 'justify-center'
                }`}>
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm mb-2 italic">"{testimonial.text || 'Depoimento do cliente'}"</p>
                <p className="text-sm font-semibold opacity-75">- {testimonial.name || 'Nome do Cliente'}</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Main Content */}
      <div className="container mx-auto px-[0.4rem] md:px-4 py-[0.4rem] md:py-8 max-w-4xl">
        
        {/* Custom Components */}
        {components && components.length > 0 && (
          <div className="mb-6 space-y-4">
            {components.map((component) => renderCustomComponent(component))}
          </div>
        )}

        {/* Checkout Form */}
        <Card className="border-border shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-base md:text-lg font-medium mb-4 text-gray-800">Informações pessoais</h3>
              <CustomerForm 
                selectedCountry={selectedCountry} 
                onCountryChange={setSelectedCountry}
                onNameChange={setCustomerName}
              />
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-base md:text-lg font-medium mb-4 text-gray-800">Método de pagamento</h3>
              <PaymentTabs 
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
              />
              
              <div className="mt-4">
                {paymentMethod === "card" && <CardForm />}
                {paymentMethod === "pix" && <PixForm />}
                {paymentMethod === "card_pix" && (
                  <div className="space-y-6">
                    <CardForm />
                    <div className="text-center">
                      <span className="text-sm text-muted-foreground">ou</span>
                    </div>
                    <PixForm />
                  </div>
                )}
              </div>
            </div>

            {/* Save Data Checkbox */}
            <div className="flex items-start space-x-2 w-full">
              <Checkbox 
                id="saveData" 
                checked={saveData}
                onCheckedChange={(checked) => setSaveData(checked as boolean)}
                className="mt-1"
              />
              <label 
                htmlFor="saveData" 
                className="text-sm text-foreground cursor-pointer"
              >
                Salvar dados para as próximas compras
              </label>
            </div>

            {/* Security Message */}
            <div className="w-full">
              <SecurityMessage />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2 w-full">
              <Checkbox 
                id="acceptTerms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-1"
                required
              />
              <label 
                htmlFor="acceptTerms" 
                className="text-sm text-foreground cursor-pointer"
              >
                Ao clicar em "Pagar agora", eu declaro que li estou ciente que a Empresa está 
                processando esta compra em nome de{" "}
                <strong>{customerName || "Cliente"}</strong> e que não possuo responsabilidade pelo conteúdo, 
                oferta e nem faço controle prévio do infoproduto; (ii) que li e concordo com os{" "}
                <a href="#" className="text-primary hover:underline">Termos de Compra</a>,{" "}
                <a href="#" className="text-primary hover:underline">Termos de Uso</a> e{" "}
                <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
              </label>
            </div>

            {/* Payment Button */}
            <Button 
              onClick={handlePayment}
              disabled={!acceptTerms || isLoading}
              className="w-full h-12 bg-checkout-success hover:bg-checkout-success/90 text-checkout-success-foreground font-semibold text-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                  Processando...
                </div>
              ) : (
                "Pagar agora"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        {showFooter && (
          <div className="mt-8">
            <CheckoutFooter customerName={customerName} />
          </div>
        )}
      </div>
    </div>
  );
}

export type { PaymentMethod, Country, CheckoutComponentProps };