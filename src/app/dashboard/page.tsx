'use client';

import { LayoutDashboard, Kanban, Brain, Timer, Wifi, Bot, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { OverviewTab } from '@/components/dashboard/tabs/overview';
import { CrmTab } from '@/components/dashboard/tabs/crm';
import { AiBrainTab } from '@/components/dashboard/tabs/ai-brain';
import { FollowupTab } from '@/components/dashboard/tabs/followup';
import { ConnectionTab } from '@/components/dashboard/tabs/connection';
import { useTenant } from '@/contexts/tenant-context';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { activeTenant } = useTenant();

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
          <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              IA: <strong className="text-gray-300 font-medium">{activeTenant.ai_name}</strong>
            </span>
            <span>·</span>
            <span>
              Instância:{' '}
              <span className="font-mono text-emerald-400 font-semibold">
                {activeTenant.whatsapp_instance_name}
              </span>
            </span>
            <span>·</span>
            <span>
              Status:{' '}
              <span className={activeTenant.whatsapp_connected ? 'text-emerald-400' : 'text-amber-400'}>
                {activeTenant.whatsapp_connected ? 'Online 24/7' : 'Desconectado'}
              </span>
            </span>
          </p>
        </div>

        {activeTenant.isOwnBot && (
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Robô Oficial da Operação Pulso 24</span>
          </div>
        )}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="overflow-x-auto justify-start border-b border-[#1F2937] pb-px">
          <TabsTrigger value="overview">
            <LayoutDashboard className="h-4 w-4" />
            <span>Visão Geral</span>
          </TabsTrigger>
          <TabsTrigger value="crm">
            <Kanban className="h-4 w-4" />
            <span>CRM & Chat</span>
          </TabsTrigger>
          <TabsTrigger value="brain">
            <Brain className="h-4 w-4" />
            <span>Cérebro da IA</span>
          </TabsTrigger>
          <TabsTrigger value="followup">
            <Timer className="h-4 w-4" />
            <span>Follow-up 24/7</span>
          </TabsTrigger>
          <TabsTrigger value="connection">
            <Wifi className="h-4 w-4" />
            <span>WhatsApp & Faturas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview"><OverviewTab /></TabsContent>
        <TabsContent value="crm"><CrmTab /></TabsContent>
        <TabsContent value="brain"><AiBrainTab /></TabsContent>
        <TabsContent value="followup"><FollowupTab /></TabsContent>
        <TabsContent value="connection"><ConnectionTab /></TabsContent>
      </Tabs>
    </div>
  );
}
