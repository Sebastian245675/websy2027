import { webDevelopmentPosts } from './webDevelopment';
import { mobileDevelopmentPosts } from './mobileDevelopment';
import { ecommerceDevelopmentPosts } from './ecommerceDevelopment';
import { aiAndAutomationPosts } from './aiAndAutomation';
import { customSystemsAndEnterprisePosts } from './customSystemsAndEnterprise';
import { cloudDevopsSecurityPosts } from './cloudDevopsSecurity';
import { designAndUserExperiencePosts } from './designAndUserExperience';
import { techNicheIndustriesPosts } from './techNicheIndustries';
import { seoAndMarketingPosts } from './seoAndMarketing';
import { digitalPresencePosts } from './digitalPresence';
import { businessTechPosts } from './businessTech';
import { localBusinessPosts } from './localBusiness';
import { freelancerStartupPosts } from './freelancerStartup';
import { advancedGuidePosts } from './advancedGuides';

// Combine all blog posts from all modules
export const blogPosts = [
  ...webDevelopmentPosts,
  ...mobileDevelopmentPosts,
  ...ecommerceDevelopmentPosts,
  ...aiAndAutomationPosts,
  ...customSystemsAndEnterprisePosts,
  ...cloudDevopsSecurityPosts,
  ...designAndUserExperiencePosts,
  ...techNicheIndustriesPosts,
  ...seoAndMarketingPosts,
  ...digitalPresencePosts,
  ...businessTechPosts,
  ...localBusinessPosts,
  ...freelancerStartupPosts,
  ...advancedGuidePosts
].sort((a, b) => new Date(b.date) - new Date(a.date));

// Categories list for filtering
export const blogCategories = [
  'Todos',
  'Desarrollo Web',
  'Apps Móviles',
  'E-commerce',
  'IA & Automatización',
  'Sistemas & ERP',
  'APIs & Cloud',
  'Ciberseguridad',
  'UI/UX Design',
  'SaaS & Software Nube',
  'Industrias & Tech',
  'SEO & Marketing'
];

// Helper to find a post by slug
export const getPostBySlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug);
};

// Helper to search posts by query keyword
export const searchBlogPosts = (query, category = 'Todos') => {
  let filtered = blogPosts;

  if (category && category !== 'Todos') {
    filtered = filtered.filter((post) => post.category === category);
  }

  if (!query || query.trim() === '') {
    return filtered;
  }

  const cleanQuery = query.toLowerCase().trim();

  return filtered.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(cleanQuery);
    const descMatch = post.seoDescription ? post.seoDescription.toLowerCase().includes(cleanQuery) : false;
    const keywordsMatch = post.seoKeywords ? post.seoKeywords.toLowerCase().includes(cleanQuery) : false;
    const categoryMatch = post.category ? post.category.toLowerCase().includes(cleanQuery) : false;
    return titleMatch || descMatch || keywordsMatch || categoryMatch;
  });
};
