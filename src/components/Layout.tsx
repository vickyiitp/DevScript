import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import OfflineBoundary from './OfflineBoundary';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-purple-500/30">
      <OfflineBoundary>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </OfflineBoundary>
    </div>
  );
}
