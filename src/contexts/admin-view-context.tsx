'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { getTenants, getSaasExpenses, getLeadsCount, type Tenant, type SaasExpense } from '@/lib/supabase/service';

export type AdminTab = 'onboarding' | 'clients' | 'financial' | 'costs' | 'alerts';
export type OnboardingFilter = 'all' | 'waiting' | 'configuring' | 'live';
export type ClientsFilter = 'all' | 'founders' | 'evolution';

interface AdminViewContextType {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onboardingFilter: OnboardingFilter;
  setOnboardingFilter: (filter: OnboardingFilter) => void;
  clientsFilter: ClientsFilter;
  setClientsFilter: (filter: ClientsFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isNewClientModalOpen: boolean;
  setIsNewClientModalOpen: (open: boolean) => void;
  isRecargaModalOpen: boolean;
  setIsRecargaModalOpen: (open: boolean) => void;
  sidebarOpenMobile: boolean;
  setSidebarOpenMobile: (open: boolean) => void;
  openNewClientModal: () => void;
  openRecargaModal: () => void;
  navigateToOnboardingWithFilter: (filter: OnboardingFilter) => void;
  navigateToClientsWithFilter: (filter: ClientsFilter) => void;

  // Real data state
  tenants: Tenant[];
  clientTenants: Tenant[];
  expenses: SaasExpense[];
  totalLeadsCount: number;
  loading: boolean;
  refreshData: () => Promise<void>;

  // Computed Real Metrics
  mrr: number;
  totalExpenses: number;
  netProfit: number;
  margin: number;
  onboardingCounts: {
    total: number;
    waiting: number;
    configuring: number;
    live: number;
  };
  clientCounts: {
    total: number;
    founders: number;
    evolutionConnected: number;
  };
}

const AdminViewContext = createContext<AdminViewContextType | undefined>(undefined);

export function AdminViewProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<AdminTab>('onboarding');
  const [onboardingFilter, setOnboardingFilter] = useState<OnboardingFilter>('all');
  const [clientsFilter, setClientsFilter] = useState<ClientsFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState<boolean>(false);
  const [isRecargaModalOpen, setIsRecargaModalOpen] = useState<boolean>(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState<boolean>(false);

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [expenses, setExpenses] = useState<SaasExpense[]>([]);
  const [totalLeadsCount, setTotalLeadsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshData = useCallback(async () => {
    try {
      const [tenantsData, expensesData, leadsCountData] = await Promise.all([
        getTenants(),
        getSaasExpenses(),
        getLeadsCount(),
      ]);
      setTenants(tenantsData || []);
      setExpenses(expensesData || []);
      setTotalLeadsCount(leadsCountData || 0);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Client tenants = tenants excluding the internal robot (id 00000000-0000-0000-0000-000000000000)
  const clientTenants = useMemo(() => {
    return tenants.filter((t) => t.id !== '00000000-0000-0000-0000-000000000000');
  }, [tenants]);

  const mrr = useMemo(() => {
    return clientTenants
      .filter((t) => t.subscription_status === 'active')
      .reduce((acc, t) => acc + Number(t.monthly_price || 0), 0);
  }, [clientTenants]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((acc, e) => acc + Number(e.amount || 0), 0);
  }, [expenses]);

  const netProfit = useMemo(() => {
    return mrr - totalExpenses;
  }, [mrr, totalExpenses]);

  const margin = useMemo(() => {
    return mrr > 0 ? Math.round((netProfit / mrr) * 100) : 0;
  }, [mrr, netProfit]);

  const onboardingCounts = useMemo(() => {
    return {
      total: clientTenants.length,
      waiting: clientTenants.filter((t) => t.onboarding_status === 'waiting').length,
      configuring: clientTenants.filter((t) => t.onboarding_status === 'configuring').length,
      live: clientTenants.filter((t) => t.onboarding_status === 'live').length,
    };
  }, [clientTenants]);

  const clientCounts = useMemo(() => {
    return {
      total: clientTenants.length,
      founders: clientTenants.filter((t) => Number(t.monthly_price) === 347).length,
      evolutionConnected: clientTenants.filter((t) => t.whatsapp_connected).length,
    };
  }, [clientTenants]);

  const openNewClientModal = () => setIsNewClientModalOpen(true);
  const openRecargaModal = () => setIsRecargaModalOpen(true);

  const navigateToOnboardingWithFilter = (filter: OnboardingFilter) => {
    setOnboardingFilter(filter);
    setActiveTab('onboarding');
  };

  const navigateToClientsWithFilter = (filter: ClientsFilter) => {
    setClientsFilter(filter);
    setActiveTab('clients');
  };

  return (
    <AdminViewContext.Provider
      value={{
        activeTab,
        setActiveTab,
        onboardingFilter,
        setOnboardingFilter,
        clientsFilter,
        setClientsFilter,
        searchQuery,
        setSearchQuery,
        isNewClientModalOpen,
        setIsNewClientModalOpen,
        isRecargaModalOpen,
        setIsRecargaModalOpen,
        sidebarOpenMobile,
        setSidebarOpenMobile,
        openNewClientModal,
        openRecargaModal,
        navigateToOnboardingWithFilter,
        navigateToClientsWithFilter,
        tenants,
        clientTenants,
        expenses,
        totalLeadsCount,
        loading,
        refreshData,
        mrr,
        totalExpenses,
        netProfit,
        margin,
        onboardingCounts,
        clientCounts,
      }}
    >
      {children}
    </AdminViewContext.Provider>
  );
}

export function useAdminView() {
  const context = useContext(AdminViewContext);
  if (!context) {
    throw new Error('useAdminView must be used within an AdminViewProvider');
  }
  return context;
}
