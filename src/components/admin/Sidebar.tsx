import { Home, Package, Users, ShoppingCart, DollarSign, BarChart3, Puzzle } from "lucide-react";
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
    <div className="flex h-screen w-64 flex-col fixed inset-y-0 z-50 bg-gray-900">
      {/* Header */}
      <div className="flex h-16 items-center px-6 bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="text-white font-semibold">Kiwify</span>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
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
          <div className="bg-green-500 h-1 rounded-full" style={{ width: "1%" }}></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )
              }
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}