import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid">
      <div className="glass-card p-8 max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-red/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-neon-red" />
        </div>
        <h2 className="text-xl font-orbitron font-bold text-foreground mb-2">
          CONNECTION ERROR
        </h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 mx-auto rounded-lg font-medium bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20 transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Connection
        </button>
      </div>
    </div>
  );
};
