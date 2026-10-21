'use client';

import {
  Menu,
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Bot,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardView } from '@/contexts/dashboard-view-context';
import { useTenant } from '@/contexts/tenant-context';

export function Topbar() {
  const {
    activeTab,
    crmFilter,
    searchQuery,
    setSearchQuery,
    aiGlobalActive,
    setAiGlobalActive,
    setIsSimulateModalOpen,
    setSidebarOpenMobile,
    setActiveTab,
  } = useDashboardView();

  const { activeTenant } = useTenant();

  // Tab label mapping for breadcrumbs
  const tabNames: Record<string, string> = {
    overview: 'Visão Geral',
    crm: 'CRM & Atendimento',
    brain: 'Cérebro da IA',
    followup: 'Follow-up Automático',
    connection: 'WhatsApp & Faturas',
  };

  const crmFilterNames: Record<string, string> = {
    all: 'Todos os Leads',
    hot: 'Leads Quentes',
    paused: 'Aguardando Humano',
    scheduled: 'Reuniões Agendadas',
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() && activeTab !== 'crm') {
      setActiveTab('crm');
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#0B0F17]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setSidebarOpenMobile(true)}
          className="text-gray-400 hover:text-white lg:hidden p-1.5 -ml-1.5 rounded-sm hover:bg-white/5"
          aria-label="Abrir menu lateral"
        >
          <Menu className="h-5 w-5" />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
          <span className="text-gray-500 hidden sm:inline">Pulso 24</span>
          <ChevronRight className="h-3 w-3 text-gray-600 hidden sm:inline shrink-0" />
          <span className="font-medium text-white truncate">{tabNames[activeTab] || 'Dashboard'}</span>
          {activeTab === 'crm' && crmFilter !== 'all' && (
            <>
              <ChevronRight className="h-3 w-3 text-gray-600 shrink-0" />
              <span className="text-emerald-400 font-medium truncate">
                {crmFilterNames[crmFilter]}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar lead por nome ou WhatsApp..."
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

      {/* Right: Quick AI Status Switch + Simulate Lead Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* AI Status Switch */}
        <button
          onClick={() => setAiGlobalActive((prev) => !prev)}
          className={`flex items-center gap-2 px-2.5 py-1.5 border text-xs font-medium rounded-sm transition-all ${
            aiGlobalActive
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
          }`}
          title={aiGlobalActive ? 'Clique para pausar respostas automáticas' : 'Clique para reativar a IA'}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              aiGlobalActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`}
          />
          <span className="hidden sm:inline">
            {aiGlobalActive ? 'IA Ativa 24/7' : 'IA Pausada'}
          </span>
        </button>

        {/* Quick Test / Simulate Lead */}
        <Button
          onClick={() => setIsSimulateModalOpen(true)}
          size="sm"
          className="text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-8 px-3 rounded-sm shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">+ Novo Teste / Simular Lead</span>
          <span className="sm:hidden">+ Simular</span>
        </Button>
      </div>
    </header>
  );
}
