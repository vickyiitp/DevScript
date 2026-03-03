import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  type?: string;
  keywords?: string;
  image?: string;
  category?: string;
  schema?: object;
}

export default function SEO({ 
  title, 
  description, 
  url = 'https://freetools.dev', 
  type = 'website',
  keywords,
  image = 'https://freetools.dev/og-image.png',
  category,
  schema: customSchema
}: SEOProps) {
  
  // Dynamically generate keywords if not provided
  const generatedKeywords = keywords || (category 
    ? `${title.toLowerCase()}, free ${title.toLowerCase()}, online ${title.toLowerCase()}, ${category.toLowerCase()}, freetools.dev, free online tools`
    : `${title.toLowerCase()}, free online tools, freetools.dev, utility tools`);

  const schema = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebSite',
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "publisher": {
      "@type": "Organization",
      "name": "FreeTools.dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://freetools.dev/logo.png"
      }
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={generatedKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="FreeTools.dev" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
      {customSchema && (
        <script type="application/ld+json">
          {JSON.stringify(customSchema)}
        </script>
      )}
    </Helmet>
  );
}
