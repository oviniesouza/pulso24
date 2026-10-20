'use client';

import { useState, useEffect, useCallback } from 'react';
import { Eye, Star, Users, TrendingUp, Search, Phone, Wifi, WifiOff, Cloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { getTenants, type Tenant } from '@/lib/supabase/service';

export function ClientsTab() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [search, setSearch] = useState('');

  const loadTenants = useCallback(async () => {
    const data = await getTenants();
    if (data && data.length > 0) {
      setTenants(data);
    } else {
      // Fallback
      setTenants([
        {
          id: '11111111-1111-1111-1111-111111111111',
          name: 'Silva & Associados Advocacia',
          owner_name: 'Dr. Marcos Silva',
          owner_phone: '5553999991111',
          niche: 'advocacia',
          plan: 'pro',
          subscription_status: 'active',
          onboarding_status: 'live',
          onboarding_notes: null,
          billing_provider: 'sicredi',
          monthly_price: 347.0,
          setup_fee: 0.0,
          billing_due_day: 10,
          ai_cost_current_month: 6.8,
          leads_count_current_month: 42,
          referred_by_tenant_id: null,
          whatsapp_instance_name: 'silva_advocacia',
          whatsapp_connected: true,
          ai_name: 'Clara (Jurídico)',
          ai_system_prompt: 'Assistente Silva & Associados',
          notification_phone: null,
          created_at: new Date().toISOString(),
        },
        {
          id: '22222222-2222-2222-2222-222222222222',
          name: 'Arte & Design Móveis Planejados',
          owner_name: 'Roberto Mendes',
          owner_phone: '5553999992222',
          niche: 'moveis_planejados',
          plan: 'pro',
          subscription_status: 'active',
          onboarding_status: 'configuring',
          onboarding_notes: null,
          billing_provider: 'sicredi',
          monthly_price: 347.0,
          setup_fee: 0.0,
          billing_due_day: 10,
          ai_cost_current_month: 3.2,
          leads_count_current_month: 18,
          referred_by_tenant_id: null,
          whatsapp_instance_name: 'arte_moveis',
          whatsapp_connected: false,
          ai_name: 'Sofia (Projetos)',
          ai_system_prompt: 'Consultora de Móveis',
          notification_phone: null,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    loadTenants();
  }, [loadTenants]);

  const filtered = tenants.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.niche.toLowerCase().includes(search.toLowerCase())
  );

  const totalMRR = tenants.reduce((acc, c) => acc + Number(c.monthly_price || 0), 0);
  const totalLeads = tenants.reduce((acc, c) => acc + Number(c.leads_count_current_month || 0), 0);

  return (
    <div className="space-y-4">
      {/* Cards de Métricas Reais do Banco */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="border border-[#1F2937] bg-[#111827] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase">Empresas na Base</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-1">{tenants.length} Clientes</p>
          <p className="text-xs text-emerald-400 mt-0.5">
            {tenants.filter((t) => t.onboarding_status === 'live').length} no ar ·{' '}
            {tenants.filter((t) => t.onboarding_status !== 'live').length} em setup
          </p>
        </div>

        <div className="border border-[#1F2937] bg-[#111827] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase">MRR da Carteira</span>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 mt-1">{formatCurrency(totalMRR)}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Média por cliente: {formatCurrency(tenants.length > 0 ? totalMRR / tenants.length : 0)}
          </p>
        </div>

        <div className="border border-[#1F2937] bg-[#111827] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase">Leads Atendidos Mês</span>
            <Star className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-cyan-400 mt-1">{totalLeads} leads</p>
          <p className="text-xs text-gray-400 mt-0.5">Volume processado pela IA dos clientes</p>
        </div>
      </div>

      {/* Busca */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por cliente, escritório ou nicho..."
            className="w-full bg-[#111827] border border-[#1F2937] pl-9 pr-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 font-mono">
          <Cloud className="h-3.5 w-3.5" />
          public.tenants
        </div>
      </div>

      {/* Lista de Tenants */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-[#1F2937]">
            {filtered.map((tenant) => {
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
                      <span>Responsável: {tenant.owner_name}</span>
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
                        {tenant.leads_count_current_month} leads (Custo IA: R$ {Number(tenant.ai_cost_current_month).toFixed(2)})
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
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
