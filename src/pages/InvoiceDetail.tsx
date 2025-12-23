import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, FileTextIcon, CalendarIcon, BuildingIcon, UserIcon, WalletIcon, EyeIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { FundingCalculator } from '../components/ui/FundingCalculator';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { InvoiceViewer } from '../components/ui/InvoiceViewer';
import { formatKES } from '../utils/currency';
import { mockInvoices, mockCreditProfile } from '../utils/mockData';
export function InvoiceDetail() {
  const navigate = useNavigate();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [showInvoiceViewer, setShowInvoiceViewer] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const invoice = mockInvoices.find(inv => inv.id === id);
  if (!invoice) {
    return <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Invoice not found
          </h2>
          <Button onClick={() => navigate('/invoices')}>
            Back to Invoices
          </Button>
        </div>
      </PageContainer>;
  }
  const handleRequestFunding = async () => {
    setIsRequesting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsRequesting(false);
    setShowFundingModal(false);
    navigate('/funding');
  };
  const canRequestFunding = invoice.status === 'approved';
  return <PageContainer actions={<div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => setShowInvoiceViewer(true)} icon={<EyeIcon className="w-4 h-4" />}>
            View Invoice
          </Button>
          <Button variant="ghost" onClick={() => navigate('/invoices')} icon={<ArrowLeftIcon className="w-4 h-4" />}>
            Back
          </Button>
        </div>}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Invoice Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                  <FileTextIcon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {invoice.invoiceNumber}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {invoice.serviceDescription}
                  </p>
                </div>
              </div>
              <StatusBadge status={invoice.status} />
            </div>
          </Card>

          {/* Details Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient</p>
                    <p className="font-medium text-gray-900">
                      {invoice.patientName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <BuildingIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Insurer</p>
                    <p className="font-medium text-gray-900">
                      {invoice.insurerName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <WalletIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Invoice Amount</p>
                    <p className="font-bold text-gray-900 text-lg tabular-nums">
                      {formatKES(invoice.amount)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(invoice.dueDate).toLocaleDateString('en-KE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-4">Timeline</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-success-500 mt-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Invoice Uploaded
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(invoice.uploadDate).toLocaleDateString('en-KE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                      </p>
                    </div>
                  </div>
                  {(invoice.status === 'approved' || invoice.status === 'funded' || invoice.status === 'repaid') && <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Approved for Funding
                        </p>
                        <p className="text-xs text-gray-500">
                          Discount rate: {invoice.discountRate}%
                        </p>
                      </div>
                    </div>}
                  {(invoice.status === 'funded' || invoice.status === 'repaid') && <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-success-500 mt-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Funds Disbursed
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatKES(invoice.fundedAmount || 0)} via M-Pesa
                        </p>
                      </div>
                    </div>}
                  {invoice.status === 'repaid' && <div className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-500 mt-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Repaid
                        </p>
                        <p className="text-xs text-gray-500">
                          Invoice settled by insurer
                        </p>
                      </div>
                    </div>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Funding Options */}
        <div className="space-y-6">
          {canRequestFunding ? <>
              <FundingCalculator invoiceAmount={invoice.amount} baseDiscountRate={invoice.discountRate || 8} creditScore={mockCreditProfile.score} />
              <Button onClick={() => setShowFundingModal(true)} fullWidth size="lg">
                Request Funding
              </Button>
            </> : invoice.status === 'pending' ? <Card>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full bg-pending-100 flex items-center justify-center mx-auto mb-4">
                    <FileTextIcon className="w-6 h-6 text-pending-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Pending Review
                  </h3>
                  <p className="text-sm text-gray-600">
                    This invoice is being reviewed. You'll be notified once it's
                    approved for funding.
                  </p>
                </div>
              </CardContent>
            </Card> : invoice.status === 'funded' ? <Card>
              <CardHeader>
                <CardTitle>Funding Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Funded Amount</span>
                    <span className="font-medium text-gray-900">
                      {formatKES(invoice.fundedAmount || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount Rate</span>
                    <span className="font-medium text-gray-900">
                      {invoice.discountRate}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-3 border-t border-gray-100">
                    <span className="text-gray-600">Repayment Due</span>
                    <span className="font-medium text-gray-900">
                      {new Date(invoice.dueDate).toLocaleDateString('en-KE', {
                    day: 'numeric',
                    month: 'short'
                  })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card> : null}
        </div>
      </div>

      <InvoiceViewer invoice={invoice} isOpen={showInvoiceViewer} onClose={() => setShowInvoiceViewer(false)} />

      <ConfirmationModal isOpen={showFundingModal} onClose={() => setShowFundingModal(false)} onConfirm={handleRequestFunding} title="Request Funding" message={`You're about to request funding for invoice ${invoice.invoiceNumber}. Funds will be sent to your registered M-Pesa number within 24 hours of approval.`} type="confirm" confirmText="Request Funding" loading={isRequesting} />
    </PageContainer>;
}