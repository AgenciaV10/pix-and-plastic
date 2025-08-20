import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Settings, Layout, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Pix & Plastic</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sistema completo de checkout com builder personalizável, suporte a múltiplos métodos de pagamento e painel administrativo
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Checkout Demo */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Checkout Demo</CardTitle>
              <CardDescription>
                Experimente o checkout completo com todos os métodos de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/checkout">
                <Button className="w-full">
                  Ver Checkout
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Dashboard */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Painel Admin</CardTitle>
              <CardDescription>
                Dashboard completo com métricas, vendas e relatórios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin">
                <Button variant="outline" className="w-full">
                  Acessar Admin
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Products Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>Gestão de Produtos</CardTitle>
              <CardDescription>
                Gerencie produtos e checkouts personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/produtos">
                <Button variant="outline" className="w-full">
                  Ver Produtos
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Checkout Builder */}
          <Card className="hover:shadow-lg transition-shadow lg:col-span-3">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Layout className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>Checkout Builder</CardTitle>
              <CardDescription>
                Editor visual para personalização completa dos checkouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/builder">
                <Button variant="outline" className="w-full">
                  Abrir Builder
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default Index;
