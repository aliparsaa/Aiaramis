// Auto Article Generation Script for AiAramis.ir
// Run with: bun run scripts/generate-articles.ts

import * as fs from 'fs';
import * as path from 'path';

const articleTopics = [
  {
    title: 'دستگاه تنفس مصنوعی (ونتیلاتور) چیست؟',
    slug: 'what-is-ventilator',
    category: 'دانستنی‌های پزشکی',
    categorySlug: 'medical-knowledge',
    summary: 'آشنایی کامل با دستگاه ونتیلاتور، انواع آن، کاربرد در ICU و نحوه عملکرد.',
    readTime: 9,
    relatedProducts: ['ventilator'],
    tags: ['ونتیلاتور', 'تنفس مصنوعی', 'ICU', 'مراقبت ویژه'],
  },
  {
    title: 'راهنمای خرید مانیتور بیمارستانی',
    slug: 'patient-monitor-buying-guide',
    category: 'راهنمای خرید',
    categorySlug: 'buying-guide',
    summary: 'نکات مهم در خرید مانیتور بیمارستانی شامل مشخصات فنی، برندها و قیمت‌ها.',
    readTime: 7,
    relatedProducts: ['patient-monitor', 'pulse-oximeter', 'ecg-device'],
    tags: ['مانیتور بیمار', 'راهنمای خرید', 'ICU', 'مشخصات فنی'],
  },
  {
    title: 'تجهیزات اورژانس بیمارستانی',
    slug: 'emergency-equipment',
    category: 'راهنمای تجهیزات',
    categorySlug: 'equipment-guide',
    summary: 'معرفی کامل تجهیزات اورژانس شامل دفیبریلاتور، مانیتور قابل حمل و سایر ملزومات.',
    readTime: 8,
    relatedProducts: ['defibrillator', 'patient-monitor', 'portable-x-ray'],
    tags: ['اورژانس', 'تجهیزات اورژانس', 'دفیبریلاتور', 'احیا'],
  },
  {
    title: 'اینفیوژن پمپ و کاربردهای آن در بیمارستان',
    slug: 'infusion-pump-guide',
    category: 'کاربرد تجهیزات',
    categorySlug: 'equipment-usage',
    summary: 'توضیح کامل عملکرد اینفیوژن پمپ، انواع آن و کاربرد در بخش‌های مختلف.',
    readTime: 6,
    relatedProducts: ['infusion-pump', 'syringe-pump', 'nebulizer'],
    tags: ['اینفیوژن پمپ', 'تزریق', 'دارو', 'بیمارستان'],
  },
  {
    title: 'آشنایی با تجهیزات رادیولوژی بیمارستانی',
    slug: 'radiology-equipment',
    category: 'دانستنی‌های پزشکی',
    categorySlug: 'medical-knowledge',
    summary: 'معرفی انواع دستگاه‌های رادیولوژی شامل X-Ray، CT Scan و MRI.',
    readTime: 10,
    relatedProducts: ['x-ray-system', 'ct-scan-machine', 'mri-machine'],
    tags: ['رادیولوژی', 'X-Ray', 'CT Scan', 'تصویربرداری'],
  },
];

function generateContent(topic: typeof articleTopics[0]): string {
  return `<h2>مقدمه</h2>
<p>${topic.title} یکی از مهم‌ترین مباحث در حوزه تجهیزات پزشکی است. در این مقاله به بررسی جامع این موضوع می‌پردازیم و اطلاعاتی کاربردی ارائه می‌دهیم.</p>

<h2>تعریف و کاربرد</h2>
<p>این تجهیزات نقش حیاتی در ارائه خدمات درمانی با کیفیت دارند. با پیشرفت فناوری، امکانات این تجهیزات به طور مداوم در حال بهبود است.</p>
<ul>
<li>ارتقای کیفیت خدمات درمانی</li>
<li>کاهش زمان تشخیص و درمان</li>
<li>افزایش ایمنی بیمار</li>
<li>بهینه‌سازی منابع بیمارستانی</li>
</ul>

<h2>مشخصات فنی مهم</h2>
<table>
<thead><tr><th>مشخصه</th><th>استاندارد</th><th>پیشنهاد</th></tr></thead>
<tbody>
<tr><td>کیفیت ساخت</td><td>ISO 13485</td><td>الزامی</td></tr>
<tr><td>گواهینامه</td><td>CE / FDA</td><td>الزامی</td></tr>
<tr><td>خدمات پس از فروش</td><td>حداقل ۲ سال</td><td>الزامی</td></tr>
</tbody>
</table>

<h2>جمع‌بندی</h2>
<p>سرمایه‌گذاری در تجهیزات پزشکی با کیفیت، سرمایه‌گذاری در سلامت بیماران است.</p>`;
}

function generateFAQ(): Array<{question: string, answer: string}> {
  return [
    { question: 'مهم‌ترین نکته در خرید چیست؟', answer: 'خرید از شرکت‌های معتبر و دارای نمایندگی رسمی با گواهینامه‌های CE یا FDA.' },
    { question: 'آیا گارانتی دارند؟', answer: 'بله، تمامی تجهیزات پزشکی معتبر دارای گارانتی و خدمات پس از فروش هستند.' },
    { question: 'هزینه نگهداری چقدر است؟', answer: 'بسته به نوع تجهیز متفاوت است. سرویس دوره‌ای سالانه الزامی است.' },
  ];
}

function getPersianDate(): string {
  const now = new Date();
  return `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
}

function generateArticles() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'posts.ts');
  let content = fs.readFileSync(filePath, 'utf-8');

  const newArticles = articleTopics.map((topic, i) => {
    const faq = generateFAQ();
    const content_html = generateContent(topic);
    const date = getPersianDate();
    const faqStr = JSON.stringify(faq, null, 4).split('\n').map((line: string, idx: number) => idx === 0 ? line : '    ' + line).join('\n');

    return `  {
    id: 'post-auto-${Date.now()}-${i}',
    slug: '${topic.slug}',
    title: '${topic.title}',
    summary: '${topic.summary}',
    content: \`${content_html}\`,
    faq: ${faqStr},
    date: '${date}',
    author: 'تیم تحریریه آی‌آرامیس',
    category: '${topic.category}',
    categorySlug: '${topic.categorySlug}',
    image: '/api/placeholder/800x400?text=${encodeURIComponent(topic.slug)}',
    tags: ${JSON.stringify(topic.tags)},
    relatedProducts: ${JSON.stringify(topic.relatedProducts)},
    readTime: ${topic.readTime},
  }`;
  });

  const lastBrace = content.lastIndexOf('];');
  if (lastBrace === -1) {
    console.error('Could not find ]; in posts.ts');
    return;
  }

  const newContent = content.slice(0, lastBrace) + ',\n' + newArticles.join(',\n') + '\n];';
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Generated ${newArticles.length} new articles!`);
}

generateArticles();