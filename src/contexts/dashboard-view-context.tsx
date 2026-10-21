'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DashboardTab = 'overview' | 'crm' | 'brain' | 'followup' | 'connection';
export type CrmFilter = 'all' | 'hot' | 'paused' | 'scheduled';

interface DashboardViewContextType {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  crmFilter: CrmFilter;
  setCrmFilter: (filter: CrmFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  targetLeadId: string | null;
  setTargetLeadId: (leadId: string | null) => void;
  aiGlobalActive: boolean;
  setAiGlobalActive: (active: boolean | ((prev: boolean) => boolean)) => void;
  isSimulateModalOpen: boolean;
  setIsSimulateModalOpen: (open: boolean) => void;
  sidebarOpenMobile: boolean;
  setSidebarOpenMobile: (open: boolean) => void;
  navigateToCrmWithFilter: (filter: CrmFilter) => void;
  navigateToCrmLead: (leadId: string) => void;
}

const DashboardViewContext = createContext<DashboardViewContextType | undefined>(undefined);

export function DashboardViewProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [crmFilter, setCrmFilter] = useState<CrmFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [targetLeadId, setTargetLeadId] = useState<string | null>(null);
  const [aiGlobalActive, setAiGlobalActive] = useState<boolean>(true);
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState<boolean>(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState<boolean>(false);

  const navigateToCrmWithFilter = (filter: CrmFilter) => {
    setCrmFilter(filter);
    setActiveTab('crm');
  };

  const navigateToCrmLead = (leadId: string) => {
    setTargetLeadId(leadId);
    setActiveTab('crm');
  };

  return (
    <DashboardViewContext.Provider
      value={{
        activeTab,
        setActiveTab,
        crmFilter,
        setCrmFilter,
        searchQuery,
        setSearchQuery,
        targetLeadId,
        setTargetLeadId,
        aiGlobalActive,
        setAiGlobalActive,
        isSimulateModalOpen,
        setIsSimulateModalOpen,
        sidebarOpenMobile,
        setSidebarOpenMobile,
        navigateToCrmWithFilter,
        navigateToCrmLead,
      }}
    >
      {children}
    </DashboardViewContext.Provider>
  );
}

export function useDashboardView() {
  const context = useContext(DashboardViewContext);
  if (!context) {
    throw new Error('useDashboardView must be used within a DashboardViewProvider');
  }
  return context;
}
