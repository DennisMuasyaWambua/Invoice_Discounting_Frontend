import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadIcon, SearchIcon, FilterIcon, GridIcon, ListIcon, CalendarIcon, EyeIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DataTable } from '../components/ui/DataTable';
import { EmptyState } from '../components/ui/EmptyState';
import { InvoiceViewer } from '../components/ui/InvoiceViewer';
import { formatKES } from '../utils/currency';
import { Invoice, InvoiceStatus } from '../utils/mockData';
import { invoiceService } from '../services/invoiceService';
type ViewMode = 'list' | 'grid';
export function InvoiceManagement() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedInvoiceForView, setSelectedInvoiceForView] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadInvoices();
  }, [statusFilter, searchQuery, dateFilter]);

  const loadInvoices = async () => {
    try {
      setIsLoading(true);
      const filters = {
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchQuery || undefined,
        date_from: dateFilter || undefined,
      };
      
      const response = await invoiceService.getInvoices(filters);
      setInvoices(response.results);
    } catch (err) {
      setError('Failed to load invoices');
      console.error('Invoice loading error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || invoice.insurerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesDate = !dateFilter || invoice.uploadDate >= dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });
  const invoiceColumns = [{
    key: 'invoiceNumber',
    header: 'Invoice #',
    sortable: true,
    render: (invoice: Invoice) => <div>
          <span className="font-medium text-gray-900">
            {invoice.invoiceNumber}
          </span>
          <p className="text-xs text-gray-500 mt-0.5">
            {invoice.serviceDescription}
          </p>
        </div>
  }, {
    key: 'patientName',
    header: 'Patient',
    sortable: true,
    className: 'hidden md:table-cell'
  }, {
    key: 'insurerName',
    header: 'Insurer',
    sortable: true
  }, {
    key: 'amount',
    header: 'Amount',
    sortable: true,
    render: (invoice: Invoice) => <span className="font-medium tabular-nums">
          {formatKES(invoice.amount)}
        </span>
  }, {
    key: 'dueDate',
    header: 'Due Date',
    sortable: true,
    className: 'hidden lg:table-cell',
    render: (invoice: Invoice) => <span className="text-gray-600">
          {new Date(invoice.dueDate).toLocaleDateString('en-KE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })}
        </span>
  }, {
    key: 'status',
    header: 'Status',
    render: (invoice: Invoice) => <StatusBadge status={invoice.status} />
  }, {
    key: 'actions',
    header: '',
    render: (invoice: Invoice) => <button onClick={e => {
      e.stopPropagation();
      setSelectedInvoiceForView(invoice);
    }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="View invoice">
          <EyeIcon className="w-4 h-4 text-gray-500" />
        </button>
  }];
  const InvoiceCard = ({
    invoice
  }: {
    invoice: Invoice;
  }) => <Card padding="md" className="group relative">
      <div onClick={() => navigate(`/invoices/${invoice.id}`)} className="cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">
              {invoice.invoiceNumber}
            </h3>
            <p className="text-sm text-gray-500">{invoice.insurerName}</p>
          </div>
          <StatusBadge status={invoice.status} size="sm" />
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {invoice.serviceDescription}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-gray-900 tabular-nums">
            {formatKES(invoice.amount)}
          </span>
          <span className="text-xs text-gray-500">
            Due{' '}
            {new Date(invoice.dueDate).toLocaleDateString('en-KE', {
            day: 'numeric',
            month: 'short'
          })}
          </span>
        </div>
      </div>
      <button onClick={e => {
      e.stopPropagation();
      setSelectedInvoiceForView(invoice);
    }} className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="View invoice">
        <EyeIcon className="w-4 h-4 text-gray-600" />
      </button>
    </Card>;
  return <PageContainer title="Invoices" subtitle="Manage and track all your healthcare invoices" actions={<Button onClick={() => navigate('/invoices/upload')} icon={<UploadIcon className="w-4 h-4" />}>
          Upload Invoice
        </Button>}>
      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <Input placeholder="Search invoices..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} icon={<SearchIcon className="w-4 h-4" />} />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending', 'approved', 'funded', 'repaid'] as const).map(status => <button key={status} onClick={() => setStatusFilter(status)} className={`
                  px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${statusFilter === status ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}>
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>)}
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <Input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} icon={<CalendarIcon className="w-4 h-4" />} className="w-40" />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`} aria-label="List view">
              <ListIcon className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`} aria-label="Grid view">
              <GridIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Results */}
      {filteredInvoices.length === 0 ? <EmptyState type="invoices" onAction={() => navigate('/invoices/upload')} /> : viewMode === 'list' ? <DataTable data={filteredInvoices} columns={invoiceColumns} keyExtractor={invoice => invoice.id} onRowClick={invoice => navigate(`/invoices/${invoice.id}`)} pageSize={10} /> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInvoices.map(invoice => <InvoiceCard key={invoice.id} invoice={invoice} />)}
        </div>}

      <InvoiceViewer invoice={selectedInvoiceForView!} isOpen={!!selectedInvoiceForView} onClose={() => setSelectedInvoiceForView(null)} />
    </PageContainer>;
}