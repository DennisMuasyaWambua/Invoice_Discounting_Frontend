import { apiClient } from './api';

export interface Invoice {
  id: string;
  invoice_number: string;
  patientName: string;
  insurerName: string;
  amount: number;
  due_date: string;
  upload_date: string;
  status: 'pending' | 'approved' | 'funded' | 'repaid';
  serviceDescription?: string;
  discount_rate?: number;
  funded_amount?: number;
}

export interface CreateInvoiceRequest {
  invoice_number: string;
  patientName: string;
  insurerName: string;
  amount: string;
  due_date: string;
  serviceDescription?: string;
}

export interface InvoiceListResponse {
  results: Invoice[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface InvoiceFilters {
  status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
}

export interface FundingRequest {
  invoiceId: string;
  mpesaNumber: string;
  requestedAmount: string;
}

export interface FundingResponse {
  message: string;
  transaction_id?: string;
  status: string;
}

class InvoiceService {
  async getInvoices(filters?: InvoiceFilters): Promise<InvoiceListResponse> {
    const params: Record<string, string> = {};
    if (filters?.status) params.status = filters.status;
    if (filters?.search) params.search = filters.search;
    if (filters?.date_from) params.date_from = filters.date_from;
    if (filters?.date_to) params.date_to = filters.date_to;

    return apiClient.get<InvoiceListResponse>('/api/invoices/', params);
  }

  async getInvoice(id: string): Promise<Invoice> {
    return apiClient.get<Invoice>(`/api/invoices/${id}/`);
  }

  async createInvoice(invoice: CreateInvoiceRequest): Promise<Invoice> {
    return apiClient.post<Invoice>('/api/invoices/', invoice);
  }

  async updateInvoice(id: string, invoice: Partial<CreateInvoiceRequest>): Promise<Invoice> {
    return apiClient.put<Invoice>(`/api/invoices/${id}/`, invoice);
  }

  async deleteInvoice(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/invoices/${id}/`);
  }

  async uploadInvoiceFile(file: File, invoiceData?: Partial<CreateInvoiceRequest>): Promise<Invoice> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (invoiceData) {
      Object.entries(invoiceData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });
    }

    return apiClient.uploadFile<Invoice>('/api/upload/', formData);
  }

  async requestFunding(request: FundingRequest): Promise<FundingResponse> {
    return apiClient.post<FundingResponse>('/api/funding/request/', {
      invoice_id: request.invoiceId,
      mpesa_number: request.mpesaNumber,
      requested_amount: request.requestedAmount,
    });
  }

  async getFundingCalculator(amount: number, discountRate?: number): Promise<{
    discount_rate: number;
    funding_amount: number;
    fees: number;
  }> {
    const params: Record<string, string> = { amount: amount.toString() };
    if (discountRate) params.discount_rate = discountRate.toString();

    return apiClient.get('/api/funding/calculator/', params);
  }
}

export const invoiceService = new InvoiceService();