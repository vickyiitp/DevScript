import React, { useState, useEffect } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Battery, Zap, Map } from 'lucide-react';

export default function EvRangeCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState<number | ''>('');
  const [efficiency, setEfficiency] = useState<number | ''>('');
  const [currentCharge, setCurrentCharge] = useState<number | ''>(100);
  const [range, setRange] = useState<number | null>(null);

  const calculateRange = () => {
    if (!batteryCapacity || !efficiency || !currentCharge) {
      setRange(null);
      return;
    }

    const capacity = Number(batteryCapacity);
    const eff = Number(efficiency);
    const charge = Number(currentCharge) / 100;

    // Efficiency is usually Wh/mi or kWh/100mi. Let's assume miles/kWh for simplicity here.
    // If user enters miles/kWh (e.g., 3.5)
    // Range = Capacity (kWh) * Efficiency (mi/kWh) * Charge %
    
    const calculatedRange = capacity * eff * charge;
    setRange(calculatedRange);
    trackToolAction('ev-range-calculator', 'calculate');
  };

  useEffect(() => {
    calculateRange();
  }, [batteryCapacity, efficiency, currentCharge]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Battery Capacity (kWh)</label>
            <input
              type="number"
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 75 (Tesla Model 3 LR)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Efficiency (miles/kWh)</label>
            <input
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 3.5"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Current Charge Level (%)</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="100"
                value={currentCharge}
                onChange={(e) => setCurrentCharge(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-zinc-300 font-medium w-12 text-right">{currentCharge}%</span>
            </div>
          </div>
        </div>
      </div>

      {range !== null && range > 0 && (
        <div className="bg-blue-500/10 rounded-2xl p-8 border border-blue-500/20 text-center relative overflow-hidden">
          <Map size={48} className="mx-auto text-blue-400 mb-4" />
          <h3 className="text-lg font-medium text-blue-300 mb-2">Estimated Range</h3>
          <div className="text-5xl font-extrabold text-blue-400 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            {range.toFixed(1)} <span className="text-2xl font-medium text-blue-300">miles</span>
          </div>
          <div className="mt-4 flex justify-center items-center text-blue-400 text-sm">
            <Zap size={16} className="mr-1" />
            Based on current charge of {currentCharge}%
          </div>
        </div>
      )}
    </div>
  );
}
