import React, { useState, useEffect, useRef } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const WORK_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished
      setIsRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
      
      // Play sound (optional, browser policies might block this without interaction)
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();
      } catch (e) {}

      trackToolAction('pomodoro-timer', 'timer_complete', { mode });
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    trackToolAction('pomodoro-timer', isRunning ? 'pause' : 'start', { mode });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
    trackToolAction('pomodoro-timer', 'reset', { mode });
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
    trackToolAction('pomodoro-timer', `switch_${newMode}`);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'work' 
    ? ((WORK_TIME - timeLeft) / WORK_TIME) * 100 
    : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100;

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => switchMode('work')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'work' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Briefcase size={16} className="mr-2" /> Focus
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'break' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Coffee size={16} className="mr-2" /> Short Break
          </button>
        </div>
      </div>

      <div className={`bg-white p-10 rounded-3xl border shadow-xl text-center relative overflow-hidden ${mode === 'work' ? 'border-indigo-100 shadow-indigo-100/50' : 'border-emerald-100 shadow-emerald-100/50'}`}>
        {/* Progress Bar Background */}
        <div 
          className={`absolute bottom-0 left-0 h-2 transition-all duration-1000 ease-linear ${mode === 'work' ? 'bg-indigo-500' : 'bg-emerald-500'}`}
          style={{ width: `${progress}%` }}
        />

        <div className={`text-8xl font-black tracking-tighter mb-8 font-mono ${mode === 'work' ? 'text-indigo-900' : 'text-emerald-900'}`}>
          {formatTime(timeLeft)}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${mode === 'work' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          >
            {isRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </button>
          
          <button
            onClick={resetTimer}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
