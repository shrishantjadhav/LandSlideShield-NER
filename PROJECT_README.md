<<<<<<< HEAD
# LandslideShield NER
### AI-Powered Landslide Early Warning, Risk Intelligence & Disaster Response Platform for the North Eastern Region
**Tagline:** *Predict Risk. Explain Threats. Protect Communities.*

Built for **Round 1 Prototype** in `curiouspace_vit`.

---

## 1. Executive Summary & Product Statement

> "LandslideShield NER is an AI-powered landslide early-warning and risk intelligence platform designed to help authorities identify evolving risk, understand contributing factors, assess potential impact, prioritize response and coordinate field verification across vulnerable regions of North Eastern India."

The platform transforms disaster management from reactive post-disaster relief into an end-to-end operational intelligence loop:
**MONITOR → COLLECT → FUSE → ANALYSE → PREDICT → EXPLAIN → ASSESS IMPACT → PRIORITIZE → ALERT → FIELD VERIFY → RESPOND → REASSESS**

---

## 2. Key Architecture & Design Implementation

- **Strict Government/Scientific Design System:**
  - Dominant Background: **Clean Pure White** (`#FFFFFF` / `#F8FAFC`)
  - Primary Brand Accent: **Deep Blue** (`#155EEF`)
  - Semantic Risk Colors Only:
    - **Green** = Low / Safe (`< 40`)
    - **Yellow/Amber** = Watch (`40–69`)
    - **Orange** = High Risk (`70–84`)
    - **Red** = Critical (`≥ 85`)
  - Typography: **Inter** (Google Fonts) with rigorous hierarchy
  - No decorative gradients, no dark mode, no glassmorphism, no cartoon illustrations.
- **Interactive GIS Map Centerpiece:**
  - High-performance Leaflet engine with CartoDB Positron clean light tiles
  - High-resolution North Eastern Region coordinates (Sikkim, Assam, Meghalaya, Mizoram, Arunachal Pradesh, Nagaland, Manipur, Tripura)
  - Translucent risk overlays, road polylines, village markers, critical infrastructure icons, and field report pins
  - Click any zone or road to immediately inspect AI drivers and potential impact.
- **Explainable AI (XAI) Panel:**
  - Multi-factor weight breakdown: Rainfall (24h), Soil Moisture, Terrain/Slope, Historical Landslides, and Field Evidence
  - Natural language AI diagnostic explanation with confidence score (86%)
  - Visual Risk Score (e.g. `87/100` CRITICAL, `+14%` surge).
- **Interactive Demo Scenario Simulator (Judging Flow):**
  - Persistent guided walkthrough bar in the Command Center
  - Step 1: Baseline Watch (Risk 42)
  - Step 2: Heavy Rainfall (Risk 57)
  - Step 3: Soil Moisture Saturation (Risk 69)
  - Step 4: Field Officer Submits Slope Crack Report FR-2041 (Risk 81)
  - Step 5: AI Multi-Factor Recalculation (Risk 87, CRITICAL, 2 roads & 3 villages impacted)
  - Step 6: Early Warning Alert ALT-1092 Dispatched (SMS/Push/CAP)
  - Step 7: SDRF Response Team Alpha Assigned & En Route
  - Step 8: Field Stabilized & Drainage Cleared (Risk decreases to 64)
  - Manual "+15mm Rainfall Surge" simulation trigger.

---

## 3. Platform Modules & Pages

1. **Authentication / Login Screen (`LoginView.jsx`)**
   - Professional government access portal
   - One-click **"Continue as Demo Officer"** for immediate evaluation
   - Demo credentials: `demo@landslideshield.in` / `demo123`.

2. **Command Center (`CommandCenterView.jsx`)**
   - KPI Cards: Critical Zones (08), High Risk Zones (17), Active Alerts (12), Field Reports (43), Roads Affected (06)
   - 68% GIS Map + 32% Explainable AI Risk Driver Panel
   - Quick action triggers: Log Field Report, Issue Early Alert, Assign Response Team.

