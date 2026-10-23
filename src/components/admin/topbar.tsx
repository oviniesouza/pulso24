'use client';

import {
  Menu,
  Search,
  BatteryCharging,
  UserPlus,
  ShieldCheck,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminView } from '@/contexts/admin-view-context';

export function AdminTopbar() {
  const {
    activeTab,
    expenses,
    searchQuery,
    setSearchQuery,
    setSidebarOpenMobile,
    openNewClientModal,
    openRecargaModal,
    setActiveTab,
  } = useAdminView();

  const openAiExp = expenses.find((e) => e.category === 'openai');
  const openAiBal = openAiExp?.balance_remaining !== null && openAiExp?.balance_remaining !== undefined
    ? Number(openAiExp.balance_remaining)
    : 10.0;

  const tabTitles: Record<string, string> = {
    onboarding: 'Fila de Onboarding & Ativação',
    clients: 'Gestão da Carteira de Clientes',
    financial: 'Faturamento, MRR & Lucro Líquido',
    costs: 'Cofre de Custos (OpenAI & VPS)',
    alerts: 'Meu Bot Pessoal (Alertas WhatsApp)',
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() && activeTab !== 'clients') {
      setActiveTab('clients');
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#0B0F17]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle, Section Title & System Health */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setSidebarOpenMobile(true)}
          className="text-gray-400 hover:text-white lg:hidden p-1.5 -ml-1.5 rounded-sm hover:bg-white/5"
          aria-label="Abrir menu lateral"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-white truncate">
              {tabTitles[activeTab]}
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              Todos os sistemas operacionais — Supabase + Evolution API
            </span>
          </div>
        </div>
      </div>

      {/* Center: Executive Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar por cliente, empresa ou WhatsApp..."
            className="w-full bg-[#111827] border border-white/10 pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-[10px] text-gray-500 hover:text-white"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Right: OpenAI Balance Badge & + Novo Cliente Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* OpenAI Balance Badge (Clickable to open recharge modal) */}
        <button
          onClick={openRecargaModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#111827] border border-cyan-500/30 hover:border-cyan-400 rounded-sm text-xs transition-colors group cursor-pointer"
          title="Clique para registrar recarga de créditos OpenAI"
        >
          <BatteryCharging className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="text-gray-400 hidden sm:inline">OpenAI:</span>
          <span className="text-cyan-400 font-bold font-mono">US$ {openAiBal.toFixed(2)}</span>
        </button>

        {/* Quick Action Button: + Novo Cliente */}
        <Button
          onClick={openNewClientModal}
          size="sm"
          className="text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-8 px-3 rounded-sm shadow-sm"
        >
          <UserPlus className="h-3.5 w-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">+ Novo Cliente</span>
          <span className="sm:hidden">+ Cliente</span>
        </Button>
      </div>
    </header>
  );
}
