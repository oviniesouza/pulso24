'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Star, Rocket, X, CreditCard, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const WHATSAPP_URL = 'https://wa.me/5511999999999?text=Quero+contratar+o+Pulso+24';

const plans = [
  {
    id: 'start',
    name: 'Pulso Start',
    price: 297,
    icon: Zap,
    description: 'Para quem quer começar a converter leads no WhatsApp sem perder tempo.',
    features: [
      '1 número WhatsApp conectado',
      'Até 500 conversas/mês',
      'IA com triagem e qualificação de leads',
      'Respostas em texto',
      'Follow-up automático (3 toques)',
      'Painel do cliente básico',
      'Suporte via WhatsApp (horário comercial)',
    ],
    missing: [
      'Transcrição de áudios',
      'Análise de fotos e PDFs',
      'CRM Kanban',
    ],
    cta: 'Começar com Start',
    highlighted: false,
    color: 'gray',
  },
  {
    id: 'pro',
    name: 'Pulso Pro',
    price: 497,
    icon: Star,
    description: 'O preferido. IA completa com áudio, imagens, PDFs e CRM integrado.',
    features: [
      '1 número WhatsApp conectado',
      'Conversas ilimitadas',
      'IA com áudio (STT), fotos e PDFs',
      'Qualificação avançada de leads',
      'CRM Kanban visual',
      'Follow-up automático (5 toques)',
      'Modo humano (pausar IA)',
      'Relatórios e métricas detalhadas',
      'Suporte prioritário 7 dias/semana',
      'Onboarding personalizado',
    ],
    missing: [] as string[],
    cta: 'Quero o Pulso Pro',
    highlighted: true,
    color: 'emerald',
  },
  {
    id: 'scale',
    name: 'Pulso Scale',
    price: 897,
    icon: Rocket,
    description: 'Para empresas que precisam de múltiplos números e relatórios de gestão.',
    features: [
      'Até 5 números WhatsApp',
      'Conversas ilimitadas',
      'Tudo do Pulso Pro',
      'Multi-atendente (equipe)',
      'Integrações via API (CRM, ERP)',
      'Relatórios executivos por número',
      'Gerente de conta dedicado',
      'SLA de 99,9% de uptime',
      'Treinamento da equipe incluso',
      'Customização total da IA',
    ],
    missing: [] as string[],
    cta: 'Falar sobre Scale',
    highlighted: false,
    color: 'cyan',
  },
] as const;

type Plan = (typeof plans)[number];

function PixQRMock() {
  return (
    <div className="w-48 h-48 mx-auto bg-white p-2 flex items-center justify-center">
      <svg viewBox="0 0 10 10" className="w-full h-full" shapeRendering="crispEdges">
        {/* Finder pattern top-left */}
        <rect x="0" y="0" width="3" height="3" fill="black" />
        <rect x="1" y="1" width="1" height="1" fill="white" />
        {/* Finder pattern top-right */}
        <rect x="7" y="0" width="3" height="3" fill="black" />
        <rect x="8" y="1" width="1" height="1" fill="white" />
        {/* Finder pattern bottom-left */}
        <rect x="0" y="7" width="3" height="3" fill="black" />
        <rect x="1" y="8" width="1" height="1" fill="white" />
        {/* Data modules */}
        {[
          [4,0],[5,0],[6,0],[3,1],[6,1],[3,2],[4,2],[6,2],
          [0,3],[2,3],[4,3],[6,3],[8,3],[9,3],[1,4],[3,4],[5,4],[7,4],[9,4],
          [0,5],[2,5],[4,5],[6,5],[8,5],[1,6],[3,6],[5,6],[7,6],
          [4,7],[5,7],[9,7],[3,8],[6,8],[9,8],[4,9],[6,9],[7,9],[8,9],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="1" height="1" fill="black" />
        ))}
      </svg>
    </div>
  );
}

