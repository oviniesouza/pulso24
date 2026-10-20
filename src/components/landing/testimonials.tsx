'use client';

import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, TrendingUp, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

const METRICS = [
  {
    value: '+45.000',
    label: 'Atendimentos Realizados',
    sub: 'com áudios, textos e fotos',
    icon: MessageSquare,
  },
  {
    value: '8,4s',
    label: 'Tempo Médio de Resposta',
    sub: 'mesmo às 3h da manhã ou domingos',
    icon: Clock,
  },
  {
    value: '+23%',
    label: 'Orçamentos Recuperados',
    sub: 'na régua automática de follow-up',
    icon: TrendingUp,
  },
  {
    value: '99,8%',
    label: 'Uptime & Estabilidade',
    sub: 'WhatsApp conectado sem interrupções',
    icon: ShieldCheck,
  },
];

const TESTIMONIALS = [
  {
    name: 'Dr. Marcelo Arantes',
    role: 'Sócio Fundador • Arantes & Associados',
    segment: 'Advocacia Trabalhista & Cível',
    city: 'São Paulo — SP',
    initials: 'MA',
    avatarBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    stars: 5,
    highlight: '+55% de aumento em consultas jurídicas pagas',
    quote:
      'Antes do Pulso 24, a gente perdia muitos clientes qualificados que mandavam mensagem à noite ou no fim de semana. O cliente consultava outros 3 escritórios e fechava com o primeiro que respondesse. Agora, a IA faz a triagem inicial, ouve os áudios e já agenda as consultas pagas no meu Google Calendar. Nosso faturamento com consultas aumentou 55% no primeiro mês.',
  },
  {
    name: 'Roberto Guimarães',
    role: 'Proprietário • Bella Casa Planejados',
    segment: 'Móveis Planejados & Interiores',
    city: 'Curitiba — PR',
    initials: 'RG',
    avatarBg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    stars: 5,
    highlight: 'Salvou 2 projetos de R$ 30k dados como perdidos',
    quote:
      'O cliente de móveis planejados pede orçamento em várias lojas ao mesmo tempo e depois simplesmente para de responder. Com a régua de follow-up do Pulso 24, recuperamos 2 projetos que estavam dados como perdidos só no mês passado — foram mais de R$ 30.000 em vendas salvas que pagaram a ferramenta pelo ano inteiro. A IA coleta planta, fotos e entrega o cliente pronto pro vendedor.',
  },
  {
    name: 'Dra. Juliana Prado',
    role: 'Diretora Executiva • Clínica OdontoArte',
    segment: 'Saúde & Estética Odontológica',
    city: 'Belo Horizonte — MG',
    initials: 'JP',
    avatarBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    stars: 5,
    highlight: 'Taxa de faltas (no-show) caiu pela metade',
    quote:
      'O maior gargalo da nossa recepção era responder WhatsApp enquanto atendia os pacientes presencialmente no balcão. A IA do Pulso 24 assumiu as dúvidas de valores, horários e orientações pós-procedimento. Além disso, as mensagens de confirmação reduziram nossa taxa de faltas pela metade. O suporte e setup deles foram impecáveis.',
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-14 sm:py-24 bg-[#0B0F19] relative border-t border-[#1F2937]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra de Métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 p-4 sm:p-8 bg-[#111827] border border-[#1F2937] rounded-xl sm:rounded-2xl mb-12 sm:mb-20 shadow-xl">
          {METRICS.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className={`flex flex-col items-start ${
                  idx !== 0 ? 'lg:border-l lg:border-[#1F2937] lg:pl-6' : ''
                }`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 mb-1">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-mono">
                    {m.value}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-200 mt-0.5 sm:mt-1">{m.label}</p>
                <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">{m.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Cabeçalho dos Depoimentos */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3 rounded-full">
            <Quote className="h-3.5 w-3.5" />
            Prova Social & Resultados Reais
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight px-1">
            Quem usa o Pulso 24 <br />
            <span className="text-emerald-400">nunca mais desativa</span>
          </h2>
          <p className="text-gray-400 mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed px-2">
            Veja como empresas reais em todo o Brasil transformaram seus atendimentos de WhatsApp em máquinas automáticas de vendas:
          </p>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="border border-[#1F2937] bg-[#111827] rounded-xl p-5 sm:p-7 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 relative group shadow-lg"
            >
              <div>
                {/* Estrelas */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                {/* Destaque do Resultado */}
                <div className="inline-block px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
                  {t.highlight}
                </div>

                {/* Depoimento */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Informações da Pessoa */}
              <div className="pt-4 border-t border-[#1F2937] flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border flex-shrink-0 ${t.avatarBg}`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{t.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{t.role}</p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
