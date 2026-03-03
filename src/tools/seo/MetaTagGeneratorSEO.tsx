import React from 'react';

export default function MetaTagGeneratorSEO() {
  return (
    <div className="prose prose-invert prose-purple prose-lg text-zinc-400 max-w-none bg-white/5 p-8 rounded-2xl border border-white/10 shadow-sm">
      <h2 className="text-3xl font-bold text-white mb-6">Bottom Line Up Front (BLUF)</h2>
      <p className="leading-relaxed">
        The <strong>Meta Tag Generator</strong> is a free, client-side utility that instantly creates HTML meta tags, Open Graph tags, and Twitter Cards for your website. Proper meta tags are critical for Search Engine Optimization (SEO) and ensuring your links look professional when shared on social media platforms like Facebook, X (Twitter), and LinkedIn.
      </p>

      <h3 className="text-2xl font-semibold text-white mt-10 mb-4">How to Generate Meta Tags (Step-by-Step)</h3>
      <ol className="space-y-2">
        <li><strong>Enter Site Details:</strong> Input your website's title, description, and target keywords. Keep the title under 60 characters and the description under 160 characters for optimal display in search results.</li>
        <li><strong>Add Author & Canonical URL:</strong> Specify the author name and the primary URL of the page to prevent duplicate content issues.</li>
        <li><strong>Include an Image URL:</strong> Provide a link to your Open Graph (OG) image. This is the image that will appear when your link is shared on social media.</li>
        <li><strong>Copy the Code:</strong> The tool instantly generates the HTML code in real-time. Click the "Copy HTML" button and paste it directly into the <code>&lt;head&gt;</code> section of your website.</li>
      </ol>

      <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Common Use Cases</h3>
      <ul className="space-y-2">
        <li><strong className="text-white">SEO Optimization:</strong> Ensure search engines like Google and Bing understand the core topic of your page through accurate title and description tags.</li>
        <li><strong className="text-white">Social Media Sharing:</strong> Generate Open Graph and Twitter Card tags so your links display rich previews (images, titles, and descriptions) when shared on social platforms.</li>
        <li><strong className="text-white">Web Development:</strong> Quickly scaffold the necessary <code>&lt;head&gt;</code> tags for new landing pages, blog posts, or web applications without having to memorize the syntax.</li>
      </ul>

      <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Technical Details</h3>
      <p className="leading-relaxed">
        This tool generates three distinct sets of meta tags:
      </p>
      <ul className="space-y-2">
        <li><strong>Standard HTML Meta Tags:</strong> Includes <code>title</code>, <code>description</code>, <code>keywords</code>, and <code>author</code>. These are the foundational tags used by search engine crawlers.</li>
        <li><strong>Open Graph (OG) Tags:</strong> Developed by Facebook, these tags (e.g., <code>og:title</code>, <code>og:image</code>) control how URLs are displayed when shared on Facebook, LinkedIn, and other platforms that support the OG protocol.</li>
        <li><strong>Twitter Cards:</strong> Specific tags (e.g., <code>twitter:card</code>, <code>twitter:image</code>) that dictate how content is previewed on X (formerly Twitter). The tool defaults to the <code>summary_large_image</code> card type for maximum visual impact.</li>
      </ul>
      <p className="leading-relaxed mt-4">
        All processing occurs locally in your browser. No data is sent to a server, ensuring complete privacy and zero latency.
      </p>
    </div>
  );
}
