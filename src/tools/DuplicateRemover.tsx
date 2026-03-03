import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy, Trash2, RefreshCw } from 'lucide-react';

export default function DuplicateRemover() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState({ original: 0, removed: 0, remaining: 0 });

  const handleRemove = () => {
    if (!input.trim()) return;
    
    const lines = input.split('\n');
    const uniqueLines = [...new Set(lines)];
    
    setOutput(uniqueLines.join('\n'));
    setStats({
      original: lines.length,
      removed: lines.length - uniqueLines.length,
      remaining: uniqueLines.length
    });
    
    trackToolAction('duplicate-remover', 'remove');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    trackToolAction('duplicate-remover', 'copy');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Original List</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#121212] text-white placeholder-zinc-600 resize-y"
            placeholder="Paste your list here..."
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Cleaned List</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-4 border border-white/10 rounded-xl bg-white/5 text-white resize-y"
            placeholder="Result will appear here..."
          />
          
          {output && (
            <button
              onClick={handleCopy}
              className="absolute bottom-4 right-4 p-2 bg-[#121212] border border-white/10 rounded-lg text-zinc-400 hover:text-purple-400 transition-colors shadow-sm"
              title="Copy result"
            >
              <Copy size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
        <div className="flex gap-6 text-sm">
          <div className="text-zinc-400">Original: <span className="text-white font-medium">{stats.original}</span></div>
          <div className="text-red-400">Removed: <span className="font-medium">{stats.removed}</span></div>
          <div className="text-emerald-400">Remaining: <span className="font-medium">{stats.remaining}</span></div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={handleRemove}
            className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          >
            <Trash2 size={16} className="mr-2" /> Remove Duplicates
          </button>
          <button
            onClick={() => { setInput(''); setOutput(''); setStats({ original: 0, removed: 0, remaining: 0 }); trackToolAction('duplicate-remover', 'clear'); }}
            className="flex items-center px-4 py-2 bg-[#121212] border border-white/10 text-zinc-300 rounded-lg font-medium hover:bg-white/5 transition-colors"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
