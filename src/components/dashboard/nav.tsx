'use client';

import { useState } from 'react';
import { Bell, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

const DEMO_CLIENTS = [
  { id: 'advocacia', label: 'Cliente 1: Escritório de Advocacia', color: 'emerald' },
  { id: 'moveis', label: 'Cliente 2: Loja de Móveis Planejados', color: 'cyan' },
] as const;

type DemoClient = typeof DEMO_CLIENTS[number];

export function DashboardNav() {
  const router = useRouter();
  const [activeClient, setActiveClient] = useState<DemoClient>(DEMO_CLIENTS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <header className="border-b border-[#1F2937] bg-[#111827] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <Logo size="sm" />

        {/* Client demo selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 border border-[#1F2937] bg-[#0B0F19] px-3 py-1.5 text-sm text-gray-300 hover:border-emerald-500/40 hover:text-white transition-all"
          >
            <span className={`h-2 w-2 rounded-full ${
              activeClient.color === 'emerald' ? 'bg-emerald-400' : 'bg-cyan-400'
            }`} />
            <span className="hidden sm:block max-w-[200px] truncate">{activeClient.label}</span>
            <span className="sm:hidden">Demo</span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-72 border border-[#1F2937] bg-[#111827] z-50 shadow-xl">
              {DEMO_CLIENTS.map((client) => (
                <button
                  key={client.id}
                  onClick={() => { setActiveClient(client); setDropdownOpen(false); }}
                  className={`w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-[#1F2937] transition-colors ${
                    activeClient.id === client.id ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full flex-shrink-0 ${
                    client.color === 'emerald' ? 'bg-emerald-400' : 'bg-cyan-400'
                  }`} />
                  {client.label}
                  {activeClient.id === client.id && (
                    <Badge variant="default" className="ml-auto text-[10px]">Ativo</Badge>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
