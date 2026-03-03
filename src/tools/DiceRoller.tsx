import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { motion } from 'motion/react';
import { Dices } from 'lucide-react';

export default function DiceRoller() {
  const [numDice, setNumDice] = useState(1);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setResults([]);
    trackToolAction('dice-roller', 'roll', { numDice, sides });

    setTimeout(() => {
      const newResults = Array.from({ length: numDice }, () => Math.floor(Math.random() * sides) + 1);
      setResults(newResults);
      setIsRolling(false);
    }, 600);
  };

  const total = results.reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col sm:flex-row items-end gap-6">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Number of Dice</label>
          <input
            type="number"
            min="1"
            max="20"
            value={numDice}
            onChange={(e) => setNumDice(Math.max(1, Math.min(20, Number(e.target.value))))}
            className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-lg bg-[#121212] text-white"
          />
        </div>
        
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Sides per Die</label>
          <select
            value={sides}
            onChange={(e) => setSides(Number(e.target.value))}
            className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-lg bg-[#121212] text-white"
          >
            {[4, 6, 8, 10, 12, 20, 100].map(s => (
              <option key={s} value={s}>D{s}</option>
            ))}
          </select>
        </div>

        <button
          onClick={rollDice}
          disabled={isRolling}
          className="w-full sm:w-auto px-8 py-3 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors shadow-[0_0_20px_rgba(147,51,234,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Dices size={24} /> Roll
        </button>
      </div>

      <div className="min-h-[200px] flex flex-col items-center justify-center">
        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {results.map((res, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl shadow-lg border border-white/20 flex items-center justify-center text-2xl font-black text-white"
                >
                  {res}
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <div className="text-sm text-zinc-400 uppercase tracking-widest mb-2">Total Sum</div>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                {total}
              </div>
            </div>
          </motion.div>
        )}
        
        {isRolling && (
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                className="w-4 h-4 bg-purple-500 rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
