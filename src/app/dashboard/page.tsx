'use client';

import { Bot, Sparkles } from 'lucide-react';
import { OverviewTab } from '@/components/dashboard/tabs/overview';
import { CrmTab } from '@/components/dashboard/tabs/crm';
import { AiBrainTab } from '@/components/dashboard/tabs/ai-brain';
import { FollowupTab } from '@/components/dashboard/tabs/followup';
import { ConnectionTab } from '@/components/dashboard/tabs/connection';
import { useTenant } from '@/contexts/tenant-context';
import { useDashboardView } from '@/contexts/dashboard-view-context';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { activeTenant } = useTenant();
  const { activeTab } = useDashboardView();

  return (
    <div className="space-y-6">
      {/* High-density Tenant Operational Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              {activeTenant.isOwnBot ? <Bot className="h-6 w-6 text-emerald-400" /> : null}
              {activeTenant.name}
            </h1>
            <Badge variant={activeTenant.isOwnBot ? 'default' : 'secondary'} className="text-[10px]">
              {activeTenant.badge}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              IA: <strong className="text-gray-200 font-medium">{activeTenant.ai_name}</strong>
            </span>
            <span className="text-gray-600">·</span>
            <span>
              Instância:{' '}
              <span className="font-mono text-emerald-400 font-semibold">
                {activeTenant.whatsapp_instance_name}
              </span>
            </span>
            <span className="text-gray-600">·</span>
            <span>
              Status:{' '}
              <span className={activeTenant.whatsapp_connected ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'}>
                {activeTenant.whatsapp_connected ? 'Online 24/7' : 'Desconectado'}
              </span>
            </span>
          </p>
        </div>

        {activeTenant.isOwnBot && (
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 rounded-sm shrink-0">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Robô Oficial da Operação Pulso 24</span>
          </div>
        )}
      </div>

      {/* Render Active View dynamically according to Left Sidebar selection */}
      <div>
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'crm' && <CrmTab />}
        {activeTab === 'brain' && <AiBrainTab />}
        {activeTab === 'followup' && <FollowupTab />}
        {activeTab === 'connection' && <ConnectionTab />}
      </div>
    </div>
  );
}
