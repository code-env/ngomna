'use client';

import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import { Tabs, useTabsStore } from '@/providers/tabs';
import { icons } from 'lucide-react';

export type Tab = {
  tab: Tabs;
  title: string;
  icon: keyof typeof icons;
};

const Sidebar = () => {
  const { activeTab, setActiveTab } = useTabsStore();

  const tabs: Tab[] = [
    {
      tab: 'my-license',
      title: 'My License',
      icon: 'House',
    },
    {
      tab: 'application',
      title: 'Application/Renewal',
      icon: 'FileText',
    },
    {
      tab: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
    },
    {
      tab: 'payments',
      title: 'Payment History',
      icon: 'CreditCard',
    },
    {
      tab: 'support',
      title: 'Support',
      icon: 'CircleHelp',
    },
  ];

  return (
    <aside className="w-64 bg-background shadow-md h-screen sticky top-0">
      <div className="border-b h-16 flex px-4">
        <Logo path="/d" />
      </div>
      <nav className="mt-6 px-4">
        {tabs.map(tab => {
          const Icon = icons[tab.icon as keyof typeof icons];

          return (
            <Button
              key={tab.title}
              variant={activeTab === tab.tab ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab(tab.tab)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {tab.title}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
