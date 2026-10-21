'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

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
