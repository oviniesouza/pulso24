'use client';

import { useState, useEffect, useCallback } from 'react';
import { Server, Globe, Cpu, AlertTriangle, CheckCircle2, Plus, DollarSign, Calendar, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getSaasExpenses, rechargeOpenAiBalance, markExpensePaid, type SaasExpense } from '@/lib/supabase/service';

export function CostsTab() {
  const [expenses, setExpenses] = useState<SaasExpense[]>([]);
  const [showRecargaModal, setShowRecargaModal] = useState(false);
  const [recargaValor, setRecargaValor] = useState('25');
  const [notif, setNotif] = useState<string | null>(null);

  const loadExpenses = useCallback(async () => {
    const data = await getSaasExpenses();
    if (data && data.length > 0) {
      setExpenses(data);
    } else {
      // Fallback baseado nos registros inseridos no script do usuário
      setExpenses([
        {
          id: '1',
          title: 'Créditos API OpenAI (Tokens)',
          category: 'openai',
          amount: 55.0,
          balance_remaining: 42.5,
          alert_threshold: 15.0,
          due_day: null,
          status: 'ok',
          whatsapp_alert_sent: false,
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Servidor VPS (n8n + Evolution API)',
          category: 'vps',
          amount: 85.0,
          balance_remaining: null,
          alert_threshold: null,
          due_day: 15,
          status: 'ok',
          whatsapp_alert_sent: false,
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Domínio Oficial Pulso24.com.br',
          category: 'domain',
          amount: 40.0,
          balance_remaining: null,
          alert_threshold: null,
          due_day: 20,
          status: 'paid',
          whatsapp_alert_sent: false,
          updated_at: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const openai = expenses.find((e) => e.category === 'openai') || expenses[0];
  const balance = Number(openai?.balance_remaining || 0);
  const threshold = Number(openai?.alert_threshold || 15);
  const isLowBalance = balance < threshold;
  const balancePercent = Math.min(100, Math.round((balance / 100) * 100));

  const handleRegistrarRecarga = async () => {
    const val = parseFloat(recargaValor);
    if (!isNaN(val) && val > 0) {
      setExpenses((prev) =>
        prev.map((e) =>
          e.category === 'openai'
            ? { ...e, balance_remaining: Number(e.balance_remaining || 0) + val, status: 'ok' }
            : e
        )
      );

      // Grava no Supabase
      await rechargeOpenAiBalance(val);

      setNotif(`Recarga de US$ ${val} adicionada e sincronizada com public.saas_expenses!`);
      setShowRecargaModal(false);
      setTimeout(() => setNotif(null), 4000);
    }
  };

  const handleMarcarPago = async (id: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'paid' } : e))
    );
    await markExpensePaid(id);
    setNotif('Despesa marcada como paga no Supabase!');
    setTimeout(() => setNotif(null), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {notif && (
        <div className="border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {notif}
        </div>
      )}

      {/* Alerta de Saldo OpenAI */}
      {isLowBalance && (
        <div className="border border-amber-500/50 bg-amber-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-400 uppercase tracking-wide">
                Atenção CEO: Saldo de Tokens OpenAI Baixo (&lt; US$ {threshold})
              </p>
              <p className="text-xs text-gray-300 mt-0.5">
                Resta US$ {balance.toFixed(2)}. Faça uma recarga para garantir que a IA continue respondendo 24/7.
              </p>
            </div>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowRecargaModal(true)}
            className="flex-shrink-0"
          >
            <Plus className="h-4 w-4" />
            Registrar Recarga de Tokens
          </Button>
        </div>
      )}

      {/* Modal / Formulário de Recarga */}
      {showRecargaModal && (
        <div className="border border-[#1F2937] bg-[#111827] p-4 flex flex-wrap items-center gap-3">
          <DollarSign className="h-5 w-5 text-cyan-400" />
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-gray-400 block mb-1">Valor da Recarga no Portal OpenAI (USD)</label>
            <input
              type="number"
              value={recargaValor}
              onChange={(e) => setRecargaValor(e.target.value)}
              placeholder="Ex: 25"
              className="w-full bg-[#0B0F19] border border-[#1F2937] px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
          <div className="flex items-end gap-2 mt-4 sm:mt-0">
            <Button variant="default" size="sm" onClick={handleRegistrarRecarga}>
              Gravar no Supabase
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowRecargaModal(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Card da OpenAI (Tabela saas_expenses) */}
      {openai && (
        <Card className="border-cyan-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-400" />
                {openai.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                  <Cloud className="h-3 w-3 text-cyan-400" /> public.saas_expenses
                </span>
                <Badge variant={isLowBalance ? 'warning' : 'secondary'}>
                  {isLowBalance ? 'Saldo Baixo' : 'Saldo Seguro'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-400">Saldo Atual Restante</span>
                <span className={`font-mono font-bold text-base ${isLowBalance ? 'text-amber-400' : 'text-emerald-400'}`}>
                  US$ {balance.toFixed(2)} (Alerta em US$ {threshold.toFixed(2)})
                </span>
              </div>
              <Progress
                value={balancePercent}
                indicatorClassName={isLowBalance ? 'bg-amber-500' : 'bg-cyan-500'}
              />
              <p className="text-xs text-gray-500 mt-1">
                Consumo automático por transcrição de áudios (Whisper) e respostas da IA (GPT-4o)
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1F2937]">
              <span className="text-xs text-gray-500">Última atualização: {new Date(openai.updated_at).toLocaleDateString('pt-BR')}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRecargaModal(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                Recarregar Créditos
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Outras Despesas (VPS + Domínio) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {expenses
          .filter((e) => e.category !== 'openai')
          .map((exp) => (
            <Card key={exp.id}>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 border border-[#1F2937] bg-[#0B0F19] text-gray-300">
                      {exp.category === 'vps' ? (
                        <Server className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Globe className="h-4 w-4 text-cyan-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{exp.title}</h4>
                      <p className="text-xs text-gray-500">
                        {exp.due_day ? `Vencimento dia ${exp.due_day} de cada mês` : 'Renovação Anual'}
                      </p>
                    </div>
                  </div>
                  <Badge variant={exp.status === 'paid' ? 'default' : 'warning'}>
                    {exp.status === 'paid' ? 'Pago' : 'Pendente'}
                  </Badge>
                </div>

                <div className="flex items-end justify-between border-t border-[#1F2937] pt-3">
                  <div>
                    <span className="text-xs text-gray-500 uppercase block">Valor Mensal</span>
                    <span className="text-lg font-black text-white">R$ {Number(exp.amount).toFixed(2)}</span>
                  </div>
                  {exp.status !== 'paid' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarcarPago(exp.id)}
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      Marcar como Pago
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
