'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Zap, MessageCircle, FileText, ExternalLink, ArrowRight, Cloud, Filter, X, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTenants, updateTenantOnboardingStatus, type Tenant } from '@/lib/supabase/service';
import { useAdminView } from '@/contexts/admin-view-context';

type OnboardingStatus = 'waiting' | 'configuring' | 'live';

interface ClientItem {
  id: string;
  name: string;
  segment: string;
  plan: string;
  purchaseDate: string;
  purchaseChannel: 'whatsapp' | 'site';
  contact: string;
  briefing: {
    business: string;
    whatsapp: string;
    focus: string;
    notes: string;
  };
  status: OnboardingStatus;
  checklist: {
    label: string;
    done: boolean;
  }[];
}

const statusConfig: Record<OnboardingStatus, { label: string; variant: 'warning' | 'secondary' | 'default'; icon: typeof Clock }> = {
  waiting: { label: 'Aguardando Setup', variant: 'warning', icon: Clock },
  configuring: { label: 'Configurando', variant: 'secondary', icon: Zap },
  live: { label: 'No Ar', variant: 'default', icon: CheckCircle2 },
};

export function OnboardingTab() {
  const { onboardingFilter, setOnboardingFilter, refreshData } = useAdminView();
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const loadTenantsData = useCallback(async () => {
    const data: Tenant[] = await getTenants();
    const realClients = (data || []).filter((t) => t.id !== '00000000-0000-0000-0000-000000000000');
    if (realClients && realClients.length > 0) {
      const mapped: ClientItem[] = realClients.map((t) => {
        const isLive = t.onboarding_status === 'live';
        const isConfig = t.onboarding_status === 'configuring';

        return {
          id: t.id,
          name: t.name,
          segment: t.niche === 'advocacia' ? 'Advocacia' : 'Móveis Planejados',
          plan: `${t.plan.toUpperCase()} (R$ ${Number(t.monthly_price).toFixed(2)}/mês)`,
          purchaseDate: new Date(t.created_at).toLocaleDateString('pt-BR'),
          purchaseChannel: 'whatsapp',
          contact: t.owner_phone || '5553999990000',
          briefing: {
            business: `${t.name} — Responsável: ${t.owner_name || 'CEO'}`,
            whatsapp: t.owner_phone || 'WhatsApp não cadastrado',
            focus: t.niche === 'advocacia' ? 'Triagem de casos e agendamento de consultas' : 'Coleta de briefing e medidas de projetos',
            notes: t.ai_system_prompt?.substring(0, 100) + '...' || 'Sem observações adicionais',
          },
          status: isLive ? 'live' : isConfig ? 'configuring' : 'waiting',
          checklist: [
            { label: 'Criar Instância WhatsApp na Evolution API', done: isLive || isConfig },
            { label: 'Ajustar Prompt e Travas de Segurança', done: isLive || isConfig },
            { label: 'Ler QR Code com o cliente no WhatsApp', done: isLive },
            { label: 'Testar fluxo e concluir ativação', done: isLive },
          ],
        };
      });

      setClients(mapped);
      setExpanded(mapped[0]?.id || null);
    } else {
      setClients([]);
      setExpanded(null);
    }
  }, []);

  useEffect(() => {
    loadTenantsData();
  }, [loadTenantsData]);

  const toggleChecklist = async (clientId: string, index: number) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        const newChecklist = c.checklist.map((item, i) => (i === index ? { ...item, done: !item.done } : item));
        const allDone = newChecklist.every((item) => item.done);
        const nextStatus: OnboardingStatus = allDone ? 'live' : 'configuring';

        // Atualiza no Supabase
        updateTenantOnboardingStatus(clientId, nextStatus).then(() => {
          refreshData();
        });

        return {
          ...c,
          checklist: newChecklist,
          status: nextStatus,
        };
      })
    );
  };

  const advanceStatus = async (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client) return;

    const next: OnboardingStatus = client.status === 'waiting' ? 'configuring' : 'live';
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status: next } : c))
    );

    // Grava no Supabase
    await updateTenantOnboardingStatus(clientId, next);
    await refreshData();
  };

  const visibleClients = useMemo(() => {
    if (onboardingFilter === 'all') return clients;
    return clients.filter((c) => c.status === onboardingFilter);
  }, [clients, onboardingFilter]);

  return (
    <div className="space-y-4">
      {/* Active Filter Notification Bar */}
      {onboardingFilter !== 'all' && (
        <div className="flex items-center justify-between p-2.5 bg-[#111827] border border-emerald-500/30 rounded-sm text-xs">
          <div className="flex items-center gap-2 text-emerald-400">
            <Filter className="h-3.5 w-3.5 shrink-0" />
            <span>
              Filtro ativo na Fila:{' '}
              <strong className="text-white">
                {onboardingFilter === 'waiting'
                  ? '⏳ Pendentes (Aguardando Setup)'
                  : onboardingFilter === 'configuring'
                  ? '⚙️ Configurando'
                  : '🟢 Concluídos / Live'}
              </strong>{' '}
              ({visibleClients.length} clientes nesta etapa)
            </span>
          </div>
          <button
            onClick={() => setOnboardingFilter('all')}
            className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-sm hover:bg-white/5"
          >
            <X className="h-3 w-3" />
            Ver Todos
          </button>
        </div>
      )}

      {/* Resumo da Fila com Conexão ao Supabase */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
          <Cloud className="h-3.5 w-3.5" />
          Conectado à tabela <code>public.tenants</code>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Aguardando Setup', filterKey: 'waiting' as const, count: clients.filter((c) => c.status === 'waiting').length, color: 'text-amber-400' },
          { label: 'Configurando', filterKey: 'configuring' as const, count: clients.filter((c) => c.status === 'configuring').length, color: 'text-cyan-400' },
          { label: 'No Ar (Ativos)', filterKey: 'live' as const, count: clients.filter((c) => c.status === 'live').length, color: 'text-emerald-400' },
        ].map((s) => (
          <div
            key={s.label}
            onClick={() => setOnboardingFilter(s.filterKey)}
            className="border border-[#1F2937] hover:border-emerald-500/40 bg-[#111827] p-4 cursor-pointer transition-all"
          >
            <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cards de Clientes na Fila */}
      <div className="space-y-3">
        {visibleClients.length === 0 ? (
          <div className="border border-[#1F2937] bg-[#111827] p-10 text-center text-gray-400">
            <Rocket className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <p className="font-semibold text-white mb-1">
              {onboardingFilter === 'all'
                ? 'Nenhum cliente na fila de onboarding'
                : 'Nenhum cliente nesta etapa da fila'}
            </p>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Novos assinantes contratados pelo site ou cadastrados no botão &quot;+ Cadastrar Novo Cliente&quot; entrarão automaticamente aqui para configuração de prompt e WhatsApp.
            </p>
          </div>
        ) : (
          visibleClients.map((client) => {
          const sc = statusConfig[client.status];
          const doneCount = client.checklist.filter((c) => c.done).length;
          const progress = Math.round((doneCount / client.checklist.length) * 100);

          return (
            <motion.div
              key={client.id}
              layout
              className={`border bg-[#111827] ${
                client.status === 'waiting'
                  ? 'border-amber-500/50'
                  : client.status === 'configuring'
                    ? 'border-cyan-500/50'
                    : 'border-emerald-500/40'
              }`}
            >
              <button
                className="w-full flex flex-col md:flex-row md:items-center justify-between p-4 text-left hover:bg-[#1F2937]/30 transition-colors gap-3"
                onClick={() => setExpanded(expanded === client.id ? null : client.id)}
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-base">{client.name}</span>
                    <Badge variant={sc.variant} className="gap-1">
                      <sc.icon className="h-3 w-3" />
                      {sc.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400 flex-wrap">
                    <span className="text-emerald-400 font-medium">{client.plan}</span>
                    <span>·</span>
                    <span>Entrada: {client.purchaseDate}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                      Via WhatsApp Comercial
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{doneCount}/{client.checklist.length} passos</p>
                    <p className="text-xs font-bold text-emerald-400">{progress}% pronto</p>
                  </div>
                  <div className="w-24 h-1.5 bg-[#1F2937] overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </button>

              {expanded === client.id && (
                <div className="border-t border-[#1F2937] p-5 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#0B0F19]/40">
                  {/* Briefing */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-[#1F2937] pb-2">
                      <FileText className="h-4 w-4" />
                      Briefing de Implementação
                    </div>
                    <div className="space-y-2.5 text-sm">
                      <div className="border-l-2 border-emerald-500/50 pl-3 py-0.5">
                        <span className="text-xs text-gray-500 block uppercase">Negócio & Responsável</span>
                        <p className="text-gray-200">{client.briefing.business}</p>
                      </div>
                      <div className="border-l-2 border-cyan-500/50 pl-3 py-0.5">
                        <span className="text-xs text-gray-500 block uppercase">Foco Principal da IA</span>
                        <p className="text-gray-200">{client.briefing.focus}</p>
                      </div>
                      <div className="border-l-2 border-[#1F2937] pl-3 py-0.5">
                        <span className="text-xs text-gray-500 block uppercase">System Prompt Atual</span>
                        <p className="text-gray-400 text-xs font-mono">{client.briefing.notes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Checklist Passo a Passo */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-[#1F2937] pb-2">
                      <Zap className="h-4 w-4" />
                      Checklist de Ativação (4 Passos do CEO)
                    </div>
                    <div className="space-y-2">
                      {client.checklist.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => toggleChecklist(client.id, i)}
                          className={`w-full flex items-center gap-3 p-2.5 text-left border transition-all ${
                            item.done
                              ? 'border-emerald-500/20 bg-emerald-500/5 text-gray-400'
                              : 'border-[#1F2937] bg-[#111827] text-gray-200 hover:border-gray-600'
                          }`}
                        >
                          {item.done ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-500 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${item.done ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                            {i + 1}. {item.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-2">
                      {client.status !== 'live' && (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => advanceStatus(client.id)}
                          className="flex-1"
                        >
                          <ArrowRight className="h-4 w-4" />
                          {client.status === 'waiting' ? 'Iniciar Setup' : 'Marcar como Concluído'}
                        </Button>
                      )}
                      <Button
                        variant="whatsapp"
                        size="sm"
                        onClick={() => window.open(`https://wa.me/${client.contact.replace(/\D/g, '')}`, '_blank')}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Chamar Cliente
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        }))}
      </div>
    </div>
  );
}
