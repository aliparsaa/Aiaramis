'use client';

import { useState } from 'react';
import { useRouterStore } from '@/stores/router';
import { useLeadStore } from '@/stores/cart';
import { categories } from '@/data/categories';
import { Stethoscope, Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { navigate } = useRouterStore();
  const addEmail = useLeadStore((s) => s.addEmail);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      addEmail(email, 'footer-newsletter');
      setEmail('');
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 mt-auto">
      {/* Newsletter */}
      <div className="bg-primary dark:bg-teal-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white text-center md:text-right">
              <h3 className="text-lg font-bold">عضویت در خبرنامه</h3>
              <p className="text-sm text-white/80 mt-1">
                از جدیدترین تجهیزات پزشکی و مقالات آموزشی مطلع شوید
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-2 w-full max-w-md">
              <Input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30"
              />
              <Button type="submit" variant="secondary" className="shrink-0">
                {subscribed ? '✓ ثبت شد' : 'عضویت'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">AiAramis</span>
            </div>
            <p className="text-sm leading-7 text-slate-400">
              آی‌آرامیس مرجع خرید تجهیزات پزشکی و بیمارستانی با بیش از ۱۰۰۰
              محصول از معتبرترین برندهای جهان. ما به بیمارستان‌ها، کلینیک‌ها و
              مراکز درمانی سراسر ایران خدمات ارائه می‌دهیم.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => navigate({ page: 'category', categorySlug: cat.slug })}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2">
              {[
                { label: 'صفحه اصلی', page: 'home' as const },
                { label: 'فروشگاه', page: 'shop' as const },
                { label: 'وبلاگ پزشکی', page: 'blog' as const },
                { label: 'درباره ما', page: 'about' as const },
                { label: 'تماس با ما', page: 'contact' as const },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigate({ page: item.page })}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>info@aiaramis.ir</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Medical disclaimer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <p className="text-xs text-slate-500 text-center leading-6">
            <strong>سلب مسئولیت پزشکی:</strong> اطلاعات موجود در این وب‌سایت
            صرفاً جنبه آموزشی و اطلاع‌رسانی دارد و جایگزین مشاوره پزشکی
            تخصصی نیست. قبل از خرید هرگونه تجهیزات پزشکی، با متخصصان مشورت
            نمایید.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-slate-500">
            © ۱۴۰۳ آی‌آرامیس - تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-slate-500">
            AiAramis.ir - فروشگاه آنلاین تجهیزات پزشکی
          </p>
        </div>
      </div>
    </footer>
  );
}