import React, { useState, useEffect, useRef } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    trackToolAction('stopwatch', isRunning ? 'pause' : 'start');
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    trackToolAction('stopwatch', 'reset');
  };

  const addLap = () => {
    setLaps((prev) => [...prev, time]);
    trackToolAction('stopwatch', 'lap');
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="bg-white/5 p-10 rounded-3xl border border-white/10 shadow-xl text-center relative overflow-hidden">
        <div className="text-6xl sm:text-7xl font-black tracking-tighter mb-8 font-mono text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          {formatTime(time)}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${isRunning ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20'}`}
          >
            {isRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          
          <button
            onClick={isRunning ? addLap : resetTimer}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-[#121212] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isRunning ? <Flag size={24} /> : <RotateCcw size={24} />}
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <h3 className="font-medium text-white">Laps</h3>
          </div>
          <ul className="divide-y divide-white/5 max-h-64 overflow-y-auto">
            {laps.map((lap, index) => (
              <li key={index} className="p-4 flex justify-between items-center text-zinc-300 font-mono text-sm hover:bg-white/5 transition-colors">
                <span className="text-zinc-500">Lap {laps.length - index}</span>
                <span>{formatTime(lap)}</span>
              </li>
            )).reverse()}
          </ul>
        </div>
      )}
    </div>
  );
}
