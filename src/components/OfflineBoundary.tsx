import React, { useState, useEffect } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Terminal, WifiOff, RefreshCw } from 'lucide-react';

const WORDS = [
  "devscript", "utility", "offline", "cache", "network", 
  "latency", "bandwidth", "server", "client", "react",
  "javascript", "typescript", "tailwind", "performance", "pwa"
];

export default function OfflineBoundary({ children }: { children: React.ReactNode }) {
  const { isOnline, wasOffline } = useNetworkStatus();
  const [currentWord, setCurrentWord] = useState(WORDS[0]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowRestored(true);
      const timer = setTimeout(() => setShowRestored(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim().toLowerCase() === currentWord) {
      setScore(s => s + 1);
      setInput('');
      setCurrentWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }
  };

  if (!isOnline) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 font-mono text-zinc-300 selection:bg-purple-500/30">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <WifiOff className="w-16 h-16 mx-auto text-zinc-600" />
            <h1 className="text-2xl font-bold text-white tracking-tight">System Offline</h1>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Connection lost. Client-side tools remain active in memory. Navigation suspended.
            </p>
          </div>

          <div className="bg-[#121212] border border-white/10 p-6 rounded-xl space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 opacity-50"></div>
            
            <div className="flex items-center justify-between text-sm text-zinc-400 border-b border-white/10 pb-4">
              <span className="flex items-center gap-2"><Terminal size={16} /> Terminal Training</span>
              <span className="font-bold text-purple-400">Score: {score}</span>
            </div>
            
            <div className="text-center space-y-2 py-4">
              <p className="text-xs text-zinc-500 uppercase tracking-widest">Type to bypass</p>
              <p className="text-3xl font-bold text-white tracking-widest">{currentWord}</p>
            </div>

            <input
              type="text"
              value={input}
              onChange={handleInput}
              autoFocus
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-4 text-center text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-lg"
              placeholder="Type here..."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showRestored && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <RefreshCw size={16} className="animate-spin" />
          <span className="text-sm font-medium tracking-wide">Connection Restored. State Synced.</span>
        </div>
      )}
      {children}
    </>
  );
}
