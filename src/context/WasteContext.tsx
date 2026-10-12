import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BinStatus, SortingEvent, SystemTelemetry, WasteCategory, WasteItem } from '../types/waste';

const INITIAL_BINS: Record<WasteCategory, BinStatus> = {
  'Wet Waste': {
    id: 'Wet Waste',
    name: 'Organic & Wet Waste',
    category: 'Wet Waste',
    color: 'emerald',
    colorHex: '#10B981',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    fillPercentage: 64,
    currentWeightKg: 32.4,
    maxCapacityKg: 50.0,
    totalItemsCount: 88,
    distanceToSensorCm: 18.2,
    lastEmptied: '2 hours ago',
    status: 'normal',
    weeklyTrend: [45, 52, 60, 58, 64],
  },
  'Plastic': {
    id: 'Plastic',
    name: 'Polymers & Plastics',
    category: 'Plastic',
    color: 'teal',
    colorHex: '#06B6D4',
    accentBg: 'rgba(6, 182, 212, 0.12)',
    fillPercentage: 86,
    currentWeightKg: 17.2,
    maxCapacityKg: 20.0,
    totalItemsCount: 142,
    distanceToSensorCm: 7.1,
    lastEmptied: '5 hours ago',
    status: 'near_full',
    weeklyTrend: [55, 68, 74, 80, 86],
  },
  'Paper': {
    id: 'Paper',
    name: 'Paper & Cardboard',
    category: 'Paper',
    color: 'yellow',
    colorHex: '#EAB308',
    accentBg: 'rgba(234, 179, 8, 0.12)',
    fillPercentage: 42,
    currentWeightKg: 12.6,
    maxCapacityKg: 30.0,
    totalItemsCount: 63,
    distanceToSensorCm: 29.5,
    lastEmptied: '1 day ago',
    status: 'normal',
    weeklyTrend: [30, 35, 38, 40, 42],
  },
  'Metal': {
    id: 'Metal',
    name: 'Metals & Alloys',
    category: 'Metal',
    color: 'red',
    colorHex: '#EF4444',
    accentBg: 'rgba(239, 68, 68, 0.12)',
    fillPercentage: 38,
    currentWeightKg: 22.8,
    maxCapacityKg: 60.0,
    totalItemsCount: 51,
    distanceToSensorCm: 31.0,
    lastEmptied: '18 hours ago',
    status: 'normal',
    weeklyTrend: [25, 28, 30, 34, 38],
  },
};

const INITIAL_EVENTS: SortingEvent[] = [
  {
    id: 'evt-101',
    timestamp: '10:42:15 AM',
    itemName: 'PET Water Bottle (500ml)',
    category: 'Plastic',
    confidence: 99.2,
    weightKg: 0.045,
    liquidDrainedMl: 45,
    binAssigned: 'Plastic',
    sensorTriggered: 'FLAP_SERVO_02_BLUE',
    durationMs: 1420,
  },
  {
    id: 'evt-102',
    timestamp: '10:39:50 AM',
    itemName: 'Fresh Apple Core & Peels',
    category: 'Wet Waste',
    confidence: 98.7,
    weightKg: 0.12,
    liquidDrainedMl: 15,
    binAssigned: 'Wet Waste',
    sensorTriggered: 'FLAP_SERVO_01_GREEN',
    durationMs: 1310,
  },
  {
    id: 'evt-103',
    timestamp: '10:35:12 AM',
    itemName: 'Crushed Aluminum Soda Can',
    category: 'Metal',
    confidence: 99.8,
    weightKg: 0.015,
    liquidDrainedMl: 10,
    binAssigned: 'Metal',
    sensorTriggered: 'FLAP_SERVO_04_RED',
    durationMs: 1190,
  },
  {
    id: 'evt-104',
    timestamp: '10:28:44 AM',
    itemName: 'Corrugated Shipping Box Flat',
    category: 'Paper',
    confidence: 97.4,
    weightKg: 0.28,
    liquidDrainedMl: 0,
    binAssigned: 'Paper',
    sensorTriggered: 'FLAP_SERVO_03_YELLOW',
    durationMs: 1560,
  },
  {
    id: 'evt-105',
    timestamp: '10:19:30 AM',
    itemName: 'Polyethylene Milk Jug',
    category: 'Plastic',
    confidence: 98.9,
    weightKg: 0.065,
    liquidDrainedMl: 30,
    binAssigned: 'Plastic',
    sensorTriggered: 'FLAP_SERVO_02_BLUE',
    durationMs: 1480,
  },
  {
    id: 'evt-106',
    timestamp: '10:11:05 AM',
    itemName: 'Tin Food Can (Rinsed)',
    category: 'Metal',
    confidence: 99.4,
    weightKg: 0.085,
    liquidDrainedMl: 5,
    binAssigned: 'Metal',
    sensorTriggered: 'FLAP_SERVO_04_RED',
    durationMs: 1250,
  },
];

