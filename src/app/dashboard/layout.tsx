import { DashboardNav } from '@/components/dashboard/nav';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Painel do Cliente' };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col">
      <DashboardNav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
