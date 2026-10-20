'use client';

import { useState, useEffect } from 'react';
import { Bell, MessageCircle, Send, CheckCircle2, DollarSign, Server, WifiOff, UserPlus, ShoppingBag, ShieldCheck, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAdminSettings, saveAdminSettings, type SaasAdminSettings } from '@/lib/supabase/service';

interface AlertTrigger {
  key: keyof Omit<SaasAdminSettings, 'id' | 'ceo_whatsapp_phone' | 'openai_current_balance_usd' | 'openai_low_alert_usd'>;
  label: string;
  description: string;
  icon: typeof Bell;
  tag: string;
}

const TRIGGERS: AlertTrigger[] = [
  {
    key: 'alert_on_new_sale',
    label: 'Nova Venda Realizada',
    description: 'Dispara mensagem imediata com plano contratado e valor quando o checkout for aprovado.',
    icon: ShoppingBag,
    tag: 'Conversão',
  },
  {
    key: 'alert_on_new_onboarding',
    label: 'Novo Cliente na Fila de Onboarding',
    description: 'Notifica com o briefing preenchido para que você crie a instância e configure o prompt.',
    icon: UserPlus,
    tag: 'Operação',
  },
  {
    key: 'alert_on_low_openai_balance',
    label: 'Saldo OpenAI Crítico (< US$ 3.00)',
    description: 'Aviso de emergência no WhatsApp para fazer recarga antes dos clientes ficarem sem IA.',
    icon: DollarSign,
    tag: 'Emergência',
  },
  {
    key: 'alert_on_expense_due',
    label: 'Vencimento da VPS / Servidores Próximo',
    description: 'Lembrete automático para não esquecer de pagar o servidor da Evolution API e n8n.',
    icon: Server,
    tag: 'Infraestrutura',
  },
  {
    key: 'alert_on_instance_disconnect',
    label: 'Queda de Conexão WhatsApp de Cliente',
    description: 'Alerta instantâneo se a instância de algum cliente desconectar para reconectar pelo QR Code.',
    icon: WifiOff,
    tag: 'Uptime',
  },
];

export function AlertsTab() {
  const [ceoPhone, setCeoPhone] = useState('+55 53 99999-0000');
  const [settings, setSettings] = useState<Partial<SaasAdminSettings>>({
    alert_on_new_sale: true,
    alert_on_new_onboarding: true,
    alert_on_low_openai_balance: true,
    alert_on_expense_due: true,
    alert_on_instance_disconnect: true,
    openai_current_balance_usd: 10.0,
    openai_low_alert_usd: 3.0,
  });
  const [testSent, setTestSent] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const data = await getAdminSettings();
      if (data) {
        setSettings(data);
        if (data.ceo_whatsapp_phone) {
          setCeoPhone(data.ceo_whatsapp_phone);
        }
      }
    }
    loadSettings();
  }, []);

  const toggleTrigger = async (key: keyof typeof settings) => {
    const nextVal = !settings[key];
    const newSettings = { ...settings, [key]: nextVal };
    setSettings(newSettings);
    await saveAdminSettings({ [key]: nextVal });
  };

  const handleSavePhone = async () => {
    setSaved(true);
    await saveAdminSettings({ ceo_whatsapp_phone: ceoPhone });
    setTimeout(() => setSaved(false), 2500);
  };

  const handleTestWhatsApp = () => {
    setTestSent(true);
    const cleanPhone = ceoPhone.replace(/\D/g, '');
    const msg = encodeURIComponent(
      '🚨 [Pulso 24 — Bot do CEO] Teste de Notificação: Seu canal de alertas prioritários do SaaS está ativo e conectado à tabela public.saas_admin_settings!'
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Configuração do WhatsApp do CEO */}
      <Card className="border-emerald-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              Bot Pessoal do CEO (WhatsApp de Notificações Operacionais)
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-cyan-400 font-mono hidden sm:inline-flex items-center gap-1">
                <Cloud className="h-3 w-3" /> public.saas_admin_settings
              </span>
              <Badge variant="default" className="gap-1">
                <ShieldCheck className="h-3 w-3" /> Ativo
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-gray-400">
            Cadastre seu número pessoal com DDD. Todos os eventos críticos do negócio (novas assinaturas, clientes travados na fila, saldo baixo da OpenAI e quedas do WhatsApp) chegam diretamente para você.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="tel"
              value={ceoPhone}
              onChange={(e) => setCeoPhone(e.target.value)}
              placeholder="+55 53 99999-0000"
              className="flex-1 bg-[#0B0F19] border border-[#1F2937] px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 font-mono"
            />
            <Button variant="default" onClick={handleSavePhone} className="flex-shrink-0">
              {saved ? <CheckCircle2 className="h-4 w-4" /> : null}
              {saved ? 'Salvo no Supabase!' : 'Salvar no Supabase'}
            </Button>
          </div>

          <div className="pt-2">
            <Button
              variant="whatsapp"
              size="sm"
              onClick={handleTestWhatsApp}
              className="w-full sm:w-auto"
            >
              <Send className="h-3.5 w-3.5" />
              {testSent ? 'Disparando no WhatsApp...' : 'Disparar Teste no Meu WhatsApp'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gatilhos de Notificação Automática */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-cyan-400" />
              Gatilhos de Alerta Automático do Dono
            </CardTitle>
            <span className="text-xs text-emerald-400 font-mono">
              Sincronizado em tempo real
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#1F2937]">
            {TRIGGERS.map((trigger) => {
              const isEnabled = Boolean(settings[trigger.key]);
              return (
                <div key={trigger.key} className="flex items-center justify-between p-4 hover:bg-[#1F2937]/20 transition-colors gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 border border-[#1F2937] bg-[#0B0F19] mt-0.5">
                      <trigger.icon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{trigger.label}</span>
                        <span className="text-[10px] text-gray-500 uppercase px-1.5 py-0.5 border border-[#1F2937] bg-[#0B0F19]">
                          {trigger.tag}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{trigger.description}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTrigger(trigger.key)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer border transition-colors duration-200 ${
                      isEnabled ? 'bg-emerald-500 border-emerald-500' : 'bg-[#1F2937] border-[#374151]'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform bg-white transition-transform duration-200 ${
                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
