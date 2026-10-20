'use client';

import { LayoutDashboard, Kanban, Brain, Timer, Wifi } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { OverviewTab } from '@/components/dashboard/tabs/overview';
import { CrmTab } from '@/components/dashboard/tabs/crm';
import { AiBrainTab } from '@/components/dashboard/tabs/ai-brain';
import { FollowupTab } from '@/components/dashboard/tabs/followup';
import { ConnectionTab } from '@/components/dashboard/tabs/connection';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Painel do Cliente</h1>
        <p className="text-sm text-gray-500 mt-0.5">IA ativa · Resposta média: <span className="text-emerald-400">7.2s</span></p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">
            <LayoutDashboard className="h-4 w-4" />Visão Geral
          </TabsTrigger>
          <TabsTrigger value="crm">
            <Kanban className="h-4 w-4" />CRM & Chat
          </TabsTrigger>
          <TabsTrigger value="brain">
            <Brain className="h-4 w-4" />Cérebro da IA
          </TabsTrigger>
          <TabsTrigger value="followup">
            <Timer className="h-4 w-4" />Follow-up
          </TabsTrigger>
          <TabsTrigger value="connection">
            <Wifi className="h-4 w-4" />WhatsApp & Faturas
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
