'use client';

import { Suspense, useState } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lock, Mail, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || 'Credenciais inválidas. Acesso restrito.');
        setLoading(false);
        return;
      }

      // Redirecionamento seguro
      const target = redirectParam || data.redirect || '/dashboard';
      router.push(target);
      router.refresh();
    } catch {
      setErrorMsg('Falha de conexão com o servidor de autenticação.');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-[#1F2937] bg-[#111827] shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-none border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl font-black text-white">Área Restrita</CardTitle>
        <CardDescription className="text-gray-400 text-xs">
          Acesso seguro para administradores e clientes cadastrados no Pulso 24.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {errorMsg && (
          <div className="flex items-start gap-2 border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-300 block mb-1.5">
              E-mail de Acesso
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-[#0B0F19] border border-[#1F2937] pl-9 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-300 block mb-1.5">
              Senha de Segurança
            </label>
            <div className="relative">
              <Lock className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0B0F19] border border-[#1F2937] pl-9 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full mt-2 font-semibold"
            disabled={loading}
          >
            {loading ? 'Validando Acesso...' : 'Entrar no Sistema'}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </form>

        <div className="pt-3 border-t border-[#1F2937] text-center">
          <p className="text-[11px] text-gray-500">
            Ambiente monitorado e protegido por criptografia de ponta a ponta.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center items-center px-4 py-12 bg-grid">
      <div className="mb-8">
        <Link href="/">
          <Logo size="lg" />
        </Link>
      </div>

      <Suspense fallback={
        <div className="text-xs text-gray-500">Carregando formulário seguro...</div>
      }>
        <LoginForm />
      </Suspense>

      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-gray-500 hover:text-emerald-400 transition-colors">
          ← Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
