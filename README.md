# 🚨 AegisFlow - AI-Powered Emergency Operations Intelligence Platform

**Status:** 🚀 **LIVE ON VERCEL** | **Version:** 1.0.0 | **License:** Apache 2.0 | **Node:** 18+ | **Production-Ready:** ✅

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Design Philosophy](#-design-philosophy)
3. [System Architecture](#-system-architecture)
4. [Workflow & Data Flow](#-workflow--data-flow)
5. [Core Features](#-core-features)
6. [Tech Stack](#-tech-stack)
7. [Project Structure](#-project-structure)
8. [Development Guide](#-development-guide)
9. [Deployment](#-deployment)
10. [Contributing](#-contributing)

---

## 🎯 Project Overview

**AegisFlow** is a next-generation emergency operations command center designed for **real-time disaster response coordination** across multiple agencies (NDRF, Government, Medical, NGO). It transforms fragmented emergency response into a unified, AI-powered intelligence platform.

### The Problem We Solve
- ❌ **Fragmented Systems:** Multiple agencies use disconnected tools
- ❌ **Delayed Information:** Manual updates cause critical delays
- ❌ **Poor Coordination:** Duplicate deployments and resource conflicts
- ❌ **Inaccessible Technology:** Not usable by all responders
- ❌ **No Predictive Capability:** Reactive rather than proactive response

### Our Solution
✅ **Unified Command Center** - All agencies see the same incident data  
✅ **Real-time Updates** - WebSocket-driven live telemetry  
✅ **AI Intelligence** - Predictive dispatch and resource allocation  
✅ **Accessible Design** - WCAG 2.1 AA compliant  
✅ **Offline First** - Works even with network degradation  

---

## 🏗️ Design Philosophy

### 1. **User-Centric Design**

AegisFlow is built around **six distinct user personas**, each with tailored dashboards:

```
┌─────────────────────────────────────────────────────────────┐
│                    AegisFlow Users                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  👨‍💼 Government Command        👨‍🚒 NDRF Dispatcher                 │
│  Strategic oversight         Unit deployment & tracking    │
│  Resource allocation         Real-time coordination       │
│                                                             │
│  🏥 Medical Triage Operator   🚚 NGO Logistics Manager      │
│  Patient management          Supply chain operations      │
│  Shelter allocation          Resource distribution        │
│                                                             │
│  📊 Data Analyst             👥 Civilian User               │
│  Predictive modeling         Emergency alerts             │
│  Trend analysis              Situational awareness        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

Each user sees a **role-based dashboard** that surfaces only relevant information.

### 2. **Real-time Information Flow**

```
┌──────────────────────────────────────────────────────────────┐
│                   Data Flow Architecture                    │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Incident Source                                             │
│       ↓                                                       │
│  WebSocket Manager (lib/ws/wsManager.ts)                     │
│       ↓                                                       │
│  Event Subscription System                                   │
│       ↓                                                       │
│  Zustand Stores (State Management)                           │
│       ↓                                                       │
│  React Components (UI Update)                                │
│       ↓                                                       │
│  User Sees Live Updates                                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 3. **Accessibility First Approach**

- **WCAG 2.1 AA Compliance** across all components
- **4.5:1 Color Contrast** minimum on all text
- **Semantic HTML** with proper ARIA labels
- **Keyboard Navigation** fully supported
- **Screen Reader Compatible** with live regions
- **Focus Indicators** visible on all interactive elements

### 4. **Offline-First Architecture**

AegisFlow is designed to work **even when the internet fails**:

```
Online (Normal)          →  Offline (Degraded)
┌─────────────────┐        ┌──────────────────┐
│ Live WebSocket  │        │ Service Worker   │
│ Real-time data  │        │ Cached data      │
│ Cloud storage   │   →    │ Local DB         │
│ Full features   │        │ Limited features │
└─────────────────┘        └──────────────────┘
     ↓ (Network restored)       ↓
     └─────────→ Sync & Recovery
```

### 5. **Security & Privacy**

- **JWT Token Management** with refresh rotation
- **Role-Based Access Control (RBAC)** at store level
- **Encrypted Local Storage** of sensitive data
- **HTTPS/TLS Only** in production
- **Security Headers** (CSP, X-Frame-Options, etc.)
- **Rate Limiting** on all API endpoints

---

## 🔄 System Architecture

### High-Level System Design

```
┌──────────────────────────────────────────────────────────────────┐
│                     AEGISFLOW ARCHITECTURE                       │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              CLIENT LAYER (Next.js 14)                 │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │   │
│  │  │   Pages      │  │  Components  │  │    Hooks     │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │   │
│  └──────────────┬───────────────────────────────────────────┘   │
│                 │                                                 │
│  ┌──────────────▼───────────────────────────────────────────┐   │
│  │            STATE MANAGEMENT LAYER                       │   │
│  │  ┌────────────────┐  ┌─────────────┐  ┌──────────────┐  │   │
│  │  │  useAuthStore  │  │  Operations │  │  GISStore    │  │   │
│  │  │  (JWT, RBAC)   │  │  Store      │  │  (Map state) │  │   │
│  │  └────────────────┘  └─────────────┘  └──────────────┘  │   │
│  └──────────────┬───────────────────────────────────────────┘   │
│                 │                                                 │
│  ┌──────────────▼───────────────────────────────────────────┐   │
│  │           REAL-TIME LAYER (WebSocket)                   │   │
│  │  wsManager.ts - Handles subscriptions & reconnection    │   │
│  └──────────────┬───────────────────────────────────────────┘   │
│                 │                                                 │
│  ┌──────────────▼───────────────────────────────────────────┐   │
│  │         API & SERVICES LAYER                            │   │
│  │  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐    │   │
│  │  │ REST API     │  │  WebSocket  │  │  Firebase    │    │   │
│  │  │ Endpoints    │  │  Manager    │  │  (optional)  │    │   │
│  │  └──────────────┘  └─────────────┘  └──────────────┘    │   │
│  └──────────────┬───────────────────────────────────────────┘   │
│                 │                                                 │
│  ┌──────────────▼───────────────────────────────────────────┐   │
│  │         BACKEND & DATA LAYER                            │   │
│  │  ┌────────────────┐  ┌──────────────┐                    │   │
│  │  │ PostgreSQL DB  │  │ Redis Cache  │                    │   │
│  │  │ (Supabase)     │  │              │                    │   │
│  │  └────────────────┘  └──────────────┘                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```typescript
// Root Layout
<html>
  <body>
    <RootLayout>
      {/* Navigation */}
      <Header />
      
      {/* Main Content */}
      <main>
        <Dashboard>
          {/* Role-Based Sections */}
          <IncidentManagement />
          <UnitDispatch />
          <MapView />
          <AlertSystem />
        </Dashboard>
      </main>
      
      {/* Services */}
      <WebSocketProvider /> {/* Real-time updates */}
    </RootLayout>
  </body>
</html>
```

---

## 📊 Workflow & Data Flow

### 1. **User Authentication Workflow**

```
User Login Flow:
┌──────────┐
│   User   │  Enters credentials
└────┬─────┘
     │
     ▼
┌──────────────────────────┐
│ Authentication API Call  │
│ POST /api/auth/login     │
└────┬─────────────────────┘
     │
     ▼
┌──────────────────────────┐
│ Validate Credentials     │
│ Check Database           │
└────┬─────────────────────┘
     │
     ├─ Success ──────┐
     │                │
     ▼                ▼
┌────────────┐    ┌──────────┐
│ Issue JWT  │    │Show Error│
│ Token      │    │Message   │
└────┬───────┘    └──────────┘
     │
     ▼
┌──────────────────────────┐
│ Store in useAuthStore    │
│ - token                  │
│ - refreshToken           │
│ - user (with RBAC)       │
│ - expiresAt              │
└────┬─────────────────────┘
     │
     ▼
┌──────────────────────────┐
│ Set Auth Headers         │
│ All future API calls     │
└────┬─────────────────────┘
     │
     ▼
┌──────────────────────────┐
│ Load User Dashboard      │
│ (Role-based)             │
└──────────────────────────┘
```

### 2. **Real-time Incident Update Workflow**

```
Incident Created/Updated:
┌────────────────┐
│ External Event │ (NDRF creates incident)
└────┬───────────┘
     │
     ▼
┌────────────────────────┐
│ Backend Detects Change │
│ Database Updated       │
└────┬───────────────────┘
     │
     ▼
┌────────────────────────┐
│ WebSocket Broadcast    │
│ event: INCIDENT_UPDATED│
│ payload: {...}         │
└────┬───────────────────┘
     │
     ▼
┌────────────────────────┐
│ wsManager Receives     │
│ (lib/ws/wsManager.ts)  │
└────┬───────────────────┘
     │
     ▼
┌────────────────────────┐
│ Trigger Subscribers    │
│ handleMessage()        │
└────┬───────────────────┘
     │
     ▼
┌────────────────────────┐
│ Zustand Store Update   │
│ useOperationsStore     │
│ .setState({...})       │
└────┬───────────────────┘
     │
     ▼
┌────────────────────────┐
│ React Re-render        │
│ Components subscribe   │
│ to store changes       │
└────┬───────────────────┘
     │
     ▼
┌────────────────────────┐
│ UI Updates in Real-time│
│ User sees new data     │
│ instantly              │
└────────────────────────┘
```

### 3. **Role-Based Access Control (RBAC) Flow**

```
RBAC Permission Check:
┌─────────────────────┐
│ User Action         │ (e.g., "Create Incident")
└────┬────────────────┘
     │
     ▼
┌──────────────────────────┐
│ Check useAuthStore       │
│ - user.role              │
│ - user.permissions       │
└────┬─────────────────────┘
     │
     ├─ Has Permission? ─────┐
     │                       │
    Yes                      No
     │                       │
     ▼                       ▼
┌─────────────┐    ┌──────────────────┐
│ Allow Action│    │ Block & Show Error│
│ Proceed     │    │ (unauthorized)    │
└─────────────┘    └──────────────────┘
```

### 4. **Offline-First Data Sync**

```
Offline Scenario:
┌────────────────────┐
│ Network Fails      │
└────┬───────────────┘
     │
     ▼
┌────────────────────┐
│ Service Worker     │
│ Intercepts Request │
└────┬───────────────┘
     │
     ▼
┌────────────────────┐
│ LocalStorage Cache │
│ Serves Cached Data │
└────┬───────────────┘
     │
     ▼
┌────────────────────┐
│ User Actions       │
│ Queued Locally     │
└────┬───────────────┘
     │
     ▼ (Network restored)
┌────────────────────┐
│ Sync Queue         │
│ Send Pending       │
│ Actions to Server  │
└────┬───────────────┘
     │
     ▼
┌────────────────────┐
│ Server Processes   │
│ & Responds         │
└────┬───────────────┘
     │
     ▼
┌────────────────────┐
│ Update Local Cache │
│ App Back to Sync   │
└────────────────────┘
```

---

## ✨ Core Features

### 🗺️ **Real-time GIS Intelligence**
- Mapbox GL JS integration with vector tiles
- Live incident tracking on interactive map
- Unit telemetry with GPS coordinates
- Heatmap overlays for risk concentration
- 3D terrain visualization
- Layer toggling (incidents, units, shelters, weather)

### 🤖 **AI-Powered Insights**
- Incident severity prediction
- Optimal dispatch recommendations
- Resource allocation optimization
- Trend analysis and forecasting
- Confidence scoring on predictions
- Explainable AI decisions

### 📱 **Multi-Agency Coordination**
- Unified incident feed across agencies
- Agency-specific dashboards
- Cross-agency communication
- Resource sharing and requests
- Incident ownership and assignment
- Activity audit trails

### 🔌 **Offline & Resilience**
- Progressive Web App (PWA) with Service Worker
- Local caching of critical data
- Action queue for offline operations
- Automatic sync when online
- SMS/Phone fallback mode
- Network degradation detection

### 👥 **Role-Based Access Control (RBAC)**
```
Role Hierarchy:
- Government Command      → Full system access, strategic decisions
- NDRF Dispatcher        → Unit management, real-time dispatch
- Medical Triage         → Patient management, shelter allocation
- NGO Logistics          → Supply chain, resource distribution
- Data Analyst           → Predictive models, trend analysis
- Civilian               → Alerts only, limited visibility
```

### ♿ **Accessibility (WCAG 2.1 AA)**
- Semantic HTML structure
- ARIA labels and descriptions
- Keyboard navigation support
- Color contrast 4.5:1 minimum
- Focus indicators on all elements
- Reduced motion support
- Screen reader compatible
- High contrast mode support

### 📊 **Real-time Dashboards**
- Incident severity distribution
- Unit deployment status
- Resource availability tracking
- Response time metrics
- Weather integration
- Predictive analytics

---

## 🏗️ Tech Stack

| Layer | Technology | Purpose | Version |
|-------|-----------|---------|---------|
| **Frontend Framework** | Next.js | React SSR, Server Components | 14.0.0 |
| **UI Library** | React | Component-based UI | 18.2.0 |
| **Styling** | Tailwind CSS | Utility-first CSS | 3.3.0 |
| **State Management** | Zustand | Lightweight stores | 4.4.7 |
| **Real-time** | WebSocket | Live data streaming | Native |
| **3D Graphics** | Three.js | Globe visualization | 0.154.0 |
| **Maps/GIS** | Mapbox GL JS | Vector maps | 2.15.0 |
| **Charts** | Recharts | Data visualization | 2.10.0 |
| **Icons** | Lucide React | UI icons | 0.294.0 |
| **Date Utils** | date-fns | Date manipulation | 2.30.0 |
| **Immutability** | Immer | State immutability | 10.0.0 |
| **Language** | TypeScript | Type safety | 5.2.0 |
| **Linting** | ESLint | Code quality | 8.48.0 |
| **Formatting** | Prettier | Code formatting | 3.0.0 |
| **Deployment** | Vercel | Edge network | - |
| **Database** | Supabase | PostgreSQL + realtime | Optional |
| **Container** | Docker | Consistent environments | Optional |

---

## 📁 Project Structure

```
aegisflow/
│
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── layout.tsx                   # Root layout
│   │   ├── page.tsx                     # Homepage
│   │   ├── globals.css                  # Global styles
│   │   ├── (auth)/                      # Auth pages
│   │   │   ├── login/
│   │   │   └── logout/
│   │   ├── (dashboard)/                 # Protected routes
│   │   │   ├── layout.tsx               # Dashboard layout
│   │   │   ├── page.tsx                 # Main dashboard
│   │   │   ├── incidents/               # Incident management
│   │   │   ├── dispatch/                # Dispatch console
│   │   │   ├── map/                     # Map view
│   │   │   └── analytics/               # Analytics
│   │   └── api/                         # API routes
│   │       ├── auth/                    # Auth endpoints
│   │       ├── incidents/               # Incident CRUD
│   │       └── units/                   # Unit endpoints
│   │
│   ├── components/                      # React Components
│   │   ├── common/                      # Shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Loading.tsx
│   │   ├── dashboard/                   # Dashboard components
│   │   │   ├── IncidentCard.tsx
│   │   │   ├── UnitTracker.tsx
│   │   │   └── StatsPanel.tsx
│   │   ├── maps/                        # Map components
│   │   │   ├── MapContainer.tsx
│   │   │   └── MapLayers.tsx
│   │   └── forms/                       # Form components
│   │       └── IncidentForm.tsx
│   │
│   ├── lib/                             # Library code
│   │   ├── stores/                      # Zustand stores
│   │   │   ├── useAuthStore.ts          # Auth & RBAC
│   │   │   ├── useOperationsStore.ts    # Incidents, units
│   │   │   └── useGISStore.ts           # Map state
│   │   ├── hooks/                       # Custom hooks
│   │   │   ├── useWebSocket.ts          # WebSocket hook
│   │   │   ├── useAuth.ts               # Auth logic
│   │   │   └── usePagination.ts         # Pagination
│   │   ├── ws/                          # WebSocket
│   │   │   └── wsManager.ts             # Manager class
│   │   ├── services/                    # API services
│   │   │   ├── api.ts                   # HTTP client
│   │   │   ├── auth.ts                  # Auth service
│   │   │   └── incidents.ts             # Incident service
│   │   ├── utils/                       # Utilities
│   │   │   ├── format.ts                # Formatters
│   │   │   ├── validation.ts            # Validators
│   │   │   └── constants.ts             # Constants
│   │   └── types/                       # TypeScript types
│   │       ├── auth.ts
│   │       ├── incident.ts
│   │       └── unit.ts
│   │
│   └── styles/                          # Global styles
│       └── globals.css
│
├── public/                              # Static assets
│   ├── icons/                           # App icons
│   ├── images/                          # Images
│   └── manifest.json                    # PWA manifest
│
├── .github/
│   └── workflows/                       # CI/CD pipelines
│       └── nextjs.yml                   # GitHub Actions
│
├── docker/                              # Docker setup
│   ├── Dockerfile                       # Production image
│   └── docker-compose.yml               # Local development
│
├── Configuration Files:
│   ├── .env.example                     # Environment template
│   ├── .eslintrc.json                   # ESLint config
│   ├── .prettierrc                      # Prettier config
│   ├── tsconfig.json                    # TypeScript config
│   ├── tailwind.config.ts               # Tailwind config
│   ├── next.config.js                   # Next.js config
│   ├── postcss.config.js                # PostCSS config
│   ├── package.json                     # Dependencies
│   └── Dockerfile                       # Container setup
│
└── Documentation:
    ├── README.md                        # This file
    ├── SETUP.md                         # Development setup
    ├── DEPLOYMENT.md                    # Deployment guide
    ├── CONTRIBUTING.md                  # Contribution guidelines
    └── TUNNELING_DEPLOYMENT.md          # Local tunneling guide
```

---

## 🧠 State Management Architecture

### Zustand Store Pattern

```typescript
// useAuthStore - Authentication & RBAC
{
  user: User | null,                    // Current user
  isAuthenticated: boolean,              // Auth state
  token: string | null,                  // JWT token
  refreshToken: string | null,           // Refresh token
  expiresAt: number | null,              // Token expiry
  
  // Actions
  login(email, password),                // Login action
  logout(),                              // Logout action
  refreshAuthToken(),                    // Token refresh
  hasPermission(permission),             // Check permission
  isRole(role),                          // Check role
  checkTokenExpiry(),                    // Verify token
}

// useOperationsStore - Business Data
{
  incidents: Incident[],                 // All incidents
  units: Unit[],                         // All units
  dispatches: Dispatch[],                // All dispatches
  shelters: Shelter[],                   // Shelter info
  
  // Actions
  addIncident(incident),
  updateIncident(id, data),
  removeIncident(id),
  // ... more actions
}

// useGISStore - Map State
{
  viewport: ViewportState,               // Map position
  layers: Layer[],                       // Active layers
  selectedFeature: Feature | null,       // Clicked feature
  
  // Actions
  setViewport(viewport),
  toggleLayer(layerId),
  selectFeature(feature),
}
```

### Store Updates via WebSocket

```typescript
// WebSocket flow:
wsManager.subscribe('INCIDENT_UPDATED', (payload) => {
  useOperationsStore.setState((state) => ({
    incidents: state.incidents.map((inc) =>
      inc.id === payload.id ? payload : inc
    ),
  }))
})
```

---

## 🔧 Development Guide

### Getting Started

```bash
# 1. Clone repository
git clone https://github.com/JusalDesai1/AegisFlow.git
cd AegisFlow

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local

# 4. Edit .env.local with your configuration
# NEXT_PUBLIC_MAPBOX_TOKEN=your_token
# NEXT_PUBLIC_WS_URL=ws://localhost:8080

# 5. Start development server
npm run dev

# 6. Open browser
open http://localhost:3000
```

### Available Scripts

```bash
npm run dev              # Development server (hot reload)
npm run build            # Production build
npm run start            # Production server
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run test             # Run tests
npm run test:watch       # Test watch mode
npm run test:coverage    # Coverage report
```

### Code Style Guidelines

**TypeScript:**
- Strict mode enabled
- No `any` types (use `unknown` or proper typing)
- Explicit function return types
- Interface over type for object shapes

**Components:**
- Functional components with hooks
- Component composition over inheritance
- Custom hooks for logic extraction
- JSDoc comments on exports

**Naming Conventions:**
```typescript
// Components: PascalCase
export const IncidentCard = () => {}

// Functions: camelCase
export const formatIncidentData = () => {}

// Constants: UPPER_SNAKE_CASE
export const MAX_RETRIES = 5

// Types/Interfaces: PascalCase
interface IncidentData {}
type UserRole = 'admin' | 'user'

// Private: underscore prefix
const _privateHelper = () => {}
```

**Commit Messages:**
```
feat: add incident real-time updates
fix: resolve map zoom issue on mobile
docs: update deployment guide
chore: update dependencies
style: format code with Prettier
refactor: simplify incident service
```

---

## 🚀 Deployment

### Quick Deployment to Vercel

```bash
# 1. Create Vercel account (if not already)
# 2. Connect GitHub repository
# 3. Environment variables in Vercel dashboard:
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
NEXT_PUBLIC_WS_URL=wss://ws.your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com

# 4. Push to main branch
git push origin main

# 5. Vercel auto-deploys!
```

### Production Checklist

- [ ] All environment variables configured
- [ ] API endpoints updated for production
- [ ] WebSocket URL points to production
- [ ] Database connections configured
- [ ] SSL/TLS certificates installed
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Monitoring/logging set up
- [ ] Backup strategy in place
- [ ] Disaster recovery plan documented

### Monitoring & Logging

```bash
# Sentry (Error tracking)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id

# Custom logging
import { logger } from '@/lib/services/logger'
logger.info('Incident created', { id, data })
```

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** with proper commit messages
4. **Write/update tests** for your changes
5. **Ensure code quality** (`npm run lint:fix` and `npm run type-check`)
6. **Push to your fork** (`git push origin feature/amazing-feature`)
7. **Create a Pull Request** with detailed description

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] No ESLint warnings
- [ ] Tests pass (`npm run test`)
- [ ] Accessibility is maintained (WCAG 2.1 AA)
- [ ] Documentation updated
- [ ] No console errors in development

---

## 📈 Performance Metrics

Target metrics for production:

| Metric | Target | Current |
|--------|--------|---------|
| **Lighthouse Score** | 90+ | - |
| **First Contentful Paint** | < 1.5s | - |
| **Largest Contentful Paint** | < 2.5s | - |
| **Cumulative Layout Shift** | < 0.1 | - |
| **Time to Interactive** | < 3.5s | - |
| **Bundle Size** | < 500KB | - |

---

## 🔒 Security Considerations

### Authentication
- JWT tokens with expiry (default: 1 hour)
- Refresh tokens for session extension
- Secure token storage in httpOnly cookies
- Token rotation on each refresh

### API Security
- CORS properly configured
- Rate limiting on all endpoints
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS protection (CSP headers)

### Data Protection
- Encryption at rest (database)
- Encryption in transit (HTTPS/TLS)
- GDPR compliance for user data
- Data retention policies
- Audit logging of sensitive operations

### Infrastructure
- DDoS protection via Vercel
- WAF (Web Application Firewall)
- Regular security updates
- Dependency vulnerability scanning
- Penetration testing (recommended)

---

## 📞 Support & Contact

- **Issues:** [GitHub Issues](https://github.com/JusalDesai1/AegisFlow/issues)
- **Discussions:** [GitHub Discussions](https://github.com/JusalDesai1/AegisFlow/discussions)
- **Email:** jusaldesai.co25d2@scet.ac.in
- **Documentation:** See [SETUP.md](./SETUP.md), [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📄 License

AegisFlow is licensed under the **Apache 2.0 License**. See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- NDRF for requirements and use cases
- Emergency response teams for feedback
- Open-source community for amazing libraries
- All contributors and supporters

---

## 🎯 Future Roadmap

### Q3 2026
- [ ] Mobile native app (React Native)
- [ ] Advanced AI predictions
- [ ] Multi-language support

### Q4 2026
- [ ] Integration with government systems
- [ ] SMS/WhatsApp notifications
- [ ] Video streaming capabilities

### Q1 2027
- [ ] Drone integration
- [ ] Blockchain for audit trails
- [ ] AR visualization support

---

**Made with ❤️ for emergency responders worldwide.**

🚨 **Saving lives, one incident at a time.** 🚨
