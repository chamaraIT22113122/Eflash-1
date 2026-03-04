# MongoDB + Netlify Deployment Guide

## 🏗️ Architecture Overview

This project uses a **dual-deployment** setup:

| What | Where | URL |
|------|-------|-----|
| **Frontend** (React/static files) | GitHub Pages | `https://chamarait22113122.github.io/Eflash-1/` |
| **Backend** (Netlify Functions + MongoDB) | Netlify | `https://eflash-1.vercel.app/api` |

The GitHub Pages site calls the Netlify Functions API for all project/review CRUD.
Projects are stored in **MongoDB Atlas** and persist forever — surviving all page refreshes.

---

## ✅ Current Status (Already Configured)

- ✅ `projectService.js` → calls `https://eflash-1.vercel.app/api`
- ✅ `deploy.ps1` → bakes the correct Netlify API URL into every GitHub Pages build
- ✅ CORS headers → `Access-Control-Allow-Origin: *` on all Netlify Functions
- ✅ Fallback → if Netlify is unreachable, data saves to browser `localStorage`

---

## 🔧 One-Time Netlify Setup (Required)

### Step 1 — Connect Netlify to your GitHub repo

1. Go to **[app.netlify.com](https://app.netlify.com)**
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → select `chamaraIT22113122/Eflash-1`
4. Build settings:
   ```
   Build command:      npm run build
   Publish directory:  dist
   Functions directory: netlify/functions
   ```

### Step 2 — Add Environment Variables in Netlify

Go to **Site Settings → Environment Variables** and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://Eflash24:Eflash24@cluster0.fjn7skv.mongodb.net/?appName=Cluster0` |

> ⚠️ This is the **only** env variable Netlify needs. The Functions use it to connect to MongoDB.

### Step 3 — Add MongoDB Atlas IP Whitelist

1. Go to **[cloud.mongodb.com](https://cloud.mongodb.com)**
2. **Network Access** → **Add IP Address**
3. Click **"Allow Access from Anywhere"** → `0.0.0.0/0`

> This is required so Netlify's dynamic IPs can reach MongoDB Atlas.

### Step 4 — Deploy Netlify

Click **"Deploy site"** in Netlify. After 1-2 minutes your Functions will be live at:
```
https://eflash-1.vercel.app/api/projects
https://eflash-1.vercel.app/api/reviews
```

---

## � Deploying the GitHub Pages Frontend

Run this command to build and deploy the frontend:

```powershell
npm run deploy
```

This runs `deploy.ps1` which:
1. Sets `VITE_API_BASE=https://eflash-1.vercel.app/api`
2. Builds the React app (with the Netlify URL baked in)
3. Copies built files to the repo root
4. Commits and pushes to GitHub → GitHub Pages auto-serves them

---

## 📡 API Endpoints

Base URL: `https://eflash-1.vercel.app/api`

### Projects
| Method | Endpoint | Action |
|--------|----------|--------|
| GET | `/projects` | Get all projects |
| POST | `/projects` | Create new project |
| PUT | `/projects/{id}` | Update project |
| DELETE | `/projects/{id}` | Delete project |

### Reviews
| Method | Endpoint | Action |
|--------|----------|--------|
| GET | `/reviews` | Get all reviews |
| POST | `/reviews` | Create new review |
| PUT | `/reviews/{id}` | Update review |
| DELETE | `/reviews/{id}` | Delete review |

---

## 🗄️ Database Schema

### `eflash.projects` Collection
```javascript
{
  _id: ObjectId,           // MongoDB auto-generated ID
  title: "Project Name",
  description: "Short description shown on card",
  category: "Web Design",
  tags: ["tag1", "tag2"],
  technologies: ["React", "MongoDB"],
  liveUrl: "https://example.com",
  thumbnail: "https://... or base64",
  images: ["https://...", "base64..."],
  features: ["Feature 1", "Feature 2"],
  clientName: "Acme Corp",
  projectDate: "2024-01",
  duration: "4 weeks",
  challenge: "Description of challenge",
  solution: "How it was solved",
  result: "Measurable outcomes",
  stats: {
    users: "500+",
    pages: "12",
    performance: "98/100",
    completion: "On time"
  },
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### `eflash.reviews` Collection
```javascript
{
  _id: ObjectId,
  name: "Customer Name",
  email: "customer@email.com",
  rating: 5,
  message: "Great service!",
  status: "approved",    // "pending" | "approved" | "rejected"
  createdAt: ISODate,
  updatedAt: ISODate
}
```

---

## 🔄 How Data Persistence Works

```
Admin adds a project
       ↓
projectService.addProject()
       ↓
  POST → https://eflash-1.vercel.app/api/projects
       ↓
  Netlify Function → MongoDB Atlas (saved forever)
       ↓
Page refresh → GET /projects → returns from MongoDB
       ↓
  ✅ Projects are still there!
```

If the Netlify API is **unreachable** (offline/error):
- Data saves to browser `localStorage` as a fallback
- Shows message: *"Failed to load projects. Using offline mode."*
- Data only persists in that specific browser until the API is back

---

## � Troubleshooting

### Projects disappear after refresh?
1. Open browser **DevTools → Network tab**
2. Refresh page and look for the `/projects` request
3. If it shows **404 or network error** → Netlify Functions are not running
   - Check Netlify dashboard → **Functions** tab → look for errors
   - Verify `MONGODB_URI` is set in Netlify **Site Settings → Environment Variables**
4. If it shows **500 error** → MongoDB connection failed
   - Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
   - Verify the connection string is correct

### CORS errors in browser console?
All Netlify Functions already have:
```javascript
'Access-Control-Allow-Origin': '*'
```
If you still get CORS errors, check that the Netlify URL in `projectService.js` matches exactly.

### Admin panel shows "Using offline mode"?
The Netlify Functions cannot be reached. Ensure:
1. Netlify site is deployed and active
2. `MONGODB_URI` environment variable is set in Netlify
3. MongoDB Atlas allows all IPs (`0.0.0.0/0`)

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `src/utils/projectService.js` | API client — calls Netlify Functions |
| `netlify/functions/projects.js` | Netlify Function — CRUD for projects |
| `netlify/functions/reviews.js` | Netlify Function — CRUD for reviews |
| `netlify/functions/data.js` | Netlify Function — generic collection API |
| `netlify.toml` | Netlify build & functions config |
| `deploy.ps1` | GitHub Pages deploy script |
| `.env` | Local dev secrets (gitignored — never committed) |

---

**Live URLs:**
- 🌐 **Frontend**: https://chamarait22113122.github.io/Eflash-1/
- ⚡ **API**: https://eflash-1.vercel.app/api/