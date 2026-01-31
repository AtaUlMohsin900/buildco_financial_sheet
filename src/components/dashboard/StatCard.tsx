import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: 'cyan' | 'magenta' | 'purple' | 'green' | 'orange';
  delay?: number;
}

const accentStyles = {
  cyan: {
    glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.4)]',
    border: 'hover:border-neon-cyan/50',
    icon: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
  },
  magenta: {
    glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-magenta)/0.4)]',
    border: 'hover:border-neon-magenta/50',
    icon: 'text-neon-magenta',
    bg: 'bg-neon-magenta/10',
  },
  purple: {
    glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-purple)/0.4)]',
    border: 'hover:border-neon-purple/50',
    icon: 'text-neon-purple',
    bg: 'bg-neon-purple/10',
  },
  green: {
    glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.4)]',
    border: 'hover:border-neon-green/50',
    icon: 'text-neon-green',
    bg: 'bg-neon-green/10',
  },
  orange: {
    glow: 'hover:shadow-[0_0_30px_hsl(var(--neon-orange)/0.4)]',
    border: 'hover:border-neon-orange/50',
    icon: 'text-neon-orange',
    bg: 'bg-neon-orange/10',
  },
};

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  accentColor = 'cyan',
  delay = 0
}: StatCardProps) => {
  const styles = accentStyles[accentColor];

  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-500 cursor-pointer group",
        "hover:translate-y-[-4px] hover:scale-[1.02]",
        styles.glow,
        styles.border,
        "animate-slide-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl transition-all duration-300",
          styles.bg,
          "group-hover:scale-110"
        )}>
          <div className={cn(styles.icon, "transition-all duration-300")}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive
              ? "text-neon-green bg-neon-green/10"
              : "text-neon-red bg-neon-red/10"
          )}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
          {title}
        </p>
        <p className="text-3xl font-inter font-bold tracking-tight text-foreground">
          {value}
        </p>
      </div>

      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div
          className={cn(
            "h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "bg-gradient-to-r from-transparent via-current to-transparent",
            styles.icon
          )}
          style={{
            background: `linear-gradient(90deg, transparent, currentColor, transparent)`,
          }}
        />
      </div>
    </div>
  );
};
