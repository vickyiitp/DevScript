import React, { useState, useEffect } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Calculator, Cpu, DollarSign } from 'lucide-react';

export default function LlmTokenCalculator() {
  const [inputTokens, setInputTokens] = useState<number | ''>('');
  const [outputTokens, setOutputTokens] = useState<number | ''>('');
  const [model, setModel] = useState('gpt-4o');
  const [cost, setCost] = useState<{ input: number; output: number; total: number } | null>(null);

  // Pricing per 1M tokens (as of early 2024, illustrative)
  const pricing: Record<string, { input: number; output: number; name: string }> = {
    'gpt-4o': { input: 5.00, output: 15.00, name: 'GPT-4o' },
    'gpt-4-turbo': { input: 10.00, output: 30.00, name: 'GPT-4 Turbo' },
    'gpt-3.5-turbo': { input: 0.50, output: 1.50, name: 'GPT-3.5 Turbo' },
    'claude-3-opus': { input: 15.00, output: 75.00, name: 'Claude 3 Opus' },
    'claude-3-sonnet': { input: 3.00, output: 15.00, name: 'Claude 3 Sonnet' },
    'claude-3-haiku': { input: 0.25, output: 1.25, name: 'Claude 3 Haiku' },
    'gemini-1.5-pro': { input: 3.50, output: 10.50, name: 'Gemini 1.5 Pro' },
    'gemini-1.5-flash': { input: 0.35, output: 1.05, name: 'Gemini 1.5 Flash' },
  };

  const calculateCost = () => {
    if (inputTokens === '' && outputTokens === '') {
      setCost(null);
      return;
    }

    const inTokens = Number(inputTokens) || 0;
    const outTokens = Number(outputTokens) || 0;
    const selectedModel = pricing[model];

    const inputCost = (inTokens / 1000000) * selectedModel.input;
    const outputCost = (outTokens / 1000000) * selectedModel.output;

    setCost({
      input: inputCost,
      output: outputCost,
      total: inputCost + outputCost
    });
    trackToolAction('llm-token-calculator', 'calculate', { model });
  };

  useEffect(() => {
    calculateCost();
  }, [inputTokens, outputTokens, model]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Select AI Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white"
          >
            {Object.entries(pricing).map(([key, data]) => (
              <option key={key} value={key}>{data.name} (${data.input} in / ${data.output} out per 1M)</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Input Tokens</label>
            <input
              type="number"
              value={inputTokens}
              onChange={(e) => setInputTokens(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Output Tokens</label>
            <input
              type="number"
              value={outputTokens}
              onChange={(e) => setOutputTokens(e.target.value ? Number(e.target.value) : '')}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., 2000"
            />
          </div>
        </div>
      </div>

      {cost && (
        <div className="bg-purple-500/10 rounded-2xl p-8 border border-purple-500/20 text-center">
          <DollarSign size={48} className="mx-auto text-purple-400 mb-4" />
          <h3 className="text-lg font-medium text-purple-300 mb-2">Estimated API Cost</h3>
          <div className="text-5xl font-extrabold text-purple-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            ${cost.total.toFixed(4)}
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-[#121212] p-4 rounded-xl shadow-sm border border-white/5">
              <div className="text-sm text-zinc-400 mb-1">Input Cost</div>
              <div className="font-medium text-white">${cost.input.toFixed(4)}</div>
            </div>
            <div className="bg-[#121212] p-4 rounded-xl shadow-sm border border-white/5">
              <div className="text-sm text-zinc-400 mb-1">Output Cost</div>
              <div className="font-medium text-white">${cost.output.toFixed(4)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
