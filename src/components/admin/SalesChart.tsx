import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { time: "Ago 19, 0:00", value: 0 },
  { time: "Ago 19, 6:00", value: 0 },
  { time: "Ago 19, 12:00", value: 0 },
  { time: "Ago 19, 18:00", value: 0 },
  { time: "Ago 19, 23:59", value: 0 },
];

export function SalesChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Vendas - R$ 0</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}