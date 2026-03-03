import React, { useState } from 'react';
import { Search, Zap, Shield, Clock } from 'lucide-react';
import { tools, categories } from '../data/tools';
import ToolCard from '../components/ToolCard';
import AdBanner from '../components/AdBanner';
import AboutCreator from '../components/AboutCreator';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-zinc-300">
      <Helmet>
        <title>DevScript | 100+ Free Developer & Daily Use Tools</title>
        <meta name="title" content="DevScript | 100+ Free Developer & Daily Use Tools" />
        <meta name="description" content="An ultimate collection of 100+ free developer tools, AI utilities, and daily use scripts. Format JSON, generate passwords, calculate finances, and more. No login required." />
        <meta name="keywords" content="developer tools, free web tools, devscript, JSON formatter, password generator, online calculators, developer utilities, base64 encoder, UUID generator, QR code generator, regex tester" />
        <link rel="canonical" href="https://devscript.me/" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DevScript" />
        <meta property="og:url" content="https://devscript.me/" />
        <meta property="og:title" content="DevScript | 100+ Free Developer & Daily Use Tools" />
        <meta property="og:description" content="Access 100+ free, client-side developer tools instantly. No login required." />
        <meta property="og:image" content="https://devscript.me/og-image.png" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vickyiitp" />
        <meta name="twitter:creator" content="@vickyiitp" />
        <meta name="twitter:title" content="DevScript | Instant Developer Utilities" />
        <meta name="twitter:description" content="A blazing fast suite of offline-ready tools for developers and creators." />
        <meta name="twitter:image" content="https://devscript.me/og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "DevScript",
            "alternateName": ["Dev Script", "DevScript Tools", "Developer Scripts"],
            "url": "https://devscript.me/",
            "description": "A comprehensive suite of 100+ free developer tools, AI tools, and daily utilities.",
            "keywords": "developer tools, free tools, dev, script, devscript, AI tools, daily use tools, 100+ tools",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://devscript.me/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0a] to-[#0a0a0a]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
              The Only <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">Toolbox</span> You Need
            </h1>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
              Access 100+ free, fast, and secure online tools for developers, students, finance, and daily utility. No signup required.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-zinc-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-14 pr-4 py-5 border border-white/10 rounded-2xl leading-5 bg-[#121212]/80 backdrop-blur-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-lg transition-all"
                  placeholder="Search for tools (e.g., JSON Formatter, Password Generator)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="categories">
        <AdBanner slot="home-top" />

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Browse All Tools</h2>
          <p className="mt-2 text-zinc-400 text-sm">Filter by category or search above</p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] border border-purple-500'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No tools found matching your search.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-4 text-purple-500 font-medium hover:text-purple-400 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-16">
          <AdBanner slot="home-middle" />
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-white/10 py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Why choose DevScript.me?</h2>
            <p className="mt-4 text-lg text-zinc-400">Built for speed, privacy, and ease of use.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300 border border-purple-500/20">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
              <p className="text-zinc-400 leading-relaxed">All tools run directly in your browser. No server delays, instant results.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 border border-emerald-500/20">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">100% Secure</h3>
              <p className="text-zinc-400 leading-relaxed">We don't store your data. Everything is processed locally on your device.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300 border border-blue-500/20">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Always Free</h3>
              <p className="text-zinc-400 leading-relaxed">No hidden fees, no subscriptions, no signups required. Just free tools forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 prose prose-invert prose-purple prose-lg text-zinc-400">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center tracking-tight">The Ultimate Collection of Free Online Tools</h2>
        <p className="leading-relaxed">
          Welcome to DevScript.me, your one-stop destination for high-quality, professional online utilities. Whether you are a software developer looking to format JSON, a student calculating your CGPA, a finance professional computing EMI, or just someone who needs a quick password generator, we have you covered.
        </p>
        <p className="leading-relaxed">
          Our platform is designed with a modern SaaS aesthetic, ensuring a clean, distraction-free environment. We prioritize user experience by making our tools incredibly fast and responsive. Because most of our tools run client-side (directly in your browser), your data never leaves your device, ensuring maximum privacy and security.
        </p>
        <h3 className="text-2xl font-semibold text-white mt-12 mb-6">Categories of Tools We Offer</h3>
        <ul className="space-y-4">
          <li><strong className="text-white">Finance Tools:</strong> GST calculators, EMI calculators, SIP planners, and more to help you manage your money.</li>
          <li><strong className="text-white">Developer Tools:</strong> JSON formatters, Base64 encoders, minifiers, and hash generators to speed up your coding workflow.</li>
          <li><strong className="text-white">Social Media Tools:</strong> Character counters, hashtag generators, and case converters for content creators.</li>
          <li><strong className="text-white">Student Tools:</strong> CGPA calculators, percentage tools, and scientific calculators to aid in your studies.</li>
          <li><strong className="text-white">Daily Utilities:</strong> Password generators, QR code creators, and stopwatches for everyday tasks.</li>
        </ul>
        <p className="mt-8 leading-relaxed">
          Bookmark this page and never search for a random online tool again. We are constantly updating and adding new tools to our collection based on user feedback.
        </p>
      </section>

      {/* About Creator Section */}
      <AboutCreator />

      {/* FAQ Section */}
      <section className="border-t border-white/10 py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-3">Are these tools really free?</h3>
              <p className="text-zinc-400 leading-relaxed">Yes, all 100+ tools on DevScript.me are 100% free to use. We support the site through minimal, non-intrusive advertisements.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-3">Do I need to create an account?</h3>
              <p className="text-zinc-400 leading-relaxed">No signup or registration is required. You can use all our tools instantly without providing any personal information.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-3">Is my data secure?</h3>
              <p className="text-zinc-400 leading-relaxed">Absolutely. The vast majority of our tools process data locally in your browser using JavaScript. This means your sensitive data (like JSON files or passwords) never touches our servers.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-3">Can I request a new tool?</h3>
              <p className="text-zinc-400 leading-relaxed">We are always looking to expand our toolbox. Feel free to contact us with your suggestions, and we might add it in our next update!</p>
            </div>
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <AdBanner slot="home-bottom" />
      </div>
    </div>
  );
}
