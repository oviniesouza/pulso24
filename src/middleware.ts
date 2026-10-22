import { NextResponse, type NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('pulso24_session')?.value;

  const session = await verifySessionToken(sessionCookie);

  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isLoginRoute = pathname === '/login';

  // 1. Proteger Rotas do Super Admin (/admin)
  if (isAdminRoute) {
    if (!session || session.role !== 'super_admin') {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Proteger Rotas do Painel do Cliente (/dashboard)
  if (isDashboardRoute) {
    if (!session) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3. Se já autenticado e tentar acessar /login, redirecionar sempre para /dashboard
  if (isLoginRoute && session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.search = '';
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/login',
  ],
};
