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
import { pillarPosts } from './pillars';
import { clusters, clusterOf } from './clusters';

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
  ...advancedGuidePosts,
  ...pillarPosts
]
  // The category shown and filtered on /blog is the post's cluster (src/blogs/clusters.js)
  .map((post) => {
    const mapped = clusterOf(post.slug);
    return mapped ? { ...post, category: mapped.cluster.name } : post;
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// Categories for filtering on /blog: one per cluster
export const blogCategories = ['Todos', ...clusters.map((c) => c.name)];

// Helper to find a post by slug
export const getPostBySlug = (slug) => {
  return blogPosts.find((post) => post.slug === slug);
};
