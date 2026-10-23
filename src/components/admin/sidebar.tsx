'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Rocket,
  Building2,
  DollarSign,
  TrendingUp,
  Bell,
  ChevronDown,
  ChevronRight,
  Clock,
  Zap,
  CheckCircle2,
  Star,
  Wifi,
  UserPlus,
  BatteryCharging,
  Server,
  ShieldCheck,
  Bot,
  LogOut,
  X,
  CreditCard,
  ArrowRight,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import {
  useAdminView,
  type AdminTab,
  type OnboardingFilter,
  type ClientsFilter,
} from '@/contexts/admin-view-context';

export function AdminSidebar() {
  const router = useRouter();
  const {
    activeTab,
    setActiveTab,
    onboardingFilter,
    setOnboardingFilter,
    clientsFilter,
    setClientsFilter,
    sidebarOpenMobile,
    setSidebarOpenMobile,
    openNewClientModal,
    openRecargaModal,
    onboardingCounts,
    clientCounts,
    mrr,
    netProfit,
    margin,
  } = useAdminView();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    onboarding: true,
    clients: true,
    finance: true,
    bot: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelectTab = (tab: AdminTab) => {
    setActiveTab(tab);
    setSidebarOpenMobile(false);
  };

  const handleSelectOnboarding = (filter: OnboardingFilter) => {
    setActiveTab('onboarding');
    setOnboardingFilter(filter);
    setSidebarOpenMobile(false);
  };

  const handleSelectClients = (filter: ClientsFilter) => {
    setActiveTab('clients');
    setClientsFilter(filter);
    setSidebarOpenMobile(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpenMobile && (
        <div
          onClick={() => setSidebarOpenMobile(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Super Admin Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[260px] bg-[#0B0F17] border-r border-white/10 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header: Logo + Close Mobile Button */}
        <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={() => setSidebarOpenMobile(false)}
            className="text-gray-400 hover:text-white lg:hidden p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* CEO / Super Admin Distinction Pill */}
        <div className="px-3 py-2.5 border-b border-white/10 bg-[#0E131F]">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              MODO CEO / SUPER ADMIN
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-gray-500 mt-0.5 truncate">
            Torre Central de Gestão & Multi-Tenants
          </p>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* GROUP 1: ONBOARDING & ATIVAÇÃO */}
          <div>
            <div
              onClick={() => toggleSection('onboarding')}
              className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Rocket className="h-3.5 w-3.5 text-emerald-400" />
                <span>Onboarding & Ativação</span>
              </div>
              {openSections.onboarding ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {openSections.onboarding && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => handleSelectOnboarding('all')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'onboarding' && onboardingFilter === 'all'
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Fila de Implementação</span>
                  <Badge variant="outline" className="text-[10px] py-0 px-1 border-white/20">
                    {onboardingCounts.total}
                  </Badge>
                </button>
                <button
                  onClick={() => handleSelectOnboarding('waiting')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'onboarding' && onboardingFilter === 'waiting'
                      ? 'bg-amber-500/10 text-amber-400 font-medium border-l-2 border-amber-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>⏳ Pendentes</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">{onboardingCounts.waiting}</span>
                </button>
                <button
                  onClick={() => handleSelectOnboarding('configuring')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'onboarding' && onboardingFilter === 'configuring'
                      ? 'bg-cyan-500/10 text-cyan-400 font-medium border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-cyan-400" />
                    <span>⚙️ Configurando</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold">{onboardingCounts.configuring}</span>
                </button>
                <button
                  onClick={() => handleSelectOnboarding('live')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'onboarding' && onboardingFilter === 'live'
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>🟢 Concluídos / Live</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">{onboardingCounts.live}</span>
                </button>
              </div>
            )}
          </div>

          {/* GROUP 2: CLIENTES (TENANTS) */}
          <div>
            <div
              onClick={() => toggleSection('clients')}
              className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Clientes (Tenants)</span>
              </div>
              {openSections.clients ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {openSections.clients && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => handleSelectClients('all')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'clients' && clientsFilter === 'all'
                      ? 'bg-cyan-500/10 text-cyan-400 font-medium border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Gestão de Clientes</span>
                  <Badge variant="outline" className="text-[10px] py-0 px-1 border-white/20">
                    {clientCounts.total}
                  </Badge>
                </button>
                <button
                  onClick={() => handleSelectClients('founders')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'clients' && clientsFilter === 'founders'
                      ? 'bg-amber-500/10 text-amber-400 font-medium border-l-2 border-amber-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-400" />
                    <span>🌟 Clientes Fundadores</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-bold">{clientCounts.founders}</span>
                </button>
                <button
                  onClick={() => handleSelectClients('evolution')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'clients' && clientsFilter === 'evolution'
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Wifi className="h-3.5 w-3.5 text-emerald-400" />
                    <span>🔌 Status Evolution API</span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </button>
                <button
                  onClick={openNewClientModal}
                  className="w-full flex items-center gap-1.5 text-xs px-2.5 py-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-sm text-left transition-colors font-medium"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>+ Cadastrar Novo Cliente</span>
                </button>
              </div>
            )}
          </div>

          {/* GROUP 3: FINANCEIRO & INFRA */}
          <div>
            <div
              onClick={() => toggleSection('finance')}
              className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                <span>Financeiro & Infra</span>
              </div>
              {openSections.finance ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {openSections.finance && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => handleSelectTab('financial')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'financial'
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Faturamento & MRR</span>
                  </div>
                  <CreditCard className="h-3 w-3 opacity-60" />
                </button>
                <button
                  onClick={() => handleSelectTab('costs')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'costs'
                      ? 'bg-cyan-500/10 text-cyan-400 font-medium border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Server className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Cofre de Custos (OpenAI/VPS)</span>
                  </div>
                </button>
                <button
                  onClick={openRecargaModal}
                  className="w-full flex items-center gap-1.5 text-xs px-2.5 py-1.5 text-cyan-400 hover:bg-cyan-500/10 rounded-sm text-left transition-colors font-medium"
                >
                  <BatteryCharging className="h-3.5 w-3.5" />
                  <span>🔋 Registrar Recarga OpenAI</span>
                </button>
              </div>
            )}
          </div>

          {/* GROUP 4: MEU BOT PESSOAL */}
          <div>
            <div
              onClick={() => toggleSection('bot')}
              className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Bot className="h-3.5 w-3.5 text-cyan-400" />
                <span>Meu Bot Pessoal</span>
              </div>
              {openSections.bot ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {openSections.bot && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => handleSelectTab('alerts')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'alerts'
                      ? 'bg-cyan-500/10 text-cyan-400 font-medium border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Bell className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Alertas no WhatsApp do CEO</span>
                  </div>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-2.5 bg-[#080B11]">
          {/* Resumo Rápido de Lucro Líquido / MRR */}
          <div className="p-2.5 bg-[#111827] border border-white/5 rounded-sm text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 uppercase">MRR Carteira</span>
              <span className="text-xs font-bold text-emerald-400">{formatCurrency(mrr)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 uppercase">Lucro Líquido</span>
              <span className={`text-xs font-bold ${netProfit >= 0 ? 'text-white' : 'text-amber-400'}`}>
                {formatCurrency(netProfit)}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-500 pt-0.5 border-t border-white/5">
              <span>Margem Operacional</span>
              <span className="text-emerald-400 font-bold">{margin}%</span>
            </div>
          </div>

          {/* Atalho Rápido para /dashboard */}
          <Link
            href="/dashboard"
            className="flex items-center justify-between px-2.5 py-1.5 text-xs text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 rounded-sm transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Bot className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span>Ir para Meu Robô (/dashboard)</span>
            </div>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Sair */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors text-left"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sair do Super Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}
