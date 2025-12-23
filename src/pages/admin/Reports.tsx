import React, { useState } from 'react';
import { DownloadIcon, CalendarIcon, TrendingUpIcon, TrendingDownIcon, FileTextIcon, UsersIcon, DollarSignIcon, AlertTriangleIcon, CheckCircle2Icon, BarChart3Icon } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LineChart } from '../../components/ui/LineChart';
import { DonutChart } from '../../components/ui/DonutChart';
import { DataTable } from '../../components/ui/DataTable';
import { formatKES, formatKESCompact } from '../../utils/currency';
type ReportPeriod = 'week' | 'month' | 'quarter' | 'year';
type ReportType = 'overview' | 'credit' | 'portfolio' | 'compliance';
export function Reports() {
  const [period, setPeriod] = useState<ReportPeriod>('month');
  const [reportType, setReportType] = useState<ReportType>('overview');
  // Mock data for reports
  const fundingTrend = [{
    date: 'Week 1',
    funded: 4200000,
    declined: 850000
  }, {
    date: 'Week 2',
    funded: 5800000,
    declined: 1200000
  }, {
    date: 'Week 3',
    funded: 6500000,
    declined: 950000
  }, {
    date: 'Week 4',
    funded: 7200000,
    declined: 1100000
  }];
  const providerPerformance = [{
    name: 'Excellent (90+)',
    value: 12,
    color: '#00A86B'
  }, {
    name: 'Good (70-89)',
    value: 28,
    color: '#0066CC'
  }, {
    name: 'Fair (50-69)',
    value: 15,
    color: '#FF8C42'
  }, {
    name: 'Poor (Below 50)',
    value: 5,
    color: '#DC2626'
  }];
  const sectorDistribution = [{
    name: 'Healthcare',
    value: 45,
    color: '#0066CC'
  }, {
    name: 'Manufacturing',
    value: 30,
    color: '#00A86B'
  }, {
    name: 'Export',
    value: 15,
    color: '#FF8C42'
  }, {
    name: 'Other',
    value: 10,
    color: '#9CA3AF'
  }];
  const topProviders = [{
    id: '1',
    name: 'Nairobi Medical Centre',
    totalFunded: 12500000,
    invoiceCount: 45,
    avgApprovalTime: '18h',
    defaultRate: 0
  }, {
    id: '2',
    name: 'Mombasa General Hospital',
    totalFunded: 8900000,
    invoiceCount: 32,
    avgApprovalTime: '22h',
    defaultRate: 0
  }, {
    id: '3',
    name: 'Kenya Pharma Ltd',
    totalFunded: 6700000,
    invoiceCount: 28,
    avgApprovalTime: '16h',
    defaultRate: 2.1
  }, {
    id: '4',
    name: 'Kisumu Healthcare',
    totalFunded: 5400000,
    invoiceCount: 24,
    avgApprovalTime: '20h',
    defaultRate: 0
  }, {
    id: '5',
    name: 'Eldoret Medical Supplies',
    totalFunded: 4200000,
    invoiceCount: 19,
    avgApprovalTime: '24h',
    defaultRate: 5.3
  }];
  const providerColumns = [{
    key: 'name',
    header: 'Provider',
    sortable: true,
    render: (provider: (typeof topProviders)[0]) => <span className="font-medium text-gray-900">{provider.name}</span>
  }, {
    key: 'totalFunded',
    header: 'Total Funded',
    sortable: true,
    render: (provider: (typeof topProviders)[0]) => <span className="font-semibold text-gray-900 tabular-nums">
          {formatKES(provider.totalFunded)}
        </span>
  }, {
    key: 'invoiceCount',
    header: 'Invoices',
    sortable: true,
    render: (provider: (typeof topProviders)[0]) => <span className="text-gray-900 tabular-nums">
          {provider.invoiceCount}
        </span>
  }, {
    key: 'avgApprovalTime',
    header: 'Avg Approval',
    render: (provider: (typeof topProviders)[0]) => <span className="text-gray-600">{provider.avgApprovalTime}</span>
  }, {
    key: 'defaultRate',
    header: 'Default Rate',
    sortable: true,
    render: (provider: (typeof topProviders)[0]) => <span className={`font-medium tabular-nums ${provider.defaultRate === 0 ? 'text-success-600' : provider.defaultRate < 3 ? 'text-pending-600' : 'text-red-600'}`}>
          {provider.defaultRate.toFixed(1)}%
        </span>
  }];
  const handleExportReport = () => {
    // In production, this would generate and download a PDF/Excel report
    console.log('Exporting report...', {
      period,
      reportType
    });
  };
  return <PageContainer title="Reports & Analytics" subtitle="Platform performance, compliance reporting, and business intelligence" actions={<Button onClick={handleExportReport} icon={<DownloadIcon className="w-4 h-4" />}>
          Export Report
        </Button>}>
      {/* Period and Report Type Selectors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reporting Period
            </label>
            <div className="flex gap-2">
              {(['week', 'month', 'quarter', 'year'] as const).map(p => <button key={p} onClick={() => setPeriod(p)} className={`
                    flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${period === p ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>)}
            </div>
          </div>
        </Card>

        <Card>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['overview', 'credit', 'portfolio', 'compliance'] as const).map(type => <button key={type} onClick={() => setReportType(type)} className={`
                    px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${reportType === type ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>)}
            </div>
          </div>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Funded</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">
                {formatKESCompact(45800000)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="w-4 h-4 text-success-600" />
                <span className="text-sm font-medium text-success-600">
                  +18.2%
                </span>
                <span className="text-sm text-gray-500">vs last {period}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success-100 flex items-center justify-center">
              <DollarSignIcon className="w-5 h-5 text-success-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Approval Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">
                87.3%
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="w-4 h-4 text-success-600" />
                <span className="text-sm font-medium text-success-600">
                  +3.1%
                </span>
                <span className="text-sm text-gray-500">vs last {period}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <CheckCircle2Icon className="w-5 h-5 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Providers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">
                60
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="w-4 h-4 text-success-600" />
                <span className="text-sm font-medium text-success-600">+5</span>
                <span className="text-sm text-gray-500">new this {period}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-pending-100 flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-pending-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500">Default Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 tabular-nums">
                1.8%
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDownIcon className="w-4 h-4 text-success-600" />
                <span className="text-sm font-medium text-success-600">
                  -0.4%
                </span>
                <span className="text-sm text-gray-500">vs last {period}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangleIcon className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Funding Trend */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Funding Activity Trend</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Weekly funded vs declined amounts
              </p>
            </CardHeader>
            <CardContent>
              <LineChart data={fundingTrend} xKey="date" yKey="funded" height={280} formatYAxis={value => formatKESCompact(value)} formatTooltip={value => formatKES(value)} />
            </CardContent>
          </Card>
        </div>

        {/* Provider Performance Distribution */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Provider Credit Scores</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Score distribution</p>
            </CardHeader>
            <CardContent>
              <DonutChart data={providerPerformance} height={240} centerValue="60" centerLabel="Providers" showLegend={true} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sector Distribution and Top Providers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sector Distribution */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sector Distribution</CardTitle>
              <p className="text-sm text-gray-500 mt-1">By funded amount</p>
            </CardHeader>
            <CardContent>
              <DonutChart data={sectorDistribution} height={240} centerValue={formatKESCompact(45800000)} centerLabel="Total" showLegend={true} />
            </CardContent>
          </Card>
        </div>

        {/* Top Providers Table */}
        <div className="lg:col-span-2">
          <Card padding="none">
            <CardHeader className="px-6 pt-6">
              <CardTitle>Top Providers by Volume</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Highest funded providers this {period}
              </p>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <DataTable data={topProviders} columns={providerColumns} keyExtractor={provider => provider.id} pageSize={5} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Compliance & Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-success-200 bg-success-50">
          <div className="flex items-start gap-3">
            <CheckCircle2Icon className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                KYC Compliance
              </p>
              <p className="text-2xl font-bold text-success-900 mt-1">98.3%</p>
              <p className="text-xs text-success-700 mt-1">
                59 of 60 providers fully verified
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-primary-200 bg-primary-50">
          <div className="flex items-start gap-3">
            <FileTextIcon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                eTIMS Verification
              </p>
              <p className="text-2xl font-bold text-primary-900 mt-1">100%</p>
              <p className="text-xs text-primary-700 mt-1">
                All invoices KRA-verified
              </p>
            </div>
          </div>
        </Card>

        <Card className="border-pending-200 bg-pending-50">
          <div className="flex items-start gap-3">
            <BarChart3Icon className="w-5 h-5 text-pending-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Avg Processing Time
              </p>
              <p className="text-2xl font-bold text-pending-900 mt-1">19.4h</p>
              <p className="text-xs text-pending-700 mt-1">
                From submission to disbursement
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Regulatory Disclosure */}
      <Card className="bg-gray-50 border-gray-300">
        <div className="flex items-start gap-3">
          <AlertTriangleIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              Regulatory Reporting
            </p>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              All reports are generated in compliance with CBK guidelines and
              CMA regulations. Data is auditable and maintained for regulatory
              inspection. Export functionality generates timestamped reports
              suitable for submission to regulatory authorities.
            </p>
          </div>
        </div>
      </Card>
    </PageContainer>;
}