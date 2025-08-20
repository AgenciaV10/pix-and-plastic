import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Country {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  currency: string;
}

interface CustomerFormProps {
  selectedCountry: Country;
}

export function CustomerForm({ selectedCountry }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    document: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCPFCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    
    if (numbers.length <= 11) {
      // CPF format: 000.000.000-00
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2");
    } else {
      // CNPJ format: 00.000.000/0000-00
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2");
    }
  };

  const formatPhone = (value: string, countryCode: string) => {
    const numbers = value.replace(/\D/g, "");
    
    if (countryCode === "BR") {
      // Brazilian format: (00) 00000-0000
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})/, "$1-$2");
    }
    
    // Default format for other countries
    return numbers;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === "document") {
      formattedValue = formatCPFCNPJ(value);
    } else if (field === "phone") {
      formattedValue = formatPhone(value, selectedCountry.code);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateName = (name: string) => {
    const words = name.trim().split(" ");
    return words.length >= 2 && words.every(word => word.length > 0);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input
          id="name"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmEmail">Confirmar e-mail</Label>
        <Input
          id="confirmEmail"
          type="email"
          placeholder="Confirme seu e-mail"
          value={formData.confirmEmail}
          onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
          className={errors.confirmEmail ? "border-destructive" : ""}
        />
        {errors.confirmEmail && <p className="text-xs text-destructive">{errors.confirmEmail}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="document">
          {selectedCountry.code === "BR" ? "CPF/CNPJ" : "Documento"}
        </Label>
        <Input
          id="document"
          placeholder={selectedCountry.code === "BR" ? "000.000.000-00" : "Seu documento"}
          value={formData.document}
          onChange={(e) => handleInputChange("document", e.target.value)}
          className={errors.document ? "border-destructive" : ""}
        />
        {errors.document && <p className="text-xs text-destructive">{errors.document}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <div className="flex gap-2">
          <Select value={selectedCountry.phoneCode}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={selectedCountry.phoneCode}>
                {selectedCountry.flag} {selectedCountry.phoneCode}
              </SelectItem>
            </SelectContent>
          </Select>
          <Input
            id="phone"
            placeholder={selectedCountry.code === "BR" ? "(00) 00000-0000" : "Telefone"}
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`flex-1 ${errors.phone ? "border-destructive" : ""}`}
          />
        </div>
        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
      </div>
    </div>
  );
}