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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={`text-xs flex items-center gap-1 ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}>
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Valor líquido"
        value="R$ 0,00"
        icon={<DollarSign className="w-4 h-4" />}
      />
      <StatCard
        title="Vendas"
        value="0"
        icon={<ShoppingCart className="w-4 h-4" />}
      />
      <StatCard
        title="Vendas 1-click da rede Kiwify"
        value="R$ 0,00"
        change="0 %"
        trend="up"
        icon={<CreditCard className="w-4 h-4" />}
      />
      <StatCard
        title="Conversão boleto"
        value="0 %"
        icon={<RefreshCw className="w-4 h-4" />}
      />
    </div>
  );
}