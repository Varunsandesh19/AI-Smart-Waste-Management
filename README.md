# EcoReward — AI-Powered Smart Waste Management & Automated Segregation System

[![CI/CD Pipeline](https://github.com/Varunsandesh19/AI-Smart-Waste-Management/actions/workflows/ci.yml/badge.svg)](https://github.com/Varunsandesh19/AI-Smart-Waste-Management/actions)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)](https://tailwindcss.com/)

**EcoReward** is an enterprise-grade AI-powered smart waste management platform and automated segregation system. It integrates computer vision detection, automated waste bag handling, liquid drainage recovery, ultrasonic IoT bin monitoring, and environmental ESG analytics into a single closed-loop ecosystem.

---

## 🌟 Key Features

1. **Cinematic Hero & Landing Experience**
   - High-fidelity industrial robotics imagery with deep navy `#081421` aesthetic.
   - Comprehensive workflow showcase across seven physical segregation stages.
   - Real-time impact indicators (CO₂ offset, landfill diversion, liquid recovered).

2. **Operations Command Dashboard**
   - Live stream telemetry: Total waste processed, item counts, camera FPS, and conveyor velocity.
   - Four waste stream cards: **Wet Waste** (Green), **Plastic** (Blue), **Paper** (Yellow), and **Metal** (Red).
   - Recharts visualisations: Daily segregated mass trends and stream composition donut chart.
   - Live sorting event table with client-side search and category filtering.

3. **AI Optical Waste Detection**
   - Drag-and-drop image upload and webcam snapshot capture.
   - File format validation (JPEG, PNG, WebP) and size limit checks (≤ 10MB).
   - Dual-engine inference: Server-side Gemini 3.8 Flash multimodal API with seamless local heuristic classification fallback.
   - Detailed result panel: Material analysis, recyclability score (0-100), contamination risk, fluid volume, and direct "Send to Conveyor" trigger.

4. **Animated Waste Segregation Simulation**
   - Interactive physical machine cross-section:
     - Intake chamber with optical presence beam
     - Bag gripping delta clamp
     - Rotary tungsten slitters
     - Perforated liquid drainage grate & transparent wastewater sump tank
     - Optical AI camera dome with animated laser scanning beam
     - Motorized variable-speed conveyor belt (0.5x, 1x, 2x)
     - Four servo-actuated sorting flaps
     - Four color-coded collection bins with real-time fill level increments
   - Industrial **Emergency Stop (E-Stop)** with safety interlock trip and reset workflow.

5. **3D Ultrasonic Bin Monitoring**
   - Four individual 3D-styled bin cards with animated fluid/solid fill levels.
   - Ultrasonic distance readout (`cm to sensor`), current weight (`kg`), and last emptied timestamp.
   - Threshold warnings: Normal (<75%), Near Full (≥75%), and Full (≥90%).
   - "Empty Bin" and "Flush Drainage Tank" actions with persistent local storage.

6. **Environmental Analytics & Reporting**
   - 7-day, 30-day, and all-time telemetry filters.
   - Diurnal waste intake profile (peak hours distribution).
   - Equivalency calculators: Urban trees preserved and landfill airspace saved (m³).
   - Real **CSV Report Download** generating RFC 4180 formatted sorting audit logs.

7. **System Architecture & Schematics**
   - Complete technical Bill of Materials (BOM): Raspberry Pi 5 / ESP32, Sony IMX477 camera, HC-SR04 ultrasonic sensors, TowerPro MG996R servos, NEMA 23 stepper, and peristaltic drainage pump.
   - Software stack explanation: OpenCV preprocessing, Edge inference, Modbus RTU / MQTT telemetry, and React 19 UI.

8. **Agile Scrum & CI/CD**
   - Taiga Scrum sprint breakdown.
   - GitHub Actions automated verification and build workflow.
   - Interactive in-app test suite verification runner.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide React, Recharts, Motion, Canvas Confetti.
- **Backend / Proxy:** Node.js Express, `@google/genai` TypeScript SDK (Gemini 3.8 Flash).
- **State Management:** React Context API with LocalStorage persistence.
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`).

---

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x through 25.x (Render uses Node.js 22.16.0)
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Varunsandesh19/AI-Smart-Waste-Management.git
cd AI-Smart-Waste-Management

# Install dependencies
npm install
```

### Environment Variables (Optional)

Create a `.env` file in the project root:

```env
# Optional Gemini API Key for online multimodal AI vision detection
GEMINI_API_KEY="your-gemini-api-key"
PORT=3000
```
*(If no API key is provided, the application automatically uses its built-in optical simulation engine).*

### Development

To start the local development server with Express backend and Vite frontend:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Testing

Run type checking and automated verification tests:

```bash
npm run test
```

### Production Build

Compile the application for production:

```bash
npm run build
```

The production output will be generated inside the `dist/` directory.

### Free Hosting & Automatic Deployment

The application uses an Express server for `/api/classify` and `/api/health`, so deploy it as a Node.js web service rather than a static site such as GitHub Pages. The root `render.yaml` configures a free Render web service on the `main` branch:

- Render builds with `npm ci --include=dev && npm run build` and starts the production Express server with `npm start`.
- Deploys are configured to start only after GitHub CI checks pass.
- The `/api/health` endpoint is used for service health checks.
- The Gemini API key is optional. Without `GEMINI_API_KEY`, the built-in simulation classification fallback remains available; no paid API is required.

To activate deployment, create a Render account, connect GitHub, authorize access to this repository, and create a Blueprint from this repository's `render.yaml`. Select the Free service plan and confirm the `main` branch and **After CI Checks Pass** automatic deploy behavior. Render will provide a public `onrender.com` URL after the first successful deployment. Free web services can spin down when idle, so their first request after inactivity may take about a minute.

---

## 👥 Contributors & Repository

- **Repository:** [https://github.com/Varunsandesh19/AI-Smart-Waste-Management](https://github.com/Varunsandesh19/AI-Smart-Waste-Management)
- **License:** Apache-2.0
