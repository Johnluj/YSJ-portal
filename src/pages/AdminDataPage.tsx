import { useState } from 'react';
import {
  Plus,
  Upload,
  Edit2,
  Trash2,
  Save,
  X
} from 'lucide-react';

interface FarmRecord {
  id: number;
  date: string;
  picked: number;
  cracked: number;
  dispatched: number;
  feeds: number;
  notes: string;
}

interface CropRecord {
  id: number;
  date: string;
  type: 'Maize' | 'Cashew';
  quantity: number;
  unit: string;
  plot: string;
  quality: string;
  notes: string;
}

const initialRecords: FarmRecord[] = [
  { id: 1, date: '2024-05-20', picked: 8240, cracked: 98, dispatched: 7500, feeds: 415, notes: 'Good yield today.' },
  { id: 2, date: '2024-05-19', picked: 8100, cracked: 105, dispatched: 7800, feeds: 410, notes: 'Standard day.' },
  { id: 3, date: '2024-05-18', picked: 7950, cracked: 112, dispatched: 7200, feeds: 405, notes: 'Slightly higher mortality.' },
];

const initialCropRecords: CropRecord[] = [
  { id: 1, date: '2024-05-15', type: 'Maize', quantity: 50, unit: 'bags', plot: 'North Field', quality: 'Grade A', notes: 'First harvest.' },
  { id: 2, date: '2024-05-12', type: 'Cashew', quantity: 120, unit: 'kg', plot: 'East Orchard', quality: 'Premium', notes: 'Excellent nut size.' },
];

const AdminDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'poultry' | 'crops'>('poultry');
  const [records, setRecords] = useState<FarmRecord[]>(initialRecords);
  const [cropRecords, setCropRecords] = useState<CropRecord[]>(initialCropRecords);
  const [isAdding, setIsAdding] = useState(false);

  const [newRecord, setNewRecord] = useState<Partial<FarmRecord>>({
    date: new Date().toISOString().split('T')[0],
    picked: 0,
    cracked: 0,
    dispatched: 0,
    feeds: 0,
    notes: ''
  });

  const [newCropRecord, setNewCropRecord] = useState<Partial<CropRecord>>({
    date: new Date().toISOString().split('T')[0],
    type: 'Maize',
    quantity: 0,
    unit: 'bags',
    plot: '',
    quality: 'Grade A',
    notes: ''
  });

  const handleSaveNew = () => {
    if (activeTab === 'poultry') {
      const record = { ...newRecord, id: Date.now() } as FarmRecord;
      setRecords([record, ...records]);
      setNewRecord({
        date: new Date().toISOString().split('T')[0],
        picked: 0,
        cracked: 0,
        dispatched: 0,
        feeds: 0,
        notes: ''
      });
    } else {
      const record = { ...newCropRecord, id: Date.now() } as CropRecord;
      setCropRecords([record, ...cropRecords]);
      setNewCropRecord({
        date: new Date().toISOString().split('T')[0],
        type: 'Maize',
        quantity: 0,
        unit: 'bags',
        plot: '',
        quality: 'Grade A',
        notes: ''
      });
    }
    setIsAdding(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this record?')) {
      if (activeTab === 'poultry') {
        setRecords(records.filter(r => r.id !== id));
      } else {
        setCropRecords(cropRecords.filter(r => r.id !== id));
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ysj-dark-green">Data Management</h1>
          <p className="text-gray-500">Upload, edit, and manage farm records.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-ysj-dark-green text-white rounded-lg text-sm font-medium hover:bg-ysj-green transition-colors"
          >
            <Plus size={18} />
            New Entry
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-ysj-cream text-ysj-dark-green border border-ysj-green/20 rounded-lg text-sm font-medium hover:bg-ysj-gold/20 transition-colors">
            <Upload size={18} />
            Bulk Upload (CSV)
          </button>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('poultry')}
          className={`px-6 py-3 text-sm font-bold transition-colors ${activeTab === 'poultry' ? 'text-ysj-green border-b-2 border-ysj-green' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Poultry & Eggs
        </button>
        <button
          onClick={() => setActiveTab('crops')}
          className={`px-6 py-3 text-sm font-bold transition-colors ${activeTab === 'crops' ? 'text-ysj-green border-b-2 border-ysj-green' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Crops (Maize/Cashew)
        </button>
      </div>

      {/* Entry Form (Conditional) */}
      {isAdding && (
        <div className="bg-white p-8 rounded-xl shadow-md border-2 border-ysj-green/20 animate-in fade-in zoom-in duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-ysj-dark-green">
              {activeTab === 'poultry' ? 'New Daily Production Entry' : 'New Crop Harvest Entry'}
            </h2>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          {activeTab === 'poultry' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Eggs Picked</label>
                <input
                  type="number"
                  value={newRecord.picked}
                  onChange={(e) => setNewRecord({...newRecord, picked: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Cracked Eggs</label>
                <input
                  type="number"
                  value={newRecord.cracked}
                  onChange={(e) => setNewRecord({...newRecord, cracked: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Dispatched Eggs</label>
                <input
                  type="number"
                  value={newRecord.dispatched}
                  onChange={(e) => setNewRecord({...newRecord, dispatched: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Feeds Used (kg)</label>
                <input
                  type="number"
                  value={newRecord.feeds}
                  onChange={(e) => setNewRecord({...newRecord, feeds: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                  placeholder="Any observations or specific details..."
                ></textarea>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newCropRecord.date}
                  onChange={(e) => setNewCropRecord({...newCropRecord, date: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Crop Type</label>
                <select
                  value={newCropRecord.type}
                  onChange={(e) => setNewCropRecord({...newCropRecord, type: e.target.value as 'Maize' | 'Cashew'})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                >
                  <option value="Maize">Maize</option>
                  <option value="Cashew">Cashew</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={newCropRecord.quantity}
                    onChange={(e) => setNewCropRecord({...newCropRecord, quantity: parseInt(e.target.value)})}
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                  />
                  <input
                    type="text"
                    value={newCropRecord.unit}
                    placeholder="Unit"
                    onChange={(e) => setNewCropRecord({...newCropRecord, unit: e.target.value})}
                    className="w-24 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Plot/Field</label>
                <input
                  type="text"
                  value={newCropRecord.plot}
                  onChange={(e) => setNewCropRecord({...newCropRecord, plot: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                  placeholder="e.g. North Field"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Quality</label>
                <input
                  type="text"
                  value={newCropRecord.quality}
                  onChange={(e) => setNewCropRecord({...newCropRecord, quality: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                  placeholder="e.g. Grade A"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={newCropRecord.notes}
                  onChange={(e) => setNewCropRecord({...newCropRecord, notes: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ysj-green/20 outline-none"
                  placeholder="Harvest details..."
                ></textarea>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => setIsAdding(false)}
              className="px-6 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNew}
              className="px-6 py-2 text-sm font-bold text-white bg-ysj-dark-green hover:bg-ysj-green rounded-lg transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Save Record
            </button>
          </div>
        </div>
      )}

      {/* Editable Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'poultry' ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Picked</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cracked</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Dispatched</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Feeds (kg)</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.picked}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.cracked}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.dispatched}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.feeds}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-gray-400 hover:text-ysj-green transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plot</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Quality</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cropRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-bold">{record.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.quantity} {record.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.plot}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{record.quality}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 text-gray-400 hover:text-ysj-green transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDataPage;