interface WasteContextType {
  bins: Record<WasteCategory, BinStatus>;
  telemetry: SystemTelemetry;
  events: SortingEvent[];
  activeItem: WasteItem | null;
  setActiveItem: (item: WasteItem | null) => void;
  processSortedItem: (item: WasteItem) => void;
  emptyBin: (category: WasteCategory) => void;
  emptyDrainageTank: () => void;
  setMachineStatus: (status: SystemTelemetry['machineStatus']) => void;
  setConveyorSpeed: (speed: number) => void;
  setActiveStageIndex: (stage: number) => void;
  resetAllData: () => void;
  exportCsvData: () => void;
}

const WasteContext = createContext<WasteContextType | undefined>(undefined);

const STORAGE_KEY = 'ecoreward_waste_state_v1';

export const WasteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bins, setBins] = useState<Record<WasteCategory, BinStatus>>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_bins`);
      return saved ? JSON.parse(saved) : INITIAL_BINS;
    } catch {
      return INITIAL_BINS;
    }
  });

  const [events, setEvents] = useState<SortingEvent[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [telemetry, setTelemetry] = useState<SystemTelemetry>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_telemetry`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      machineStatus: 'running',
      conveyorSpeedMps: 0.85,
      ambientTempC: 22.4,
      opticalCameraFps: 60,
      drainageTankLevelPct: 38,
      drainageTankVolumeL: 19.0,
      maxDrainageCapacityL: 50.0,
      totalWasteProcessedKg: 85.0,
      totalItemsSorted: 344,
      overallAccuracyPct: 99.2,
      co2SavedKg: 142.8,
      activeStageIndex: 0,
    };
  });

  const [activeItem, setActiveItem] = useState<WasteItem | null>(null);

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_bins`, JSON.stringify(bins));
      localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
      localStorage.setItem(`${STORAGE_KEY}_telemetry`, JSON.stringify(telemetry));
    } catch {
      // ignore
    }
  }, [bins, events, telemetry]);

  const processSortedItem = (item: WasteItem) => {
    const cat = item.category;
    const targetBin = bins[cat];
    if (!targetBin) return;

    const addedWeight = item.weightKg || 0.05;
    const newWeight = Math.min(targetBin.maxCapacityKg, +(targetBin.currentWeightKg + addedWeight).toFixed(2));
    const newFillPct = Math.min(100, Math.round((newWeight / targetBin.maxCapacityKg) * 100));
    const newStatus = newFillPct >= 90 ? 'full' : newFillPct >= 75 ? 'near_full' : 'normal';
    const newDistance = Math.max(2.0, +(50 - (newFillPct * 0.45)).toFixed(1));

    const updatedBins = {
      ...bins,
      [cat]: {
        ...targetBin,
        currentWeightKg: newWeight,
        fillPercentage: newFillPct,
        totalItemsCount: targetBin.totalItemsCount + 1,
        status: newStatus,
        distanceToSensorCm: newDistance,
      },
    };
    setBins(updatedBins);

    // Update drainage tank if liquid present
    const drainedMl = item.hasLiquid ? (item.liquidVolumeMl || 35) : 0;
    const addedL = drainedMl / 1000;
    const newDrainVolume = Math.min(telemetry.maxDrainageCapacityL, +(telemetry.drainageTankVolumeL + addedL).toFixed(2));
    const newDrainPct = Math.round((newDrainVolume / telemetry.maxDrainageCapacityL) * 100);

    const newEvent: SortingEvent = {
      id: `evt-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      itemName: item.name,
      category: item.category,
      confidence: item.confidence || 98.5,
      weightKg: addedWeight,
      liquidDrainedMl: drainedMl,
      binAssigned: item.category,
      sensorTriggered: `FLAP_SERVO_${cat.toUpperCase().replace(/\s+/g, '_')}`,
      durationMs: 1350,
    };

    setEvents((prev) => [newEvent, ...prev.slice(0, 49)]);

    setTelemetry((prev) => ({
      ...prev,
      totalWasteProcessedKg: +(prev.totalWasteProcessedKg + addedWeight).toFixed(2),
      totalItemsSorted: prev.totalItemsSorted + 1,
      co2SavedKg: +(prev.co2SavedKg + (addedWeight * 1.68)).toFixed(2),
      drainageTankVolumeL: newDrainVolume,
      drainageTankLevelPct: newDrainPct,
    }));
  };

  const emptyBin = (category: WasteCategory) => {
    const target = bins[category];
    if (!target) return;
    setBins((prev) => ({
      ...prev,
      [category]: {
        ...target,
        currentWeightKg: 0,
        fillPercentage: 0,
        status: 'normal',
        distanceToSensorCm: 48.0,
        lastEmptied: 'Just now',
      },
    }));
  };

  const emptyDrainageTank = () => {
    setTelemetry((prev) => ({
      ...prev,
      drainageTankVolumeL: 0,
      drainageTankLevelPct: 0,
    }));
  };

  const setMachineStatus = (status: SystemTelemetry['machineStatus']) => {
    setTelemetry((prev) => ({ ...prev, machineStatus: status }));
  };

  const setConveyorSpeed = (speed: number) => {
    setTelemetry((prev) => ({ ...prev, conveyorSpeedMps: speed }));
  };

  const setActiveStageIndex = (stage: number) => {
    setTelemetry((prev) => ({ ...prev, activeStageIndex: stage }));
  };

  const resetAllData = () => {
    setBins(INITIAL_BINS);
    setEvents(INITIAL_EVENTS);
    setTelemetry({
      machineStatus: 'running',
      conveyorSpeedMps: 0.85,
      ambientTempC: 22.4,
      opticalCameraFps: 60,
      drainageTankLevelPct: 38,
      drainageTankVolumeL: 19.0,
      maxDrainageCapacityL: 50.0,
      totalWasteProcessedKg: 85.0,
      totalItemsSorted: 344,
      overallAccuracyPct: 99.2,
      co2SavedKg: 142.8,
      activeStageIndex: 0,
    });
    localStorage.removeItem(`${STORAGE_KEY}_bins`);
    localStorage.removeItem(`${STORAGE_KEY}_events`);
    localStorage.removeItem(`${STORAGE_KEY}_telemetry`);
  };

  const exportCsvData = () => {
    const headers = ['Event ID', 'Timestamp', 'Item Name', 'Category', 'Confidence (%)', 'Weight (kg)', 'Liquid Drained (ml)', 'Bin Assigned', 'Sensor Actuator'];
    const rows = events.map((e) => [
      e.id,
      `"${e.timestamp}"`,
      `"${e.itemName}"`,
      `"${e.category}"`,
      e.confidence,
      e.weightKg,
      e.liquidDrainedMl,
      `"${e.binAssigned}"`,
      `"${e.sensorTriggered}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecoreward_sorting_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <WasteContext.Provider
      value={{
        bins,
        telemetry,
        events,
        activeItem,
        setActiveItem,
        processSortedItem,
        emptyBin,
        emptyDrainageTank,
        setMachineStatus,
        setConveyorSpeed,
        setActiveStageIndex,
        resetAllData,
        exportCsvData,
      }}
    >
      {children}
    </WasteContext.Provider>
  );
};

export const useWaste = () => {
  const context = useContext(WasteContext);
  if (!context) throw new Error('useWaste must be used within a WasteProvider');
  return context;
};
