import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'AiAramis | فروشگاه آنلاین تجهیزات پزشکی و بیمارستانی',
  description: 'آی‌آرامیس، مرجع تخصصی خرید تجهیزات پزشکی، بیمارستانی و آزمایشگاهی از معتبرترین برندهای جهان. سونوگرافی، ECG، مانیتور بیمار، تخت بیمارستانی و صدها محصول دیگر.',
  keywords: 'تجهیزات پزشکی, بیمارستانی, سونوگرافی, ECG, مانیتور بیمار, تخت بیمارستانی, ونتیلاتور, لاپاراسکوپی, استپلر جراحی, CT Scan',
  authors: [{ name: 'AiAramis Team' }],
  icons: { icon: '/logo.svg' },
  openGraph: {
    title: 'AiAramis | فروشگاه آنلاین تجهیزات پزشکی',
    description: 'مرجع تخصصی خرید تجهیزات پزشکی و بیمارستانی',
    siteName: 'AiAramis',
    type: 'website',
    locale: 'fa_IR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AiAramis | فروشگاه آنلاین تجهیزات پزشکی',
    description: 'مرجع تخصصی خرید تجهیزات پزشکی و بیمارستانی',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col" style={{ fontFamily: "'Vazirmatn', system-ui, sans-serif" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}