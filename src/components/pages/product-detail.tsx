'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { posts } from '@/data/posts';
import { useRouterStore } from '@/stores/router';
import { useCartStore } from '@/stores/cart';
import { formatPrice } from '@/lib/helpers';
import { ProductCard } from '@/components/shared/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Package,
  ChevronLeft,
  Check,
  X as XIcon,
  Truck,
  Shield,
  RotateCcw,
  Building2,
  Copy,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProductDetailPage({ slug }: { slug: string }) {
  const { navigate } = useRouterStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [slug]
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Package className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
        <h2 className="text-xl font-bold mb-2">محصول یافت نشد</h2>
        <p className="text-sm text-muted-foreground mb-4">محصول مورد نظر شما وجود ندارد یا حذف شده است.</p>
        <Button variant="outline" onClick={() => navigate({ page: 'shop' })}>
          بازگشت به فروشگاه
        </Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const relatedPosts = posts
    .filter((p) => p.relatedProducts?.includes(product.slug))
    .slice(0, 3);

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const specs = Object.entries(product.specifications);
  const allImages = [product.image, ...product.images];

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: 'افزوده به سبد خرید',
      description: `${product.name} به سبد خرید اضافه شد.`,
    });
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/products/${product.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: 'لینک کپی شد', description: 'لینک محصول در کلیپبورد ذخیره شد.' });
    } catch {
      toast({ title: 'خطا', description: 'امکان کپی لینک وجود ندارد.', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
        <button
          onClick={() => navigate({ page: 'home' })}
          className="hover:text-primary transition-colors"
        >
          خانه
        </button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <button
          onClick={() => navigate({ page: 'shop' })}
          className="hover:text-primary transition-colors"
        >
          فروشگاه
        </button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <button
          onClick={() =>
            navigate({ page: 'category', categorySlug: product.categorySlug })
          }
          className="hover:text-primary transition-colors"
        >
          {product.category}
        </button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      {/* Main Product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted/50 rounded-2xl flex items-center justify-center border overflow-hidden relative">
            <img
              src={`/api/placeholder?text=${encodeURIComponent(product.nameEn)}&w=500&h=500`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-sm font-bold">
                {discountPercent}%
              </div>
            )}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {allImages.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square bg-muted/30 rounded-lg flex items-center justify-center border-2 transition-all overflow-hidden ${
                  selectedImage === i
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                <img
                  src={`/api/placeholder?text=${encodeURIComponent(product.nameEn + (i > 0 ? ` ${i}` : ''))}&w=100&h=100`}
                  alt={`${product.name} - تصویر ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {product.isNew && (
                <Badge className="bg-teal-500 text-white">جدید</Badge>
              )}
              {discountPercent > 0 && (
                <Badge className="bg-red-500 text-white">
                  {discountPercent}% تخفیف
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="bg-amber-500 text-white">پرفروش</Badge>
              )}
              <Badge variant="outline" className="text-xs">{product.brand}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {product.nameEn} | {product.subcategory}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200 dark:text-gray-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} نظر)
            </span>
          </div>

          <Separator />

          {/* Price Card */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">قیمت:</span>
                <div className="text-left">
                  {product.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)} تومان
                    </p>
                  )}
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}{' '}
                    <span className="text-sm font-normal">تومان</span>
                  </p>
                </div>
              </div>
              {product.originalPrice && discountPercent > 0 && (
                <p className="text-xs text-green-600 font-medium">
                  {formatPrice(product.originalPrice - product.price)} تومان صرفه‌جویی
                </p>
              )}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
                    <Check className="w-4 h-4" /> موجود در انبار
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-sm text-red-500 font-medium">
                    <XIcon className="w-4 h-4" /> ناموجود
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1 h-12"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 ml-2" />
                  {product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={handleShare}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Service badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Truck className="w-5 h-5" />, text: 'ارسال رایگان' },
              { icon: <Shield className="w-5 h-5" />, text: 'ضمانت اصالت' },
              { icon: <RotateCcw className="w-5 h-5" />, text: '۷ روز مرجوعی' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center gap-1 text-center p-3 bg-muted/50 rounded-lg"
              >
                <span className="text-primary">{item.icon}</span>
                <span className="text-xs text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Short description */}
          <p className="text-sm text-muted-foreground leading-7">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Tabs: Description, Specs, Hospital Usage, FAQ */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start flex-wrap">
          <TabsTrigger value="description">توضیحات</TabsTrigger>
          <TabsTrigger value="specs">مشخصات فنی</TabsTrigger>
          <TabsTrigger value="hospital-usage">کاربرد بیمارستانی</TabsTrigger>
          <TabsTrigger value="faq">سوالات متداول</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="leading-8 text-foreground/80">{product.description}</p>
              {product.features.length > 0 && (
                <>
                  <h3 className="font-bold mt-6 mb-3 text-lg">ویژگی‌های کلیدی:</h3>
                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specs" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-sm font-bold text-right w-1/3">مشخصه</th>
                    <th className="px-4 py-3 text-sm font-bold text-right">مقدار</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map(([key, value], i) => (
                    <tr
                      key={key}
                      className={i % 2 === 0 ? 'bg-muted/20' : 'bg-background'}
                    >
                      <td className="px-4 py-3 text-sm font-medium border-b border-border/50">
                        {key}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground/80 border-b border-border/50">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hospital-usage" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">کاربرد در بیمارستان</h3>
                  <p className="leading-8 text-foreground/80">
                    {product.hospitalUsage}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible>
                <AccordionItem value="q1">
                  <AccordionTrigger>آیا این محصول گارانتی دارد؟</AccordionTrigger>
                  <AccordionContent>
                    بله، تمامی محصولات آی‌آرامیس دارای گارانتی معتبر از شرکت سازنده و خدمات پس از فروش اختصاصی هستند. مدت گارانتی بسته به نوع محصول بین ۱ تا ۳ سال متغیر است.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger>زمان تحویل چقدر است؟</AccordionTrigger>
                  <AccordionContent>
                    تحویل در تهران ۱ تا ۳ روز کاری و شهرستان‌ها ۳ تا ۷ روز کاری می‌باشد. برای تجهیزات سنگین، زمان نصب و راه‌اندازی نیز به زمان تحویل اضافه می‌شود.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>آیا نصب و راه‌اندازی انجام می‌شود؟</AccordionTrigger>
                  <AccordionContent>
                    بله، برای تمامی تجهیزات سنگین و تخصصی، نصب و راه‌اندازی رایگان توسط تیم فنی مجرب ما در محل انجام می‌شود. همچنین آموزش رایگان به پرسنل بیمارستان ارائه می‌گردد.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                  <AccordionTrigger>آیا امکان خرید اقساطی وجود دارد؟</AccordionTrigger>
                  <AccordionContent>
                    بله، برای خریدهای بالای ۱۰۰ میلیون تومان امکان خرید اقساطی با چک و شرایط ویژه برای بیمارستان‌ها و مراکز درمانی فراهم است. برای اطلاعات بیشتر با واحد فروش تماس بگیرید.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">محصولات مرتبط</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate({ page: 'category', categorySlug: product.categorySlug })}>
              مشاهده همه
              <ChevronLeft className="w-4 h-4 mr-1 rotate-180" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6">مقالات مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((post) => (
              <Card
                key={post.id}
                className="cursor-pointer hover:shadow-md transition-all group"
                onClick={() => navigate({ page: 'blog-post', slug: post.slug })}
              >
                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-[10px] mb-2">
                    {post.category}
                  </Badge>
                  <h3 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {post.date} | {post.readTime} دقیقه مطالعه
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}