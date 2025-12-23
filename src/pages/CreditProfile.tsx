import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, InfoIcon, CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { CreditScoreGauge } from '../components/ui/CreditScoreGauge';
import { LineChart } from '../components/ui/LineChart';
import { formatKES, formatKESCompact } from '../utils/currency';
import { mockCreditProfile } from '../utils/mockData';
export function CreditProfile() {
  const {
    score,
    maxScore,
    creditLimit,
    usedCredit,
    factors,
    history
  } = mockCreditProfile;
  const availableCredit = creditLimit - usedCredit;
  const utilizationPercentage = usedCredit / creditLimit * 100;
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon className="w-4 h-4 text-success-600" />;
      case 'down':
        return <TrendingDownIcon className="w-4 h-4 text-red-600" />;
      default:
        return <MinusIcon className="w-4 h-4 text-gray-400" />;
    }
  };
  const tips = [{
    icon: <CheckCircleIcon className="w-5 h-5 text-success-600" />,
    title: 'Pay on time',
    description: 'Ensure insurers pay invoices by their due dates to maintain a strong payment history.'
  }, {
    icon: <TrendingUpIcon className="w-5 h-5 text-primary-600" />,
    title: 'Increase invoice volume',
    description: 'Process more invoices through MediFi to demonstrate consistent business activity.'
  }, {
    icon: <AlertCircleIcon className="w-5 h-5 text-pending-600" />,
    title: 'Avoid overutilization',
    description: 'Keep your credit utilization below 70% for optimal score impact.'
  }];
  return <PageContainer title="Credit Profile" subtitle="Monitor and improve your creditworthiness">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <CreditScoreGauge score={score} maxScore={maxScore} size="lg" />

                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Credit Limit
                  </h3>

                  {/* Credit Utilization Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        Used: {formatKES(usedCredit)}
                      </span>
                      <span className="text-gray-600">
                        Limit: {formatKES(creditLimit)}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${utilizationPercentage > 70 ? 'bg-pending-500' : 'bg-success-500'}`} style={{
                      width: `${utilizationPercentage}%`
                    }} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {utilizationPercentage.toFixed(1)}% utilized
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Available Credit</p>
                      <p className="text-xl font-bold text-success-600 tabular-nums">
                        {formatKESCompact(availableCredit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Limit</p>
                      <p className="text-xl font-bold text-gray-900 tabular-nums">
                        {formatKESCompact(creditLimit)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Score Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {factors.map(factor => <div key={factor.name} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {factor.name}
                          </span>
                          {getTrendIcon(factor.trend)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {factor.score}/{factor.maxScore}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{
                      width: `${factor.score / factor.maxScore * 100}%`
                    }} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {factor.description}
                      </p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          {/* Score History Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Score History</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart data={history} xKey="date" yKey="score" height={250} formatYAxis={value => value.toString()} formatTooltip={value => `Score: ${value}`} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Tips */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Improve Your Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tips.map((tip, index) => <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 mt-0.5">{tip.icon}</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {tip.description}
                      </p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-start gap-3">
                <InfoIcon className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    How is my score calculated?
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Your MediFi credit score is based on your payment history,
                    invoice volume, repayment rate, and account age. A higher
                    score unlocks better discount rates and higher credit
                    limits.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary-50 border-primary-200">
            <CardContent>
              <h4 className="font-semibold text-primary-900 mb-2">
                Unlock Premium Benefits
              </h4>
              <p className="text-sm text-primary-700 mb-4">
                Reach a score of 85+ to unlock:
              </p>
              <ul className="space-y-2 text-sm text-primary-700">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  Lower discount rates (up to 2% less)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  Higher credit limits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4" />
                  Priority processing
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>;
}