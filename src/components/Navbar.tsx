import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]"
              >
                <Wrench size={18} />
              </motion.div>
              <span className="font-bold text-xl text-white tracking-tight">DevScript<span className="text-purple-500">.me</span></span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
            <a href="#categories" className="text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Categories</a>
            <a href="#about" className="text-zinc-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
