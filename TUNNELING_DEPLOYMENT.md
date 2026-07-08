# 🌐 AegisFlow - Tunneling Deployment Guide

**Status:** Complete guide for deploying AegisFlow locally with secure public access using tunneling  
**Last Updated:** July 8, 2026  
**Best For:** Development-to-production workflow, testing with external services, and secure remote access

---

## 📋 Overview

Tunneling creates a secure bridge between your local machine and the internet, allowing you to:
- ✅ Deploy from localhost without external servers
- ✅ Test webhooks and external API integrations
- ✅ Share work with team members via public URL
- ✅ Maintain security with encrypted connections
- ✅ Avoid port forwarding complexity

---

## 🔧 Tunneling Solutions Comparison

| Solution | Setup Time | Cost | Best For | Speed |
|----------|-----------|------|----------|-------|
| **ngrok** | 2 min | Free tier + paid | Quick testing | Excellent |
| **Cloudflare Tunnel** | 3 min | Free | Long-term dev | Great |
| **LocalTunnel** | 1 min | Free | One-off demos | Good |
| **Localtunnel** | 1 min | Free | Quick testing | Good |
| **Serveo** | 1 min | Free | Minimal setup | Good |

---

## 🚀 Method 1: ngrok (Recommended)

### Step 1: Install ngrok

```bash
# macOS (Homebrew)
brew install ngrok

# Linux
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/ngrok.gpg
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.list | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok

# Windows (PowerShell)
choco install ngrok
# or download from https://ngrok.com/download
```

### Step 2: Authenticate ngrok

```bash
# Get authtoken from https://dashboard.ngrok.com/auth
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Step 3: Start AegisFlow Locally

```bash
cd AegisFlow

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Server runs on http://localhost:3000
```

### Step 4: Create ngrok Tunnel

**In a new terminal:**

```bash
# Create HTTP tunnel for port 3000
ngrok http 3000

# Output will show:
# Forwarding                    https://abc123def456.ngrok.io -> http://localhost:3000
```

**Your public URL:** `https://abc123def456.ngrok.io`

### Step 5: Configure Environment Variables

```bash
# Update .env.local with public URL
cat > .env.local << 'EOF'
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_API_URL=https://abc123def456.ngrok.io/api
NEXT_PUBLIC_WS_URL=wss://abc123def456.ngrok.io
NEXT_PUBLIC_MAPBOX_TOKEN=pk_your_mapbox_token_here
EOF
```

### Advanced ngrok Configuration

Create `ngrok.yml` for persistent configuration:

```yaml
# ~/.ngrok2/ngrok.yml
authtoken: YOUR_AUTH_TOKEN
version: "2"

tunnels:
  aegisflow-dev:
    proto: http
    addr: 3000
    subdomain: aegisflow-dev
    
  aegisflow-api:
    proto: http
    addr: 3001
    subdomain: aegisflow-api
```

Start with config:
```bash
ngrok start aegisflow-dev
```

---

## 🌊 Method 2: Cloudflare Tunnel (Best for Long-Term)

### Step 1: Install Cloudflare CLI

```bash
# macOS
brew install cloudflared

# Linux
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb

# Windows
choco install cloudflare-warp
```

### Step 2: Authenticate

```bash
cloudflared tunnel login
# Opens browser for Cloudflare login
```

### Step 3: Create Persistent Tunnel

```bash
# Create tunnel named 'aegisflow'
cloudflared tunnel create aegisflow

# Get tunnel ID
cloudflared tunnel list
# Output: aegisflow <UUID> ...
```

### Step 4: Configure Tunnel

Create `~/.cloudflared/config.yml`:

```yaml
tunnel: aegisflow
credentials-file: /Users/YOUR_USERNAME/.cloudflared/aegisflow.json

ingress:
  - hostname: aegisflow.yourdomain.com
    service: http://localhost:3000
  - service: http_status:404
```

### Step 5: Route DNS to Tunnel

```bash
# Point domain to Cloudflare tunnel
cloudflared tunnel route dns aegisflow aegisflow.yourdomain.com
```

### Step 6: Start Tunnel

```bash
cloudflared tunnel run aegisflow

# Runs in foreground - your app is now live at:
# https://aegisflow.yourdomain.com
```

### Run as Background Service

