import { TransactionData } from '@/types/dashboard';
import { cn } from '@/lib/utils';
import { Hash, Calendar, FileText, ArrowDownCircle, ArrowUpCircle, Info } from 'lucide-react';

interface TransactionTableProps {
  data: TransactionData[];
}

export const ClientTable = ({ data }: TransactionTableProps) => {
  return (
    <div className="glass-card overflow-hidden animate-slide-up" style={{ animationDelay: '400ms' }}>
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neon-cyan/10">
            <FileText className="w-5 h-5 text-neon-cyan" />
          </div>
          <h2 className="text-xl font-inter font-semibold text-foreground">
            Transaction Ledger
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Sr No.
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </th>
              <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <ArrowDownCircle className="w-4 h-4 text-neon-green" />
                  Received
                </div>
              </th>
              <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <ArrowUpCircle className="w-4 h-4 text-neon-red" />
                  Paid
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  Details
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => {
              return (
                <tr
                  key={`${transaction.srNo}-${index}`}
                  className={cn(
                    "border-b border-border/20 transition-all duration-300",
                    "hover:bg-muted/30 group cursor-pointer"
                  )}
                  style={{ animationDelay: `${500 + index * 50}ms` }}
                >
                  <td className="px-4 py-4">
                    <span className="font-inter font-semibold text-neon-cyan">
                      {transaction.srNo}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-foreground font-medium">
                      {transaction.date}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-foreground">
                      {transaction.description}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {transaction.received > 0 ? (
                      <span className="font-inter font-semibold text-neon-green">
                        Rs {transaction.received.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {transaction.paid > 0 ? (
                      <span className="font-inter font-semibold text-neon-red">
                        Rs {transaction.paid.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-muted-foreground text-sm">
                      {transaction.details}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-muted-foreground">No transaction data available</p>
        </div>
      )}
    </div>
  );
};
