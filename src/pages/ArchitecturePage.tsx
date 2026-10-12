import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Scan, 
  Droplets, 
  Zap, 
  Trash2, 
  Radio, 
  Server, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { ASSETS } from '../assets/images';

interface HardwareComponent {
  id: string;
  name: string;
  category: 'Compute & Controller' | 'Sensors' | 'Actuators & Motors' | 'Fluidics & Mechanics';
  model: string;
  voltage: string;
  interfaceProtocol: string;
  role: string;
  specs: string[];
}

const HARDWARE_COMPONENTS: HardwareComponent[] = [
  {
    id: 'hw-1',
    name: 'Edge AI SBC Controller',
    category: 'Compute & Controller',
    model: 'Raspberry Pi 5 (8GB) / ESP32-WROOM-32D',
    voltage: '5V DC / 3.3V DC',
    interfaceProtocol: 'GPIO, I2C, SPI, UART, Wi-Fi 802.11ac',
    role: 'Central orchestrator running Edge AI model inference, Modbus PLC commands, and MQTT telemetry uplink.',
    specs: ['Broadcom BCM2712 Quad-core Cortex-A76 @ 2.4GHz', 'PCIe 2.0 interface for NPU accelerator card', 'Dual-band Wi-Fi & Bluetooth 5.0 BLE'],
  },
  {
    id: 'hw-2',
    name: 'Multispectral Camera Module',
    category: 'Sensors',
    model: 'Sony IMX477 12.3MP High Quality Camera',
    voltage: '3.3V DC via MIPI-CSI',
    interfaceProtocol: 'MIPI CSI-2 2-lane / OpenCV V4L2',
    role: 'Captures top-down optical frames of items passing beneath the camera dome at up to 60 FPS.',
    specs: ['12.3 Megapixel 1/2.3" CMOS sensor (4056 × 3040)', 'C/CS Mount 6mm wide-angle lens with manual focus', 'Infrared cut filter with ring LED auxiliary illumination'],
  },
  {
    id: 'hw-3',
    name: 'Ultrasonic Depth Sensor Array',
    category: 'Sensors',
    model: 'HC-SR04+ Ultrasonic Transducer (x4)',
    voltage: '3.3V / 5V DC',
    interfaceProtocol: 'Digital Trigger / Echo Pulse Width Timing',
    role: 'Measures continuous distance from bin lid to top of waste pile (2cm – 400cm range) to calculate volumetric percentage.',
    specs: ['Working Frequency: 40 kHz', 'Measuring Angle: 15 degrees cone', 'Resolution: 0.3 cm with temperature compensation'],
  },
  {
    id: 'hw-4',
    name: 'High-Torque Servo Flap Actuators',
    category: 'Actuators & Motors',
    model: 'TowerPro MG996R Metal Gear Servos (x4)',
    voltage: '4.8V – 7.2V DC (External BEC)',
    interfaceProtocol: 'PWM 50Hz (500µs – 2500µs pulse)',
    role: 'Pivots sorting deflectors across a 90° arc in under 80ms to steer moving waste payloads into target collection bins.',
    specs: ['Stall Torque: 11 kg·cm at 6.0V', 'Metal gearing with dual ball-bearing output shaft', 'Operating Speed: 0.17 sec/60°'],
  },
  {
    id: 'hw-5',
    name: 'Conveyor Drive Stepper Motor',
    category: 'Actuators & Motors',
    model: 'NEMA 23 High Torque Stepper + TB6600 Driver',
    voltage: '24V DC / 3.0A Phase Current',
    interfaceProtocol: 'Step / Direction / Enable Digital Pins',
    role: 'Drives neoprene conveyor belt smoothly at variable speeds (0.2 m/s to 1.5 m/s) with microstepping accuracy.',
    specs: ['Holding Torque: 1.9 N·m (269 oz·in)', '1.8° step angle (200 steps/rev, 16x microstep capable)', 'Low vibration timing belt pulley linkage (HTD-3M)'],
  },
  {
    id: 'hw-6',
    name: 'Rotary Slitter & Bag Clamp Mechanism',
    category: 'Fluidics & Mechanics',
    model: 'Bespoke Dual-Clamp Delta Gripper + 12V Cutter',
    voltage: '12V DC Solenoid / Rotary Motor',
    interfaceProtocol: 'Relay Module Controlled Optoisolated IO',
    role: 'Immobilizes incoming plastic waste bags and slices them open longitudinally to release trapped recyclables and liquids.',
    specs: ['Tungsten carbide circular rotating slitter blade', 'Pneumatic suction cups with vacuum ejector', 'Safety interlock limit switch prevents blade activation if unsealed'],
  },
  {
    id: 'hw-7',
    name: 'Wastewater Drainage Sump & Pump',
    category: 'Fluidics & Mechanics',
    model: '12V Peristaltic Diaphragm Pump + Liquid Float Sensor',
    voltage: '12V DC / 1.5A',
    interfaceProtocol: 'Analog Float Switch + MOSFET Low-Side Driver',
    role: 'Draws gravity-separated liquids through perforated bed into 50L containment vessel, evacuating on high-float trigger.',
    specs: ['Max Flow Rate: 3.5 Liters/min', 'Self-priming up to 1.5 meters suction head', 'Food-grade silicone tubing with check valves'],
  },
];

