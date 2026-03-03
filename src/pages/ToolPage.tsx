import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { tools } from '../data/tools';
import SEO from '../components/SEO';
import AdBanner from '../components/AdBanner';
import { ArrowLeft } from 'lucide-react';
import ToolCard from '../components/ToolCard';
import { trackToolView } from '../utils/analytics';

// Import tool components
import GstCalculator from '../tools/GstCalculator';
import EmiCalculator from '../tools/EmiCalculator';
import JsonFormatter from '../tools/JsonFormatter';
import PasswordGenerator from '../tools/PasswordGenerator';
import QrCodeGenerator from '../tools/QrCodeGenerator';
import GpaToPercentage from '../tools/GpaToPercentage';
import AttendanceTracker from '../tools/AttendanceTracker';
import WordCounter from '../tools/WordCounter';
import CaseConverter from '../tools/CaseConverter';
import Base64Encoder from '../tools/Base64Encoder';
import UrlEncoder from '../tools/UrlEncoder';
import UuidGenerator from '../tools/UuidGenerator';
import AgeCalculator from '../tools/AgeCalculator';
import BmiCalculator from '../tools/BmiCalculator';
import DiscountCalculator from '../tools/DiscountCalculator';
import PomodoroTimer from '../tools/PomodoroTimer';
import CarbonFootprintCalculator from '../tools/CarbonFootprintCalculator';
import EvRangeCalculator from '../tools/EvRangeCalculator';
import LlmTokenCalculator from '../tools/LlmTokenCalculator';
import MarsTransferWindow from '../tools/MarsTransferWindow';
import MetaTagGenerator from '../tools/MetaTagGenerator';
import PlaceholderTool from '../tools/PlaceholderTool';
import MetaTagGeneratorSEO from '../tools/seo/MetaTagGeneratorSEO';

const toolComponents: Record<string, React.FC> = {
  'gst-calculator': GstCalculator,
  'emi-calculator': EmiCalculator,
  'json-formatter': JsonFormatter,
  'password-generator': PasswordGenerator,
  'qr-code-generator': QrCodeGenerator,
  'gpa-to-percentage': GpaToPercentage,
  'attendance-tracker': AttendanceTracker,
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'base64-encode-decode': Base64Encoder,
  'url-encode-decode': UrlEncoder,
  'uuid-generator': UuidGenerator,
  'age-calculator': AgeCalculator,
  'bmicalculator': BmiCalculator,
  'discount-calculator': DiscountCalculator,
  'pomodoro-timer': PomodoroTimer,
  'carbon-footprint': CarbonFootprintCalculator,
  'ev-range-calculator': EvRangeCalculator,
  'llm-token-calculator': LlmTokenCalculator,
  'mars-transfer-window': MarsTransferWindow,
  'meta-tag-generator': MetaTagGenerator,
};

