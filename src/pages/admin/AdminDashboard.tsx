import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangleIcon, ClockIcon, CheckCircle2Icon, XCircleIcon, UsersIcon, FileTextIcon, TrendingUpIcon, ActivityIcon, ShieldAlertIcon } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { KPICard } from '../../components/ui/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { DataTable } from '../../components/ui/DataTable';
import { DonutChart } from '../../components/ui/DonutChart';
import { LineChart } from '../../components/ui/LineChart';
import { formatKES, formatKESCompact } from '../../utils/currency';
import { mockInvoices, Invoice } from '../../utils/mockData';
export function AdminDashboard() {
  const navigate = useNavigate();
  // Admin-specific metrics
  const pendingApprovals = mockInvoices.filter(inv => inv.status === 'pending');
  const approvedToday = 12;
  const totalExposure = 45800000;
  const overdueAmount = 2340000;
  const riskDistribution = [{
    name: 'Low Risk',
    value: 65,
    color: '#00A86B'
  }, {
    name: 'Medium Risk',
    value: 28,
    color: '#FF8C42'
  }, {
    name: 'Elevated Risk',
    value: 7,
    color: '#DC2626'
  }];
  const approvalTrend = [{
    date: 'Mon',
    approved: 8,
    declined: 2
  }, {
    date: 'Tue',
    approved: 12,
    declined: 1
  }, {
    date: 'Wed',
    approved: 15,
    declined: 3
  }, {
    date: 'Thu',
    approved: 11,
    declined: 2
  }, {
    date: 'Fri',
    approved: 14,
    declined: 1
  }, {
    date: 'Sat',
    approved: 6,
    declined: 0
  }, {
    date: 'Sun',
    approved: 4,
    declined: 1
  }];
  const pendingColumns = [{
    key: 'invoiceNumber',
    header: 'Invoice',
    render: (invoice: Invoice) => <div>
          <span className="font-medium text-gray-900">
            {invoice.invoiceNumber}
          </span>
          <p className="text-xs text-gray-500 mt-0.5">
            Submitted {new Date(invoice.uploadDate).toLocaleDateString('en-KE')}
          </p>
        </div>
  }, {
    key: 'provider',
    header: 'Provider',
    render: (invoice: Invoice) => <div>
          <p className="text-sm font-medium text-gray-900">
            Nairobi Medical Centre
          </p>
          <p className="text-xs text-gray-500">KRA: A001972400X</p>
        </div>
  }, {
    key: 'counterparty',
    header: 'Counterparty',
    render: (invoice: Invoice) => <span className="text-sm text-gray-900">{invoice.insurerName}</span>
  }, {
    key: 'amount',
    header: 'Amount',
    render: (invoice: Invoice) => <span className="font-semibold text-gray-900 tabular-nums">
          {formatKES(invoice.amount)}
        </span>
  }, {
    key: 'riskScore',
    header: 'Risk',
    render: () => <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-success-500" style={{
          width: '75%'
        }} />
          </div>
          <span className="text-xs font-medium text-gray-600">75</span>
        </div>
  }, {
    key: 'actions',
    header: 'Actions',
    render: (invoice: Invoice) => <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/invoices/${invoice.id}`)}>
            Review
          </Button>
        </div>
  }];
  return <PageContainer title="Admin Dashboard" subtitle="Credit approval and platform oversight">
      {/* Alert Banner */}
      <Card className="mb-6 border-red-200 bg-red-50">
        <div className="flex items-start gap-3">
          <ShieldAlertIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-900">
              3 High-Priority Items Require Attention
            </h3>
            <p className="text-sm text-red-800 mt-1">
              2 invoices pending approval for over 24 hours • 1 overdue
              repayment flagged
            </p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => navigate('/admin/approvals')}>
            Review Now
          </Button>
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Pending Approvals" value={pendingApprovals.length} icon={<ClockIcon className="w-6 h-6" />} subtitle="awaiting review" />
        <KPICard title="Approved Today" value={approvedToday} icon={<CheckCircle2Icon className="w-6 h-6" />} trend={{
        value: 15,
        direction: 'up'
      }} subtitle="vs yesterday" />
        <KPICard title="Total Exposure" value={formatKESCompact(totalExposure)} icon={<TrendingUpIcon className="w-6 h-6" />} subtitle="active funding" />
        <KPICard title="Overdue Amount" value={formatKESCompact(overdueAmount)} icon={<AlertTriangleIcon className="w-6 h-6" />} subtitle="requires follow-up" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card padding="md" hoverable onClick={() => navigate('/admin/approvals')} className="group">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pending-100 flex items-center justify-center group-hover:bg-pending-200 transition-colors">
              <ClockIcon className="w-6 h-6 text-pending-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Review Queue</h3>
              <p className="text-sm text-gray-500">
                {pendingApprovals.length} pending
              </p>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable onClick={() => navigate('/admin/providers')} className="group">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <UsersIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Providers</h3>
              <p className="text-sm text-gray-500">Manage accounts</p>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable onClick={() => navigate('/admin/invoices')} className="group">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success-100 flex items-center justify-center group-hover:bg-success-200 transition-colors">
              <FileTextIcon className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">All Invoices</h3>
              <p className="text-sm text-gray-500">View history</p>
            </div>
          </div>
        </Card>

        <Card padding="md" hoverable onClick={() => navigate('/admin/reports')} className="group">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <ActivityIcon className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Reports</h3>
              <p className="text-sm text-gray-500">Analytics</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals Table */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <CardHeader className="px-6 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Credit Approvals</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Invoices awaiting credit team review
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin/approvals')}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <DataTable data={pendingApprovals.slice(0, 5)} columns={pendingColumns} keyExtractor={invoice => invoice.id} pageSize={5} />
            </CardContent>
          </Card>
        </div>

        {/* Risk Distribution */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Risk Distribution</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Active funded invoices
              </p>
            </CardHeader>
            <CardContent>
              <DonutChart data={riskDistribution} height={200} centerValue="24" centerLabel="Active" showLegend={true} />
            </CardContent>
          </Card>

          <Card className="border-pending-200 bg-pending-50">
            <CardContent>
              <div className="flex items-start gap-3">
                <AlertTriangleIcon className="w-5 h-5 text-pending-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Action Required
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    3 invoices require credit committee review before approval
                  </p>
                  <Button size="sm" variant="secondary" className="mt-3" onClick={() => navigate('/admin/committee')}>
                    Review Committee Queue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approval Activity Chart */}
      <Card className="mt-6">
        <CardHeader>
          <div>
            <CardTitle>Approval Activity (Last 7 Days)</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Daily approval and decline trends
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <LineChart data={approvalTrend} xKey="date" yKey="approved" height={250} formatYAxis={value => value.toString()} formatTooltip={value => `${value} invoices`} />
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="border-success-200 bg-success-50">
          <div className="flex items-center gap-3">
            <CheckCircle2Icon className="w-5 h-5 text-success-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                eTIMS Integration
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Operational • Last sync 2 min ago
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-success-200 bg-success-50">
          <div className="flex items-center gap-3">
            <CheckCircle2Icon className="w-5 h-5 text-success-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                M-Pesa Gateway
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Operational • 100% uptime
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-success-200 bg-success-50">
          <div className="flex items-center gap-3">
            <CheckCircle2Icon className="w-5 h-5 text-success-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Credit Scoring Engine
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Operational • All models active
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>;
}