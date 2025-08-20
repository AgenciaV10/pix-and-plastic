import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, CreditCard, RefreshCw } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
}

function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6 pt-4 sm:pt-6">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate pr-2">
          {title}
        </CardTitle>
        <div className="text-muted-foreground flex-shrink-0">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">{value}</div>
        {change && (
          <div className={`text-xs flex items-center gap-1 mt-1 ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}>
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3 flex-shrink-0" />
            ) : (
              <TrendingDown className="w-3 h-3 flex-shrink-0" />
            )}
            <span className="truncate">{change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Valor líquido"
        value="R$ 0,00"
        icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
      />
      <StatCard
        title="Vendas"
        value="0"
        icon={<ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />}
      />
      <StatCard
        title="Vendas 1-click da rede Checkout Blindado"
        value="R$ 0,00"
        change="0 %"
        trend="up"
        icon={<CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />}
      />
      <StatCard
        title="Conversão boleto"
        value="0 %"
        icon={<RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />}
      />
    </div>
  );
}