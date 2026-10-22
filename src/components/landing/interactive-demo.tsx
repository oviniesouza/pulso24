'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  Sofa,
  Play,
  FileText,
  CalendarCheck,
  Zap,
  Sparkles,
  CheckCheck,
  ArrowRight,
  SlidersHorizontal,
  Smartphone,
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
    leadTime: 'Hoje às 22:48 (Domingo à noite)',
    responseTime: '8 segundos',
    audioDuration: '1:15',
    audioTopic: 'Explicação do inventário familiar e partilha de bens',
    attachment: {
      type: 'pdf',
      name: 'Escritura_Imovel_Partilha.pdf',
      size: '1.8 MB',
    },
    clientAudioText:
      '“Oi Dr., boa noite. Desculpe a hora. Meu pai faleceu mês passado e precisamos fazer o inventário. São 3 irmãos, todos de acordo, e temos uma casa em Santo Amaro. Queria saber se dá pra fazer em cartório e quanto tempo demora...”',
    aiReplies: [
      {
        id: 1,
        time: '22:48',
        text: 'Olá Carlos, boa noite! Sinto muito pelo falecimento do seu pai. Que Deus conforte você e sua família nesse momento. 🙏',
      },
      {
        id: 2,
        time: '22:48',
        text: 'Ouvi seu áudio com atenção e já analisei a escritura que você enviou. Como todos os 3 herdeiros são maiores de idade e estão de pleno acordo, podemos sim fazer o inventário 100% via cartório (extrajudicial). É muito mais rápido e sem o desgaste de um processo judicial demorado.',
      },
      {
        id: 3,
        time: '22:49',
        text: 'O Dr. Marcelo separou dois horários na agenda para analisar a documentação detalhada com você: amanhã às 10h30 ou às 16h00. Qual horário fica melhor para você?',
      },
    ],
    kanban: {
      column: 'Consulta Agendada',
      badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
      score: 96,
      ticket: 'Inventário R$ 850.000',
      summary:
        'Inventário Extrajudicial em Cartório. 3 herdeiros maiores em consenso. Imóvel em SP. Escritura já validada pela IA.',
      scheduledEvent: 'Consulta de Alinhamento com Dr. Marcelo — Amanhã às 10h30',
      whatsappAlert:
        '🔔 Alerta enviado no WhatsApp do Dr. Marcelo: "Lead Quente: Carlos Eduardo (Inventário R$ 850k). Consulta proposta para amanhã 10h30. Clique aqui para assumir a conversa."',
    },
  },
  moveis: {
    segment: 'Móveis Planejados & Interiores',
    shortSegment: 'Móveis',
    icon: Sofa,
    leadName: 'Marina e Fernando Silveira',
    leadTime: 'Hoje às 23:12 (Sábado à noite)',
    responseTime: '7 segundos',
    audioDuration: '1:24',
    audioTopic: 'Briefing do apartamento novo e medidas da cozinha gourmet',
    attachment: {
      type: 'photo',
      name: 'Planta_Baixa_Cozinha_Gourmet.jpg',
      size: '3.2 MB',
    },
    clientAudioText:
      '“Boa noite! Pegamos a chave do nosso apê no Terraço Vila Mariana. Queremos fazer a cozinha americana com ilha em lâmina natural e torre quente. Mandei a planta e a foto do espaço bruto. Vocês conseguem estimativa e agendar visita?”',
    aiReplies: [
      {
        id: 1,
        time: '23:12',
        text: 'Olá, Marina e Fernando! Boa noite. Parabéns pelas chaves do novo apartamento, que conquista maravilhosa! 🔑🎉',
      },
      {
        id: 2,
        time: '23:12',
        text: 'Acabei de analisar a foto do ambiente e a planta da cozinha gourmet. Essa disposição com ilha central e torre quente fica perfeita nesse pé-direito. Trabalhamos com lâmina natural e ferragens com amortecimento Blum.',
      },
      {
        id: 3,
        time: '23:13',
        text: 'Nosso projetista sênior Thiago preparou um slot para apresentar um modelo 3D inicial e as opções de acabamentos: terça-feira às 15h ou quarta às 19h (online ou no showroom). O que preferem?',
      },
    ],
    kanban: {
      column: 'Briefing Qualificado & 3D',
      badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
      score: 94,
      ticket: 'Ticket Alto (R$ 35k - R$ 55k)',
      summary:
        'Cozinha Americana Gourmet com Ilha e Torre Quente. Lâmina Natural + Ferragens Blum. Planta analisada. Chaves entregues.',
      scheduledEvent: 'Apresentação 3D com Projetista Thiago — Terça às 15h',
      whatsappAlert:
        '🔔 Alerta enviado no WhatsApp do Thiago: "Lead Quente: Marina e Fernando (Cozinha Gourmet R$ 45k). Slot pré-agendado para Terça 15h. Briefing anexado."',
    },
  },
};

