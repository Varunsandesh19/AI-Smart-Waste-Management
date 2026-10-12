import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  AlertOctagon, 
  StepForward, 
  CheckCircle2, 
  Droplets, 
  Scan, 
  Layers, 
  Cpu, 
  Zap, 
  Sliders, 
  Activity, 
  Radio, 
  Volume2, 
  VolumeX,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWaste } from '../context/WasteContext';
import { WasteCategory, WasteItem } from '../types/waste';
import { getSortingTargetX, SORTING_CATEGORIES, SORTING_TARGETS } from '../utils/sorting';

const DEFAULT_SIM_ITEMS: WasteItem[] = [
  {
    id: 'sim-1',
    name: 'PET Water Bottle (500ml)',
    category: 'Plastic',
    confidence: 99.4,
    weightKg: 0.045,
    hasLiquid: true,
    liquidVolumeMl: 40,
    recyclabilityScore: 94,
    material: 'PET Polymer #1',
    timestamp: '10:00:00 AM',
    status: 'pending',
  },
  {
    id: 'sim-2',
    name: 'Crushed Aluminum Soda Can',
    category: 'Metal',
    confidence: 99.8,
    weightKg: 0.016,
    hasLiquid: true,
    liquidVolumeMl: 15,
    recyclabilityScore: 99,
    material: 'Grade 3004 Aluminum',
    timestamp: '10:00:00 AM',
    status: 'pending',
  },
  {
    id: 'sim-3',
    name: 'Organic Fruit Residue & Peels',
    category: 'Wet Waste',
    confidence: 98.9,
    weightKg: 0.12,
    hasLiquid: true,
    liquidVolumeMl: 25,
    recyclabilityScore: 88,
    material: 'Compostable Botanical Pulp',
    timestamp: '10:00:00 AM',
    status: 'pending',
  },
  {
    id: 'sim-4',
    name: 'Corrugated Shipping Box Flat',
    category: 'Paper',
    confidence: 97.6,
    weightKg: 0.28,
    hasLiquid: false,
    liquidVolumeMl: 0,
    recyclabilityScore: 96,
    material: 'Kraft Cellulose Fiber',
    timestamp: '10:00:00 AM',
    status: 'pending',
  },
];

const STAGES = [
  { id: 0, key: 'inlet', name: 'Inlet Chamber', description: 'Item received via intake chute. Optical proximity beam verifies payload size.' },
  { id: 1, key: 'gripping', name: 'Bag Gripping', description: 'Mechanical pneumatic clamp immobilizes incoming containment bag.' },
  { id: 2, key: 'slitting', name: 'Bag Opening', description: 'Dual rotary tungsten slitters slice open sealed bag casing.' },
  { id: 3, key: 'drainage', name: 'Fluid Drainage', description: 'Perforated drainage grate catches fluids and routes to wastewater recovery tank.' },
  { id: 4, key: 'scanning', name: 'Optical Inspection', description: 'High-speed camera and multispectral illumination capture feature vectors.' },
  { id: 5, key: 'conveyor', name: 'Conveyor Transport', description: 'Variable-speed conveyor transfers dry materials towards sorting array.' },
  { id: 6, key: 'sorting', name: 'Servo Flap Diversion', description: 'Micro-actuated servo flap directs item into target collection bin.' },
  { id: 7, key: 'complete', name: 'Bin Ingestion Complete', description: 'Payload deposited into dedicated stream bin. Telemetry counters updated.' },
];

