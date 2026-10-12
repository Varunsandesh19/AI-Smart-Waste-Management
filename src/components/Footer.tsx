import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Github, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050d16] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Recycle className="w-4 h-4" />
              </div>
              <span>EcoReward</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              AI-Powered Smart Waste Management & Automated Segregation System. Integrating computer vision, pneumatic sorting, bag handling, and wastewater drainage.
            </p>
            <div className="pt-1">
              <a
                href="https://github.com/Varunsandesh19/AI-Smart-Waste-Management"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase">System Modules</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/detection" className="hover:text-emerald-400 transition-colors">
                  AI Computer Vision Detection
                </Link>
              </li>
              <li>
                <Link to="/simulation" className="hover:text-emerald-400 transition-colors">
                  Automated Segregation Conveyor
                </Link>
              </li>
              <li>
                <Link to="/bins" className="hover:text-emerald-400 transition-colors">
                  Ultrasonic 3D Bin Telemetry
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Operations Command Dashboard
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-emerald-400 transition-colors">
                  Environmental Analytics & Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Engineering & Hardware */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase">Technical Specifications</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/architecture" className="hover:text-emerald-400 transition-colors">
                  Hardware Schematics & Pinouts
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-emerald-400 transition-colors">
                  Bag Gripping & Slitting Unit
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-emerald-400 transition-colors">
                  Liquid Drainage Recovery Tank
                </Link>
              </li>
              <li>
                <Link to="/agile" className="hover:text-emerald-400 transition-colors">
                  Taiga Scrum Methodology
                </Link>
              </li>
              <li>
                <Link to="/agile" className="hover:text-emerald-400 transition-colors">
                  GitHub Actions CI/CD Pipeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="text-white font-semibold text-xs mb-3 tracking-wider uppercase">Standards & Waste Streams</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Wet Waste (Compostable Organics)</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Plastic (Polymers & PET/HDPE)</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>Paper (Cardboard & Clean Fibers)</span>
              </div>
              <div className="flex items-center gap-2 text-red-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Metal (Aluminum & Ferrous Alloys)</span>
              </div>
              <p className="pt-2 text-slate-400 text-[11px] leading-relaxed">
                Compliant with Municipal Solid Waste (MSW) sorting mandates and ISO 14001 environmental management benchmarks.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} EcoReward Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Production Build v2.4</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Landfill Initiative</span>
            <span aria-hidden="true">·</span>
            <span>Dual-Mode Offline/Edge Inference</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
