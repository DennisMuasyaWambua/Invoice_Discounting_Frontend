import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileTextIcon, ClockIcon, CheckCircleIcon, WalletIcon, UploadIcon, FolderIcon, CreditCardIcon, ArrowRightIcon, TrendingUpIcon, AlertCircleIcon, ShieldCheckIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { KPICard } from '../components/ui/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DataTable } from '../components/ui/DataTable';
import { DonutChart } from '../components/ui/DonutChart';
import { LineChart } from '../components/ui/LineChart';
import { CreditScoreGauge } from '../components/ui/CreditScoreGauge';
import { formatKES, formatKESCompact } from '../utils/currency';
import { mockFundingHistory, mockCreditProfile, Invoice } from '../utils/mockData';
import { dashboardService } from '../services/dashboardService';
import { invoiceService } from '../services/invoiceService';
export function Dashboard() {
  const navigate = useNavigate();
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [stats, invoices] = await Promise.all([
          dashboardService.getDashboardStats(),
          dashboardService.getRecentInvoices()
        ]);
        
        setDashboardStats(stats);
        setRecentInvoices(invoices);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const invoiceStatusData = [{
    name: 'Under Review',
    value: 3,
    color: '#FF8C42'
  }, {
    name: 'Approved',
    value: 5,
    color: '#0066CC'
  }, {
    name: 'Funded',
    value: 12,
    color: '#00A86B'
  }, {
    name: 'Repaid',
    value: 4,
    color: '#9CA3AF'
  }];
  if (isLoading) {
    return (
      <PageContainer title="Dashboard" subtitle="Loading dashboard data...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Dashboard" subtitle="Dashboard overview">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </PageContainer>
    );
  }
  const invoiceColumns = [{
    key: 'invoiceNumber',
    header: 'Invoice Reference',
    render: (invoice: Invoice) => <div>
          <span className="font-medium text-gray-900">
            {invoice.invoiceNumber}
          </span>
          <p className="text-xs text-gray-500 mt-0.5">
            {invoice.serviceDescription}
          </p>
        </div>
  }, {
    key: 'insurerName',
    header: 'Counterparty',
    className: 'hidden sm:table-cell'
  }, {
    key: 'amount',
    header: 'Invoice Value',
    render: (invoice: Invoice) => <span className="tabular-nums font-medium">
          {formatKES(invoice.amount)}
        </span>
  }, {
    key: 'status',
    header: 'Status',
    render: (invoice: Invoice) => <StatusBadge status={invoice.status} size="sm" />
  }, {
    key: 'uploadDate',
    header: 'Submitted',
    className: 'hidden md:table-cell',
    render: (invoice: Invoice) => <span className="text-gray-500 text-sm">
          {new Date(invoice.uploadDate).toLocaleDateString('en-KE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })}
        </span>
  }];
  const utilizationPercentage = mockCreditProfile.usedCredit / mockCreditProfile.creditLimit * 100;
  return <PageContainer title="Dashboard" subtitle="Receivables financing overview and account status" actions={<Button onClick={() => navigate('/invoices/upload')} icon={<UploadIcon className="w-4 h-4" />}>
          Submit Invoice
        </Button>}>
      {/* Compliance & Status Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="border-success-200 bg-success-50/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon className="w-5 h-5 text-success-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                KYC Status
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Verified • Credit approval enabled
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Last verified:{' '}
                {new Date().toLocaleDateString('en-KE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-success-200 bg-success-50/50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center flex-shrink-0">
              <CheckCircleIcon className="w-5 h-5 text-success-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                eTIMS Integration
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Connected • Invoice validation active
              </p>
              <p className="text-xs text-gray-500 mt-1">KRA PIN: A001972400X</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Credit Profile Section */}
      <Card className="mb-6 border-gray-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Internal Credit Assessment</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Proprietary scoring based on repayment history and counterparty
                quality
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <CreditScoreGauge score={mockDashboardStats.creditScore} size="lg" />
            </div>

            <div className="flex-1 w-full">
              {/* Credit Limit Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">
                    Credit Facility Utilization
                  </span>
                  <span className="font-semibold text-gray-900 tabular-nums">
                    {formatKESCompact(mockCreditProfile.usedCredit)} /{' '}
                    {formatKESCompact(mockCreditProfile.creditLimit)}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${utilizationPercentage > 70 ? 'bg-pending-500' : 'bg-success-500'}`} style={{
                  width: `${utilizationPercentage}%`
                }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1.5">
                  <span>{utilizationPercentage.toFixed(1)}% utilized</span>
                  <span>
                    {formatKESCompact(mockCreditProfile.creditLimit - mockCreditProfile.usedCredit)}{' '}
                    available
                  </span>
                </div>
              </div>

              {/* Credit Factors */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {mockCreditProfile.factors.slice(0, 4).map(factor => <div key={factor.name} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">{factor.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-gray-900 tabular-nums">
                        {factor.score}
                      </p>
                      <span className="text-xs text-gray-400">
                        / {factor.maxScore}
                      </span>
                      {factor.trend === 'up' && <TrendingUpIcon className="w-3 h-3 text-success-600" />}
                    </div>
                  </div>)}
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Note:</span> Credit scoring is
                  for internal risk assessment only. Not a CRB score. All
                  funding decisions subject to credit committee approval.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Invoices Submitted" value={mockDashboardStats.totalInvoices} icon={<FileTextIcon className="w-6 h-6" />} trend={{
        value: 12,
        direction: 'up'
      }} subtitle="this month" />
        <KPICard title="Under Credit Review" value={mockDashboardStats.pendingApprovals} icon={<ClockIcon className="w-6 h-6" />} subtitle={`Avg. ${mockDashboardStats.averageApprovalTime}`} />
        <KPICard title="Approved for Funding" value={formatKESCompact(mockDashboardStats.approvedFunding)} icon={<CheckCircleIcon className="w-6 h-6" />} trend={{
        value: 8,
        direction: 'up'
      }} subtitle="awaiting acceptance" />
        <KPICard title="Total Funding Received" value={formatKESCompact(mockDashboardStats.totalLiquidityAccessed)} icon={<WalletIcon className="w-6 h-6" />} trend={{
        value: 15,
        direction: 'up'
      }} subtitle="lifetime" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card padding="md" hoverable onClick={() => navigate('/invoices/upload')} className="group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <UploadIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Submit Invoice</h3>
              <p className="text-sm text-gray-500">Upload eTIMS invoice</p>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
          </div>
        </Card>

        <Card padding="md" hoverable onClick={() => navigate('/invoices')} className="group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success-100 flex items-center justify-center group-hover:bg-success-200 transition-colors">
              <FolderIcon className="w-6 h-6 text-success-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">View Invoices</h3>
              <p className="text-sm text-gray-500">Manage submissions</p>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-success-500 transition-colors" />
          </div>
        </Card>

        <Card padding="md" hoverable onClick={() => navigate('/funding')} className="group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pending-100 flex items-center justify-center group-hover:bg-pending-200 transition-colors">
              <CreditCardIcon className="w-6 h-6 text-pending-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Accept Funding</h3>
              <p className="text-sm text-gray-500">Review offers</p>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-pending-500 transition-colors" />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Invoices */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <CardHeader className="px-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Submissions</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Latest invoice submissions and status
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/invoices')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <DataTable data={recentInvoices} columns={invoiceColumns} keyExtractor={invoice => invoice.id} onRowClick={invoice => navigate(`/invoices/${invoice.id}`)} pageSize={5} />
            </CardContent>
          </Card>
        </div>

        {/* Invoice Status Breakdown */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Invoice Pipeline</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Status distribution</p>
            </CardHeader>
            <CardContent>
              <DonutChart data={invoiceStatusData} height={220} centerValue={mockDashboardStats.totalInvoices} centerLabel="Total" showLegend={true} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Funding History Chart */}
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Funding History</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Monthly funding disbursements over the past 6 months
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <LineChart data={mockFundingHistory} xKey="month" yKey="amount" height={250} formatYAxis={value => formatKESCompact(value)} formatTooltip={value => formatKES(value)} />
        </CardContent>
      </Card>

      {/* Compliance Footer */}
      <Card className="mt-6 bg-gray-50 border-gray-300">
        <div className="flex items-start gap-3">
          <AlertCircleIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              Regulatory Disclosure
            </p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              All funding is advanced against verified receivables and subject
              to internal credit approval. Receivable participation is
              represented via tokenization for operational efficiency only. This
              is not a securities offering, public trading platform, or
              investment product. Nexus Protocol operates as a regulated
              receivables financing facility in compliance with CBK guidelines.
            </p>
          </div>
        </div>
      </Card>
    </PageContainer>;
}