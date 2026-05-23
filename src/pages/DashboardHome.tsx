import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Bird, Egg, ShoppingCart, AlertTriangle, TrendingUp, Clock, PieChart as PieChartIcon } from 'lucide-react';

const data = [
  { name: 'Mon', eggs: 7800, feeds: 400 },
  { name: 'Tue', eggs: 8100, feeds: 410 },
  { name: 'Wed', eggs: 7950, feeds: 405 },
  { name: 'Thu', eggs: 8240, feeds: 415 },
  { name: 'Fri', eggs: 8000, feeds: 410 },
  { name: 'Sat', eggs: 7700, feeds: 395 },
  { name: 'Sun', eggs: 7900, feeds: 400 },
];

const pieData = [
  { name: 'Eggs (Poultry)', value: 65, color: '#228B22' },
  { name: 'Maize (Crops)', value: 20, color: '#FFD700' },
  { name: 'Cashew (Crops)', value: 15, color: '#0F3D1F' },
];

const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ysj-dark-green">Farm Overview</h1>
          <p className="text-gray-500">Real-time performance metrics for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border shadow-sm">
          <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-gray-400 ml-2">FROM</span>
             <input type="date" className="text-xs border rounded p-1 outline-none" defaultValue="2024-05-01" />
             <span className="text-xs font-bold text-gray-400">TO</span>
             <input type="date" className="text-xs border rounded p-1 outline-none" defaultValue={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          <button className="px-3 py-1 text-xs font-bold bg-ysj-dark-green text-white rounded">Apply</button>
        </div>
      </div>

      {/* Quick Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Today's Eggs", value: "8,240", icon: Egg, color: "text-ysj-gold", bg: "bg-ysj-gold/10" },
          { label: "Dispatched", value: "7,500", icon: ShoppingCart, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Feeds Used", value: "415 kg", icon: Bird, color: "text-ysj-green", bg: "bg-ysj-green/10" },
          { label: "Cracked Eggs", value: "98", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${item.bg}`}>
              <item.icon className={item.color} size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-ysj-green" />
              Egg Production vs Feed Consumption
            </h3>
            <select className="text-xs border-none bg-gray-50 rounded p-1 font-semibold text-gray-500 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEggs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#228B22" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#228B22" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="eggs" stroke="#228B22" fillOpacity={1} fill="url(#colorEggs)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <PieChartIcon size={20} className="text-ysj-green" />
            Production Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="font-medium text-gray-600">{item.name}</span>
                </div>
                <span className="font-bold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock size={20} className="text-ysj-gold" />
            Recent Activity
          </h3>
          <div className="space-y-6">
            {[
              { title: 'Morning Egg Collection', time: '2 hours ago', status: 'Completed', user: 'Admin' },
              { title: 'Feed Stock Updated', time: '4 hours ago', status: 'Notice', user: 'Admin' },
              { title: 'New Comment on Report', time: '5 hours ago', status: 'Reply', user: 'MD' },
              { title: 'Weekly Mortality Log', time: 'Yesterday', status: 'Record', user: 'Manager' },
              { title: 'Maize Harvest Entry', time: 'Yesterday', status: 'Crop', user: 'Admin' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative">
                  <div className={`h-3 w-3 rounded-full mt-1.5 ${i === 0 ? 'bg-ysj-green' : 'bg-gray-300'}`}></div>
                  {i !== 4 && <div className="absolute top-4 left-1.5 w-px h-full bg-gray-100"></div>}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400 uppercase font-bold">{activity.time}</span>
                    <span className="text-[10px] text-ysj-green font-bold px-1.5 py-0.5 bg-ysj-green/10 rounded">{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-sm font-semibold text-ysj-dark-green bg-ysj-cream rounded-lg hover:bg-ysj-gold/20 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