```bash
# macOS/Linux
cloudflared service install
cloudflared service start

# View logs
cloudflared service logs

# Stop service
cloudflared service stop
```

---

## 🔌 Method 3: LocalTunnel (Simplest)

### Step 1: Install & Run

```bash
# Install globally
npm install -g localtunnel

# Expose port 3000
lt --port 3000

# Output:
# your url is: https://cool-jaguar-26.loca.lt
```

### Step 2: Custom Subdomain (Paid)

```bash
lt --port 3000 --subdomain aegisflow

# https://aegisflow.loca.lt
```

---

## 🚨 Method 4: Serveo (No Registration)

```bash
# Simplest - no installation needed!
ssh -R 80:localhost:3000 serveo.net

# Output shows:
# Forwarding HTTP traffic from https://[random-string].serveo.net
```

---

## 🔐 Security Best Practices for Tunneling

### 1. Protect Sensitive Endpoints

```typescript
// src/middleware.ts (Next.js)
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Protect admin routes with IP whitelist
  if (url.pathname.startsWith('/admin')) {
    const clientIP = request.ip || request.headers.get('x-forwarded-for')
    const allowedIPs = ['YOUR_IP_ADDRESS']
    
    if (!allowedIPs.includes(clientIP || '')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
```

### 2. Set API Rate Limiting

```bash
# Add to vercel.json for rate limiting
{
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        { "key": "X-RateLimit-Limit", "value": "100" },
        { "key": "X-RateLimit-Remaining", "value": "99" }
      ]
    }
  ]
}
```

### 3. Use OAuth/JWT for Authentication

```bash
# Environment variables
NEXT_PUBLIC_API_URL=https://your-tunnel-url.ngrok.io
JWT_SECRET=your_secret_key_here
OAUTH_CLIENT_ID=github_client_id
OAUTH_CLIENT_SECRET=github_client_secret
```

### 4. Enable ngrok Security Features

```bash
# Run with password protection
ngrok http 3000 --basic-auth="user:password"

# With OAuth
ngrok http 3000 --oauth=google --oauth-allow-domain=yourdomain.com
```

---

## 📊 Tunneling Deployment Checklist

### Pre-Deployment

- [ ] Local dev server running (`npm run dev`)
- [ ] All environment variables configured
- [ ] `.env.local` file exists with Mapbox token
- [ ] Dependencies installed (`npm install`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] ESLint passes (`npm run lint`)

### During Deployment

- [ ] Tunneling service installed and authenticated
- [ ] Tunnel created and running
- [ ] Public URL accessible in browser
- [ ] Environment variable for tunnel URL configured
- [ ] SSL certificate valid (auto-handled by ngrok/Cloudflare)

### Post-Deployment

- [ ] Homepage loads without errors
- [ ] Dashboard accessible
- [ ] Map loads (if Mapbox token present)
- [ ] No console errors (F12 → Console)
- [ ] Network tab shows successful requests
- [ ] Mobile view responsive
- [ ] Forms submit correctly

---

## 🧪 Testing Tunneled Application

### Quick Health Check

```bash
# Replace with your tunnel URL
TUNNEL_URL="https://abc123def456.ngrok.io"

# 1. Check homepage
curl -I $TUNNEL_URL

# 2. Verify SSL certificate
curl -v $TUNNEL_URL 2>&1 | grep "SSL certificate"

# 3. Check API health (if endpoint exists)
curl $TUNNEL_URL/api/health

# 4. Test WebSocket connection
wscat -c wss://abc123def456.ngrok.io/api/ws
```

### Browser Testing

```javascript
// In browser console
fetch('https://your-tunnel-url/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

---

## 🌐 Sharing Public URL with Team

### ngrok Dashboard

```bash
# View real-time traffic
# https://dashboard.ngrok.com/endpoints/status
```

### Share Safe Link

```bash
# ngrok generates shareable links
# https://dashboard.ngrok.com/share/

# Click "Share" button for public link with analytics
```

### Team Communication

```
📢 Announcement:
Staging environment ready for testing:
🔗 https://abc123def456.ngrok.io

Environment:
- 🗺️ GIS: Live with Mapbox
- 🔌 API: Mock endpoints
- 📡 WebSocket: Simulated real-time
- 📊 Dashboard: Role-based views

Duration: Next 8 hours
Credentials: admin@aegis.gov / password
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Tunneling service not found"

