'use client';

import { motion } from 'framer-motion';
import { Mic, Brain, QrCode, Smartphone, ArrowRight, ShieldCheck, Zap, CalendarCheck, SlidersHorizontal } from 'lucide-react';
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
      'Nossos especialistas configuram seu prompt exclusivo, treinam o modelo para compreender áudios e arquivos do seu nicho, e ativam as travas de segurança jurídica e comercial específicas do seu negócio.',
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
  {
    step: '04',
    icon: Smartphone,
    title: 'Agendamento & Lead Quente no seu Celular',
    badge: 'Tempo: Em tempo real',
    description:
      'A IA atende, qualifica e agenda a reunião. Em seguida, dispara um alerta com o resumo do Lead Quente direto no WhatsApp do vendedor ou proprietário, além de registrar tudo no painel para você acompanhar e dar continuidade.',
    highlight: 'Você assume a conversa no momento exato de fechar.',
    color: 'cyan',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 bg-[#0B0F19] relative border-t border-[#1F2937]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3 rounded-full">
            <Zap className="h-3.5 w-3.5" />
            Fluxo Completo de Vendas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Como Funciona: <br />
            <span className="text-emerald-400">Do primeiro contato até o fechamento</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
            Você não precisa entender de tecnologia. Nossa equipe entrega sua IA 100% configurada, pronta para qualificar clientes, agendar reuniões e avisar sua equipe no WhatsApp.
          </p>
        </div>

        {/* Os 4 Passos em Grid Harmonioso */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="border border-[#1F2937] bg-[#111827] rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 relative group"
              >
                <div>
                  {/* Topo do Card com Número e Ícone */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl font-black text-gray-700 font-mono group-hover:text-emerald-400 transition-colors">
                      {s.step}
                    </span>
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center border ${
                        s.color === 'emerald'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Badge de Tempo */}
                  <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-gray-400 border border-[#1F2937] bg-[#0B0F19] px-2 py-0.5 rounded-md mb-2.5">
                    {s.badge}
                  </span>

                  {/* Título e Descrição */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {s.description}
                  </p>
                </div>

                {/* Destaque no rodapé do card */}
                <div className="pt-3 border-t border-[#1F2937]">
                  <p className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
                    {s.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Destaque do Processo: Agendamento + WhatsApp do Dono + Painel */}
        <div className="mt-10 max-w-4xl mx-auto border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-[#111827] to-cyan-950/30 p-5 sm:p-6 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <CalendarCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Agendamento Automático</p>
                <p className="text-[11px] text-gray-400">Sincroniza direto na sua agenda Google</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                <Smartphone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Alerta Quente no WhatsApp</p>
                <p className="text-[11px] text-gray-400">Resumo do lead no celular do vendedor</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Painel Administrativo</p>
                <p className="text-[11px] text-gray-400">Histórico e continuidade em 1 clique</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner Abaixo dos Passos */}
        <div className="mt-12 text-center">
          <Button
            variant="whatsapp"
            size="xl"
            className="rounded-lg shadow-[0_0_30px_rgba(37,211,102,0.25)] group px-8 h-14"
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
            Garantia de satisfação • Sem taxa de fidelidade • Setup e onboarding inclusos
          </p>
        </div>
      </div>
    </section>
  );
}
