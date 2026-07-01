import { create } from 'zustand';
import type { Product, BlogPost, Category } from '@/types';

interface SearchStore {
  query: string;
  isOpen: boolean;
  results: {
    products: Product[];
    posts: BlogPost[];
    categories: Category[];
  };
  setQuery: (query: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  setResults: (results: { products: Product[]; posts: BlogPost[]; categories: Category[] }) => void;
  clearResults: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: '',
  isOpen: false,
  results: { products: [], posts: [], categories: [] },
  setQuery: (query: string) => set({ query }),
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '', results: { products: [], posts: [], categories: [] } }),
  setResults: (results) => set({ results }),
  clearResults: () => set({ results: { products: [], posts: [], categories: [] } }),
}));