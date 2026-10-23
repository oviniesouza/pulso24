'use client';

import {
  Play,
  FileText,
  CalendarCheck,
  Check,
  Bell,
  Sparkles,
  CheckCheck,
  ArrowRight,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { Button } from '@/components/ui/button';
import { getWhatsAppUrl } from '@/lib/constants';

const DEMO_DATA = {
  storeName: 'Atendimento Oficial • Studio Prime Interiores',
  leadName: 'Marina & Fernando Silveira',
  leadTime: 'Hoje às 22:48',
  audioDuration: '0:52',
  audioTag: 'IA ouviu o áudio (0:52) e analisou a Planta_Apartamento.pdf em 6s',
  attachment: {
    name: 'Planta_Apartamento.pdf',
    size: '2.4 MB',
  },
  aiReplies: [
    {
      id: 1,
      time: '22:48',
      text: 'Olá Marina e Fernando, boa noite! Que projeto incrível. Parabéns pelo apartamento novo! 🏡',
    },
    {
      id: 2,
      time: '22:48',
      text: 'Ouvi o áudio e analisei a Planta_Apartamento.pdf. Para a cozinha integrada e os 3 dormitórios com acabamento premium, conseguimos desenvolver o projeto 3D completo.',
    },
    {
      id: 3,
      time: '22:49',
      text: 'O nosso projetista sênior tem horário amanhã às 14h00 ou às 17h30 para apresentar a proposta e o 3D com vocês. Qual horário fica melhor?',
    },
  ],
  crm: {
    statusBadge: 'Reunião Agendada',
    score: '98/100',
    ticket: 'R$ 65.000',
    timeline: [
      {
        id: 1,
        type: 'check' as const,
        title: 'Triagem concluída',
        detail: 'Apartamento completo (Planta recebida).',
      },
      {
        id: 2,
        type: 'calendar' as const,
        title: 'Agendado automaticamente',
        detail: 'Apresentação de Projeto amanhã às 14h.',
      },
      {
        id: 3,
        type: 'bell' as const,
        title: 'Resumo enviado',
        detail: 'No WhatsApp privado do projetista responsável.',
      },
    ],
  },
};

export function InteractiveDemo() {
  return (
    <section id="demonstracao" className="py-14 sm:py-20 bg-[#0B0F19] relative overflow-hidden border-t border-white/5">
      {/* Luz ambiente suave de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção Refinado e Compacto */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3 rounded-full">
            <Sparkles className="h-3.5 w-3.5" />
            Veja na Prática
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] max-w-2xl mx-auto text-white px-1">
            O que acontece quando seu cliente <br className="hidden sm:block" />
            <span className="text-emerald-400">manda mensagem às 22h48?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-3 leading-relaxed px-2">
            Enquanto o atendimento comum dorme até as 9h, a IA acolhe o cliente em segundos, analisa a planta e agenda a reunião direto no seu calendário.
          </p>
        </div>

        {/* Simulador Lado a Lado Compacto (p-5 sm:p-6) */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch relative">
            {/* LADO ESQUERDO: WhatsApp do Cliente (7 Colunas) */}
            <div className="lg:col-span-7 border border-white/10 bg-[#111827]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div>
                {/* Header do WhatsApp Mockup */}
                <div className="bg-[#0B0F19]/90 px-3.5 py-2.5 rounded-xl border border-white/5 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      <div className="h-8 w-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <WhatsAppIcon size={16} />
                      </div>
                      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 border-2 border-[#111827]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">
                        {DEMO_DATA.storeName}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        Online • Atendente IA Pulso 24
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {DEMO_DATA.leadTime}
                  </span>
                </div>

                {/* Mensagens do Cliente e Respostas da IA */}
                <div className="space-y-2.5">
                  {/* Mensagem 1 do Cliente: Áudio Compacto */}
                  <div className="flex justify-end">
                    <div className="max-w-[92%] sm:max-w-[78%] bg-[#005C4B] text-white p-3 rounded-2xl rounded-tr-xs shadow-md border border-emerald-400/10">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                          <Play className="h-3 w-3 fill-white ml-0.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Onda sonora */}
                          <div className="flex items-center gap-1 h-4 overflow-hidden">
                            {[10, 16, 12, 20, 14, 18, 22, 16, 10, 18, 20, 12, 8].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-white/80 rounded-full shrink-0"
                                style={{ height: `${h}px` }}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-emerald-100/80 mt-1">
                            <span>0:00 / {DEMO_DATA.audioDuration}</span>
                            <span className="flex items-center gap-1">
                              22:48 <CheckCheck className="h-3 w-3 text-cyan-300" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tag Compacta e Elegante (Sem emoji duplicado) */}
                      <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-200 font-medium leading-tight">
                        <Sparkles className="h-3 w-3 text-emerald-300 shrink-0" />
                        <span>{DEMO_DATA.audioTag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mensagem 2 do Cliente: Anexo Processado Compacto */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] sm:max-w-[70%] bg-[#005C4B] text-white py-2 px-3 rounded-2xl rounded-tr-xs shadow-md flex items-center gap-2.5 border border-emerald-400/10">
                      <div className="h-8 w-8 bg-black/20 rounded-lg flex items-center justify-center text-emerald-300 shrink-0">
                        <FileText className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate text-white">{DEMO_DATA.attachment.name}</p>
                        <p className="text-[10px] text-emerald-200/70">{DEMO_DATA.attachment.size} • Processado</p>
                      </div>
                      <span className="text-[10px] text-emerald-200/80 self-end flex items-center gap-0.5 shrink-0">
                        22:48 <CheckCheck className="h-3 w-3 text-cyan-300" />
                      </span>
                    </div>
                  </div>

                  {/* Mensagens da IA em 3 Balões Enxutos (text-[13px] leading-snug) */}
                  <div className="space-y-1.5 pt-0.5">
                    {DEMO_DATA.aiReplies.map((reply, idx) => (
                      <div key={reply.id} className="flex justify-start">
                        <div
                          className={`max-w-[92%] sm:max-w-[85%] bg-[#202C33] text-gray-100 px-3.5 py-2.5 rounded-2xl shadow-xs border border-white/5 ${
                            idx === 0 ? 'rounded-tl-xs' : ''
                          }`}
                        >
                          <p className="text-[13px] leading-snug text-gray-200">
                            {reply.text}
                          </p>
                          <div className="flex justify-end items-center gap-1 text-[10px] text-gray-400 mt-1">
                            <span>{reply.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rodapé informativo discreto */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Conversa humanizada em blocos separados
                </span>
                <span>Sem menus numéricos</span>
              </div>
            </div>

            {/* Conector Visual Sutil Causa -> Efeito (Desktop) */}
            <div className="hidden lg:flex absolute left-[58.333%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B0F19] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)] text-[10px] font-mono text-gray-300 tracking-wider backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>IA PULSO 24</span>
                <ArrowRight className="h-3 w-3 text-emerald-400" />
              </div>
            </div>

            {/* LADO DIREITO: CRM & Painel do Cliente (5 Colunas) */}
            <div className="lg:col-span-5 border border-white/10 bg-[#111827]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                {/* Header do Card CRM */}
                <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block mb-0.5">
                      Resumo Inteligente • Gerado pela IA
                    </span>
                    <h3 className="text-lg font-semibold text-white tracking-tight">{DEMO_DATA.leadName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Triagem e agendamento realizados às 22h48 (em 6s)</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shrink-0">
                    {DEMO_DATA.crm.statusBadge}
                  </span>
                </div>

                {/* Grid de Métricas com Proporção Equilibrada */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-[#0B0F19]/80 border border-white/5 p-3.5 rounded-xl">
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block mb-1">
                      Score de Compra
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white tracking-tight">
                        {DEMO_DATA.crm.score}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-emerald-400 mt-0.5 block">Lead Quente Pronto</span>
                  </div>

                  <div className="bg-[#0B0F19]/80 border border-white/5 p-3.5 rounded-xl">
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block mb-1">
                      Ticket Estimado
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-emerald-400 tracking-tight truncate">
                        {DEMO_DATA.crm.ticket}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 mt-0.5 block">Validado no documento</span>
                  </div>
                </div>

                {/* Timeline Vertical de 3 Passos Compacta */}
                <div className="py-1">
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block mb-2.5">
                    Ações Executadas Automaticamente
                  </span>
                  <div className="relative border-l border-white/10 ml-3 pl-4 space-y-2.5">
                    {DEMO_DATA.crm.timeline.map((step) => (
                      <div key={step.id} className="relative group">
                        {/* Node Icon */}
                        <div className="absolute -left-[23px] top-0.5 h-5 w-5 rounded-full bg-[#111827] border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-md">
                          {step.type === 'check' && <Check className="h-3 w-3 stroke-[2.5]" />}
                          {step.type === 'calendar' && <CalendarCheck className="h-3 w-3 stroke-[2.5]" />}
                          {step.type === 'bell' && <Bell className="h-3 w-3 stroke-[2.5]" />}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-white leading-tight">{step.title}</p>
                          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botão de Ação Único e Elegante com Altura Refinada */}
              <div className="pt-4 border-t border-white/5 mt-4">
                <Button
                  variant="whatsapp"
                  className="w-full text-sm font-semibold rounded-lg py-3 h-auto shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                  onClick={() =>
                    window.open(
                      getWhatsAppUrl('Quero ver a demonstração ao vivo da IA para móveis planejados'),
                      '_blank'
                    )
                  }
                >
                  <WhatsAppIcon size={18} />
                  <span>Testar essa mesma IA no meu WhatsApp</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
