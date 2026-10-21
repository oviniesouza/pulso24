'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  RefreshCw,
  Zap,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  ArrowRight,
  Moon,
  Sun,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDashboardView } from '@/contexts/dashboard-view-context';
import { useTenant } from '@/contexts/tenant-context';

export function OverviewTab() {
  const { navigateToCrmWithFilter, navigateToCrmLead, setActiveTab } = useDashboardView();
  const { activeTenant } = useTenant();

  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const kpis = [
    {
      id: 'leads',
      label: 'Leads Atendidos',
      value: '247',
      change: '+18%',
      positive: true,
      icon: Users,
      sub: 'este mês',
      color: 'emerald',
      actionText: 'Ver no CRM →',
      onClick: () => navigateToCrmWithFilter('all'),
    },
    {
      id: 'qualified',
      label: 'Qualificados pela IA',
      value: '89',
      change: '+31%',
      positive: true,
      icon: UserCheck,
      sub: '36% de conversão',
      color: 'cyan',
      actionText: 'Ver Quentes →',
      onClick: () => navigateToCrmWithFilter('hot'),
    },
    {
      id: 'recovered',
      label: 'Recuperados (Follow-up)',
      value: '23',
      change: '+12%',
      positive: true,
      icon: RefreshCw,
      sub: 'economia de leads',
      color: 'emerald',
      actionText: 'Ver Régua →',
      onClick: () => setActiveTab('followup'),
    },
    {
      id: 'speed',
      label: 'Tempo de Resposta',
      value: '7.2s',
      change: '-2.1s',
      positive: true,
      icon: Zap,
      sub: '24/7 sem fila',
      color: 'cyan',
      actionText: 'Ver Cérebro →',
      onClick: () => setActiveTab('brain'),
    },
  ];

  const recentLeads = [
    {
      id: 'lead-01',
      name: 'João Silva',
      time: 'há 3min',
      status: 'Quente',
      stage: 'Qualificado',
      topic: 'Divórcio consensual e partilha de bens',
      score: 92,
      isNight: true,
    },
    {
      id: 'lead-02',
      name: 'Maria Ferreira',
      time: 'há 12min',
      status: 'Morno',
      stage: 'Qualificando',
      topic: 'Guarda compartilhada e pensão',
      score: 67,
      isNight: false,
    },
    {
      id: 'lead-03',
      name: 'Carla Fontana',
      time: 'há 28min',
      status: 'Quente',
      stage: 'Agendado',
      topic: 'Projeto de cozinha planejada + lavanderia',
      score: 96,
      isNight: false,
    },
    {
      id: 'lead-04',
      name: 'Dr. Renato Dias',
      time: 'há 1h',
      status: 'Quente',
      stage: 'Qualificado',
      topic: 'Revisão contratual trabalhista e horas extras',
      score: 88,
      isNight: true,
    },
    {
      id: 'lead-05',
      name: 'Carlos Mendes',
      time: 'há 2h',
      status: 'Morno',
      stage: 'Qualificando',
      topic: 'Contrato societário para nova filial',
      score: 71,
      isNight: false,
    },
  ];

  // 12 key hourly time intervals covering 24 hours
  // Night shift hours: 19h to 08h (00h, 02h, 04h, 06h, 20h, 22h)
  const hourlyData = [
    { hour: '00h', count: 6, isNight: true, label: 'Madrugada' },
    { hour: '02h', count: 4, isNight: true, label: 'Madrugada' },
    { hour: '04h', count: 3, isNight: true, label: 'Madrugada' },
    { hour: '06h', count: 7, isNight: true, label: 'Amanhecer' },
    { hour: '08h', count: 14, isNight: false, label: 'Comercial' },
    { hour: '10h', count: 28, isNight: false, label: 'Comercial' },
    { hour: '12h', count: 22, isNight: false, label: 'Comercial' },
    { hour: '14h', count: 34, isNight: false, label: 'Pico Comercial' },
    { hour: '16h', count: 31, isNight: false, label: 'Comercial' },
    { hour: '18h', count: 26, isNight: false, label: 'Fim de Expediente' },
    { hour: '20h', count: 21, isNight: true, label: 'Plantão Noturno' },
    { hour: '22h', count: 16, isNight: true, label: 'Plantão Noturno' },
  ];

  const maxCount = Math.max(...hourlyData.map((d) => d.count));
  const nightLeadsTotal = hourlyData
    .filter((d) => d.isNight)
    .reduce((acc, curr) => acc + curr.count, 0);
  const totalLeadsToday = hourlyData.reduce((acc, curr) => acc + curr.count, 0);
  const nightPercentage = Math.round((nightLeadsTotal / totalLeadsToday) * 100);

  const statusBadgeVariant = (stage: string): 'default' | 'secondary' | 'warning' | 'outline' => {
    switch (stage) {
      case 'Qualificado':
        return 'default';
      case 'Agendado':
        return 'secondary';
      case 'Qualificando':
        return 'warning';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* KPI Cards — Interativos & Clicáveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="w-full h-full flex flex-col"
          >
            <div
              onClick={kpi.onClick}
              role="button"
              tabIndex={0}
              className="px-5 pt-5 pb-4 bg-[#111827] border border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.02] rounded-sm transition-all duration-200 cursor-pointer group flex flex-col justify-between h-full relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`p-2 border rounded-sm ${
                    kpi.color === 'emerald'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
                  }`}
                >
                  <kpi.icon className="h-4 w-4" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold ${
                    kpi.positive ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {kpi.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.change}
                </div>
              </div>

              <div>
                <p className="text-3xl font-black text-white tracking-tight">{kpi.value}</p>
                <p className="text-xs font-medium text-gray-300 mt-0.5">{kpi.label}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{kpi.sub}</p>
              </div>

              <div className="mt-4 pt-3 pb-0.5 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 group-hover:text-emerald-400 transition-colors">
                <span>{kpi.actionText}</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfico Proporcional de Conversas por Hora com Destaque para Plantão Noturno */}
        <Card className="lg:col-span-2 border-white/10 bg-[#111827]">
          <CardHeader className="pb-3 border-b border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base text-white flex items-center gap-2">
                  <span>Conversas por Hora — Hoje</span>
                  <span className="text-xs font-normal text-gray-400">({totalLeadsToday} atendimentos)</span>
                </CardTitle>
                <p className="text-xs text-gray-400 mt-0.5">
                  Distribuição 24h comparando Horário Comercial vs. Plantão Noturno
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500" />
                  <span className="text-gray-400">Comercial (08h-19h)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs bg-cyan-400 ring-1 ring-cyan-400/40" />
                  <span className="text-cyan-400 font-medium">Plantão Noturno (19h-08h)</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            {/* ROI Insight Banner */}
            <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-sm flex items-start gap-2.5 text-xs">
              <Moon className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="text-gray-300">
                <span className="font-bold text-cyan-400">
                  {nightPercentage}% dos seus atendimentos ({nightLeadsTotal} leads)
                </span>{' '}
                ocorreram no Plantão Noturno (19h às 08h), quando sua equipe humana estaria dormindo.{' '}
                <strong className="text-emerald-400 font-semibold">
                  Economia direta comprovada: ~R$ 4.200/mês
                </strong>{' '}
                sem custo de turno extra CLT.
              </div>
            </div>

            {/* Visual Bar Chart with Real Proportional Heights (h-48) */}
            <div className="relative pt-6 pb-2">
              {/* Background Reference Lines */}
              <div className="absolute inset-x-0 top-6 bottom-7 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-gray-600 w-full" />
                <div className="border-b border-gray-600 w-full" />
                <div className="border-b border-gray-600 w-full" />
              </div>

              {/* Bars Flex Container */}
              <div className="flex items-end gap-2 sm:gap-3 h-48 px-1">
                {hourlyData.map((d, index) => {
                  const heightPercent = Math.max(12, Math.round((d.count / maxCount) * 100));
                  const isHovered = hoveredBar === index;

                  return (
                    <div
                      key={d.hour}
                      className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end relative group cursor-pointer"
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Tooltip on Hover */}
                      {isHovered && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0B0F17] border border-white/20 px-2 py-1 rounded-xs text-[10px] text-white shadow-xl whitespace-nowrap z-20 pointer-events-none">
                          <span className="font-bold text-emerald-400">{d.count} conversas</span> às {d.hour}
                          <div className="text-gray-400 text-[9px]">{d.label}</div>
                        </div>
                      )}

                      {/* Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.5, delay: index * 0.03 }}
                        className={`w-full rounded-xs transition-all relative ${
                          d.isNight
                            ? 'bg-gradient-to-t from-cyan-950/80 via-cyan-500/40 to-cyan-400 border-t-2 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                            : 'bg-gradient-to-t from-emerald-950/80 via-emerald-500/40 to-emerald-400 border-t-2 border-emerald-400'
                        } ${isHovered ? 'brightness-125 scale-y-105' : ''}`}
                      >
                        {/* Peak Value Indicator */}
                        {d.count > 25 && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-300">
                            {d.count}
                          </div>
                        )}
                      </motion.div>

                      {/* Hour Label */}
                      <span
                        className={`text-[10px] font-mono mt-1 ${
                          d.isNight ? 'text-cyan-400 font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {d.hour}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IA Health & Status */}
        <Card className="border-white/10 bg-[#111827] flex flex-col justify-between">
          <CardHeader className="pb-2 border-b border-white/5">
            <CardTitle className="text-base text-white flex items-center justify-between">
              <span>Status Operacional da IA</span>
              <Badge variant="default" className="text-[10px]">
                Alta Eficiência
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            {[
              { label: 'Precisão de Qualificação', value: 94, color: 'emerald' },
              { label: 'Acolhimento com Empatia', value: 98, color: 'emerald' },
              { label: 'Taxa de Follow-up 24/7', value: 89, color: 'cyan' },
              { label: 'Resolução no 1º Contato', value: 76, color: 'cyan' },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">{item.label}</span>
                  <span
                    className={`font-semibold ${
                      item.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'
                    }`}
                  >
                    {item.value}%
                  </span>
                </div>
                <Progress
                  value={item.value}
                  indicatorClassName={item.color === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'}
                />
              </div>
            ))}

            <div className="p-3 bg-[#0B0F17] border border-white/5 rounded-sm space-y-1 text-xs">
              <div className="flex items-center justify-between text-gray-400">
                <span>Instância Ativa:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {activeTenant.whatsapp_instance_name}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <span>Modo de Escuta:</span>
                <span className="text-gray-200">Áudio + Texto + Docs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Recentes Acionáveis */}
      <Card className="border-white/10 bg-[#111827]">
        <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base text-white">Leads Recentes Atendidos</CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">
              Últimos contatos captados e qualificados pela IA em tempo real
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToCrmWithFilter('all')}
            className="text-xs border-white/10 hover:border-emerald-500/40 text-gray-300"
          >
            Abrir CRM Completo
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 hover:bg-white/[0.02] transition-colors"
              >
                {/* Lead Avatar & Basic Info */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 border border-white/10 bg-[#0B0F17] flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0 rounded-xs">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white truncate">{lead.name}</p>
                      {lead.isNight && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.2 rounded-xs">
                          <Moon className="h-2.5 w-2.5" />
                          Noturno
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate max-w-md">{lead.topic}</p>
                  </div>
                </div>

                {/* Score, Stage Tag & Quick Action Button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 pl-12 sm:pl-0">
                  <div className="flex items-center gap-2">
                    <Badge variant={statusBadgeVariant(lead.stage)} className="text-[11px]">
                      {lead.stage}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      Score {lead.score}
                    </span>
                    <span className="text-[11px] text-gray-500">{lead.time}</span>
                  </div>

                  {/* Botão de Ação Rápida: Abrir Conversa no CRM */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigateToCrmLead(lead.name)}
                    className="text-xs h-8 px-2.5 border-white/10 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-400 text-gray-300 gap-1.5 transition-all"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Abrir Conversa</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
