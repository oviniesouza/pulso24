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
    owner_phone: '555384450964',
    niche: 'saas_b2b',
    plan: 'scale',
    whatsapp_instance_name: 'pulso24_oficial',
    whatsapp_connected: true,
    ai_name: 'Bia (Consultora Pulso 24)',
    ai_system_prompt: 'Você é a Bia, consultora comercial oficial do Pulso 24.',
    monthly_price: 0,
    badge: 'Oficial',
    color: 'emerald',
    isOwnBot: true,
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
        const mappedList: DashboardTenant[] = data.map((supaTenant) => {
          const isOwn = supaTenant.id === '00000000-0000-0000-0000-000000000000';
          return {
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
        });

        setTenants(mappedList);
        setActiveTenantState((prev) => mappedList.find((m) => m.id === prev.id) || mappedList[0]);
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
