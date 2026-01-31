import { useGoogleSheetsData } from '@/hooks/useGoogleSheetsData';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { ClientTable } from '@/components/dashboard/ClientTable';
import { StatusChart } from '@/components/dashboard/StatusChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';
import { LoadingState } from '@/components/dashboard/LoadingState';
import { ErrorState } from '@/components/dashboard/ErrorState';
import { Receipt, ArrowDownCircle, ArrowUpCircle, Wallet, Calendar, TrendingUp } from 'lucide-react';

const Index = () => {
  const { data, stats, loading, error, lastUpdated, refetch } = useGoogleSheetsData();

  if (loading && !stats) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!stats) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 cyber-grid scanline">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader 
          lastUpdated={lastUpdated} 
          onRefresh={refetch} 
          loading={loading}
          error={error}
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Transactions"
            value={stats.totalTransactions}
            icon={<Receipt className="w-6 h-6" />}
            accentColor="cyan"
            delay={0}
          />
          <StatCard
            title="Total Received"
            value={`Rs ${stats.totalReceived.toLocaleString()}`}
            icon={<ArrowDownCircle className="w-6 h-6" />}
            accentColor="green"
            delay={50}
          />
          <StatCard
            title="Total Paid"
            value={`Rs ${stats.totalPaid.toLocaleString()}`}
            icon={<ArrowUpCircle className="w-6 h-6" />}
            accentColor="orange"
            delay={100}
          />
          <StatCard
            title="Net Balance"
            value={`Rs ${stats.netBalance.toLocaleString()}`}
            icon={<Wallet className="w-6 h-6" />}
            accentColor={stats.netBalance >= 0 ? 'green' : 'orange'}
            delay={150}
          />
          <StatCard
            title="Avg. Transaction"
            value={`Rs ${stats.averageTransaction.toFixed(0)}`}
            icon={<TrendingUp className="w-6 h-6" />}
            accentColor="purple"
            delay={200}
          />
          <StatCard
            title="Latest Entry"
            value={stats.latestDate || 'N/A'}
            icon={<Calendar className="w-6 h-6" />}
            accentColor="magenta"
            delay={250}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RevenueChart data={data} />
          </div>
          <div>
            <StatusChart stats={stats} />
          </div>
        </div>

        {/* Performance and Table Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <PerformanceMetrics stats={stats} />
          </div>
          <div className="lg:col-span-3">
            <ClientTable data={data} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
          <p className="font-orbitron">
            NEXUS ANALYTICS v1.0 • Data synced from Google Sheets
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
