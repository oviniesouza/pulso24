'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Kanban,
  Brain,
  Timer,
  Wifi,
  ChevronDown,
  ChevronRight,
  Flame,
  UserCheck,
  Calendar,
  Hand,
  ShieldAlert,
  LogOut,
  Zap,
  Activity,
  CreditCard,
  Sliders,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import { Badge } from '@/components/ui/badge';
import { useTenant } from '@/contexts/tenant-context';
import { useDashboardView, type DashboardTab, type CrmFilter } from '@/contexts/dashboard-view-context';
import { getLeads, type Lead } from '@/lib/supabase/service';

export function Sidebar() {
  const router = useRouter();
  const { tenants, activeTenant, setActiveTenant } = useTenant();
  const {
    activeTab,
    setActiveTab,
    crmFilter,
    setCrmFilter,
    sidebarOpenMobile,
    setSidebarOpenMobile,
  } = useDashboardView();

  // Accordion states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    crm: true,
    ai: true,
    operation: true,
  });

  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getLeads(activeTenant.id);
      setLeads(data || []);
    }
    load();
  }, [activeTenant.id]);

  const totalLeads = leads.length;
  const hotCount = leads.filter((l) => l.stage === 'qualificado').length;
  const pausedCount = leads.filter((l) => !l.ai_active).length;
  const scheduledCount = leads.filter((l) => l.stage === 'agendado').length;

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSelectTab = (tab: DashboardTab) => {
    setActiveTab(tab);
    setSidebarOpenMobile(false);
  };

  const handleSelectCrmFilter = (filter: CrmFilter) => {
    setActiveTab('crm');
    setCrmFilter(filter);
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

      {/* Sidebar Container */}
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

        {/* Compact Tenant Selector */}
        <div className="p-3 border-b border-white/10 relative">
          <label className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase px-1 mb-1 block">
            Ambiente / Robô Ativo
          </label>
          <button
            onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-2.5 py-2 bg-[#111827] border border-white/10 hover:border-emerald-500/40 rounded-sm text-left transition-colors group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`h-2 w-2 rounded-full shrink-0 ${
                  activeTenant.whatsapp_connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="text-xs font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                {activeTenant.shortLabel}
              </span>
            </div>
            <ChevronDown
              className={`h-3.5 w-3.5 text-gray-400 shrink-0 transition-transform ${
                tenantDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Tenant Dropdown */}
          {tenantDropdownOpen && (
            <div className="absolute top-full left-3 right-3 mt-1.5 bg-[#111827] border border-white/10 shadow-2xl rounded-sm z-50 py-1 divide-y divide-white/5">
              {tenants.map((tenant) => {
                const isSelected = activeTenant.id === tenant.id;
                return (
                  <button
                    key={tenant.id}
                    onClick={() => {
                      setActiveTenant(tenant);
                      setTenantDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                      isSelected ? 'bg-emerald-500/10 text-white font-medium' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                          tenant.whatsapp_connected ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      />
                      <span className="truncate">{tenant.shortLabel}</span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {/* GROUP 1: VISÃO GERAL */}
          <div>
            <div
              onClick={() => toggleSection('overview')}
              className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <LayoutDashboard className="h-3.5 w-3.5 text-emerald-400" />
                <span>Visão Geral</span>
              </div>
              {openSections.overview ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {openSections.overview && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => handleSelectTab('overview')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Painel de Controle</span>
                  <Activity className="h-3 w-3 opacity-60" />
                </button>
                <button
                  onClick={() => handleSelectTab('overview')}
                  className="w-full flex items-center justify-between text-[11px] px-2.5 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all duration-150 group"
                >
                  <span className="group-hover:text-white transition-colors">• Métricas de Hoje</span>
                  <span className="text-[10px] text-emerald-400 font-semibold group-hover:brightness-125 transition-all">{totalLeads} {totalLeads === 1 ? 'lead' : 'leads'}</span>
                </button>
                <button
                  onClick={() => handleSelectTab('overview')}
                  className="w-full flex items-center justify-between text-[11px] px-2.5 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all duration-150 group"
                >
                  <span className="group-hover:text-white transition-colors">• Desempenho da IA</span>
                  <span className="text-[10px] text-cyan-400 font-semibold group-hover:brightness-125 transition-all">&lt; 8s avg</span>
                </button>
              </div>
            )}
          </div>

          {/* GROUP 2: CRM & ATENDIMENTO */}
          <div>
            <div
              onClick={() => toggleSection('crm')}
              className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Kanban className="h-3.5 w-3.5 text-cyan-400" />
                <span>CRM & Atendimento</span>
              </div>
              {openSections.crm ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {openSections.crm && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => handleSelectCrmFilter('all')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'crm' && crmFilter === 'all'
                      ? 'bg-cyan-500/10 text-cyan-400 font-medium border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Kanban & Chat ao Vivo</span>
                  <Badge variant="outline" className="text-[10px] py-0 px-1 border-white/20">
                    {totalLeads}
                  </Badge>
                </button>
                <button
                  onClick={() => handleSelectCrmFilter('hot')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'crm' && crmFilter === 'hot'
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-amber-400" />
                    <span>🔥 Leads Quentes</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">{hotCount}</span>
                </button>
                <button
                  onClick={() => handleSelectCrmFilter('paused')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'crm' && crmFilter === 'paused'
                      ? 'bg-amber-500/10 text-amber-400 font-medium border-l-2 border-amber-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Hand className="h-3.5 w-3.5 text-amber-400" />
                    <span>✋ Aguardando Humano</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{pausedCount}</span>
                </button>
                <button
                  onClick={() => handleSelectCrmFilter('scheduled')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'crm' && crmFilter === 'scheduled'
                      ? 'bg-cyan-500/10 text-cyan-400 font-medium border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                    <span>📅 Reuniões Agendadas</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-bold">{scheduledCount}</span>
                </button>
              </div>
            )}
          </div>

          {/* GROUP 3: INTELIGÊNCIA (IA) */}
          <div>
            <div
              onClick={() => toggleSection('ai')}
              className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Brain className="h-3.5 w-3.5 text-emerald-400" />
                <span>Inteligência (IA)</span>
              </div>
              {openSections.ai ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {openSections.ai && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => handleSelectTab('brain')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'brain'
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Cérebro & Prompt</span>
                  <Sliders className="h-3 w-3 opacity-60" />
                </button>
                <button
                  onClick={() => handleSelectTab('followup')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'followup'
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border-l-2 border-emerald-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>Follow-up Automático 24/7</span>
                  <Timer className="h-3 w-3 opacity-60" />
                </button>
              </div>
            )}
          </div>

          {/* GROUP 4: OPERAÇÃO & CONTA */}
          <div>
            <div
              onClick={() => toggleSection('operation')}
              className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 py-1 cursor-pointer hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Wifi className="h-3.5 w-3.5 text-cyan-400" />
                <span>Operação & Conta</span>
              </div>
              {openSections.operation ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>

            {openSections.operation && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => handleSelectTab('connection')}
                  className={`w-full flex items-center justify-between text-xs px-2.5 py-1.5 rounded-sm text-left transition-colors ${
                    activeTab === 'connection'
                      ? 'bg-cyan-500/10 text-cyan-400 font-medium border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Conexão WhatsApp (QR Code)</span>
                  </div>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      activeTenant.whatsapp_connected ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                </button>
                <button
                  onClick={() => handleSelectTab('connection')}
                  className="w-full flex items-center justify-between text-xs px-2.5 py-1.5 text-gray-400 hover:bg-white/5 hover:text-white rounded-sm text-left transition-colors"
                >
                  <span>Assinatura & Faturas</span>
                  <CreditCard className="h-3 w-3 opacity-60" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-2.5 bg-[#080B11]">
          {/* Instance Status Card */}
          <div className="p-2.5 bg-[#111827] border border-white/5 rounded-sm text-left">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-gray-400 truncate">
                {activeTenant.whatsapp_instance_name}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online 24/7
              </span>
            </div>
            <p className="text-[10px] text-gray-500">
              Taxa de Resposta:{' '}
              <span className="text-gray-300 font-medium">&lt; 8s</span>
            </p>
          </div>

          {/* Quick CEO / Admin Link */}
          <Link
            href="/admin"
            className="flex items-center justify-between px-2.5 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-colors group"
          >
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-3.5 w-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Sala do CEO (/admin)</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-50" />
          </Link>

          {/* Sair / Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-colors text-left"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sair da Conta</span>
          </button>
        </div>
      </aside>
    </>
  );
}
