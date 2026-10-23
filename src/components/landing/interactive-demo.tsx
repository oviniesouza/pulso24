'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  Sofa,
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

const DEMOS = {
  advocacia: {
    segment: 'Escritório de Advocacia',
    shortSegment: 'Advocacia',
    icon: Scale,
    leadName: 'Carlos Eduardo Mendes',
    leadTime: 'Hoje às 22:48',
    responseTime: '8s',
    audioDuration: '1:15',
    audioTag: '✨ IA ouviu o áudio (1:15) e extraiu os dados da Escritura.pdf em 8s',
    attachment: {
      type: 'pdf',
      name: 'Escritura_Imovel_Partilha.pdf',
      size: '1.8 MB',
    },
    aiReplies: [
      {
        id: 1,
        time: '22:48',
        text: 'Olá Carlos, boa noite! Sinto muito pela perda do seu pai. 🙏',
      },
      {
        id: 2,
        time: '22:48',
        text: 'Ouvi seu áudio e analisei a escritura. Como os 3 herdeiros estão de acordo e são maiores, conseguimos fazer o inventário 100% em cartório — muito mais rápido.',
      },
      {
        id: 3,
        time: '22:49',
        text: 'O Dr. Marcelo tem horário amanhã às 10h30 ou às 16h00 para avaliar a documentação com você. Qual prefere?',
      },
    ],
    crm: {
      statusBadge: 'Consulta Agendada',
      score: '96/100',
      ticket: 'R$ 850.000',
      timeline: [
        {
          id: 1,
          type: 'check' as const,
          title: 'Triagem concluída',
          detail: 'Inventário Extrajudicial identificado.',
        },
        {
          id: 2,
          type: 'calendar' as const,
          title: 'Agendado automaticamente',
          detail: 'Amanhã às 10h30 com Dr. Marcelo.',
        },
        {
          id: 3,
          type: 'bell' as const,
          title: 'Alerta no WhatsApp privado',
          detail: 'Resumo enviado no WhatsApp privado do Dr. Marcelo.',
        },
      ],
    },
  },
  moveis: {
    segment: 'Móveis Planejados & Interiores',
    shortSegment: 'Móveis',
    icon: Sofa,
    leadName: 'Marina e Fernando Silveira',
    leadTime: 'Hoje às 23:12',
    responseTime: '7s',
    audioDuration: '1:24',
    audioTag: '✨ IA ouviu o áudio (1:24) e analisou a Planta_Baixa.jpg em 7s',
    attachment: {
      type: 'photo',
      name: 'Planta_Baixa_Cozinha_Gourmet.jpg',
      size: '3.2 MB',
    },
    aiReplies: [
      {
        id: 1,
        time: '23:12',
        text: 'Olá Marina e Fernando! Parabéns pelas chaves do apartamento novo! 🔑🎉',
      },
      {
        id: 2,
        time: '23:12',
        text: 'Analisei a planta da cozinha gourmet. A ilha central com torre quente em lâmina natural fica perfeita nesse espaço.',
      },
      {
        id: 3,
        time: '23:13',
        text: 'O projetista Thiago tem horário amanhã às 15h ou quarta às 19h para apresentar o 3D com vocês. O que preferem?',
      },
    ],
    crm: {
      statusBadge: 'Apresentação 3D Agendada',
      score: '94/100',
      ticket: 'R$ 45.000',
      timeline: [
        {
          id: 1,
          type: 'check' as const,
          title: 'Briefing concluído',
          detail: 'Cozinha Americana Gourmet com Ilha identificada.',
        },
        {
          id: 2,
          type: 'calendar' as const,
          title: 'Agendado automaticamente',
          detail: 'Amanhã às 15h com Projetista Thiago.',
        },
        {
          id: 3,
          type: 'bell' as const,
          title: 'Alerta no WhatsApp privado',
          detail: 'Resumo e planta enviados no WhatsApp privado do Thiago.',
        },
      ],
    },
  },
};

