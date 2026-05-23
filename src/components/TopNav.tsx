import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const TopNav: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search reports, data..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ysj-green/20 focus:border-ysj-green"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-ysj-green transition-colors">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 border-2 border-white rounded-full text-[10px] text-white flex items-center justify-center">3</span>
        </button>

        <div className="flex items-center gap-3 border-l pl-6">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-[10px] font-bold text-ysj-green uppercase tracking-tighter">
              {user?.role.replace('_', ' ')}
            </p>
          </div>
          <div className="h-10 w-10 bg-ysj-cream rounded-full flex items-center justify-center text-ysj-dark-green border border-ysj-green/20">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
