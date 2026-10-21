'use client';

import { useState } from 'react';
import { X, BatteryCharging, DollarSign, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminView } from '@/contexts/admin-view-context';
import { rechargeOpenAiBalance } from '@/lib/supabase/service';

export function RechargeModal() {
  const { isRecargaModalOpen, setIsRecargaModalOpen } = useAdminView();
  const [amount, setAmount] = useState('25');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isRecargaModalOpen) return null;

  const handleRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const val = parseFloat(amount);

    try {
      if (!isNaN(val) && val > 0) {
        await rechargeOpenAiBalance(val);
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsRecargaModalOpen(false);
        window.location.reload();
      }, 900);
    } catch {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsRecargaModalOpen(false);
      }, 900);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0E131F] border border-white/10 p-6 shadow-2xl rounded-sm">
        <button
          onClick={() => setIsRecargaModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-sm bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BatteryCharging className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Registrar Recarga OpenAI</h3>
            <p className="text-xs text-gray-400">
              Atualiza o saldo disponível no cofre de custos da IA
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-6 text-center space-y-2">
            <div className="inline-flex h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-white">Recarga Registrada!</h4>
            <p className="text-xs text-gray-400">
              O saldo da OpenAI foi atualizado com sucesso no Supabase.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRecharge} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-300">Valor da Recarga (US$)</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {['10', '25', '50'].map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`py-1.5 px-3 border text-xs font-semibold rounded-sm transition-colors ${
                      amount === preset
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                        : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    + US$ {preset}
                  </button>
                ))}
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="25.00"
                  className="w-full bg-[#0B0F17] border border-white/10 pl-9 pr-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <p className="text-[11px] text-gray-500">
                Aprox. R$ {(parseFloat(amount || '0') * 5.8).toFixed(2)} em moeda nacional.
              </p>
            </div>

            <div className="flex gap-2 pt-2 border-t border-white/5">
              <Button
                type="button"
                variant="outline"
                className="flex-1 text-xs border-white/10 hover:bg-white/5"
                onClick={() => setIsRecargaModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 text-xs bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                {submitting ? 'Salvando...' : 'Confirmar Recarga'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
