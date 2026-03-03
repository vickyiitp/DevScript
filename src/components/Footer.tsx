import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)] group-hover:scale-110 transition-transform">
                <Wrench size={18} />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">DevScript<span className="text-purple-500">.me</span></span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
              A collection of 100+ free, professional tools for developers, students, and everyday users. Fast, secure, and easy to use.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 tracking-wider uppercase mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">Finance Tools</Link></li>
              <li><Link to="/" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">Developer Tools</Link></li>
              <li><Link to="/" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">Social Media Tools</Link></li>
              <li><Link to="/" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">Student Tools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} DevScript.me. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
