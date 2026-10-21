'use client';

import { useState } from 'react';
import { Bell, Settings, LogOut, ChevronDown, Bot, Building2 } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/contexts/tenant-context';

export function DashboardNav() {
  const router = useRouter();
  const { tenants, activeTenant, setActiveTenant } = useTenant();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <header className="border-b border-[#1F2937] bg-[#111827] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <Logo size="sm" />

        {/* Tenant selector (Meu Robô Comercial vs Clientes) */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 border border-[#1F2937] bg-[#0B0F19] px-3 py-1.5 text-xs sm:text-sm text-gray-200 hover:border-emerald-500/40 hover:text-white transition-all rounded-sm"
          >
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${
                activeTenant.isOwnBot
                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                  : activeTenant.color === 'emerald'
                  ? 'bg-emerald-400'
                  : 'bg-cyan-400'
              }`}
            />
            {activeTenant.isOwnBot ? (
              <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                <Bot className="h-3.5 w-3.5" />
                <span className="max-w-[200px] truncate">{activeTenant.shortLabel}</span>
              </span>
            ) : (
              <span className="max-w-[200px] truncate font-medium text-gray-200">
                {activeTenant.shortLabel}
              </span>
            )}
            <ChevronDown className="h-3.5 w-3.5 text-gray-500 ml-1 shrink-0" />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-80 border border-[#1F2937] bg-[#111827] z-50 shadow-2xl rounded-sm py-1">
              <div className="px-3 py-2 text-[10px] uppercase font-mono tracking-wider text-gray-500 border-b border-[#1F2937]">
                Selecione a Operação / Cliente
              </div>

              {tenants.map((tenant) => {
                const isSelected = activeTenant.id === tenant.id;
                return (
                  <button
                    key={tenant.id}
                    onClick={() => {
                      setActiveTenant(tenant);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-left hover:bg-[#1F2937] transition-colors ${
                      isSelected ? 'bg-emerald-500/10 text-white' : 'text-gray-300'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full shrink-0 ${
                        tenant.isOwnBot
                          ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                          : tenant.color === 'emerald'
                          ? 'bg-emerald-400'
                          : 'bg-cyan-400'
                      }`}
                    />

                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${tenant.isOwnBot ? 'text-emerald-400' : 'text-white'}`}>
                        {tenant.name}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">
                        Instância: <span className="font-mono text-gray-400">{tenant.whatsapp_instance_name}</span>
                        {tenant.ai_name && ` · ${tenant.ai_name}`}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      <span
                        className={`text-[9px] px-1.5 py-0.5 font-bold uppercase rounded ${
                          tenant.isOwnBot
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                      >
                        {tenant.badge}
                      </span>
                      {isSelected && (
                        <Badge variant="default" className="text-[9px] px-1 py-0">
                          Ativo
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors" title="Notificações">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Configurações">
            <Settings className="h-4 w-4" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
