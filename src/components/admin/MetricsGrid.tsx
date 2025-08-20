import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, RotateCcw, Zap, Hash } from "lucide-react";

export function MetricsGrid() {
  const metrics = [
    {
      title: "Aprovação cartão",
      value: "0 %",
      icon: <CreditCard className="w-5 h-5 text-blue-600" />,
      bgColor: "bg-blue-50",
    },
    {
      title: "Reembolso", 
      value: "100 %",
      icon: <RotateCcw className="w-5 h-5 text-green-600" />,
      bgColor: "bg-green-50",
    },
    {
      title: "Chargeback",
      value: "0 %", 
      icon: <Zap className="w-5 h-5 text-orange-600" />,
      bgColor: "bg-orange-50",
    },
    {
      title: "Boletos gerados",
      value: "0",
      icon: <Hash className="w-5 h-5 text-purple-600" />,
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                {metric.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}