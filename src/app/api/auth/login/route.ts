import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  createSessionToken,
  MASTER_ADMIN_EMAILS,
  MASTER_ADMIN_PASSWORD,
} from '@/lib/auth';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '').trim();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Por favor, informe e-mail e senha.' },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    // 1. Verificação de Credenciais do Super Admin / CEO
    const isMasterAdmin = MASTER_ADMIN_EMAILS.includes(email);
    if (isMasterAdmin && password === MASTER_ADMIN_PASSWORD) {
      const token = await createSessionToken({
        email,
        role: 'super_admin',
        expiresInDays: 7,
      });

      cookieStore.set('pulso24_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });

      return NextResponse.json({
        success: true,
        role: 'super_admin',
        redirect: '/admin',
      });
    }

    // 2. Verificação via Supabase Auth (se configurado e acessível)
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      try {
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          {
            cookies: {
              getAll() {
                return cookieStore.getAll();
              },
              setAll(cookiesToSet) {
                try {
                  cookiesToSet.forEach(({ name, value, options }) =>
                    cookieStore.set(name, value, options)
                  );
                } catch {
                  // Ignore in Server Action / Route Handler context
                }
              },
            },
          }
        );

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data.user) {
          const userRole = isMasterAdmin ? 'super_admin' : 'client';
          const token = await createSessionToken({
            email: data.user.email || email,
            role: userRole,
            expiresInDays: 7,
          });

          cookieStore.set('pulso24_session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 7 * 24 * 60 * 60,
          });

          return NextResponse.json({
            success: true,
            role: userRole,
            redirect: userRole === 'super_admin' ? '/admin' : '/dashboard',
          });
        }
      } catch (err) {
        console.warn('Supabase login check failed or unreachable:', err);
      }
    }

    // 3. Credenciais inválidas
    return NextResponse.json(
      {
        success: false,
        message: 'Credenciais inválidas. Verifique seu e-mail e senha.',
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno ao processar autenticação.' },
      { status: 500 }
    );
  }
}
