import React, { ReactNode } from 'react';
import Sidebar from '../_components/sidebar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
