import { Sidebar } from '@/components/dashboard/sidebar';
import { Topbar } from '@/components/dashboard/topbar';
import { SimulateLeadModal } from '@/components/dashboard/simulate-lead-modal';
import { TenantProvider } from '@/contexts/tenant-context';
import { DashboardViewProvider } from '@/contexts/dashboard-view-context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel do Cliente | Pulso 24',
  description: 'Painel operacional de alta densidade para gestão de IA comercial e WhatsApp 24/7.',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <TenantProvider>
      <DashboardViewProvider>
        <div className="min-h-screen bg-[#080B11] text-gray-100 flex flex-col">
          {/* Fixed / Collapsible Left Sidebar (260px) */}
          <Sidebar />

          {/* Main App Shell Content taking the remaining width */}
          <div className="flex-1 flex flex-col lg:pl-[260px] min-h-screen">
            <Topbar />

            <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>

          {/* Interactive Simulation Modal */}
          <SimulateLeadModal />
        </div>
      </DashboardViewProvider>
    </TenantProvider>
  );
}
