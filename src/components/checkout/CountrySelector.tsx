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
  { code: "BR", name: "Brasil", flag: "/flags/br.svg", phoneCode: "+55", currency: "R$" },
  { code: "US", name: "Estados Unidos", flag: "/flags/us.svg", phoneCode: "+1", currency: "$" },
  { code: "AR", name: "Argentina", flag: "/flags/ar.svg", phoneCode: "+54", currency: "$" },
  { code: "MX", name: "México", flag: "/flags/mx.svg", phoneCode: "+52", currency: "$" },
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
          className="h-8 px-2 gap-1 text-xs bg-white border border-[#cfcfcf] rounded"
        >
          <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-4 h-3 object-cover" />
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
            <img src={country.flag} alt={country.name} className="w-4 h-3 object-cover" />
            <span>{country.name}</span>
            <span className="text-muted-foreground">({country.phoneCode})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}