export const SimulationPage: React.FC = () => {
  const { 
    bins, 
    telemetry, 
    activeItem, 
    setActiveItem, 
    processSortedItem, 
    setMachineStatus 
  } = useWaste();

  const [selectedItem, setSelectedItem] = useState<WasteItem>(activeItem || DEFAULT_SIM_ITEMS[0]);
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isEStopped, setIsEStopped] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [eventLogs, setEventLogs] = useState<string[]>([
    'System ready. Pneumatic pressure nominal at 6.2 bar.',
    'Laser gantry calibrated to 60 FPS.',
  ]);

  // Keep activeItem in sync if passed from detection
  useEffect(() => {
    if (activeItem) {
      setSelectedItem(activeItem);
      setCurrentStage(0);
      setIsRunning(true);
    }
  }, [activeItem]);

  // Main simulation timer tick
  useEffect(() => {
    if (!isRunning || isEStopped) return;

    const baseDelay = 1400 / speedMultiplier;
    const timer = setTimeout(() => {
      if (currentStage < 7) {
        const nextStage = currentStage + 1;
        setCurrentStage(nextStage);

        // Add descriptive log
        const timestamp = new Date().toLocaleTimeString();
        let logMsg = `[${timestamp}] Stage ${nextStage}: ${STAGES[nextStage].name} active.`;

        if (nextStage === 3 && selectedItem.hasLiquid) {
          logMsg += ` Drained ${selectedItem.liquidVolumeMl || 30}ml fluid to wastewater sump.`;
        } else if (nextStage === 4) {
          logMsg += ` AI Classified: ${selectedItem.category} (${selectedItem.confidence}% confidence).`;
        } else if (nextStage === 6) {
          logMsg += ` Actuating FLAP_SERVO for ${selectedItem.category.toUpperCase()}.`;
        } else if (nextStage === 7) {
          logMsg += ` Item deposited in ${selectedItem.category} bin. Sorting cycle finished.`;
          // Ingest to store
          processSortedItem(selectedItem);
          // Trigger celebratory confetti
          try {
            confetti({
              particleCount: 35,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#10B981', '#06B6D4', '#EAB308', '#EF4444'],
            });
          } catch {
            // ignore
          }
          setIsRunning(false);
        }

        setEventLogs((prev) => [logMsg, ...prev.slice(0, 24)]);
      }
    }, baseDelay);

    return () => clearTimeout(timer);
  }, [isRunning, isEStopped, currentStage, speedMultiplier, selectedItem]);

  const handleStart = () => {
    if (isEStopped) return;
    if (currentStage >= 7) {
      setCurrentStage(0);
    }
    setIsRunning(true);
    setMachineStatus('running');
  };

  const handlePause = () => {
    setIsRunning(false);
    setMachineStatus('paused');
  };

  const handleStep = () => {
    if (isEStopped) return;
    setIsRunning(false);
    if (currentStage < 7) {
      const next = currentStage + 1;
      setCurrentStage(next);
      if (next === 7) {
        processSortedItem(selectedItem);
      }
    } else {
      setCurrentStage(0);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStage(0);
    setEventLogs((prev) => [`[${new Date().toLocaleTimeString()}] Simulation sequence reset.`, ...prev]);
  };

  const handleEmergencyStop = () => {
    setIsRunning(false);
    setIsEStopped(true);
    setMachineStatus('emergency_stopped');
    setEventLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ⚠️ EMERGENCY STOP ENGAGED. Safety relays disconnected. Motors halted.`,
      ...prev,
    ]);
  };

  const handleResetEStop = () => {
    setIsEStopped(false);
    setMachineStatus('idle');
    setEventLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Safety interlock cleared. System nominal.`,
      ...prev,
    ]);
  };

  // Calculate coordinates for item animation along the conveyor
  // Conveyor width ~ 800px; 7 visual points
  const getItemPositionX = () => {
    switch (currentStage) {
      case 0: return 50;  // Intake hopper
      case 1: return 140; // Gripper
      case 2: return 230; // Slitter
      case 3: return 320; // Drainage grate
      case 4: return 440; // Camera inspection
      case 5: return 560; // Main conveyor belt
      case 6: return getSortingTargetX(selectedItem.category, 6); // Selected sorting flap
      case 7: return getSortingTargetX(selectedItem.category, 7); // Matching collection bin
      default: return 50;
    }
  };

  const getItemPositionY = () => {
    if (currentStage === 7) return 260; // Drops down into bin
    return 130; // On belt track
  };

  const targetCategoryColor = SORTING_TARGETS[selectedItem.category].color;

  return (
    <div className="min-h-screen bg-[#081421] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-1">
            <span>Automated Segregation Rig</span>
            <span aria-hidden="true">·</span>
            <span>Live Physics Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Smart Sorting Conveyor Simulation
          </h1>
        </div>

        {/* E-Stop and Control Bar */}
        <div className="flex items-center flex-wrap gap-2.5">
          {isEStopped ? (
            <button
              onClick={handleResetEStop}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-all shadow-md shadow-amber-600/30 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Safety Interlock</span>
            </button>
          ) : (
            <button
              onClick={handleEmergencyStop}
              className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-md shadow-red-600/30 flex items-center gap-2 active:scale-95"
              title="Immediate Emergency Motor Shutdown"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>EMERGENCY STOP</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            {isRunning ? (
              <button
                onClick={handlePause}
                disabled={isEStopped}
                className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </button>
            ) : (
              <button
                onClick={handleStart}
                disabled={isEStopped}
                className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start</span>
              </button>
            )}

            <button
              onClick={handleStep}
              disabled={isEStopped}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
              title="Advance one stage"
            >
              <StepForward className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Step</span>
            </button>

            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Reset item position"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-2 py-1 rounded-lg font-mono text-[11px] transition-colors ${
                  speedMultiplier === s ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Stop Alert Banner */}
      {isEStopped && (
        <div className="mb-6 p-4 rounded-2xl bg-red-950/80 border-2 border-red-500 text-white flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <div className="text-sm font-bold">EMERGENCY STOP TRIGGERED (SAFETY INTERLOCK TRIPPED)</div>
              <div className="text-xs text-red-200">
                All 24V stepper motors and servo flap lines have been isolated. Click "Reset Safety Interlock" above to resume.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Machine Cross-Section Canvas */}
      <div className="mb-8 rounded-3xl bg-slate-950/90 border border-slate-800 overflow-hidden relative shadow-2xl">
        {/* Overhead Status Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : isEStopped ? 'bg-red-500' : 'bg-slate-500'}`} />
              Machine: {isEStopped ? 'EMERGENCY STOPPED' : isRunning ? 'RUNNING AUTOMATED CYCLE' : 'STANDBY PAUSED'}
            </span>
            <span aria-hidden="true" className="text-slate-600">|</span>
            <span className="text-slate-400">Current Payload: <strong className="text-white">{selectedItem.name}</strong></span>
          </div>
          <div className="flex items-center gap-3 font-mono-num text-[11px] text-slate-400">
            <span>Air Pressure: 6.2 Bar</span>
            <span aria-hidden="true">·</span>
            <span>Drainage Sump: {telemetry.drainageTankLevelPct}% Full</span>
          </div>
        </div>

        {/* Interactive Physical SVG Rig */}
        <div className="p-4 sm:p-8 flex items-center justify-center overflow-x-auto min-h-[380px]">
          <svg viewBox="0 0 860 360" className="w-full max-w-5xl h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Grid Lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              </pattern>
              <linearGradient id="laserBeam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="860" height="360" fill="url(#grid)" />

            {/* 1. STAGE: Inlet Chamber (X: 20-80) */}
            <g id="stage-inlet">
              <rect x="25" y="40" width="55" height="110" rx="4" fill="#0f2238" stroke="#1e3a5f" strokeWidth="2" />
              <polygon points="20,40 85,40 70,75 35,75" fill="#172c44" stroke="#25466c" />
              <text x="52" y="100" fill="#64748b" fontSize="8" textAnchor="middle" fontWeight="bold">INLET</text>
              <line x1="25" y1="120" x2="80" y2="120" stroke="#10b981" strokeDasharray="2 2" strokeWidth="1.5" opacity={currentStage === 0 ? "1" : "0.3"} />
            </g>

            {/* 2. STAGE: Bag Gripper Delta Arm (X: 110-170) */}
            <g id="stage-gripper">
              <rect x="115" y="25" width="50" height="30" rx="3" fill="#172c44" stroke="#25466c" />
              {/* Gripper arms */}
              <line x1="125" y1="55" x2={currentStage === 1 ? "130" : "120"} y2={currentStage === 1 ? "110" : "80"} stroke="#06b6d4" strokeWidth="3" />
              <line x1="155" y1="55" x2={currentStage === 1 ? "150" : "160"} y2={currentStage === 1 ? "110" : "80"} stroke="#06b6d4" strokeWidth="3" />
              <circle cx="140" cy="40" r="5" fill={currentStage === 1 ? "#06b6d4" : "#475569"} />
              <text x="140" y="20" fill="#64748b" fontSize="8" textAnchor="middle">GRIPPER</text>
            </g>

            {/* 3. STAGE: Rotary Slitter (X: 200-260) */}
            <g id="stage-slitter">
              <rect x="210" y="30" width="40" height="40" rx="4" fill="#172c44" stroke="#25466c" />
              {/* Rotary blade */}
              <circle cx="230" cy="50" r="14" fill="#0b1726" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 3" className={currentStage === 2 ? "animate-spin" : ""} style={{ transformOrigin: "230px 50px" }} />
              <line x1="230" y1="50" x2="230" y2={currentStage === 2 ? "115" : "90"} stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
              <text x="230" y="20" fill="#64748b" fontSize="8" textAnchor="middle">SLITTER</text>
            </g>

            {/* 4. STAGE: Fluid Drainage Grate & Wastewater Tank (X: 290-360) */}
            <g id="stage-drainage">
              {/* Grate */}
              <rect x="295" y="145" width="50" height="10" fill="#0c1b2c" stroke="#334155" strokeWidth="1" />
              <line x1="305" y1="145" x2="305" y2="155" stroke="#64748b" strokeWidth="1" />
              <line x1="315" y1="145" x2="315" y2="155" stroke="#64748b" strokeWidth="1" />
              <line x1="325" y1="145" x2="325" y2="155" stroke="#64748b" strokeWidth="1" />
              <line x1="335" y1="145" x2="335" y2="155" stroke="#64748b" strokeWidth="1" />
              
              {/* Draining drops */}
              {currentStage === 3 && selectedItem.hasLiquid && (
                <g>
                  <circle cx="320" cy="165" r="2.5" fill="#06b6d4" />
                  <circle cx="320" cy="180" r="3" fill="#06b6d4" />
                  <circle cx="320" cy="195" r="2.5" fill="#06b6d4" />
                </g>
              )}

              {/* Sump Pipe */}
              <path d="M 320 155 L 320 220 L 330 220" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />

              {/* Wastewater Tank */}
              <rect x="300" y="225" width="50" height="55" rx="4" fill="#091827" stroke="#06b6d4" strokeWidth="1.5" />
              <rect x="302" y="245" width="46" height="33" rx="2" fill="#06b6d4" fillOpacity="0.4" />
              <text x="325" y="240" fill="#06b6d4" fontSize="7" textAnchor="middle" fontWeight="bold">DRAIN TANK</text>
              <text x="325" y="265" fill="#e2e8f0" fontSize="8" textAnchor="middle" fontFamily="monospace">
                {telemetry.drainageTankLevelPct}%
              </text>
            </g>

            {/* 5. STAGE: Optical AI Camera Dome (X: 410-470) */}
            <g id="stage-camera">
              <rect x="420" y="20" width="40" height="35" rx="4" fill="#172c44" stroke="#25466c" />
              <circle cx="440" cy="40" r="8" fill="#0b1726" stroke="#10b981" strokeWidth="2" />
              <circle cx="440" cy="40" r="3" fill="#10b981" />
              
              {/* Laser Scanning Cone when in Stage 4 */}
              {currentStage === 4 && (
                <polygon points="432,48 448,48 480,145 400,145" fill="url(#laserBeam)" opacity="0.6" />
              )}
              <text x="440" y="15" fill="#10b981" fontSize="8" textAnchor="middle" fontWeight="bold">AI CAMERA</text>
            </g>

            {/* 6. CONVEYOR BELT TRACK (Spans X: 50 to 760, Y: 145) */}
            <g id="conveyor-track">
              {/* Main Belt Bed */}
              <rect x="40" y="145" width="720" height="16" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              {/* Moving tread dashes */}
              <line x1="45" y1="153" x2="755" y2="153" stroke="#475569" strokeWidth="3" strokeDasharray="12 8" className={isRunning && !isEStopped ? "animate-pulse" : ""} />

              {/* Belt Rollers */}
              <circle cx="50" cy="153" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              <circle cx="750" cy="153" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
              {/* Support legs */}
              <rect x="90" y="161" width="8" height="60" fill="#1e293b" />
              <rect x="250" y="161" width="8" height="60" fill="#1e293b" />
              <rect x="420" y="161" width="8" height="60" fill="#1e293b" />
            </g>

            {/* 7. SERVO SORTING FLAPS (Above Bins) */}
            <g id="sorting-flaps">
              {SORTING_CATEGORIES.map((category) => {
                const { flapX, color } = SORTING_TARGETS[category];
                const isActiveFlap = currentStage >= 6 && selectedItem.category === category;

                return (
                  <line
                    key={category}
                    x1={flapX}
                    y1="145"
                    x2={isActiveFlap ? flapX - 15 : flapX}
                    y2={isActiveFlap ? "175" : "130"}
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>

            {/* 8. FOUR COLLECTION BINS (Y: 220-310) */}
            {/* Bin 1: Wet Waste */}
            <g id="bin-wet">
              <rect x="490" y="225" width="55" height="85" rx="5" fill="#06281e" stroke="#10B981" strokeWidth="2" />
              {/* Fill level rect */}
              <rect 
                x="492" 
                y={308 - (bins['Wet Waste'].fillPercentage * 0.78)} 
                width="51" 
                height={bins['Wet Waste'].fillPercentage * 0.78} 
                rx="3" 
                fill="#10B981" 
                fillOpacity="0.4" 
              />
              <text x="517" y="250" fill="#10B981" fontSize="8" textAnchor="middle" fontWeight="bold">WET</text>
              <text x="517" y="275" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="monospace">
                {bins['Wet Waste'].fillPercentage}%
              </text>
              <text x="517" y="295" fill="#94a3b8" fontSize="7" textAnchor="middle">
                {bins['Wet Waste'].currentWeightKg}kg
              </text>
            </g>

            {/* Bin 2: Plastic */}
            <g id="bin-plastic">
              <rect x="560" y="225" width="55" height="85" rx="5" fill="#06242c" stroke="#06B6D4" strokeWidth="2" />
              <rect 
                x="562" 
                y={308 - (bins['Plastic'].fillPercentage * 0.78)} 
                width="51" 
                height={bins['Plastic'].fillPercentage * 0.78} 
                rx="3" 
                fill="#06B6D4" 
                fillOpacity="0.4" 
              />
              <text x="587" y="250" fill="#06B6D4" fontSize="8" textAnchor="middle" fontWeight="bold">PLASTIC</text>
              <text x="587" y="275" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="monospace">
                {bins['Plastic'].fillPercentage}%
              </text>
              <text x="587" y="295" fill="#94a3b8" fontSize="7" textAnchor="middle">
                {bins['Plastic'].currentWeightKg}kg
              </text>
            </g>

            {/* Bin 3: Paper */}
            <g id="bin-paper">
              <rect x="630" y="225" width="55" height="85" rx="5" fill="#2c2707" stroke="#EAB308" strokeWidth="2" />
              <rect 
                x="632" 
                y={308 - (bins['Paper'].fillPercentage * 0.78)} 
                width="51" 
                height={bins['Paper'].fillPercentage * 0.78} 
                rx="3" 
                fill="#EAB308" 
                fillOpacity="0.4" 
              />
              <text x="657" y="250" fill="#EAB308" fontSize="8" textAnchor="middle" fontWeight="bold">PAPER</text>
              <text x="657" y="275" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="monospace">
                {bins['Paper'].fillPercentage}%
              </text>
              <text x="657" y="295" fill="#94a3b8" fontSize="7" textAnchor="middle">
                {bins['Paper'].currentWeightKg}kg
              </text>
            </g>

            {/* Bin 4: Metal */}
            <g id="bin-metal">
              <rect x="700" y="225" width="55" height="85" rx="5" fill="#2c0c0c" stroke="#EF4444" strokeWidth="2" />
              <rect 
                x="702" 
                y={308 - (bins['Metal'].fillPercentage * 0.78)} 
                width="51" 
                height={bins['Metal'].fillPercentage * 0.78} 
                rx="3" 
                fill="#EF4444" 
                fillOpacity="0.4" 
              />
              <text x="727" y="250" fill="#EF4444" fontSize="8" textAnchor="middle" fontWeight="bold">METAL</text>
              <text x="727" y="275" fill="#ffffff" fontSize="9" textAnchor="middle" fontFamily="monospace">
                {bins['Metal'].fillPercentage}%
              </text>
              <text x="727" y="295" fill="#94a3b8" fontSize="7" textAnchor="middle">
                {bins['Metal'].currentWeightKg}kg
              </text>
            </g>

            {/* 9. THE MOVING WASTE ITEM CARRIER */}
            <g 
              id="moving-waste-item" 
              style={{
                transition: `transform ${1.2 / speedMultiplier}s cubic-bezier(0.25, 1, 0.5, 1)`,
                transform: `translate(${(getItemPositionX() / 860) * 100}%, ${(getItemPositionY() / 360) * 100}%)`,
                transformBox: 'view-box',
              }}
            >
              {/* Outer bounding aura */}
              <circle cx="0" cy="0" r="14" fill={targetCategoryColor} fillOpacity="0.25" stroke={targetCategoryColor} strokeWidth="1.5" />
              
              {/* Inner item icon shape */}
              <rect x="-8" y="-8" width="16" height="16" rx="3" fill="#ffffff" />
              
              {/* Item HUD label */}
              <rect x="-35" y="-28" width="70" height="15" rx="3" fill="#091421" stroke="#334155" />
              <text x="0" y="-18" fill="#e2e8f0" fontSize="7" textAnchor="middle" fontWeight="bold">
                {selectedItem.category}
              </text>
            </g>
          </svg>
        </div>

        {/* Current Workflow Stage Card Banner */}
        <div className="p-4 bg-slate-900/70 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
              0{currentStage + 1}
            </div>
            <div>
              <div className="text-xs text-slate-400">Current Phase ({currentStage + 1}/8)</div>
              <div className="text-sm font-bold text-white">{STAGES[currentStage].name}</div>
            </div>
          </div>
          <div className="text-xs text-slate-300 max-w-lg text-center sm:text-right">
            {STAGES[currentStage].description}
          </div>
        </div>
      </div>

      {/* Two Column Control & Event Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Waste Payload Selector */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <h3 className="text-sm font-semibold text-white mb-2">
              Select Waste Payload for Next Cycle
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Choose an item to run through the entire sorting pipeline.
            </p>

            <div className="space-y-2.5">
              {DEFAULT_SIM_ITEMS.map((item) => {
                const isSelected = selectedItem.name === item.name;
                const borderClass = isSelected
                  ? item.category === 'Wet Waste' ? 'border-emerald-500 bg-emerald-500/10' :
                    item.category === 'Plastic' ? 'border-cyan-500 bg-cyan-500/10' :
                    item.category === 'Paper' ? 'border-yellow-500 bg-yellow-500/10' :
                    'border-red-500 bg-red-500/10'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700';

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setCurrentStage(0);
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all ${borderClass} flex items-center justify-between`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Target: <span className="font-medium text-slate-200">{item.category}</span> · {item.material}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <div className="font-mono-num font-semibold text-white">{(item.weightKg * 1000).toFixed(0)}g</div>
                      <div className="text-[10px] text-slate-400">
                        {item.hasLiquid ? `+${item.liquidVolumeMl}ml fluid` : 'Dry'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: High-Precision Event Log Stream */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Microcontroller & PLC Actuation Log</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Modbus RTU / MQTT</span>
            </div>

            <div className="flex-1 bg-slate-950/80 rounded-xl p-4 font-mono text-xs overflow-y-auto max-h-[300px] space-y-2 border border-slate-800">
              {eventLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={`leading-relaxed ${
                    index === 0 ? 'text-emerald-400 font-medium' : 'text-slate-400 text-[11px]'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Telemetry: 115200 baud</span>
              <button 
                onClick={() => setEventLogs(['Log buffer cleared. Ready.'])}
                className="text-[11px] text-slate-400 hover:text-white"
              >
                Clear Log Buffer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
