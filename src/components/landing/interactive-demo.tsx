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
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { Button } from '@/components/ui/button';

const DEMOS = {
  advocacia: {
    segment: 'Escritório de Advocacia',
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
    aiReply:
      'Olá, Carlos! Boa noite. Sinto muito pela perda do seu pai.\n\nOuvi seu áudio com atenção e examinei a escritura em anexo. Como todos os herdeiros são maiores de idade e concordam com a partilha, podemos sim fazer o inventário extrajudicial em cartório — o que é muito mais rápido e econômico do que um processo judicial.\n\nO Dr. Marcelo separou dois horários para uma consulta detalhada onde ele analisa a minuta: amanhã às 10h30 ou às 16h00. Qual horário funciona melhor para você?',
    kanban: {
      column: 'Consulta Agendada',
      badgeColor: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
      score: 96,
      urgency: 'Alta • 3 Herdeiros em consenso',
      summary:
        'Inventário Extrajudicial em Cartório. Imóvel quitado avaliado em R$ 850.000. Nenhum herdeiro menor/incapaz. Documentação inicial já analisada pela IA.',
      scheduledEvent: 'Consulta de Alinhamento com Dr. Marcelo — Amanhã às 10h30',
      actionTaken: 'Evento criado no Google Calendar + Notificação no celular do Dr. Marcelo.',
    },
  },
  moveis: {
    segment: 'Móveis Planejados & Interiores',
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
    aiReply:
      'Olá, Marina e Fernando! Parabéns pelas chaves do novo apartamento, conquista maravilhosa!\n\nAcabei de analisar a foto do ambiente e a planta da cozinha gourmet. Essa disposição com ilha central e torre quente fica perfeita nesse pé-direito de 2,65m. Trabalhamos exatamente com lâmina natural e ferragens com amortecimento Blum.\n\nNosso projetista sênior Thiago preparou um slot para apresentar um modelo 3D inicial e os detalhes de orçamento: terça-feira às 15h ou quarta às 19h (online ou no showroom). O que preferem?',
    kanban: {
      column: 'Briefing Qualificado & 3D',
      badgeColor: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
      score: 94,
      urgency: 'Ticket Alto (R$ 35k - R$ 55k)',
      summary:
        'Cozinha Americana Gourmet com Ilha Central e Torre Quente. Lâmina Natural + Ferragens Blum. Planta analisada. Chaves entregues.',
      scheduledEvent: 'Apresentação 3D com Projetista Thiago — Terça às 15h',
      actionTaken: 'Briefing gerado em PDF + Notificação enviada ao WhatsApp do Thiago.',
    },
  },
};

