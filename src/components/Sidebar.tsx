import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bird,
  Sprout,
  Package,
  ShoppingCart,
  Settings,
  MessageSquare,
  LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  onNavigate: (tab: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeTab }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Daily Reports', id: 'daily' },
    { icon: Calendar, label: 'Monthly Reports', id: 'monthly' },
    { icon: Calendar, label: 'Yearly Reports', id: 'yearly' },
    { icon: Bird, label: 'Poultry (Layers)', id: 'poultry' },
    { icon: Sprout, label: 'Crops (Maize & Cashew)', id: 'crops' },
    { icon: Package, label: 'Feeds Inventory', id: 'feeds' },
    { icon: ShoppingCart, label: 'Egg Dispatch/Sales', id: 'sales' },
  ];

  if (user?.role === 'ADMIN') {
    menuItems.push({ icon: Settings, label: 'Data Management', id: 'admin' });
  }

  menuItems.push({ icon: MessageSquare, label: 'Comments & Notes', id: 'comments' });

  return (
    <aside className="w-64 bg-ysj-dark-green text-white min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="h-10 w-10 bg-ysj-gold rounded-full flex items-center justify-center font-bold text-ysj-dark-green text-xl flex-shrink-0">
          YSJ
        </div>
        <div>
          <h1 className="font-bold text-sm">YSJ Farm Limited</h1>
          <p className="text-[10px] text-ysj-gold tracking-widest uppercase">Staff Portal</p>
        </div>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
              activeTab === item.id
                ? 'bg-ysj-gold text-ysj-dark-green'
                : 'hover:bg-white/10 text-white/70 hover:text-white'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-ysj-dark-green' : 'text-ysj-gold'} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
