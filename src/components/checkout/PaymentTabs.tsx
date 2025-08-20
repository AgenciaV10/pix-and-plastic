import { useState } from "react";
import { CreditCard, QrCode } from "lucide-react";
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
              "flex-1 gap-2 h-12 text-sm",
              isSelected 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-card border-input hover:bg-muted"
            )}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}