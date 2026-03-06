# App Skeleton Template

A full-stack Next.js 14 template with auth, payments, uploads, filtering, and database integration. Create a new app by forking this template and swapping the domain module.

## Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: MUI (Material UI) 5
- **State/Data**: TanStack React Query 5 (persisted with localForage)
- **Forms**: React Hook Form + Zod
- **Auth**: NextAuth v5 (Google OAuth, DB sessions)
- **Database**: Drizzle ORM + MySQL (PlanetScale)
- **Payments**: Stripe (one-time + subscriptions)
- **Storage**: AWS S3 (presigned uploads)
- **HTTP**: Axios

## Quickstart

### 1. Create your app from this template

Click **"Use this template"** on GitHub, or:

```bash
gh repo create my-app --template rggf132/sugar-daddy-template
cd my-app
npm install
```

### 2. Configure your domain

Edit `src/domain.config.ts`:

```typescript
export const domainConfig = {
  tablePrefix: 'car',          // Unique prefix for your DB tables
  app: {
    name: 'AutoMarket',
    description: 'Buy and sell cars',
  },
  listing: {
    singular: 'car',
    plural: 'cars',
    searchPlaceholder: 'Search cars...',
    detailParam: 'carId',
  },
  routes: {
    listing: (id) => `/cars/${id}`,
    adminListing: (id) => `/admin/cars/${id}`,
  },
  // ...
}
```

### 3. Set up environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` / `DEV_DATABASE_URL` -- PlanetScale MySQL connection
- `NEXTAUTH_SECRET` -- Random string for session encryption
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` -- Google OAuth
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `BUCKET_NAME` -- S3
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` -- Stripe

### 4. Set up your database schema

Edit `db/schema.ts` for your domain tables. Auth tables (`user`, `account`, `session`) and shared tables (`country`, `city`, `category`) are already set up.

```bash
npm run db-push
```

### 5. Create your domain module

Replace `src/modules/events/` with your domain module:

```
src/modules/cars/
  ├── constants.ts       (fuel types, transmission types, etc.)
  ├── validations.ts     (createCarSchema, updateCarSchema)
  ├── types.ts           (Car, PaginatedCarsResponse)
  ├── hooks/             (useGetAllCars, useCreateCar, etc.)
  ├── components/        (CarsList, CarDetails, etc.)
  ├── modals/            (CreateUpdateCarModal, etc.)
  └── pages/             (CarsHomePage, CarPage)
```

### 6. Create your API routes

Replace `src/app/api/events/` with your domain API routes:

```
src/app/api/cars/
  ├── route.ts           (GET list + POST create)
  └── [carId]/
      └── route.ts       (GET + PUT + DELETE)
```

Use the generic utilities available:
- `requireAuth()` -- protect endpoints
- `requireResourceOwnership(table, id, userId, isAdmin)` -- check ownership
- `handleApiError(error)` -- consistent error responses
- `getSignedPutUrl()` / `getSignedGetUrl()` -- S3 operations

### 7. Update page routes

Create your app's page routes:

```
src/app/
  ├── page.tsx                    (home page -- import your module)
  ├── cars/[carId]/page.tsx       (detail page)
  └── admin/cars/[carId]/page.tsx (admin detail)
```

### 8. Run

```bash
npm run dev
```

## What to SWAP vs KEEP

```
SWAP (domain-specific)              KEEP (generic infrastructure)
========================            ============================
src/domain.config.ts                lib/auth.ts
db/schema.ts (domain tables)       lib/api-utils.ts
src/modules/events/ (whole dir)    lib/s3.ts
src/app/api/events/ (whole dir)    lib/stripe.ts
src/app/api/filters/route.ts       lib/validations.ts
src/app/events/ (page routes)      src/app/api/countries/
src/app/page.tsx (home page)       src/app/api/cities/
                                   src/app/api/upload-media/
                                   src/app/api/stripe/
                                   src/components/ (generic)
                                   src/elements/filters/ (generic)
                                   src/core/ (axios, react-query, theme)
                                   middleware.ts
```

## Shared Database

All apps built from this template can share a single PlanetScale database. Table isolation is achieved through the `tablePrefix` in `domain.config.ts`:

- **Shared tables** (no prefix): `country`, `city`, `category`, `sub_category`
- **Per-app tables** (prefixed): `ev_user`, `ev_event` for Events; `car_user`, `car_listing` for Cars

Each app connects to the same `DATABASE_URL` but only touches its own prefixed tables.

## Testing

```bash
npm run test        # API tests (Vitest)
npm run test:e2e    # E2E tests (Playwright)
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run test` | Run API tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run db-push` | Push schema to DB |
