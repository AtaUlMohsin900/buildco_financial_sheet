import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DashboardStats } from '@/types/dashboard';
import { PieChart as PieChartIcon } from 'lucide-react';

interface StatusChartProps {
  stats: DashboardStats;
}

export const StatusChart = ({ stats }: StatusChartProps) => {
  const data = [
    { name: 'Received', value: stats.totalReceived, color: 'hsl(142, 100%, 50%)' },
    { name: 'Paid', value: stats.totalPaid, color: 'hsl(30, 100%, 50%)' },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { color: string }; name: string; value: number }[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 !bg-background/95">
          <p className="text-sm font-medium" style={{ color: payload[0].payload.color }}>
            {payload[0].name}
          </p>
          <p className="text-lg font-orbitron font-bold text-foreground">
            Rs {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 h-full animate-slide-up" style={{ animationDelay: '250ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-magenta/10">
          <PieChartIcon className="w-5 h-5 text-neon-magenta" />
        </div>
        <h2 className="text-xl font-orbitron font-semibold text-foreground">
          Cash Flow
        </h2>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="transparent"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    filter: `drop-shadow(0 0 8px ${entry.color})`,
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: entry.color,
                boxShadow: `0 0 10px ${entry.color}`,
              }}
            />
            <span className="text-sm text-muted-foreground">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
