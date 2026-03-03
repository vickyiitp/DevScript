import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Calendar } from 'lucide-react';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!dob || !targetDate) return;

    const birthDate = new Date(dob);
    const endDate = new Date(targetDate);

    if (birthDate > endDate) {
      setAge(null);
      return;
    }

    let years = endDate.getFullYear() - birthDate.getFullYear();
    let months = endDate.getMonth() - birthDate.getMonth();
    let days = endDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
    trackToolAction('age-calculator', 'calculate_age');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => { setDob(e.target.value); calculateAge(); }}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age at the Date of</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => { setTargetDate(e.target.value); calculateAge(); }}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        
        <button
          onClick={calculateAge}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Calculate Age
        </button>
      </div>

      {age && (
        <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100 text-center">
          <Calendar size={48} className="mx-auto text-indigo-600 mb-4" />
          <h3 className="text-lg font-medium text-indigo-900 mb-2">Your Age is</h3>
          <div className="text-5xl font-extrabold text-indigo-600 mb-4">
            {age.years} <span className="text-2xl font-medium text-indigo-800">years</span>
          </div>
          <div className="text-xl font-medium text-indigo-800">
            {age.months} months and {age.days} days
          </div>
        </div>
      )}
    </div>
  );
}
