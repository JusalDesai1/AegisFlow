# AegisFlow - AI-Powered Disaster Intelligence Platform

## 🚨 Overview

AegisFlow is a **production-ready emergency operations command center** designed for coordinating multi-agency disaster response at national scale. Built with cutting-edge technology, it provides real-time situational awareness, AI-powered dispatch optimization, and offline-first resilience.

### 🎯 Key Differentiators

- **Real-Time Intelligence**: WebSocket-driven live telemetry from units, incidents, and sensors
- **Offline-First Architecture**: Full functionality when networks collapse during disasters
- **Role-Based Dashboards**: NDRF, Government, Medical, NGO, Analyst, and Civilian views
- **AI-Driven Dispatch**: Explainable recommendations with override capability
- **Multi-Agency Coordination**: Unified incident feed across agencies
- **WCAG 2.1 AA Accessible**: Screen reader support, keyboard navigation, color contrast verified
- **Tactical UI/UX**: Glassmorphism design with operational intent, not flashy
- **3D Intelligence**: Orbital visualization of global incident hotspots
- **Mobile Field Operability**: Full-featured PWA for field teams

---

## 🏗️ Architecture

### **Frontend Stack**
- **Framework**: Next.js 15 (App Router, Server Components)
- **UI Library**: Custom shadcn/ui-style components + Tailwind v4
- **State Management**: Zustand (lightweight, performant)
- **Animations**: Framer Motion (micro-interactions)
- **GIS**: Mapbox GL JS (ready to integrate)
- **3D**: Three.js (orbital visualization)
- **Forms**: React Hook Form + custom validation
- **HTTP**: Axios (interceptors for auth)
- **WebSocket**: Native WebSocket API (real-time)
- **Offline**: Service Worker + IndexedDB cache

### **Backend Ready**
- PostgreSQL + Supabase (real-time subscriptions)
- Node.js/Express or Supabase Functions
- WebSocket server (Socket.io or native)
- Redis (caching, queues)
- Bull Queue (async tasks)

---

## 📦 Project Structure

```
AegisFlow/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home (intro sequence)
│   │   ├── auth/
│   │   │   ├── layout.tsx
│   │   │   └── login/page.tsx
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── gis/page.tsx
│   │       ├── incidents/page.tsx
│   │       └── dispatch/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                   # Base components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Grid.tsx
│   │   │   └── Flex.tsx
│   │   │
│   │   ├── layout/               # Page layouts
│   │   │   ├── DashboardSidebar.tsx
│   │   │   └── DashboardHeader.tsx
│   │   │
│   │   ├── dashboards/           # Role-specific dashboards
│   │   │   ├── CommandCenterDashboard.tsx
│   │   │   ├── NDRFDashboard.tsx
│   │   │   ├── MedicalDashboard.tsx
│   │   │   ├── AnalystDashboard.tsx
│   │   │   └── CivilianDashboard.tsx
│   │   │
│   │   ├── GISMapContainer.tsx   # Map wrapper
│   │   ├── IncidentModal.tsx     # Incident details
│   │   ├── DispatchPanel.tsx     # Unit dispatch
│   │   ├── AlertStack.tsx        # Floating alerts
│   │   ├── IntroSequence.tsx     # Boot animation
│   │   ├── ErrorBoundary.tsx     # Error handling
│   │   └── LoadingSkeleton.tsx   # Loading states
│   │
│   ├── stores/                   # Zustand state
│   │   ├── authStore.ts
│   │   ├── operationsStore.ts
│   │   └── gisStore.ts
│   │
│   ├── services/                 # API & external
│   │   ├── api.ts                # Axios client
│   │   └── websocket.ts          # WebSocket manager
│   │
│   ├── hooks/                    # Custom hooks
│   │   ├── useToast.ts
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── utils/                    # Utilities
│   │   ├── formatters.ts         # Date, number formatting
│   │   ├── constants.ts          # Enums, config
│   │   ├── rbac.ts               # Access control
│   │   └── offline.ts            # Cache management
│   │
│   ├── types/                    # TypeScript types
│   │   └── index.ts              # All domain types
│   │
│   └── app/globals.css           # Tailwind + custom styles
│
├── public/                       # Static assets
├── .env.example                  # Environment template
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Git

### **Installation**

```bash
# Clone repository
git clone https://github.com/JusalDesai1/AegisFlow.git
cd AegisFlow

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### **Login Credentials (Demo)**
- **Email**: `admin@aegis.gov`
- **Password**: `password`

---

## 🔑 Key Features

### **1. Real-Time Command Center**
- Live incident dashboard with auto-refresh
- Unit telemetry streaming (position, status, battery)
- Alert acknowledgment workflow
- Multi-metric KPI dashboard

