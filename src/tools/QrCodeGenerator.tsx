import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import { trackToolAction } from '../utils/analytics';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://freetools.dev');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const downloadQR = () => {
    trackToolAction('qr-code-generator', 'download_qr', { size });
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text or URL</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter text or URL here..."
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size ({size}px)</label>
          <input
            type="range"
            min="128"
            max="512"
            step="32"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foreground Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm text-gray-500 uppercase font-mono">{fgColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-10 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm text-gray-500 uppercase font-mono">{bgColor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-gray-100 p-8">
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
          <QRCodeSVG
            id="qr-code-svg"
            value={text || ' '}
            size={size}
            fgColor={fgColor}
            bgColor={bgColor}
            level="H"
            includeMargin={true}
          />
        </div>
        <button
          onClick={downloadQR}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center w-full justify-center"
        >
          <Download size={20} className="mr-2" /> Download PNG
        </button>
      </div>
    </div>
  );
}