type DemoKey = keyof typeof DEMOS;

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<DemoKey>('advocacia');
  const demo = DEMOS[activeTab];

  return (
    <section id="demonstracao" className="py-14 sm:py-24 bg-[#0B0F19] relative overflow-hidden border-t border-[#1F2937]/50">
      {/* Luz ambiente de destaque */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[350px] sm:h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

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
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 border ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'border-[#1F2937] bg-[#111827] text-gray-400 hover:text-white hover:border-[#374151]'
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

        {/* Simulador Lado a Lado */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch"
          >
            {/* LADO ESQUERDO: WhatsApp do Cliente (7 Colunas) */}
            <div className="lg:col-span-7 border border-[#1F2937] bg-[#111827] rounded-xl overflow-hidden shadow-2xl flex flex-col">
              {/* Header do WhatsApp Mockup */}
              <div className="bg-[#1F2937]/90 px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[#283548] flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <WhatsAppIcon size={18} />
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-400 border-2 border-[#111827]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white truncate">
                      {demo.segment === 'Escritório de Advocacia'
                        ? 'Atendimento Oficial • Dr. Marcelo'
                        : 'Atendimento Oficial • Bella Casa'}
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      Online • Atendente IA Pulso 24
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-gray-400 bg-[#0B0F19] px-2 py-0.5 sm:py-1 rounded border border-[#283548]">
                    {demo.leadTime.split('(')[0].trim()}
                  </span>
                </div>
              </div>

              {/* Corpo da Conversa - Mensagens em Fluxo Natural (Sem Textão) */}
              <div className="p-3.5 sm:p-5 space-y-2.5 sm:space-y-3 bg-[#0B0F19]/95 flex-1 min-h-[380px] sm:min-h-[460px] flex flex-col justify-between">
                <div className="space-y-2.5 sm:space-y-3">
                  {/* Mensagem 1 do Cliente: Áudio de 1:15 */}
                  <div className="flex justify-end">
                    <div className="max-w-[90%] sm:max-w-[75%] bg-[#005C4B] text-white p-3 rounded-2xl rounded-tr-xs shadow-md">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors shrink-0">
                          <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {/* Forma de onda sonora fake adaptada */}
                          <div className="flex items-center gap-1 h-5 overflow-hidden">
                            {[12, 20, 14, 26, 16, 22, 28, 18, 12, 20, 24, 16].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-white/80 rounded-full shrink-0"
                                style={{ height: `${h}px` }}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-emerald-100/80 mt-1">
                            <span>0:00 / {demo.audioDuration}</span>
                            <span className="flex items-center gap-1">
                              22:48 <CheckCheck className="h-3 w-3 text-cyan-300" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-emerald-100/90 mt-2 italic border-t border-white/10 pt-1.5 leading-snug">
                        {demo.clientAudioText}
                      </p>
                    </div>
                  </div>

                  {/* Mensagem 2 do Cliente: Anexo Documento / Foto */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] sm:max-w-[70%] bg-[#005C4B] text-white p-2.5 rounded-2xl rounded-tr-xs shadow-md flex items-center gap-2.5">
                      <div className="h-9 w-9 bg-black/20 rounded-lg flex items-center justify-center text-emerald-300 shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate text-white">{demo.attachment.name}</p>
                        <p className="text-[9px] text-emerald-200/70">{demo.attachment.size} • Processado</p>
                      </div>
                      <span className="text-[9px] text-emerald-200/80 self-end flex items-center gap-0.5 shrink-0">
                        22:48 <CheckCheck className="h-3 w-3 text-cyan-300" />
                      </span>
                    </div>
                  </div>

                  {/* Indicador de Resposta da IA */}
                  <div className="flex items-center gap-1.5 py-0.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <Zap className="h-3 w-3 shrink-0" />
                      IA transcreveu o áudio e respondeu em {demo.responseTime}
                    </span>
                  </div>

                  {/* Mensagens da IA Divididas em Balões Humanizados */}
                  <div className="space-y-1.5 sm:space-y-2">
                    {demo.aiReplies.map((reply, idx) => (
                      <div key={reply.id} className="flex justify-start">
                        <div
                          className={`max-w-[92%] sm:max-w-[85%] bg-[#202C33] text-gray-100 p-2.5 sm:p-3 rounded-2xl shadow-md border border-[#2A3942] ${
                            idx === 0 ? 'rounded-tl-xs' : ''
                          }`}
                        >
                          <p className="text-xs sm:text-sm leading-relaxed text-gray-200">
                            {reply.text}
                          </p>
                          <div className="flex justify-end items-center gap-1 text-[9px] sm:text-[10px] text-gray-400 mt-1">
                            <span>{reply.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Rodapé do Chat */}
                <div className="pt-2.5 border-t border-[#1F2937]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[10px] sm:text-[11px] text-gray-500">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Zap className="h-3 w-3 shrink-0" /> Conversa fluida em blocos curtos, como atendente real
                  </span>
                  <span className="text-gray-400">Sem menus mecânicos</span>
                </div>
              </div>
            </div>

            {/* LADO DIREITO: CRM Kanban & Automações Pulso 24 (5 Colunas) */}
            <div className="lg:col-span-5 border border-[#1F2937] bg-[#111827] rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-3 sm:space-y-4">
                {/* Header do Card CRM */}
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div>
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-gray-500">
                      Painel do Cliente • CRM & Alertas
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">{demo.leadName}</h3>
                  </div>
                  <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-lg border ${demo.kanban.badgeColor}`}>
                    {demo.kanban.column}
                  </span>
                </div>

                {/* Score & Ticket */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="border border-[#1F2937] bg-[#0B0F19] p-2.5 sm:p-3 rounded-lg">
                    <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider block">Score de Compra</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-xl sm:text-2xl font-black text-emerald-400">{demo.kanban.score}</span>
                      <span className="text-[10px] sm:text-xs text-gray-500">/ 100</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium">Lead Quente Pronto</span>
                  </div>

                  <div className="border border-[#1F2937] bg-[#0B0F19] p-2.5 sm:p-3 rounded-lg">
                    <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider block">Valor Estimado</span>
                    <p className="text-xs sm:text-sm font-bold text-cyan-400 mt-1 truncate">{demo.kanban.ticket}</p>
                    <span className="text-[10px] text-gray-500">Triagem automática</span>
                  </div>
                </div>

                {/* 1. Alerta Instantâneo no WhatsApp do Dono / Vendedor */}
                <div className="border border-emerald-500/30 bg-emerald-500/10 p-3 sm:p-3.5 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <Smartphone className="h-3.5 w-3.5" />
                    Alerta no WhatsApp do Responsável:
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed font-mono text-[10px] sm:text-[11px] bg-[#0B0F19]/80 p-2 sm:p-2.5 rounded border border-emerald-500/20">
                    {demo.kanban.whatsappAlert}
                  </p>
                </div>

                {/* 2. Agendamento Sincronizado */}
                <div className="border border-[#1F2937] bg-[#0B0F19] p-2.5 sm:p-3 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <CalendarCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Reunião na Agenda Google
                  </div>
                  <p className="text-xs text-gray-300">
                    {demo.kanban.scheduledEvent}
                  </p>
                </div>

                {/* 3. Continuidade no Painel Administrativo */}
                <div className="border border-[#1F2937] bg-[#0B0F19] p-2.5 sm:p-3 rounded-lg space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Acompanhamento no Painel
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 leading-relaxed">
                    Você acompanha métricas, histórico completo, áudios e assume a conversa quando quiser.
                  </p>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="pt-3.5 border-t border-[#1F2937] mt-3">
                <Button
                  variant="whatsapp"
                  size="default"
                  className="w-full text-xs sm:text-sm font-semibold rounded-lg h-11"
                  onClick={() =>
                    window.open(
                      getWhatsAppUrl('Quero ver a demonstração ao vivo da IA no WhatsApp'),
                      '_blank'
                    )
                  }
                >
                  <WhatsAppIcon size={16} />
                  Testar essa mesma IA no meu WhatsApp
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
