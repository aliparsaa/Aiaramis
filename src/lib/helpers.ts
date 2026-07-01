export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price);
}

export function formatPriceWithUnit(price: number): string {
  return `${formatPrice(price)} تومان`;
}

export function slugToPersian(slug: string): string {
  const map: Record<string, string> = {
    'operating-room-equipment': 'تجهیزات اتاق عمل',
    'ecg-buying-guide': 'راهنمای خرید ECG',
    'how-ct-scan-works': 'نحوه کارکرد CT Scan',
    'what-is-ultrasound': 'سونوگرافی چیست',
    'patient-monitor-usage': 'کاربرد مانیتور بیمارستانی',
    'laparoscopy-equipment': 'تجهیزات لاپاراسکوپی',
    'hospital-bed-guide': 'راهنمای خرید تخت بیمارستانی',
    'what-is-holter': 'هولتر قلب چیست',
    'surgical-stapler-guide': 'استپلر جراحی',
    'or-consumables': 'وسایل مصرفی اتاق عمل',
  };
  return map[slug] || slug;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getCategoryIcon(iconName: string): React.ReactNode {
  return null; // Will be handled by the component using Lucide
}

export function getStarRating(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3 && rating % 1 <= 0.7;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}