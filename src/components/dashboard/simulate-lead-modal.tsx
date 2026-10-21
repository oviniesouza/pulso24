'use client';

import { useState } from 'react';
import { X, Bot, Sparkles, Send, Mic, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTenant } from '@/contexts/tenant-context';
import { useDashboardView } from '@/contexts/dashboard-view-context';

export function SimulateLeadModal() {
  const { isSimulateModalOpen, setIsSimulateModalOpen, setActiveTab } = useDashboardView();
  const { activeTenant } = useTenant();

  const [leadName, setLeadName] = useState('Mariana Siqueira');
  const [leadPhone, setLeadPhone] = useState('5511998765432');
  const [leadMessage, setLeadMessage] = useState(
    activeTenant.isOwnBot
      ? 'Olá, tenho um escritório de advocacia com 3 sócios e perdemos muitos clientes à noite. Como funciona o Pulso 24?'
      : 'Boa noite! Gostaria de um orçamento para armários planejados da minha cozinha e lavanderia.'
  );
  const [isAudio, setIsAudio] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isSimulateModalOpen) return null;

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending lead and switching to CRM
    await new Promise((r) => setTimeout(r, 700));
    setIsSubmitting(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setIsSimulateModalOpen(false);
      setActiveTab('crm');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0E131F] border border-white/10 p-6 shadow-2xl rounded-sm">
        <button
          onClick={() => setIsSimulateModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="h-8 w-8 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Simular Lead no WhatsApp</h3>
            <p className="text-xs text-gray-400">
              Dispara uma mensagem de teste para o cérebro da IA ({activeTenant.ai_name})
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <div className="inline-flex h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 items-center justify-center text-emerald-400 mb-2">
              <Bot className="h-6 w-6 animate-pulse" />
            </div>
            <h4 className="text-sm font-bold text-white">Lead Injetado com Sucesso!</h4>
            <p className="text-xs text-gray-400">
              A IA já está processando e qualificando este lead no CRM...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSimulate} className="space-y-4 mt-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300">Nome do Lead Fictício</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  required
                  className="w-full bg-[#0B0F17] border border-white/10 pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300">WhatsApp do Lead</label>
              <input
                type="text"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                required
                className="w-full bg-[#0B0F17] border border-white/10 px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-300">Mensagem Inicial</label>
                <button
                  type="button"
                  onClick={() => setIsAudio(!isAudio)}
                  className={`text-[11px] flex items-center gap-1 transition-colors ${
                    isAudio ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Mic className="h-3 w-3" />
                  {isAudio ? 'Simulando Áudio (Whisper)' : 'Simular como Áudio'}
                </button>
              </div>
              <textarea
                rows={3}
                value={leadMessage}
                onChange={(e) => setLeadMessage(e.target.value)}
                required
                className="w-full bg-[#0B0F17] border border-white/10 p-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 resize-none"
              />
              {isAudio && (
                <p className="text-[10px] text-cyan-400 flex items-center gap-1">
                  <span>🎙️</span> Áudio de 0:48 simulado. A IA transcreverá via Whisper e responderá em 7s.
                </p>
              )}
            </div>

            <div className="bg-[#0B0F17] border border-white/5 p-3 text-xs text-gray-400 flex items-center justify-between">
              <span>Tenant Ativo:</span>
              <span className="font-semibold text-emerald-400">{activeTenant.name}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 text-xs border-white/10 hover:bg-white/5"
                onClick={() => setIsSimulateModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
              >
                {isSubmitting ? (
                  'Disparando...'
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5 mr-1.5" />
                    Simular e Abrir CRM
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
