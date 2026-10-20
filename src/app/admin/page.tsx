'use client';

import { ClipboardList, DollarSign, Bell, Users, TrendingUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { OnboardingTab } from '@/components/admin/tabs/onboarding';
import { CostsTab } from '@/components/admin/tabs/costs';
import { AlertsTab } from '@/components/admin/tabs/alerts';
import { ClientsTab } from '@/components/admin/tabs/clients';
import { FinancialTab } from '@/components/admin/tabs/financial';

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#1F2937] pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight">
              Torre de Comando <span className="text-emerald-400">Pulso 24</span>
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Visão Executiva do SaaS · MRR: <span className="text-emerald-400 font-bold">R$ 2.038,00</span> · 4 Clientes na Base
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              SaaS Online & Faturando
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="onboarding">
        <TabsList className="flex flex-wrap border-b border-[#1F2937] gap-2">
          <TabsTrigger value="onboarding" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            1. Fila de Onboarding
          </TabsTrigger>
          <TabsTrigger value="costs" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            2. Cofre & Recargas (Custos)
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            3. Bot do CEO (Alertas WhatsApp)
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            4. Gestão & Modo Espelho
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            5. Recebimentos & Lucro Líquido
          </TabsTrigger>
        </TabsList>

        <TabsContent value="onboarding">
          <OnboardingTab />
        </TabsContent>
        <TabsContent value="costs">
          <CostsTab />
        </TabsContent>
        <TabsContent value="alerts">
          <AlertsTab />
        </TabsContent>
        <TabsContent value="clients">
          <ClientsTab />
        </TabsContent>
        <TabsContent value="financial">
          <FinancialTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
