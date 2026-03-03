import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { trackToolAction } from '../utils/analytics';

export default function GstCalculator() {
  const [amount, setAmount] = useState<number | ''>('');
  const [rate, setRate] = useState<number>(18);
  const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

  // Track when rate or type changes, or when amount loses focus
  const handleAmountBlur = () => {
    if (amount) {
      trackToolAction('gst-calculator', 'calculate_gst', { rate, type });
    }
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (amount) trackToolAction('gst-calculator', 'change_rate', { newRate });
  };

  const handleTypeChange = (newType: 'exclusive' | 'inclusive') => {
    setType(newType);
    if (amount) trackToolAction('gst-calculator', 'change_type', { newType });
  };

  const calculateGST = () => {
    if (!amount) return { gst: 0, total: 0, base: 0 };
    const numAmount = Number(amount);
    
    if (type === 'exclusive') {
      const gst = (numAmount * rate) / 100;
      return {
        base: numAmount,
        gst: gst,
        total: numAmount + gst
      };
    } else {
      const base = (numAmount * 100) / (100 + rate);
      const gst = numAmount - base;
      return {
        base: base,
        gst: gst,
        total: numAmount
      };
    }
  };

  const results = calculateGST();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                onBlur={handleAmountBlur}
                className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GST Rate (%)</label>
            <div className="flex gap-2 flex-wrap">
              {[5, 12, 18, 28].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRateChange(r)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    rate === r
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {r}%
                </button>
              ))}
              <input
                type="number"
                value={rate}
                onChange={(e) => handleRateChange(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Custom"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={type === 'exclusive'}
                  onChange={() => handleTypeChange('exclusive')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Exclusive (Add GST)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={type === 'inclusive'}
                  onChange={() => handleTypeChange('inclusive')}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Inclusive (Remove GST)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Calculator size={20} className="mr-2 text-indigo-600" /> Results
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-500">Net Amount</span>
              <span className="text-lg font-medium text-gray-900">${results.base.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-200">
              <span className="text-gray-500">GST Amount ({rate}%)</span>
              <span className="text-lg font-medium text-indigo-600">+ ${results.gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-gray-900 font-semibold text-lg">Total Amount</span>
              <span className="text-3xl font-bold text-gray-900">${results.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
