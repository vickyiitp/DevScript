import React, { useState, useEffect } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy, RefreshCw } from 'lucide-react';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState<'v4'>('v4');

  const generateUUID = () => {
    // Simple v4 UUID generator for browser
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
    trackToolAction('uuid-generator', 'generate', { count, version });
  };

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    trackToolAction('uuid-generator', 'copy_all');
  };

  const handleCopySingle = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    trackToolAction('uuid-generator', 'copy_single');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How many?</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="block w-24 px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value as 'v4')}
            className="block w-32 px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
          >
            <option value="v4">UUID v4</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
        >
          <RefreshCw size={18} className="mr-2" /> Generate
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-medium text-gray-700">Generated UUIDs</h3>
          <button
            onClick={handleCopyAll}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <Copy size={16} className="mr-1" /> Copy All
          </button>
        </div>
        <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
          {uuids.map((uuid, index) => (
            <li key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors group">
              <code className="text-gray-800 font-mono text-sm">{uuid}</code>
              <button
                onClick={() => handleCopySingle(uuid)}
                className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy"
              >
                <Copy size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
