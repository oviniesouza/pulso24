'use client';

import { motion } from 'framer-motion';
import { Users, UserCheck, RefreshCw, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const kpis = [
  {
    label: 'Leads Atendidos',
    value: '247',
    change: '+18%',
    positive: true,
    icon: Users,
    sub: 'este mês',
    color: 'emerald',
  },
  {
    label: 'Qualificados',
    value: '89',
    change: '+31%',
    positive: true,
    icon: UserCheck,
    sub: '36% de conversão',
    color: 'cyan',
  },
  {
    label: 'Recuperados',
    value: '23',
    change: '+12%',
    positive: true,
    icon: RefreshCw,
    sub: 'via follow-up',
    color: 'emerald',
  },
  {
    label: 'Tempo de Resposta',
    value: '7.2s',
    change: '-2.1s',
    positive: true,
    icon: Zap,
    sub: 'média do mês',
    color: 'cyan',
  },
];

const recentLeads = [
  { name: 'João Silva', time: 'há 3min', status: 'Quente', topic: 'Divórcio consensual', score: 92 },
  { name: 'Maria Ferreira', time: 'há 12min', status: 'Morno', topic: 'Guarda compartilhada', score: 67 },
  { name: 'Pedro Alves', time: 'há 31min', status: 'Frio', topic: 'Consulta trabalhista', score: 34 },
  { name: 'Ana Costa', time: 'há 1h', status: 'Quente', topic: 'Inventário e herança', score: 88 },
  { name: 'Carlos Mendes', time: 'há 2h', status: 'Morno', topic: 'Contrato empresarial', score: 71 },
];

const statusColor: Record<string, string> = {
  'Quente': 'text-emerald-400',
  'Morno': 'text-amber-400',
  'Frio': 'text-gray-500',
};

const statusBadge: Record<string, 'default' | 'warning' | 'outline'> = {
  'Quente': 'default',
  'Morno': 'warning',
  'Frio': 'outline',
};

const hourlyData = [
  { hour: '00h', count: 2 },
  { hour: '04h', count: 1 },
  { hour: '08h', count: 8 },
  { hour: '10h', count: 14 },
  { hour: '12h', count: 11 },
  { hour: '14h', count: 18 },
  { hour: '16h', count: 22 },
  { hour: '18h', count: 16 },
  { hour: '20h', count: 9 },
  { hour: '22h', count: 5 },
];

const maxCount = Math.max(...hourlyData.map((d) => d.count));

export function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 border ${
                  kpi.color === 'emerald'
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
                    : 'border-cyan-500/30 bg-cyan-500/5 text-cyan-400'
                }`}>
                  <kpi.icon className="h-4 w-4" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${
                  kpi.positive ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {kpi.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-2xl font-black text-white">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{kpi.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Hourly chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Conversas por Hora — Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-32">
              {hourlyData.map((d) => (
                <div key={d.hour} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full bg-emerald-500/20 border-t-2 border-emerald-500"
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.count / maxCount) * 100}%` }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ minHeight: '4px' }}
                  />
                  <span className="text-[9px] text-gray-600 rotate-45 origin-left">{d.hour}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* IA Health */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status da IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Qualificação', value: 91, color: 'emerald' },
              { label: 'Satisfação', value: 87, color: 'emerald' },
              { label: 'Follow-up Rate', value: 74, color: 'cyan' },
              { label: 'Resolução 1º Toque', value: 63, color: 'cyan' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">{item.label}</span>
                  <span className={item.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}>{item.value}%</span>
                </div>
                <Progress
                  value={item.value}
                  indicatorClassName={item.color === 'emerald' ? 'bg-emerald-500' : 'bg-cyan-500'}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent leads */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Leads Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#1F2937]">
            {recentLeads.map((lead) => (
              <div key={lead.name} className="flex items-center gap-4 px-6 py-3 hover:bg-[#1F2937]/30 transition-colors">
                <div className="h-8 w-8 rounded-none border border-[#1F2937] bg-[#0B0F19] flex items-center justify-center text-xs font-bold text-emerald-400">
                  {lead.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{lead.name}</p>
                  <p className="text-xs text-gray-500 truncate">{lead.topic}</p>
                </div>
                <Badge variant={statusBadge[lead.status]}>{lead.status}</Badge>
                <div className="text-right">
                  <p className={`text-sm font-bold ${statusColor[lead.status]}`}>{lead.score}</p>
                  <p className="text-xs text-gray-600">{lead.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
