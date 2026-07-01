'use client';

import { useState } from 'react';
import { useRouterStore } from '@/stores/router';
import { useCartStore } from '@/stores/cart';
import { formatPrice } from '@/lib/helpers';
import type { Product } from '@/types';
import { Star, ShoppingCart, Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { navigate } = useRouterStore();
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();
  const [quickView, setQuickView] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast({
      title: 'افزوده به سبد خرید',
      description: `${product.name} به سبد خرید اضافه شد.`,
    });
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const imgSrc = imgError
    ? null
    : `/api/placeholder?text=${encodeURIComponent(product.nameEn)}&w=300&h=300`;

  return (
    <>
      <div
        className="product-card bg-card rounded-xl border border-border overflow-hidden cursor-pointer group"
        onClick={() => navigate({ page: 'product', slug: product.slug })}
      >
        {/* Image */}
        <div className="relative aspect-square bg-muted/50 flex items-center justify-center overflow-hidden">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <Package className="w-16 h-16 text-muted-foreground/30" />
          )}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-teal-500 text-white text-[10px] px-2 py-0.5">
                جدید
              </Badge>
            )}
            {discountPercent > 0 && (
              <Badge className="bg-red-500 text-white text-[10px] px-2 py-0.5">
                {discountPercent}% تخفیف
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-amber-500 text-white text-[10px] px-2 py-0.5">
                پرفروش
              </Badge>
            )}
          </div>
          <div className="absolute bottom-3 left-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 shadow-lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setQuickView(true);
              }}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 md:p-4 space-y-2">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="text-sm font-medium line-clamp-2 min-h-[40px] leading-6">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 hidden sm:block">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              {product.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-sm font-bold text-primary">
                {formatPrice(product.price)}
                <span className="text-xs font-normal text-muted-foreground mr-1">
                  تومان
                </span>
              </p>
            </div>
            <Button
              size="sm"
              className="h-8 text-xs"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'افزودن' : 'ناموجود'}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={quickView} onOpenChange={setQuickView}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={`/api/placeholder?text=${encodeURIComponent(product.nameEn)}&w=250&h=250`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{product.brand} | {product.nameEn}</p>
              <p className="text-sm text-foreground/80 leading-6">{product.shortDescription}</p>
              <div className="flex items-center gap-1 pt-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm">{product.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({product.reviewCount} نظر)
                </span>
              </div>
              {product.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)} تومان
                </p>
              )}
              <p className="text-lg font-bold text-primary">
                {formatPrice(product.price)} تومان
              </p>
              <Button
                className="w-full mt-2"
                onClick={() => {
                  addItem(product);
                  setQuickView(false);
                  toast({
                    title: 'افزوده به سبد خرید',
                    description: `${product.name} به سبد خرید اضافه شد.`,
                  });
                }}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 ml-2" />
                {product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setQuickView(false);
                  navigate({ page: 'product', slug: product.slug });
                }}
              >
                مشاهده جزئیات
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}