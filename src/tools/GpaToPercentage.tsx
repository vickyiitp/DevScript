import React, { useState } from 'react';
import { GraduationCap, Calculator } from 'lucide-react';
import { trackToolAction } from '../utils/analytics';

export default function GpaToPercentage() {
  const [gpa, setGpa] = useState<number | ''>('');
  const [scale, setScale] = useState<number>(10);
  const [formula, setFormula] = useState<'standard' | 'mumbai' | 'aktu'>('standard');

  const calculatePercentage = () => {
    if (!gpa) return 0;
    const numGpa = Number(gpa);
    
    if (formula === 'standard') {
      // Standard formula: (CGPA * 10) or sometimes (CGPA * 9.5)
      // IIT/NIT standard is usually just * 10 or sometimes (CGPA - 0.5) * 10
      // We'll use the most common: CGPA * 9.5 for 10 point scale CBSE/Standard
      return scale === 10 ? numGpa * 9.5 : (numGpa / scale) * 100;
    } else if (formula === 'mumbai') {
      // Mumbai University: 7.1 * CGPA + 11
      return (7.1 * numGpa) + 11;
    } else if (formula === 'aktu') {
      // AKTU: (CGPA - 0.75) * 10
      return (numGpa - 0.75) * 10;
    }
    return 0;
  };

  const percentage = calculatePercentage();

  const handleCalculate = () => {
    trackToolAction('gpa-to-percentage', 'calculate_percentage', { gpa, scale, formula });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your GPA / CGPA</label>
          <input
            type="number"
            value={gpa}
            step="0.01"
            onChange={(e) => setGpa(e.target.value ? Number(e.target.value) : '')}
            onBlur={handleCalculate}
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., 8.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GPA Scale</label>
          <select
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
          >
            <option value={10}>10.0 Scale (Most Indian Universities)</option>
            <option value={4}>4.0 Scale (US/International)</option>
            <option value={5}>5.0 Scale</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Conversion Formula</label>
          <select
            value={formula}
            onChange={(e) => setFormula(e.target.value as any)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
          >
            <option value="standard">Standard (CGPA × 9.5 or direct %)</option>
            <option value="mumbai">Mumbai University (7.1 × CGPA + 11)</option>
            <option value="aktu">AKTU / UPTU ((CGPA - 0.75) × 10)</option>
          </select>
        </div>
      </div>

      {gpa !== '' && (
        <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 text-center">
          <GraduationCap size={48} className="mx-auto text-indigo-600 mb-4" />
          <h3 className="text-lg font-medium text-indigo-900 mb-2">Your Estimated Percentage</h3>
          <div className="text-5xl font-extrabold text-indigo-600">
            {Math.max(0, Math.min(100, percentage)).toFixed(2)}%
          </div>
          <p className="text-sm text-indigo-700 mt-4">
            *This is an estimate. Official conversion formulas may vary slightly by university and graduation year.
          </p>
        </div>
      )}
    </div>
  );
}
