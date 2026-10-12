import React, { useState } from 'react';
import { 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  ArrowUpRight, 
  Radio, 
  Layers, 
  Clock, 
  Truck,
  Droplets,
  Bell
} from 'lucide-react';
import { useWaste } from '../context/WasteContext';
import { WasteCategory } from '../types/waste';

export const BinMonitoringPage: React.FC = () => {
  const { bins, emptyBin, emptyDrainageTank, telemetry } = useWaste();
  const [emptiedNotice, setEmptiedNotice] = useState<string | null>(null);

  const handleEmpty = (category: WasteCategory) => {
    emptyBin(category);
    setEmptiedNotice(`Bin emptied: ${category}. Compaction complete.`);
    setTimeout(() => setEmptiedNotice(null), 3000);
  };

  const categories: WasteCategory[] = ['Wet Waste', 'Plastic', 'Paper', 'Metal'];

  return (
    <div className="min-h-screen bg-[#081421] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-1">
            <span>IoT Sensor Array</span>
            <span aria-hidden="true">·</span>
            <span>HC-SR04 Ultrasonic Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            3D Bin Monitoring & Volumetric Telemetry
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Real-time ultrasonic depth measurements, fill rate velocity, and automated municipal collection dispatch triggers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={emptyDrainageTank}
            className="px-3.5 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>Flush Drainage Tank</span>
          </button>
        </div>
      </div>

      {emptiedNotice && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{emptiedNotice}</span>
        </div>
      )}

      {/* 4 Interactive 3D-Style Bins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {categories.map((cat) => {
          const bin = bins[cat];
          const isFull = bin.fillPercentage >= 90;
          const isNearFull = bin.fillPercentage >= 75 && !isFull;

          const theme = 
            cat === 'Wet Waste' ? { border: 'border-emerald-500/40', fill: '#10B981', text: 'text-emerald-400', bg: 'bg-emerald-500/10' } :
            cat === 'Plastic' ? { border: 'border-cyan-500/40', fill: '#06B6D4', text: 'text-cyan-400', bg: 'bg-cyan-500/10' } :
            cat === 'Paper' ? { border: 'border-yellow-500/40', fill: '#EAB308', text: 'text-yellow-400', bg: 'bg-yellow-500/10' } :
            { border: 'border-red-500/40', fill: '#EF4444', text: 'text-red-400', bg: 'bg-red-500/10' };

          return (
            <div 
              key={cat} 
              className={`p-6 rounded-3xl bg-slate-900/70 border ${theme.border} flex flex-col justify-between relative overflow-hidden transition-all hover:border-slate-600`}
            >
              {/* Full Bin Warning Ribbon */}
              {isFull && (
                <div className="mb-3 p-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">Collection Required (&ge;90%)</span>
                </div>
              )}
              {isNearFull && (
                <div className="mb-3 p-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs flex items-center gap-2">
                  <Bell className="w-4 h-4 shrink-0" />
                  <span>Approaching threshold (&ge;75%)</span>
                </div>
              )}

              {/* Bin Header */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-semibold uppercase tracking-wider ${theme.text}`}>{cat}</span>
                  <span className="text-slate-400 font-mono-num">{bin.totalItemsCount} pieces</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">{bin.name}</h3>

                {/* 3D-Style Cylinder / Vessel Display */}
                <div className="relative w-full h-44 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-3 mb-4 overflow-hidden">
                  {/* Internal fluid/solid fill wave */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 transition-all duration-700 opacity-80"
                    style={{
                      height: `${bin.fillPercentage}%`,
                      backgroundColor: theme.fill,
                    }}
                  />

                  {/* Surface Level Indicator Line */}
                  <div 
                    className="absolute left-0 right-0 border-t-2 border-white/60 transition-all duration-700 z-10"
                    style={{ bottom: `${bin.fillPercentage}%` }}
                  />

                  {/* Ultrasonic sensor node at top */}
                  <div className="absolute top-2 z-10 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>{bin.distanceToSensorCm} cm to sensor</span>
                  </div>

                  {/* Big Percentage Label in Center */}
                  <div className="relative z-10 text-center drop-shadow-md">
                    <div className="text-3xl font-extrabold text-white font-mono-num">
                      {bin.fillPercentage}%
                    </div>
                    <div className="text-[11px] text-slate-200 font-medium">
                      {bin.currentWeightKg} / {bin.maxCapacityKg} kg
                    </div>
                  </div>
                </div>

                {/* Sensor Details */}
                <div className="space-y-1.5 text-xs text-slate-400 mb-6">
                  <div className="flex items-center justify-between">
                    <span>Ultrasonic Distance:</span>
                    <span className="text-slate-200 font-mono-num">{bin.distanceToSensorCm} cm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Current Mass:</span>
                    <span className="text-slate-200 font-mono-num">{bin.currentWeightKg} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Collection:</span>
                    <span className="text-slate-200">{bin.lastEmptied}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hardware Node ID:</span>
                    <span className="text-slate-400 font-mono text-[11px]">NODE_BIN_{cat.substring(0, 3).toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => handleEmpty(cat)}
                  className="flex-1 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Empty Bin</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wastewater Sump Monitoring Unit */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/30 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <Droplets className="w-4 h-4" />
            <span>Liquid Drainage Auxiliary Unit</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Wastewater Holding Sump Tank
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Sealed 50-liter container that collects all drained liquids from beverage cans and wet produce bags prior to dry sorting. Equipped with optical turbidity inspection and an automatic submersible evacuation pump.
          </p>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-400">Holding Level</div>
            <div className="text-2xl font-bold text-white font-mono-num">
              {telemetry.drainageTankVolumeL} / {telemetry.maxDrainageCapacityL} L
            </div>
            <div className="text-[11px] text-cyan-400 font-mono-num">
              {telemetry.drainageTankLevelPct}% Full
            </div>
          </div>

          <button
            onClick={emptyDrainageTank}
            className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors shadow-md shadow-cyan-500/20 whitespace-nowrap"
          >
            Evacuate Sump
          </button>
        </div>
      </div>
    </div>
  );
};
