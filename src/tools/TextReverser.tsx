import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy, RefreshCw } from 'lucide-react';

export default function TextReverser() {
  const [text, setText] = useState('');

  const reversedText = text.split('').reverse().join('');

  const handleCopy = () => {
    navigator.clipboard.writeText(reversedText);
    trackToolAction('text-reverser', 'copy');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">Original Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#121212] text-white placeholder-zinc-600 resize-y"
          placeholder="Type or paste your text here..."
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Reversed Text</label>
        <textarea
          value={reversedText}
          readOnly
          className="w-full h-40 p-4 border border-white/10 rounded-xl bg-white/5 text-white resize-y"
          placeholder="Result will appear here..."
        />
        
        {reversedText && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2 bg-[#121212] border border-white/10 rounded-lg text-zinc-400 hover:text-purple-400 transition-colors shadow-sm"
              title="Copy result"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={() => { setText(''); trackToolAction('text-reverser', 'clear'); }}
              className="p-2 bg-[#121212] border border-white/10 rounded-lg text-zinc-400 hover:text-red-400 transition-colors shadow-sm"
              title="Clear text"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
