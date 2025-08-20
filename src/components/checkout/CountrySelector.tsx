import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const countries = [
  { code: "BR", name: "Brasil", flag: "🇧🇷", phoneCode: "+55", currency: "R$" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸", phoneCode: "+1", currency: "$" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", phoneCode: "+54", currency: "$" },
  { code: "MX", name: "México", flag: "🇲🇽", phoneCode: "+52", currency: "$" },
];

interface CountrySelectorProps {
  selectedCountry: typeof countries[0];
  onCountryChange: (country: typeof countries[0]) => void;
}

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 px-2 gap-1 text-xs border-input bg-card"
        >
          <span className="text-base">{selectedCountry.flag}</span>
          <span>{selectedCountry.name}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => onCountryChange(country)}
            className="gap-2 cursor-pointer"
          >
            <span className="text-base">{country.flag}</span>
            <span>{country.name}</span>
            <span className="text-muted-foreground">({country.phoneCode})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}