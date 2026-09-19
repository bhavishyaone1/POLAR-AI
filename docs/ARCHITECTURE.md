# POLAR-AI — System Architecture & Intelligence Loop

## 1. Architectural Philosophy

POLAR-AI is an operational mission operating system engineered for extreme polar research facilities and expeditions.

The platform unifies disconnected polar data streams (cargo manifests, inventory holding, asset run-hours, weather telemetry, satellite distress signals) into an active, continuous intelligence cycle:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌───────────────┐
│   MONITOR   │ ──> │   DETECT    │ ──> │   PREDICT   │ ──> │  UNDERSTAND   │
│ Telemetry   │     │  Anomalies  │     │   Runways   │     │ Cascades/DAG  │
└─────────────┘     └─────────────┘     └─────────────┘     └───────────────┘
                                                                    │
┌─────────────┐     ┌─────────────┐     ┌─────────────┐             │
│   RECORD    │ <── │   DECIDE    │ <── │   ASSIST    │ <── ┌───────┴───────┐
│ Cryptographic│     │  Commander  │     │ AI Copilot  │     │   SIMULATE    │
│    Audit    │     │ Veto / Sign │     │ Trade-offs  │     │    Sandbox    │
└─────────────┘     └─────────────┘     └─────────────┘     └───────────────┘
```

---

## 2. Directory Layout & Organization

The codebase is organized into modular subsystems:

```
polar/
├── .github/                     # GitHub Actions CI & Issue/PR templates
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── pull_request_template.md
│   └── workflows/
│       └── ci.yml
├── docs/                        # Mission architecture, SOPs & reference PDFs
│   ├── ARCHITECTURE.md          # This system architecture document
│   ├── OPERATIONS_GUIDE.md      # Scoring models, telemetry & SOP handbook
│   ├── Polar_Command_Center_Resource_Attribution_Directory.pdf
│   └── Real_World_Polar_Expedition_Reference_Data.pdf
├── n8n/                         # Automation workflows & webhook integration
├── public/                      # Web-accessible assets & client PDF downloads
├── scripts/                     # PDF generation, schema tooling, packaging
│   ├── generate_resource_directory_pdf.js
│   ├── generate-pdf.mjs
│   ├── generate-schema.mjs
│   ├── create-zip.ps1
│   └── verify-zip.ps1
├── src/
│   ├── components/              # Reusable UI widgets & detail flyouts
│   │   ├── weather/             # Specialized polar meteorological cards
│   │   ├── AssetDetailDrawer.jsx
│   │   ├── CargoDetailDrawer.jsx
│   │   ├── ContextualAiInsight.jsx
│   │   ├── GuidedDemoTour.jsx
│   │   ├── InventoryDetailDrawer.jsx
│   │   ├── TopBar.jsx
│   │   └── ...
│   ├── data/                    # Realistic Antarctic station baselines
│   ├── hooks/                   # Custom React lifecycle & geolocation hooks
│   ├── lib/                     # Roles, status maps, Supabase clients
│   ├── pages/                   # Main operational command screens
│   ├── polar-ai-assistant/      # Offline NLP & conversational assistant
│   ├── services/                # Continuity engine, physics & math engines
│   ├── store/                   # Centralized React Data & Auth Context
│   └── utils/                   # Unit conversions, operational weather windows
├── supabase/                    # PostgreSQL schemas & migrations
├── LICENSE                      # MIT Open-Source License
├── README.md                    # Platform overview & quickstart
├── package.json
└── vite.config.js
```

---

## 3. Core Operational Engines

### 3.1 Continuity Score Engine (`src/services/continuityEngine.js`)
Calculates real-time mission survivability index:
$$\text{Score} = \text{Base (85)} - \Delta_{\text{fuel}} - \Delta_{\text{cargo}} - \Delta_{\text{asset}} + \Delta_{\text{crew}} + \Delta_{\text{satcom}}$$

### 3.2 Predictive Depletion Engine
Computes the **Last Safe Resupply Date**:
$$\text{Runway (days)} = \frac{\text{Current Stock (L)}}{\text{Daily Burn Rate (L/day)}}$$
$$\text{Last Safe Resupply Date} = \text{Today} + (\text{Runway} - \text{Safe Reserve Buffer})$$

### 3.3 What-If Simulation Sandbox (`src/services/simulationEngine.js`)
Enables non-mutating branching:
- Takes active station state immutably.
- Injects parametric stress factors (e.g. $+5\text{d}$ cargo delay, $+20\%$ fuel burn).
- Evaluates outcome deltas and recommended mitigations without corrupting live operational memory.

### 3.4 Disconnected Spatial Triage (`src/services/offlineEmergencyService.js`)
Uses spherical trigonometry (Great-Circle Haversine Formula) entirely on client hardware:
$$d = 2R \arcsin \left( \sqrt{ \sin^2\left(\frac{\Delta\phi}{2}\right) + \cos\phi_1 \cos\phi_2 \sin^2\left(\frac{\Delta\lambda}{2}\right) } \right)$$
Requires 0 KB cloud roundtrip for life-or-death field rescues.
