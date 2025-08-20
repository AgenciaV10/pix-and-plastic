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

type PaymentMethod = "card" | "pix" | "card_pix";

const countries = [
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

export default function Checkout() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [saveData, setSaveData] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handlePayment = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    
    // Here you would integrate with your payment processor
    console.log("Processing payment...", {
      paymentMethod,
      selectedCountry,
      saveData,
      acceptTerms
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-[0.4rem] md:px-4 py-[0.4rem] md:py-8 max-w-4xl">

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
        <div className="mt-8">
          <CheckoutFooter customerName={customerName} />
        </div>
      </div>
    </div>
  );
}