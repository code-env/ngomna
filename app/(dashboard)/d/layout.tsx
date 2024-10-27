import React, { ReactNode } from "react";
import Sidebar from "../_components/sidebar";
import ModalProvider from "@/providers/modal";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>

      <ModalProvider />
    </div>
  );
};

export default DashboardLayout;
