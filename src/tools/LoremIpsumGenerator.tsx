import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy, RefreshCw } from 'lucide-react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse',
  'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat',
  'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum'
];

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'words'>('paragraphs');
  const [output, setOutput] = useState('');

  const generateLorem = () => {
    let result = '';
    const num = Math.max(1, Math.min(100, count));

    if (type === 'words') {
      const words = [];
      for (let i = 0; i < num; i++) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      result = words.join(' ') + '.';
      result = result.charAt(0).toUpperCase() + result.slice(1);
    } else {
      const paragraphs = [];
      for (let p = 0; p < num; p++) {
        const sentences = [];
        const numSentences = Math.floor(Math.random() * 4) + 4; // 4-7 sentences per paragraph
        for (let s = 0; s < numSentences; s++) {
          const words = [];
          const numWords = Math.floor(Math.random() * 10) + 8; // 8-17 words per sentence
          for (let w = 0; w < numWords; w++) {
            words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
          }
          let sentence = words.join(' ') + '.';
          sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
          sentences.push(sentence);
        }
        paragraphs.push(sentences.join(' '));
      }
      result = paragraphs.join('\n\n');
    }

    setOutput(result);
    trackToolAction('lorem-ipsum', 'generate', { type, count: num });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    trackToolAction('lorem-ipsum', 'copy');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm flex flex-col sm:flex-row items-end gap-4">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Count</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white"
          />
        </div>
        
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'paragraphs' | 'words')}
            className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white"
          >
            <option value="paragraphs">Paragraphs</option>
            <option value="words">Words</option>
          </select>
        </div>

        <button
          onClick={generateLorem}
          className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]"
        >
          Generate
        </button>
      </div>

      {output && (
        <div className="relative">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Generated Text</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 p-4 border border-white/10 rounded-xl bg-white/5 text-white resize-y font-serif leading-relaxed"
          />
          
          <div className="absolute top-10 right-4 flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2 bg-[#121212] border border-white/10 rounded-lg text-zinc-400 hover:text-purple-400 transition-colors shadow-sm"
              title="Copy result"
            >
              <Copy size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
