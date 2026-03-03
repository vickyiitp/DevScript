import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy } from 'lucide-react';

const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

function convertMillions(num: number): string {
  if (num >= 1000000) {
    return convertMillions(Math.floor(num / 1000000)) + " Million " + convertThousands(num % 1000000);
  } else {
    return convertThousands(num);
  }
}

function convertThousands(num: number): string {
  if (num >= 1000) {
    return convertHundreds(Math.floor(num / 1000)) + " Thousand " + convertHundreds(num % 1000);
  } else {
    return convertHundreds(num);
  }
}

function convertHundreds(num: number): string {
  if (num > 99) {
    return ones[Math.floor(num / 100)] + " Hundred " + convertTens(num % 100);
  } else {
    return convertTens(num);
  }
}

function convertTens(num: number): string {
  if (num < 10) return ones[num];
  else if (num >= 10 && num < 20) return teens[num - 10];
  else {
    return tens[Math.floor(num / 10)] + " " + ones[num % 10];
  }
}

export default function NumberToWords() {
  const [number, setNumber] = useState('');
  
  const getWords = () => {
    if (!number) return '';
    const num = parseInt(number, 10);
    if (isNaN(num)) return 'Invalid number';
    if (num === 0) return 'Zero';
    if (num < 0) return 'Minus ' + convertMillions(Math.abs(num)).trim();
    if (num > 999999999) return 'Number too large (max 999,999,999)';
    return convertMillions(num).trim();
  };

  const words = getWords();

  const handleCopy = () => {
    navigator.clipboard.writeText(words);
    trackToolAction('number-to-words', 'copy');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm">
        <label className="block text-sm font-medium text-zinc-300 mb-2">Enter Number</label>
        <input
          type="number"
          value={number}
          onChange={(e) => {
            setNumber(e.target.value);
            if (e.target.value) trackToolAction('number-to-words', 'convert');
          }}
          className="block w-full px-4 py-4 text-xl border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 bg-[#121212] text-white placeholder-zinc-600"
          placeholder="e.g., 12345"
        />
      </div>

      {number && (
        <div className="relative bg-purple-500/10 p-8 rounded-2xl border border-purple-500/20 min-h-[120px] flex items-center justify-center text-center">
          <p className="text-2xl font-medium text-purple-300 leading-relaxed">
            {words}
          </p>
          
          {words !== 'Invalid number' && words !== 'Number too large (max 999,999,999)' && (
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 bg-[#121212] border border-white/10 rounded-lg text-zinc-400 hover:text-purple-400 transition-colors shadow-sm"
              title="Copy result"
            >
              <Copy size={18} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
