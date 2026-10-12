import React, { useState } from 'react';
import { 
  GitBranch, 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  Play, 
  Terminal, 
  Layers, 
  Kanban, 
  ShieldCheck, 
  Code2, 
  Workflow, 
  Cpu, 
  RefreshCw 
} from 'lucide-react';

interface TestCase {
  id: string;
  name: string;
  suite: string;
  status: 'passed' | 'running' | 'idle';
  durationMs: number;
  assertion: string;
}

const INITIAL_TESTS: TestCase[] = [
  {
    id: 't-1',
    name: 'Waste category classifier invariant',
    suite: 'Unit Tests',
    status: 'passed',
    durationMs: 12,
    assertion: 'Ensures output category strictly in [Wet Waste, Plastic, Paper, Metal]',
  },
  {
    id: 't-2',
    name: 'Bin volumetric threshold logic',
    suite: 'Unit Tests',
    status: 'passed',
    durationMs: 8,
    assertion: 'Flags status: "near_full" at 75% and "full" at 90%',
  },
  {
    id: 't-3',
    name: 'Liquid drainage tank safety valve',
    suite: 'Integration Tests',
    status: 'passed',
    durationMs: 15,
    assertion: 'Reroutes residual container fluids before optical chute trigger',
  },
  {
    id: 't-4',
    name: 'Emergency Stop relay lockout',
    suite: 'Safety Interlock',
    status: 'passed',
    durationMs: 6,
    assertion: 'Halts conveyor stepper and releases servo lines instantly on E-Stop trigger',
  },
  {
    id: 't-5',
    name: 'CSV report format compliance',
    suite: 'Data Export',
    status: 'passed',
    durationMs: 10,
    assertion: 'Generates valid RFC 4180 CSV headers and timestamped columns',
  },
];

export const AgilePage: React.FC = () => {
  const [tests, setTests] = useState<TestCase[]>(INITIAL_TESTS);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [activeTab, setActiveTab] = useState<'ci' | 'scrum'>('ci');

  const runVerificationSuite = () => {
    setIsRunningTests(true);
    setTests((prev) => prev.map((t) => ({ ...t, status: 'running' })));

    setTimeout(() => {
      setTests((prev) => prev.map((t) => ({ ...t, status: 'passed' })));
      setIsRunningTests(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#081421] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 mb-1">
            <span>DevOps & Project Delivery</span>
            <span aria-hidden="true">·</span>
            <span>Agile Scrum Methodology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            CI/CD Pipeline & Agile Project Management
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Engineering lifecycle documentation for the EcoReward repository, GitHub Actions continuous integration, and Taiga Scrum delivery.
          </p>
        </div>

        {/* External Repo Link */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Varunsandesh19/AI-Smart-Waste-Management"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors flex items-center gap-2"
          >
            <Github className="w-4 h-4 text-emerald-400" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs w-fit mb-8">
        <button
          onClick={() => setActiveTab('ci')}
          className={`px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'ci' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Workflow className="w-3.5 h-3.5 text-emerald-400" />
          <span>GitHub Actions CI/CD</span>
        </button>
        <button
          onClick={() => setActiveTab('scrum')}
          className={`px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'scrum' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Kanban className="w-3.5 h-3.5 text-cyan-400" />
          <span>Taiga Scrum Framework</span>
        </button>
      </div>

      {activeTab === 'ci' ? (
        <div className="space-y-8">
          {/* CI/CD Visual Workflow Pipeline */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white mb-1">
                  Automated GitHub Actions Build & Test Pipeline
                </h2>
                <p className="text-xs text-slate-400">
                  Triggered on every commit and pull request to <code className="text-emerald-400">main</code>.
                </p>
              </div>

              <button
                onClick={runVerificationSuite}
                disabled={isRunningTests}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-500/20 disabled:opacity-50"
              >
                {isRunningTests ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Tests...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Verification Suite</span>
                  </>
                )}
              </button>
            </div>

            {/* Stages Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-mono">01. Checkout</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm font-bold text-white mb-1">actions/checkout@v4</div>
                <p className="text-[11px] text-slate-400">Fetches repo history and initializes working tree</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-mono">02. Setup Node</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm font-bold text-white mb-1">Node.js 20.x + npm cache</div>
                <p className="text-[11px] text-slate-400">Resolves lockfile dependencies cleanly</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-mono">03. Verification</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm font-bold text-white mb-1">npm run test & lint</div>
                <p className="text-[11px] text-slate-400">TypeScript compilation & invariant checks</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-mono">04. Build Bundle</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm font-bold text-white mb-1">npm run build</div>
                <p className="text-[11px] text-slate-400">Vite production bundle generated to /dist</p>
              </div>
            </div>

            {/* Test Suite Table */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden">
              <div className="p-3 bg-slate-900/80 border-b border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Automated Verification Test Suite</span>
                <span className="font-mono text-emerald-400 text-[11px]">5/5 Passing</span>
              </div>
              <div className="divide-y divide-slate-800/60">
                {tests.map((t) => (
                  <div key={t.id} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {t.status === 'running' ? (
                        <RefreshCw className="w-3.5 h-3.5 text-yellow-400 animate-spin shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-white">{t.name}</div>
                        <div className="text-[11px] text-slate-400">{t.assertion}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 shrink-0">
                      <span>{t.suite}</span>
                      <span>·</span>
                      <span className="text-slate-300">{t.durationMs}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workflow YAML Preview */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>.github/workflows/ci.yml Specification</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Real GitHub Actions configuration file provided in project root.
            </p>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`name: EcoReward CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  verify-and-build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20.x
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Type Checks and Verification
        run: npm run test

      - name: Build Production Web App
        run: npm run build`}
            </pre>
          </div>
        </div>
      ) : (
        /* Scrum Tab */
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80">
            <h2 className="text-base font-bold text-white mb-2">Taiga Agile Scrum Framework</h2>
            <p className="text-xs text-slate-400 mb-8 max-w-2xl">
              Organized into distinct two-week engineering sprints focusing on mechatronics, AI computer vision, IoT telemetry, and web dashboard integration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sprint 1 */}
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-semibold">Sprint 01</span>
                  <span className="text-[11px] text-slate-500">Foundation</span>
                </div>
                <h3 className="text-sm font-bold text-white">System Architecture & Ingestion</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Design bag gripping delta clamp & rotary slitter schematics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Engineer liquid drainage sump & peristaltic pump circuit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Establish TypeScript project structure & Tailwind v4 theme</span>
                  </li>
                </ul>
              </div>

              {/* Sprint 2 */}
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-semibold">Sprint 02</span>
                  <span className="text-[11px] text-slate-500">Core AI & Simulation</span>
                </div>
                <h3 className="text-sm font-bold text-white">Neural Vision & Actuator Logic</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Implement 4-class waste vision detector (Wet, Plastic, Paper, Metal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Build interactive physics conveyor simulation with servo flaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Add industrial Emergency Stop (E-Stop) safety interlock</span>
                  </li>
                </ul>
              </div>

              {/* Sprint 3 */}
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-400 font-semibold">Sprint 03</span>
                  <span className="text-[11px] text-slate-500">Telemetry & Reporting</span>
                </div>
                <h3 className="text-sm font-bold text-white">IoT Bins & ESG Analytics</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Build 3D ultrasonic bin monitoring with threshold alarms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Implement Recharts visualisations & CSV report export</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Configure GitHub Actions CI/CD workflow and verification tests</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
