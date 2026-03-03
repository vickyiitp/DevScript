import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Rocket, Calendar, ArrowRight } from 'lucide-react';

export default function MarsTransferWindow() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [windows, setWindows] = useState<{ launch: string; arrival: string }[]>([]);

  // Rough approximation of Mars transfer windows (Hohmann transfer)
  // They occur roughly every 26 months (780 days).
  // Known recent window: July 2020. Next: Sep 2022, Nov 2024, Jan 2027, etc.
  const calculateWindows = () => {
    const baseDate = new Date('2020-07-15'); // Reference launch window
    const synodicPeriodDays = 780;
    
    const results = [];
    let currentDate = new Date(baseDate);

    // Find windows around the selected year
    while (currentDate.getFullYear() <= year + 10) {
      if (currentDate.getFullYear() >= year) {
        const arrivalDate = new Date(currentDate);
        arrivalDate.setDate(arrivalDate.getDate() + 259); // Approx 8.5 months travel time

        results.push({
          launch: currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          arrival: arrivalDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        });
      }
      currentDate.setDate(currentDate.getDate() + synodicPeriodDays);
    }

    setWindows(results.slice(0, 3)); // Show next 3 windows
    trackToolAction('mars-transfer-window', 'calculate', { year });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm space-y-6">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Starting Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 2026"
            />
          </div>
          <button
            onClick={calculateWindows}
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-medium hover:from-orange-500 hover:to-red-500 transition-colors shadow-[0_0_15px_rgba(234,88,12,0.4)]"
          >
            Find Windows
          </button>
        </div>
      </div>

      {windows.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white px-2">Upcoming Launch Windows</h3>
          <div className="grid gap-4">
            {windows.map((w, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="bg-[#121212] p-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-500/30 text-blue-400">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-400 font-medium">Launch (Earth)</div>
                    <div className="text-xl font-bold text-white">{w.launch}</div>
                  </div>
                </div>
                
                <ArrowRight className="text-zinc-600 hidden sm:block" size={32} />

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-sm text-zinc-400 font-medium">Arrival (Mars)</div>
                    <div className="text-xl font-bold text-white">{w.arrival}</div>
                  </div>
                  <div className="bg-[#121212] p-3 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.3)] border border-red-500/30">
                    <div className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-zinc-500 text-center mt-4">
            Note: These are approximate windows based on the 780-day synodic period of Earth and Mars. Actual mission planning requires complex orbital mechanics.
          </p>
        </div>
      )}
    </div>
  );
}
