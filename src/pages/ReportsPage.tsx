import { useState } from 'react';
import {
  Download,
  MessageSquare,
  User as UserIcon,
  ChevronRight,
  Plus,
  Egg,
  Sprout,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { useAuth } from '../hooks/useAuth';

const sampleReports = [
  { id: 1, date: '2024-05-20', picked: 8240, cracked: 98, dispatched: 7500, sold: 7450, feeds: 415, notes: 'Good yield today.' },
  { id: 2, date: '2024-05-19', picked: 8100, cracked: 105, dispatched: 7800, sold: 7780, feeds: 410, notes: 'Standard day.' },
  { id: 3, date: '2024-05-18', picked: 7950, cracked: 112, dispatched: 7200, sold: 7150, feeds: 405, notes: 'Slightly higher mortality in Section B.' },
  { id: 4, date: '2024-05-17', picked: 8300, cracked: 85, dispatched: 8000, sold: 7990, feeds: 420, notes: 'Peak production week.' },
  { id: 5, date: '2024-05-16', picked: 7800, cracked: 120, dispatched: 7000, sold: 6950, feeds: 400, notes: 'Feed delivery received.' },
];

const sampleCropReports = [
  { id: 1, date: '2024-05-15', type: 'Maize', quantity: 50, unit: 'bags', plot: 'North Field', quality: 'Grade A', notes: 'First harvest of the season.' },
  { id: 2, date: '2024-05-12', type: 'Cashew', quantity: 120, unit: 'kg', plot: 'East Orchard', quality: 'Premium', notes: 'Excellent nut size.' },
  { id: 3, date: '2024-05-10', type: 'Maize', quantity: 45, unit: 'bags', plot: 'West Field', quality: 'Grade B', notes: 'Slight moisture content high.' },
  { id: 4, date: '2024-05-05', type: 'Cashew', quantity: 95, unit: 'kg', plot: 'East Orchard', quality: 'Premium', notes: 'Regular picking.' },
];

interface ReportsPageProps {
  initialType?: 'poultry' | 'crops';
}

const ReportsPage: React.FC<ReportsPageProps> = ({ initialType = 'poultry' }) => {
  const { user } = useAuth();
  const [reportType, setReportType] = useState<'poultry' | 'crops'>(initialType);
  const [comments, setComments] = useState([
    { id: 1, user: 'MD', text: 'Great production numbers this week. Keep it up!', date: '2024-05-20' },
    { id: 2, user: 'Manager', text: 'We need to look into the cracked eggs percentage for the 18th.', date: '2024-05-19' }
  ]);
  const [newComment, setNewComment] = useState('');

  const canComment = ['MD', 'DEPUTY_MD', 'MANAGER'].includes(user?.role || '');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      user: user?.role.replace('_', ' ') || 'User',
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ysj-dark-green">Farm Reports</h1>
          <p className="text-gray-500">Detailed daily records and performance tracking.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white border rounded-lg p-1 flex">
            <button
              onClick={() => setReportType('poultry')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${reportType === 'poultry' ? 'bg-ysj-green text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Egg size={14} />
              Poultry
            </button>
            <button
              onClick={() => setReportType('crops')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${reportType === 'crops' ? 'bg-ysj-green text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <Sprout size={14} />
              Crops
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-ysj-dark-green text-white rounded-lg text-sm font-medium hover:bg-ysj-green transition-colors">
            <Download size={18} />
            Export to Excel
          </button>
        </div>
      </div>

      <>
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp size={16} />
              {reportType === 'poultry' ? 'Egg Production Trend' : 'Harvest Trends'}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {reportType === 'poultry' ? (
                  <LineChart data={sampleReports}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" hide />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip />
                    <Line type="monotone" dataKey="picked" stroke="#228B22" strokeWidth={2} dot={{fill: '#228B22'}} />
                  </LineChart>
                ) : (
                  <BarChart data={sampleCropReports}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="date" hide />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#FFD700" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-ysj-cream/30 p-6 rounded-xl border border-ysj-green/10 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                <BarChart3 className="text-ysj-green" />
              </div>
              <div>
                <h4 className="font-bold text-ysj-dark-green">Quick Insights</h4>
                <p className="text-xs text-gray-500">Based on last 7 entries</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-ysj-green/5">
                <span className="text-sm text-gray-600">Average Yield</span>
                <span className="text-sm font-bold text-ysj-dark-green">{reportType === 'poultry' ? '8,066 eggs' : '77.5 units'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-ysj-green/5">
                <span className="text-sm text-gray-600">Peak Production</span>
                <span className="text-sm font-bold text-ysj-dark-green">{reportType === 'poultry' ? 'May 20th' : 'May 12th'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Efficiency Score</span>
                <span className="text-sm font-bold text-ysj-green">94.2%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {reportType === 'poultry' ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Picked</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cracked</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Dispatched</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sold</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Feeds (kg)</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sampleReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.picked.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-red-500 font-medium">{report.cracked}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.dispatched.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-ysj-green font-semibold">{report.sold.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.feeds}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Crop</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plot</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Quality</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sampleCropReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{report.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-bold">{report.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.quantity} {report.unit}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{report.plot}</td>
                      <td className="px-6 py-4 text-sm text-ysj-green font-semibold">{report.quality}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Recorded
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {reportType === 'poultry' ? '5 of 120' : '4 of 45'} records</p>
            <div className="flex gap-2">
              <button className="p-2 border rounded hover:bg-white disabled:opacity-50" disabled>Previous</button>
              <button className="p-2 border rounded hover:bg-white">Next</button>
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare size={20} className="text-ysj-green" />
                MD & Manager Remarks
              </h3>
            </div>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="h-10 w-10 bg-ysj-cream rounded-full flex-shrink-0 flex items-center justify-center border border-ysj-green/20">
                    <UserIcon size={20} className="text-ysj-dark-green" />
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 rounded-2xl relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-gray-900">{comment.user}</span>
                      <span className="text-[10px] text-gray-400 font-bold">{comment.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {canComment && (
              <form onSubmit={handleAddComment} className="mt-8 flex gap-3">
                <input
                  type="text"
                  placeholder="Write a remark..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ysj-green/20 focus:border-ysj-green"
                />
                <button
                  type="submit"
                  className="bg-ysj-dark-green text-white p-2 rounded-lg hover:bg-ysj-green transition-colors"
                >
                  <Plus size={20} />
                </button>
              </form>
            )}
          </div>

          <div className="bg-ysj-dark-green p-8 rounded-xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Request Specialized Analysis</h3>
              <p className="text-white/70 mb-6 text-sm">Compare seasonal yield data across different poultry sections or crop plots.</p>
              <button className="flex items-center gap-2 px-6 py-3 bg-ysj-gold text-ysj-dark-green font-bold rounded-lg hover:bg-white transition-all transform hover:scale-105">
                Generate Comparison Chart
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <BarChart3 size={200} />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ReportsPage;
