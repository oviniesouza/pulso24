'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Bot, User, Send, Paperclip, Phone, Cloud, Mic, FileText, Filter, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  getLeads,
  getMessages,
  sendMessage,
  updateLeadAiStatus,
  updateLeadStage,
  type Lead,
  type Message,
} from '@/lib/supabase/service';
import { useTenant } from '@/contexts/tenant-context';
import { useDashboardView } from '@/contexts/dashboard-view-context';

const STAGES = [
  { id: 'novo', label: 'Novo Lead', color: 'text-gray-400', accent: '#1F2937' },
  { id: 'qualificando', label: 'Qualificando', color: 'text-cyan-400', accent: '#06B6D4' },
  { id: 'qualificado', label: 'Qualificado', color: 'text-emerald-400', accent: '#10B981' },
  { id: 'agendado', label: 'Agendado', color: 'text-amber-400', accent: '#F59E0B' },
  { id: 'ganho', label: 'Convertido', color: 'text-emerald-300', accent: '#6EE7B7' },
] as const;

export function CrmTab({ activeTenantId }: { activeTenantId?: string }) {
  const { activeTenant } = useTenant();
  const currentTenantId = activeTenantId || activeTenant.id;
  const { crmFilter, setCrmFilter, searchQuery, setSearchQuery, targetLeadId, setTargetLeadId } = useDashboardView();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);

  // Carregar Leads do Supabase
  const loadLeadsData = useCallback(async () => {
    const data = await getLeads(currentTenantId);
    if (data && data.length > 0) {
      setLeads(data);
      setSelectedLead((prev) => {
        if (!prev || !data.some((l) => l.id === prev.id)) {
          return data[0];
        }
        return prev;
      });
    } else {
      setLeads([]);
      setSelectedLead(null);
    }
  }, [currentTenantId]);

  // Sincronizar lead vindo do Overview ou busca externa
  useEffect(() => {
    if (targetLeadId && leads.length > 0) {
      const match = leads.find(
        (l) =>
          l.id === targetLeadId ||
          l.name.toLowerCase().includes(targetLeadId.toLowerCase())
      );
      if (match) {
        setSelectedLead(match);
      }
    }
  }, [targetLeadId, leads]);

  // Filtragem com base nos atalhos da Sidebar e busca da Topbar
  const visibleLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          lead.name.toLowerCase().includes(q) ||
          lead.phone.includes(q) ||
          (lead.summary && lead.summary.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      if (crmFilter === 'hot') {
        return lead.stage === 'qualificado';
      }
      if (crmFilter === 'paused') {
        return !lead.ai_active;
      }
      if (crmFilter === 'scheduled') {
        return lead.stage === 'agendado';
      }

      return true;
    });
  }, [leads, crmFilter, searchQuery]);

  useEffect(() => {
    loadLeadsData();
  }, [loadLeadsData]);

  // Carregar Mensagens do Lead Selecionado de forma estável (sem loop)
  useEffect(() => {
    async function loadChat() {
      if (!selectedLead?.id) {
        setMessages([]);
        return;
      }
      setLoadingMessages(true);
      const msgs = await getMessages(selectedLead.id);
      setMessages(msgs || []);
      setLoadingMessages(false);
    }
    loadChat();
  }, [selectedLead?.id]);

  // Alternar IA Ativa/Pausada
  const toggleAi = async () => {
    if (!selectedLead) return;
    const nextState = !selectedLead.ai_active;

    // Atualização otimista
    setSelectedLead({ ...selectedLead, ai_active: nextState });
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, ai_active: nextState } : l))
    );

    // Grava no Supabase
    await updateLeadAiStatus(selectedLead.id, nextState);
  };

  // Enviar Mensagem Humana no Chat
  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedLead || sending) return;
    setSending(true);

    const newMsg: Message = {
      id: `temp-${Date.now()}`,
      tenant_id: currentTenantId,
      lead_id: selectedLead.id,
      sender_type: 'human',
      content: inputText,
      media_type: 'text',
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    const textToSend = inputText;
    setInputText('');

    // Grava no Supabase
    await sendMessage(currentTenantId, selectedLead.id, textToSend, 'human');
    setSending(false);
  };

  // Mover de Estágio no Kanban
  const handleStageChange = async (leadId: string, newStage: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
    if (selectedLead?.id === leadId) {
      setSelectedLead({ ...selectedLead, stage: newStage });
    }
    await updateLeadStage(leadId, newStage);
  };

  return (
    <div className="space-y-3">
      {/* Active Filter Notification Bar */}
      {(crmFilter !== 'all' || searchQuery.trim() !== '') && (
        <div className="flex items-center justify-between p-2.5 bg-[#111827] border border-cyan-500/30 rounded-sm text-xs">
          <div className="flex items-center gap-2 text-cyan-400">
            <Filter className="h-3.5 w-3.5 shrink-0" />
            <span>
              Filtro ativo:{' '}
              <strong className="text-white">
                {crmFilter === 'hot'
                  ? '🔥 Leads Quentes'
                  : crmFilter === 'paused'
                  ? '✋ Aguardando Humano'
                  : crmFilter === 'scheduled'
                  ? '📅 Reuniões Agendadas'
                  : 'Filtro Ativo'}
              </strong>
              {searchQuery ? ` · Busca: "${searchQuery}"` : ''}
              {' '}({visibleLeads.length} leads visíveis)
            </span>
          </div>
          <button
            onClick={() => {
              setCrmFilter('all');
              setSearchQuery('');
            }}
            className="text-gray-400 hover:text-white flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-sm hover:bg-white/5"
          >
            <X className="h-3 w-3" />
            Limpar Filtros
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
          <Cloud className="h-3.5 w-3.5" />
          Conectado ao Supabase (Tabelas: <code>public.leads</code> & <code>public.messages</code>)
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Kanban Board */}
        <div className="xl:col-span-3 overflow-x-auto">
          <div className="flex gap-3 min-w-[750px]">
            {STAGES.map((col) => {
              const stageLeads = visibleLeads.filter((l) => l.stage === col.id);
              return (
                <div key={col.id} className="flex-1 min-w-[140px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${col.color}`}>
                      {col.label}
                    </span>
                    <span className="text-[11px] text-gray-500 border border-[#1F2937] px-1.5 py-0.5 font-mono">
                      {stageLeads.length}
                    </span>
                  </div>

                  <div
                    className="min-h-[420px] border border-dashed border-[#1F2937] p-2 space-y-2 bg-[#0B0F19]/40"
                    style={{ borderColor: stageLeads.length > 0 ? col.accent + '40' : undefined }}
                  >
                    {stageLeads.map((lead) => (
                      <motion.div
                        key={lead.id}
                        layout
                        onClick={() => setSelectedLead(lead)}
                        className={`w-full text-left border bg-[#111827] p-3 cursor-pointer transition-all ${
                          selectedLead?.id === lead.id
                            ? 'border-emerald-500 shadow-lg ring-1 ring-emerald-500/30'
                            : 'border-[#1F2937] hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white truncate max-w-[120px]">
                            {lead.name}
                          </span>
                          <span className={`h-1.5 w-1.5 rounded-full ${lead.ai_active ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        </div>

                        <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                          {lead.summary || 'Aguardando interação inicial...'}
                        </p>

                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#1F2937] text-[10px] text-gray-500">
                          <span>{lead.phone}</span>
                          <span>{lead.followup_count > 0 ? `${lead.followup_count} toques` : 'Novo'}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat ao Vivo com Transcrição & Botão Pausar IA */}
        <div className="xl:col-span-2 flex flex-col border border-[#1F2937] bg-[#111827] min-h-[500px]">
          {selectedLead ? (
            <>
              {/* Header do Chat */}
              <div className="border-b border-[#1F2937] p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedLead.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                    <span className={`h-2 w-2 rounded-full ${selectedLead.ai_active ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    <span>{selectedLead.ai_active ? 'IA Ativa (Respondendo WhatsApp)' : 'IA Pausada (Atendente Humano)'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedLead.ai_active ? 'destructive' : 'default'}
                    size="sm"
                    onClick={toggleAi}
                  >
                    {selectedLead.ai_active ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    {selectedLead.ai_active ? 'Pausar IA / Assumir' : 'Reativar IA'}
                  </Button>

                  <button
                    className="p-2 text-gray-400 hover:text-white"
                    onClick={() => window.open(`https://wa.me/${selectedLead.phone}`, '_blank')}
                  >
                    <Phone className="h-4 w-4 text-[#25D366]" />
                  </button>
                </div>
              </div>

              {/* Resumo da IA */}
              {selectedLead.summary && (
                <div className="border-b border-[#1F2937] bg-[#0B0F19]/60 px-4 py-2.5">
                  <div className="flex items-start gap-2">
                    <Bot className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold text-cyan-400 block mb-0.5">Resumo Gerado pela IA</span>
                      <p className="text-gray-300 leading-relaxed">{selectedLead.summary}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px]">
                {loadingMessages ? (
                  <p className="text-xs text-gray-500 text-center py-6">Carregando histórico do WhatsApp...</p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${msg.sender_type === 'lead' ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div
                        className={`h-6 w-6 rounded-none flex items-center justify-center flex-shrink-0 ${
                          msg.sender_type === 'ai'
                            ? 'bg-cyan-500/10 border border-cyan-500/30'
                            : msg.sender_type === 'human'
                              ? 'bg-emerald-500/10 border border-emerald-500/30'
                              : 'bg-gray-800 border border-gray-700'
                        }`}
                      >
                        {msg.sender_type === 'ai' ? (
                          <Bot className="h-3.5 w-3.5 text-cyan-400" />
                        ) : (
                          <User className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                      </div>

                      <div className={`max-w-[85%] flex flex-col ${msg.sender_type === 'lead' ? 'items-start' : 'items-end'}`}>
                        <div
                          className={`border px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                            msg.sender_type === 'ai'
                              ? 'border-cyan-500/20 bg-cyan-500/5 text-gray-200'
                              : msg.sender_type === 'human'
                                ? 'border-emerald-500/30 bg-emerald-500/10 text-white'
                                : 'border-[#1F2937] bg-[#0B0F19] text-gray-300'
                          }`}
                        >
                          {msg.media_type === 'audio' && (
                            <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                              <Mic className="h-3.5 w-3.5" />
                              Áudio Transcrito (Whisper)
                            </div>
                          )}
                          {msg.media_type === 'document' && (
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                              <FileText className="h-3.5 w-3.5" />
                              Documento PDF
                            </div>
                          )}
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input de Mensagem */}
              <div className="border-t border-[#1F2937] p-3 bg-[#0B0F19]/40">
                {!selectedLead.ai_active ? (
                  <div className="flex gap-2">
                    <input
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Você assumiu o atendimento. Digite para responder..."
                      className="flex-1 bg-[#0B0F19] border border-[#1F2937] px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                    />
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage} disabled={sending}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-gray-500 py-1">
                    <span className="flex items-center gap-1.5">
                      <Bot className="h-4 w-4 text-cyan-400" />
                      A IA está no comando. Clique em &quot;Pausar IA&quot; para digitar.
                    </span>
                    <Button variant="outline" size="sm" onClick={toggleAi}>
                      Assumir Chat
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm my-auto">
              Selecione um lead no Kanban para abrir o chat ao vivo
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
