import React, { useState } from 'react';
import { ArrowDownLeftIcon, ArrowUpRightIcon, FilterIcon, DownloadIcon, SearchIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { StatusBadge } from '../components/ui/StatusBadge';
import { formatKES } from '../utils/currency';
import { mockTransactions, Transaction } from '../utils/mockData';
type TransactionFilter = 'all' | 'funding_received' | 'repayment' | 'fee';
export function Transactions() {
  const [filter, setFilter] = useState<TransactionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredTransactions = mockTransactions.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.mpesaRef?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'funding_received':
        return <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center">
            <ArrowDownLeftIcon className="w-5 h-5 text-success-600" />
          </div>;
      case 'repayment':
        return <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <ArrowUpRightIcon className="w-5 h-5 text-primary-600" />
          </div>;
      case 'fee':
        return <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <ArrowUpRightIcon className="w-5 h-5 text-gray-600" />
          </div>;
      default:
        return <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <ArrowUpRightIcon className="w-5 h-5 text-gray-600" />
          </div>;
    }
  };
  const getTransactionLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'funding_received':
        return 'Funding Received';
      case 'repayment':
        return 'Repayment';
      case 'fee':
        return 'Platform Fee';
      default:
        return type;
    }
  };
  const totalInflow = mockTransactions.filter(t => t.type === 'funding_received' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = mockTransactions.filter(t => (t.type === 'repayment' || t.type === 'fee') && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  return <PageContainer title="Transactions" subtitle="View your funding and repayment history" actions={<Button variant="secondary" icon={<DownloadIcon className="w-4 h-4" />}>
          Export
        </Button>}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Total Received</p>
            <p className="text-2xl font-bold text-success-600 tabular-nums">
              {formatKES(totalInflow)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Total Repaid</p>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">
              {formatKES(totalOutflow)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-500 mb-1">Net Position</p>
            <p className={`text-2xl font-bold tabular-nums ${totalInflow - totalOutflow >= 0 ? 'text-success-600' : 'text-red-600'}`}>
              {formatKES(totalInflow - totalOutflow)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input placeholder="Search by description or M-Pesa ref..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} icon={<SearchIcon className="w-4 h-4" />} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'funding_received', 'repayment', 'fee'] as const).map(f => <button key={f} onClick={() => setFilter(f)} className={`
                  px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${filter === f ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                `}>
                  {f === 'all' ? 'All' : getTransactionLabel(f)}
                </button>)}
          </div>
        </div>
      </Card>

      {/* Transaction List */}
      <Card padding="none">
        <div className="divide-y divide-gray-100">
          {filteredTransactions.length === 0 ? <div className="px-6 py-12 text-center">
              <p className="text-gray-500">No transactions found</p>
            </div> : filteredTransactions.map(transaction => <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  {getTransactionIcon(transaction.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900">
                        {getTransactionLabel(transaction.type)}
                      </p>
                      <StatusBadge status={transaction.status} size="sm" />
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>
                        {new Date(transaction.date).toLocaleDateString('en-KE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                      </span>
                      {transaction.mpesaRef && <>
                          <span>•</span>
                          <span className="font-mono">
                            {transaction.mpesaRef}
                          </span>
                        </>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold tabular-nums ${transaction.type === 'funding_received' ? 'text-success-600' : 'text-gray-900'}`}>
                      {transaction.type === 'funding_received' ? '+' : '-'}
                      {formatKES(transaction.amount)}
                    </p>
                  </div>
                </div>
              </div>)}
        </div>
      </Card>
    </PageContainer>;
}