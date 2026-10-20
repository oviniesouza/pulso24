'use client';

import { motion } from 'framer-motion';
import { Mic, Brain, QrCode, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

const STEPS = [
  {
    step: '01',
    icon: Mic,
    title: 'Briefing por Áudio no WhatsApp',
    badge: 'Tempo: 5 a 10 minutos',
    description:
      'Nada de formulários gigantes ou reuniões chatas. Você apenas envia um áudio no WhatsApp nos contando como sua empresa vende, suas dúvidas mais comuns, regras de preços e o que a IA NUNCA pode falar.',
    highlight: 'Você só fala, nós estruturamos tudo.',
    color: 'emerald',
  },
  {
    step: '02',
    icon: Brain,
    title: 'Nossa Equipe Treina o Cérebro da IA',
    badge: 'Tempo: 24 horas úteis',
    description:
      'Nossos especialistas em IA configuram seu prompt personalizado, treinam o modelo para compreender áudios e fotos do seu nicho, e ativam as travas de segurança jurídica e comercial específicas do seu negócio.',
    highlight: 'Engenharia de IA especializada 100% por nossa conta.',
    color: 'cyan',
  },
  {
    step: '03',
    icon: QrCode,
    title: 'Você só Lê o QR Code no Painel',
    badge: 'Tempo: 30 segundos',
    description:
      'Você abre seu painel Pulso 24, aponta a câmera do celular para o QR Code igualzinho ao WhatsApp Web e pronto! Seu atendimento comercial passa a funcionar 24 horas por dia, 7 dias por semana.',
    highlight: 'Seu WhatsApp conectado com segurança e sem complicação.',
    color: 'emerald',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3">
            <Zap className="h-3.5 w-3.5" />
            Zero Trabalho Técnico
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Ativação em 3 Passos Simples: <br />
            <span className="text-emerald-400">Nós fazemos todo o trabalho pesado</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            Você não precisa entender de código, nem de servidores, nem de inteligência artificial. Nossa equipe entrega sua IA 100% pronta e testada para começar a converter clientes.
          </p>
        </div>

        {/* Os 3 Passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="border border-[#1F2937] bg-[#111827] rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 relative group"
              >
                <div>
                  {/* Topo do Card com Número e Ícone */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-gray-700 font-mono group-hover:text-emerald-400 transition-colors">
                      {s.step}
                    </span>
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center border ${
                        s.color === 'emerald'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Badge de Tempo */}
                  <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-gray-400 border border-[#1F2937] bg-[#0B0F19] px-2.5 py-0.5 rounded-md mb-3">
                    {s.badge}
                  </span>

                  {/* Título e Descrição */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
                    {s.description}
                  </p>
                </div>

                {/* Destaque no rodapé do card */}
                <div className="pt-4 border-t border-[#1F2937]">
                  <p className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
                    {s.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner Abaixo dos Passos */}
        <div className="mt-14 text-center">
          <Button
            variant="whatsapp"
            size="xl"
            className="rounded-lg shadow-[0_0_30px_rgba(37,211,102,0.25)] group"
            onClick={() =>
              window.open(
                'https://wa.me/5511999999999?text=Quero+iniciar+o+onboarding+do+Pulso+24+agora',
                '_blank'
              )
            }
          >
            <WhatsAppIcon size={20} />
            Quero Ativar Minha IA no WhatsApp em 24h
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-xs text-gray-500 mt-3">
            Garantia incondicional de satisfação • Setup completo incluso em todos os planos
          </p>
        </div>
      </div>
    </section>
  );
}
