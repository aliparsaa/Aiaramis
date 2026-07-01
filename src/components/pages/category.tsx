'use client';

import { useMemo } from 'react';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { useRouterStore } from '@/stores/router';
import { ProductCard } from '@/components/shared/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronLeft, Scan, HeartPulse, Scissors, BedDouble, Wind, Package as PkgIcon } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Scan: <Scan className="w-6 h-6" />,
  HeartPulse: <HeartPulse className="w-6 h-6" />,
  Scissors: <Scissors className="w-6 h-6" />,
  BedDouble: <BedDouble className="w-6 h-6" />,
  Wind: <Wind className="w-6 h-6" />,
  Package: <PkgIcon className="w-6 h-6" />,
};

export function CategoryPage({ categorySlug }: { categorySlug: string }) {
  const { navigate } = useRouterStore();

  const category = useMemo(
    () => categories.find((c) => c.slug === categorySlug),
    [categorySlug]
  );

  const categoryProducts = useMemo(
    () => products.filter((p) => p.categorySlug === categorySlug),
    [categorySlug]
  );

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Package className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
        <h2 className="text-xl font-bold mb-2">دسته‌بندی یافت نشد</h2>
        <Button variant="outline" onClick={() => navigate({ page: 'home' })}>
          بازگشت به صفحه اصلی
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
        <button onClick={() => navigate({ page: 'home' })} className="hover:text-primary transition-colors">خانه</button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <button onClick={() => navigate({ page: 'shop' })} className="hover:text-primary transition-colors">فروشگاه</button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <span className="text-foreground font-medium">{category.name}</span>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-bl from-primary/5 to-transparent dark:from-teal-950/30 rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 dark:bg-teal-900/30 flex items-center justify-center text-primary dark:text-teal-400 shrink-0">
            {iconMap[category.icon]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">{category.nameEn}</p>
            <p className="text-sm text-foreground/70 mt-3 leading-7">{category.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {category.subcategories.map((sub) => (
                <Badge key={sub.slug} variant="secondary" className="text-xs">
                  {sub.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Text */}
      <div className="mb-8 p-4 bg-muted/30 rounded-xl">
        <h2 className="text-sm font-bold mb-2">خرید {category.name} با بهترین قیمت</h2>
        <p className="text-xs text-muted-foreground leading-6">
          آی‌آرامیس ارائه‌دهنده انواع {category.name} از معتبرترین برندهای جهان است.
          تمامی محصولات دارای گارانتی معتبر و خدمات پس از فروش می‌باشند. برای مشاوره رایگان
          خرید {category.name} با کارشناسان ما تماس بگیرید.
        </p>
      </div>

      {/* Products */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">
          {categoryProducts.length} محصول در دسته‌بندی {category.name}
        </h2>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/20 mb-3" />
          <p className="text-sm text-muted-foreground">محصولی در این دسته‌بندی یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}