import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-imaging',
    name: 'تجهیزات تصویربرداری',
    nameEn: 'Imaging Equipment',
    slug: 'imaging',
    description:
      'تجهیزات تصویربرداری پزشکی شامل طیف گسترده‌ای از دستگاه‌های تشخیصی هستند که به پزشکان امکان مشاهده دقیق ساختارهای داخلی بدن را می‌دهند. این دستگاه‌ها نقش حیاتی در تشخیص سریع و دقیق بیماری‌ها دارند و بدون آن‌ها امکان درمان صحیح بیماران فراهم نمی‌شود. از سونوگرافی تا ام‌آر‌آی، هر یک از این تجهیزات در بخش‌های مختلف بیمارستان کاربرد اساسی دارند.',
    icon: 'Scan',
    image: `/api/placeholder/600x400?text=${encodeURIComponent('Imaging+Equipment')}`,
    productCount: 5,
    subcategories: [
      { name: 'دستگاه سونوگرافی', slug: 'ultrasound', productCount: 1 },
      { name: 'دستگاه سی‌تی اسکن', slug: 'ct-scan', productCount: 1 },
      { name: 'سیستم رادیولوژی', slug: 'x-ray', productCount: 2 },
      { name: 'دستگاه ام‌آر‌آی', slug: 'mri', productCount: 1 },
    ],
  },
  {
    id: 'cat-monitoring',
    name: 'تجهیزات مانیتورینگ',
    nameEn: 'Monitoring Equipment',
    slug: 'monitoring',
    description:
      'تجهیزات مانیتورینگ پزشکی برای پایش مستمر علائم حیاتی بیماران در بخش‌های مختلف بیمارستان استفاده می‌شوند. این دستگاه‌ها با اندازه‌گیری دقیق ضربان قلب، فشار خون، اکسیژن خون و سایر پارامترها، به کادر درمان کمک می‌کنند تا در زمان مناسب تصمیمات درمانی لازم را اتخاذ نمایند. استفاده از این تجهیزات به‌ویژه در بخش‌های مراقبت ویژه از اهمیت بالایی برخوردار است.',
    icon: 'HeartPulse',
    image: `/api/placeholder/600x400?text=${encodeURIComponent('Monitoring+Equipment')}`,
    productCount: 5,
    subcategories: [
      { name: 'دستگاه ECG', slug: 'ecg', productCount: 1 },
      { name: 'مانیتور بیمار', slug: 'patient-monitor', productCount: 1 },
      { name: 'هولتر قلب', slug: 'holter', productCount: 1 },
      { name: 'پالس اکسیمتر', slug: 'pulse-oximeter', productCount: 1 },
      { name: 'دفیبریلاتور', slug: 'defibrillator', productCount: 1 },
    ],
  },
  {
    id: 'cat-surgical',
    name: 'تجهیزات جراحی',
    nameEn: 'Surgical Equipment',
    slug: 'surgical',
    description:
      'تجهیزات جراحی مجموعه‌ای از ابزارها و دستگاه‌های تخصصی هستند که برای انجام دقیق و ایمن عمل‌های جراحی مورد نیازند. از ابزارهای برش و بخیه تا دستگاه‌های پیشرفته لاپاراسکوپی و میکروسکوپ‌های جراحی، هر یک وظیفه خاصی در اتاق عمل بر عهده دارند. کیفیت این تجهیزات تأثیر مستقیمی بر موفقیت عمل‌های جراحی و سرعت بهبود بیماران دارد.',
    icon: 'Scissors',
    image: `/api/placeholder/600x400?text=${encodeURIComponent('Surgical+Equipment')}`,
    productCount: 6,
    subcategories: [
      { name: 'استپلر جراحی', slug: 'staplers', productCount: 1 },
      { name: 'تجهیزات لاپاراسکوپی', slug: 'laparoscopy', productCount: 1 },
      { name: 'نور اتاق عمل', slug: 'or-lights', productCount: 1 },
      { name: 'دستگاه بیهوشی', slug: 'anesthesia', productCount: 1 },
      { name: 'کاتر جراحی', slug: 'electrosurgical', productCount: 1 },
      { name: 'میکروسکوپ جراحی', slug: 'microscope', productCount: 1 },
    ],
  },
  {
    id: 'cat-furniture',
    name: 'مبلمان بیمارستانی',
    nameEn: 'Hospital Furniture',
    slug: 'furniture',
    description:
      'مبلمان بیمارستانی شامل تخت‌ها، میزها، صندلی‌ها و سایر تجهیزات رفاهی است که راحتی و امنیت بیماران را در طول دوره بستری تضمین می‌کند. این محصولات با رعایت استانداردهای بهداشتی و ارگونومی طراحی شده‌اند تا هم برای بیماران و هم برای کادر درمان شرایط مطلوبی فراهم نمایند. از تخت‌های بخش مراقبت ویژه تا ویلچرها و برانکاردها، هر یک نقش مهمی در خدمات‌رسانی به بیماران ایفا می‌کنند.',
    icon: 'BedDouble',
    image: `/api/placeholder/600x400?text=${encodeURIComponent('Hospital+Furniture')}`,
    productCount: 6,
    subcategories: [
      { name: 'تخت بیمارستانی', slug: 'hospital-beds', productCount: 1 },
      { name: 'تخت ICU', slug: 'icu-beds', productCount: 1 },
      { name: 'تخت معاینه', slug: 'examination-tables', productCount: 1 },
      { name: 'تخت جراحی', slug: 'surgical-tables', productCount: 1 },
      { name: 'ویلچر', slug: 'wheelchairs', productCount: 1 },
      { name: 'برانکارد', slug: 'stretchers', productCount: 1 },
    ],
  },
  {
    id: 'cat-ventilation',
    name: 'تجهیزات تنفسی و پمپ',
    nameEn: 'Ventilation & Pumps',
    slug: 'ventilation',
    description:
      'تجهیزات تنفسی و پمپ‌های تزریق دارو از حیاتی‌ترین ابزارهای بخش مراقبت‌های ویژه و اتاق‌های اورژانس به شمار می‌روند. این دستگاه‌ها وظیفه تأمین اکسیژن و مدیریت دقیق داروهای تزریقی را بر عهده دارند و در نجات جان بیماران نقش تعیین‌کننده‌ای ایفا می‌کنند. عملکرد صحیح و بی‌وقفه این تجهیزات مستقیماً با جان بیماران مرتبط است.',
    icon: 'Wind',
    image: `/api/placeholder/600x400?text=${encodeURIComponent('Ventilation+&+Pumps')}`,
    productCount: 4,
    subcategories: [
      { name: 'ونتیلاتور', slug: 'ventilators', productCount: 1 },
      { name: 'اینفیوژن پمپ', slug: 'infusion-pumps', productCount: 1 },
      { name: 'سرنگ پمپ', slug: 'syringe-pumps', productCount: 1 },
      { name: 'نبولایزر', slug: 'nebulizers', productCount: 1 },
    ],
  },
  {
    id: 'cat-consumables',
    name: 'لوازم مصرفی',
    nameEn: 'Consumables',
    slug: 'consumables',
    description:
      'لوازم مصرفی پزشکی شامل اقزون‌هایی هستند که به‌صورت روزانه و مکرر در مراکز درمانی مصرف می‌شوند و باید همیشه در دسترس باشند. از روپوش‌ها و دستکش‌های جراحی تا الکترودها و سوزن‌ها، این محصولات استانداردهای بهداشتی سخت‌گیرانه‌ای را باید رعایت کنند. تأمین مداوم و باکیفیت این اقلام برای ادامه بدون وقفه خدمات درمانی الزامی است.',
    icon: 'Package',
    image: `/api/placeholder/600x400?text=${encodeURIComponent('Consumables')}`,
    productCount: 4,
    subcategories: [
      { name: 'روپوش جراحی', slug: 'gowns', productCount: 1 },
      { name: 'سوزن و سرنگ', slug: 'needles', productCount: 1 },
      { name: 'الکترود قفسه سینه', slug: 'chest-leads', productCount: 1 },
      { name: 'دستکش پزشکی', slug: 'gloves', productCount: 1 },
    ],
  },
];