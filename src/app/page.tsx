'use client';

import { useEffect } from 'react';
import { useRouterStore } from '@/stores/router';
import { Navbar, CartDrawer, SearchDialog } from '@/components/layout/layout';
import { Footer } from '@/components/layout/footer';
import { HomePage } from '@/components/pages/home';
import { ShopPage } from '@/components/pages/shop';
import { ProductDetailPage } from '@/components/pages/product-detail';
import { CategoryPage } from '@/components/pages/category';
import { BlogPage } from '@/components/pages/blog';
import { BlogPostPage } from '@/components/pages/blog-post';
import { AboutPage } from '@/components/pages/about';
import { ContactPage } from '@/components/pages/contact';
import { CheckoutPage } from '@/components/pages/checkout';

export default function AppRouter() {
  const route = useRouterStore((s) => s.route);

  // Update document title based on route
  useEffect(() => {
    const titles: Record<string, string> = {
      home: 'AiAramis | فروشگاه آنلاین تجهیزات پزشکی',
      shop: 'فروشگاه تجهیزات پزشکی | AiAramis',
      product: 'جزئیات محصول | AiAramis',
      category: 'دسته‌بندی | AiAramis',
      blog: 'وبلاگ پزشکی | AiAramis',
      'blog-post': 'مقاله | AiAramis',
      about: 'درباره ما | AiAramis',
      contact: 'تماس با ما | AiAramis',
      checkout: 'تکمیل سفارش | AiAramis',
      search: 'جستجو | AiAramis',
    };
    document.title = titles[route.page] || 'AiAramis';
  }, [route.page]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <CartDrawer />
      <SearchDialog />
      <main className="flex-1">
        {route.page === 'home' && <HomePage />}
        {route.page === 'shop' && <ShopPage />}
        {route.page === 'product' && route.slug && <ProductDetailPage slug={route.slug} />}
        {route.page === 'category' && route.categorySlug && <CategoryPage categorySlug={route.categorySlug} />}
        {route.page === 'blog' && <BlogPage />}
        {route.page === 'blog-post' && route.slug && <BlogPostPage slug={route.slug} />}
        {route.page === 'about' && <AboutPage />}
        {route.page === 'contact' && <ContactPage />}
        {route.page === 'checkout' && <CheckoutPage />}
        {route.page === 'search' && <ShopPage initialSearch={route.query} />}
      </main>
      <Footer />
    </div>
  );
}