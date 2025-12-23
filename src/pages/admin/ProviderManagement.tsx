import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheckIcon, ShieldAlertIcon, EyeIcon, LockIcon, UnlockIcon, SearchIcon } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DataTable } from '../../components/ui/DataTable';
import { formatKES, formatKESCompact } from '../../utils/currency';
type Provider = {
  id: string;
  name: string;
  kraPin: string;
  kycStatus: 'verified' | 'pending' | 'restricted';
  creditScore: number;
  creditLimit: number;
  usedCredit: number;
  totalInvoices: number;
  totalFunded: number;
  joinDate: string;
  lastActivity: string;
};
const mockProviders: Provider[] = [{
  id: '1',
  name: 'Nairobi Medical Centre',
  kraPin: 'A001972400X',
  kycStatus: 'verified',
  creditScore: 78,
  creditLimit: 2500000,
  usedCredit: 875000,
  totalInvoices: 24,
  totalFunded: 4850000,
  joinDate: '2023-08-15',
  lastActivity: '2024-01-30'
}, {
  id: '2',
  name: 'Mombasa General Hospital',
  kraPin: 'P052130917F',
  kycStatus: 'verified',
  creditScore: 85,
  creditLimit: 5000000,
  usedCredit: 1200000,
  totalInvoices: 45,
  totalFunded: 12300000,
  joinDate: '2023-06-20',
  lastActivity: '2024-01-29'
}, {
  id: '3',
  name: 'Kisumu Healthcare Ltd',
  kraPin: 'A003456789B',
  kycStatus: 'pending',
  creditScore: 0,
  creditLimit: 0,
  usedCredit: 0,
  totalInvoices: 0,
  totalFunded: 0,
  joinDate: '2024-01-28',
  lastActivity: '2024-01-28'
}, {
  id: '4',
  name: 'Eldoret Medical Supplies',
  kraPin: 'P087654321C',
  kycStatus: 'restricted',
  creditScore: 45,
  creditLimit: 1000000,
  usedCredit: 950000,
  totalInvoices: 18,
  totalFunded: 2100000,
  joinDate: '2023-11-10',
  lastActivity: '2024-01-25'
}];
export function ProviderManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending' | 'restricted'>('all');
  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) || provider.kraPin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || provider.kycStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const columns = [{
    key: 'name',
    header: 'Provider',
    sortable: true,
    render: (provider: Provider) => <div>
          <p className="font-medium text-gray-900">{provider.name}</p>
          <p className="text-xs text-gray-500">KRA PIN: {provider.kraPin}</p>
          <p className="text-xs text-gray-500">
            Joined {new Date(provider.joinDate).toLocaleDateString('en-KE')}
          </p>
        </div>
  }, {
    key: 'kycStatus',
    header: 'KYC Status',
    render: (provider: Provider) => <div className="flex items-center gap-2">
          {provider.kycStatus === 'verified' && <>
              <ShieldCheckIcon className="w-4 h-4 text-success-600" />
              <span className="text-sm font-medium text-success-700">
                Verified
              </span>
            </>}
          {provider.kycStatus === 'pending' && <>
              <ShieldAlertIcon className="w-4 h-4 text-pending-600" />
              <span className="text-sm font-medium text-pending-700">
                Pending
              </span>
            </>}
          {provider.kycStatus === 'restricted' && <>
              <ShieldAlertIcon className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">
                Restricted
              </span>
            </>}
        </div>
  }, {
    key: 'creditScore',
    header: 'Credit Score',
    sortable: true,
    render: (provider: Provider) => <div>
          {provider.creditScore > 0 ? <>
              <p className="font-semibold text-gray-900 tabular-nums">
                {provider.creditScore}/100
              </p>
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                <div className="h-full bg-success-500" style={{
            width: `${provider.creditScore}%`
          }} />
              </div>
            </> : <span className="text-sm text-gray-400">Not assessed</span>}
        </div>
  }, {
    key: 'creditLimit',
    header: 'Credit Facility',
    render: (provider: Provider) => <div>
          {provider.creditLimit > 0 ? <>
              <p className="text-sm font-medium text-gray-900 tabular-nums">
                {formatKESCompact(provider.creditLimit)}
              </p>
              <p className="text-xs text-gray-500">
                Used: {formatKESCompact(provider.usedCredit)} (
                {(provider.usedCredit / provider.creditLimit * 100).toFixed(0)}
                %)
              </p>
            </> : <span className="text-sm text-gray-400">Not set</span>}
        </div>
  }, {
    key: 'activity',
    header: 'Activity',
    render: (provider: Provider) => <div>
          <p className="text-sm text-gray-900">
            {provider.totalInvoices} invoices
          </p>
          <p className="text-xs text-gray-500">
            Total funded: {formatKESCompact(provider.totalFunded)}
          </p>
        </div>
  }, {
    key: 'lastActivity',
    header: 'Last Active',
    sortable: true,
    render: (provider: Provider) => <span className="text-sm text-gray-600">
          {new Date(provider.lastActivity).toLocaleDateString('en-KE', {
        day: 'numeric',
        month: 'short'
      })}
        </span>
  }, {
    key: 'actions',
    header: 'Actions',
    render: (provider: Provider) => <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/providers/${provider.id}`)} icon={<EyeIcon className="w-4 h-4" />}>
            View
          </Button>
          {provider.kycStatus === 'verified' && <Button size="sm" variant="ghost" icon={<LockIcon className="w-4 h-4" />}>
              Restrict
            </Button>}
          {provider.kycStatus === 'restricted' && <Button size="sm" variant="secondary" icon={<UnlockIcon className="w-4 h-4" />}>
              Activate
            </Button>}
        </div>
  }];
  return <PageContainer title="Provider Management" subtitle="Manage healthcare providers, manufacturers, and exporters">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Providers</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {mockProviders.length}
            </p>
          </div>
        </Card>
        <Card className="border-success-200 bg-success-50">
          <div className="text-center">
            <p className="text-sm text-success-700">Verified</p>
            <p className="text-2xl font-bold text-success-900 mt-1">
              {mockProviders.filter(p => p.kycStatus === 'verified').length}
            </p>
          </div>
        </Card>
        <Card className="border-pending-200 bg-pending-50">
          <div className="text-center">
            <p className="text-sm text-pending-700">Pending KYC</p>
            <p className="text-2xl font-bold text-pending-900 mt-1">
              {mockProviders.filter(p => p.kycStatus === 'pending').length}
            </p>
          </div>
        </Card>
        <Card className="border-red-200 bg-red-50">
          <div className="text-center">
            <p className="text-sm text-red-700">Restricted</p>
            <p className="text-2xl font-bold text-red-900 mt-1">
              {mockProviders.filter(p => p.kycStatus === 'restricted').length}
            </p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input placeholder="Search by provider name or KRA PIN..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} icon={<SearchIcon className="w-4 h-4" />} />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'verified', 'pending', 'restricted'] as const).map(status => <button key={status} onClick={() => setStatusFilter(status)} className={`
                  px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${statusFilter === status ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}>
                  {status === 'all' ? 'All Providers' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>)}
          </div>
        </div>
      </Card>

      {/* Providers Table */}
      <DataTable data={filteredProviders} columns={columns} keyExtractor={provider => provider.id} pageSize={10} />
    </PageContainer>;
}