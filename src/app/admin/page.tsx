'use client';

import { ShieldCheck } from 'lucide-react';
import { OnboardingTab } from '@/components/admin/tabs/onboarding';
import { CostsTab } from '@/components/admin/tabs/costs';
import { AlertsTab } from '@/components/admin/tabs/alerts';
import { ClientsTab } from '@/components/admin/tabs/clients';
import { FinancialTab } from '@/components/admin/tabs/financial';
import { useAdminView } from '@/contexts/admin-view-context';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

export default function AdminPage() {
  const { activeTab, mrr, clientTenants } = useAdminView();
  const activeTenantsCount = clientTenants.length;

  return (
    <div className="space-y-6">
      {/* Executive Quick Stats Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
              Torre de Comando <span className="text-emerald-400">Pulso 24</span>
            </h1>
            <Badge variant="default" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
              CEO Master
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 flex flex-wrap items-center gap-2">
            <span>
              MRR Carteira:{' '}
              <strong className="text-emerald-400 font-semibold">{formatCurrency(mrr)}</strong>
            </span>
            <span className="text-gray-600">·</span>
            <span>
              Clientes Ativos:{' '}
              <strong className="text-white font-semibold">{activeTenantsCount} empresas</strong>
            </span>
            <span className="text-gray-600">·</span>
            <span>Robô Oficial Pulso 24: <strong className="text-emerald-400">Online</strong></span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400 font-medium rounded-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            SaaS Operacional
          </span>
        </div>
      </div>

      {/* Render Active View Dynamically in Full Width */}
      <div className="w-full">
        {activeTab === 'onboarding' && <OnboardingTab />}
        {activeTab === 'clients' && <ClientsTab />}
        {activeTab === 'financial' && <FinancialTab />}
        {activeTab === 'costs' && <CostsTab />}
        {activeTab === 'alerts' && <AlertsTab />}
      </div>
    </div>
  );
}