export const ArchitecturePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'hardware' | 'software'>('workflow');
  const [selectedHw, setSelectedHw] = useState<HardwareComponent>(HARDWARE_COMPONENTS[0]);

  return (
    <div className="min-h-screen bg-[#081421] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-1">
            <span>Engineering Blueprint</span>
            <span aria-hidden="true">·</span>
            <span>Mechatronics & Software Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            System Architecture & Hardware Schematics
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Comprehensive mechanical, electrical, and algorithmic breakdown of the EcoReward automated sorting station.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'workflow' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Workflow Stages
          </button>
          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'hardware' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hardware Components
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'software' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
            }`}
          >
            Software Pipeline
          </button>
        </div>
      </div>

      {/* Notice Banner: Clearly stating hardware status */}
      <div className="mb-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong>Engineering Implementation Notice:</strong> The hardware designs, component pinouts, and electrical schematics detailed on this page represent the proposed physical system specification. The web application provides the real-time simulation, control dashboard, AI inference engine, and telemetry visualization.
        </div>
      </div>

      {/* 1. Workflow Tab */}
      {activeTab === 'workflow' && (
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80">
            <h2 className="text-lg font-bold text-white mb-2">End-to-End Sorting Pipeline</h2>
            <p className="text-xs text-slate-400 mb-8 max-w-2xl">
              From the moment a municipal waste bag or loose recyclable enters the intake hopper, each mechanical and optical stage operates in closed-loop synchronization.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  name: 'Waste Insertion',
                  desc: 'User or collection hopper deposits waste. Optical presence beam detects object entry and engages safety door interlock.',
                  tech: 'Infrared Proximity Beam · Solenoid Lock',
                },
                {
                  step: '02',
                  name: 'Bag Gripping & Handling',
                  desc: 'Overhead mechanical gripper clamps bag neck. Minimizes human contact with hazardous or bio-contaminated municipal waste.',
                  tech: 'Pneumatic Delta Clamp · Load Cell',
                },
                {
                  step: '03',
                  name: 'Bag Opening & Slitting',
                  desc: 'Motorized dual rotary slitters slice open polymer bag walls without shattering glass or rupturing pressurized aerosol cans.',
                  tech: '12V Rotary Blade · Current Limiter',
                },
                {
                  step: '04',
                  name: 'Liquid Drainage',
                  desc: 'Residual liquids drop through perforated stainless steel grate into sealed sump tank, keeping dry paper clean.',
                  tech: 'Drainage Grate · Peristaltic Pump',
                },
                {
                  step: '05',
                  name: 'Camera Optical Detection',
                  desc: 'Sony IMX477 sensor captures multispectral frame under structured LED lighting. Frame is fed into edge model.',
                  tech: '12.3MP Sensor · Ring LED Auxiliary',
                },
                {
                  step: '06',
                  name: 'AI Model Inference',
                  desc: 'Deep convolutional model classifies object into Wet Waste, Plastic, Paper, or Metal within 400ms.',
                  tech: 'YOLOv8 Edge / Gemini Multimodal',
                },
                {
                  step: '07',
                  name: 'Conveyor Transport',
                  desc: 'NEMA 23 stepper transfers sorted object at calibrated velocity towards the 4-bin flap array.',
                  tech: 'Variable Stepper · Rotary Encoder',
                },
                {
                  step: '08',
                  name: 'Servo Flap Diversion',
                  desc: 'Target servo flap opens at 45° angle. Object drops into dedicated collection container. Bin weight increments.',
                  tech: 'MG996R Servos · HC-SR04 Ultrasonic',
                },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono text-emerald-400 font-bold">{item.step}</span>
                      <span className="text-[11px] text-slate-500 font-mono">Stage {item.step}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{item.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-300">
                    {item.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Hardware Components Tab */}
      {activeTab === 'hardware' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Component List */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-semibold text-white mb-2">Proposed Bill of Materials (BOM)</h2>
            {HARDWARE_COMPONENTS.map((hw) => (
              <button
                key={hw.id}
                onClick={() => setSelectedHw(hw)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedHw.id === hw.id
                    ? 'border-emerald-400 bg-emerald-500/10'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400 text-[11px]">{hw.category}</span>
                  <span className="font-mono text-emerald-400 text-[10px]">{hw.voltage}</span>
                </div>
                <div className="text-sm font-bold text-white">{hw.name}</div>
                <div className="text-xs text-slate-400 mt-1 truncate">{hw.model}</div>
              </button>
            ))}
          </div>

          {/* Component Detail Card */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 sticky top-24 space-y-6">
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  {selectedHw.category}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedHw.name}</h3>
                <div className="text-sm text-slate-300 font-mono mb-4">{selectedHw.model}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{selectedHw.role}</p>
              </div>

              {/* Technical Specifications */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                  <span className="text-slate-500">Operating Voltage:</span>
                  <span className="font-mono text-white">{selectedHw.voltage}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                  <span className="text-slate-500">Data Bus / Protocol:</span>
                  <span className="font-mono text-white">{selectedHw.interfaceProtocol}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Key Features & Metrics</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedHw.specs.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Software Pipeline Tab */}
      {activeTab === 'software' && (
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80">
            <h2 className="text-lg font-bold text-white mb-2">Software & Algorithmic Stack</h2>
            <p className="text-xs text-slate-400 mb-8 max-w-2xl">
              Decoupled edge-to-cloud architecture balancing low-latency physical actuation with high-fidelity analytics and remote telemetry.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Scan className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">1. Computer Vision Ingestion</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  OpenCV pipeline pre-processes 1080p frames: background subtraction on conveyor belt, color normalization, contrast enhancement, and bounding-box cropping around incoming waste items.
                </p>
                <div className="text-[11px] font-mono text-slate-500">OpenCV 4.8 · Python · V4L2</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">2. Dual-Engine Neural Inference</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Ultra-fast edge model classifies items into four categories in &lt;50ms. When network connectivity is active, Gemini 3.8 Flash multimodal API conducts material degradation and recyclability analysis.
                </p>
                <div className="text-[11px] font-mono text-slate-500">TensorFlow Lite · Gemini 3.8 Flash</div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-4">
                  <Server className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">3. React Telemetry & Control UI</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Industrial UI delivers sub-second state feedback, live simulation physics, bin fill levels, CSV reports, and emergency controls for plant operators.
                </p>
                <div className="text-[11px] font-mono text-slate-500">React 19 · TypeScript · Tailwind v4</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
