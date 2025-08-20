/**
 * Exemplos de uso do CheckoutComponent
 * 
 * Este arquivo demonstra diferentes formas de usar o componente CheckoutComponent
 * em várias situações e configurações.
 */

import { CheckoutComponent } from "./CheckoutComponent";
import type { PaymentMethod, Country } from "./CheckoutComponent";

// Exemplo 1: Uso básico (como na página principal)
export function BasicCheckoutExample() {
  const handlePayment = async (data: {
    paymentMethod: PaymentMethod;
    selectedCountry: Country;
    saveData: boolean;
    acceptTerms: boolean;
    customerName: string;
  }) => {
    console.log("Processando pagamento básico...", data);
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <CheckoutComponent 
      onPayment={handlePayment}
    />
  );
}

// Exemplo 2: Checkout com país específico e método de pagamento padrão
export function BrazilPixCheckoutExample() {
  const brazilCountry: Country = {
    code: "BR",
    name: "Brazil (Brasil)",
    flag: "/flags/br.svg",
    phoneCode: "+55",
    currency: "R$"
  };

  const handlePayment = async (data: any) => {
    console.log("Processando pagamento PIX Brasil...", data);
    // Integração específica para PIX
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <CheckoutComponent 
      defaultCountry={brazilCountry}
      defaultPaymentMethod="pix"
      onPayment={handlePayment}
    />
  );
}

// Exemplo 3: Checkout sem footer e com classe customizada
export function EmbeddedCheckoutExample() {
  const handlePayment = async (data: any) => {
    console.log("Processando pagamento embarcado...", data);
    // Lógica específica para checkout embarcado
    await fetch('/api/process-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  };

  return (
    <CheckoutComponent 
      onPayment={handlePayment}
      showFooter={false}
      className="bg-gray-50"
    />
  );
}

// Exemplo 4: Checkout com lista de países limitada (apenas América Latina)
export function LatinAmericaCheckoutExample() {
  const latinAmericaCountries: Country[] = [
    { code: "BR", name: "Brazil (Brasil)", flag: "/flags/br.svg", phoneCode: "+55", currency: "R$" },
    { code: "MX", name: "Mexico (México)", flag: "/flags/mx.svg", phoneCode: "+52", currency: "$" },
    { code: "CO", name: "Colombia", flag: "/flags/co.svg", phoneCode: "+57", currency: "$" },
    { code: "AR", name: "Argentina", flag: "/flags/ar.svg", phoneCode: "+54", currency: "$" },
    { code: "PE", name: "Peru", flag: "/flags/pe.svg", phoneCode: "+51", currency: "S/" },
    { code: "CL", name: "Chile", flag: "/flags/cl.svg", phoneCode: "+56", currency: "$" },
  ];

  const handlePayment = async (data: any) => {
    console.log("Processando pagamento América Latina...", data);
    // Lógica específica para países da América Latina
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <CheckoutComponent 
      countries={latinAmericaCountries}
      onPayment={handlePayment}
    />
  );
}

// Exemplo 5: Checkout com loading customizado
export function CustomLoadingCheckoutExample() {
  const handlePayment = async (data: any) => {
    console.log("Processando com loading customizado...", data);
    // Aqui você pode implementar seu próprio sistema de loading
    // O componente não mostrará o loading interno
    await new Promise(resolve => setTimeout(resolve, 3000));
  };

  return (
    <CheckoutComponent 
      onPayment={handlePayment}
      showLoading={false} // Desabilita o loading interno
    />
  );
}

// Exemplo 6: Checkout para modal ou popup
export function ModalCheckoutExample({ onClose }: { onClose: () => void }) {
  const handlePayment = async (data: any) => {
    try {
      console.log("Processando pagamento no modal...", data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Fechar modal após sucesso
      onClose();
    } catch (error) {
      console.error("Erro no pagamento:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CheckoutComponent 
        onPayment={handlePayment}
        showFooter={false}
        className="min-h-0" // Remove min-height para modal
      />
    </div>
  );
}

/**
 * Como usar em diferentes contextos:
 * 
 * 1. Página de checkout principal:
 *    <BasicCheckoutExample />
 * 
 * 2. Checkout específico para Brasil com PIX:
 *    <BrazilPixCheckoutExample />
 * 
 * 3. Checkout embarcado em outra página:
 *    <EmbeddedCheckoutExample />
 * 
 * 4. Checkout para região específica:
 *    <LatinAmericaCheckoutExample />
 * 
 * 5. Checkout com controle de loading externo:
 *    <CustomLoadingCheckoutExample />
 * 
 * 6. Checkout em modal:
 *    <ModalCheckoutExample onClose={() => setModalOpen(false)} />
 */