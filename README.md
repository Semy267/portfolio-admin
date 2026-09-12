# AI EPUB Translator — Frontend UI

Modern, fast web application for **AI-powered EPUB book translation**, built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Shadcn UI**, and **TanStack Query**.

---

## 🌟 Key Features

- 📚 **EPUB Management**: Drag & drop upload, metadata inspection, and chapter spine list.
- ⚙️ **Translation Configuration**: Language selection (English ➔ Indonesian, etc.), style instructions, submit mode (`Replace` vs `Bilingual`).
- 📖 **Glossary & Terminology**: Define custom terms and phrases with instant CRUD and toggle support.
- ⚡ **Real-Time Progress**: Live progress updates via WebSocket (Socket.IO) with fallback polling.
- 🔍 **Chapter Preview**: Side-by-side comparison of original vs translated XHTML chapters.
- 📥 **EPUB Export**: Download the verified, structure-preserved translated `.epub`.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (React 19, App Router)
- **Data Fetching & State**: [TanStack Query v5](https://tanstack.com/query)
- **UI & Styling**: [Shadcn UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Real-Time Communication**: [Socket.IO Client](https://socket.io/)

---

## 💻 Local Development

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Ensure `NEXT_PUBLIC_API_BASE` points to your backend:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment to Vercel

1. Push this repository to GitHub (`Semy267/Frontend-epub-translator`).
2. Go to [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"** ➔ **"Import Git Repository"**.
3. Select this repository.
4. In **Environment Variables**, add:
   - **Key**: `NEXT_PUBLIC_API_BASE`
   - **Value**: `https://your-backend-railway-url.up.railway.app`
5. Click **Deploy**. Vercel will build and deploy the Next.js app automatically.
