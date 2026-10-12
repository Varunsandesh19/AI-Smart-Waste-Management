import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WasteProvider } from './context/WasteContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { DetectionPage } from './pages/DetectionPage';
import { SimulationPage } from './pages/SimulationPage';
import { BinMonitoringPage } from './pages/BinMonitoringPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AgilePage } from './pages/AgilePage';

export default function App() {
  return (
    <WasteProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#081421] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/detection" element={<DetectionPage />} />
              <Route path="/simulation" element={<SimulationPage />} />
              <Route path="/bins" element={<BinMonitoringPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/agile" element={<AgilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </WasteProvider>
  );
}
