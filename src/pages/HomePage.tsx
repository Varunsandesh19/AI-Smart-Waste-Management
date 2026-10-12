import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Scan, 
  Droplets, 
  Cpu, 
  Gauge, 
  CheckCircle2, 
  ChevronDown, 
  Play, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Recycle, 
  Trash2,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { ASSETS } from '../assets/images';
import { useWaste } from '../context/WasteContext';

export const HomePage: React.FC = () => {
  const { telemetry, bins } = useWaste();

  const scrollToCapabilities = () => {
    const el = document.getElementById('capabilities');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#081421] text-slate-100">
      {/* 1. Cinematic Hero Section */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background photo with dark scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroFacility}
            alt="EcoReward Automated Smart Waste Management Facility"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Measured multi-stop gradient scrim to guarantee WCAG AA contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081421] via-[#081421]/80 to-[#081421]/50" />
          <div className="absolute inset-0 bg-radial at-center from-transparent via-[#081421]/60 to-[#081421]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Unboxed natural category lead-in (no pills) */}
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-6 tracking-wide uppercase">
            <span>Next-Generation Environmental Robotics</span>
            <span aria-hidden="true">·</span>
            <span>Automated Municipal Sorting</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl text-balance leading-tight sm:leading-none mb-6">
            Revolutionizing Waste Management with Artificial Intelligence
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl text-balance leading-relaxed mb-10">
            A unified robotic sorting architecture combining bag handling, liquid drainage recovery, multispectral computer vision, and pneumatic diversion across four distinct waste streams.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
            <button
              onClick={scrollToCapabilities}
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl transition-all shadow-sm hover:border-slate-500 whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
            >
              <span>Explore Smart System</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <Link
              to="/simulation"
              className="w-full sm:w-auto px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/25 whitespace-nowrap shrink-0 flex items-center justify-center gap-2 font-medium"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Demo</span>
            </Link>
          </div>

          {/* Floating Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left">
              <div className="text-xs text-slate-400 mb-1">Sorting Accuracy</div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono-num">
                {telemetry.overallAccuracyPct}%
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <span>Verified Optical Precision</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left">
              <div className="text-xs text-slate-400 mb-1">Waste Streams</div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono-num">
                4 Streams
              </div>
              <div className="text-[11px] text-cyan-400 mt-1">
                Wet · Plastic · Paper · Metal
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left">
              <div className="text-xs text-slate-400 mb-1">Inference Latency</div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono-num">
                &lt; 400ms
              </div>
              <div className="text-[11px] text-emerald-400 mt-1">
                Edge Camera Acceleration
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md text-left">
              <div className="text-xs text-slate-400 mb-1">Total Sorted</div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono-num">
                {telemetry.totalItemsSorted}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Items Logged In System
              </div>
            </div>
          </div>
        </div>

        {/* Animated scroll down indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-slate-400 text-xs">
          <span className="mb-1 text-[11px] tracking-widest uppercase">Scroll Down</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
        </div>
      </section>

      {/* 2. Interactive Workflow Pipeline Section */}
      <section id="capabilities" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
            Automated Segregation Workflow
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 text-balance">
            Seven Engineered Stages from Insertion to Pure Stream Collection
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Eliminating human contact with contaminated waste while preserving recyclable integrity and recovering wastewater before mechanical sorting.
          </p>
        </div>

        {/* Process Steps Chain */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-16">
          {[
            { step: '01', title: 'Waste Insertion', desc: 'Inlet hopper with optical proximity sensor', icon: Trash2, color: 'text-slate-300' },
            { step: '02', title: 'Bag Gripping', desc: 'Mechanical delta clamp immobilizes sealed bag', icon: Zap, color: 'text-emerald-400' },
            { step: '03', title: 'Bag Opening', desc: 'Dual rotary slitters perforate casing safely', icon: Layers, color: 'text-emerald-400' },
            { step: '04', title: 'Liquid Drainage', desc: 'Sump grate drains liquids to collection tank', icon: Droplets, color: 'text-cyan-400' },
            { step: '05', title: 'Camera Detection', desc: 'High-speed camera captures 4K spectral frame', icon: Scan, color: 'text-yellow-400' },
            { step: '06', title: 'AI Classification', desc: 'Edge neural model assigns stream & confidence', icon: Cpu, color: 'text-yellow-400' },
            { step: '07', title: 'Pneumatic Sorting', desc: 'High-torque servo flaps route to correct bin', icon: Recycle, color: 'text-red-400' },
          ].map((item, idx) => (
            <div 
              key={item.step} 
              className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-mono text-slate-500 font-semibold">{item.step}</span>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Bento Grid Showcase with Photography */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Item 1: High-Speed Robotic Sorter */}
          <div className="md:col-span-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden flex flex-col justify-between group">
            <div className="p-6 sm:p-8">
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">
                Pneumatic & Servo Flaps
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Precision Sorting Actuation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Dual MG996R continuous servos coordinate with pressurized air assist to divert materials in under 80 milliseconds. Contamination is systematically prevented by dedicated flap angle geometry.
              </p>
            </div>
            <div className="relative h-64 sm:h-72 overflow-hidden border-t border-slate-800/60">
              <img
                src={ASSETS.roboticSorter}
                alt="Robotic delta sorting gripper inspecting waste on conveyor"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Bento Item 2: Liquid Drainage Tank */}
          <div className="md:col-span-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden flex flex-col justify-between group">
            <div className="p-6 sm:p-8">
              <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
                Sanitary Liquid Drainage
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Wastewater Recovery Unit
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prevents liquid residue from soiling paper and cardboard. Residual juices, sodas, and rainwater are routed to a sealed 50L holding tank equipped with level monitoring and automatic peristaltic evacuation.
              </p>
            </div>
            <div className="relative h-64 sm:h-72 overflow-hidden border-t border-slate-800/60">
              <img
                src={ASSETS.wastewaterModule}
                alt="Wastewater drainage collection mechanism with level instrumentation"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Bento Item 3: 4-Compartment Smart Hub */}
          <div className="md:col-span-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden flex flex-col justify-between group">
            <div className="relative h-64 sm:h-72 overflow-hidden border-b border-slate-800/60">
              <img
                src={ASSETS.iotBinsStation}
                alt="Futuristic four-compartment smart waste recycling station"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-transparent" />
            </div>
            <div className="p-6 sm:p-8">
              <div className="text-xs text-yellow-400 font-semibold uppercase tracking-wider mb-2">
                Connected Urban Infrastructure
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                IoT Ultrasonic Bin Telemetry
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ultrasonic sensors map real-time volumetric capacity every 3 seconds. Cloud telemetry notifies municipal collection fleets prior to critical 90% overflow thresholds.
              </p>
            </div>
          </div>

          {/* Bento Item 4: AI Computer Vision Engine */}
          <div className="md:col-span-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">
                Multispectral Optical Analysis
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Gemini & Edge Vision Classification
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Our hybrid inference stack classifies items into Wet Waste, Plastic, Paper, or Metal within 400ms. It calculates recyclability scores, flags moisture contamination, and verifies polymer resin types before mechanical sorting.
              </p>

              {/* Sample class cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mb-2" />
                  <div className="text-xs font-bold text-white">Wet Waste</div>
                  <div className="text-[11px] text-emerald-400">Compost & Organics</div>
                </div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-left">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mb-2" />
                  <div className="text-xs font-bold text-white">Plastic</div>
                  <div className="text-[11px] text-cyan-400">PET, HDPE, Films</div>
                </div>
                <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-left">
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 mb-2" />
                  <div className="text-xs font-bold text-white">Paper</div>
                  <div className="text-[11px] text-yellow-400">Cardboard & Kraft</div>
                </div>
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-left">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400 mb-2" />
                  <div className="text-xs font-bold text-white">Metal</div>
                  <div className="text-[11px] text-red-400">Aluminum & Cans</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">Test live images directly with our camera tool</span>
              <Link
                to="/detection"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Open AI Detector</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sustainability Impact Metrics Section */}
      <section className="py-20 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">
                Quantitative Climate Impact
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Measuring Every Gram of Diverted Material
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Clean source segregation directly reduces methane release from anaerobic landfill decomposition. Recycled aluminum consumes 95% less energy than virgin bauxite smelting.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero cross-contamination between organic sludge and clean cardboard</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated fluid recovery reduces downstream odor and pests</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent CSV export for ISO 14001 corporate sustainability reporting</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-400 mb-1">CO₂ Emissions Averted</div>
                <div className="text-3xl font-bold text-white font-mono-num">
                  {telemetry.co2SavedKg} kg
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Calculated against baseline open municipal landfill metrics.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Droplets className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-400 mb-1">Liquid Drained</div>
                <div className="text-3xl font-bold text-white font-mono-num">
                  {telemetry.drainageTankVolumeL} L
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Diverted safely to sealed sump tank before sorting.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-4">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-400 mb-1">Total Mass Diverted</div>
                <div className="text-3xl font-bold text-white font-mono-num">
                  {telemetry.totalWasteProcessedKg} kg
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Processed across all four collection bins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Live Simulation CTA Decision Block */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#081421] border border-emerald-500/30 glow-emerald max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Real-Time Virtual Testbed</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 text-balance">
            Watch the Complete Waste Sorting Machine in Action
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Experience our animated physical sorting simulation with bag slitting, liquid drainage, conveyor transport, and servo flaps directing items to their matching bins.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/simulation"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/30 whitespace-nowrap"
            >
              Start Automated Simulation
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors whitespace-nowrap"
            >
              Open Operations Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
