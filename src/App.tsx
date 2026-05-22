import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import ReportsPage from './pages/ReportsPage';
import AdminDataPage from './pages/AdminDataPage';

function App() {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'daily':
      case 'monthly':
      case 'yearly':
      case 'poultry':
      case 'feeds':
      case 'sales':
      case 'comments':
        return <ReportsPage />;
      case 'crops':
        return <ReportsPage initialType="crops" />;
      case 'admin':
        return user?.role === 'ADMIN' ? <AdminDataPage /> : <DashboardHome />;
      default:
        return <DashboardHome />;
    }
  };

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <DashboardLayout onNavigate={handleNavigate} activeTab={activeTab}>
      {renderContent()}
    </DashboardLayout>
  );
}

export default App;