type DemoKey = keyof typeof DEMOS;

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<DemoKey>('advocacia');
  const demo = DEMOS[activeTab];

  return (
    <section id="demonstracao" className="py-16 sm:py-24 bg-[#0B0F19] relative overflow-hidden border-t border-white/5">
      {/* Luz ambiente suave de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3 rounded-full">
            <Sparkles className="h-3.5 w-3.5" />
            Veja na Prática
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight px-1">
            O que acontece quando seu cliente <br className="hidden sm:block" />
            <span className="text-emerald-400">manda mensagem às 22h48?</span>
          </h2>
          <p className="text-gray-400 mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed px-2">
            Sem o Pulso 24, a mensagem dorme até as 9h da manhã seguinte. Com o Pulso 24, o lead é acolhido com conversa humanizada em partes (sem textão robótico), a reunião é agendada e o alerta cai direto no seu WhatsApp.
          </p>

          {/* Abas de Seleção Responsivas */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-xs sm:max-w-none sm:flex sm:w-auto sm:justify-center mt-6 sm:mt-8 mx-auto">
            {(Object.keys(DEMOS) as DemoKey[]).map((key) => {
              const item = DEMOS[key];
              const Icon = item.icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 border cursor-pointer ${
                    isActive
                      ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      : 'border-white/10 bg-[#111827]/80 text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="sm:hidden">{item.shortSegment}</span>
                  <span className="hidden sm:inline">{item.segment}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simulador Lado a Lado com Espaçamento Amplo (p-8) e Breathing Room */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative"
            >
              {/* LADO ESQUERDO: WhatsApp do Cliente (7 Colunas) */}
              <div className="lg:col-span-7 border border-white/10 bg-[#111827]/80 backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div>
                  {/* Header do WhatsApp Mockup */}
                  <div className="bg-[#0B0F19]/90 px-4 py-3 rounded-xl border border-white/5 flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <WhatsAppIcon size={18} />
                        </div>
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#111827]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-white truncate">
                          {demo.segment === 'Escritório de Advocacia'
                            ? 'Atendimento Oficial • Dr. Marcelo'
                            : 'Atendimento Oficial • Bella Casa'}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          Online • Atendente IA Pulso 24
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                      {demo.leadTime}
                    </span>
                  </div>

                  {/* Mensagens do Cliente e Respostas da IA */}
                  <div className="space-y-3">
                    {/* Mensagem 1 do Cliente: Áudio com Tag Compacta Elegante */}
                    <div className="flex justify-end">
                      <div className="max-w-[92%] sm:max-w-[78%] bg-[#005C4B] text-white p-3.5 rounded-2xl rounded-tr-xs shadow-md border border-emerald-400/10">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                            <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {/* Onda sonora */}
                            <div className="flex items-center gap-1 h-5 overflow-hidden">
                              {[10, 18, 14, 24, 16, 22, 28, 18, 12, 20, 24, 14, 8].map((h, i) => (
                                <div
                                  key={i}
                                  className="w-1 bg-white/80 rounded-full shrink-0"
                                  style={{ height: `${h}px` }}
                                />
                              ))}
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-emerald-100/80 mt-1">
                              <span>0:00 / {demo.audioDuration}</span>
                              <span className="flex items-center gap-1">
                                22:48 <CheckCheck className="h-3 w-3 text-cyan-300" />
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Tag Compacta e Elegante (sem o bloco de texto longo) */}
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-200 font-medium leading-tight">
                          <Sparkles className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                          <span>{demo.audioTag}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mensagem 2 do Cliente: Anexo Processado */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] sm:max-w-[70%] bg-[#005C4B] text-white p-2.5 rounded-2xl rounded-tr-xs shadow-md flex items-center gap-2.5 border border-emerald-400/10">
                        <div className="h-9 w-9 bg-black/20 rounded-lg flex items-center justify-center text-emerald-300 shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate text-white">{demo.attachment.name}</p>
                          <p className="text-[10px] text-emerald-200/70">{demo.attachment.size} • Processado</p>
                        </div>
                        <span className="text-[10px] text-emerald-200/80 self-end flex items-center gap-0.5 shrink-0">
                          22:48 <CheckCheck className="h-3 w-3 text-cyan-300" />
                        </span>
                      </div>
                    </div>

                    {/* Mensagens da IA em 3 Balões Curtos e Diretos (35% mais enxutos) */}
                    <div className="space-y-2 pt-1">
                      {demo.aiReplies.map((reply, idx) => (
                        <div key={reply.id} className="flex justify-start">
                          <div
                            className={`max-w-[92%] sm:max-w-[85%] bg-[#202C33] text-gray-100 p-3 rounded-2xl shadow-sm border border-white/5 ${
                              idx === 0 ? 'rounded-tl-xs' : ''
                            }`}
                          >
                            <p className="text-xs sm:text-[13px] leading-relaxed text-gray-200">
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
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
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
              <div className="lg:col-span-5 border border-white/10 bg-[#111827]/80 backdrop-blur-md rounded-2xl p-5 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-5">
                  {/* Header do Card CRM */}
                  <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block mb-1">
                        Resumo Inteligente • Gerado pela IA
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{demo.leadName}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Triagem e agendamento realizados às 22h48 (em 8s)</p>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shrink-0">
                      {demo.crm.statusBadge}
                    </span>
                  </div>

                  {/* Grid de Métricas com Tipografia Maior */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#0B0F19]/80 border border-white/5 p-4 rounded-xl">
                      <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block mb-1">
                        Score de Qualificação
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                          {demo.crm.score}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-emerald-400 mt-1 block">Lead Quente Pronto</span>
                    </div>

                    <div className="bg-[#0B0F19]/80 border border-white/5 p-4 rounded-xl">
                      <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block mb-1">
                        Valor Estimado
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight truncate">
                          {demo.crm.ticket}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 mt-1 block">Validado no documento</span>
                    </div>
                  </div>

                  {/* Timeline Vertical de 3 Passos (Substitui as 3 caixas poluídas) */}
                  <div className="py-2">
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block mb-3">
                      Ações Executadas Automaticamente
                    </span>
                    <div className="relative border-l border-white/10 ml-3 pl-5 space-y-4">
                      {demo.crm.timeline.map((step) => (
                        <div key={step.id} className="relative group">
                          {/* Node Icon */}
                          <div className="absolute -left-[25px] top-0 h-6 w-6 rounded-full bg-[#111827] border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-md">
                            {step.type === 'check' && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
                            {step.type === 'calendar' && <CalendarCheck className="h-3.5 w-3.5 stroke-[2.5]" />}
                            {step.type === 'bell' && <Bell className="h-3.5 w-3.5 stroke-[2.5]" />}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white leading-none">{step.title}</p>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Botão de Ação Único e Elegante com Efeito Glow */}
                <div className="pt-5 border-t border-white/5 mt-5">
                  <Button
                    variant="whatsapp"
                    className="w-full text-xs sm:text-sm font-bold rounded-lg h-12 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                    onClick={() =>
                      window.open(
                        getWhatsAppUrl('Quero ver a demonstração ao vivo da IA no WhatsApp'),
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
