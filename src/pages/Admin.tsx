import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from "@/components/admin/Sidebar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { SalesChart } from "@/components/admin/SalesChart";
import { MetricsGrid } from "@/components/admin/MetricsGrid";

export default function Admin() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 ml-64 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            
            <div className="flex gap-4">
              <Select defaultValue="19ago">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="19ago">19 Ago</SelectItem>
                  <SelectItem value="18ago">18 Ago</SelectItem>
                  <SelectItem value="17ago">17 Ago</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="todos">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os produtos</SelectItem>
                  <SelectItem value="produto1">Produto 1</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="todas">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as moedas</SelectItem>
                  <SelectItem value="brl">BRL</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-8">
            <DashboardStats />
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-3 mb-8">
            <SalesChart />
            
            {/* Additional Stats */}
            <div className="space-y-4">
              <MetricsGrid />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}