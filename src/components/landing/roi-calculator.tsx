'use client';

import { motion } from 'framer-motion';
import {
  TrendingDown,
  TrendingUp,
  XCircle,
  CheckCircle2,
  DollarSign,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

export function RoiCalculator() {
  return (
    <section id="economia" className="py-24 bg-[#0B0F19] relative border-t border-[#1F2937]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3">
            <DollarSign className="h-3.5 w-3.5" />
            Matemática Comercial
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Faça as contas: <br />
            <span className="text-emerald-400">Quanto custa NÃO ter o Pulso 24?</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            Contratar mais pessoas para responder mensagens no WhatsApp é caro, lento e ineficiente. Veja o comparativo real entre a contratação tradicional e a nossa IA comercial:
          </p>
        </div>

        {/* Comparativo Lado a Lado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Card 1: Modelo Tradicional CLT */}
          <div className="border border-red-500/20 bg-[#111827]/80 rounded-xl p-6 sm:p-8 flex flex-col justify-between relative">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold block">
                    Modelo Antigo & Caro
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">1 Atendente / SDR Humano (CLT)</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <TrendingDown className="h-5 w-5" />
                </div>
              </div>

              {/* Preço Médio Mensal */}
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Custo médio total por mês</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-red-400">R$ 4.150</span>
                  <span className="text-sm text-gray-400">/mês por atendente</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Salário (R$ 2.200) + FGTS/Encargos/13º (R$ 1.350) + VT/VR (R$ 600)
                </p>
              </div>

              {/* Limitações */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Limitações Reais:</p>
                <ul className="space-y-2.5">
                  {[
                    'Trabalha apenas 8h por dia (segunda a sexta)',
                    'Sem atendimento à noite, domingos e feriados (quando 42% dos leads entram)',
                    'Demora de 15 a 45 minutos para responder quando está ocupado',
                    'Não faz follow-up estruturado de 5 toques nos clientes que sumiram',
                    'Férias, atestados médicos, turnover e necessidade de retreinar do zero',
                    'Capacidade máxima de atender 2 a 3 conversas simultâneas com qualidade',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                      <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1F2937] mt-6 text-center">
              <span className="text-xs text-red-400/90 font-mono">
                Custo Anual Estimado: ~R$ 49.800 + riscos trabalhistas
              </span>
            </div>
          </div>

          {/* Card 2: Pulso 24 Pro */}
          <div className="border-2 border-emerald-500 bg-[#111827] rounded-xl p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_0_35px_rgba(16,185,129,0.15)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-black font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
              A Escolha dos Empresários Inteligentes
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    Alta Eficiência & Escala
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">Pulso 24 Pro (IA Comercial 24/7)</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              {/* Preço Pulso 24 */}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Investimento mensal fixo</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400">R$ 497</span>
                  <span className="text-sm text-gray-400">/mês (sem fidelidade)</span>
                </div>
                <p className="text-xs text-emerald-300 font-semibold mt-1">
                  Apenas R$ 16,50 por dia — menos que o valor de um café da manhã
                </p>
              </div>

              {/* Vantagens */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Vantagens Imediatas:</p>
                <ul className="space-y-2.5">
                  {[
                    'Atendimento ativo 24h por dia, 7 dias por semana, 365 dias no ano',
                    'Responde áudios, textos, fotos e PDFs em menos de 10 segundos',
                    'Atende 100+ clientes simultaneamente com a mesma atenção e carinho',
                    'Régua automática de follow-up (4h, 24h, 72h) que recupera 23% dos leads',
                    'Zero encargos trabalhistas, zero faltas, zero dor de cabeça de gestão',
                    'Qualificação precisa e agendamento direto na sua agenda do Google',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white font-medium">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1F2937] mt-6">
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full text-sm font-bold rounded-lg group"
                onClick={() =>
                  window.open(
                    'https://wa.me/5511999999999?text=Quero+contratar+o+Pulso+24+com+economia+imediata',
                    '_blank'
                  )
                }
              >
                <WhatsAppIcon size={18} />
                Quero Economizar e Vender Mais Agora
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Destaque de Economia Anual */}
        <div className="mt-12 max-w-4xl mx-auto border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-emerald-950/40 p-6 sm:p-8 rounded-2xl text-center shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="text-left sm:text-left">
              <h4 className="text-xl sm:text-2xl font-black text-white">
                Economia direta de até <span className="text-emerald-400">R$ 42.000 / ano</span> em folha de pagamento
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                E o mais importante: você para de jogar fora os leads que chegam nos finais de semana e noites. Apenas 1 cliente fechado fora do horário comercial já paga todo o seu ano de Pulso 24.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
