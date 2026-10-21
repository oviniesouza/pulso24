'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTenants, updateTenantWhatsAppStatus, Tenant } from '@/lib/supabase/service';

export interface DashboardTenant {
  id: string;
  name: string;
  shortLabel: string;
  owner_name?: string | null;
  owner_phone?: string | null;
  niche: string;
  plan: string;
  whatsapp_instance_name: string;
  whatsapp_connected: boolean;
  ai_name: string;
  ai_system_prompt: string;
  monthly_price: number;
  badge: 'Oficial' | 'Cliente';
  color: 'emerald' | 'cyan';
  isOwnBot: boolean;
}

export const DEFAULT_TENANTS: DashboardTenant[] = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Pulso 24 — Comercial (Meu Robô)',
    shortLabel: 'Pulso 24 — Comercial (Meu Robô)',
    owner_name: 'Vinícius (CEO)',
    owner_phone: '5553999990000',
    niche: 'saas_b2b',
    plan: 'scale',
    whatsapp_instance_name: 'pulso24_oficial',
    whatsapp_connected: true,
    ai_name: 'Bia (Consultora Pulso 24)',
    ai_system_prompt: `Você é a Bia, inteligência comercial oficial do Pulso 24. Seu objetivo é atender empresários que clicaram no site para testar a ferramenta ao vivo e vender o Pulso 24 para eles.

REGRAS DE OURO DO SEU ATENDIMENTO:
1. Seja extremamente natural, simpática, direta e consultiva (nunca pareça um robô engessado de opções numéricas).
2. No primeiro contato, dê boas-vindas, diga que este próprio atendimento já está sendo feito 100% pelo Pulso 24 em menos de 10 segundos e pergunte o nome da pessoa e qual é o ramo da empresa dela (ex: Advocacia, Móveis Planejados, Clínica, Imobiliária, etc.).
3. EFEITO UAU (Demonstração ao Vivo): Assim que o lead disser o ramo dele, convide-o a mandar um ÁUDIO curto contando como funciona o atendimento dele hoje ou uma FOTO/PDF, só para ele ver você ouvindo e respondendo em segundos na prática!
4. ANCORAGEM DE VALOR: Mostre que enquanto um atendente CLT custa cerca de R$ 3.800/mês e só trabalha 8h por dia, o Pulso 24 trabalha 24h por dia (inclusive madrugada e domingos), faz follow-up automático para recuperar orçamentos sumidos e custa a partir de R$ 9,90/dia (Plano Start R$ 297 ou Plano Pro R$ 497 com condição especial de Cliente Fundador).
5. FECHAMENTO: Qualifique o volume aproximado de mensagens que ele recebe por dia e proponha agendar uma chamada rápida de 10 minutos com o Vinícius (nosso especialista) para ativar o painel dele com isenção de taxa de setup.`,
    monthly_price: 0,
    badge: 'Oficial',
    color: 'emerald',
    isOwnBot: true,
  },
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Silva & Associados Advocacia',
    shortLabel: 'Silva & Associados',
    owner_name: 'Dr. Marcos Silva',
    owner_phone: '5553999991111',
    niche: 'advocacia',
    plan: 'pro',
    whatsapp_instance_name: 'silva_advocacia',
    whatsapp_connected: true,
    ai_name: 'Clara (Jurídico)',
    ai_system_prompt: 'Você é a assistente virtual do escritório Silva & Associados. Faça a triagem empática do cliente, pergunte a área do direito, peça um resumo do caso (áudio ou texto) e agende a consulta com o advogado. Nunca dê parecer jurídico.',
    monthly_price: 347,
    badge: 'Cliente',
    color: 'emerald',
    isOwnBot: false,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Arte & Design Móveis Planejados',
    shortLabel: 'Arte & Design',
    owner_name: 'Roberto Mendes',
    owner_phone: '5553999992222',
    niche: 'moveis_planejados',
    plan: 'pro',
    whatsapp_instance_name: 'arte_moveis',
    whatsapp_connected: false,
    ai_name: 'Sofia (Projetos)',
    ai_system_prompt: 'Você é a consultora de atendimento da Arte & Design Móveis Planejados. Descubra quais ambientes o cliente quer planejar, se já possui planta ou medidas e agende uma reunião com o projetista.',
    monthly_price: 347,
    badge: 'Cliente',
    color: 'cyan',
    isOwnBot: false,
  },
];

