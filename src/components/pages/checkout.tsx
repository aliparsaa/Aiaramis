'use client';

import { useState } from 'react';
import { useCartStore, useLeadStore } from '@/stores/cart';
import { useRouterStore } from '@/stores/router';
import { formatPrice } from '@/lib/helpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, ChevronLeft, ShoppingBag, CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const addEmail = useLeadStore((s) => s.addEmail);
  const { navigate } = useRouterStore();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'نام و نام خانوادگی الزامی است';
    if (!form.phone.trim()) {
      newErrors.phone = 'شماره تماس الزامی است';
    } else if (!/^[\d\u06F0-\u06F9]{10,11}$/.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'شماره تماس معتبر نیست (مثلاً ۰۹۱۲۱۲۳۴۵۶۷)';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }
    if (!form.address.trim()) newErrors.address = 'آدرس تحویل الزامی است';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);

    if (form.email) addEmail(form.email, 'checkout');

    toast({
      title: 'سفارش شما با موفقیت ثبت شد!',
      description: 'کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت. کد پیگیری برای شما ارسال خواهد شد.',
    });

    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <CheckCircle2 className="w-20 h-20 mx-auto text-green-500 mb-6" />
        <h2 className="text-2xl font-bold mb-3">سفارش شما ثبت شد!</h2>
        <p className="text-muted-foreground mb-2">
          کارشناسان فروش ما در اسرع وقت با شما تماس خواهند گرفت.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          شماره سفارش: <span className="font-mono font-bold">AA-{Date.now().toString().slice(-6)}</span>
        </p>
        <Button onClick={() => navigate({ page: 'home' })} size="lg">
          بازگشت به صفحه اصلی
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
        <h2 className="text-xl font-bold mb-2">سبد خرید خالی است</h2>
        <p className="text-sm text-muted-foreground mb-4">ابتدا محصولات مورد نظر خود را به سبد خرید اضافه کنید.</p>
        <Button onClick={() => navigate({ page: 'shop' })}>مشاهده محصولات</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button onClick={() => navigate({ page: 'home' })} className="hover:text-primary">خانه</button>
        <ChevronLeft className="w-3 h-3 rotate-180" />
        <span className="text-foreground font-medium">تکمیل سفارش</span>
      </nav>

      <h1 className="text-2xl font-bold mb-8">تکمیل سفارش</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">اطلاعات خریدار</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      نام و نام خانوادگی <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                      placeholder="نام کامل خود را وارد کنید"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      شماره تماس <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={form.phone}
                      onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
                      placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                      dir="ltr"
                      className="text-left"
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">ایمیل</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                    placeholder="email@example.com"
                    dir="ltr"
                    className="text-left"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    آدرس تحویل <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    value={form.address}
                    onChange={(e) => { setForm({ ...form, address: e.target.value }); setErrors({ ...errors, address: '' }); }}
                    placeholder="آدرس کامل شامل خیابان، کوچه، پلاک و کد پستی"
                    rows={3}
                  />
                  {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      در حال ثبت سفارش...
                    </>
                  ) : (
                    'ثبت سفارش'
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  این یک صفحه نمایشی است و پرداخت واقعی انجام نمی‌شود.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={`/api/placeholder?text=${encodeURIComponent(item.product.nameEn)}&w=50&h=50`}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} عدد × {formatPrice(item.product.price)} تومان
                    </p>
                  </div>
                  <p className="text-sm font-medium shrink-0 whitespace-nowrap">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
              <Separator />
              {totalPrice() >= 50000000 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">ارسال رایگان</span>
                  <span className="text-green-600 line-through">رایگان</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold">مبلغ کل:</span>
                <span className="font-bold text-primary text-lg">
                  {formatPrice(totalPrice())} تومان
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}