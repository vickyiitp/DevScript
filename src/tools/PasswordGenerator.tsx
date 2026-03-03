import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { trackToolAction } from '../utils/analytics';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = (isManualClick = false) => {
    if (isManualClick) {
      trackToolAction('password-generator', 'generate_password', { length });
    }
    
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      setPassword('Please select at least one option');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  useEffect(() => {
    generatePassword(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    if (!password || password === 'Please select at least one option') return;
    trackToolAction('password-generator', 'copy_password');
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="relative">
        <input
          type="text"
          readOnly
          value={password}
          className="w-full text-center text-2xl font-mono tracking-wider py-6 px-4 bg-gray-900 text-white rounded-2xl border-2 border-indigo-500 focus:outline-none"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
          <button
            onClick={() => generatePassword(true)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            title="Generate New"
          >
            <RefreshCw size={24} />
          </button>
          <button
            onClick={copyToClipboard}
            className="p-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            title="Copy to Clipboard"
          >
            {copied ? <Check size={24} className="text-green-400" /> : <Copy size={24} />}
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Password Length</label>
            <span className="text-sm font-bold text-indigo-600">{length}</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-200">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-700 font-medium">Include Uppercase Letters</span>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-700 font-medium">Include Lowercase Letters</span>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-700 font-medium">Include Numbers</span>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-gray-700 font-medium">Include Symbols</span>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
