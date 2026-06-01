# AegisFlow Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Advantages:**
- Zero-config Next.js deployment
- Global edge network (50+ regions)
- Automatic CI/CD pipeline
- Built-in monitoring & analytics
- Free tier available

**Setup:**

```bash
# 1. Push code to GitHub
git push origin main

# 2. Import on Vercel
# Go to https://vercel.com/import
# Select GitHub repository
# Configure environment variables:
#   - NEXT_PUBLIC_MAPBOX_TOKEN
#   - NEXT_PUBLIC_API_URL (production)
#   - DATABASE_URL (if using Supabase)

# 3. Deploy
# Automatic on push to main
```

**Production URL:** `https://aegisflow-prod.vercel.app`

### Option 2: Docker + Cloud Run (Google Cloud)

**Setup:**

```bash
# 1. Create Google Cloud project
gcloud projects create aegisflow --name="AegisFlow"

# 2. Enable required APIs
gcloud services enable run.googleapis.com

# 3. Build and push image
gcloud builds submit --tag gcr.io/aegisflow/web

# 4. Deploy to Cloud Run
gcloud run deploy aegisflow \
  --image gcr.io/aegisflow/web \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NEXT_PUBLIC_API_URL=https://api.aegisflow.io
```

### Option 3: Docker + AWS ECS

**Setup:**

```bash
# 1. Create ECR repository
aws ecr create-repository --repository-name aegisflow

# 2. Build and push
docker build -t aegisflow:latest .
aws ecr get-login-password | docker login --username AWS --password-stdin [ACCOUNT].dkr.ecr.us-east-1.amazonaws.com
docker tag aegisflow:latest [ACCOUNT].dkr.ecr.us-east-1.amazonaws.com/aegisflow:latest
docker push [ACCOUNT].dkr.ecr.us-east-1.amazonaws.com/aegisflow:latest

# 3. Create ECS Task Definition and Service
# (Use AWS Console or Terraform)
```

### Option 4: Docker + DigitalOcean App Platform

```bash
# 1. Connect GitHub repo to DigitalOcean
# 2. Create new App
# 3. Select Dockerfile
# 4. Configure environment variables
# 5. Deploy
```

---

## 📊 Infrastructure Recommendations

### For Emergency Operations (Scale: 10M+ population area)

**Frontend:**
- Vercel (auto-scales, edge optimization)
- CDN: Cloudflare (SSL, DDoS protection)

**Backend API:**
- Supabase PostgreSQL (real-time subscriptions)
- or AWS RDS (managed database)
- Redis for caching/queues

**WebSocket Server:**
- AWS AppSync (managed WebSocket)
- or Socket.io on Docker

**Storage:**
- S3/GCS for incident images/videos
- CloudFront/CDN distribution

**Monitoring:**
- Sentry (error tracking)
- New Relic (performance)
- CloudWatch (logs)
- Datadog (infrastructure)

---

## 🔐 Security Checklist

- [ ] Enable HTTPS/TLS (auto with Vercel/GCP)
- [ ] Configure environment variables (no secrets in code)
- [ ] Set up database authentication
- [ ] Enable CORS for API endpoints
- [ ] Configure CSP headers
- [ ] Enable rate limiting on API
- [ ] Set up WAF rules (SQL injection, XSS)
- [ ] Enable database backups (daily)
- [ ] Configure monitoring alerts
- [ ] Set up incident response playbooks

---

## 🧪 Testing Before Production

```bash
# 1. Build production bundle
npm run build

# 2. Test locally
npm run start

# 3. Run security scan
npm audit
npm run type-check

# 4. Load test
# Use k6, JMeter, or Locust
k6 run load-test.js

# 5. Accessibility audit
# Run axe-core or Lighthouse
```

---

## 📈 Scaling Strategy

**Phase 1:** Single region, 1000 concurrent users
- Vercel edge functions
- Supabase Postgres

**Phase 2:** Multi-region, 10,000 concurrent users
- Read replicas in each region
- WebSocket cluster (Redis Pub/Sub)
- Caching layer (Redis)

**Phase 3:** Global scale, 100,000+ concurrent users
- Database sharding
- Dedicated WebSocket infrastructure
- Message queue (RabbitMQ/Kafka)
- API gateway load balancing

---

## 🆘 Disaster Recovery

**Backup Strategy:**
- Database: Automated daily backups, retained for 30 days
- Application code: Git history (infinite)
- Configuration: Encrypted in environment variables

**Recovery Procedures:**
- Database restore: < 1 hour RTO
- Application: < 5 min (redeploy from GitHub)
- DNS failover: < 5 min

---

## 📞 Support & Escalation

- **Alerts:** PagerDuty for on-call
- **Incidents:** Status page updates
- **Communication:** Slack bot notifications

See [README.md](./README.md) for additional info.