interface TenantContextType {
  tenants: DashboardTenant[];
  activeTenant: DashboardTenant;
  setActiveTenant: (tenant: DashboardTenant) => void;
  updateWhatsAppStatus: (connected: boolean, instanceName?: string) => Promise<void>;
  reloadTenants: () => Promise<void>;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenants, setTenants] = useState<DashboardTenant[]>(DEFAULT_TENANTS);
  const [activeTenant, setActiveTenantState] = useState<DashboardTenant>(DEFAULT_TENANTS[0]);

  // Carregar do Supabase e sincronizar
  const fetchSupabaseTenants = async () => {
    try {
      const data = await getTenants();
      if (data && data.length > 0) {
        setTenants((prev) => {
          const updated = [...prev];
          data.forEach((supaTenant) => {
            const index = updated.findIndex((t) => t.id === supaTenant.id);
            const isOwn = supaTenant.id === '00000000-0000-0000-0000-000000000000';
            const mapped: DashboardTenant = {
              id: supaTenant.id,
              name: supaTenant.name,
              shortLabel: isOwn
                ? 'Pulso 24 — Comercial (Meu Robô)'
                : supaTenant.name.replace(' Advocacia', '').replace(' Móveis Planejados', ''),
              owner_name: supaTenant.owner_name,
              owner_phone: supaTenant.owner_phone,
              niche: supaTenant.niche,
              plan: supaTenant.plan,
              whatsapp_instance_name: supaTenant.whatsapp_instance_name || 'pulso24_oficial',
              whatsapp_connected: supaTenant.whatsapp_connected,
              ai_name: supaTenant.ai_name || (isOwn ? 'Bia (Consultora Pulso 24)' : 'Assistente IA'),
              ai_system_prompt: supaTenant.ai_system_prompt || '',
              monthly_price: Number(supaTenant.monthly_price) || 0,
              badge: isOwn ? 'Oficial' : 'Cliente',
              color: isOwn ? 'emerald' : supaTenant.niche === 'moveis_planejados' ? 'cyan' : 'emerald',
              isOwnBot: isOwn,
            };

            if (index >= 0) {
              updated[index] = { ...updated[index], ...mapped };
            } else {
              updated.push(mapped);
            }
          });
          return updated;
        });
      }
    } catch (err) {
      console.warn('Could not sync tenants with Supabase:', err);
    }
  };

  useEffect(() => {
    // 1. Tentar recuperar seleção salva, ou padrão '00000000-0000-0000-0000-000000000000'
    const savedId = typeof window !== 'undefined' ? localStorage.getItem('pulso24_active_tenant_id') : null;
    const initial = DEFAULT_TENANTS.find((t) => t.id === savedId) || DEFAULT_TENANTS[0];
    setActiveTenantState(initial);

    // 2. Sincronizar com banco
    fetchSupabaseTenants();
  }, []);

  const setActiveTenant = (tenant: DashboardTenant) => {
    setActiveTenantState(tenant);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pulso24_active_tenant_id', tenant.id);
    }
  };

  const updateWhatsAppStatus = async (connected: boolean, instanceName?: string) => {
    const targetInstance = instanceName || activeTenant.whatsapp_instance_name;

    // Atualiza estado local
    setActiveTenantState((prev) => ({
      ...prev,
      whatsapp_connected: connected,
      whatsapp_instance_name: targetInstance,
    }));

    setTenants((prev) =>
      prev.map((t) =>
        t.id === activeTenant.id
          ? { ...t, whatsapp_connected: connected, whatsapp_instance_name: targetInstance }
          : t
      )
    );

    // Atualiza no Supabase
    try {
      await updateTenantWhatsAppStatus(activeTenant.id, connected, targetInstance);
    } catch (err) {
      console.warn('Erro ao salvar status de whatsapp no Supabase:', err);
    }
  };

  return (
    <TenantContext.Provider
      value={{
        tenants,
        activeTenant,
        setActiveTenant,
        updateWhatsAppStatus,
        reloadTenants: fetchSupabaseTenants,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
