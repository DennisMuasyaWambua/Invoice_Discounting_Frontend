import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletIcon, CheckCircleIcon, ClockIcon, ArrowRightIcon, SmartphoneIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { KPICard } from '../components/ui/KPICard';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { MPesaInput } from '../components/ui/MPesaInput';
import { FundingCalculator } from '../components/ui/FundingCalculator';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { formatKES, formatKESCompact } from '../utils/currency';
import { mockInvoices, mockTransactions, mockCreditProfile } from '../utils/mockData';
export function FundingDashboard() {
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const approvedInvoices = mockInvoices.filter(inv => inv.status === 'approved');
  const fundedInvoices = mockInvoices.filter(inv => inv.status === 'funded');
  const totalApprovedAmount = approvedInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalFundedAmount = fundedInvoices.reduce((sum, inv) => sum + (inv.fundedAmount || 0), 0);
  const selectedInvoiceData = approvedInvoices.find(inv => inv.id === selectedInvoice);
  const handleRequestFunding = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsProcessing(false);
    setShowConfirmModal(false);
    // In real app, would update invoice status and show success
  };
  const recentFundingTransactions = mockTransactions.filter(t => t.type === 'funding_received' || t.type === 'repayment');
  return <PageContainer title="Funding" subtitle="Request funding for your approved invoices">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <KPICard title="Available for Funding" value={formatKESCompact(totalApprovedAmount)} icon={<WalletIcon className="w-6 h-6" />} subtitle={`${approvedInvoices.length} invoices`} />
        <KPICard title="Total Funded" value={formatKESCompact(totalFundedAmount)} icon={<CheckCircleIcon className="w-6 h-6" />} trend={{
        value: 15,
        direction: 'up'
      }} subtitle="this month" />
        <KPICard title="Pending Repayment" value={formatKESCompact(fundedInvoices.reduce((sum, inv) => sum + inv.amount, 0))} icon={<ClockIcon className="w-6 h-6" />} subtitle={`${fundedInvoices.length} invoices`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Approved Invoices List */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <CardHeader className="px-6 pt-6">
              <CardTitle>Approved Invoices</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              {approvedInvoices.length === 0 ? <div className="px-6 py-8 text-center">
                  <p className="text-gray-500 mb-4">
                    No approved invoices available for funding.
                  </p>
                  <Button onClick={() => navigate('/invoices/upload')}>
                    Upload Invoice
                  </Button>
                </div> : <div className="divide-y divide-gray-100">
                  {approvedInvoices.map(invoice => <div key={invoice.id} onClick={() => setSelectedInvoice(invoice.id)} className={`
                        px-6 py-4 cursor-pointer transition-colors
                        ${selectedInvoice === invoice.id ? 'bg-primary-50 border-l-4 border-primary-500' : 'hover:bg-gray-50'}
                      `}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {invoice.invoiceNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            {invoice.insurerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 tabular-nums">
                            {formatKES(invoice.amount)}
                          </p>
                          <p className="text-xs text-success-600">
                            {invoice.discountRate}% discount rate
                          </p>
                        </div>
                      </div>
                    </div>)}
                </div>}
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/transactions')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFundingTransactions.slice(0, 5).map(transaction => <div key={transaction.id} className="flex items-center gap-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${transaction.type === 'funding_received' ? 'bg-success-100' : 'bg-gray-100'}
                    `}>
                      {transaction.type === 'funding_received' ? <ArrowRightIcon className="w-5 h-5 text-success-600 rotate-180" /> : <ArrowRightIcon className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('en-KE', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                        {transaction.mpesaRef && ` • ${transaction.mpesaRef}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium tabular-nums ${transaction.type === 'funding_received' ? 'text-success-600' : 'text-gray-900'}`}>
                        {transaction.type === 'funding_received' ? '+' : ''}
                        {formatKES(transaction.amount)}
                      </p>
                      <StatusBadge status={transaction.status} size="sm" />
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Funding Request Panel */}
        <div className="space-y-6">
          {selectedInvoiceData ? <>
              <FundingCalculator invoiceAmount={selectedInvoiceData.amount} baseDiscountRate={selectedInvoiceData.discountRate || 8} creditScore={mockCreditProfile.score} />

              <Card>
                <CardHeader>
                  <CardTitle>Disbursement</CardTitle>
                </CardHeader>
                <CardContent>
                  <MPesaInput value={mpesaNumber} onChange={setMpesaNumber} label="M-Pesa Number" required />
                  <div className="mt-4 p-3 bg-success-50 rounded-lg flex items-start gap-3">
                    <SmartphoneIcon className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-success-800">
                        Instant M-Pesa Transfer
                      </p>
                      <p className="text-xs text-success-700 mt-1">
                        Funds will be sent directly to your M-Pesa within 24
                        hours of approval.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => setShowConfirmModal(true)} fullWidth size="lg" disabled={!mpesaNumber || mpesaNumber.replace(/\s/g, '').length !== 10}>
                Request Funding
              </Button>
            </> : <Card>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <WalletIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Select an Invoice
                  </h3>
                  <p className="text-sm text-gray-500">
                    Choose an approved invoice from the list to request funding.
                  </p>
                </div>
              </CardContent>
            </Card>}
        </div>
      </div>

      <ConfirmationModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={handleRequestFunding} title="Confirm Funding Request" message={`You're requesting funding for ${selectedInvoiceData?.invoiceNumber}. The funds will be sent to ${mpesaNumber} via M-Pesa.`} type="confirm" confirmText="Confirm Request" loading={isProcessing} />
    </PageContainer>;
}