import { Home, Package, Users, ShoppingCart, DollarSign, BarChart3, Puzzle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Produtos", href: "/admin/produtos", icon: Package },
  { name: "Área de Membros", href: "/admin/membros", icon: Users },
  { name: "Vendas", href: "/admin/vendas", icon: ShoppingCart },
  { name: "Financeiro", href: "/admin/financeiro", icon: DollarSign },
  { name: "Relatórios", href: "/admin/relatorios", icon: BarChart3 },
  { name: "Apps", href: "/admin/apps", icon: Puzzle },
];

export function Sidebar() {
  return (
    <div className="flex min-h-screen w-full lg:w-64 flex-col fixed lg:inset-y-0 z-50 bg-gray-900 lg:translate-x-0 -translate-x-full transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="flex h-14 sm:h-16 items-center px-4 sm:px-6 bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] rounded-lg flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold text-sm sm:text-base">Checkout Blindado</span>
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] rounded-full flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-white truncate">
              Antonio Luiz mon...
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>R$ 0,1K</span>
              <span>/</span>
              <span>R$ 10K</span>
            </div>
          </div>
        </div>
        <div className="mt-2 bg-gray-700 rounded-full h-1">
          <div className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] h-1 rounded-full transition-all duration-300" style={{ width: "1%" }}></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 sm:px-4 py-3 sm:py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-[#2563eb]/20 to-[#06b6d4]/20 text-white border border-blue-400/30"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )
              }
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}