function CheckoutModal({ plan, onClose }: { plan: Plan | null; onClose: () => void }) {
  const [method, setMethod] = useState<'pix' | 'card'>('pix');

  if (!plan) return null;

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Assinar {plan.name}</DialogTitle>
        <DialogDescription>
          R$ {plan.price}/mês — Cancele quando quiser
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* Payment method selector */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setMethod('pix')}
            className={`flex items-center gap-2 p-3 border text-sm font-medium transition-all ${
              method === 'pix'
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                : 'border-[#1F2937] text-gray-400 hover:border-gray-600'
            }`}
          >
            <QrCode className="h-4 w-4" />
            Pix / Boleto
          </button>
          <button
            onClick={() => setMethod('card')}
            className={`flex items-center gap-2 p-3 border text-sm font-medium transition-all ${
              method === 'card'
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                : 'border-[#1F2937] text-gray-400 hover:border-gray-600'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Cartão
          </button>
        </div>

        {method === 'pix' ? (
          <div className="border border-[#1F2937] p-4 text-center">
            <PixQRMock />
            <p className="text-xs text-gray-400 mt-3">Pix ou Boleto via Sicredi</p>
            <p className="text-xs text-gray-500 mt-1">Aprovação em até 1 dia útil</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Número do Cartão</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full bg-[#0B0F19] border border-[#1F2937] px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Validade</label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="000"
                  className="w-full bg-[#0B0F19] border border-[#1F2937] px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">Processado por Stripe — 100% seguro</p>
          </div>
        )}

        <Button variant="default" size="lg" className="w-full">
          Confirmar Assinatura — R$ {plan.price}/mês
        </Button>

        <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#1F2937]">
          <WhatsAppIcon size={16} className="text-[#25D366]" />
          <button
            onClick={() => window.open(WHATSAPP_URL, '_blank')}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Prefere fechar pelo WhatsApp?
          </button>
        </div>
      </div>
    </DialogContent>
  );
}

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  return (
    <section id="planos" className="py-24 bg-[#0B0F19] bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-widest uppercase text-emerald-400 mb-3">Planos e Preços</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase leading-tight">
            Quanto custa uma venda<br />
            <span className="text-emerald-400">perdida às 23h?</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Menos do que você pensa. O Pulso 24 custa menos que um dia de um atendente e trabalha todos os 365 dias do ano.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border bg-[#111827] p-6 relative flex flex-col h-full ${
                plan.highlighted
                  ? 'border-emerald-500 ring-1 ring-emerald-500/30'
                  : 'border-[#1F2937]'
              } ${
                i === 1 ? 'md:-mt-4' : ''
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-4 py-1 uppercase tracking-wider">
                  Mais Vendido
                </div>
              )}

              <div className={`inline-flex items-center justify-center h-10 w-10 border mb-4 ${
                plan.color === 'emerald'
                  ? 'border-emerald-500/40 bg-emerald-500/5 text-emerald-400'
                  : plan.color === 'cyan'
                    ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400'
                    : 'border-[#1F2937] bg-[#1F2937] text-gray-400'
              }`}>
                <plan.icon className="h-5 w-5" />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">R$ {plan.price}</span>
                <span className="text-gray-400 text-sm">/mês</span>
              </div>

              <div className="flex flex-col gap-3 mb-6 flex-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
                {plan.missing.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <X className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                <Button
                  variant={plan.highlighted ? 'default' : 'outline'}
                  size="lg"
                  className="w-full"
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.cta}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-[#25D366] hover:text-[#1fb855] hover:bg-transparent"
                  onClick={() => window.open(WHATSAPP_URL, '_blank')}
                >
                  <WhatsAppIcon size={14} />
                  Fechar pelo WhatsApp
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-600 mt-6"
        >
          Sem fidelidade. Cancele quando quiser. Setup e onboarding inclusos em todos os planos.
        </motion.p>
      </div>

      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <CheckoutModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      </Dialog>
    </section>
  );
}