type DemoKey = keyof typeof DEMOS;

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<DemoKey>('advocacia');
  const demo = DEMOS[activeTab];

  return (
    <section id="demonstracao" className="py-24 bg-[#0B0F19] relative overflow-hidden">
      {/* Luz ambiente de destaque */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Veja na Prática
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            O que acontece quando seu cliente <br className="hidden sm:block" />
            <span className="text-emerald-400">manda mensagem às 22h48?</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            Sem o Pulso 24, a mensagem dorme até as 9h da manhã seguinte (e ele já fechou com o concorrente). Com o Pulso 24, o lead é acolhido, qualificado e a reunião é agendada em segundos.
          </p>

          {/* Abas de Seleção */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {(Object.keys(DEMOS) as DemoKey[]).map((key) => {
              const item = DEMOS[key];
              const Icon = item.icon;
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 border ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                      : 'border-[#1F2937] bg-[#111827] text-gray-400 hover:text-white hover:border-[#374151]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.segment}</span>
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* LADO ESQUERDO: WhatsApp do Cliente (7 Colunas) */}
            <div className="lg:col-span-7 border border-[#1F2937] bg-[#111827] rounded-xl overflow-hidden shadow-2xl flex flex-col">
              {/* Header do WhatsApp Mockup */}
              <div className="bg-[#1F2937]/90 px-4 py-3 border-b border-[#283548] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <WhatsAppIcon size={20} />
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#111827]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      {demo.segment === 'Escritório de Advocacia'
                        ? 'Atendimento Oficial • Dr. Marcelo Advocacia'
                        : 'Atendimento Oficial • Bella Casa Planejados'}
                    </p>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online • IA Comercial Pulso 24
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 bg-[#0B0F19] px-2 py-1 rounded border border-[#283548]">
                    {demo.leadTime}
                  </span>
                </div>
              </div>

              {/* Corpo da Conversa */}
              <div className="p-4 sm:p-5 space-y-4 bg-[#0B0F19]/90 flex-1 min-h-[380px] flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Mensagem 1 do Cliente: Áudio de 1:15 */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] sm:max-w-[75%] bg-[#005C4B] text-white p-3.5 rounded-2xl rounded-tr-xs shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors">
                          <Play className="h-4 w-4 fill-white ml-0.5" />
                        </div>
                        <div className="flex-1">
                          {/* Forma de onda sonora fake */}
                          <div className="flex items-center gap-1 h-5">
                            {[12, 20, 14, 28, 16, 24, 32, 18, 10, 22, 26, 14, 18, 24, 16, 20, 10].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-white/80 rounded-full"
                                style={{ height: `${h}px` }}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-emerald-100/80 mt-1">
                            <span>0:00 / {demo.audioDuration}</span>
                            <span className="flex items-center gap-1">
                              22:48 <CheckCheck className="h-3.5 w-3.5 text-cyan-300" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-emerald-100/90 mt-2 italic border-t border-white/10 pt-1.5">
                        {demo.clientAudioText}
                      </p>
                    </div>
                  </div>

                  {/* Mensagem 2 do Cliente: Anexo Documento / Foto */}
                  <div className="flex justify-end">
                    <div className="max-w-[70%] bg-[#005C4B] text-white p-2.5 rounded-2xl rounded-tr-xs shadow-md flex items-center gap-3">
                      <div className="h-10 w-10 bg-black/20 rounded-lg flex items-center justify-center text-emerald-300">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate text-white">{demo.attachment.name}</p>
                        <p className="text-[10px] text-emerald-200/70">{demo.attachment.size} • Processado</p>
                      </div>
                      <span className="text-[10px] text-emerald-200/80 self-end flex items-center gap-0.5">
                        22:48 <CheckCheck className="h-3.5 w-3.5 text-cyan-300" />
                      </span>
                    </div>
                  </div>

                  {/* Indicador de Resposta da IA */}
                  <div className="flex items-center gap-2 py-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <Zap className="h-3 w-3" />
                      IA transcreveu o áudio, leu o anexo e respondeu em {demo.responseTime}
                    </span>
                  </div>

                  {/* Mensagem da IA */}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] sm:max-w-[85%] bg-[#202C33] text-gray-100 p-3.5 rounded-2xl rounded-tl-xs shadow-md border border-[#2A3942]">
                      <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed text-gray-200">
                        {demo.aiReply}
                      </p>
                      <div className="flex justify-end items-center gap-1 text-[10px] text-gray-400 mt-2">
                        <span>22:48</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Micro Rodapé do Chat */}
                <div className="pt-2 border-t border-[#1F2937]/80 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <Zap className="h-3.5 w-3.5" /> Resposta humanizada sem menu chato (&ldquo;Digite 1 para...&rdquo;)
                  </span>
                  <span className="text-gray-400">Sem limite de caracteres</span>
                </div>
              </div>
            </div>

            {/* LADO DIREITO: CRM Kanban Pulso 24 (5 Colunas) */}
            <div className="lg:col-span-5 border border-[#1F2937] bg-[#111827] rounded-xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                {/* Header do Card CRM */}
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500">
                      Painel do Cliente • CRM Pulso 24
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{demo.leadName}</h3>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${demo.kanban.badgeColor}`}>
                    {demo.kanban.column}
                  </span>
                </div>

                {/* Score & Urgência */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-[#1F2937] bg-[#0B0F19] p-3 rounded-lg">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Score de Compra</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-emerald-400">{demo.kanban.score}</span>
                      <span className="text-xs text-gray-500">/ 100</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium">Qualificação Quente</span>
                  </div>

                  <div className="border border-[#1F2937] bg-[#0B0F19] p-3 rounded-lg">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Potencial / Ticket</span>
                    <p className="text-xs font-bold text-cyan-400 mt-2 truncate">{demo.kanban.urgency}</p>
                    <span className="text-[10px] text-gray-500">Triagem automática</span>
                  </div>
                </div>

                {/* Resumo da IA */}
                <div className="border border-emerald-500/20 bg-emerald-500/5 p-4 rounded-lg">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Resumo Executivo da IA
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {demo.kanban.summary}
                  </p>
                </div>

                {/* Ação Concluída no Piloto Automático */}
                <div className="border border-[#1F2937] bg-[#0B0F19] p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <CalendarCheck className="h-4 w-4 text-emerald-400" />
                    Ação Automática Concluída
                  </div>
                  <p className="text-xs text-gray-400">
                    {demo.kanban.scheduledEvent}
                  </p>
                  <p className="text-[11px] text-emerald-400/90 font-medium pt-1 border-t border-[#1F2937]">
                    ✓ {demo.kanban.actionTaken}
                  </p>
                </div>
              </div>

              {/* Botão de Ação */}
              <div className="pt-5 border-t border-[#1F2937] mt-4">
                <Button
                  variant="whatsapp"
                  size="default"
                  className="w-full text-xs sm:text-sm font-semibold rounded-lg"
                  onClick={() =>
                    window.open(
                      'https://wa.me/5511999999999?text=Quero+ver+a+demonstração+ao+vivo+da+IA+no+WhatsApp',
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
