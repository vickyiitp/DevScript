import React from 'react';
import { Github, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

export default function AboutCreator() {
  return (
    <section id="about" className="py-24 border-t border-white/10 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-[#0a0a0a] to-[#0a0a0a]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            
            <div className="md:col-span-2 space-y-6">
              <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs font-semibold tracking-widest uppercase mb-2">
                About the Creator
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Vicky Kumar
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Full-stack developer, AI builder, and B.Sc. Computer Science and Data Analytics student at IIT Patna. Founder of Devil Labs, a studio dedicated to building high-performance AI tools and web utilities.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                I created DevScript.me as part of my "365 Days of Building" challenge. It serves as the central hub for the 100+ free, client-side utility tools I am developing to solve real-world problems for developers and everyday users without the bloat. I heavily leverage "Build in Public" and Vibe Coding methodologies to ship production-ready software daily.
              </p>
            </div>

            <div className="flex flex-col space-y-4 md:border-l md:border-white/10 md:pl-12">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-2">Connect</h3>
              
              <a href="https://github.com/vickyiitp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-purple-500/30 transition-all">
                  <Github size={18} />
                </div>
                <span className="font-medium">GitHub</span>
              </a>
              
              <a href="https://twitter.com/vickyiitp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-purple-500/30 transition-all">
                  <Twitter size={18} />
                </div>
                <span className="font-medium">X (Twitter)</span>
              </a>

              <a href="https://linkedin.com/in/vickyiitp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-purple-500/30 transition-all">
                  <Linkedin size={18} />
                </div>
                <span className="font-medium">LinkedIn</span>
              </a>

              <a href="https://youtube.com/@vickyiitp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-purple-500/30 transition-all">
                  <Youtube size={18} />
                </div>
                <span className="font-medium">YouTube</span>
              </a>

              <a href="https://instagram.com/vickyiitp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-purple-500/30 transition-all">
                  <Instagram size={18} />
                </div>
                <span className="font-medium">Instagram</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
