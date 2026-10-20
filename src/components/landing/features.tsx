'use client';

import { motion } from 'framer-motion';
import { Mic, Image, FileText, Users, Repeat, Zap } from 'lucide-react';

const features = [
  {
    icon: Mic,
    color: 'emerald',
    title: 'Ouve Áudios e Responde',
    description:
      'A IA transcreve e interpreta mensagens de voz em tempo real. Seu cliente manda um áudio de 2 minutos — a IA entende, qualifica e responde em menos de 10 segundos.',
    tag: 'STT com IA',
  },
  {
    icon: Image,
    color: 'cyan',
    title: 'Analisa Fotos e Imagens',
    description:
      'O cliente manda uma foto do ambiente para o briefing de móveis planejados ou uma foto do documento para o escritório de advocacia. A IA analisa, extrai informações e continua o atendimento.',
    tag: 'Visão Computacional',
  },
  {
    icon: FileText,
    color: 'emerald',
    title: 'Lê e Resume PDFs',
    description:
      'Contratos, laudos, plantas baixas, procurações — a IA lê qualquer PDF, extrai os pontos-chave e usa essa informação para qualificar o lead com precisão cirúrgica.',
    tag: 'Processamento de Docs',
  },
  {
    icon: Users,
    color: 'cyan',
    title: 'Qualifica Leads 24/7',
    description:
      'Formulário de triagem personalizado para o seu negócio. A IA faz as perguntas certas, identifica potencial de compra e classifica cada lead automaticamente: quente, morno ou frio.',
    tag: 'Lead Scoring Automático',
  },
  {
    icon: Repeat,
    color: 'emerald',
    title: 'Follow-up Automático',
    description:
      'Lead sumiu? A IA retoma o contato automaticamente em 4h, 24h e 72h com mensagens naturais e personalizadas. Taxa de recuperação média de 23% dos leads que não responderam.',
    tag: 'Régua de Nutrição',
  },
  {
    icon: Zap,
    color: 'cyan',
    title: 'Resposta Instantânea',
    description:
      'Nunca mais perca um lead por demora no retorno. A IA responde em menos de 10 segundos, a qualquer hora — feriado, madrugada, domingo. Cada segundo conta na conversão.',
    tag: '< 10s de Resposta',
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Features() {
  return (
    <section id="funcionalidades" className="py-14 sm:py-24 bg-[#0B0F19] border-t border-[#1F2937]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — ASYMMETRIC */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3 rounded-full">
            O que a IA faz
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
            Não é um chatbot comum.<br />
            <span className="text-emerald-400">É um vendedor comercial</span><br />
            que nunca cansa.
          </h2>
        </motion.div>

        {/* Feature cards — staggered grid, NOT bento */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className={`border border-[#1F2937] bg-[#111827] rounded-xl p-5 sm:p-6 hover:border-emerald-500/30 transition-all duration-300 group ${
                i === 1 ? 'md:mt-8' : ''
              } ${
                i === 3 ? 'md:mt-0 lg:-mt-8' : ''
              }`}
            >
              <div className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-xs mb-4 ${
                feature.color === 'emerald'
                  ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
                  : 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400'
              }`}>
                {feature.tag}
              </div>

              <feature.icon className={`h-8 w-8 mb-4 ${
                feature.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'
              }`} />

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
