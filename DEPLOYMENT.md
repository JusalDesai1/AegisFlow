# AegisFlow Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Linting clean
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Security audit completed
- [ ] Performance tested (Lighthouse 90+)
- [ ] Accessibility verified (WCAG AA)

## Deployment Options

### Option 1: Vercel (Recommended)

**Fastest, zero-config deployment**

```bash
# Connect your GitHub repository to Vercel
# Set environment variables in Vercel dashboard
# Push to main branch → auto-deploys
```

**Benefits**:
- Global CDN
- Automatic HTTPS
- Instant rollbacks
- Edge functions
- Analytics built-in

### Option 2: Docker (Production)

```bash
# Build image
docker build -t aegisflow:v1.0.0 .

# Run with production env
docker run \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=https://api.aegisflow.gov \
  -p 3000:3000 \
  aegisflow:v1.0.0
```

### Option 3: Kubernetes

```bash
# Create namespace
kubectl create namespace aegisflow

# Deploy
kubectl apply -f k8s/deployment.yaml -n aegisflow

# Scale
kubectl scale deployment aegisflow --replicas=3 -n aegisflow
```

## Environment Setup

```bash
# Production environment variables
NEXT_PUBLIC_API_URL=https://api.aegisflow.gov
NEXT_PUBLIC_WS_URL=wss://api.aegisflow.gov
NEXT_AUTH_URL=https://aegisflow.gov
NEXT_AUTH_SECRET=$(openssl rand -base64 32)
DATABASE_URL=postgresql://user:password@db.aegisflow.gov/aegisflow
REDIS_URL=redis://cache.aegisflow.gov:6379
```

## Post-Deployment

```bash
# Verify health
curl https://aegisflow.gov/api/health

# Monitor logs
docker logs -f aegisflow

# Check metrics
Open https://aegisflow.gov/admin/metrics
```

## Rollback

```bash
# Vercel
vercel rollback

# Docker
docker pull aegisflow:v1.0.0-prev
docker run ... aegisflow:v1.0.0-prev

# Kubernetes
kubectl rollout undo deployment/aegisflow -n aegisflow
```

## Monitoring

- **Uptime**: Datadog, Pingdom, or UptimeRobot
- **Errors**: Sentry, Rollbar, or Datadog
- **Performance**: Vercel Analytics, New Relic
- **Logs**: CloudWatch, ELK Stack, or Datadog

## Scaling

- Horizontal: Load balancer + multiple instances
- Vertical: Increase server resources
- Database: Connection pooling (PgBouncer), read replicas
- Cache: Redis clusters
- CDN: Mapbox, Cloudflare, AWS CloudFront
