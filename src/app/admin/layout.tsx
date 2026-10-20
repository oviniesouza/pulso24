import { AdminNav } from '@/components/admin/nav';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Super Admin — Pulso 24',
  description: 'Painel Central do Dono do SaaS Pulso 24',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col text-gray-100">
      <AdminNav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
