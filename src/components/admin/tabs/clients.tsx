'use client';

import { useState, useMemo } from 'react';
import { Eye, Star, Users, TrendingUp, Search, Phone, Wifi, WifiOff, Filter, X, UserPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { useAdminView } from '@/contexts/admin-view-context';

export function ClientsTab() {
  const {
    clientTenants,
    totalLeadsCount,
    mrr,
    clientCounts,
    clientsFilter,
    setClientsFilter,
    searchQuery,
    setSearchQuery,
    openNewClientModal,
  } = useAdminView();

  const [search, setSearch] = useState('');
  const effectiveQuery = searchQuery.trim() || search.trim();

  const filtered = useMemo(() => {
    return clientTenants.filter((c) => {
      // Search text filter
      if (effectiveQuery) {
        const q = effectiveQuery.toLowerCase();
        const matches =
          c.name.toLowerCase().includes(q) ||
          c.niche.toLowerCase().includes(q) ||
          (c.owner_name && c.owner_name.toLowerCase().includes(q)) ||
          (c.owner_phone && c.owner_phone.includes(q));
        if (!matches) return false;
      }

      // Clients filter from sidebar
      if (clientsFilter === 'founders') {
        return Number(c.monthly_price) === 347.0;
      }
      if (clientsFilter === 'evolution') {
        return c.whatsapp_connected;
      }

      return true;
    });
  }, [clientTenants, effectiveQuery, clientsFilter]);

  const liveCount = clientTenants.filter((t) => t.onboarding_status === 'live').length;
  const setupCount = clientTenants.filter((t) => t.onboarding_status !== 'live').length;

  return (
    <div className="space-y-4">
      {/* Active Filter Notification Bar */}
      {(clientsFilter !== 'all' || effectiveQuery) && (
        <div className="flex items-center justify-between p-2.5 bg-[#111827] border border-cyan-500/30 rounded-sm text-xs">
          <div className="flex items-center gap-2 text-cyan-400">
            <Filter className="h-3.5 w-3.5 shrink-0" />
            <span>
              Filtro ativo:{' '}
              <strong className="text-white">
                {clientsFilter === 'founders'
                  ? '🌟 Clientes Fundadores (R$ 347/mês)'
                  : clientsFilter === 'evolution'
                  ? '🔌 Instâncias WhatsApp Conectadas'
                  : 'Filtro Ativo'}
              </strong>
              {effectiveQuery ? ` · Busca: "${effectiveQuery}"` : ''}
              {' '}({filtered.length} clientes encontrados)
            </span>
          </div>
          <button
            onClick={() => {
              setClientsFilter('all');
              setSearchQuery('');
              setSearch('');
            }}
            className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-sm hover:bg-white/5"
          >
            <X className="h-3 w-3" />
            Limpar Filtros
          </button>
        </div>
      )}

      {/* Cards de Métricas Reais do Banco */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          onClick={() => setClientsFilter('all')}
          className="border border-[#1F2937] hover:border-emerald-500/40 bg-[#111827] p-4 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase">Empresas na Base</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-1">{clientCounts.total} Clientes</p>
          <p className="text-xs text-emerald-400 mt-0.5">
            {liveCount} no ar · {setupCount} em setup
          </p>
        </div>

        <div
          onClick={() => setClientsFilter('founders')}
          className="border border-[#1F2937] hover:border-emerald-500/40 bg-[#111827] p-4 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase">MRR da Carteira</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 mt-1">{formatCurrency(mrr)}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Média por cliente: {formatCurrency(clientCounts.total > 0 ? mrr / clientCounts.total : 0)}
          </p>
        </div>

        <div className="border border-[#1F2937] bg-[#111827] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase">Leads Atendidos Mês</span>
            <Star className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-cyan-400 mt-1">{totalLeadsCount} leads</p>
          <p className="text-xs text-gray-400 mt-0.5">Volume real processado pela IA</p>
        </div>
      </div>

      {/* Busca & Ação Rápida */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            value={searchQuery || search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Buscar por cliente, escritório, responsável ou WhatsApp..."
            className="w-full bg-[#111827] border border-[#1F2937] pl-9 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <Button
          onClick={openNewClientModal}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs h-10 px-4"
        >
          <UserPlus className="h-4 w-4 mr-1.5" />
          + Cadastrar Novo Cliente
        </Button>
      </div>

      {/* Lista de Tenants */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-[#1F2937]">
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-gray-400 text-sm">
                <Users className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                <p className="font-semibold text-white mb-1">
                  {clientsFilter === 'founders'
                    ? 'Nenhum cliente fundador encontrado'
                    : 'Nenhum cliente cadastrado na carteira'}
                </p>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  {clientsFilter === 'founders'
                    ? 'Nenhum assinante cadastrado com o plano Fundador (R$ 347/mês).'
                    : 'Clique no botão "+ Cadastrar Novo Cliente" acima para registrar um novo assinante ou aguarde novos cadastros pelo site.'}
                </p>
              </div>
            ) : (
              filtered.map((tenant) => {
                const isFounder = Number(tenant.monthly_price) === 347.0;
                return (
                  <div
                    key={tenant.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-[#1F2937]/30 transition-colors gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-white">{tenant.name}</span>
                        {isFounder && (
                          <Badge variant="secondary" className="gap-1 text-[10px] bg-amber-500/10 text-amber-400 border-amber-500/30">
                            <Star className="h-2.5 w-2.5" />
                            Cliente Fundador (R$ 347)
                          </Badge>
                        )}
                        <Badge variant={tenant.onboarding_status === 'live' ? 'default' : 'warning'}>
                          {tenant.onboarding_status === 'live' ? 'No Ar' : 'Em Setup'}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                        <span className="text-gray-300 font-medium capitalize">
                          {tenant.niche.replace('_', ' ')}
                        </span>
                        <span>·</span>
                        <span className="text-emerald-400 font-bold uppercase">{tenant.plan}</span>
                        <span>·</span>
                        <span>Responsável: {tenant.owner_name || 'Não informado'}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-mono">
                          {tenant.whatsapp_connected ? (
                            <>
                              <Wifi className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Instância WhatsApp Conectada</span>
                            </>
                          ) : (
                            <>
                              <WifiOff className="h-3 w-3 text-red-400" />
                              <span className="text-red-400">WhatsApp Desconectado</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 justify-between md:justify-end flex-shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-black text-white">
                          {formatCurrency(Number(tenant.monthly_price))}
                          <span className="text-xs font-normal text-gray-500">/mês</span>
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          {tenant.leads_count_current_month || 0} leads (Custo IA: R$ {Number(tenant.ai_cost_current_month || 0).toFixed(2)})
                        </p>
                      </div>

                      {/* Modo Espelho: Acessa o Dashboard com os dados deste Tenant */}
                      <div className="flex items-center gap-2">
                        <Button variant="default" size="sm" asChild>
                          <Link href="/dashboard">
                            <Eye className="h-3.5 w-3.5" />
                            Modo Espelho
                          </Link>
                        </Button>

                        {tenant.owner_phone && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(`https://wa.me/${tenant.owner_phone}`, '_blank')}
                          >
                            <Phone className="h-3.5 w-3.5 text-[#25D366]" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
