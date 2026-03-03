import React, { useState, useEffect } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Leaf, Car, Zap, Plane, Flame } from 'lucide-react';

export default function CarbonFootprintCalculator() {
  const [electricity, setElectricity] = useState<number | ''>('');
  const [gas, setGas] = useState<number | ''>('');
  const [milesDriven, setMilesDriven] = useState<number | ''>('');
  const [flights, setFlights] = useState<number | ''>('');
  const [totalCarbon, setTotalCarbon] = useState<number | null>(null);

  const calculateFootprint = () => {
    // Basic estimation factors (kg CO2)
    // Electricity: ~0.4 kg per kWh
    // Natural Gas: ~2.0 kg per therm
    // Car: ~0.4 kg per mile
    // Flights: ~250 kg per short flight
    
    const e = Number(electricity) || 0;
    const g = Number(gas) || 0;
    const m = Number(milesDriven) || 0;
    const f = Number(flights) || 0;

    const total = (e * 0.4) + (g * 2.0) + (m * 0.4) + (f * 250);
    setTotalCarbon(total);
    trackToolAction('carbon-footprint', 'calculate');
  };

  useEffect(() => {
    calculateFootprint();
  }, [electricity, gas, milesDriven, flights]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm space-y-6">
        <h3 className="text-lg font-medium text-white mb-4">Monthly Usage Estimator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center">
              <Zap size={16} className="mr-2 text-yellow-500" /> Electricity (kWh)
            </label>
            <input
              type="number"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center">
              <Flame size={16} className="mr-2 text-orange-500" /> Natural Gas (Therms)
            </label>
            <input
              type="number"
              value={gas}
              onChange={(e) => setGas(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center">
              <Car size={16} className="mr-2 text-blue-500" /> Miles Driven
            </label>
            <input
              type="number"
              value={milesDriven}
              onChange={(e) => setMilesDriven(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2 flex items-center">
              <Plane size={16} className="mr-2 text-indigo-500" /> Flights Taken
            </label>
            <input
              type="number"
              value={flights}
              onChange={(e) => setFlights(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 1"
            />
          </div>
        </div>
      </div>

      {totalCarbon !== null && totalCarbon > 0 && (
        <div className="bg-emerald-500/10 rounded-2xl p-8 border border-emerald-500/20 text-center">
          <Leaf size={48} className="mx-auto text-emerald-400 mb-4" />
          <h3 className="text-lg font-medium text-emerald-300 mb-2">Estimated Monthly Carbon Footprint</h3>
          <div className="text-5xl font-extrabold text-emerald-400 mb-2 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            {totalCarbon.toFixed(0)} <span className="text-2xl font-medium text-emerald-300">kg CO₂</span>
          </div>
          <p className="text-emerald-500 mt-4 max-w-md mx-auto">
            This is a rough estimation based on average emission factors. Small changes in daily habits can significantly reduce this number.
          </p>
        </div>
      )}
    </div>
  );
}
