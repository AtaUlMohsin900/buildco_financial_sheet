import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { TransactionData } from '@/types/dashboard';
import { TrendingUp } from 'lucide-react';

interface RevenueChartProps {
  data: TransactionData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const chartData = data.slice(0, 10).map(transaction => ({
    name: transaction.date,
    received: transaction.received,
    paid: transaction.paid,
    description: transaction.description,
  }));

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { description: string }; value: number }[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 !bg-background/95">
          <p className="text-sm text-muted-foreground mb-1">{payload[0].payload.description}</p>
          <p className="text-sm font-orbitron text-neon-green">
            Received: Rs {payload[0]?.value?.toLocaleString() || 0}
          </p>
          <p className="text-sm font-orbitron text-neon-orange">
            Paid: Rs {payload[1]?.value?.toLocaleString() || 0}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 h-full animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-cyan/10">
          <TrendingUp className="w-5 h-5 text-neon-cyan" />
        </div>
        <h2 className="text-xl font-orbitron font-semibold text-foreground">
          Transaction Overview
        </h2>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ left: 10, right: 10 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: 'hsl(180, 20%, 60%)', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(180, 50%, 20%)' }}
              tickLine={{ stroke: 'hsl(180, 50%, 20%)' }}
            />
            <YAxis
              tick={{ fill: 'hsl(180, 20%, 60%)', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(180, 50%, 20%)' }}
              tickLine={false}
              tickFormatter={(value) => `Rs ${value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(180, 100%, 50%, 0.1)' }} />
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={(value) => <span className="text-muted-foreground text-sm">{value}</span>}
            />
            <Bar
              dataKey="received"
              name="Received"
              fill="hsl(142, 100%, 50%)"
              radius={[4, 4, 0, 0]}
              style={{ filter: 'drop-shadow(0 0 6px hsl(142, 100%, 50%))' }}
            />
            <Bar
              dataKey="paid"
              name="Paid"
              fill="hsl(30, 100%, 50%)"
              radius={[4, 4, 0, 0]}
              style={{ filter: 'drop-shadow(0 0 6px hsl(30, 100%, 50%))' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
