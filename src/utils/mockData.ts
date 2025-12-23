export type InvoiceStatus = 'pending' | 'approved' | 'funded' | 'repaid';
export type Invoice = {
  id: string;
  invoiceNumber: string;
  patientName: string;
  insurerName: string;
  amount: number;
  dueDate: string;
  uploadDate: string;
  status: InvoiceStatus;
  serviceDescription: string;
  discountRate?: number;
  fundedAmount?: number;
};
export type Transaction = {
  id: string;
  type: 'funding_received' | 'repayment' | 'fee' | 'investment' | 'return';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  mpesaRef?: string;
  description: string;
};
export type CreditFactor = {
  name: string;
  score: number;
  maxScore: number;
  description: string;
  trend: 'up' | 'down' | 'stable';
};
export type CreditHistory = {
  date: string;
  score: number;
};
export type CreditProfile = {
  score: number;
  maxScore: number;
  creditLimit: number;
  usedCredit: number;
  factors: CreditFactor[];
  history: CreditHistory[];
};
export type InvestmentOpportunity = {
  id: string;
  anonymizedId: string;
  amount: number;
  discountRate: number;
  riskRating: 'low' | 'medium' | 'high';
  expectedAPY: number;
  term: number;
  insurerType: string;
  status: 'available' | 'invested' | 'completed';
};
export type Notification = {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};
export const mockInvoices: Invoice[] = [{
  id: '1',
  invoiceNumber: 'INV-2024-001',
  patientName: 'John Kamau',
  insurerName: 'Jubilee Insurance',
  amount: 125000,
  dueDate: '2024-02-15',
  uploadDate: '2024-01-20',
  status: 'funded',
  serviceDescription: 'Outpatient consultation and lab tests',
  discountRate: 8.5,
  fundedAmount: 106250
}, {
  id: '2',
  invoiceNumber: 'INV-2024-002',
  patientName: 'Mary Wanjiku',
  insurerName: 'AAR Insurance',
  amount: 85000,
  dueDate: '2024-02-20',
  uploadDate: '2024-01-22',
  status: 'approved',
  serviceDescription: 'Dental procedures',
  discountRate: 7.5
}, {
  id: '3',
  invoiceNumber: 'INV-2024-003',
  patientName: 'Peter Ochieng',
  insurerName: 'Britam Insurance',
  amount: 250000,
  dueDate: '2024-03-01',
  uploadDate: '2024-01-25',
  status: 'pending',
  serviceDescription: 'Surgical procedure - appendectomy'
}, {
  id: '4',
  invoiceNumber: 'INV-2024-004',
  patientName: 'Grace Muthoni',
  insurerName: 'CIC Insurance',
  amount: 45000,
  dueDate: '2024-01-30',
  uploadDate: '2024-01-10',
  status: 'repaid',
  serviceDescription: 'Maternity checkup',
  discountRate: 6.0,
  fundedAmount: 42300
}, {
  id: '5',
  invoiceNumber: 'INV-2024-005',
  patientName: 'David Kipchoge',
  insurerName: 'NHIF',
  amount: 180000,
  dueDate: '2024-02-28',
  uploadDate: '2024-01-28',
  status: 'pending',
  serviceDescription: 'Physiotherapy sessions (10 sessions)'
}, {
  id: '6',
  invoiceNumber: 'INV-2024-006',
  patientName: 'Faith Akinyi',
  insurerName: 'Madison Insurance',
  amount: 320000,
  dueDate: '2024-03-15',
  uploadDate: '2024-01-30',
  status: 'approved',
  serviceDescription: 'Cardiac evaluation and ECG',
  discountRate: 9.0
}];
export const mockTransactions: Transaction[] = [{
  id: 't1',
  type: 'funding_received',
  amount: 106250,
  date: '2024-01-21',
  status: 'completed',
  mpesaRef: 'QKL7X9Y2M4',
  description: 'Funding for INV-2024-001'
}, {
  id: 't2',
  type: 'repayment',
  amount: 125000,
  date: '2024-02-15',
  status: 'completed',
  mpesaRef: 'RMN8P3K5L2',
  description: 'Repayment from Jubilee Insurance'
}, {
  id: 't3',
  type: 'fee',
  amount: 1875,
  date: '2024-01-21',
  status: 'completed',
  description: 'Platform fee for INV-2024-001'
}, {
  id: 't4',
  type: 'funding_received',
  amount: 42300,
  date: '2024-01-11',
  status: 'completed',
  mpesaRef: 'ABC1D2E3F4',
  description: 'Funding for INV-2024-004'
}, {
  id: 't5',
  type: 'repayment',
  amount: 45000,
  date: '2024-01-30',
  status: 'completed',
  mpesaRef: 'GHI5J6K7L8',
  description: 'Repayment from CIC Insurance'
}];
export const mockCreditProfile: CreditProfile = {
  score: 78,
  maxScore: 100,
  creditLimit: 2500000,
  usedCredit: 875000,
  factors: [{
    name: 'Payment History',
    score: 85,
    maxScore: 100,
    description: 'Based on your repayment track record',
    trend: 'up'
  }, {
    name: 'Invoice Volume',
    score: 72,
    maxScore: 100,
    description: 'Total value of invoices processed',
    trend: 'up'
  }, {
    name: 'Repayment Rate',
    score: 90,
    maxScore: 100,
    description: 'Percentage of invoices repaid on time',
    trend: 'stable'
  }, {
    name: 'Account Age',
    score: 65,
    maxScore: 100,
    description: 'Length of time on the platform',
    trend: 'up'
  }],
  history: [{
    date: '2023-08',
    score: 62
  }, {
    date: '2023-09',
    score: 65
  }, {
    date: '2023-10',
    score: 68
  }, {
    date: '2023-11',
    score: 71
  }, {
    date: '2023-12',
    score: 74
  }, {
    date: '2024-01',
    score: 78
  }]
};
export const mockInvestmentOpportunities: InvestmentOpportunity[] = [{
  id: 'io1',
  anonymizedId: 'MF-2024-A1B2',
  amount: 150000,
  discountRate: 8.0,
  riskRating: 'low',
  expectedAPY: 18.5,
  term: 30,
  insurerType: 'Tier 1 Insurance',
  status: 'available'
}, {
  id: 'io2',
  anonymizedId: 'MF-2024-C3D4',
  amount: 280000,
  discountRate: 9.5,
  riskRating: 'medium',
  expectedAPY: 22.0,
  term: 45,
  insurerType: 'Tier 2 Insurance',
  status: 'available'
}, {
  id: 'io3',
  anonymizedId: 'MF-2024-E5F6',
  amount: 95000,
  discountRate: 7.0,
  riskRating: 'low',
  expectedAPY: 16.0,
  term: 21,
  insurerType: 'NHIF',
  status: 'invested'
}, {
  id: 'io4',
  anonymizedId: 'MF-2024-G7H8',
  amount: 420000,
  discountRate: 11.0,
  riskRating: 'high',
  expectedAPY: 28.0,
  term: 60,
  insurerType: 'Tier 3 Insurance',
  status: 'available'
}];
export const mockNotifications: Notification[] = [{
  id: 'n1',
  type: 'success',
  title: 'Invoice Approved',
  message: 'INV-2024-002 has been approved for funding at 7.5% discount rate.',
  timestamp: '2024-01-28T10:30:00',
  read: false
}, {
  id: 'n2',
  type: 'success',
  title: 'Funds Disbursed',
  message: 'KES 106,250 has been sent to your M-Pesa (0712 XXX XXX).',
  timestamp: '2024-01-21T14:15:00',
  read: true
}, {
  id: 'n3',
  type: 'info',
  title: 'Credit Score Updated',
  message: 'Your credit score increased by 4 points to 78.',
  timestamp: '2024-01-20T09:00:00',
  read: true
}, {
  id: 'n4',
  type: 'warning',
  title: 'Invoice Due Soon',
  message: 'INV-2024-003 is due for repayment in 5 days.',
  timestamp: '2024-01-25T08:00:00',
  read: false
}];
export const mockDashboardStats = {
  totalInvoices: 24,
  pendingApprovals: 3,
  approvedFunding: 1250000,
  totalLiquidityAccessed: 4850000,
  averageApprovalTime: '4.2 hours',
  creditScore: 78,
  availableCreditLimit: 1625000
};
export const mockInvestorStats = {
  totalDeployed: 2850000,
  totalReturns: 342000,
  activeInvestments: 8,
  averageAPY: 19.5,
  pendingReturns: 45000
};
export const mockFundingHistory = [{
  month: 'Aug',
  amount: 320000
}, {
  month: 'Sep',
  amount: 450000
}, {
  month: 'Oct',
  amount: 380000
}, {
  month: 'Nov',
  amount: 520000
}, {
  month: 'Dec',
  amount: 680000
}, {
  month: 'Jan',
  amount: 750000
}];