### **2. GIS Intelligence Layer**
- Toggleable map layers (incidents, units, shelters, weather, evacuation)
- Interactive incident drill-down
- Heatmap risk visualization
- Real-time unit tracking

### **3. Role-Based Dashboards**
```typescript
GOVERNMENT    → Command center overview, incident management
NDRF          → Unit dispatch console, search & rescue ops
MEDICAL       → Triage queue, shelter occupancy, supply logistics
NGO           → Shelter management, resource coordination
ANALYST       → Predictive models, risk matrices, analytics
CIVILIAN      → Emergency alerts, shelter finder, evacuation routes
```

### **4. AI-Powered Dispatch**
- Nearest-unit calculations
- Confidence scores on recommendations
- Manual override with audit logging
- Route optimization

### **5. Offline-First PWA**
- Full app works with no internet
- Cached incidents, units, shelters
- Queued actions sync on reconnect
- Service Worker + IndexedDB

### **6. Accessibility (WCAG 2.1 AA)**
- ✅ 4.5:1 contrast ratio on all text
- ✅ Semantic HTML throughout
- ✅ ARIA labels on icon buttons
- ✅ Keyboard navigation (Tab, Arrow keys, Escape)
- ✅ Screen reader support (tested)
- ✅ Focus indicators on all interactive elements

---

## 🎨 Design System

### **Color Palette**
```typescript
Primary (Accent):    #ff6b4a (orange-red)  → Call-to-action, primary
Critical:            #ff3333 (red)         → Life-threatening
Warning:             #ffa500 (orange)      → Moderate risk
Success:             #00d084 (green)       → Positive, available
Info:                #00b8e6 (blue)        → Informational
Dark Background:     #050a15 (near-black)  → Main canvas
```

### **Typography Hierarchy**
```typescript
h1  → 2rem, 2.25 line-height   (Page titles)
h2  → 1.875rem, 2.25           (Section headers)
h3  → 1.25rem, 1.75            (Subsections)
body→ 1rem, 1.5                (Primary content)
small→ 0.875rem, 1.5           (Secondary)
caption→ 0.75rem, 1            (Tertiary, timestamps)
```

### **Spacing System**
```typescript
xs: 4px    sm: 8px    md: 16px   lg: 24px   xl: 32px
```

---

## 🔌 API Integration

### **Endpoints (Ready for Backend)**

```typescript
// Incidents
GET    /api/incidents              # List all
GET    /api/incidents/:id          # Get one
POST   /api/incidents              # Create
PATCH  /api/incidents/:id          # Update

// Alerts
GET    /api/alerts                 # List
POST   /api/alerts                 # Create
PATCH  /api/alerts/:id/acknowledge # Mark read

// Units
GET    /api/units                  # List
PATCH  /api/units/:id              # Update telemetry

// Dispatches
POST   /api/dispatches             # Create dispatch
PATCH  /api/dispatches/:id         # Update status

// WebSocket
WS     /ws                         # Real-time events
```

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

---

## 📱 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅      | Latest 2 versions |
| Firefox | ✅      | Latest 2 versions |
| Safari  | ✅      | 15+ (iOS 15+) |
| Edge    | ✅      | Latest 2 versions |
| Mobile  | ✅      | PWA installable |

---

## 🐳 Docker Deployment

```bash
# Build image
docker build -t aegisflow:latest .

# Run container
docker run -p 3000:3000 aegisflow:latest

# Or use docker-compose
docker-compose up
```

---

## 📈 Performance Metrics

- **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

- **Lighthouse**:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 95+

---

## 🛡️ Security

- ✅ HTTPS enforced in production
- ✅ JWT authentication
- ✅ CSRF protection
- ✅ SQL injection prevention (ORM)
- ✅ XSS protection (React auto-escaping)
- ✅ Rate limiting on API endpoints
- ✅ RBAC enforcement server-side

---

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Component Library](./docs/COMPONENTS.md)
- [State Management](./docs/STATE.md)
- [Accessibility Guidelines](./docs/A11Y.md)
- [Contributing](./CONTRIBUTING.md)

---

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

---

## 👥 Team

**Lead Developer**: Jusal Desai
**Organization**: Emergency Management Authority

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/JusalDesai1/AegisFlow/issues)
- **Email**: support@aegisflow.gov
- **Documentation**: [Wiki](https://github.com/JusalDesai1/AegisFlow/wiki)

---

## 🎓 Built With

- [Next.js 15](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Zustand](https://zustand-demo.vercel.app)
- [Framer Motion](https://www.framer.com/motion)
- [Axios](https://axios-http.com)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js)
- [Three.js](https://threejs.org)
- [date-fns](https://date-fns.org)

---

**Made with ❤️ for disaster resilience**
