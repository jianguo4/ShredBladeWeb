export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Industrial Shredder Blades',
  url: 'https://yourdomain.com',
  logo: 'https://mgx-backend-cdn.metadl.com/generate/images/889036/2026-01-08/611e1d38-edc5-461d-8f60-1a1648d6827b.png',
  description:
    'Professional manufacturer of industrial shredder blades for recycling industry. OEM & replacement knives for plastic, metal, e-waste, and tire shredding.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'Customer Service',
    email: 'info@shredderblades.com',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/shredderblades',
    'https://twitter.com/shredderblades',
  ],
};

export const productSchema = (productName: string, description: string, application: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: productName,
  description: description,
  brand: {
    '@type': 'Brand',
    name: 'Industrial Shredder Blades',
  },
  category: 'Industrial Equipment',
  applicationCategory: application,
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'USD',
    },
  },
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Industrial Shredder Blade Manufacturing',
  provider: {
    '@type': 'Organization',
    name: 'Industrial Shredder Blades',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Shredder Blade Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'OEM Shredder Blades',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Replacement Shredder Blades',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Blade Manufacturing',
        },
      },
    ],
  },
};