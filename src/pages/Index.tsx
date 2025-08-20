import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Settings, Layout, BarChart3, CheckSquare, CreditCard, Shield, Zap, TrendingUp, Star, Users, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1419] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zM10%2025c-2.8%200-5-2.2-5-5s2.2-5%205-5%205%202.2%205%205-2.2%205-5%205z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 border border-blue-400/20">
                <Star className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-2">
                Checkout Pro
              </h1>
              <div className="flex items-center justify-center gap-2 text-blue-300/80">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium tracking-wider uppercase">Plataforma Completa</span>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed mb-8">
          Nunca mais perca vendas com <span className="text-red-500 font-semibold">reembolsos</span> injustos. Tenha o seu próprio checkout, 
          <span className="text-[#2563eb] font-semibold">100% sob seu controle</span>, sem pagar taxas para plataformas. O que você ganha é 
          <span className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent font-bold">Todo seu</span>.
        </p>
          
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl px-6 py-3 mb-12">
            <Button className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] hover:from-[#1d4ed8] hover:to-[#0891b2] text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 border border-blue-400/30 hover:border-blue-300/50">
            Acessar Painel
          </Button>
          </div>
          
          <div className="text-gray-400 mb-8">
            <p className="text-sm text-white">Não tem Risco Pois o nicho é o que você quiser.</p>
          </div>
          
          {/* Filter Options Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2 text-center">Integre como quiser</h3>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <Settings className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2 text-center">Nicho</h3>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <Layout className="w-8 h-8 text-blue-300 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2 text-center">Edite como quiser</h3>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2 text-center">WhatsApp</h3>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2 text-center">Página de Vendas</h3>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
              <Star className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2 text-center">Quizz</h3>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Checkout Demo */}
          <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 shadow-lg">
            <CardHeader className="pb-4">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2563eb] to-[#06b6d4] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 border border-blue-400/30">
                  <CheckSquare className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <CardTitle className="text-white text-xl font-bold mb-2">Visualizar Checkout</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Experimente o checkout completo com todos os métodos de pagamento integrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/checkout">
                <Button variant="outline" className="w-full border-2 border-blue-400/50 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white hover:from-blue-500/40 hover:to-cyan-500/40 hover:border-blue-300/70 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/25">
                  Ver Checkout
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Dashboard */}
          <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 shadow-lg">
            <CardHeader className="pb-4">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-400/30">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <CardTitle className="text-white text-xl font-bold mb-2">Configurar Area de Membros</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Dashboard completo com métricas avançadas, vendas e relatórios detalhados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin">
                <Button variant="outline" className="w-full border-2 border-cyan-400/50 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-white hover:from-cyan-500/40 hover:to-blue-500/40 hover:border-cyan-300/70 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/25">
                  Acessar Area de Membros
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Products Management */}
          <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 shadow-lg">
            <CardHeader className="pb-4">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e40af] to-[#2563eb] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 border border-blue-400/30">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <CardTitle className="text-white text-xl font-bold mb-2">Gestão de Produtos</CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">
                Gerencie produtos e crie checkouts personalizados para cada necessidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/produtos">
                <Button variant="outline" className="w-full border-2 border-blue-400/50 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white hover:from-blue-500/40 hover:to-indigo-500/40 hover:border-blue-300/70 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/25">
                  Ver Produtos
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Checkout Builder */}
          <div className="lg:col-span-3 grid md:grid-cols-2 gap-8 mt-8">
            <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 shadow-lg">
              <CardHeader className="pb-4">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 border border-blue-400/30">
                    <Layout className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-white text-xl font-bold mb-2">Editar Checkout</CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Editor visual avançado para personalização completa e otimização de conversão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/builder">
                  <Button variant="outline" className="w-full border-2 border-blue-400/50 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white hover:from-blue-500/40 hover:to-purple-500/40 hover:border-blue-300/70 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/25">
                    Abrir Builder
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="group bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 shadow-lg">
              <CardHeader className="pb-4">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0891b2] to-[#06b6d4] rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-400/30">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-white text-xl font-bold mb-2">Configurar Gateway de Pagamento</CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">
                  Configure múltiplos gateways e otimize suas taxas de aprovação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/admin/gateway">
                  <Button variant="outline" className="w-full border-2 border-cyan-400/50 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 text-white hover:from-cyan-500/40 hover:to-teal-500/40 hover:border-cyan-300/70 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/25">
                    Configurar Gateway
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Index;
