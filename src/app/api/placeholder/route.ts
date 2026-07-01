import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || 'Image';
  const width = parseInt(searchParams.get('w') || '400', 10);
  const height = parseInt(searchParams.get('h') || '400', 10);

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#f1f5f9"/>
    <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">${decodeURIComponent(text)}</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}