import { RefreshCw, Zap, Clock, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface DashboardHeaderProps {
  lastUpdated: Date | null;
  onRefresh: () => void;
  loading: boolean;
  error?: string | null;
}

export const DashboardHeader = ({ lastUpdated, onRefresh, loading, error }: DashboardHeaderProps) => {
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(30);
  const isConnected = !error && lastUpdated !== null;

  // Countdown timer for next refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsUntilRefresh((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Reset countdown when data is refreshed
  useEffect(() => {
    setSecondsUntilRefresh(30);
  }, [lastUpdated]);

  return (
    <header className="glass-card p-6 mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center border border-primary/30 animate-pulse-glow bg-background/50 shadow-[0_0_20px_rgba(37,150,190,0.1)]">
              <img src="/logo.png" alt="Build Co Logo" className="w-full h-full object-contain p-1" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-neon-green animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-inter font-bold text-gradient-brand text-shine">
              BUILD CO ASSOCIATES
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Crafting Your Legacy Today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Live Connection Indicator */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300",
            isConnected
              ? "bg-neon-green/10 border-neon-green/30 text-neon-green"
              : "bg-neon-red/10 border-neon-red/30 text-neon-red"
          )}>
            {isConnected ? (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LIVE</span>
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">OFFLINE</span>
              </>
            )}
          </div>

          {/* Next refresh countdown */}
          {isConnected && !loading && (
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <div className="relative w-6 h-6">
                <svg className="w-6 h-6 -rotate-90">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="hsl(var(--neon-cyan) / 0.2)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="hsl(var(--neon-cyan))"
                    strokeWidth="2"
                    strokeDasharray={`${(secondsUntilRefresh / 30) * 62.8} 62.8`}
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
              <span>{secondsUntilRefresh}s</span>
            </div>
          )}

          {lastUpdated && (
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          )}

          <button
            onClick={onRefresh}
            disabled={loading}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium",
              "bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan",
              "hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)]",
              "transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            <span className="hidden sm:inline">{loading ? 'Syncing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
