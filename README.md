# POLAR-AI ❄️
### Polar Operations, Logistics & Autonomous Resilience Intelligence

> *"We are not just digitizing polar logistics. We are making the system predictive."*  
> **Workflow Closed-Loop**: `PLAN` → `TRACK` → `MONITOR` → `PREDICT` → `SIMULATE` → `RECOMMEND` → `HUMAN APPROVAL` → `RESPOND` → `REPORT`

[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Deployment-Ready-brightgreen)](https://github.com/bhavishyaone1/POLAR-AI)

---

## 1. Executive Summary & Core Value Proposition

Operating scientific research stations in Antarctica (such as **Maitri** and **Bharati**) requires juggling multi-week supply logistics, brutal blizzards, mission-critical power generation, and isolated personnel safety.

Traditional polar management relies on fragmented, reactive tools: spreadsheets, static logbooks, isolated HF radio calls, and manual guesswork. When an icebreaker is delayed or a primary generator trips, station commanders have to manually piece together downstream consequences across separate documents.

**POLAR-AI** transforms polar operations from **reactive tracking** into an **autonomous, predictive decision-support system**:
- **Predicts** critical resource depletion horizons before shortages happen.
- **Simulates** cascades across microgrids, science labs, and life-support via a non-mutating sandbox.
- **Triages** emergency casualties with 100% disconnected offline spatial trigonometry.
- **Empowers** commanders with explainable AI recommendations safeguarded by a human-in-the-loop authorization gate and immutable cryptographic audit trail.

---

## 2. Defining Capabilities & Intelligence Engines

### 🛡️ 1. Mission Continuity Engine (0–100 Score)
- Evaluates real-time telemetry across inventory runway, asset health, cargo pipelines, blizzard hazards, and crew medical safety.
- Current baseline: **68% [DEGRADED]**.
- **Transparent explainability**: Click *"Why is my score 68%?"* to see exact point deductions:
  - `-12 pts`: Fuel resupply deficit gap at Maitri (12.0d runway vs 17.0d cargo ETA).
  - `-8 pts`: Overdue maintenance on Primary Diesel Generator `AST-GEN-01` (2,450 hrs).
  - `-6 pts`: High-risk blizzard warning at Larsemann Hills.
  - `-6 pts`: Delayed icebreaker cargo consignment `C-101` trapped in pack ice.

### ⚡ 2. Predictive Consumption & Resource Runway
- Continuously calculates burn rate vs remaining stocks (e.g. Maitri Diesel: `14,200 L` @ `1,180 L/day` = `12.0 days runway`).
- Compares runway against incoming cargo supply ETA (`C-101` @ 17 days) to isolate the **5.0-day unhedged deficit window** before blackout occurs.
- Flags Last Safe Resupply Dates and critical buffer thresholds across fuels, potable water, freeze-dried rations, and medical O2.

### 🧪 3. What-If Simulation Sandbox
- Isolated, non-mutating scenario branching:
  - Adjust sliders for Cargo Resupply Delay (+1 to +14 days).
  - Surge station consumption burn rates (+10% to +50%).
  - Simulate primary generator trip (`AST-GEN-01`).
  - Toggle extreme blizzard conditions.
- Real-time score delta preview: watch score drop from **68% down to 51% (CRITICAL)** without altering live operational data.

### 🕸️ 4. Interactive Visual Dependency Graph & Cascade Analysis
- Directed Acyclic Graph (DAG) visualizing physical polar interdependencies:
  `Cargo Resupply` → `Fuel Reserve` → `Primary Generators` → `Station Microgrid` → `Scientific Cryo Labs & Life Support`.
- Node blast radius isolation: clicking any asset highlights its immediate upstream causes and downstream cascading failures.

### 🚨 5. 100% Offline Autonomous Spatial Triage
- Completely disconnected edge operation (zero satellite, internet, or cloud requirement).
- Spherical Haversine great-circle calculations:
  - Sorts nearest responding personnel, calculating foot traverse and snowmobile transit times.
  - Identifies closest qualified medics and blood-group compatibility.
  - Locates nearest operational tracked snowcats (e.g. PistenBully 300) with vehicle ETA.
  - Recommends required trauma/hypothermia stores and sets CODAN HF Channel 4 (8,291 kHz).
- **1-Click "Execute Autonomous Dispatch"** button to order field response and log to the audit trail.

### 🤖 6. AI Copilot & Human-in-the-Loop Decision Gating
- Domain-specific polar predictive reasoning (`REC-001`: Activate Strategic Fuel Reserve; `REC-002`: Microgrid Non-Essential Shedding).
- Strict commander authorization workflow: recommendations require explicit human officer approval before recording to the **Cryptographic Immutable Audit Trail**.

### 🚜 7. Fleet Asset Management & Failure Risk Modeling
- 16 polar assets across Caterpillar generators, PistenBully snowcats, Toyota Hilux Arctic vehicles, snowmobiles, and water desalination plants.
- Tracks operating hours, condition ratings, and predictive failure probability models.

### 📊 8. 5x5 Operational Risk Matrix & Presentation Mode
- Categorized risk matrix (`RSK-001` through `RSK-005`) with likelihood × consequence scoring.
- Built-in **Presentation Mode** with side-by-side comparative matrix (Traditional vs POLAR-AI) for mission briefings and pitch demonstrations.
- One-click printable **Daily Mission Audit Report**.

---

## 2. Features

**Dashboard** — Live overview: active expeditions, personnel deployed, cargo in transit,
low-stock items and critical alerts, plus an open-incident banner and an activity feed.
Every card is clickable and takes you to the module behind the number.

**Expedition Management** — All five expeditions with status (Planning / Active /
Completed), progress, leader, window and objective. Create, edit and delete.

**Personnel Tracking** — A 16-person roster with role, assigned expedition, current
location, status and last-updated time. Filter and search; change a person's status
inline; open a detail panel with their position on the map.

**Cargo Tracking** — 14 consignments with category, weight, priority and pipeline status
(Staged → In Transit → Arrived, or Delayed with a reason). Filter by status, category and
priority — the three filters from the brief.

**Inventory Management** — 14 stock items across four locations, each with a minimum
level. Anything at or below its minimum is flagged **LOW STOCK** automatically — the flag
is computed, not a column somebody has to remember to tick. Includes a stock-by-category
chart and quick +/− stock adjustment.

**Weather Integration** — Live conditions and a 4-day forecast for 10 stations and camps
from Open-Meteo, with an **operations window** assessment (is it safe to fly, drive, or work
outside?) and a one-click "report this as a weather hazard" action.

**Map Integration** — An interactive Leaflet / OpenStreetMap view plotting all 12 sites,
16 personnel and every open incident, colour-coded by status, with a detail panel per
marker.

**Emergency Response** — A prominent alert section, an incident report form with
validation, and a triage board where incidents are acknowledged and resolved. Filed
incidents flow straight to the dashboard and the roster (see the table above).

**Throughout** — Four roles, responsive layout down to phone width, and loading /
empty / error states on every data view, so a failed request never blanks the screen or
crashes the console.

---

## 3. Technology stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 18.3.1** | Component reuse across eight modules |
| Build tool | **Vite 8.2.2** | Instant dev server and fast builds |
| Language | **JavaScript** (not TypeScript) | Fewer moving parts to explain |
| Styling | **Tailwind CSS 3.4.17** | Consistent spacing and colour without a separate CSS file per component |
| Database *(optional)* | **Supabase** (`@supabase/supabase-js` 2.112) | Hosted Postgres with a free tier and no backend to write |
| Maps | **Leaflet 1.9.4** + OpenStreetMap | Free, no API key, no billing account |
| Weather | **Open-Meteo** | Free, no API key, no sign-up |
| Charts | **Recharts 2.13.3** | Charts as React components |
| Icons | **Lucide React 0.468** | One clean icon set |

**There is deliberately no backend server.** Supabase is reached directly from the browser,
so there is no Express app, no Docker, no deployment pipeline — one command runs everything.

---

### 4. Project Structure & Repository Layout

```
polar/
├── .github/                     # GitHub Actions CI/CD workflows & templates
│   ├── ISSUE_TEMPLATE/          # Structured bug report & feature request forms
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── pull_request_template.md # Standard PR checklist for mission operations
│   └── workflows/
│       └── ci.yml               # Automated build & verification pipeline
│
├── docs/                        # Architecture guides, SOP runbooks & PDF references
│   ├── ARCHITECTURE.md          # Comprehensive intelligence loop & engine design
│   ├── OPERATIONS_GUIDE.md      # Polar SOPs (Blizzard Cond 1, Crevasse, Microgrid)
│   ├── Polar_Command_Center_Resource_Attribution_Directory.pdf
│   └── Real_World_Polar_Expedition_Reference_Data.pdf
│
├── public/                      # Web-accessible assets & client-downloadable PDFs
│   ├── polar-hero-bg.jpg        # High-definition polar landscape backdrop
│   ├── polar-logo.svg           # Vector mission emblem
│   ├── Polar_Command_Center_Resource_Attribution_Directory.pdf
│   └── Real_World_Polar_Expedition_Reference_Data.pdf
│
├── scripts/                     # Automation, packaging & schema generators
│   ├── generate_resource_directory_pdf.js  # Compiles official PDF directories
│   ├── generate-schema.mjs      # Database schema generation
│   ├── create-zip.ps1           # Deployment packaging script
│   └── verify-zip.ps1           # Package integrity validation
│
├── src/
│   ├── main.jsx                 # Application entry point with providers
│   ├── App.jsx                  # Main command center routing & layout shell
│   ├── index.css                # Light Arctic Design System styling
│   │
│   ├── components/              # Reusable UI widgets, drawers & panels
│   │   ├── AssetDetailDrawer.jsx     # Slide-over asset health & hours breakdown
│   │   ├── CargoDetailDrawer.jsx     # Consignment tracking & cascade inspector
│   │   ├── InventoryDetailDrawer.jsx # Stock burn runway & buffer levels
│   │   ├── ContextualAiInsight.jsx   # Embedded AI continuity warning cards
│   │   ├── GuidedDemoTour.jsx        # 9-Step "From Data to Decision" walkthrough
│   │   ├── TopBar.jsx                # Global AI Monitoring Center & user profile
│   │   ├── Sidebar.jsx               # Navigation bar with role badges
│   │   └── weather/                  # Modular Antarctic weather components
│   │
│   ├── pages/                   # Operational command screens
│   │   ├── Dashboard.jsx        # AI Briefing, Continuity Score (68%), Delta metrics
│   │   ├── LandingPage.jsx      # Public mission presentation & architecture
│   │   ├── MissionSimulator.jsx # What-If non-mutating sandbox engine
│   │   ├── AiCopilot.jsx        # Officer decision support & trade-off analyzer
│   │   ├── Cargo.jsx            # Manifests, icebreaker corridors & ETAs
│   │   ├── Inventory.jsx        # Critical reserves, burn rates & buffers
│   │   ├── Assets.jsx           # Caterpillar generators, snowcats, microgrid
│   │   ├── Emergency.jsx        # Incident Command Room & 100% offline triage
│   │   ├── Expeditions.jsx      # Scientific sortie planning & traversal
│   │   ├── Personnel.jsx        # 16-person roster, medical credentials & roles
│   │   ├── MapView.jsx          # Interactive spatial coordinates & geofences
│   │   ├── Weather.jsx          # Live Open-Meteo telemetry & safe fly windows
│   │   └── AuditLog.jsx         # Cryptographic SHA-256 tamper-evident ledger
│   │
│   ├── services/                # Core analytical & intelligence engines
│   │   ├── continuityEngine.js  # Score calculations & explainable deductions
│   │   ├── simulationEngine.js  # What-If parametric scenario models
│   │   ├── dependencyGraph.js   # Physical DAG cascade models
│   │   ├── offlineEmergencyService.js # Great-Circle Haversine spatial triage
│   │   └── aiCopilotService.js  # Polar domain knowledge & RAG routines
│   │
│   ├── store/                   # Centralized React Context stores
│   │   ├── DataContext.jsx      # Unified reactive operational state
│   │   └── AuthContext.jsx      # Role permissions & session handling
│   │
│   └── data/                    # Antarctic station telemetry & demo fixtures
│
├── supabase/                    # PostgreSQL schemas & migrations
├── legacy/                      # Archived v1 Node.js express prototype
├── LICENSE                      # MIT Open-Source License
├── package.json                 # Project dependencies & npm scripts
├── tailwind.config.js           # Arctic Ice palette & design tokens
└── vite.config.js               # Vite build configuration
```

**Demo data** (`src/data/demoData.js`): 5 expeditions, 16 personnel, 14 consignments,
14 inventory items, 4 incidents, 12 locations (10 land sites + 2 vessels) and 8 activity
entries — all fictional, all realistic for Indian polar operations (Maitri, Bharati,
Himadri and their field camps).

---

## 5. Installation

**You need [Node.js](https://nodejs.org/)** version `20.19+` or `22.12+` (this project was
built on Node 22). Check what you have:

```bash
node -v
```

Then, in a terminal, go into the project folder and install the dependencies:

```bash
cd polar-expedition-prototype
```

```bash
npm install
```

That downloads everything listed in `package.json` into a `node_modules` folder. It takes a
minute or two the first time and only needs doing once.

---

## 6. Environment variables

**You can skip this entire section.** The app runs fully on its built-in demo data with no
keys at all — that is its normal, intended state, and it is how you should demo it.

If you *do* want the optional database, the app reads exactly two variables:

| Variable | What it is |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase **anon public** key |

Rules that matter:

- Keys go in a file named **`.env`** in the project root — **never** in the source code.
- `.env` is already listed in `.gitignore`, so it can never be committed to GitHub.
- `.env.example` is the committed template. It contains no real keys and explains where
  each value comes from. Copy it to start:

```bash
cp .env.example .env
```

- The name **must** start with `VITE_`. Vite only exposes variables to the browser if they
  carry that prefix.
- Use the **anon public** key only. It is designed to be visible in a browser. Never put
  the `service_role` key in this app — that one is a secret.
- Restart the dev server after editing `.env`.

No weather key is needed. Open-Meteo is free and requires no sign-up.

---

## 7. Supabase setup

*Optional. Skip it and everything still works.*

1. Go to **[supabase.com](https://supabase.com)** and sign up — free, no card needed.
2. Click **New project**. Give it any name and a strong database password.
3. Wait about two minutes for it to finish setting up.
4. In the left sidebar click the **gear icon** (Project Settings) → **API**.
5. Copy **Project URL** → paste after `VITE_SUPABASE_URL=` in your `.env`.
6. Copy the **anon** / **public** key → paste after `VITE_SUPABASE_ANON_KEY=`.
7. Run the database setup in the next section, then restart the dev server.

**How to tell whether it worked:** look at the bottom of the sidebar. It reads either
*"Records in browser memory — reset on refresh"* or *"Records from Supabase — changes are
saved."* That line reports what actually happened, not merely whether keys are present — so
if a connection fails, it keeps telling you the truth.

If the database cannot be reached, the app **does not break**. It falls back to demo data,
every module keeps working, and an amber strip appears explaining what went wrong with a
**Retry** button.

---

## 8. Database setup

Everything is in one file: **`supabase/schema.sql`**.

1. In your Supabase project, open **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open `supabase/schema.sql`, copy **all** of it, paste it in.
4. Click **Run**.

That single file creates:

- **5 tables** — `expeditions`, `personnel`, `cargo`, `inventory`, `emergencies`
- **CHECK constraints** mirroring `src/lib/statuses.js`, so the database rejects any status
  word the app does not use
- **53 seed rows** — the same demo records, so the app looks identical connected or not
- **1 view** — `inventory_stock_status`, which *calculates* low stock. There is deliberately
  **no `low_stock` column**: a stored flag can go stale, a calculated one cannot
- **Row Level Security policies**

⚠️ **The demo RLS policies are wide open** — anyone with the anon key can read and write.
That is deliberate for a prototype with no real accounts, and it is stated in the SQL file
itself. A production system would replace them with login-based policies.

The SQL is *generated* from `src/data/demoData.js`, so the demo records exist in exactly one
place and cannot drift. If you edit the demo data, regenerate it:

```bash
node scripts/generate-schema.mjs
```

---

## 9. Running locally

Start the development server:

```bash
npm run dev
```

Open the address it prints — normally **http://localhost:5173**. Pick a role, click
**Enter Console**, and you are in.

Other commands:

```bash
npm run build
```

Bundles the app into a `dist/` folder for hosting.

```bash
npm run preview
```

Serves that built folder, so you can check the production build before presenting.

---

## 10. API integrations

### Open-Meteo — weather (live)

- Endpoint: `https://api.open-meteo.com/v1/forecast`
- **No API key, no sign-up, no billing account.** Free for non-commercial use.
- Called from `src/services/weatherService.js`; the UI never calls it directly.
- Fetches, for all 10 sites in a single request: temperature and apparent ("feels like")
  temperature, humidity, precipitation, surface pressure, wind speed, wind direction and
  wind gusts — plus a 4-day forecast of highs, lows, maximum wind and precipitation.
- The app turns those raw numbers into an **operations window** — a plain-language operational assessment
  about whether flying, driving or outdoor work is advisable.
- **If the call fails**, the page shows clearly-labelled fallback figures and says on screen
  that they are not live readings. This is the honest-handling requirement, not an
  afterthought.

### OpenStreetMap — map tiles

- Standard OSM tiles via Leaflet. No key, no account. Attribution is displayed on the map.

### Supabase — database (optional)

- Reached directly from the browser over HTTPS; there is no backend server in between.
- All calls go through `src/services/db.js`, which has one rule: **nothing in it ever
  throws.** Every function returns `{ rows, error }`, which is why a dead network cannot
  crash the console.
- Writes are **fire-and-forget**: the screen updates first, the database is told afterwards.
  So the connected chain above runs at exactly the same speed whether the database is fast,
  slow, or absent. If a write fails, the change stays on screen and an amber strip says
  plainly that it was not saved.

---

## 11. Demo workflow

The five-minute walkthrough this prototype was built to support:

1. **Sign in** — pick *Expedition Commander*. Point out that the role decides which
   controls appear.
2. **Dashboard** — one screen: 3 active expeditions, 15 personnel deployed, 5 consignments
   in transit, 5 low-stock items, 3 open incidents.
3. **Expeditions** — open *Antarctica Research Alpha* and show its status and progress.
4. **Personnel** — the 16-person roster. Show who is on that expedition and where they are.
5. **Cargo** — filter by status, then mark a consignment **DELAYED** and give a reason.
   Note the sidebar Cargo count rise as you do it.
6. **Live Map** — all 12 sites and 16 people plotted. *Say clearly that positions are
   simulated demo data, not live GPS.*
7. **Weather** — live Open-Meteo readings and the operations window for each site.
8. **Inventory** — show an item already flagged **LOW STOCK**, then step another item down
   past its minimum and watch it flag itself and the sidebar count rise.
9. **Emergency** — file an incident: pick a type, a location and an affected person.
10. **Watch the chain fire** — the alert count rises, the incident hits the dashboard
    banner, and the affected person's status flips to **EMERGENCY** on the roster and turns
    red on the map. Nobody typed those four changes.
11. **Resolve it** — acknowledge, then resolve. The counts fall and the person is released
    back to **ACTIVE**.
12. **Close the loop:** *"One centralised platform. Expedition planning, personnel, cargo,
    inventory and emergency response are not five systems that need reconciling — they are
    one system, and a change anywhere is visible everywhere."*

Step 10 is the one to slow down for. It is the whole argument.

---

## 12. Future improvements

Honest about what a production build would need next:

**Would make it real**

- **Genuine position tracking** — Iridium / Argos beacon feeds replacing the simulated
  coordinates, with position history rather than one current point.
- **Real authentication** with server-enforced permissions. The current role picker decides
  what the UI shows; it does not stop anyone. Supabase Auth plus Row Level Security policies
  tied to the signed-in user would close that gap.
- **Offline-first field devices.** A station loses connectivity routinely. Local-first
  storage with sync-on-reconnect and proper conflict resolution — right now the last write
  wins and nobody is told.
- **Real emergency dispatch** — satellite messaging or SMS on incident creation.
  Deliberately left out of the prototype rather than faked.

**Would make it better**

- **Live updates between users** via Supabase Realtime, so two people watching the console
  see each other's changes without refreshing.
- **Predictive resupply** — forecast run-out dates from consumption rates instead of only
  flagging what is already low.
- **Sea-ice and route data** from the Copernicus / NSIDC feeds, to make route planning
  physical rather than descriptive.
- **Reports and exports** — PDF expedition summaries and CSV manifests for handover.
- **Code splitting.** The bundle is one ~1 MB chunk; the map and chart libraries could load
  only on the pages that use them.
- **Automated tests.** Verification for this prototype was done by hand, module by module.

---

## Credits

Developed for the Ministry of Earth Sciences (MoES) and NCPOR. Personnel rosters
are modeled after AFMC staffing guidelines with fictionalized names for privacy.
Station names and coordinates are real Indian polar research facilities (WGS-84).
