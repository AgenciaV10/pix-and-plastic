import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface Country {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  currency: string;
}

interface CustomerFormProps {
  selectedCountry: Country;
  onCountryChange?: (country: Country) => void;
  onNameChange?: (name: string) => void;
}

export function CustomerForm({ selectedCountry, onCountryChange, onNameChange }: CustomerFormProps) {
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
    
    if (field === "name" && onNameChange) {
      onNameChange(formattedValue);
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
        <Label htmlFor="name" className="inline-block w-32" style={{color: '#333', fontSize: '16px', fontWeight: '500'}}>Nome completo</Label>
        <Input
          id="name"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className={`${errors.name ? "border-destructive" : ""} bg-white border-[#cfcfcf] rounded w-full h-12`}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="inline-block w-32" style={{color: '#333', fontSize: '16px', fontWeight: '500'}}>E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={`${errors.email ? "border-destructive" : ""} bg-white border-[#cfcfcf] rounded w-full h-12`}
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmEmail" className="inline-block w-32" style={{color: '#333', fontSize: '16px', fontWeight: '500'}}>Confirmar e-mail</Label>
        <Input
          id="confirmEmail"
          type="email"
          placeholder="Confirme seu e-mail"
          value={formData.confirmEmail}
          onChange={(e) => handleInputChange("confirmEmail", e.target.value)}
          className={`${errors.confirmEmail ? "border-destructive" : ""} bg-white border-[#cfcfcf] rounded w-full h-12`}
        />
        {errors.confirmEmail && <p className="text-xs text-destructive">{errors.confirmEmail}</p>}
      </div>

      {/* CNPJ e Telefone - mesma linha no desktop */}
      <div className="md:flex md:gap-2 space-y-2 md:space-y-0 w-full">
        <div className="space-y-2 w-full md:flex-1">
          <Label htmlFor="document" className="inline-block w-32 text-base font-medium" style={{color: '#333'}}>CNPJ</Label>
          <Input
            id="document"
            placeholder="00.000.000/0000-00"
            value={formData.document}
            onChange={(e) => handleInputChange("document", e.target.value)}
            className={`${errors.document ? "border-destructive" : ""} bg-white border-[#cfcfcf] rounded w-full h-12`}
          />
          {errors.document && <p className="text-xs text-destructive">{errors.document}</p>}
        </div>

        <div className="space-y-2 w-full md:flex-1">
          <Label htmlFor="phone" className="inline-block w-32 text-base font-medium" style={{color: '#333'}}>Telefone</Label>
          <div className="flex gap-2 w-full">
            <Select 
              value={selectedCountry.phoneCode} 
              onValueChange={(value) => {
                const country = countries.find(c => c.phoneCode === value);
                if (country && onCountryChange) {
                  onCountryChange(country);
                }
              }}
            >
              <SelectTrigger className="w-20 bg-white border border-[#cfcfcf] rounded h-12">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-4 h-3 object-cover" />
                    <span className="text-xs md:text-sm">{selectedCountry.phoneCode}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.phoneCode}>
                    <div className="flex items-center gap-2">
                      <img src={country.flag} alt={country.name} className="w-4 h-3 object-cover" />
                      <span>{country.name} {country.phoneCode}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="phone"
              placeholder={selectedCountry.code === "BR" ? "(00) 00000-0000" : "Telefone"}
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`flex-1 ${errors.phone ? "border-destructive" : ""} bg-white border-[#cfcfcf] rounded h-12`}
            />
          </div>
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );
}