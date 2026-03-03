import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy, ArrowDown, ArrowUp } from 'lucide-react';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const handleProcess = (text: string, currentMode: 'encode' | 'decode') => {
    setInput(text);
    setError('');
    
    if (!text) {
      setOutput('');
      return;
    }

    try {
      if (currentMode === 'encode') {
        setOutput(encodeURIComponent(text));
      } else {
        setOutput(decodeURIComponent(text));
      }
    } catch (err) {
      setError('Invalid URL encoding');
      setOutput('');
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    handleProcess(output, newMode); // Swap input and output
    trackToolAction('url-encode-decode', `switch_to_${newMode}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    trackToolAction('url-encode-decode', 'copy_output');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}
        </label>
        <button
          onClick={toggleMode}
          className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          {mode === 'encode' ? <><ArrowDown size={16} className="mr-1" /> Switch to Decode</> : <><ArrowUp size={16} className="mr-1" /> Switch to Encode</>}
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => handleProcess(e.target.value, mode)}
        className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
        placeholder={mode === 'encode' ? "Enter text here (e.g., https://example.com/?q=hello world)" : "Enter URL encoded string here (e.g., hello%20world)"}
      />

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
        <textarea
          value={output}
          readOnly
          className={`w-full h-40 p-4 border rounded-xl font-mono text-sm bg-gray-50 ${error ? 'border-red-300 text-red-600' : 'border-gray-300'}`}
          placeholder={error || "Result will appear here..."}
        />
        
        {output && !error && (
          <button
            onClick={handleCopy}
            className="absolute bottom-4 right-4 p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors shadow-sm"
            title="Copy result"
          >
            <Copy size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
