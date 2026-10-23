'use client';

import {
  AlertTriangle,
  Clock,
  TrendingDown,
  Moon,
  Users,
  Repeat,
  ArrowRight,
} from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: TrendingDown,
    badge: 'Custo Elevado & Risco',
    title: 'A conta pesada de 1 atendente CLT',
    highlight: 'R$ 4.150 / mês',
    highlightSub: '~R$ 49.800 ao ano por pessoa',
    description:
      'Um salário de R$ 2.200 se transforma em mais de R$ 4.000 ao somar FGTS, 13º, férias, encargos trabalhistas, VT e VR. Para atender a semana inteira, o custo da folha dispara.',
    drawback: 'E o funcionário atende apenas 8h por dia (40h semanais). O restante da semana é silêncio.',
  },
  {
    icon: Moon,
    badge: 'Perda Imediata de Vendas',
    title: '42% dos leads entram fora do horário',
    highlight: '76% do tempo no escuro',
    highlightSub: '128 horas na semana sem atendimento',
    description:
      'O cliente pesquisa à noite (das 19h às 23h), almoço e domingos no sofá. Se ele mandar mensagem para 3 concorrentes às 21h40, ele fecha com o primeiro que responder e qualificar na hora.',
    drawback: 'Esperar até as 9h da manhã seguinte faz seu lead esfriar e comprar de quem respondeu na hora.',
  },
  {
    icon: Repeat,
    badge: 'Gargalo Humano & Esquecimento',
    title: 'Limite físico e leads abandonados',
    highlight: '+60% dos leads',
    highlightSub: 'nunca mais recebem follow-up',
    description:
      'Um atendente humano consegue conversar com no máximo 2 ou 3 pessoas ao mesmo tempo sem se perder. Em picos de tráfego, o tempo de resposta salta para mais de 40 minutos.',
    drawback: 'Sem falar em férias, atestados, faltas e turnover constante que forçam a retreinar a equipe do zero.',
  },
];

export function BusinessPain() {
  return (
    <section id="desafios" className="py-14 sm:py-20 bg-[#0B0F19] relative border-t border-white/5 overflow-hidden">
      {/* Luz ambiente suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho Focado na Dor */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/5 px-3 py-1 text-xs text-red-400 tracking-wider uppercase mb-3 rounded-full">
            <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
            O Gargalo do WhatsApp
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.15] text-white px-1">
            O custo invisível de depender <br className="hidden sm:block" />
            <span className="text-red-400">apenas de atendimento humano</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-3 leading-relaxed px-2">
            Contratar mais pessoas para digitar no WhatsApp é caro, lento e tem limite físico. Veja onde empresas perdem dinheiro e contratos todos os dias:
          </p>
        </div>

        {/* 3 Cartões de Dor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {PAIN_POINTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="border border-white/10 bg-[#111827]/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-red-500/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-semibold">
                      {item.badge}
                    </span>
                    <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Número de impacto */}
                  <div className="mb-3.5 pb-3 border-b border-white/5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-red-400 block tracking-tight">
                      {item.highlight}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {item.highlightSub}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 mt-2 bg-red-950/20 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-4 rounded-b-2xl border-t border-red-500/10">
                  <p className="text-xs text-red-300/90 leading-snug flex items-start gap-1.5">
                    <span className="text-red-400 font-bold shrink-0">⚠</span>
                    <span>{item.drawback}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Callout de Transição para a Solução */}
        <div className="mt-8 sm:mt-12 max-w-3xl mx-auto border border-emerald-500/20 bg-emerald-950/20 p-4 sm:p-6 rounded-2xl text-center">
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            💡 <strong className="text-white">A conclusão é simples:</strong> Você não precisa de mais atendentes sentados em frente a uma tela digitando mensagens repetitivas. Você precisa de um <span className="text-emerald-400 font-semibold">motor comercial inteligente</span> que atenda, qualifique e agende 24 horas por dia, sem folga e sem faltas.
          </p>
        </div>
      </div>
    </section>
  );
}
