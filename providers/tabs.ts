import { create } from 'zustand';

export type Tabs =
  | 'my-license'
  | 'application'
  | 'notifications'
  | 'payments'
  | 'support';

interface TabsState {
  activeTab: Tabs;
  setActiveTab: (tab: Tabs) => void;
}

const getInitialTab = (): Tabs => {
  const savedTab = localStorage.getItem('activeTab') as Tabs;
  return savedTab || 'my-license';
};

export const useTabsStore = create<TabsState>(set => ({
  activeTab: getInitialTab(),
  setActiveTab: tab => {
    localStorage.setItem('activeTab', tab);
    set({ activeTab: tab });
  },
}));
