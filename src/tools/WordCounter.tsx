import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy, RefreshCw } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    paragraphs: text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200) // 200 words per minute
  };

  const handleClear = () => {
    setText('');
    trackToolAction('word-counter', 'clear_text');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    trackToolAction('word-counter', 'copy_text');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center">
          <div className="text-2xl font-bold text-indigo-700">{stats.words}</div>
          <div className="text-xs font-medium text-indigo-600 uppercase tracking-wide mt-1">Words</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
          <div className="text-2xl font-bold text-blue-700">{stats.characters}</div>
          <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mt-1">Characters</div>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
          <div className="text-2xl font-bold text-emerald-700">{stats.sentences}</div>
          <div className="text-xs font-medium text-emerald-600 uppercase tracking-wide mt-1">Sentences</div>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
          <div className="text-2xl font-bold text-amber-700">{stats.paragraphs}</div>
          <div className="text-xs font-medium text-amber-600 uppercase tracking-wide mt-1">Paragraphs</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center">
          <div className="text-2xl font-bold text-purple-700">{stats.charactersNoSpaces}</div>
          <div className="text-xs font-medium text-purple-600 uppercase tracking-wide mt-1">No Spaces</div>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-center">
          <div className="text-2xl font-bold text-rose-700">{stats.readingTime}m</div>
          <div className="text-xs font-medium text-rose-600 uppercase tracking-wide mt-1">Read Time</div>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y font-mono text-sm"
          placeholder="Type or paste your text here to see real-time statistics..."
        />
        
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors shadow-sm"
            title="Copy text"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={handleClear}
            className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors shadow-sm"
            title="Clear text"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