```bash
# Solution: Reinstall and authenticate
npm uninstall -g localtunnel
npm install -g localtunnel
lt --port 3000
```

### Issue 2: "Connection refused"

```bash
# Ensure dev server is running
npm run dev

# Verify port 3000 is available
lsof -i :3000

# If occupied, use different port
npm run dev -- -p 3001
lt --port 3001
```

### Issue 3: "SSL certificate error"

```bash
# ngrok handles SSL automatically
# If still failing, try:
ngrok http 3000 --scheme http

# Or use older version
ngrok update  # Update to latest
```

### Issue 4: "Mapbox not loading through tunnel"

```bash
# Verify Mapbox token in environment
echo $NEXT_PUBLIC_MAPBOX_TOKEN

# Check CORS headers
curl -I https://your-tunnel-url.ngrok.io \
  | grep -i "access-control"

# Allow all origins (development only!)
# Update next.config.js
async headers() {
  return [
    {
      source: "/",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        }
      ]
    }
  ]
}
```

### Issue 5: "Tunnel disconnects randomly"

```bash
# Keep tunnel alive with longer timeout
ngrok http 3000 --max-conn-backlog 1000

# Or use Cloudflare Tunnel (more stable)
cloudflared tunnel run aegisflow
```

---

## 📈 Monitoring Tunnel Traffic

### ngrok Inspection

```bash
# View real-time requests
# http://127.0.0.1:4040/inspect/http

# API to get traffic data
curl http://127.0.0.1:4040/api/requests/http | jq
```

### Cloudflare Analytics

```bash
# View tunnel analytics
cloudflared tunnel info aegisflow

# Real-time logs
cloudflared tunnel run aegisflow --verbose
```

---

## 🔄 Workflow: Tunneling + External Services

### Scenario: Testing Webhook Integration

```bash
# 1. Start tunnel
ngrok http 3000
# Tunnel URL: https://abc123def456.ngrok.io

# 2. Configure webhook in external service
# Webhook URL: https://abc123def456.ngrok.io/api/webhooks/incident

# 3. Create API endpoint
# src/pages/api/webhooks/incident.ts
export async function POST(req: Request) {
  const payload = await req.json()
  console.log('Webhook received:', payload)
  return Response.json({ success: true })
}

# 4. Trigger webhook from external service
# View traffic at: http://127.0.0.1:4040
```

---

## 🚀 Advanced: Tunneling + Docker

```bash
# Run AegisFlow in Docker with tunnel
docker-compose up

# In separate terminal, expose Docker container
ngrok http 3000

# Now accessible at tunnel URL
```

**docker-compose.yml:**
```yaml
version: '3.9'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN}
      - NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
    volumes:
      - .:/app
      - /app/node_modules
```

---

## 📞 When to Use Each Tunneling Method

| Scenario | Recommended | Why |
|----------|-------------|-----|
| Quick demo to client | **ngrok** | Setup in 2 min, works reliably |
| Long-term staging | **Cloudflare Tunnel** | Free, stable, scalable |
| One-off testing | **LocalTunnel** | Minimal setup, no auth |
| CI/CD integration | **ngrok API** | Programmatic control |
| Production preview | **Cloudflare + DNS** | Enterprise-grade security |

---

## 🎯 Next Steps After Tunneling

1. **Test Thoroughly** - Verify all features work over public URL
2. **Document URL** - Share with team for feedback
3. **Monitor Traffic** - Watch logs for errors
4. **Deploy Production** - Use Vercel/Docker when ready
5. **Archive Logs** - Keep tunnel logs for debugging

---

## 📚 Resources

| Resource | URL |
|----------|-----|
| ngrok Docs | https://ngrok.com/docs |
| Cloudflare Tunnel | https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/ |
| LocalTunnel Repo | https://github.com/localtunnel/localtunnel |
| AegisFlow README | [README.md](./README.md) |
| Vercel Deployment | [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) |

---

## 🆘 Need Help?

```bash
# Check tunneling service logs
ngrok config logs

# Verify local server
curl http://localhost:3000

# Test tunnel connectivity
curl https://your-tunnel-url.ngrok.io

# Run diagnostics
ngrok diagnose
```

---

**Status:** ✅ Ready for tunneled deployment  
**Version:** 1.0.0  
**Last Updated:** July 8, 2026
