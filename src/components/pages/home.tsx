'use client';

import { useRouterStore } from '@/stores/router';
import { useCartStore } from '@/stores/cart';
import { useLeadStore } from '@/stores/cart';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { posts } from '@/data/posts';
import { formatPrice } from '@/lib/helpers';
import { ProductCard } from '@/components/shared/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  ArrowLeft,
  Shield,
  Truck,
  Award,
  Headphones,
  Package,
  Scan,
  HeartPulse,
  Scissors,
  BedDouble,
  Wind,
} from 'lucide-react';
import { useState } from 'react';

const iconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-8 h-8" />,
  HeartPulse: <HeartPulse className="w-8 h-8" />,
  Scissors: <Scissors className="w-8 h-8" />,
  BedDouble: <BedDouble className="w-8 h-8" />,
  Wind: <Wind className="w-8 h-8" />,
  Package: <Package className="w-8 h-8" />,
};

export function HomePage() {
  const { navigate } = useRouterStore();
  const openCart = useCartStore((s) => s.openCart);
  const addEmail = useLeadStore((s) => s.addEmail);
  const [heroSearch, setHeroSearch] = useState('');
  const [nlEmail, setNlEmail] = useState('');

  const featuredProducts = products.filter((p) => p.isBestSeller).slice(0, 8);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const latestPosts = posts.slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate({ page: 'search', query: heroSearch.trim() });
    } else {
      navigate({ page: 'shop' });
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (nlEmail.trim() && nlEmail.includes('@')) {
      addEmail(nlEmail, 'homepage-newsletter');
      setNlEmail('');
    }
  };

  const trustBadges = [
    { icon: <Shield className="w-8 h-8" />, title: 'ضمانت اصالت کالا', desc: 'تمامی محصولات دارای گارانتی معتبر هستند' },
    { icon: <Truck className="w-8 h-8" />, title: 'ارسال به سراسر کشور', desc: 'ارسال سریع و مطمئن به تمامی شهرها' },
    { icon: <Headphones className="w-8 h-8" />, title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی آماده پاسخگویی به شماست' },
    { icon: <Award className="w-8 h-8" />, title: 'بهترین قیمت', desc: 'قیمت‌های رقابتی و تخفیف‌های ویژه' },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-bl from-teal-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm">
              مرجع خرید تجهیزات پزشکی
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              فروشگاه آنلاین
              <span className="text-primary dark:text-teal-400"> تجهیزات پزشکی </span>
              و بیمارستانی
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-8 max-w-2xl mx-auto">
              آی‌آرامیس، مرجع تخصصی خرید تجهیزات پزشکی و بیمارستانی از معتبرترین برندهای جهان. مناسب برای بیمارستان‌ها، کلینیک‌ها و مراکز درمانی.
            </p>
            <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="جستجوی تجهیزات پزشکی... (مثلاً دستگاه ECG)"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="h-14 pr-12 pl-28 text-base rounded-xl border-2 border-primary/20 focus-visible:border-primary/50"
                />
                <Button
                  type="submit"
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-lg"
                >
                  جستجو
                </Button>
              </div>
            </form>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {['دستگاه ECG', 'سونوگرافی', 'تخت بیمارستانی', 'ونتیلاتور'].map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/5"
                  onClick={() => {
                    setHeroSearch(tag);
                    navigate({ page: 'search', query: tag });
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustBadges.map((badge) => (
            <Card key={badge.title} className="border-0 shadow-sm text-center p-6">
              <CardContent className="p-0 flex flex-col items-center gap-2">
                <div className="text-primary dark:text-teal-400">{badge.icon}</div>
                <h3 className="text-sm font-bold">{badge.title}</h3>
                <p className="text-xs text-muted-foreground">{badge.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">دسته‌بندی تجهیزات</h2>
            <p className="text-sm text-muted-foreground mt-1">
              مرور محصولات بر اساس دسته‌بندی
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-primary"
            onClick={() => navigate({ page: 'shop' })}
          >
            مشاهده همه
            <ArrowLeft className="w-4 h-4 mr-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Card
              key={cat.slug}
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
              onClick={() => navigate({ page: 'category', categorySlug: cat.slug })}
            >
              <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary/10 dark:bg-teal-900/30 flex items-center justify-center text-primary dark:text-teal-400 group-hover:scale-110 transition-transform">
                  {iconMap[cat.icon]}
                </div>
                <h3 className="text-sm font-medium leading-5">{cat.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {cat.productCount} محصول
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">پرفروش‌ترین محصولات</h2>
            <p className="text-sm text-muted-foreground mt-1">
              محبوب‌ترین تجهیزات پزشکی
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-primary"
            onClick={() => navigate({ page: 'shop' })}
          >
            مشاهده همه
            <ArrowLeft className="w-4 h-4 mr-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">تازه‌ترین محصولات</h2>
            <p className="text-sm text-muted-foreground mt-1">
              جدیدترین تجهیزات اضافه شده
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-primary"
            onClick={() => navigate({ page: 'shop' })}
          >
            مشاهده همه
            <ArrowLeft className="w-4 h-4 mr-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">وبلاگ پزشکی</h2>
            <p className="text-sm text-muted-foreground mt-1">
              جدیدترین مقالات آموزشی و تخصصی
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-primary"
            onClick={() => navigate({ page: 'blog' })}
          >
            مشاهده همه
            <ArrowLeft className="w-4 h-4 mr-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Card
              key={post.id}
              className="cursor-pointer hover:shadow-md transition-all overflow-hidden group"
              onClick={() => navigate({ page: 'blog-post', slug: post.slug })}
            >
              <div className="aspect-video bg-muted/50 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{post.category}</span>
              </div>
              <CardContent className="p-4 space-y-2">
                <Badge variant="secondary" className="text-[10px]">
                  {post.category}
                </Badge>
                <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime} دقیقه مطالعه
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA / Newsletter */}
      <section className="bg-gradient-to-bl from-primary to-teal-600 dark:from-teal-900 dark:to-teal-800 rounded-2xl">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center space-y-4 text-white">
            <h2 className="text-2xl md:text-3xl font-bold">
              از تخفیف‌ها و محصولات جدید مطلع شوید
            </h2>
            <p className="text-white/80 text-sm">
              با عضویت در خبرنامه آی‌آرامیس، از جدیدترین محصولات و تخفیف‌های ویژه مطلع شوید.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
              />
              <Button type="submit" variant="secondary" size="lg" className="shrink-0">
                عضویت
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}