3. **GIS Risk Map (`RiskMapView.jsx`)**
   - Full-screen spatial exploration
   - Multi-layer filters: Risk Zones, Monitored Roads, Field Pins, Lifeline Infrastructure
   - State filter (All 8 NER states), Risk filter, Time window (LIVE, +6h, +12h, +24h).

4. **Risk Intelligence (`RiskIntelligenceView.jsx`)**
   - Ranked driver table with current values, baseline ranges, and % risk contribution
   - Natural language AI diagnostic paragraph
   - Custom SVG Risk Trend Line Chart (Last 24 Hours + Next 12 Hours Forecast) with semantic risk bands
   - Live Weather & Environment Telemetry: 24h Rainfall (82mm), Soil Moisture (78%), Slope (34°), Temp (22°C), Wind (18km/h), 3-Day Cumulative (176mm).

5. **Field Reports (`FieldReportsView.jsx`)**
   - Ground truth telemetry table (ID, Location, Reporter, Type, Timestamp, Risk, Status)
   - Report inspection panel with computer-vision bounding box preview
   - AI Image Assessment (Confidence 82%), Risk before report (69) vs after (87)
   - Verification action and "+ Submit Geo-Tagged Report" modal.

6. **Road & Infrastructure Intelligence (`RoadInfrastructureView.jsx`)**
   - Monitored counters: 124 monitored roads, 18 at risk, 6 restricted, 2 blocked
   - Status table: NH-10, NH-54, NH-29, SH-5, NH-13, NH-102, NH-27, SH-8 with detours and clearance ETAs
   - AI Response Prioritization list (Priority 1 East Sikkim, Priority 2 Mizoram, Priority 3 Meghalaya) with explicit operational non-political protocol disclaimer.

7. **Early Warning & Alerts (`AlertsView.jsx`)**
   - Chronological alert feed with multi-channel broadcast status (SMS, Push, CAP, Siren)
   - "+ Issue New Warning" modal with target audience and channel selection.

8. **Response Management (`ResponseManagementView.jsx`)**
   - Operational incident tracking with status badges (PENDING, ASSIGNED, IN PROGRESS, VERIFIED, RESOLVED)
   - Chronological incident timeline (13:05 → 13:11 → 13:14 → 13:16 → 13:21 → 13:35)
   - Task force dispatch modal (SDRF Team Alpha, NDRF 12th Battalion, BRO Heavy Unit).

9. **AI Assistant (`AiAssistantView.jsx`)**
   - Conversational AI grounded strictly in live application state
   - Suggested prompt pills:
     - *"Which areas currently require attention?"*
     - *"Why is East Sikkim marked critical?"*
     - *"Which roads are currently affected?"*
     - *"Show recent field reports."*
     - *"What caused the recent risk increase?"*

10. **Risk Analytics (`AnalyticsView.jsx`)**
    - State incident bar chart (Sikkim, Assam, Meghalaya, Mizoram, Arunachal, Nagaland, Manipur, Tripura)
    - Field reports category breakdown
    - 7-day road disruption trend
    - Rainfall intensity vs risk tipping point analysis.

11. **Settings & Future-Ready Architecture (`SettingsView.jsx`)**
    - Operational officer profile
    - Risk threshold calibration (Watch 40, High 70, Critical 85)
    - Future-ready integration modules: IMD Radar API, Sentinel-1 InSAR, IoT Sensor Broker, National CAP Gateway
    - Official Product Statement.

---

## 4. Running the Application Locally

```bash
cd curiouspace_vit
npm install
npm run dev
```

The application will be accessible at:
`http://localhost:5173/` or `http://127.0.0.1:5173/`
=======
# LandSlideShield-NER
>>>>>>> c4791e66255e373f7982a90eab843f46e646ace0
