export type WasteCategory = 'Wet Waste' | 'Plastic' | 'Paper' | 'Metal';

export interface WasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  confidence: number;
  weightKg: number;
  hasLiquid: boolean;
  liquidVolumeMl?: number;
  recyclabilityScore: number;
  material: string;
  timestamp: string;
  imageUrl?: string;
  status: 'pending' | 'in_chamber' | 'gripping' | 'draining' | 'scanning' | 'conveyor' | 'sorted' | 'rejected';
}

export interface BinStatus {
  id: WasteCategory;
  name: string;
  category: WasteCategory;
  color: string;
  colorHex: string;
  accentBg: string;
  fillPercentage: number;
  currentWeightKg: number;
  maxCapacityKg: number;
  totalItemsCount: number;
  distanceToSensorCm: number;
  lastEmptied: string;
  status: 'normal' | 'near_full' | 'full';
  weeklyTrend: number[];
}

export interface SortingEvent {
  id: string;
  timestamp: string;
  itemName: string;
  category: WasteCategory;
  confidence: number;
  weightKg: number;
  liquidDrainedMl: number;
  binAssigned: WasteCategory;
  sensorTriggered: string;
  durationMs: number;
}

export interface SystemTelemetry {
  machineStatus: 'idle' | 'running' | 'paused' | 'emergency_stopped';
  conveyorSpeedMps: number;
  ambientTempC: number;
  opticalCameraFps: number;
  drainageTankLevelPct: number;
  drainageTankVolumeL: number;
  maxDrainageCapacityL: number;
  totalWasteProcessedKg: number;
  totalItemsSorted: number;
  overallAccuracyPct: number;
  co2SavedKg: number;
  activeStageIndex: number;
}
