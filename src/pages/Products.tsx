import { useState } from "react";
import { Plus, Search, MoreHorizontal, Eye, Settings, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar } from "@/components/admin/Sidebar";

interface CheckoutItem {
  id: string;
  name: string;
  status: "Padrão" | "Ativo" | "Inativo";
  lastModified: string;
}

export default function Products() {
  const [checkouts] = useState<CheckoutItem[]>([
    {
      id: "1",
      name: "Checkout A",
      status: "Padrão",
      lastModified: "2 dias atrás",
    },
  ]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Criar novo checkout
            </Button>
          </div>

          {/* Checkout Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Checkout</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar..." 
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    Criar novo checkout
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 py-3 border-b border-gray-200 text-sm font-medium text-gray-600">
                <div className="col-span-6">NOME</div>
                <div className="col-span-6">OFERTA</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-0">
                {checkouts.map((checkout) => (
                  <div key={checkout.id} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="col-span-6 flex items-center gap-3">
                      <span className="font-medium">{checkout.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {checkout.status}
                      </Badge>
                    </div>
                    
                    <div className="col-span-5 flex items-center">
                      <span className="text-gray-600">-</span>
                    </div>
                    
                    <div className="col-span-1 flex items-center justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Personalizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Settings className="w-4 h-4 mr-2" />
                            Configurações
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Section */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">i</span>
                  </div>
                  <span className="font-medium">Aprenda mais sobre o</span>
                  <a href="#" className="text-blue-600 underline">checkout builder</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}