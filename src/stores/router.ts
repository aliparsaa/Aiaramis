import { create } from 'zustand';
import type { RouteInfo } from '@/types';

interface RouterStore {
  route: RouteInfo;
  previousRoute: RouteInfo | null;
  navigate: (route: RouteInfo) => void;
  setRoute: (route: RouteInfo) => void;
  goBack: () => void;
}

const parseHash = (hash: string): RouteInfo => {
  const clean = hash.replace('#', '');
  if (!clean || clean === '/') return { page: 'home' };

  const parts = clean.split('/').filter(Boolean);

  if (parts[0] === 'shop') return { page: 'shop' };
  if (parts[0] === 'products' && parts[1]) return { page: 'product', slug: parts[1] };
  if (parts[0] === 'categories' && parts[1]) return { page: 'category', categorySlug: parts[1] };
  if (parts[0] === 'blog') {
    if (parts[1]) return { page: 'blog-post', slug: parts[1] };
    return { page: 'blog' };
  }
  if (parts[0] === 'about') return { page: 'about' };
  if (parts[0] === 'contact') return { page: 'contact' };
  if (parts[0] === 'checkout') return { page: 'checkout' };
  if (parts[0] === 'search' && parts[1]) return { page: 'search', query: parts[1] };

  return { page: 'home' };
};

const routeToHash = (route: RouteInfo): string => {
  switch (route.page) {
    case 'home': return '#';
    case 'shop': return '#/shop';
    case 'product': return `#/products/${route.slug}`;
    case 'category': return `#/categories/${route.categorySlug}`;
    case 'blog': return '#/blog';
    case 'blog-post': return `#/blog/${route.slug}`;
    case 'about': return '#/about';
    case 'contact': return '#/contact';
    case 'checkout': return '#/checkout';
    case 'search': return `#/search/${route.query}`;
    default: return '#';
  }
};

export const useRouterStore = create<RouterStore>()((set, get) => ({
  route: parseHash(typeof window !== 'undefined' ? window.location.hash : ''),
  previousRoute: null,

  // User-initiated navigation: updates store + hash + scrolls
  navigate: (route: RouteInfo) => {
    const current = get().route;
    set({ previousRoute: current, route });

    if (typeof window !== 'undefined') {
      const hash = routeToHash(route);
      // Only update hash if different to avoid unnecessary hashchange events
      if (window.location.hash !== hash) {
        window.location.hash = hash;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  // Internal route update (from hashchange): updates store only, no hash change
  setRoute: (route: RouteInfo) => {
    const current = get().route;
    set({ previousRoute: current, route });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  goBack: () => {
    const prev = get().previousRoute;
    if (prev) {
      set({ route: prev, previousRoute: null });
    } else {
      get().navigate({ page: 'home' });
    }
  },
}));

// Hash change listener — uses setRoute to avoid infinite loop
if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const route = parseHash(window.location.hash);
    useRouterStore.getState().setRoute(route);
  });
}