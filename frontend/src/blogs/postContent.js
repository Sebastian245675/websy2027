// Markdown body of each blog post, kept out of the main bundle: src/blogs/posts/<slug>.md is its own chunk.
//
// Prerendered pages embed the markdown in <script type="application/json" id="post-md"> (see BlogPostPage),
// so on the first load the content is available synchronously and hydration matches the HTML without
// a flash. Client-side navigation loads the chunk.

const cache = new Map();

export const EMBED_ID = 'post-md';

export const readEmbeddedContent = (slug) => {
  if (cache.has(slug)) return cache.get(slug);
  if (typeof document === 'undefined') return null;
  const el = document.getElementById(EMBED_ID);
  if (!el || el.dataset.slug !== slug) return null;
  try {
    const content = JSON.parse(el.textContent);
    cache.set(slug, content);
    return content;
  } catch {
    return null;
  }
};

export const loadPostContent = (slug) => {
  if (cache.has(slug)) return Promise.resolve(cache.get(slug));
  return import(/* webpackChunkName: "post-[request]" */ `./posts/${slug}.md`).then((m) => {
    cache.set(slug, m.default);
    return m.default;
  });
};

// JSON safe to put inside a <script> tag
export const embedJson = (content) => JSON.stringify(content).replace(/</g, '\\u003c');
