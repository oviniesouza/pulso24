'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, MessageCircle, CheckCircle2, QrCode, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useAdminView } from '@/contexts/admin-view-context';

interface BillingRecord {
  id: string;
  client: string;
  plan: string;
  gateway: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
  phone: string;
}

export function FinancialTab() {
  const { clientTenants, mrr, totalExpenses, netProfit, margin } = useAdminView();
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Faturas dos Clientes Pagantes
  const bills: BillingRecord[] = clientTenants.map((t) => ({
    id: `FAT-${t.id.substring(0, 8)}`,
    client: t.name,
    plan: `${t.plan.toUpperCase()} (Fundador)`,
    gateway: t.billing_provider === 'sicredi' ? 'Sicredi (Pix/Boleto Híbrido)' : 'Stripe (Cartão)',
    amount: Number(t.monthly_price || 0),
    dueDate: `2026-11-${String(t.billing_due_day || 10).padStart(2, '0')}`,
    status: t.subscription_status === 'active' ? 'paid' : 'pending',
    phone: t.owner_phone || '',
  }));

  const handleDispararCobranca = (bill: BillingRecord) => {
    setSendingId(bill.id);
    const msg = encodeURIComponent(
      `Olá, ${bill.client}! Tudo bem? A mensalidade do Pulso 24 (${bill.plan} - ${formatCurrency(bill.amount)}) referente ao próximo ciclo vence no dia ${formatDate(bill.dueDate)}. O Pix Copia e Cola Sicredi já está disponível. Pode me chamar aqui caso queira a 2ª via! 🤝`
    );
    window.open(`https://wa.me/${bill.phone}?text=${msg}`, '_blank');
    setTimeout(() => {
      setSendingId(null);
      setSuccessMsg(`Notificação enviada ao WhatsApp de ${bill.client}!`);
      setTimeout(() => setSuccessMsg(null), 3500);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {successMsg && (
        <div className="border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {successMsg}
        </div>
      )}

      {/* Grid de Balanço Geral do Dono (MRR, Custos, Lucro Líquido) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="border border-emerald-500/40 bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider">MRR da Base</span>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-white mt-2">{formatCurrency(mrr)}</p>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-2 border-t border-[#1F2937] pt-2">
            <span>{clientTenants.length} assinaturas ativas</span>
            <span className="text-emerald-400 font-bold font-mono">100% Sicredi</span>
          </div>
        </div>

        <div className="border border-[#1F2937] bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Custos Operacionais</span>
            <TrendingDown className="h-5 w-5 text-red-400" />
          </div>
          <p className="text-3xl font-black text-red-400 mt-2">{formatCurrency(totalExpenses)}</p>
          <div className="text-xs text-gray-400 mt-2 border-t border-[#1F2937] pt-2 space-y-0.5">
            <p>OpenAI + VPS + Domínio</p>
          </div>
        </div>

        <div className="border border-cyan-500/40 bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-cyan-400 uppercase font-bold tracking-wider">Lucro Líquido Real</span>
            <DollarSign className="h-5 w-5 text-cyan-400" />
          </div>
          <p className={`text-3xl font-black mt-2 ${netProfit >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {formatCurrency(netProfit)}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 mt-2 border-t border-[#1F2937] pt-2">
            <span>Margem Líquida Real:</span>
            <span className="text-cyan-400 font-bold font-mono">{margin}%</span>
          </div>
        </div>
      </div>

      {/* Tabela de Faturas dos Clientes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Mensalidades de Assinatura (Sicredi & Stripe)
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
              <Cloud className="h-3 w-3 text-cyan-400" /> public.invoices & public.tenants
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#1F2937]">
            {bills.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-xs">
                Nenhuma fatura de cliente emitida ainda. Novos assinantes aparecerão aqui com disparo de cobrança via WhatsApp.
              </div>
            ) : (
              bills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-[#1F2937]/30 transition-colors gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{bill.client}</span>
                      <Badge variant={bill.status === 'paid' ? 'default' : 'warning'}>
                        {bill.status === 'paid' ? 'Em Dia' : 'Pendente'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                      <span className="text-emerald-400 font-medium">{bill.plan}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <QrCode className="h-3 w-3 text-emerald-400" />
                        {bill.gateway}
                      </span>
                      <span>·</span>
                      <span>Vencimento dia {bill.dueDate.split('-')[2]}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <span className="text-base font-black text-white">{formatCurrency(bill.amount)}</span>

                    <Button
                      variant="whatsapp"
                      size="sm"
                      onClick={() => handleDispararCobranca(bill)}
                      disabled={sendingId === bill.id}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {sendingId === bill.id ? 'Abrindo WhatsApp...' : 'Cobrança WhatsApp'}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
