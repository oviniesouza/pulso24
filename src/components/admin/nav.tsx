'use client';

import { Logo } from '@/components/logo';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function AdminNav() {
  return (
    <header className="border-b border-[#1F2937] bg-[#111827] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-400 font-medium rounded-none">
            <Shield className="h-3.5 w-3.5" />
            Super Admin (CEO)
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-xs text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Ver Painel do Cliente
          </Link>
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-red-400 transition-colors"
          >
            Sair
          </Link>
        </div>
      </div>
    </header>
  );
}
