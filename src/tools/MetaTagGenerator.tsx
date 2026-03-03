import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    let tags = `<!-- Primary Meta Tags -->\n`;
    if (title) tags += `<title>${title}</title>\n<meta name="title" content="${title}">\n`;
    if (description) tags += `<meta name="description" content="${description}">\n`;
    if (keywords) tags += `<meta name="keywords" content="${keywords}">\n`;
    if (author) tags += `<meta name="author" content="${author}">\n`;

    tags += `\n<!-- Open Graph / Facebook -->\n<meta property="og:type" content="website">\n`;
    if (url) tags += `<meta property="og:url" content="${url}">\n`;
    if (title) tags += `<meta property="og:title" content="${title}">\n`;
    if (description) tags += `<meta property="og:description" content="${description}">\n`;
    if (imageUrl) tags += `<meta property="og:image" content="${imageUrl}">\n`;

    tags += `\n<!-- Twitter -->\n<meta property="twitter:card" content="summary_large_image">\n`;
    if (url) tags += `<meta property="twitter:url" content="${url}">\n`;
    if (title) tags += `<meta property="twitter:title" content="${title}">\n`;
    if (description) tags += `<meta property="twitter:description" content="${description}">\n`;
    if (imageUrl) tags += `<meta property="twitter:image" content="${imageUrl}">\n`;

    return tags;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setKeywords('');
    setAuthor('');
    setImageUrl('');
    setUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Site Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., DevScript | Free Tools"
            />
            <p className="text-xs text-zinc-500 mt-1 text-right">{title.length} / 60 chars (recommended)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Site Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600 resize-none"
              placeholder="e.g., A comprehensive suite of free developer tools..."
            />
            <p className="text-xs text-zinc-500 mt-1 text-right">{description.length} / 160 chars (recommended)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Keywords (comma separated)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., tools, developer, free"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="e.g., Vicky Kumar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Image URL (for Social Sharing)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="https://example.com/og-image.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Canonical URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="block w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm bg-[#121212] text-white placeholder-zinc-600"
              placeholder="https://devscript.me"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl shadow-sm text-sm font-medium text-zinc-300 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <RefreshCw size={16} className="mr-2" />
              Reset Fields
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-white/10 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-zinc-300">Generated Meta Tags</h3>
            <button
              onClick={handleCopy}
              className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              {copied ? <Check size={16} className="mr-1" /> : <Copy size={16} className="mr-1" />}
              {copied ? 'Copied!' : 'Copy HTML'}
            </button>
          </div>
          <div className="flex-1 bg-[#0a0a0a] rounded-xl border border-white/5 p-4 overflow-auto relative group">
            <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap break-all">
              {generateMetaTags()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
