import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { trackToolAction } from '../utils/analytics';

export default function EmiCalculator() {
  const [principal, setPrincipal] = useState<number | ''>(100000);
  const [rate, setRate] = useState<number | ''>(10.5);
  const [tenure, setTenure] = useState<number | ''>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

  const handleBlur = () => {
    if (principal && rate && tenure) {
      trackToolAction('emi-calculator', 'calculate_emi', { tenureType });
    }
  };

  const calculateEMI = () => {
    if (!principal || !rate || !tenure) return { emi: 0, totalInterest: 0, totalPayment: 0 };
    
    const p = Number(principal);
    const r = Number(rate) / 12 / 100;
    const n = tenureType === 'years' ? Number(tenure) * 12 : Number(tenure);
    
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    
    return {
      emi,
      totalInterest,
      totalPayment
    };
  };

  const results = calculateEMI();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value ? Number(e.target.value) : '')}
                onBlur={handleBlur}
                className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
            <input
              type="number"
              value={rate}
              step="0.1"
              onChange={(e) => setRate(e.target.value ? Number(e.target.value) : '')}
              onBlur={handleBlur}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure</label>
            <div className="flex gap-4">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value ? Number(e.target.value) : '')}
                onBlur={handleBlur}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <select
                value={tenureType}
                onChange={(e) => {
                  setTenureType(e.target.value as 'years' | 'months');
                  if (principal && rate && tenure) {
                    trackToolAction('emi-calculator', 'change_tenure_type', { type: e.target.value });
                  }
                }}
                className="block w-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Calculator size={20} className="mr-2 text-indigo-600" /> EMI Details
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-gray-900 font-semibold text-lg">Monthly EMI</span>
              <span className="text-3xl font-bold text-indigo-600">${results.emi.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-500">Principal Amount</span>
              <span className="text-lg font-medium text-gray-900">${Number(principal || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-500">Total Interest</span>
              <span className="text-lg font-medium text-gray-900">${results.totalInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-500">Total Amount Payable</span>
              <span className="text-lg font-medium text-gray-900">${results.totalPayment.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
