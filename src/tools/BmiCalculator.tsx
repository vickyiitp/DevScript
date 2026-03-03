import React, { useState, useEffect } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Activity } from 'lucide-react';

export default function BmiCalculator() {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = () => {
    if (!height || !weight) {
      setBmi(null);
      return;
    }

    let calculatedBmi = 0;
    if (unit === 'metric') {
      // height in cm, weight in kg
      const heightInMeters = Number(height) / 100;
      calculatedBmi = Number(weight) / (heightInMeters * heightInMeters);
    } else {
      // height in inches, weight in lbs
      calculatedBmi = (Number(weight) / (Number(height) * Number(height))) * 703;
    }

    setBmi(calculatedBmi);
    trackToolAction('bmi-calculator', 'calculate_bmi', { unit });
  };

  useEffect(() => {
    calculateBmi();
  }, [height, weight, unit]);

  const getBmiCategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (bmiValue >= 18.5 && bmiValue < 24.9) return { label: 'Normal weight', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (bmiValue >= 25 && bmiValue < 29.9) return { label: 'Overweight', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { label: 'Obesity', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => { setUnit('metric'); setHeight(''); setWeight(''); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === 'metric' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Metric (cm/kg)
            </button>
            <button
              onClick={() => { setUnit('imperial'); setHeight(''); setWeight(''); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${unit === 'imperial' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Imperial (in/lbs)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={unit === 'metric' ? 'e.g., 175' : 'e.g., 70'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 150'}
            />
          </div>
        </div>
      </div>

      {bmi !== null && (
        <div className={`rounded-2xl p-8 border text-center ${getBmiCategory(bmi).bg} ${getBmiCategory(bmi).border}`}>
          <Activity size={48} className={`mx-auto mb-4 ${getBmiCategory(bmi).color}`} />
          <h3 className={`text-lg font-medium mb-2 ${getBmiCategory(bmi).color}`}>Your BMI</h3>
          <div className={`text-5xl font-extrabold mb-4 ${getBmiCategory(bmi).color}`}>
            {bmi.toFixed(1)}
          </div>
          <div className={`inline-block px-6 py-3 rounded-xl font-medium bg-white shadow-sm ${getBmiCategory(bmi).color}`}>
            {getBmiCategory(bmi).label}
          </div>
        </div>
      )}
    </div>
  );
}
