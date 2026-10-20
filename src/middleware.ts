import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Em ambiente local de desenvolvimento, liberamos o acesso direto a todas as telas
  // para que você possa desenvolver, testar e apresentar sem necessidade de criar usuário prévio no auth
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
