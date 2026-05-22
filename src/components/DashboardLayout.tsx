import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onNavigate: (tab: string) => void;
  activeTab: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onNavigate, activeTab }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onNavigate={onNavigate} activeTab={activeTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
