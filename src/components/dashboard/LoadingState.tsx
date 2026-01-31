import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center cyber-grid">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-neon-cyan/30 border-t-neon-cyan animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-neon-magenta animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-inter font-bold text-foreground mb-2 text-gradient-cyber">
          LOADING DASHBOARD
        </h2>
        <p className="text-muted-foreground animate-pulse">
          Establishing data connection...
        </p>
      </div>
    </div>
  );
};
