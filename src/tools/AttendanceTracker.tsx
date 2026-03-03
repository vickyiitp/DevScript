import React, { useState, useEffect } from 'react';
import { CheckSquare, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { trackToolAction } from '../utils/analytics';

export default function AttendanceTracker() {
  const [attended, setAttended] = useState<number | ''>('');
  const [total, setTotal] = useState<number | ''>('');
  const [target, setTarget] = useState<number>(75);

  const calculateAttendance = () => {
    if (attended === '' || total === '' || total === 0) return { current: 0, status: 'neutral', message: '' };
    
    const a = Number(attended);
    const t = Number(total);
    const current = (a / t) * 100;
    
    let status = 'neutral';
    let message = '';
    
    if (current >= target) {
      status = 'safe';
      // Calculate how many classes they can bunk
      let bunks = 0;
      while (((a) / (t + bunks + 1)) * 100 >= target) {
        bunks++;
      }
      message = `You can safely miss ${bunks} more class${bunks !== 1 ? 'es' : ''} and stay above ${target}%.`;
    } else {
      status = 'danger';
      // Calculate how many classes they need to attend consecutively
      let needed = 0;
      while (((a + needed) / (t + needed)) * 100 < target) {
        needed++;
      }
      message = `You need to attend ${needed} more class${needed !== 1 ? 'es' : ''} consecutively to reach ${target}%.`;
    }
    
    return { current, status, message };
  };

  const { current, status, message } = calculateAttendance();

  const handleBlur = () => {
    if (attended !== '' && total !== '') {
      trackToolAction('attendance-tracker', 'calculate_attendance', { attended, total, target });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Classes Attended</label>
            <input
              type="number"
              value={attended}
              min="0"
              onChange={(e) => setAttended(e.target.value ? Number(e.target.value) : '')}
              onBlur={handleBlur}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Classes Held</label>
            <input
              type="number"
              value={total}
              min="1"
              onChange={(e) => setTotal(e.target.value ? Number(e.target.value) : '')}
              onBlur={handleBlur}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 45"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Attendance (%)</label>
          <div className="flex gap-2 flex-wrap">
            {[60, 75, 80, 85].map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  target === t
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t}%
              </button>
            ))}
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Custom"
            />
          </div>
        </div>
      </div>

      {attended !== '' && total !== '' && Number(total) > 0 && Number(attended) <= Number(total) && (
        <div className={`rounded-2xl p-8 border text-center ${
          status === 'safe' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'
        }`}>
          {status === 'safe' ? (
            <CheckCircle size={48} className="mx-auto text-emerald-600 mb-4" />
          ) : (
            <AlertTriangle size={48} className="mx-auto text-red-600 mb-4" />
          )}
          
          <h3 className={`text-lg font-medium mb-2 ${status === 'safe' ? 'text-emerald-900' : 'text-red-900'}`}>
            Current Attendance
          </h3>
          <div className={`text-5xl font-extrabold mb-4 ${status === 'safe' ? 'text-emerald-600' : 'text-red-600'}`}>
            {current.toFixed(2)}%
          </div>
          
          <div className={`inline-block px-6 py-3 rounded-xl font-medium ${
            status === 'safe' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        </div>
      )}

      {Number(attended) > Number(total) && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm flex items-center">
          <AlertTriangle size={18} className="mr-2" />
          Attended classes cannot be greater than total classes held.
        </div>
      )}
    </div>
  );
}
