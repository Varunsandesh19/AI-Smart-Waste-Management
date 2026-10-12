import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  Droplets, 
  Sparkles, 
  Leaf, 
  FileSpreadsheet, 
  CheckCircle2, 
  Filter 
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
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { useWaste } from '../context/WasteContext';

export const AnalyticsPage: React.FC = () => {
  const { bins, telemetry, events, exportCsvData } = useWaste();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');

  // Chart data
  const streamData = [
    { name: 'Wet Waste', weight: bins['Wet Waste'].currentWeightKg, color: '#10B981', pct: 38 },
    { name: 'Plastic', weight: bins['Plastic'].currentWeightKg, color: '#06B6D4', pct: 28 },
    { name: 'Paper', weight: bins['Paper'].currentWeightKg, color: '#EAB308', pct: 20 },
    { name: 'Metal', weight: bins['Metal'].currentWeightKg, color: '#EF4444', pct: 14 },
  ];

  const trendData = [
    { date: 'Oct 06', totalKg: 28.4, co2Saved: 47.7, accuracy: 98.9 },
    { date: 'Oct 07', totalKg: 34.2, co2Saved: 57.4, accuracy: 99.1 },
    { date: 'Oct 08', totalKg: 31.8, co2Saved: 53.4, accuracy: 99.4 },
    { date: 'Oct 09', totalKg: 42.0, co2Saved: 70.5, accuracy: 99.2 },
    { date: 'Oct 10', totalKg: 46.5, co2Saved: 78.1, accuracy: 99.5 },
    { date: 'Oct 11', totalKg: 52.8, co2Saved: 88.7, accuracy: 99.3 },
    { date: 'Today', totalKg: telemetry.totalWasteProcessedKg, co2Saved: telemetry.co2SavedKg, accuracy: telemetry.overallAccuracyPct },
  ];

  const hourlyIntakeData = [
    { hour: '06:00', items: 12 },
    { hour: '08:00', items: 48 },
    { hour: '10:00', items: 76 },
    { hour: '12:00', items: 94 },
    { hour: '14:00', items: 68 },
    { hour: '16:00', items: 82 },
    { hour: '18:00', items: 55 },
    { hour: '20:00', items: 22 },
  ];

  // Calculated Equivalencies
  const treesSaved = (telemetry.co2SavedKg / 21.7).toFixed(1); // 1 tree absorbs ~21.7kg CO2/year
  const landfillVolumeM3 = (telemetry.totalWasteProcessedKg * 0.0035).toFixed(2);

  return (
    <div className="min-h-screen bg-[#081421] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-1">
            <span>Corporate ESG Reporting</span>
            <span aria-hidden="true">·</span>
            <span>ISO 14001 Waste Metrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Environmental Analytics & Reporting
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Quantifiable diversion metrics, carbon offsets, sorting accuracy trends, and automated export reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeRange === '7d' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeRange === '30d' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeRange === 'all' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>

          <button
            onClick={exportCsvData}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV Report</span>
          </button>
        </div>
      </div>

      {/* 4 Environmental KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>CO₂ Emissions Avoided</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-num mb-1">
            {telemetry.co2SavedKg} <span className="text-base font-normal text-slate-400">kg</span>
          </div>
          <div className="text-[11px] text-emerald-400">
            Equivalent to saving ~{treesSaved} urban trees
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Landfill Airspace Saved</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-num mb-1">
            {landfillVolumeM3} <span className="text-base font-normal text-slate-400">m³</span>
          </div>
          <div className="text-[11px] text-cyan-400">
            Municipal compaction ratio: 4.2:1
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Liquid Sump Recovery</span>
            <Droplets className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-num mb-1">
            {telemetry.drainageTankVolumeL} <span className="text-base font-normal text-slate-400">Liters</span>
          </div>
          <div className="text-[11px] text-yellow-400">
            Zero contamination to dry paper bales
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Optical Model Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-num mb-1">
            {telemetry.overallAccuracyPct}%
          </div>
          <div className="text-[11px] text-emerald-400">
            Across {telemetry.totalItemsSorted} verified detections
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Cumulative Mass & Offset Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Cumulative Waste Intake & Carbon Offset</h3>
              <p className="text-xs text-slate-400">Daily processed mass in kg paired with averted carbon</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> Total Mass (kg)
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" /> CO₂ Avoided (kg)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="kg" />
                <Tooltip contentStyle={{ backgroundColor: '#0c1c2e', borderColor: '#1e3a5f', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="totalKg" stroke="#10B981" fillOpacity={1} fill="url(#colorMass)" strokeWidth={2} />
                <Area type="monotone" dataKey="co2Saved" stroke="#06B6D4" fillOpacity={1} fill="url(#colorCo2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Donut */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Stream Composition</h3>
            <p className="text-xs text-slate-400 mb-4">Breakdown of segregated materials</p>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={streamData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="weight"
                  >
                    {streamData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`${val} kg`, 'Mass']}
                    contentStyle={{ backgroundColor: '#0c1c2e', borderColor: '#1e3a5f', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs">
            {streamData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span>{s.name}</span>
                </span>
                <span className="font-mono-num font-semibold text-white">{s.weight} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Load Bar Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Diurnal Waste Intake Profile</h3>
            <p className="text-xs text-slate-400">Peak payload count per hour to optimize conveyor duty cycles</p>
          </div>
          <span className="text-xs text-slate-400 font-mono-num">Conveyor Duty Cycle: 72% Nominal</span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyIntakeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0c1c2e', borderColor: '#1e3a5f', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="items" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
