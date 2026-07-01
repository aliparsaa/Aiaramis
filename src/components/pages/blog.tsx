'use client';

import { useState, useMemo } from 'react';
import { posts } from '@/data/posts';
import { categories } from '@/data/categories';
import { useRouterStore } from '@/stores/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, BookOpen, ChevronLeft, Clock, Tag } from 'lucide-react';

const blogCategories = [
  { name: 'همه', slug: 'all' },
  { name: 'راهنمای تجهیزات', slug: 'equipment-guide' },
  { name: 'راهنمای خرید', slug: 'buying-guide' },
  { name: 'دانستنی‌های پزشکی', slug: 'medical-knowledge' },
  { name: 'کاربرد تجهیزات', slug: 'equipment-usage' },
];

export function BlogPage() {
  const { navigate } = useRouterStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let result = [...posts];
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.title.includes(searchQuery) ||
          p.summary.includes(searchQuery) ||
          p.tags.some((t) => t.includes(searchQuery))
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-teal-900/30 text-primary dark:text-teal-400 rounded-full px-4 py-1.5 text-sm mb-4">
          <BookOpen className="w-4 h-4" />
          وبلاگ پزشکی
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">مقالات و آموزش‌های پزشکی</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          جدیدترین مقالات آموزشی در زمینه تجهیزات پزشکی، راهنمای خرید و دانش پزشکی
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="جستجو در مقالات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {blogCategories.map((cat) => (
          <Button
            key={cat.slug}
            variant={selectedCategory === cat.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat.slug)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/20 mb-3" />
          <p className="text-sm text-muted-foreground">مقاله‌ای یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="cursor-pointer hover:shadow-md transition-all overflow-hidden group"
              onClick={() => navigate({ page: 'blog-post', slug: post.slug })}
            >
              <div className="aspect-video bg-muted/50 flex items-center justify-center relative overflow-hidden">
                <BookOpen className="w-10 h-10 text-muted-foreground/20" />
                <Badge className="absolute top-3 right-3 text-[10px]">
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-6">
                  {post.summary}
                </p>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime} دقیقه
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-primary h-7"
                  >
                    ادامه مطلب
                    <ChevronLeft className="w-3 h-3 mr-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}