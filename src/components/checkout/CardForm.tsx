import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CardFormProps {
  installments?: boolean;
}

export function CardForm({ installments = true }: CardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [selectedInstallments, setSelectedInstallments] = useState("1");

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const installmentOptions = [
    { value: "1", label: "1x de R$ 120,90", price: "R$ 120,90" },
    { value: "2", label: "2x de R$ 60,45", price: "R$ 120,90" },
    { value: "3", label: "3x de R$ 40,30", price: "R$ 120,90" },
    { value: "6", label: "6x de R$ 20,15", price: "R$ 120,90" },
    { value: "12", label: "12x de R$ 10,03*", price: "R$ 120,36", hasInterest: true },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Número do cartão</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="pl-10"
          />
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryMonth">Mês</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={String(month).padStart(2, '0')}>
                  {String(month).padStart(2, '0')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryYear">Ano</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cvv">Cód. segurança</Label>
        <div className="relative">
          <Input
            id="cvv"
            placeholder="000"
            maxLength={4}
            className="w-24"
          />
          <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground mr-3">
            ?
          </span>
        </div>
      </div>

      {installments && (
        <div className="space-y-2">
          <Label>Parcelas</Label>
          <Select value={selectedInstallments} onValueChange={setSelectedInstallments}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {installmentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex justify-between w-full">
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedInstallments === "12" && (
            <p className="text-xs text-muted-foreground">*Parcelamento com acréscimo</p>
          )}
        </div>
      )}
    </div>
  );
}