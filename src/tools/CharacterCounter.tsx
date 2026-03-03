import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.characters}</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Characters</div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.words}</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Words</div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
          <div className="text-2xl font-bold text-emerald-400">{stats.charactersNoSpaces}</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">No Spaces</div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
          <div className="text-2xl font-bold text-orange-400">{stats.lines}</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Lines</div>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center sm:col-span-3 md:col-span-1">
          <div className="text-2xl font-bold text-pink-400">{stats.paragraphs}</div>
          <div className="text-xs text-zinc-400 uppercase tracking-wider mt-1">Paragraphs</div>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (e.target.value.length % 100 === 0 && e.target.value.length > 0) {
            trackToolAction('character-counter', 'type');
          }
        }}
        className="w-full h-64 p-4 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-[#121212] text-white placeholder-zinc-600 resize-y"
        placeholder="Type or paste your text here to count characters, words, and more..."
      />
    </div>
  );
}
