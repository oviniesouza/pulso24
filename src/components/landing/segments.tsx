'use client';

import { motion } from 'framer-motion';
import { Scale, Sofa, Store, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

const WHATSAPP_URL = 'https://wa.me/5511999999999?text=Olá!+Quero+ver+o+Pulso+24+em+ação';

const segments = [
  {
    icon: Scale,
    name: 'Escritórios de Advocacia',
    tagline: 'Capte casos qualificados sem deixar o trabalho jurídico',
    problem: 'Advogados perdem até 40% dos leads por não responder rápido o suficiente. O cliente consulta 3 escritórios — vence o primeiro que responder.',
    benefits: [
      'Triagem jurídica inicial (área, urgência, documentos)',
      'Lê e analisa documentos PDF enviados pelo cliente',
      'Qualifica se o caso tem viabilidade antes de marcar reunião',
      'Agenda consultas automaticamente no seu calendário',
      'Trava de segurança: nunca dá parecer jurídico',
    ],
    metric: '+68% na taxa de conversão de consultas',
    color: 'emerald',
  },
  {
    icon: Sofa,
    name: 'Lojas de Móveis Planejados',
    tagline: 'Do primeiro contato até o briefing completo — sem sair do WhatsApp',
    problem: 'Ciclo de venda longo, muitos abandonos no meio do caminho. O cliente pede orçamento em 5 lojas e some. Quem nutre, vence.',
    benefits: [
      'Coleta briefing completo: ambiente, medidas, estilo, orçamento',
      'Analisa fotos do ambiente enviadas pelo cliente',
      'Segmenta leads por ticket estimado (Standard/Premium)',
      'Follow-up automático com portfólio personalizado',
      'Transfere ao vendedor com resumo completo do cliente',
    ],
    metric: '+41% de aproveitamento de orçamentos',
    color: 'cyan',
  },
  {
    icon: Store,
    name: 'Empresas Locais',
    tagline: 'Atendimento de grande empresa com custo de pequeno negócio',
    problem: 'Clínicas, imobiliárias, escolas, academias — todos precisam responder rápido mas não têm equipe 24/7. A IA resolve isso.',
    benefits: [
      'Atende e qualifica qualquer tipo de consulta',
      'Configura perguntas de triagem específicas do negócio',
      'Agenda e confirma compromissos automaticamente',
      'Dispara promoções e avisos para base de clientes',
      'Escala sem contratar: 1 IA, centenas de conversas simultâneas',
    ],
    metric: 'Economia de R$ 3.000+/mês vs. atendente dedicado',
    color: 'emerald',
  },
] as const;

export function Segments() {
  return (
    <section id="segmentos" className="py-24 bg-[#111827]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-right"
        >
          <p className="text-xs tracking-widest uppercase text-cyan-400 mb-3">Para quem é</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
            Feito para quem<br />
            <span className="text-emerald-400">não pode perder</span><br />
            nem um lead.
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`border border-[#1F2937] bg-[#111827] p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 hover:border-emerald-500/20 transition-all duration-300 ${
                i % 2 === 1 ? 'lg:ml-12' : 'lg:mr-12'
              }`}
            >
              {/* Left: Header */}
              <div>
                <div className={`inline-flex items-center justify-center h-12 w-12 border mb-4 ${
                  seg.color === 'emerald'
                    ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5'
                    : 'border-cyan-500/40 text-cyan-400 bg-cyan-500/5'
                }`}>
                  <seg.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{seg.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{seg.tagline}</p>
                <div className="border-l-2 border-[#1F2937] pl-3">
                  <p className="text-xs text-gray-500 italic">{seg.problem}</p>
                </div>
              </div>

              {/* Middle: Benefits */}
              <div className="lg:col-span-1">
                <p className="text-xs tracking-wider uppercase text-gray-500 mb-3">O que a IA faz</p>
                <ul className="space-y-2">
                  {seg.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        seg.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'
                      }`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: CTA */}
              <div className="flex flex-col justify-between">
                <div className={`border p-4 mb-4 ${
                  seg.color === 'emerald'
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-cyan-500/20 bg-cyan-500/5'
                }`}>
                  <p className={`text-sm font-bold ${
                    seg.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'
                  }`}>
                    {seg.metric}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Média dos primeiros 90 dias</p>
                </div>
                <Button
                  variant="whatsapp"
                  onClick={() => window.open(WHATSAPP_URL, '_blank')}
                  className="w-full"
                >
                  <WhatsAppIcon size={16} />
                  Ver demonstração para {seg.name.split(' ')[seg.name.split(' ').length - 1]}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
