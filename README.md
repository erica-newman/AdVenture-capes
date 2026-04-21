# AdVenture Media — Prospect Pages

A Next.js app that generates personalized one-pagers for sales prospects. Enter call notes and industry in the admin panel; the page auto-customizes case studies, hero copy, and highlighted services.

---

## How it works

- `/admin` — password-protected form to create and manage prospect pages
- `/{slug}` — the live prospect page (e.g., `/brand-acumen`)
- Case studies, hero message, and service highlights auto-adjust based on industry + what the prospect cares about
- All data stored in Vercel KV (no database setup required)

---

## One-time setup

### 1. Push to GitHub

Create a new private repo on GitHub and push this folder:

```bash
cd adventureppc-prospects
git init
git add .
git commit -m "initial"
git remote add origin https://github.com/YOUR_USERNAME/adventureppc-prospects.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and click **Add New → Project**
2. Import your GitHub repo
3. Leave all build settings as defaults (Vercel auto-detects Next.js)
4. **Do not deploy yet** — add the environment variables first (step 3 & 4)

### 3. Create a KV database

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database → KV**
3. Name it anything (e.g., `prospects-kv`), pick the region closest to you
4. Click **Connect** — Vercel will automatically add the KV environment variables to your project

### 4. Set your admin password

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

| Name | Value |
|---|---|
| `ADMIN_PASSWORD` | choose a strong password |

### 5. Deploy

Click **Deploy** (or push any commit — Vercel auto-deploys on push).

---

## Daily use

1. Open `https://your-app.vercel.app/admin`
2. Enter your admin password
3. Click **+ New Prospect Page**
4. Fill in: name, role, company, industry, what they care about (checkboxes), call notes
5. Hit **Create Page & Open** — it redirects you to the live page
6. Use **Copy Link** to grab the URL and paste it into your follow-up email

---

## Editing a prospect after the call

Go back to `/admin`, find the prospect card, click **Edit**, update the call notes or any field, and hit **Update Page**.

---

## Local development (optional)

```bash
npm install
```

Create a `.env.local` file (copy `.env.example`) and fill in the KV credentials from your Vercel project's Storage tab. Then:

```bash
npm run dev
```

The app runs at `http://localhost:3000`. Without KV credentials the admin will show an empty list (no crash).
