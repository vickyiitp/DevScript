import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ToolCardProps {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  key?: React.Key;
}

export default function ToolCard({ id, name, description, icon: Icon, category }: ToolCardProps) {
  return (
    <Link 
      to={`/tools/${id}`}
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="w-12 h-12 bg-white/10 text-purple-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300 relative z-10">
        <Icon size={24} />
      </div>
      
      <h3 className="text-lg font-semibold text-zinc-100 mb-2 relative z-10">{name}</h3>
      
      <p className="text-sm text-zinc-400 mb-6 flex-grow relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
      
      <div className="flex items-center text-purple-400 text-sm font-medium mt-auto relative z-10">
        Open Tool <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
