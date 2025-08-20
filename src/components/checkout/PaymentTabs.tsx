import { useState } from "react";
import { CreditCard, QrCode, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaymentMethod = "card" | "pix" | "card_pix";

interface PaymentTabsProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

export function PaymentTabs({ selectedMethod, onMethodChange }: PaymentTabsProps) {
  const tabs = [
    {
      id: "card" as PaymentMethod,
      label: "Cartão",
      icon: CreditCard,
    },
    {
      id: "pix" as PaymentMethod,
      label: "Pix",
      icon: QrCode,
    },
    {
      id: "card_pix" as PaymentMethod,
      label: "Cartão + Pix",
      icon: CreditCard,
    },
  ];

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isSelected = selectedMethod === tab.id;
        
        return (
          <Button
            key={tab.id}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onMethodChange(tab.id)}
            className={cn(
              "flex-1 gap-2 h-12 text-sm md:w-[200px] md:h-16 relative",
              isSelected 
                ? "bg-white text-blue-500 border-2 border-blue-500 hover:bg-white hover:text-blue-500" 
                : "bg-card border-0",
              !isSelected && "shadow-md border border-gray-300"
            )}
            style={!isSelected ? {
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)'
            } : {}}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
            {isSelected && (
              <Check className="w-4 h-4 absolute top-2 right-2 text-green-500" />
            )}
          </Button>
        );
      })}
    </div>
  );
}