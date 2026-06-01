# AegisFlow Development Environment Setup

## Prerequisites
- Node.js 18+
- Git
- Docker (optional, for Postgres/Redis)

## Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/JusalDesai1/AegisFlow.git
cd AegisFlow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 4. Start Development Server
```bash
npm run dev
```

Open http://localhost:3000

### 5. Mock Login
- Email: `admin@aegis.gov`
- Password: `password`

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:e2e         # E2E tests

# Linting
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format with Prettier

# Database
npm run db:push          # Sync schema
npm run db:studio        # Open Prisma Studio
```

## Docker Setup (Optional)

```bash
# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f app
```

## API Integration

### Setting Up Backend

1. **Database**: Use Supabase or PostgreSQL
2. **Backend API**: Node.js/Express or Supabase Functions
3. **WebSocket**: Socket.io or native WebSocket

### Mock API Responses

The frontend currently uses mock data from Zustand stores. To integrate real backend:

1. Update `src/services/api.ts` with your API endpoints
2. Update `src/services/websocket.ts` with your WebSocket URL
3. Replace mock data in stores with API calls

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run build -- --debug
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Support

For issues, check [GitHub Issues](https://github.com/JusalDesai1/AegisFlow/issues)
