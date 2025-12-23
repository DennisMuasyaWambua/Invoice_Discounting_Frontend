import { apiClient } from './api';

export interface DashboardStats {
  total_invoices: number;
  pending_invoices: number;
  approved_invoices: number;
  funded_amount: number;
  total_amount: number;
  credit_limit: number;
  used_credit: number;
}

export interface Transaction {
  id: string;
  type: 'funding_received' | 'repayment' | 'fee' | 'investment' | 'return';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  mpesa_ref?: string;
  description: string;
}

export interface RecentInvoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  upload_date: string;
}

export interface FundingHistory {
  id: string;
  invoice_number: string;
  amount: number;
  funded_date: string;
  status: string;
}

export interface CreditProfile {
  score: number;
  max_score: number;
  credit_limit: number;
  used_credit: number;
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }>;
  history: Array<{
    date: string;
    score: number;
    change: number;
  }>;
}

class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>('/api/dashboard/stats/');
  }

  async getRecentInvoices(): Promise<RecentInvoice[]> {
    return apiClient.get<RecentInvoice[]>('/api/dashboard/recent-invoices/');
  }

  async getFundingHistory(): Promise<FundingHistory[]> {
    return apiClient.get<FundingHistory[]>('/api/dashboard/funding-history/');
  }

  async getTransactions(filters?: { type?: string; search?: string }): Promise<Transaction[]> {
    const params: Record<string, string> = {};
    if (filters?.type) params.type = filters.type;
    if (filters?.search) params.search = filters.search;

    return apiClient.get<Transaction[]>('/api/transactions/', params);
  }

  async getCreditProfile(): Promise<CreditProfile> {
    return apiClient.get<CreditProfile>('/api/credit/profile/');
  }
}

export const dashboardService = new DashboardService();