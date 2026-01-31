import { DashboardStats } from '@/types/dashboard';
import { Target, Gauge, Wallet, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PerformanceMetricsProps {
  stats: DashboardStats;
}

export const PerformanceMetrics = ({ stats }: PerformanceMetricsProps) => {
  const totalFlow = stats.totalReceived + stats.totalPaid;

  const metrics = [
    {
      label: 'Net Balance',
      value: stats.netBalance,
      max: totalFlow || 100000,
      prefix: true,
      icon: Wallet,
      color: stats.netBalance >= 0 ? 'neon-green' : 'neon-orange',
    },
    {
      label: 'Total Received',
      value: stats.totalReceived,
      max: totalFlow || 100000,
      prefix: true,
      icon: Target,
      color: 'neon-green',
    },
    {
      label: 'Total Paid',
      value: stats.totalPaid,
      max: totalFlow || 100000,
      prefix: true,
      icon: TrendingDown,
      color: 'neon-orange',
    },
    {
      label: 'Avg. Transaction',
      value: stats.averageTransaction,
      max: 50000,
      prefix: true,
      icon: Gauge,
      color: 'neon-purple',
    },
  ];

  return (
    <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '350ms' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-neon-purple/10">
          <Gauge className="w-5 h-5 text-neon-purple" />
        </div>
        <h2 className="text-xl font-inter font-semibold text-foreground">
          Financial Summary
        </h2>
      </div>

      <div className="space-y-6">
        {metrics.map((metric, index) => {
          const percentage = Math.min((Math.abs(metric.value) / metric.max) * 100, 100);
          const Icon = metric.icon;

          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={cn("w-4 h-4", `text-${metric.color}`)} />
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                </div>
                <span className="font-inter font-bold text-foreground">
                  {metric.prefix && 'Rs '}
                  {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    `bg-${metric.color}`
                  )}
                  style={{
                    width: `${percentage}%`,
                    boxShadow: `0 0 10px hsl(var(--${metric.color}))`,
                    background: `linear-gradient(90deg, hsl(var(--${metric.color})), hsl(var(--${metric.color}) / 0.7))`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
