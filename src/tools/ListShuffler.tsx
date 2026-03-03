import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy, Shuffle, RefreshCw } from 'lucide-react';

export default function ListShuffler() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleShuffle = () => {
    if (!input.trim()) return;
    
    const lines = input.split('\n').filter(line => line.trim() !== '');
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    
    setOutput(lines.join('\n'));
    trackToolAction('list-shuffler', 'shuffle');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    trackToolAction('list-shuffler', 'copy');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Original List (One item per line)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#121212] text-white placeholder-zinc-600 resize-y"
            placeholder="Apple&#10;Banana&#10;Cherry&#10;Date"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Shuffled List</label>
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

      <div className="flex justify-center gap-4">
        <button
          onClick={handleShuffle}
          className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]"
        >
          <Shuffle size={18} className="mr-2" /> Shuffle List
        </button>
        <button
          onClick={() => { setInput(''); setOutput(''); trackToolAction('list-shuffler', 'clear'); }}
          className="flex items-center px-6 py-3 bg-[#121212] border border-white/10 text-zinc-300 rounded-xl font-medium hover:bg-white/5 transition-colors"
        >
          <RefreshCw size={18} className="mr-2" /> Clear
        </button>
      </div>
    </div>
  );
}
