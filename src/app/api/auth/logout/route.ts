import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('pulso24_session');

  // Also remove common supabase auth cookies
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');

  return NextResponse.json({ success: true, redirect: '/login' });
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete('pulso24_session');
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');

  const url = new URL(request.url);
  url.pathname = '/login';
  return NextResponse.redirect(url);
}
