import { useState, useEffect, useCallback } from 'react';
import { TransactionData, DashboardStats } from '@/types/dashboard';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1_r7dAQDMV-5LH8pbzw7EpczFM4uD3S1ezUejwJeGkfk/export?format=csv';

// Smart CSV line parser that handles commas inside quoted values and currency
const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
};

const parseCSV = (csv: string): TransactionData[] => {
  const lines = csv.trim().split('\n');
  if (lines.length < 2) return [];

  // Find the header row (skip title row if present)
  let headerIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (line.includes('sr no') || line.includes('date') || line.includes('description')) {
      headerIndex = i;
      break;
    }
  }

  const headers = parseCSVLine(lines[headerIndex]).map(h => h.toLowerCase());

  return lines.slice(headerIndex + 1).map((line, index) => {
    const values = parseCSVLine(line);

    const srNoIdx = headers.findIndex(h => h.includes('sr') && h.includes('no'));
    const dateIdx = headers.findIndex(h => h.includes('date'));
    const descIdx = headers.findIndex(h => h.includes('description'));
    const receivedIdx = headers.findIndex(h => h.includes('received'));
    const paidIdx = headers.findIndex(h => h.includes('paid'));
    const detailsIdx = headers.findIndex(h => h.includes('details'));

    // Parse currency values (remove "Rs.", commas, etc.)
    const parseAmount = (val: string): number => {
      if (!val) return 0;
      const cleaned = val.replace(/Rs\.?\s*/gi, '').replace(/,/g, '').trim();
      return parseFloat(cleaned) || 0;
    };

    return {
      srNo: parseInt(values[srNoIdx]) || index + 1,
      date: values[dateIdx] || '',
      description: values[descIdx] || '',
      received: parseAmount(values[receivedIdx]),
      paid: parseAmount(values[paidIdx]),
      details: values[detailsIdx] || '',
    };
  }).filter(row => row.date !== '' || row.description !== '');
};

const calculateStats = (transactions: TransactionData[]): DashboardStats => {
  const totalTransactions = transactions.length;
  const totalReceived = transactions.reduce((sum, t) => sum + t.received, 0);
  const totalPaid = transactions.reduce((sum, t) => sum + t.paid, 0);
  const netBalance = totalReceived - totalPaid;
  const averageTransaction = totalTransactions > 0 ? (totalReceived + totalPaid) / totalTransactions : 0;
  const latestDate = transactions.length > 0 ? transactions[transactions.length - 1].date : '';

  return {
    totalTransactions,
    totalReceived,
    totalPaid,
    netBalance,
    averageTransaction,
    latestDate,
  };
};

export const useGoogleSheetsData = () => {
  const [data, setData] = useState<TransactionData[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(SHEET_URL);
      if (!response.ok) throw new Error('Failed to fetch data');

      const csv = await response.text();
      const parsedData = parseCSV(csv);

      setData(parsedData);
      setStats(calculateStats(parsedData));
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  return { data, stats, loading, error, lastUpdated, refetch: fetchData };
};
