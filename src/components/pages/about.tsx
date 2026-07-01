'use client';

import { Stethoscope, Users, Award, ShieldCheck, Target, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-teal-900/30 text-primary dark:text-teal-400 rounded-full px-4 py-1.5 text-sm mb-4">
          <Stethoscope className="w-4 h-4" />
          درباره ما
        </div>
        <h1 className="text-2xl md:text-3xl font-bold">درباره آی‌آرامیس</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto leading-7">
          آی‌آرامیس (AiAramis.ir) مرجع تخصصی فروش آنلاین تجهیزات پزشکی و بیمارستانی در ایران است
        </p>
      </div>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/80 leading-8">
        <p>
          آی‌آرامیس با هدف ارائه تجهیزات پزشکی با کیفیت و با قیمت مناسب به بیمارستان‌ها،
          کلینیک‌ها، مراکز درمانی و مطب‌های پزشکی تاسیس شده است. ما با همکاری مستقیم با
          معتبرترین برندهای جهانی تجهیزات پزشکی، محصولات اصل و دارای گارانتی معتبر را
          در اختیار مشتریان قرار می‌دهیم.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
        {[
          { icon: <ShieldCheck className="w-8 h-8" />, title: 'تضمین اصالت', desc: 'تمامی محصولات اصل و دارای گارانتی' },
          { icon: <Users className="w-8 h-8" />, title: 'تیم متخصص', desc: 'کارشناسان مجرب در حوزه تجهیزات پزشکی' },
          { icon: <Award className="w-8 h-8" />, title: 'بهترین قیمت', desc: 'قیمت‌های رقابتی و تخفیف‌های ویژه' },
          { icon: <Target className="w-8 h-8" />, title: 'مشاوره تخصصی', desc: 'راهنمایی رایگان در انتخاب تجهیزات' },
          { icon: <Heart className="w-8 h-8" />, title: 'خدمات پس از فروش', desc: 'پشتیبانی و سرویس دوره‌ای' },
          { icon: <Stethoscope className="w-8 h-8" />, title: 'تنوع محصولات', desc: 'بیش از ۱۰۰۰ محصول از برندهای معتبر' },
        ].map((item) => (
          <Card key={item.title} className="text-center">
            <CardContent className="p-6 space-y-3">
              <div className="text-primary dark:text-teal-400 flex justify-center">{item.icon}</div>
              <h3 className="font-bold text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/30 rounded-2xl p-6 md:p-8 text-center">
        <h2 className="text-xl font-bold mb-4">چرا آی‌آرامیس؟</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 leading-8">
          <p>
            با سال‌ها تجربه در حوزه تجهیزات پزشکی، تیم آی‌آرامیس درک عمیقی از نیازهای
            بیمارستان‌ها و مراکز درمانی دارد. ما نه تنها محصولات را می‌فروشیم، بلکه
            مشاوره تخصصی، نصب و راه‌اندازی، آموزش و خدمات پس از فروش را نیز ارائه می‌دهیم.
            هدف ما ارتقای سطح خدمات درمانی کشور با ارائه بهترین تجهیزات به قیمت مناسب است.
          </p>
        </div>
      </div>
    </div>
  );
}