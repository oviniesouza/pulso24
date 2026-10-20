'use client';

import { useState } from 'react';
import { Wifi, WifiOff, QrCode, RefreshCw, CreditCard, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils';

const invoices = [
  { id: 'INV-001', date: '2026-10-01', plan: 'Pulso Pro', amount: 497, status: 'paid', method: 'Pix' },
  { id: 'INV-002', date: '2026-09-01', plan: 'Pulso Pro', amount: 497, status: 'paid', method: 'Cartão' },
  { id: 'INV-003', date: '2026-08-01', plan: 'Pulso Pro', amount: 497, status: 'paid', method: 'Pix' },
];

export function ConnectionTab() {
  const [connected, setConnected] = useState(true);
  const [showQr, setShowQr] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WhatsApp status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              {connected ? (
                <Wifi className="h-4 w-4 text-emerald-400" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-400" />
              )}
              Conexão WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`border p-4 ${
              connected
                ? 'border-emerald-500/20 bg-emerald-500/5'
                : 'border-red-500/20 bg-red-500/5'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {connected ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
                <span className={`font-semibold text-sm ${
                  connected ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {connected ? 'Conectado e Ativo' : 'Desconectado'}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Instância: <span className="text-gray-300 font-mono">pulso24-adv-001</span>
              </p>
              <p className="text-xs text-gray-500">
                Número: <span className="text-gray-300">(11) 99999-9999</span>
              </p>
              <p className="text-xs text-gray-500">
                Uptime: <span className="text-emerald-400">99.8% (30 dias)</span>
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQr(!showQr)}
                className="flex-1"
              >
                <QrCode className="h-3.5 w-3.5" />
                {showQr ? 'Ocultar QR' : 'Ler QR Code'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConnected(!connected)}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reconectar
              </Button>
            </div>

            {showQr && (
              <div className="border border-[#1F2937] p-4 text-center">
                <p className="text-xs text-gray-500 mb-3">Abra o WhatsApp → Dispositivos Conectados → Conectar Dispositivo</p>
                <div className="w-40 h-40 mx-auto bg-white flex items-center justify-center">
                  {/* Mock QR pattern */}
                  <div className="grid grid-cols-7 gap-0.5">
                    {Array.from({ length: 49 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-5 w-5 ${
                          [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48].includes(i) || i % 3 === 0
                            ? 'bg-black'
                            : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">Via Evolution API · Conexão segura</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-4 w-4 text-cyan-400" />
              Plano Atual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">Pulso Pro</span>
                <Badge variant="default">Ativo</Badge>
              </div>
              <p className="text-2xl font-black text-white">R$ 497<span className="text-sm font-normal text-gray-400">/mês</span></p>
              <p className="text-xs text-gray-500 mt-1">Próxima cobrança: 01/11/2026</p>
            </div>

            <div className="space-y-2">
              {['Conversas ilimitadas', 'Áudio, fotos e PDFs', 'CRM Kanban', 'Follow-up 5 toques'].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {f}
                </div>
              ))}
            </div>

            <Button variant="outline" size="sm" className="w-full">
              Gerenciar Assinatura
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Histórico de Faturas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#1F2937]">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center gap-4 px-6 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{inv.plan}</p>
                  <p className="text-xs text-gray-500">{formatDate(inv.date)} · {inv.method}</p>
                </div>
                <span className="text-sm font-bold text-white">{formatCurrency(inv.amount)}</span>
                <Badge variant={inv.status === 'paid' ? 'default' : 'warning'}>
                  {inv.status === 'paid' ? 'Pago' : 'Pendente'}
                </Badge>
                <Button variant="ghost" size="icon">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
