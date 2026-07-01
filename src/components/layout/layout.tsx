'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouterStore } from '@/stores/router';
import { useCartStore } from '@/stores/cart';
import { useSearchStore } from '@/stores/search';
import { useTheme } from 'next-themes';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { posts } from '@/data/posts';
import { formatPrice } from '@/lib/helpers';
import type { Product } from '@/types';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  Phone,
  Shield,
  Truck,
  Award,
  Stethoscope,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

// ---- Search Icon Mapping ----
import {
  Scan,
  HeartPulse,
  Scissors,
  BedDouble,
  Wind,
  Package,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  Scissors: <Scissors className="w-5 h-5" />,
  BedDouble: <BedDouble className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
};

// ---- Navbar Component ----
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { navigate } = useRouterStore();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const openSearch = useSearchStore((s) => s.openSearch);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = typeof window !== 'undefined';

  const navItems = [
    { label: 'خانه', action: () => navigate({ page: 'home' }) },
    {
      label: 'فروشگاه تجهیزات پزشکی',
      action: () => navigate({ page: 'shop' }),
    },
    {
      label: 'دسته‌بندی تجهیزات',
      hasMega: true,
    },
    { label: 'وبلاگ پزشکی', action: () => navigate({ page: 'blog' }) },
    { label: 'درباره ما', action: () => navigate({ page: 'about' }) },
    { label: 'تماس با ما', action: () => navigate({ page: 'contact' }) },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-border shadow-sm transition-theme">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-1.5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Phone className="w-3 h-3" />
            <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>ارسال رایگان برای سفارش‌های بالای ۵۰ میلیون تومان</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-3 h-3" />
            <span>ارسال به سراسر ایران</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ page: 'home' })}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary dark:text-teal-400 leading-tight">
                AiAramis
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                فروشگاه تجهیزات پزشکی
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasMega ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <button className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary dark:hover:text-teal-400 transition-colors flex items-center gap-1">
                      {item.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {megaMenuOpen && <MegaMenu />}
                  </div>
                ) : (
                  <button
                    onClick={item.action}
                    className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary dark:hover:text-teal-400 transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={openSearch}
              className="text-foreground"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="text-foreground relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -left-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-[10px]">
                  {totalItems > 99 ? '99+' : totalItems}
                </Badge>
              )}
            </Button>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="text-foreground"
                aria-label={resolvedTheme === 'dark' ? 'حالت روشن' : 'حالت تاریک'}
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hidden sm:flex"
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="text-foreground lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-80 p-0 overflow-y-auto">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              AiAramis
            </SheetTitle>
          </SheetHeader>
          <nav className="p-4 space-y-1">
            {navItems.map((item) =>
              item.hasMega ? (
                <div key={item.label}>
                  <button
                    onClick={() => navigate({ page: 'shop' })}
                    className="w-full text-right px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-lg transition-colors flex items-center justify-between"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        navigate({ page: 'category', categorySlug: cat.slug });
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-right pr-8 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
                    >
                      {iconMap[cat.icon]}
                      {cat.name}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action?.();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-right px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

// ---- Mega Menu ----
function MegaMenu() {
  const { navigate } = useRouterStore();

  return (
    <div className="mega-menu-enter absolute top-full right-0 left-0 bg-white dark:bg-slate-900 border border-border rounded-b-xl shadow-xl p-6 z-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div key={cat.slug}>
              <button
                onClick={() => {
                  navigate({ page: 'category', categorySlug: cat.slug });
                }}
                className="flex items-center gap-2 mb-3 text-sm font-bold text-foreground hover:text-primary dark:hover:text-teal-400 transition-colors"
              >
                <span className="text-primary dark:text-teal-400">
                  {iconMap[cat.icon]}
                </span>
                {cat.name}
              </button>
              <ul className="space-y-2">
                {cat.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <button
                      onClick={() => {
                        navigate({ page: 'category', categorySlug: cat.slug });
                      }}
                      className="text-xs text-muted-foreground hover:text-primary dark:hover:text-teal-400 transition-colors"
                    >
                      {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <button
            onClick={() => navigate({ page: 'shop' })}
            className="text-sm font-medium text-primary dark:text-teal-400 hover:underline"
          >
            مشاهده همه دسته‌بندی‌ها ←
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Cart Drawer ----
export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();
  const { navigate } = useRouterStore();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="left" className="w-full sm:w-96 flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            سبد خرید
            {items.length > 0 && (
              <Badge variant="secondary" className="mr-auto">
                {items.length} کالا
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm">سبد خرید شما خالی است</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="w-16 h-16 bg-background rounded-md flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={`/api/placeholder?text=${encodeURIComponent(item.product.nameEn)}&w=64&h=64`}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.product.brand}
                  </p>
                  <p className="text-sm font-bold text-primary mt-1">
                    {formatPrice(item.product.price)} تومان
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <span className="text-sm w-8 text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive shrink-0"
                  onClick={() => removeItem(item.product.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">مبلغ کل:</span>
              <span className="text-lg font-bold text-primary">
                {formatPrice(totalPrice())} تومان
              </span>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                closeCart();
                navigate({ page: 'checkout' });
              }}
            >
              ثبت سفارش
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ---- Search Dialog ----
export function SearchDialog() {
  const { isOpen, closeSearch, query, setQuery, setResults, results } =
    useSearchStore();
  const { navigate } = useRouterStore();

  const performSearch = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults({ products: [], posts: [], categories: [] });
        return;
      }
      const lower = q.toLowerCase();
      const matchedProducts = products
        .filter(
          (p) =>
            p.name.includes(q) ||
            p.nameEn.toLowerCase().includes(lower) ||
            p.brand.toLowerCase().includes(lower) ||
            p.tags.some((t) => t.includes(q))
        )
        .slice(0, 5);
      const matchedPosts = posts
        .filter(
          (p) =>
            p.title.includes(q) || p.tags.some((t) => t.includes(q))
        )
        .slice(0, 3);
      const matchedCategories = categories.filter(
        (c) => c.name.includes(q) || c.nameEn.toLowerCase().includes(lower)
      );
      setResults({ products: matchedProducts, posts: matchedPosts, categories: matchedCategories });
    },
    [setResults]
  );

  useEffect(() => {
    const timer = setTimeout(() => performSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const hasResults =
    results.products.length > 0 ||
    results.posts.length > 0 ||
    results.categories.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeSearch()}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="جستجوی تجهیزات پزشکی، مقالات، دسته‌بندی..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pr-10 h-12 text-base border-0 focus-visible:ring-0"
              autoFocus
            />
          </div>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[60vh] p-4">
          {!query.trim() && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              عبارت مورد نظر خود را جستجو کنید
            </div>
          )}
          {query.trim() && !hasResults && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              نتیجه‌ای برای &quot;{query}&quot; یافت نشد
            </div>
          )}
          {results.categories.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2">
                دسته‌بندی‌ها
              </h3>
              {results.categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    closeSearch();
                    navigate({ page: 'category', categorySlug: cat.slug });
                  }}
                  className="w-full text-right px-3 py-2.5 hover:bg-muted rounded-lg transition-colors flex items-center gap-3"
                >
                  <span className="text-primary">{iconMap[cat.icon]}</span>
                  <span className="text-sm">{cat.name}</span>
                  <span className="text-xs text-muted-foreground mr-auto">
                    {cat.nameEn}
                  </span>
                </button>
              ))}
            </div>
          )}
          {results.products.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2">
                محصولات
              </h3>
              {results.products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    closeSearch();
                    navigate({ page: 'product', slug: p.slug });
                  }}
                  className="w-full text-right px-3 py-2.5 hover:bg-muted rounded-lg transition-colors flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(p.price)} تومان
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {results.posts.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-muted-foreground mb-2 px-2">
                مقالات
              </h3>
              {results.posts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => {
                    closeSearch();
                    navigate({ page: 'blog-post', slug: post.slug });
                  }}
                  className="w-full text-right px-3 py-2.5 hover:bg-muted rounded-lg transition-colors"
                >
                  <p className="text-sm font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {post.summary.substring(0, 80)}...
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}