import React, { useState } from 'react';
import { TrendingUpIcon, WalletIcon, PieChartIcon, ActivityIcon, ArrowRightIcon, InfoIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { KPICard } from '../components/ui/KPICard';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { DonutChart } from '../components/ui/DonutChart';
import { LineChart } from '../components/ui/LineChart';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { formatKES, formatKESCompact } from '../utils/currency';
import { mockInvestorStats, mockInvestmentOpportunities, InvestmentOpportunity } from '../utils/mockData';
export function InvestorDashboard() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<InvestmentOpportunity | null>(null);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);
  const availableOpportunities = mockInvestmentOpportunities.filter(o => o.status === 'available');
  const portfolioData = [{
    name: 'Low Risk',
    value: 45,
    color: '#00A86B'
  }, {
    name: 'Medium Risk',
    value: 35,
    color: '#FF8C42'
  }, {
    name: 'High Risk',
    value: 20,
    color: '#DC2626'
  }];
  const earningsHistory = [{
    month: 'Aug',
    earnings: 28000
  }, {
    month: 'Sep',
    earnings: 35000
  }, {
    month: 'Oct',
    earnings: 42000
  }, {
    month: 'Nov',
    earnings: 55000
  }, {
    month: 'Dec',
    earnings: 68000
  }, {
    month: 'Jan',
    earnings: 75000
  }];
  const handleInvest = async () => {
    setIsInvesting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsInvesting(false);
    setShowInvestModal(false);
    setSelectedOpportunity(null);
  };
  const getRiskColor = (risk: InvestmentOpportunity['riskRating']) => {
    switch (risk) {
      case 'low':
        return 'text-success-600 bg-success-50';
      case 'medium':
        return 'text-pending-600 bg-pending-50';
      case 'high':
        return 'text-red-600 bg-red-50';
    }
  };
  return <PageContainer title="Investor Dashboard" subtitle="Manage your healthcare invoice investments">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Deployed" value={formatKESCompact(mockInvestorStats.totalDeployed)} icon={<WalletIcon className="w-6 h-6" />} trend={{
        value: 12,
        direction: 'up'
      }} />
        <KPICard title="Total Returns" value={formatKESCompact(mockInvestorStats.totalReturns)} icon={<TrendingUpIcon className="w-6 h-6" />} trend={{
        value: 18,
        direction: 'up'
      }} />
        <KPICard title="Active Investments" value={mockInvestorStats.activeInvestments} icon={<ActivityIcon className="w-6 h-6" />} />
        <KPICard title="Average APY" value={`${mockInvestorStats.averageAPY}%`} icon={<PieChartIcon className="w-6 h-6" />} trend={{
        value: 2.5,
        direction: 'up'
      }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investment Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Available Opportunities</CardTitle>
                <span className="text-sm text-gray-500">
                  {availableOpportunities.length} available
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableOpportunities.map(opportunity => <div key={opportunity.id} className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer" onClick={() => {
                setSelectedOpportunity(opportunity);
                setShowInvestModal(true);
              }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {opportunity.anonymizedId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {opportunity.insurerType}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(opportunity.riskRating)}`}>
                        {opportunity.riskRating.charAt(0).toUpperCase() + opportunity.riskRating.slice(1)}{' '}
                        Risk
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Amount</p>
                        <p className="font-semibold text-gray-900 tabular-nums">
                          {formatKESCompact(opportunity.amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Discount</p>
                        <p className="font-semibold text-gray-900">
                          {opportunity.discountRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">APY</p>
                        <p className="font-semibold text-success-600">
                          {opportunity.expectedAPY}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Term</p>
                        <p className="font-semibold text-gray-900">
                          {opportunity.term} days
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                      <Button size="sm" icon={<ArrowRightIcon className="w-4 h-4" />} iconPosition="right">
                        Invest Now
                      </Button>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          {/* Earnings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings History</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart data={earningsHistory} xKey="month" yKey="earnings" height={250} color="#00A86B" formatYAxis={value => formatKESCompact(value)} formatTooltip={value => formatKES(value)} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Portfolio Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart data={portfolioData} height={220} centerValue={mockInvestorStats.activeInvestments} centerLabel="Investments" />
            </CardContent>
          </Card>

          {/* Risk Info */}
          <Card className="bg-primary-50 border-primary-200">
            <CardContent>
              <div className="flex items-start gap-3">
                <InfoIcon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary-900 mb-2">
                    Understanding Risk
                  </h4>
                  <div className="space-y-2 text-sm text-primary-700">
                    <p>
                      <span className="font-medium">Low Risk:</span> Tier 1
                      insurers, NHIF. Lower APY but highly reliable.
                    </p>
                    <p>
                      <span className="font-medium">Medium Risk:</span> Tier 2
                      insurers. Balanced risk-reward.
                    </p>
                    <p>
                      <span className="font-medium">High Risk:</span> Tier 3
                      insurers. Higher APY but longer payment cycles.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Returns */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-success-600 tabular-nums">
                  {formatKES(mockInvestorStats.pendingReturns)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Expected within 30 days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Investment Modal */}
      <ConfirmationModal isOpen={showInvestModal} onClose={() => {
      setShowInvestModal(false);
      setSelectedOpportunity(null);
    }} onConfirm={handleInvest} title="Confirm Investment" message={selectedOpportunity ? `You're investing ${formatKES(selectedOpportunity.amount)} in ${selectedOpportunity.anonymizedId} with an expected APY of ${selectedOpportunity.expectedAPY}%. The investment term is ${selectedOpportunity.term} days.` : ''} type="confirm" confirmText="Confirm Investment" loading={isInvesting} />
    </PageContainer>;
}