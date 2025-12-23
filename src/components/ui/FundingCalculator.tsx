import React, { useEffect, useState } from 'react';
import { formatKES } from '../../utils/currency';
type FundingCalculatorProps = {
  invoiceAmount: number;
  baseDiscountRate: number;
  creditScore: number;
  onCalculate?: (result: CalculationResult) => void;
  className?: string;
};
type CalculationResult = {
  fundingPercentage: number;
  discountRate: number;
  fundingAmount: number;
  discountAmount: number;
  netAmount: number;
  platformFee: number;
};
export function FundingCalculator({
  invoiceAmount,
  baseDiscountRate,
  creditScore,
  onCalculate,
  className = ''
}: FundingCalculatorProps) {
  const [fundingPercentage, setFundingPercentage] = useState(80);
  const calculateDiscount = (): CalculationResult => {
    // Adjust discount rate based on credit score
    const scoreAdjustment = (creditScore - 50) / 50 * 2; // -2% to +2% based on score
    const adjustedRate = Math.max(5, baseDiscountRate - scoreAdjustment);
    const fundingAmount = invoiceAmount * fundingPercentage / 100;
    const discountAmount = fundingAmount * adjustedRate / 100;
    const platformFee = fundingAmount * 0.015; // 1.5% platform fee
    const netAmount = fundingAmount - discountAmount - platformFee;
    return {
      fundingPercentage,
      discountRate: adjustedRate,
      fundingAmount,
      discountAmount,
      netAmount,
      platformFee
    };
  };
  const result = calculateDiscount();
  useEffect(() => {
    onCalculate?.(result);
  }, [fundingPercentage, invoiceAmount, baseDiscountRate, creditScore]);
  return <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Funding Calculator
      </h3>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium text-gray-700">
            Funding Amount
          </label>
          <span className="text-sm font-semibold text-primary-600">
            {fundingPercentage}% of invoice
          </span>
        </div>
        <input type="range" min={70} max={90} value={fundingPercentage} onChange={e => setFundingPercentage(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>70%</span>
          <span>90%</span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Invoice Amount</span>
          <span className="font-medium text-gray-900">
            {formatKES(invoiceAmount)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Funding Amount ({fundingPercentage}%)
          </span>
          <span className="font-medium text-gray-900">
            {formatKES(result.fundingAmount)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount Rate</span>
          <span className="font-medium text-pending-600">
            {result.discountRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount Amount</span>
          <span className="font-medium text-gray-900">
            -{formatKES(result.discountAmount)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Platform Fee (1.5%)</span>
          <span className="font-medium text-gray-900">
            -{formatKES(result.platformFee)}
          </span>
        </div>
        <div className="flex justify-between text-base pt-3 border-t border-gray-100">
          <span className="font-semibold text-gray-900">You Receive</span>
          <span className="font-bold text-success-600">
            {formatKES(result.netAmount)}
          </span>
        </div>
      </div>

      {/* Credit Score Impact */}
      <div className="mt-4 p-3 bg-primary-50 rounded-lg">
        <p className="text-xs text-primary-700">
          <span className="font-medium">
            Your credit score ({creditScore}/100)
          </span>{' '}
          qualifies you for a {result.discountRate.toFixed(1)}% discount rate.
          Improve your score to access better rates.
        </p>
      </div>
    </div>;
}