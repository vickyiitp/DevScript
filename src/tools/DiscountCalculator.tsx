import React, { useState, useEffect } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Percent } from 'lucide-react';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [discountPercent, setDiscountPercent] = useState<number | ''>('');
  const [result, setResult] = useState<{ saved: number; finalPrice: number } | null>(null);

  const calculateDiscount = () => {
    if (originalPrice === '' || discountPercent === '') {
      setResult(null);
      return;
    }

    const price = Number(originalPrice);
    const discount = Number(discountPercent);

    const saved = (price * discount) / 100;
    const finalPrice = price - saved;

    setResult({ saved, finalPrice });
    trackToolAction('discount-calculator', 'calculate_discount');
  };

  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountPercent]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : '')}
                className="block w-full pl-7 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage</label>
            <div className="relative">
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value ? Number(e.target.value) : '')}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., 20"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center">
          <Percent size={48} className="mx-auto text-emerald-600 mb-4" />
          <h3 className="text-lg font-medium text-emerald-900 mb-2">Final Price</h3>
          <div className="text-5xl font-extrabold text-emerald-600 mb-4">
            ${result.finalPrice.toFixed(2)}
          </div>
          <div className="text-lg font-medium text-emerald-800">
            You save: ${result.saved.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
