'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  FileText,
  CalendarCheck,
  Check,
  Bell,
  Sparkles,
  CheckCheck,
  ArrowRight,
  Zap,
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
    score: 98,
    ticket: 65000,
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

const WAVE_BARS = [10, 16, 12, 20, 14, 18, 22, 16, 10, 18, 20, 12, 8];

// Contador numérico suave sem dependências pesadas
function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  active,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const [count, setCount] = useState(active ? target : 0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    let start = 0;
    const duration = 900;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(start + (target - start) * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const req = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(req);
  }, [active, target]);

  return (
    <span>
      {prefix}
      {count.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

export function InteractiveDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });

  // Etapas da simulação (0 a 10)
  // 0: Início
  // 1: Áudio do cliente entra e toca (0.8s)
  // 2: PDF anexado do cliente entra (1.8s)
  // 3: IA processa e tag surge com sparkles (2.8s)
  // 4: IA digitando... (3.6s)
  // 5: Balão 1 da IA entra (4.6s)
  // 6: Balão 2 da IA entra (6.0s)
  // 7: Balão 3 da IA entra (7.4s)
  // 8: Conector acende com feixe de dados (8.3s)
  // 9: CRM ativa métricas (Score e Ticket) (9.0s)
  // 10: Timeline passos 1, 2 e 3 entram em sequência e finaliza (9.8s - 16s)
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);

  // Controle de timeline da simulação
  useEffect(() => {
    if (!isInView || isPaused) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 10) {
          // Permanece no estado final por 7 segundos e reinicia suavemente
          return 10;
        }
        return prev + 1;
      });
    }, 1100);

    return () => clearInterval(timer);
  }, [isInView, isPaused]);

  // Loop de reinício após leitura completa
  useEffect(() => {
    if (!isInView || isPaused) return;

    if (currentStep === 10) {
      const loopTimeout = setTimeout(() => {
        setCurrentStep(0);
      }, 7000);
      return () => clearTimeout(loopTimeout);
    }
  }, [currentStep, isInView, isPaused]);

  // Contador de áudio tocando
  useEffect(() => {
    if (currentStep >= 1 && currentStep <= 4) {
      const interval = setInterval(() => {
        setAudioSeconds((sec) => (sec < 6 ? sec + 1 : 6));
      }, 300);
      return () => clearInterval(interval);
    } else if (currentStep === 0) {
      setAudioSeconds(0);
    }
  }, [currentStep]);

  const handleRestart = () => {
    setCurrentStep(0);
    setAudioSeconds(0);
    setIsPaused(false);
  };

  const handleShowAll = () => {
    setCurrentStep(10);
    setAudioSeconds(6);
  };

  const isAudioPlaying = currentStep >= 1 && currentStep <= 3;
  const isTyping = currentStep === 4 || currentStep === 5;

  return (
    <section
      id="demonstracao"
      ref={sectionRef}
      className="py-14 sm:py-20 bg-[#0B0F19] relative overflow-hidden border-t border-white/5"
    >
      {/* Luz ambiente suave de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-emerald-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-6">
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

        {/* Barra de Controle da Simulação Interativa */}
        <div className="max-w-2xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-gray-400 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-emerald-400 text-[11px] font-semibold">
              {currentStep < 10 ? 'Simulação em Tempo Real' : 'Atendimento Concluído'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title={isPaused ? 'Continuar' : 'Pausar'}
            >
              {isPaused ? <Play className="h-3 w-3 text-emerald-400" /> : <Pause className="h-3 w-3" />}
              <span>{isPaused ? 'Continuar' : 'Pausar'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Reiniciar simulação"
            >
              <RotateCcw className="h-3 w-3 text-emerald-400" />
              <span>Reiniciar</span>
            </button>

            {currentStep < 10 && (
              <button
                onClick={handleShowAll}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors cursor-pointer"
              >
                <span>Ver tudo</span>
              </button>
            )}
          </div>
        </div>

        {/* Simulador Lado a Lado Compacto com Grid Assimétrico de 12 Colunas */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-stretch relative">
            {/* LADO ESQUERDO: WhatsApp do Cliente (7 Colunas) */}
            <div className="lg:col-span-7 border border-white/10 bg-[#111827]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[490px]">
              <div>
                {/* Header integrado ao topo da janela */}
                <div className="px-5 sm:px-6 py-3.5 sm:py-4 bg-white/[0.03] border-b border-white/[0.08] rounded-t-2xl -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5 flex items-center justify-between">
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
                        {isTyping ? 'IA digitando...' : 'Online • Atendente IA Pulso 24'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {DEMO_DATA.leadTime}
                  </span>
                </div>

                {/* Mensagens do Cliente e Respostas da IA */}
                <div className="space-y-2.5">
                  {/* Mensagem 1 do Cliente: Áudio Compacto em Esmeralda Escuro */}
                  <AnimatePresence>
                    {currentStep >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[92%] sm:max-w-[78%] bg-emerald-950/80 text-white p-3.5 rounded-2xl rounded-tr-xs shadow-md border border-emerald-500/30">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-white shrink-0">
                              <Play className="h-3 w-3 fill-emerald-300 ml-0.5 text-emerald-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                              {/* Onda sonora animada ao vivo */}
                              <div className="flex items-center gap-1 h-4 overflow-hidden">
                                {WAVE_BARS.map((h, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-1 bg-white/80 rounded-full shrink-0"
                                    animate={
                                      isAudioPlaying
                                        ? {
                                            height: [
                                              Math.max(4, h * 0.3),
                                              h,
                                              Math.max(4, h * 0.5),
                                              h * 1.1,
                                              Math.max(4, h * 0.3),
                                            ],
                                          }
                                        : { height: h }
                                    }
                                    transition={
                                      isAudioPlaying
                                        ? {
                                            repeat: Infinity,
                                            duration: 0.7,
                                            delay: (i % 4) * 0.1,
                                            ease: 'easeInOut',
                                          }
                                        : { duration: 0.2 }
                                    }
                                    style={{ height: `${h}px` }}
                                  />
                                ))}
                              </div>
                              <div className="flex justify-between items-center text-[10px] text-emerald-100/80 mt-1 font-mono">
                                <span>0:0{audioSeconds} / {DEMO_DATA.audioDuration}</span>
                                <span className="flex items-center gap-1">
                                  22:48 <CheckCheck className="h-3 w-3 text-cyan-300" />
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Tag Compacta e Elegante com animação de leitura */}
                          {currentStep >= 3 && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3 }}
                              className="mt-2.5 pt-2 border-t border-emerald-500/20 flex items-center gap-1.5 text-[11px] text-emerald-200 font-medium leading-tight"
                            >
                              <Sparkles className="h-3.5 w-3.5 text-emerald-300 shrink-0 animate-pulse" />
                              <span>{DEMO_DATA.audioTag}</span>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mensagem 2 do Cliente: Anexo Processado Compacto */}
                  <AnimatePresence>
                    {currentStep >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className="flex justify-end"
                      >
                        <div className="max-w-[85%] sm:max-w-[70%] bg-emerald-950/80 text-white py-2.5 px-3.5 rounded-2xl rounded-tr-xs shadow-md flex items-center gap-2.5 border border-emerald-500/30">
                          <div className="h-8 w-8 bg-black/30 border border-white/10 rounded-lg flex items-center justify-center text-emerald-300 shrink-0">
                            <FileText className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate text-white">{DEMO_DATA.attachment.name}</p>
                            <p className="text-[10px] text-emerald-200/70 font-mono">
                              {DEMO_DATA.attachment.size} • {currentStep >= 3 ? 'Processado ✨' : 'Analisando...'}
                            </p>
                          </div>
                          <span className="text-[10px] text-emerald-200/80 self-end flex items-center gap-0.5 shrink-0 font-mono">
                            22:48 <CheckCheck className="h-3 w-3 text-cyan-300" />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Balão de Digitação Humanizado da IA */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex justify-start"
                      >
                        <div className="bg-[#202C33] text-gray-400 px-3.5 py-2 rounded-2xl rounded-tl-xs shadow-xs border border-white/5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          <span className="text-[11px] text-gray-300 ml-1 font-medium">Digitando resposta...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mensagens da IA em 3 Balões Enxutos com Fade-in Sequencial */}
                  <div className="space-y-1.5 pt-0.5">
                    {DEMO_DATA.aiReplies.map((reply, idx) => {
                      // Balão 1 entra no step 5, Balão 2 no step 6, Balão 3 no step 7
                      const shouldShow = currentStep >= 5 + idx;
                      return (
                        <AnimatePresence key={reply.id}>
                          {shouldShow && (
                            <motion.div
                              initial={{ opacity: 0, y: 12, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.35, ease: 'easeOut' }}
                              className="flex justify-start"
                            >
                              <div
                                className={`max-w-[92%] sm:max-w-[85%] bg-[#202C33] text-gray-100 px-3.5 py-2.5 rounded-2xl shadow-xs border border-white/5 ${
                                  idx === 0 ? 'rounded-tl-xs' : ''
                                }`}
                              >
                                <p className="text-[13px] leading-snug text-gray-200">
                                  {reply.text}
                                </p>
                                <div className="flex justify-end items-center gap-1 text-[10px] text-gray-400 mt-1 font-mono">
                                  <span>{reply.time}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Rodapé informativo discreto */}
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {currentStep >= 7 ? 'Triagem concluída em menos de 10s' : 'Atendimento inteligente em andamento...'}
                </span>
                <span className="font-mono text-[10px] text-gray-600">Sem menus de robô</span>
              </div>
            </div>

            {/* Conector Minimalista com Feixe de Pulso Ativo */}
            <div className="hidden lg:flex absolute left-[58.333%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
              <motion.div
                animate={
                  currentStep >= 8
                    ? {
                        scale: [1, 1.15, 1],
                        boxShadow: [
                          '0 0 0px rgba(16,185,129,0)',
                          '0 0 25px rgba(16,185,129,0.5)',
                          '0 0 10px rgba(16,185,129,0.2)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-black/80 backdrop-blur-md relative"
              >
                <ArrowRight className="h-4 w-4 text-emerald-400" />
                {currentStep >= 8 && (
                  <span className="absolute -inset-1 rounded-full bg-emerald-400/20 animate-ping" />
                )}
              </motion.div>
            </div>

            {/* LADO DIREITO: CRM & Painel do Cliente (5 Colunas com Superfície Refinada) */}
            <div className="lg:col-span-5 border border-white/[0.08] bg-[#111827]/80 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[490px]">
              <div className="flex flex-col flex-1">
                {/* Header do Card CRM */}
                <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-3.5">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 block mb-0.5">
                      Resumo Inteligente • Gerado pela IA
                    </span>
                    <h3 className="text-lg font-semibold text-white tracking-tight">{DEMO_DATA.leadName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {currentStep >= 8 ? 'Triagem e agendamento realizados às 22h48 (em 6s)' : 'Aguardando dados da conversa...'}
                    </p>
                  </div>
                  <motion.span
                    animate={
                      currentStep >= 8
                        ? { scale: [0.9, 1.05, 1], opacity: 1 }
                        : { opacity: 0.6 }
                    }
                    className="px-2.5 py-1 text-xs font-semibold rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shrink-0 flex items-center gap-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {DEMO_DATA.crm.statusBadge}
                  </motion.span>
                </div>

                {/* Grid de Métricas com Destaque e Contador Animado */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="bg-black/30 border border-white/[0.06] rounded-xl p-4">
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block mb-1">
                      Score de Compra
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white tracking-tight">
                        <AnimatedCounter
                          target={DEMO_DATA.crm.score}
                          suffix="/100"
                          active={currentStep >= 9}
                        />
                      </span>
                    </div>
                    <span className="text-xs font-medium text-emerald-400 mt-0.5 block">Lead Quente Pronto</span>
                  </div>

                  <div className="bg-black/30 border border-white/[0.06] rounded-xl p-4">
                    <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block mb-1">
                      Ticket Estimado
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-emerald-400 tracking-tight truncate">
                        <AnimatedCounter
                          target={DEMO_DATA.crm.ticket}
                          prefix="R$ "
                          active={currentStep >= 9}
                        />
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 mt-0.5 block">Validado no documento</span>
                  </div>
                </div>

                {/* Timeline Vertical de 3 Passos com Revelação Animada */}
                <div className="space-y-4 my-auto py-4">
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-wider block">
                    Ações Executadas Automaticamente
                  </span>
                  <div className="relative border-l border-white/10 ml-3 pl-4 space-y-4">
                    {DEMO_DATA.crm.timeline.map((step, idx) => {
                      // Passos entram em sequência quando currentStep >= 9 ou 10
                      const isStepActive = currentStep >= 9 + idx;
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0.3, x: -6 }}
                          animate={
                            isStepActive
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0.3, x: 0 }
                          }
                          transition={{ duration: 0.4 }}
                          className="relative group"
                        >
                          {/* Node Icon com Glow */}
                          <div
                            className={`absolute -left-[23px] top-0.5 h-5 w-5 rounded-full flex items-center justify-center shadow-md transition-all ${
                              isStepActive
                                ? 'bg-[#111827] border border-emerald-400 text-emerald-400 shadow-emerald-500/20'
                                : 'bg-[#111827] border border-white/10 text-gray-500'
                            }`}
                          >
                            {step.type === 'check' && <Check className="h-3 w-3 stroke-[2.5]" />}
                            {step.type === 'calendar' && <CalendarCheck className="h-3 w-3 stroke-[2.5]" />}
                            {step.type === 'bell' && <Bell className="h-3 w-3 stroke-[2.5]" />}
                          </div>
                          <div>
                            <p
                              className={`text-[13px] font-semibold leading-tight transition-colors ${
                                isStepActive ? 'text-white' : 'text-gray-400'
                              }`}
                            >
                              {step.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{step.detail}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Botão de Ação com Efeito Glow quando a Simulação Conclui */}
              <div className="pt-4 border-t border-white/[0.06] mt-auto">
                <Button
                  variant="whatsapp"
                  className={`w-full text-sm font-semibold rounded-lg py-3 h-auto shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group ${
                    currentStep >= 10
                      ? 'shadow-emerald-500/40 ring-2 ring-emerald-400/40'
                      : 'shadow-emerald-500/20 hover:shadow-emerald-500/30'
                  }`}
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
