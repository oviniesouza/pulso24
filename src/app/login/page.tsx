'use client';

import { useState } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Lock, Mail, Shield, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Se as credenciais do Supabase forem inválidas ou placeholder, liberamos modo demo com feedback
        setErrorMsg('Supabase em modo demonstração local: liberando acesso...');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        router.push('/dashboard');
      }
    } catch {
      // Fallback gracioso para visualização
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col justify-center items-center px-4 py-12 bg-grid">
      <div className="mb-8">
        <Link href="/">
          <Logo size="lg" />
        </Link>
      </div>

      <Card className="w-full max-w-md border-[#1F2937] bg-[#111827]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-black text-white">Acesse sua Conta</CardTitle>
          <CardDescription className="text-gray-400">
            Entre com seus dados do Supabase ou use os atalhos de demonstração rápida
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {errorMsg && (
            <div className="border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-400">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSupabaseLogin} className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">E-mail</label>
              <div className="relative">
                <Mail className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] pl-9 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Senha</label>
              <div className="relative">
                <Lock className="h-4 w-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] pl-9 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <Button variant="default" size="lg" className="w-full mt-2" disabled={loading}>
              {loading ? 'Validando...' : 'Entrar com Supabase'}
            </Button>
          </form>

          {/* Atalhos Rápidos para Demonstração do Projeto */}
          <div className="border-t border-[#1F2937] pt-4 space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-gray-500 block text-center font-bold">
              Acesso Rápido de Apresentação
            </span>

            <Button
              variant="outline-emerald"
              className="w-full justify-between"
              onClick={() => router.push('/dashboard')}
            >
              <span>Acessar Painel do Cliente (/dashboard)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              className="w-full justify-between"
              onClick={() => router.push('/admin')}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Acessar Super Admin do CEO (/admin)</span>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-gray-500 hover:text-emerald-400 transition-colors">
          ← Voltar para a Landing Page
        </Link>
      </div>
    </div>
  );
}
