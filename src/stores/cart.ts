import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, LeadEmail } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (product: Product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },
      removeItem: (productId: string) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'aiaramis-cart' }
  )
);

interface LeadStore {
  emails: LeadEmail[];
  addEmail: (email: string, source: string) => void;
}

export const useLeadStore = create<LeadStore>()(
  persist(
    (set, get) => ({
      emails: [],
      addEmail: (email: string, source: string) => {
        const exists = get().emails.find((e) => e.email === email);
        if (!exists) {
          set({
            emails: [
              ...get().emails,
              { email, source, date: new Date().toISOString() },
            ],
          });
        }
      },
    }),
    { name: 'aiaramis-leads' }
  )
);