export default function ToolPage() {
  const { id } = useParams<{ id: string }>();
  const tool = tools.find((t) => t.id === id);

  useEffect(() => {
    if (tool) {
      trackToolView(tool.id, tool.name);
    }
  }, [tool]);

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const ToolComponent = toolComponents[tool.id] || PlaceholderTool;
  
  // Get 4 related tools from the same category
  const relatedTools = tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  // Generate AI-optimized FAQs and Schema.org JSON-LD
  const faqs = tool.id === 'meta-tag-generator' ? [
    {
      question: "What is a Meta Tag Generator?",
      answer: "A Meta Tag Generator is a free online tool that creates HTML meta tags, Open Graph tags, and Twitter Cards for your website. These tags help search engines understand your content and improve how your links appear when shared on social media."
    },
    {
      question: "How do I use the Meta Tag Generator?",
      answer: "Simply enter your website's title, description, keywords, author, and an image URL. The tool instantly generates the HTML code. Click 'Copy HTML' and paste it into the <head> section of your website's code."
    },
    {
      question: "Why are Meta Tags important for SEO?",
      answer: "Meta tags, specifically the title and description, provide search engines like Google with a summary of your page's content. Well-crafted meta tags can improve your click-through rate (CTR) from search engine results pages (SERPs)."
    },
    {
      question: "What are Open Graph (OG) tags?",
      answer: "Open Graph tags are snippets of code that control how URLs are displayed when shared on social media platforms like Facebook and LinkedIn. They allow you to specify the title, description, and image that appear in the shared link preview."
    },
    {
      question: "Is this tool safe to use?",
      answer: "Yes, the Meta Tag Generator is 100% safe and private. All processing happens locally in your web browser. We do not store or transmit any of the data you enter."
    }
  ] : [
    {
      question: `What is the ${tool.name}?`,
      answer: `The ${tool.name} is a free online utility designed to help you ${tool.description.toLowerCase()} It is built for speed, accuracy, and ease of use, making it perfect for daily problems.`
    },
    {
      question: `How do I use the ${tool.name}?`,
      answer: `Simply enter your input into the provided fields, and the ${tool.name} will instantly process the data and display the results. No registration or download is required.`
    },
    {
      question: `Why should I use this ${tool.name}?`,
      answer: `Whether you are a student, professional, or just someone looking to solve a daily problem, our ${tool.name} saves you time and ensures accurate results without any cost.`
    },
    {
      question: `Is the ${tool.name} safe and private?`,
      answer: `Yes! All processing for the ${tool.name} happens directly in your browser. We do not store or transmit your sensitive data to our servers.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-20 text-zinc-300">
      <SEO 
        title={`${tool.name} - Free Online Tool | DevScript.me`}
        description={tool.description}
        url={`https://devscript.me/tools/${tool.id}`}
        category={tool.category}
        schema={faqSchema}
      />

      {/* Top Section */}
      <div className="border-b border-white/10 pt-10 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#0a0a0a] to-[#0a0a0a]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to all tools
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/5 border border-white/10 text-purple-400 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.2)]">
              <tool.icon size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">{tool.name}</h1>
              <p className="text-lg text-zinc-400 mt-2">{tool.description}</p>
            </div>
          </div>
          
          <AdBanner slot="tool-header" />
        </div>
      </div>

      {/* Middle: Working Tool Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-[#121212]/80 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 p-6 sm:p-10 mb-12">
          <ToolComponent />
        </div>
        
        <AdBanner slot="tool-middle" />
      </div>

      {/* Bottom: SEO Content & FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {tool.id === 'meta-tag-generator' ? (
          <MetaTagGeneratorSEO />
        ) : (
          <div className="prose prose-invert prose-purple prose-lg text-zinc-400 max-w-none bg-white/5 p-8 rounded-2xl border border-white/10 shadow-sm">
            <h2 className="text-3xl font-bold text-white mb-6">About the {tool.name}</h2>
            <p className="leading-relaxed">
              The {tool.name} is a free, fast, and secure online utility designed to help you {tool.description.toLowerCase()} 
              Whether you are a professional, student, or just someone looking for a quick solution, this tool provides accurate results instantly.
            </p>
            
            <h3 className="text-2xl font-semibold text-white mt-10 mb-4">How to use the {tool.name}?</h3>
            <ol className="space-y-2">
              <li>Enter your required input in the fields provided above.</li>
              <li>Adjust any settings or options according to your needs.</li>
              <li>Click the action button (e.g., Calculate, Generate, Format).</li>
              <li>Instantly view, copy, or download your results.</li>
            </ol>

            <h3 className="text-2xl font-semibold text-white mt-10 mb-4">Why use our {tool.name}?</h3>
            <ul className="space-y-2">
              <li><strong className="text-white">100% Free:</strong> No hidden costs or subscriptions.</li>
              <li><strong className="text-white">Fast & Responsive:</strong> Works seamlessly on desktop and mobile devices.</li>
              <li><strong className="text-white">Secure:</strong> All processing is done locally in your browser. We do not store your data.</li>
              <li><strong className="text-white">No Installation:</strong> Access it directly from your web browser without downloading any software.</li>
            </ul>
          </div>
        )}

        <div className="prose prose-invert prose-purple prose-lg text-zinc-400 max-w-none bg-white/5 p-8 rounded-2xl border border-white/10 shadow-sm mt-8">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6 not-prose">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#0a0a0a] rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-2">{faq.question}</h4>
                <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <h2 className="text-2xl font-bold text-white mb-8">Related {tool.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <AdBanner slot="tool-footer" />
      </div>
    </div>
  );
}
