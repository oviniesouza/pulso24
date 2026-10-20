'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

const WHATSAPP_URL = 'https://wa.me/5511999999999?text=Olá!+Quero+ver+o+Pulso+24+em+ação';

function PulseWave() {
  return (
    <div className="relative w-full max-w-xl mx-auto my-6 overflow-hidden py-1">
      <svg
        viewBox="0 0 600 40"
        className="w-full h-8 opacity-80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0,20 L180,20 L210,6 L230,34 L250,4 L270,36 L290,20 L310,20 L330,12 L350,28 L370,20 L600,20"
          stroke="#10B981"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.path
          d="M0,20 L180,20 L210,6 L230,34 L250,4 L270,36 L290,20 L310,20 L330,12 L350,28 L370,20 L600,20"
          stroke="#10B981"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity={0.2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
        />
      </svg>
    </div>
  );
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-grid pt-24 pb-16">
      {/* Luz ambiente de fundo sutil */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none opacity-40 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Badge de Dor / Conversão do Empresário */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-emerald-400 backdrop-blur-sm shadow-sm shadow-emerald-500/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nunca mais perca vendas por demora no WhatsApp</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-300 hidden sm:inline">Atendimento Comercial 24/7</span>
            </span>
          </motion.div>

          {/* Headline Centralizada & Poderosa */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.05] max-w-4xl"
          >
            Seu atendimento comercial{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              batendo 24 horas
            </span>{' '}
            no WhatsApp
          </motion.h1>

          {/* Onda de batimento cardíaco elegante */}
          <motion.div variants={fadeUp} className="w-full">
            <PulseWave />
          </motion.div>

          {/* Subtítulo focado em dores & ROI do empresário */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-9"
          >
            Enquanto seus concorrentes dormem ou demoram horas para responder, sua IA{' '}
            <strong className="text-white font-semibold">qualifica o lead em 10 segundos</strong>,{' '}
            ouve áudios, analisa arquivos e <strong className="text-emerald-400 font-semibold">agenda reuniões</strong> pronta para você fechar.
          </motion.p>

          {/* Chamada para Ação (CTAs Alinhados e Proporcionais) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md sm:max-w-none mb-12"
          >
            <Button
              variant="whatsapp"
              size="xl"
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
              className="group w-full sm:w-auto shadow-lg shadow-[#25D366]/20 px-8 h-14"
            >
              <WhatsAppIcon size={20} />
              <span className="font-bold">Testar a IA ao Vivo no WhatsApp</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="xl"
              onClick={() => document.getElementById('planos')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 h-14 border-[#1F2937] hover:border-gray-500 hover:bg-[#111827]"
            >
              Ver Planos e Valores
            </Button>
          </motion.div>

          {/* Mini-Cards / Micro-sinais de Confiança do Empresário */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl pt-8 border-t border-[#1F2937]/70"
          >
            <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-lg bg-[#111827]/40 border border-[#1F2937]/60">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">&lt; 10s de resposta</p>
                <p className="text-[11px] text-gray-400">Zero leads sem retorno</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-lg bg-[#111827]/40 border border-[#1F2937]/60">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">24/7 sem interrupção</p>
                <p className="text-[11px] text-gray-400">Madrugada, feriados e fins de semana</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-lg bg-[#111827]/40 border border-[#1F2937]/60">
              <div className="h-9 w-9 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white">WhatsApp Oficial Seguro</p>
                <p className="text-[11px] text-gray-400">Comportamento humano anti-ban</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
