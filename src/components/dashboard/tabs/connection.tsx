'use client';

import { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  QrCode,
  RefreshCw,
  CreditCard,
  Download,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Server,
  Key,
  Copy,
  Check,
  Send,
  Sparkles,
  Bot,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useTenant } from '@/contexts/tenant-context';

const invoices = [
  { id: 'INV-001', date: '2026-10-01', plan: 'Pulso Pro', amount: 497, status: 'paid', method: 'Pix' },
  { id: 'INV-002', date: '2026-09-01', plan: 'Pulso Pro', amount: 497, status: 'paid', method: 'Cartão' },
  { id: 'INV-003', date: '2026-08-01', plan: 'Pulso Pro', amount: 497, status: 'paid', method: 'Pix' },
];

export function ConnectionTab() {
  const { activeTenant, updateWhatsAppStatus } = useTenant();

  const [instanceName, setInstanceName] = useState(activeTenant.whatsapp_instance_name);
  const [showQr, setShowQr] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(45);
  const [copiedCode, setCopiedCode] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [testMessageSent, setTestMessageSent] = useState(false);

  // Sincroniza estado com o tenant ativo
  useEffect(() => {
    setInstanceName(activeTenant.whatsapp_instance_name);
    setShowQr(false);
  }, [activeTenant]);

  // Contagem regressiva do QR Code
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showQr && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    } else if (countdown === 0 && showQr) {
      setCountdown(45); // Auto-refresh do QR
    }
    return () => clearInterval(timer);
  }, [showQr, countdown]);

  const handleGenerateQr = () => {
    setIsGenerating(true);
    setGenerationStep(`Criando/conectando à instância '${instanceName}' na Evolution API...`);

    setTimeout(() => {
      setGenerationStep('Gerando canal seguro e chave de pareamento WhatsApp...');
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationStep(null);
        setShowQr(true);
        setCountdown(45);
      }, 700);
    }, 600);
  };

  const handleSimulateScan = async () => {
    await updateWhatsAppStatus(true, instanceName);
    setShowQr(false);
    setFeedback(`WhatsApp conectado com sucesso para '${activeTenant.name}'!`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleDisconnect = async () => {
    await updateWhatsAppStatus(false, instanceName);
    setShowQr(false);
    setFeedback(`WhatsApp da instância '${instanceName}' desconectado.`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleCopyPairingCode = () => {
    navigator.clipboard.writeText('PULS-2490');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTestMessage = () => {
    setTestMessageSent(true);
    setTimeout(() => setTestMessageSent(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Toast Feedback */}
      {feedback && (
        <div className="border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-400 font-medium flex items-center gap-2 rounded-lg">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Banner de Identificação do Tenant Ativo */}
      <div className="border border-[#1F2937] bg-[#111827] p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            {activeTenant.isOwnBot ? <Bot className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">{activeTenant.name}</h2>
              <Badge variant={activeTenant.isOwnBot ? 'default' : 'secondary'} className="text-[10px]">
                {activeTenant.badge}
              </Badge>
            </div>
            <p className="text-xs text-gray-400">
              Instância Evolution API:{' '}
              <span className="font-mono text-emerald-400 font-semibold">{activeTenant.whatsapp_instance_name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-400">Status atual:</span>
          {activeTenant.whatsapp_connected ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Conectado e Ativo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Aguardando Conexão
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* CARD 1: Interface de Conexão WhatsApp & QR Code (7 Colunas) */}
        <Card className="lg:col-span-7 border-[#1F2937] bg-[#111827]">
          <CardHeader className="border-b border-[#1F2937] pb-4">
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2 text-white">
                <WhatsAppIcon size={18} className="text-[#25D366]" />
                Conexão WhatsApp (Evolution API)
              </span>
              <span className="text-[11px] font-mono text-gray-500 font-normal">
                Instância: {activeTenant.whatsapp_instance_name}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 pt-5">
            {/* Box de Status e Configuração do Campo whatsapp_instance_name */}
            <div
              className={`border p-4 rounded-xl ${
                activeTenant.whatsapp_connected
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-amber-500/30 bg-amber-500/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {activeTenant.whatsapp_connected ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
                  )}
                  <div>
                    <p className="font-bold text-sm text-white">
                      {activeTenant.whatsapp_connected ? 'WhatsApp Conectado e Operando 24/7' : 'WhatsApp Desconectado'}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {activeTenant.whatsapp_connected
                        ? 'Todas as mensagens recebidas são processadas e respondidas pela IA em < 10 segundos.'
                        : 'Gere o QR Code abaixo para conectar o chip da sua operação à Evolution API.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações Técnicas da Instância */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#1F2937]">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Nome da Instância</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400 truncate block">
                    {activeTenant.whatsapp_instance_name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Servidor</span>
                  <span className="text-xs text-gray-300 truncate block">Evolution API v2</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Uptime Mensal</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">99.9%</span>
                </div>
              </div>
            </div>

            {/* Ações de Conexão */}
            {!showQr && !isGenerating && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="whatsapp"
                  size="default"
                  className="flex-1 font-semibold h-11"
                  onClick={handleGenerateQr}
                >
                  <QrCode className="h-4 w-4" />
                  {activeTenant.whatsapp_connected ? 'Gerar Novo QR Code' : 'Gerar QR Code WhatsApp'}
                </Button>

                {activeTenant.whatsapp_connected ? (
                  <>
                    <Button
                      variant="outline"
                      size="default"
                      className="h-11 border-[#1F2937] text-gray-300 hover:text-white"
                      onClick={handleTestMessage}
                    >
                      <Send className="h-3.5 w-3.5" />
                      {testMessageSent ? '✓ Disparo de Teste OK' : 'Testar Disparo'}
                    </Button>
                    <Button
                      variant="destructive"
                      size="default"
                      className="h-11"
                      onClick={handleDisconnect}
                    >
                      <WifiOff className="h-3.5 w-3.5" />
                      Desconectar
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline-emerald"
                    size="default"
                    className="h-11"
                    onClick={handleSimulateScan}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Simular Conexão
                  </Button>
                )}
              </div>
            )}

            {/* Loading / Geração da Instância */}
            {isGenerating && (
              <div className="border border-[#1F2937] bg-[#0B0F19] p-6 text-center rounded-xl space-y-3">
                <RefreshCw className="h-6 w-6 text-emerald-400 animate-spin mx-auto" />
                <p className="text-xs text-emerald-400 font-mono">{generationStep}</p>
                <p className="text-[11px] text-gray-500">Conectando ao endpoint Evolution API com segurança...</p>
              </div>
            )}

            {/* INTERFACE DE ESCANEAMENTO DO QR CODE */}
            {showQr && (
              <div className="border border-emerald-500/40 bg-[#0B0F19] p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Pareamento com WhatsApp Oficial
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    Expira em {countdown}s
                  </span>
                </div>

                {/* Display do QR Code com Moldura Profissional */}
                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center py-2">
                  <div className="relative p-3 bg-white rounded-xl shadow-2xl flex items-center justify-center">
                    {/* Mock Matrix QR Code de Alta Resolução */}
                    <div className="w-44 h-44 grid grid-cols-9 gap-0.5 p-1">
                      {Array.from({ length: 81 }).map((_, i) => {
                        const isCorner =
                          (i < 27 && i % 9 < 3) || // top-left
                          (i < 27 && i % 9 > 5) || // top-right
                          (i > 53 && i % 9 < 3); // bottom-left
                        const isRandomDark = i % 2 === 0 || i % 5 === 0 || i === 40;
                        return (
                          <div
                            key={i}
                            className={`w-full h-full rounded-[1px] ${
                              isCorner || isRandomDark ? 'bg-[#0B0F19]' : 'bg-transparent'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Logo Central do WhatsApp */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="h-10 w-10 rounded-full bg-white border-2 border-[#25D366] flex items-center justify-center shadow-lg">
                        <WhatsAppIcon size={22} className="text-[#25D366]" />
                      </div>
                    </div>
                  </div>

                  {/* Instruções de Leitura Passo a Passo */}
                  <div className="space-y-2.5 text-xs text-gray-300 max-w-xs">
                    <p className="font-bold text-white text-sm">Como conectar:</p>
                    <ol className="space-y-1.5 text-gray-400 list-decimal list-inside text-xs leading-relaxed">
                      <li>Abra o <strong>WhatsApp</strong> no celular com o chip.</li>
                      <li>Acesse <strong>Aparelhos conectados</strong>.</li>
                      <li>Toque em <strong>Conectar um aparelho</strong>.</li>
                      <li>Aponte a câmera para este QR Code.</li>
                    </ol>

                    {/* Código de Pareamento de 8 dígitos alternativo */}
                    <div className="pt-2 border-t border-[#1F2937]">
                      <button
                        onClick={handleCopyPairingCode}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
                      >
                        {copiedCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copiedCode ? 'Código copiado!' : 'Usar Código de 8 dígitos (PULS-2490)'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Botões de Confirmação do Escaneamento */}
                <div className="pt-3 border-t border-[#1F2937] flex flex-wrap gap-2 justify-between">
                  <Button
                    variant="whatsapp"
                    size="sm"
                    className="flex-1 font-bold h-10"
                    onClick={handleSimulateScan}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Confirmar Leitura Realizada
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 text-gray-400 hover:text-white"
                    onClick={() => setCountdown(45)}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Atualizar QR
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 text-gray-500 hover:text-gray-300"
                    onClick={() => setShowQr(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CARD 2: Configuração Técnica da Evolution API / Hostinger VPS (5 Colunas) */}
        <Card className="lg:col-span-5 border-[#1F2937] bg-[#111827]">
          <CardHeader className="border-b border-[#1F2937] pb-4">
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <Server className="h-4 w-4 text-cyan-400" />
              Parâmetros Evolution API
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 pt-5">
            <div>
              <label className="text-xs text-gray-400 block mb-1">
                Nome da Instância no WhatsApp (Campo `whatsapp_instance_name`):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={instanceName}
                  onChange={(e) => setInstanceName(e.target.value)}
                  placeholder="ex: pulso24_oficial"
                  className="flex-1 bg-[#0B0F19] border border-[#1F2937] px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500 rounded"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await updateWhatsAppStatus(activeTenant.whatsapp_connected, instanceName);
                    setFeedback(`Instância '${instanceName}' salva com sucesso no Supabase!`);
                    setTimeout(() => setFeedback(null), 3000);
                  }}
                  className="text-xs"
                >
                  Salvar
                </Button>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                Identificador exclusivo salvo na tabela <code>public.tenants</code>.
              </p>
            </div>

            <div className="border border-[#1F2937] bg-[#0B0F19] p-3 rounded-lg space-y-2 text-xs">
              <div className="flex items-center justify-between text-gray-400">
                <span>Webhook de Eventos:</span>
                <span className="text-emerald-400 font-mono text-[11px]">Ativo (v2)</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Eventos Inscritos:</span>
                <span className="text-gray-300 font-mono text-[10px]">MESSAGES_UPSERT, QRCODE</span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Servidor Evolution:</span>
                <span className="text-cyan-400 font-mono text-[10px]">Hostinger VPS / Docker</span>
              </div>
            </div>

            <div className="border border-cyan-500/20 bg-cyan-500/5 p-3 rounded-lg text-xs text-gray-300 space-y-1">
              <p className="font-semibold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Dica de Produção Hostinger:
              </p>
              <p className="text-[11px] leading-relaxed text-gray-400">
                Assim que você contratar o VPS da Hostinger com o novo chip amanhã, apontaremos o webhook da Evolution API diretamente para o domínio <code>pulso24.com.br</code> para responder clientes no piloto automático!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico de Faturas & Plano do Tenant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-5 border-[#1F2937] bg-[#111827]">
          <CardHeader className="border-b border-[#1F2937] pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-white">
              <CreditCard className="h-4 w-4 text-cyan-400" />
              Plano de Assinatura
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="border border-emerald-500/20 bg-emerald-500/5 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white text-base">
                  {activeTenant.isOwnBot ? 'Pulso 24 — Operação Interna' : `Plano ${activeTenant.plan.toUpperCase()}`}
                </span>
                <Badge variant="default">{activeTenant.isOwnBot ? 'Oficial' : 'Ativo'}</Badge>
              </div>
              <p className="text-2xl font-black text-white">
                {activeTenant.isOwnBot ? (
                  <span className="text-emerald-400 text-lg">Sem custos de licença (Interno)</span>
                ) : (
                  <>
                    {formatCurrency(activeTenant.monthly_price)}
                    <span className="text-xs font-normal text-gray-400">/mês</span>
                  </>
                )}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                {activeTenant.isOwnBot ? 'Operação comercial do próprio fundador' : 'Próxima cobrança: Dia 10'}
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Atendimento 24/7 com IA Multimodal (áudio, foto e PDF)
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Alerta de Lead Quente no WhatsApp do vendedor
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Régua de Follow-up de 5 toques
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faturas */}
        <Card className="lg:col-span-7 border-[#1F2937] bg-[#111827]">
          <CardHeader className="border-b border-[#1F2937] pb-3">
            <CardTitle className="text-base text-white">Histórico de Cobranças</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#1F2937]">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center gap-4 px-5 py-3 hover:bg-[#0B0F19]/50 transition-colors">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-white">{inv.plan}</p>
                    <p className="text-[10px] text-gray-500">{formatDate(inv.date)} · {inv.method}</p>
                  </div>
                  <span className="text-xs font-bold text-white">{formatCurrency(inv.amount)}</span>
                  <Badge variant={inv.status === 'paid' ? 'default' : 'warning'} className="text-[10px]">
                    {inv.status === 'paid' ? 'Pago' : 'Pendente'}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
