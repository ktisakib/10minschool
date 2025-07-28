# Frontend Engineer (Level 1) Assessment – 10 Minute School

This repository contains the solution for the following assessment:

> **Task:** Design a product page like ‘IELTS Course by Munzereen Shahid’ using React/Next.js, TailwindCSS, and TypeScript. The page should fetch data from the public API and implement the required sections as described below.

## 📝 Assessment Details

- **Reference Page:** [IELTS Course by Munzereen Shahid](https://10minuteschool.com/product/ielts-course/)
- **API Endpoint:**
  - `https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course`
  - Query param: `lang=en` or `lang=bn`
  - Required header: `X-TENMS-SOURCE-PLATFORM: web`
- **API Example:**

```bash
curl --request GET \
  --url 'https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en' \
  --header 'X-TENMS-SOURCE-PLATFORM: web' \
  --header 'accept: application/json'
```

- **Tech Stack:** React/Next.js, TypeScript, TailwindCSS
- **Submission:** Build version via GitHub (Dockerfile optional)
- **Deadline:** 28th July, 11:59 PM

## 🚀 How to Start the Web App

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Copy environment variables:**
   - Copy `apps/web/.env.example` to `apps/web/.env`:
     ```bash
     cp apps/web/.env.example apps/web/.env
     ```
   - Edit the `.env` files and update values as needed (e.g., database credentials, OAuth secrets).

3. **Start the web app in development mode:**
   ```bash
   pnpm dev --filter @enterprise/web 
   ```
   The app will run at [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   pnpm build --filter @enterprise/web 
   pnpm start --filter @enterprise/web 
   ```

## 🖥️ Product Page Implementation Guide

The product page fetches and displays data from the API. Key features:

- **Title:** Product title
- **Description:** Rich HTML description
- **Course Instructors:** From `sections` (type=instructor)
- **Product Trailer:** YouTube player (from `media`)
- **Price:** Hardcoded as 1000
- **CTA Text:** From `cta_text`
- **Localization:** Supports English/Bangla via API param
- **SSR:** Server-side rendering with Next.js
- **SEO:** Uses SEO data from API (pass required header)
- **Check List:** From `checklist`
- **Course Layout:** From `sections` (type=features)
- **Learning Outcomes:** From `sections` (type=pointers)
- **Course Details:** From `sections` (type=about)
- **Reusable Components:** Built with TypeScript and TailwindCSS

## 🗂️ Project Structure

```
apps/
  web/         # Next.js web application (product page)
packages/
  ui/          # Shared UI components
  db/          # Database schema and client
  trpc/        # API layer
  ...
```

## 🧑‍💻 Development Scripts

```bash
pnpm dev              # Start all dev servers
pnpm --filter apps/web dev    # Start only web app
pnpm build            # Build all apps
pnpm lint             # Lint all packages
pnpm format           # Format code
pnpm typecheck        # Type check all packages
```

## 📦 Submission Checklist
- [x] All required sections implemented as per assessment
- [x] SSR and localization supported
- [x] SEO data used from API
- [x] .env files created from .env.example
- [x] App runs with `pnpm dev --filter @enterprise/web`
- [x] Build and start commands tested
- [x] Code is clean, typed, and uses reusable components
- [x] Docker file added 



## 📄 License
This project is private and proprietary.
