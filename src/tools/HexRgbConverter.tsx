import React, { useState, useEffect } from 'react';
import { trackToolAction } from '../utils/analytics';
import { Copy } from 'lucide-react';

export default function HexRgbConverter() {
  const [hex, setHex] = useState('#9333ea');
  const [rgb, setRgb] = useState({ r: 147, g: 51, b: 234 });
  const [hsl, setHsl] = useState({ h: 272, s: 83, l: 56 });

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.substring(1, 3), 16);
      g = parseInt(h.substring(3, 5), 16);
      b = parseInt(h.substring(5, 7), 16);
    }
    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHex(val);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      const newRgb = hexToRgb(val);
      setRgb(newRgb);
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
      trackToolAction('hex-rgb-converter', 'convert-hex');
    }
  };

  const handleRgbChange = (color: 'r' | 'g' | 'b', value: string) => {
    const num = Math.max(0, Math.min(255, Number(value) || 0));
    const newRgb = { ...rgb, [color]: num };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    trackToolAction('hex-rgb-converter', 'convert-rgb');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    trackToolAction('hex-rgb-converter', 'copy');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm">
            <label className="block text-sm font-medium text-zinc-300 mb-2">HEX Color</label>
            <div className="flex gap-4">
              <input
                type="color"
                value={hex}
                onChange={handleHexChange}
                className="h-12 w-12 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                value={hex}
                onChange={handleHexChange}
                className="flex-1 px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white uppercase font-mono"
              />
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm space-y-4">
            <label className="block text-sm font-medium text-zinc-300">RGB Values</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-red-400 mb-1">R</label>
                <input
                  type="number"
                  min="0" max="255"
                  value={rgb.r}
                  onChange={(e) => handleRgbChange('r', e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 rounded-lg focus:ring-red-500 focus:border-red-500 sm:text-sm bg-[#121212] text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-green-400 mb-1">G</label>
                <input
                  type="number"
                  min="0" max="255"
                  value={rgb.g}
                  onChange={(e) => handleRgbChange('g', e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 rounded-lg focus:ring-green-500 focus:border-green-500 sm:text-sm bg-[#121212] text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs text-blue-400 mb-1">B</label>
                <input
                  type="number"
                  min="0" max="255"
                  value={rgb.b}
                  onChange={(e) => handleRgbChange('b', e.target.value)}
                  className="w-full px-3 py-2 border border-white/10 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#121212] text-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div 
            className="w-full h-48 rounded-2xl shadow-lg border border-white/10 flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: hex }}
          >
            <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-xl text-white font-mono text-xl tracking-wider shadow-inner">
              {hex.toUpperCase()}
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm space-y-4">
            <h3 className="text-sm font-medium text-zinc-300 mb-4">Color Formats</h3>
            
            <div className="flex items-center justify-between p-3 bg-[#121212] rounded-xl border border-white/5">
              <span className="text-zinc-400 text-sm w-12">HEX</span>
              <span className="text-white font-mono flex-1">{hex.toUpperCase()}</span>
              <button onClick={() => copyToClipboard(hex)} className="text-zinc-500 hover:text-purple-400"><Copy size={16} /></button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#121212] rounded-xl border border-white/5">
              <span className="text-zinc-400 text-sm w-12">RGB</span>
              <span className="text-white font-mono flex-1">rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
              <button onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="text-zinc-500 hover:text-purple-400"><Copy size={16} /></button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#121212] rounded-xl border border-white/5">
              <span className="text-zinc-400 text-sm w-12">HSL</span>
              <span className="text-white font-mono flex-1">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
              <button onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} className="text-zinc-500 hover:text-purple-400"><Copy size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
