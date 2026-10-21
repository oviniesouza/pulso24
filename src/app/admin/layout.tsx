import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminTopbar } from '@/components/admin/topbar';
import { NewClientModal } from '@/components/admin/new-client-modal';
import { RechargeModal } from '@/components/admin/recharge-modal';
import { AdminViewProvider } from '@/contexts/admin-view-context';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sala de Comando do CEO | Pulso 24',
  description: 'Painel Executivo e Torre de Controle do Dono do SaaS Pulso 24',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminViewProvider>
      <div className="min-h-screen bg-[#080B11] text-gray-100 flex flex-col">
        {/* Fixed / Collapsible Left Sidebar (260px) */}
        <AdminSidebar />

        {/* Main Workspace taking full remaining screen width */}
        <div className="flex-1 flex flex-col lg:pl-[260px] min-h-screen">
          <AdminTopbar />

          <main className="flex-1 w-full max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>

        {/* Executive Modals */}
        <NewClientModal />
        <RechargeModal />
      </div>
    </AdminViewProvider>
  );
}
