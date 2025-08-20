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
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg">Vendas - R$ 0</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="h-[180px] sm:h-[200px] lg:h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#6B7280' }}
                className="text-xs sm:text-sm"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#6B7280' }}
                className="text-xs sm:text-sm"
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}