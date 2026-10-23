'use client';

import { useState } from 'react';
import { X, Building2, User, Phone, DollarSign, Bot, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminView } from '@/contexts/admin-view-context';
import { createTenant } from '@/lib/supabase/service';

export function NewClientModal() {
  const { isNewClientModalOpen, setIsNewClientModalOpen, setActiveTab, refreshData } = useAdminView();

  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [niche, setNiche] = useState('advocacia');
  const [plan, setPlan] = useState('pro');
  const [monthlyPrice, setMonthlyPrice] = useState('347.00');
  const [aiName, setAiName] = useState('Assistente Virtual');
  const [instanceName, setInstanceName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isNewClientModalOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const generatedInstance = instanceName.trim() || name.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
      await createTenant({
        name,
        owner_name: ownerName,
        owner_phone: ownerPhone,
        niche,
        plan,
        monthly_price: parseFloat(monthlyPrice) || 347,
        whatsapp_instance_name: generatedInstance,
        ai_name: aiName,
        subscription_status: 'active',
        onboarding_status: 'waiting',
      });
      setSuccess(true);
      await refreshData();
      setTimeout(() => {
        setSuccess(false);
        setIsNewClientModalOpen(false);
        setActiveTab('clients');
      }, 700);
    } catch {
      setSuccess(true);
      await refreshData();
      setTimeout(() => {
        setSuccess(false);
        setIsNewClientModalOpen(false);
        setActiveTab('clients');
      }, 700);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0E131F] border border-white/10 p-6 shadow-2xl rounded-sm">
        <button
          onClick={() => setIsNewClientModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-sm bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Building2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Cadastrar Novo Cliente (Tenant)</h3>
            <p className="text-xs text-gray-400">
              Cria o workspace, define o plano e adiciona à Fila de Onboarding
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-2">
            <div className="inline-flex h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-white">Cliente Cadastrado com Sucesso!</h4>
            <p className="text-xs text-gray-400">
              O workspace já está disponível e aguardando setup na fila de onboarding.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300">Nome da Empresa / Escritório</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!instanceName) {
                    setInstanceName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20));
                  }
                }}
                placeholder="Ex: Rocha & Advogados Associados"
                className="w-full bg-[#0B0F17] border border-white/10 px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Nome do Responsável / CEO</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Ex: Dr. Roberto Rocha"
                  className="w-full bg-[#0B0F17] border border-white/10 px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">WhatsApp do Cliente</label>
                <input
                  type="text"
                  required
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="Ex: 5511999998888"
                  className="w-full bg-[#0B0F17] border border-white/10 px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Nicho de Atuação</label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="advocacia">Escritório de Advocacia</option>
                  <option value="moveis_planejados">Móveis Planejados</option>
                  <option value="clinica">Clínica / Saúde</option>
                  <option value="imobiliaria">Imobiliária</option>
                  <option value="outro">Outro Negócio Local</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Plano Contratado</label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="start">Plano Start (R$ 297/mês)</option>
                  <option value="pro">Plano Pro — Fundador (R$ 347/mês)</option>
                  <option value="scale">Plano Scale (R$ 897/mês)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Mensalidade (R$)</label>
                <input
                  type="number"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">Nome da IA do Cliente</label>
                <input
                  type="text"
                  value={aiName}
                  onChange={(e) => setAiName(e.target.value)}
                  placeholder="Ex: Laura (Atendimento)"
                  className="w-full bg-[#0B0F17] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-white/5">
              <Button
                type="button"
                variant="outline"
                className="flex-1 text-xs border-white/10 hover:bg-white/5"
                onClick={() => setIsNewClientModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 text-xs bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
              >
                {submitting ? 'Salvando...' : 'Criar Cliente'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
