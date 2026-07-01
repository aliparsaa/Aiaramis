'use client';

import { useMemo } from 'react';
import { posts } from '@/data/posts';
import { products } from '@/data/products';
import { useRouterStore } from '@/stores/router';
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
import {
  ChevronLeft,
  Calendar,
  Clock,
  User,
  BookOpen,
  AlertTriangle,
} from 'lucide-react';

export function BlogPostPage({ slug }: { slug: string }) {
  const { navigate } = useRouterStore();

  const post = useMemo(() => posts.find((p) => p.slug === slug), [slug]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
        <h2 className="text-xl font-bold mb-2">مقاله یافت نشد</h2>
        <Button variant="outline" onClick={() => navigate({ page: 'blog' })}>
          بازگشت به وبلاگ
        </Button>
      </div>
    );
  }

  const relatedProducts = products.filter((p) =>
    post.relatedProducts?.includes(p.slug)
  );

  const relatedPosts = posts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.categorySlug === post.categorySlug ||
          p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
        <button onClick={() => navigate({ page: 'home' })} className="hover:text-primary">خانه</button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <button onClick={() => navigate({ page: 'blog' })} className="hover:text-primary">وبلاگ</button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
      </div>

      {/* Article Header */}
      <article>
        <div className="mb-6">
          <Badge variant="secondary" className="mb-3">{post.category}</Badge>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" /> {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {post.readTime} دقیقه مطالعه
            </span>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-primary/5 dark:bg-teal-950/30 border border-primary/10 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary mb-1">خلاصه هوشمند</h3>
              <p className="text-sm text-foreground/70 leading-6">{post.summary}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-sm dark:prose-invert max-w-none mb-8
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:leading-8 [&_p]:text-foreground/80 [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pr-6 [&_ul]:mb-4 [&_ul]:space-y-1
            [&_li]:text-foreground/80
            [&_table]:w-full [&_table]:border-collapse [&_table]:mb-6
            [&_thead]:bg-muted/50
            [&_th]:px-4 [&_th]:py-3 [&_th]:text-right [&_th]:text-sm [&_th]:font-bold [&_th]:border [&_th]:border-border
            [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:border [&_td]:border-border [&_td]:text-foreground/80
            [&_strong]:text-foreground
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Separator className="my-8" />

        {/* FAQ */}
        {post.faq.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">سوالات متداول</h2>
            <Accordion type="single" collapsible>
              {post.faq.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-right text-sm">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-foreground/70 leading-7">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Medical Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">
                سلب مسئولیت پزشکی
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-6">
                محتوای این مقاله صرفاً جنبه آموزشی و اطلاع‌رسانی دارد و جایگزین مشاوره
                پزشکی تخصصی نیست. قبل از خرید هرگونه تجهیزات پزشکی، با متخصصان و
                پزشکان مشورت نمایید.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">محصولات مرتبط</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">مقالات مرتبط</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((p) => (
              <Card
                key={p.id}
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate({ page: 'blog-post', slug: p.slug })}
              >
                <CardContent className="p-4 space-y-2">
                  <Badge variant="secondary" className="text-[10px]">{p.category}</Badge>
                  <h3 className="text-sm font-bold line-clamp-2">{p.title}</h3>
                  <p className="text-xs text-muted-foreground">{p.date} | {p.readTime} دقیقه</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}