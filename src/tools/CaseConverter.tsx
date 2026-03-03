import React, { useState } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy, RefreshCw } from 'lucide-react';

export default function CaseConverter() {
  const [text, setText] = useState('');

  const handleConvert = (type: string) => {
    let newText = text;
    switch (type) {
      case 'upper':
        newText = text.toUpperCase();
        break;
      case 'lower':
        newText = text.toLowerCase();
        break;
      case 'title':
        newText = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case 'sentence':
        newText = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'camel':
        newText = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
        break;
      case 'snake':
        newText = text.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('_');
        break;
      case 'kebab':
        newText = text.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/).map(word => word.toLowerCase()).join('-');
        break;
    }
    setText(newText);
    trackToolAction('case-converter', `convert_${type}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    trackToolAction('case-converter', 'copy_text');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => handleConvert('sentence')} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">Sentence case</button>
        <button onClick={() => handleConvert('lower')} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">lower case</button>
        <button onClick={() => handleConvert('upper')} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">UPPER CASE</button>
        <button onClick={() => handleConvert('title')} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">Title Case</button>
        <button onClick={() => handleConvert('camel')} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">camelCase</button>
        <button onClick={() => handleConvert('snake')} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">snake_case</button>
        <button onClick={() => handleConvert('kebab')} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium hover:bg-indigo-100 transition-colors">kebab-case</button>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y font-mono text-sm"
          placeholder="Type or paste your text here..."
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
            onClick={() => { setText(''); trackToolAction('case-converter', 'clear_text'); }}
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
