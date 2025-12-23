import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2Icon, XCircleIcon, EyeIcon, AlertTriangleIcon, ClockIcon, FilterIcon } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DataTable } from '../../components/ui/DataTable';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { formatKES } from '../../utils/currency';
import { mockInvoices, Invoice } from '../../utils/mockData';
type FilterType = 'all' | 'urgent' | 'high-value' | 'new-provider';
export function ApprovalQueue() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const pendingInvoices = mockInvoices.filter(inv => inv.status === 'pending');
  const handleApprove = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsProcessing(false);
    setShowApproveModal(false);
    setSelectedInvoice(null);
  };
  const handleDecline = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsProcessing(false);
    setShowDeclineModal(false);
    setSelectedInvoice(null);
  };
  const columns = [{
    key: 'priority',
    header: '',
    render: (invoice: Invoice) => <div className="flex items-center gap-2">
          {invoice.amount > 200000 && <AlertTriangleIcon className="w-4 h-4 text-pending-600" />}
        </div>
  }, {
    key: 'invoiceNumber',
    header: 'Invoice Details',
    render: (invoice: Invoice) => <div>
          <span className="font-medium text-gray-900">
            {invoice.invoiceNumber}
          </span>
          <p className="text-xs text-gray-500 mt-0.5">
            {invoice.serviceDescription}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">
              Submitted{' '}
              {new Date(invoice.uploadDate).toLocaleDateString('en-KE')}
            </span>
            {new Date().getTime() - new Date(invoice.uploadDate).getTime() > 86400000 && <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-medium">
                <ClockIcon className="w-3 h-3" />
                Overdue
              </span>}
          </div>
        </div>
  }, {
    key: 'provider',
    header: 'Provider',
    render: () => <div>
          <p className="text-sm font-medium text-gray-900">
            Nairobi Medical Centre
          </p>
          <p className="text-xs text-gray-500">Credit Score: 78/100</p>
          <p className="text-xs text-gray-500">KRA: A001972400X</p>
        </div>
  }, {
    key: 'counterparty',
    header: 'Counterparty',
    render: (invoice: Invoice) => <div>
          <p className="text-sm font-medium text-gray-900">
            {invoice.insurerName}
          </p>
          <p className="text-xs text-gray-500">Tier 1 Insurer</p>
        </div>
  }, {
    key: 'amount',
    header: 'Invoice Value',
    render: (invoice: Invoice) => <div>
          <p className="font-semibold text-gray-900 tabular-nums">
            {formatKES(invoice.amount)}
          </p>
          <p className="text-xs text-gray-500">
            Advance: {formatKES(invoice.amount * 0.85)} (85%)
          </p>
        </div>
  }, {
    key: 'risk',
    header: 'Risk Assessment',
    render: () => <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-success-500" style={{
            width: '75%'
          }} />
            </div>
            <span className="text-xs font-medium text-gray-600">75</span>
          </div>
          <p className="text-xs text-success-600 font-medium">Low Risk</p>
        </div>
  }, {
    key: 'actions',
    header: 'Actions',
    render: (invoice: Invoice) => <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/invoices/${invoice.id}`)} icon={<EyeIcon className="w-4 h-4" />}>
            Review
          </Button>
          <Button size="sm" variant="secondary" onClick={() => {
        setSelectedInvoice(invoice);
        setShowApproveModal(true);
      }} icon={<CheckCircle2Icon className="w-4 h-4" />}>
            Approve
          </Button>
          <Button size="sm" variant="ghost" onClick={() => {
        setSelectedInvoice(invoice);
        setShowDeclineModal(true);
      }} icon={<XCircleIcon className="w-4 h-4" />}>
            Decline
          </Button>
        </div>
  }];
  return <PageContainer title="Approval Queue" subtitle="Credit review and approval workflow">
      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input placeholder="Search by invoice number, provider, or counterparty..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'urgent', 'high-value', 'new-provider'] as const).map(f => <button key={f} onClick={() => setFilter(f)} className={`
                  px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${filter === f ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}>
                  {f === 'all' ? 'All' : f === 'urgent' ? 'Urgent (24h+)' : f === 'high-value' ? 'High Value (200K+)' : 'New Provider'}
                </button>)}
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Pending</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {pendingInvoices.length}
            </p>
          </div>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <div className="text-center">
            <p className="text-sm text-red-700">Urgent (24h+)</p>
            <p className="text-2xl font-bold text-red-900 mt-1">2</p>
          </div>
        </Card>
        <Card className="border-pending-200 bg-pending-50">
          <div className="text-center">
            <p className="text-sm text-pending-700">High Value</p>
            <p className="text-2xl font-bold text-pending-900 mt-1">3</p>
          </div>
        </Card>
        <Card className="border-primary-200 bg-primary-50">
          <div className="text-center">
            <p className="text-sm text-primary-700">New Providers</p>
            <p className="text-2xl font-bold text-primary-900 mt-1">1</p>
          </div>
        </Card>
      </div>

      {/* Approval Queue Table */}
      <DataTable data={pendingInvoices} columns={columns} keyExtractor={invoice => invoice.id} pageSize={10} />

      {/* Approve Modal */}
      <ConfirmationModal isOpen={showApproveModal} onClose={() => setShowApproveModal(false)} onConfirm={handleApprove} title="Approve Invoice for Funding" message={selectedInvoice ? `Approve ${selectedInvoice.invoiceNumber} for ${formatKES(selectedInvoice.amount * 0.85)} advance (85% of invoice value)? This will trigger immediate disbursement to the provider's M-Pesa account.` : ''} type="confirm" confirmText="Approve & Disburse" loading={isProcessing} />

      {/* Decline Modal */}
      <ConfirmationModal isOpen={showDeclineModal} onClose={() => setShowDeclineModal(false)} onConfirm={handleDecline} title="Decline Invoice" message={selectedInvoice ? `Decline ${selectedInvoice.invoiceNumber}? The provider will be notified of the decision. Please ensure you've documented the reason for decline in the system notes.` : ''} type="warning" confirmText="Decline Invoice" loading={isProcessing} />
    </PageContainer>;
}