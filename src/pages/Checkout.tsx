import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountdownBar } from "@/components/checkout/CountdownBar";
import { CountrySelector } from "@/components/checkout/CountrySelector";
import { PaymentTabs } from "@/components/checkout/PaymentTabs";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { CardForm } from "@/components/checkout/CardForm";
import { PixForm } from "@/components/checkout/PixForm";
import { SecurityMessage } from "@/components/checkout/SecurityMessage";
import { CheckoutFooter } from "@/components/checkout/CheckoutFooter";

type PaymentMethod = "card" | "pix" | "card_pix";

const countries = [
  { code: "BR", name: "Brasil", flag: "🇧🇷", phoneCode: "+55", currency: "R$" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸", phoneCode: "+1", currency: "$" },
];

export default function Checkout() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [saveData, setSaveData] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      {/* Countdown Bar */}
      <CountdownBar duration={8} text="Oferta por tempo limitado" />

      {/* Main Content */}
      <div className="container mx-auto max-w-md px-4 py-8">
        {/* Country Selector */}
        <div className="flex justify-end mb-6">
          <CountrySelector 
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        </div>

        {/* Checkout Form */}
        <Card className="border-border shadow-lg">
          <CardContent className="p-6 space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Informações pessoais</h3>
              <CustomerForm selectedCountry={selectedCountry} />
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Método de pagamento</h3>
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
            <div className="flex items-start space-x-2">
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
            <SecurityMessage />

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
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
                Ao clicar em "Pagar agora", eu declaro que li estou ciente que a Kiwify está 
                processando esta compra em nome de{" "}
                <strong>Antonio Luiz monteiro</strong> e que não possuo responsabilidade pelo conteúdo, 
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
          <CheckoutFooter />
        </div>
      </div>
    </div>
  );
}