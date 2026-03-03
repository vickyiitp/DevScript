import React from 'react';

export default function AdBanner({ slot = "header" }: { slot?: string }) {
  return (
    <div className="w-full bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center p-4 my-6 min-h-[100px]">
      <div className="text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Advertisement</p>
        <p className="text-sm text-gray-500">AdSense Space ({slot})</p>
      </div>
    </div>
  );
}
