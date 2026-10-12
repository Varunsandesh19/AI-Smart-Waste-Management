import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Trash2, 
  AlertTriangle, 
  Activity, 
  Droplets, 
  CheckCircle2, 
  Zap, 
  Play, 
  RefreshCw, 
  Download, 
  Layers, 
  Search,
  Filter,
  Info,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { useWaste } from '../context/WasteContext';
import { WasteCategory, WasteItem } from '../types/waste';

export const DashboardPage: React.FC = () => {
  const { 
    bins, 
    telemetry, 
    events, 
    emptyBin, 
    processSortedItem, 
    exportCsvData, 
    resetAllData 
  } = useWaste();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [quickFeedStatus, setQuickFeedStatus] = useState<string | null>(null);

  // Chart datasets
  const categoryChartData = [
    { name: 'Wet Waste', value: bins['Wet Waste'].currentWeightKg, color: '#10B981', items: bins['Wet Waste'].totalItemsCount },
    { name: 'Plastic', value: bins['Plastic'].currentWeightKg, color: '#06B6D4', items: bins['Plastic'].totalItemsCount },
    { name: 'Paper', value: bins['Paper'].currentWeightKg, color: '#EAB308', items: bins['Paper'].totalItemsCount },
    { name: 'Metal', value: bins['Metal'].currentWeightKg, color: '#EF4444', items: bins['Metal'].totalItemsCount },
  ];

  const weeklyTrendData = [
    { day: 'Mon', wet: 18.2, plastic: 12.4, paper: 9.1, metal: 7.2 },
    { day: 'Tue', wet: 22.5, plastic: 14.8, paper: 11.0, metal: 8.5 },
    { day: 'Wed', wet: 24.1, plastic: 15.6, paper: 10.4, metal: 9.8 },
    { day: 'Thu', wet: 26.8, plastic: 17.2, paper: 12.8, metal: 11.4 },
    { day: 'Fri', wet: 31.4, plastic: 19.5, paper: 14.2, metal: 14.0 },
    { day: 'Sat', wet: 35.0, plastic: 21.0, paper: 16.5, metal: 16.2 },
    { day: 'Today', wet: bins['Wet Waste'].currentWeightKg, plastic: bins['Plastic'].currentWeightKg, paper: bins['Paper'].currentWeightKg, metal: bins['Metal'].currentWeightKg },
  ];

  // Filter events
  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || e.sensorTriggered.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || e.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleQuickFeed = (category: WasteCategory, name: string, weight: number, hasLiquid: boolean) => {
    const item: WasteItem = {
      id: `item-${Date.now()}`,
      name,
      category,
      confidence: +(97 + Math.random() * 2.8).toFixed(1),
      weightKg: weight,
      hasLiquid,
      liquidVolumeMl: hasLiquid ? 35 : 0,
      recyclabilityScore: category === 'Wet Waste' ? 88 : 95,
      material: category,
      timestamp: new Date().toLocaleTimeString(),
      status: 'sorted',
    };
    processSortedItem(item);
    setQuickFeedStatus(`Simulated ingestion of: ${name} -> ${category}`);
    setTimeout(() => setQuickFeedStatus(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#081421] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
            <span>EcoReward Core</span>
            <span aria-hidden="true">·</span>
            <span>Demonstration Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Smart Waste Operations Dashboard
          </h1>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={exportCsvData}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Report</span>
          </button>
          <button
            onClick={resetAllData}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <Link
            to="/simulation"
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm shadow-emerald-500/20"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Open Simulation</span>
          </Link>
        </div>
      </div>

      {/* Demonstration Notice Banner */}
      <div className="my-6 p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Simulation Mode:</strong> Values represent high-fidelity hardware demonstrations and local persistent records. Processing items in the AI detector or simulation machine dynamically updates all meters below.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 font-mono-num">
          <span>Camera: 60 FPS</span>
          <span aria-hidden="true">·</span>
          <span>Speed: 0.85 m/s</span>
          <span aria-hidden="true">·</span>
          <span>Temp: 22.4°C</span>
        </div>
      </div>

      {quickFeedStatus && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{quickFeedStatus}</span>
        </div>
      )}

      {/* 4 Waste Categories Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Wet Waste Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-emerald-400 font-semibold uppercase tracking-wider">Wet Waste</span>
              <span className="text-slate-400 font-mono-num">{bins['Wet Waste'].totalItemsCount} items</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono-num mb-1">
              {bins['Wet Waste'].currentWeightKg} <span className="text-base font-normal text-slate-400">kg</span>
            </div>
            <div className="text-xs text-slate-400 mb-4">
              Capacity: {bins['Wet Waste'].maxCapacityKg} kg max · Organic Compost
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Bin Fill Level</span>
              <span className="font-semibold text-emerald-400 font-mono-num">{bins['Wet Waste'].fillPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${bins['Wet Waste'].fillPercentage}%` }} 
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleQuickFeed('Wet Waste', 'Food Scrap Residue', 0.14, true)}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium"
              >
                + Ingest Sample
              </button>
              <button
                onClick={() => emptyBin('Wet Waste')}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Empty Bin
              </button>
            </div>
          </div>
        </div>

        {/* Plastic Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-cyan-400 font-semibold uppercase tracking-wider">Plastic</span>
              <span className="text-slate-400 font-mono-num">{bins['Plastic'].totalItemsCount} items</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono-num mb-1">
              {bins['Plastic'].currentWeightKg} <span className="text-base font-normal text-slate-400">kg</span>
            </div>
            <div className="text-xs text-slate-400 mb-4">
              Capacity: {bins['Plastic'].maxCapacityKg} kg max · Polymers & PET
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Bin Fill Level</span>
              <span className={`font-semibold font-mono-num ${bins['Plastic'].fillPercentage >= 85 ? 'text-amber-400' : 'text-cyan-400'}`}>
                {bins['Plastic'].fillPercentage}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
              <div 
                className="h-full bg-cyan-400 rounded-full transition-all duration-500" 
                style={{ width: `${bins['Plastic'].fillPercentage}%` }} 
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleQuickFeed('Plastic', 'PET Beverage Bottle', 0.04, true)}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium"
              >
                + Ingest Sample
              </button>
              <button
                onClick={() => emptyBin('Plastic')}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Empty Bin
              </button>
            </div>
          </div>
        </div>

        {/* Paper Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-yellow-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-yellow-400 font-semibold uppercase tracking-wider">Paper & Kraft</span>
              <span className="text-slate-400 font-mono-num">{bins['Paper'].totalItemsCount} items</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono-num mb-1">
              {bins['Paper'].currentWeightKg} <span className="text-base font-normal text-slate-400">kg</span>
            </div>
            <div className="text-xs text-slate-400 mb-4">
              Capacity: {bins['Paper'].maxCapacityKg} kg max · Fibers & Boxes
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Bin Fill Level</span>
              <span className="font-semibold text-yellow-400 font-mono-num">{bins['Paper'].fillPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
              <div 
                className="h-full bg-yellow-400 rounded-full transition-all duration-500" 
                style={{ width: `${bins['Paper'].fillPercentage}%` }} 
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleQuickFeed('Paper', 'Corrugated Shipping Box', 0.22, false)}
                className="text-[11px] text-yellow-400 hover:text-yellow-300 font-medium"
              >
                + Ingest Sample
              </button>
              <button
                onClick={() => emptyBin('Paper')}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Empty Bin
              </button>
            </div>
          </div>
        </div>

        {/* Metal Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-red-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-red-400 font-semibold uppercase tracking-wider">Metal & Cans</span>
              <span className="text-slate-400 font-mono-num">{bins['Metal'].totalItemsCount} items</span>
            </div>
            <div className="text-3xl font-bold text-white font-mono-num mb-1">
              {bins['Metal'].currentWeightKg} <span className="text-base font-normal text-slate-400">kg</span>
            </div>
            <div className="text-xs text-slate-400 mb-4">
              Capacity: {bins['Metal'].maxCapacityKg} kg max · Aluminum & Steel
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Bin Fill Level</span>
              <span className="font-semibold text-red-400 font-mono-num">{bins['Metal'].fillPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden mb-3">
              <div 
                className="h-full bg-red-400 rounded-full transition-all duration-500" 
                style={{ width: `${bins['Metal'].fillPercentage}%` }} 
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleQuickFeed('Metal', 'Crushed Soda Can', 0.016, true)}
                className="text-[11px] text-red-400 hover:text-red-300 font-medium"
              >
                + Ingest Sample
              </button>
              <button
                onClick={() => emptyBin('Metal')}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Empty Bin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Weekly Trend Bar Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Daily Segregated Mass Trends</h3>
              <p className="text-xs text-slate-400">Kilograms processed by category across the trailing 7 days</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Wet
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" /> Plastic
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400" /> Paper
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-red-400" /> Metal
              </span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="kg" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0c1c2e', borderColor: '#1e3a5f', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="wet" fill="#10B981" radius={[3, 3, 0, 0]} stackId="a" />
                <Bar dataKey="plastic" fill="#06B6D4" radius={[3, 3, 0, 0]} stackId="a" />
                <Bar dataKey="paper" fill="#EAB308" radius={[3, 3, 0, 0]} stackId="a" />
                <Bar dataKey="metal" fill="#EF4444" radius={[3, 3, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Distribution Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Current Stream Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Relative weight proportion inside active bins</p>
            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`${value} kg`, 'Weight']}
                    contentStyle={{ backgroundColor: '#0c1c2e', borderColor: '#1e3a5f', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80 text-xs">
            {categoryChartData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="truncate">{c.name}</span>
                </span>
                <span className="font-mono-num font-semibold text-white">{c.value}kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sorting Activity Stream */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Live Sorting Event Stream</h3>
            <p className="text-xs text-slate-400">Chronological telemetry from optical detector and servo flap triggers</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items or actuators..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg text-xs">
              {['All', 'Wet Waste', 'Plastic', 'Paper', 'Metal'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedFilter === filter 
                      ? 'bg-slate-700 text-white font-medium' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800/80">
              <tr>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Item Detected</th>
                <th className="py-3 px-4 font-semibold">Classification Stream</th>
                <th className="py-3 px-4 font-semibold text-right">Confidence</th>
                <th className="py-3 px-4 font-semibold text-right">Weight</th>
                <th className="py-3 px-4 font-semibold text-right">Liquid Drained</th>
                <th className="py-3 px-4 font-semibold">Actuator Triggered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No sorting events found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => {
                  const categoryBadgeColor = 
                    evt.category === 'Wet Waste' ? 'text-emerald-400' :
                    evt.category === 'Plastic' ? 'text-cyan-400' :
                    evt.category === 'Paper' ? 'text-yellow-400' : 'text-red-400';

                  return (
                    <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 text-slate-400 font-mono-num">{evt.timestamp}</td>
                      <td className="py-3 px-4 font-medium text-white">{evt.itemName}</td>
                      <td className="py-3 px-4 font-medium">
                        <span className={categoryBadgeColor}>{evt.category}</span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono-num text-slate-300">{evt.confidence}%</td>
                      <td className="py-3 px-4 text-right font-mono-num text-slate-300">{(evt.weightKg * 1000).toFixed(0)} g</td>
                      <td className="py-3 px-4 text-right font-mono-num text-slate-300">
                        {evt.liquidDrainedMl > 0 ? (
                          <span className="text-cyan-400">{evt.liquidDrainedMl} ml</span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{evt.sensorTriggered}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
