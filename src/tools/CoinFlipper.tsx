import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { motion } from 'motion/react';

export default function CoinFlipper() {
  const [result, setResult] = useState<'Heads' | 'Tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [stats, setStats] = useState({ heads: 0, tails: 0, total: 0 });

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    trackToolAction('coin-flipper', 'flip');

    setTimeout(() => {
      const isHeads = Math.random() > 0.5;
      const newResult = isHeads ? 'Heads' : 'Tails';
      setResult(newResult);
      setStats(prev => ({
        heads: isHeads ? prev.heads + 1 : prev.heads,
        tails: !isHeads ? prev.tails + 1 : prev.tails,
        total: prev.total + 1
      }));
      setIsFlipping(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 text-center">
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{
            rotateY: isFlipping ? [0, 180, 360, 540, 720, 900, 1080] : 0,
            scale: isFlipping ? [1, 1.5, 1] : 1,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-48 h-48 rounded-full shadow-[0_0_40px_rgba(147,51,234,0.3)] border-4 border-purple-500/30 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-4xl font-black tracking-widest uppercase"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {isFlipping ? '?' : result || 'FLIP'}
        </motion.div>
      </div>

      <button
        onClick={flipCoin}
        disabled={isFlipping}
        className="px-10 py-4 bg-purple-600 text-white rounded-2xl font-bold text-xl hover:bg-purple-700 transition-colors shadow-[0_0_20px_rgba(147,51,234,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isFlipping ? 'Flipping...' : 'Flip Coin'}
      </button>

      {stats.total > 0 && (
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-around items-center max-w-md mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{stats.heads}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Heads</div>
          </div>
          <div className="w-px h-12 bg-white/10"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{stats.tails}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Tails</div>
          </div>
          <div className="w-px h-12 bg-white/10"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">{stats.total}</div>
            <div className="text-xs text-zinc-400 uppercase tracking-wider">Total</div>
          </div>
        </div>
      )}
    </div>
  );
}
