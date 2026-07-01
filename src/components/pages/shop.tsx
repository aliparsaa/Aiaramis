'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/helpers';
import { ProductCard } from '@/components/shared/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  SlidersHorizontal,
  X,
  Package,
} from 'lucide-react';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

interface FilterPanelProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  allCategories: { name: string; count: number }[];
  allBrands: string[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}

function FilterPanel({
  searchQuery, setSearchQuery,
  selectedCategories, toggleCategory,
  selectedBrands, toggleBrand,
  priceRange, setPriceRange,
  allCategories, allBrands,
  hasActiveFilters, clearFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-bold mb-3">جستجو</h4>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="نام محصول..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9"
          />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-bold mb-3">دسته‌بندی</h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {allCategories.map((cat) => (
            <label key={cat.name} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(cat.name)}
                onCheckedChange={() => toggleCategory(cat.name)}
              />
              <span className="text-sm">{cat.name}</span>
              <span className="text-xs text-muted-foreground mr-auto">
                ({cat.count})
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-bold mb-3">برند</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {allBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-bold mb-3">محدوده قیمت (تومان)</h4>
        <Slider
          value={priceRange}
          min={0}
          max={5000000000}
          step={10000000}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          className="mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4 ml-1" />
          پاک کردن فیلترها
        </Button>
      )}
    </div>
  );
}

interface ShopPageProps {
  initialSearch?: string;
}

export function ShopPage({ initialSearch }: ShopPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000000]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const allCategories = useMemo(() =>
    [...new Set(products.map((p) => p.category))].map(name => ({
      name,
      count: products.filter(p => p.category === name).length,
    })),
  []);

  const allBrands = [...new Set(products.map((p) => p.brand))];

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery;
      const lower = q.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.includes(q) ||
          p.nameEn.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower) ||
          p.subcategory.includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: result.sort((a, b) => (a.isNew ? -1 : b.isNew ? 1 : 0)); break;
    }
    return result;
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 5000000000]);
  };

  const hasActiveFilters =
    !!searchQuery ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000000000;

  const filterProps: FilterPanelProps = {
    searchQuery, setSearchQuery,
    selectedCategories, toggleCategory,
    selectedBrands, toggleBrand,
    priceRange, setPriceRange,
    allCategories, allBrands,
    hasActiveFilters, clearFilters,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">فروشگاه تجهیزات پزشکی</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredProducts.length} محصول یافت شد
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="w-4 h-4 ml-1" />
                فیلتر
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>فیلتر محصولات</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterPanel {...filterProps} />
              </div>
            </SheetContent>
          </Sheet>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">جدیدترین</SelectItem>
              <SelectItem value="popular">محبوب‌ترین</SelectItem>
              <SelectItem value="price-asc">ارزان‌ترین</SelectItem>
              <SelectItem value="price-desc">گران‌ترین</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {searchQuery && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery('')}>
              جستجو: {searchQuery} <X className="w-3 h-3 mr-1" />
            </Badge>
          )}
          {selectedCategories.map((cat) => (
            <Badge key={cat} variant="secondary" className="cursor-pointer" onClick={() => toggleCategory(cat)}>
              {cat} <X className="w-3 h-3 mr-1" />
            </Badge>
          ))}
          {selectedBrands.map((brand) => (
            <Badge key={brand} variant="secondary" className="cursor-pointer" onClick={() => toggleBrand(brand)}>
              {brand} <X className="w-3 h-3 mr-1" />
            </Badge>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < 5000000000) && (
            <Badge variant="secondary" className="cursor-pointer" onClick={() => setPriceRange([0, 5000000000])}>
              {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])} تومان <X className="w-3 h-3 mr-1" />
            </Badge>
          )}
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <Card>
            <CardContent className="p-4">
              <FilterPanel {...filterProps} />
            </CardContent>
          </Card>
        </aside>
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
              <h3 className="text-lg font-medium mb-2">محصولی یافت نشد</h3>
              <p className="text-sm text-muted-foreground mb-4">فیلترهای خود را تغییر دهید</p>
              <Button variant="outline" onClick={clearFilters}>پاک کردن فیلترها</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}