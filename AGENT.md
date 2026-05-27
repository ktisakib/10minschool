# Agent Rules — Turborepo + React + Bun

Generic, reusable rules for any Turborepo monorepo using Bun and React. Load this file at the start of every prompt. These rules are **non-negotiable**.

---

## Stack Assumptions

- **Package manager:** Bun (exclusively)
- **Build system:** Turborepo
- **Language:** TypeScript (strict)
- **Frontend:** React 19+ (Next.js App Router or any React framework)
- **Linter/formatter:** Biome (preferred) — not ESLint, not Prettier
- **Runtime strategy:** Use only standard JavaScript/Web APIs (`process.env`, `fetch`, `Request`/`Response`). Zero runtime-specific APIs in application code.

---

## Running Commands — Non-Negotiable

**Always run commands from the monorepo root using `bun run <script>`.** Never call `turbo`, `npx turbo`, or `bunx turbo` directly. Root `package.json` scripts should delegate to Turborepo with the correct flags and filters.

```bash
# ❌ WRONG — never call turbo directly
npx turbo run typecheck
bunx turbo run build
turbo run dev --filter=web

# ✅ CORRECT — always use root scripts
bun run typecheck
bun run build
bun run dev
```

If a script doesn't exist for your task, add it to the root `package.json` rather than invoking turbo directly.

---

## Non-Negotiable Type Safety Rules

1. **NO `any` type.** Ever. Use proper generics, `unknown` with type guards, or specific types.
2. **NO `unknown` without narrowing.** Every `unknown` must be narrowed via a type guard before use.
3. **NO `undefined` as an explicit type.** Use optional properties (`?:`) or `| null` instead.
4. **NO type assertions (`as`)** unless absolutely necessary and documented with a comment explaining why.
5. **NO `@ts-ignore` or `@ts-expect-error`** without a linked issue or documented reason.
6. **Strict mode on.** `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true` in every `tsconfig.json`.

---

## File Size & Function Rules

1. **Max 300–500 lines per file.** If a file exceeds 300 lines, consider splitting. Hard limit at 500.
2. **One function does one thing.** No multi-purpose functions. If the name has "and" in it, split it.
3. **One export per concern.** Group related exports but keep each focused on a single responsibility.
4. **Extract early.** If a block of code needs a comment explaining what it does, extract it into a named function.

---

## No Barrel Files — Non-Negotiable

1. **Never create barrel `index.ts` files** that only re-export from other modules. Every package uses direct sub-path exports in `package.json`.
2. **Import from the specific sub-path**, not the package root. Example: `import { db } from "@app/db/client"` — never `import { db } from "@app/db"`.
3. **Package `exports` in `package.json`** map directly to source files. No `"."` entry pointing to a barrel.
4. **Third-party operators/utilities** (e.g. `eq`, `and`, `sql` from Drizzle) must be imported directly from the source library, not re-exported through internal packages.
5. **UI components** use wildcard exports: `import { Button } from "@app/ui/button"` — never `import { Button } from "@app/ui"`.

---

## Monorepo Rules

- **Internal packages use `workspace:*`** protocol.
- **Tasks defined in each package's `package.json`**, not root.
- **Root `package.json` only delegates** via `turbo run <task>`.
- **Use `catalog:` protocol** for shared dependency versions.
- **Never install the same dependency at different versions** across packages.
- **`turbo.json` declares pipelines.** Each task lists its `dependsOn`, `inputs`, and `outputs` so caching works.

---

## React Component Rules

### `<Activity>` — Prioritize Over Conditional Rendering

React 19.2+ provides `<Activity>` for hiding and restoring UI without destroying state. **This is the preferred approach** for showing/hiding content in client components. Always reach for `<Activity>` before `{condition && <Component />}` or CSS `hidden` class toggling.

```tsx
import { Activity } from "react";

<Activity mode={activeTab === "basic" ? "visible" : "hidden"}>
  <BasicInfoStep />
</Activity>
<Activity mode={activeTab === "details" ? "visible" : "hidden"}>
  <DetailsStep />
</Activity>
```

**Behavior:**
- Hidden via `display: none` — DOM and state are preserved.
- Effects are cleaned up when hidden, re-created when visible.
- Hidden content re-renders at lower priority than visible content.
- Participates in Selective Hydration (improves SSR interactive speed).

**When to use:**
- Tabs / step wizards (preserve form input, scroll position).
- Sidebars / panels / drawers (preserve expanded sections, scroll).
- Multi-step forms (preserve all field values).
- Pre-rendering likely-to-be-seen content at low priority.

**When NOT to use:**
- URL-driven navigation — use router instead.
- Server components — `<Activity>` is client-only.
- Content with no state to preserve — `&&` is fine.
- Content that should be fully unmounted (one-time toasts, error banners).

**Migration:**

| Instead of... | Use... |
|---|---|
| `{active && <Tab />}` | `<Activity mode={active ? "visible" : "hidden"}><Tab /></Activity>` |
| `<div className={step === X ? "block" : "hidden"}>` | `<Activity mode={step === X ? "visible" : "hidden"}>` |
| `{open && <Sheet />}` (with state to preserve) | `<Activity mode={open ? "visible" : "hidden"}><Sheet /></Activity>` |

**Caveats:**
- Hidden `<Activity>` wrapping only text nodes renders nothing.
- `<video>`, `<audio>`, `<iframe>` keep playing when hidden — add `useLayoutEffect` cleanup to pause.
- Effects don't run while hidden. If you rely on an Effect mounting, move logic to the cleanup function.

### Composition & Simplicity

1. **One component does one thing.** Components are primitives — compose them, don't bloat them.
2. **Prefer composition over props.** Use children and slots over flag props (`isLoading`, `hasError`).
3. **Keep components under 100 lines.** Extract sub-components when nearing this limit.
4. **No boolean prop proliferation.** If a component has 3+ boolean props, redesign with composition.
5. **Use `children` and render props** for flexible composition patterns.
6. **Isolate state per component (Lego Pattern).** Each stateful behavior owns its own hooks. Parent components are pure layout compositors with zero state.
7. **State colocation — move state down before memoizing.** Before reaching for `React.memo`, move state into a smaller subtree. `React.memo` is a last resort.
8. **SRP means one reason to change, not one thing.** Split data-fetching into a custom hook; keep the component pure presentation.
9. **Compound Components over prop soup.** Parent owns shared state via Context; named sub-components (`Card.Header`, `Accordion.Item`) consume it.

   ```tsx
   // 🔴 WRONG — prop soup
   <Accordion items={items} renderHeader={...} renderBody={...} onToggle={...} />

   // ✅ CORRECT — compound components
   <Accordion>
     <Accordion.Item>
       <Accordion.Header>Title</Accordion.Header>
       <Accordion.Body>Content</Accordion.Body>
     </Accordion.Item>
   </Accordion>
   ```

### The Boolean Trap — Non-Negotiable

**Never add boolean props to handle feature variants.** When a component exists in multiple contexts, do NOT pass configuration booleans. Instead, compose distinct variant components from shared primitives.

```tsx
// 🔴 WRONG — The Boolean Trap
<Composer
  isThread={true}
  isEditing={false}
  isForwarding={false}
  hideAttachments={true}
  hideDropZone={true}
  actions={['format', 'emoji']}
/>

// ✅ CORRECT — Distinct variant compositions
export function ChannelComposer({ channelId }: { channelId: string }) {
  return (
    <ComposerProvider channelId={channelId}>
      <ComposerFrame>
        <ComposerInput />
        <ComposerFooter><CommonActions /><SubmitButton /></ComposerFooter>
        <DropZone />
      </ComposerFrame>
    </ComposerProvider>
  );
}

export function EditComposer({ messageId }: { messageId: string }) {
  return (
    <EditComposerProvider messageId={messageId}>
      <ComposerFrame>
        <ComposerInput />
        <ComposerFooter><EmojiAction /><CancelButton /><SaveButton /></ComposerFooter>
        {/* DropZone simply omitted, not hidden via boolean */}
      </ComposerFrame>
    </EditComposerProvider>
  );
}
```

**Rules:**
1. **New context = new composition file.** Don't add a boolean to an existing component.
2. **Omit, don't hide.** Never pass `hideX={true}` or `showX={false}`.
3. **Shared primitives, distinct assemblies.** Primitives are reusable; assemblies are distinct.
4. **Context providers swap behavior, not booleans.** Different providers expose the same interface.
5. **Lift the provider when actions are outside the component.** Both input and submit button read shared context — no prop drilling.
6. **Max 2 boolean props per component.** A third boolean means you need composition.

### Data Colocation — Fetch Where You Render

**Data fetching MUST be colocated with the component that renders it.** Never fetch at the top of a tree and prop-drill down.

**Why:**
- No waterfalls from sequential fetches — independent components fetch in parallel via streaming.
- No prop drilling — each component knows what it needs.
- Independent loading states — each component has its own Suspense boundary.
- Easy to move/delete — remove a component and its data-fetching goes with it.

**Rules:**
1. **Fetch in the component that uses the data.** A `<ProductPrice>` component fetches its own price.
2. **Use caching primitives for deduplication.** Multiple components fetching the same entity get a single request.
3. **Revalidate with tags, not time.** Prefer tag-based over time-based revalidation for accuracy.
4. **Parallel by default.** Sibling components in different Suspense boundaries fetch concurrently. Never serialize independent fetches with `await` chains.
5. **Pass IDs and slugs, not data.** Parents pass the minimal identifier needed for a child to fetch its own data.

```tsx
// ✅ CORRECT — parent passes ID, child fetches
<Suspense fallback={<PriceSkeleton />}>
  <ProductPrice productId={product.id} />
</Suspense>

// 🔴 WRONG — parent fetches price and passes it down
const price = await getPrice(product.id);
<ProductPrice price={price} />
```

### Server/Client Component Separation

1. **Layouts and Pages are ALWAYS server components.** No `"use client"` on layout.tsx or page.tsx.
2. **Mark client components explicitly** with `"use client"` at the top of the file.
3. **Keep client components as leaf nodes.** Push `"use client"` boundary as far down as possible.
4. **Server components fetch data.** Client components handle interactivity.
5. **Never import server-only code in client components.** Use the `server-only` package for enforcement.

### Data Fetching Architecture — Non-Negotiable

**Pages and Layouts MUST NOT fetch data directly.** They are pure compositional shells. All data fetching lives in dedicated async server components or is passed as promises to client components via the `use()` hook.

```tsx
// ✅ CORRECT — page.tsx is a thin composition shell
export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  return (
    <>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails slug={slug} />
      </Suspense>
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews slug={slug} />
      </Suspense>
      <Suspense fallback={null}>
        <RelatedProducts slug={slug} />
      </Suspense>
    </>
  );
}

// ✅ CORRECT — async server component does the fetching
export async function ProductDetails({ slug }: { slug: string }) {
  const product = await api.product({ slug });
  return (
    <article>
      <h1>{product.name}</h1>
      <AddToCartButton productId={product.id} price={product.price} />
    </article>
  );
}
```

**Rules:**
1. **`page.tsx` / `layout.tsx` = composition + Suspense boundaries only.** No `fetch()`, no API calls, no DB queries.
2. **Async server components are the data-fetching primitives.** Each one fetches exactly what it needs.
3. **Each Suspense boundary = one loading unit.** Never wrap an entire page in one Suspense.
4. **Client components are pure interaction leaves.** They receive serializable props or promises resolved with `use()`.
5. **`use()` for client-side promise resolution:**

   ```tsx
   // Server parent creates the promise (not awaited)
   export default async function Page() {
     const ordersPromise = api.orders();
     return (
       <Suspense fallback={<OrdersSkeleton />}>
         <OrderList ordersPromise={ordersPromise} />
       </Suspense>
     );
   }

   // Client child resolves with use()
   "use client";
   import { use } from "react";
   export function OrderList({ ordersPromise }: { ordersPromise: Promise<Order[]> }) {
     const orders = use(ordersPromise);
     return <ul>{orders.map(o => <OrderCard key={o.id} order={o} />)}</ul>;
   }
   ```
6. **Components are primitives (Lego blocks).** Each does one thing.
7. **No prop drilling through pages.**

**Forbidden patterns:**

```tsx
// 🔴 WRONG — page.tsx fetching data
export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await api.product({ slug }); // ❌
  const reviews = await api.reviews({ productId: product.id }); // ❌ waterfall
  return <ProductView product={product} reviews={reviews} />;
}

// 🔴 WRONG — single Suspense wrapping everything
<Suspense fallback={<FullPageSkeleton />}>
  <ProductDetails />
  <Reviews />
  <Related />
</Suspense>
```

**Exception:** Pages MAY do **minimal synchronous derivation** from params (parsing a search param into an enum). They must NOT call any async function.

### Hooks — Approved & Forbidden

#### APPROVED HOOKS:
- `use()` — for reading promises and context in render
- `useOptimistic()` — for optimistic UI updates
- `useReducer()` — for entangled/related state. Prevents impossible UI states.
- `useTransition()` — for non-blocking **CPU-bound rendering**. Do NOT use for network-bound work.
- `useActionState()` — for form action state management
- `useFormStatus()` — for form submission status
- `useCallback()` — only when passing to memoized children
- `useMemo()` — only for genuinely expensive computations. **Profile before memoizing.** On React 19, the compiler memoizes automatically; prefer clean derivations.
- `useRef()` — for DOM references and stable values
- `useId()` — for unique IDs in SSR-safe components
- `useSyncExternalStore()` — for external store subscriptions

#### FORBIDDEN HOOKS:
- ~~`useState()`~~ — causes brittleness, re-render cascades
- ~~`useEffect()`~~ — causes infinite loops, dependency hell
- ~~`useLayoutEffect()`~~ — same problems. **Narrow exception:** DOM measurement that must complete before paint (tooltip positioning, measuring bounds to prevent visible jump).

#### Alternatives:

| Instead of... | Use... |
|---|---|
| Multiple `useState` for related state | `useReducer()` |
| `useState` for form state | `useActionState()` with server actions |
| `useState` for optimistic UI | `useOptimistic()` |
| `useState` for loading state | `useTransition()` |
| `useEffect` for data fetching | `use()` with Suspense or server components |
| `useEffect` for subscriptions | `useSyncExternalStore()` |
| `useEffect` for DOM manipulation | `useRef()` with event handlers |
| `useEffect` for initialization | Server component or `use()` |

#### "You Might Not Need an Effect" — Patterns to Eliminate

1. **Derived/computed state:** Calculate during rendering.
   ```tsx
   // 🔴 const [fullName, setFullName] = useState(''); useEffect(() => { setFullName(first + ' ' + last); }, [first, last]);
   // ✅ const fullName = first + ' ' + last;
   ```

2. **Expensive computations:** Use `useMemo`.
   ```tsx
   // ✅ const filtered = useMemo(() => filter(items), [items]);
   ```

3. **Resetting state on prop change:** Use React `key` to reset.
   ```tsx
   // ✅ <Profile userId={userId} key={userId} />
   ```

4. **Syncing state from props:** Initialize from props or use `key`. Never sync.

5. **Event-specific logic:** Put in event handler, not effect.

6. **Notifying parent of state changes:** Call parent callback in same event handler.

7. **Chains of Effects:** Never. Calculate derived state during rendering.

8. **Fetching data on mount:** Prefer server components + Suspense or `use()` with a promise.

9. **App initialization:** Module-level code with `if (typeof window !== 'undefined')` guard.

#### When You DO Use useEffect — Name Your Effects

If a `useEffect` is genuinely needed (external system sync, subscriptions, WebSockets, third-party SDK init):

1. **Always use a named function expression.** Never anonymous arrow.
   ```tsx
   // 🔴 FORBIDDEN
   useEffect(() => { const ws = new WebSocket(url); return () => ws.close(); }, [url]);

   // ✅ REQUIRED
   useEffect(function connectToWebSocket() {
     const ws = new WebSocket(url);
     return function disconnectWebSocket() { ws.close(); };
   }, [url]);
   ```

2. **Name describes intent, not mechanics.** Use verbs like `subscribe`, `connect`, `initialize`, `synchronize`, `apply`, `listen`. If the best name is `updateStateBasedOnOtherState`, refactor it out.

3. **If you can't name it without "and", split it.** Each effect does one thing.

4. **Name cleanup functions** when teardown is non-trivial.

5. **Extract to custom hook** when the effect manages its own state and may be reused.

6. **Apply naming to `useCallback` and `useMemo` too** when non-trivial.

### Key Prop Rules

1. **Never use array index as `key`.** Use a stable, unique ID. Index-as-key silently corrupts uncontrolled input state.
   ```tsx
   // 🔴 {items.map((item, i) => <Row key={i} item={item} />)}
   // ✅ {items.map(item => <Row key={item.id} item={item} />)}
   ```

2. **Use `key` to reset component state instead of `useEffect`.**
   ```tsx
   // ✅ <UserSettingsForm key={userId} userId={userId} />
   ```

3. **No stable IDs is a data modeling problem.** Generate UUIDs at creation, not `crypto.randomUUID()` inline in a `key`.

---

## Next.js App Router — Page & Layout Typing

If using Next.js App Router:

1. **Always use `LayoutProps<'/route'>` for layouts.** Never manually type `{ children: React.ReactNode }`.

   ```tsx
   // ✅
   export default function DashboardLayout(props: LayoutProps<'/dashboard'>) {
     return <section>{props.children}</section>;
   }
   ```

2. **Always use `PageProps<'/route'>` for pages.** Never manually type params/searchParams.

   ```tsx
   // ✅
   export default async function ProductPage(props: PageProps<'/products/[id]'>) {
     const { id } = await props.params;
     return <div>{id}</div>;
   }
   ```

3. **No imports required.** `LayoutProps` and `PageProps` are global type helpers generated by `next dev`/`next build`.
4. **Static routes resolve `params` to `{}`.** Still use the helper.
5. **Named parallel route slots** are automatically typed on `LayoutProps`.
6. **`params` is a Promise.** Always `await props.params` and `await props.searchParams`.

> Next.js 16+: "Middleware" is now called "Proxy" (`proxy.ts`). Functionality unchanged.

---

## Validation — Single Source of Truth

1. **Every user input MUST be validated on BOTH frontend and backend.** Frontend = UX; backend = security boundary. Never trust the client.
2. **Shared validators package.** Place reusable schemas (Valibot/Zod) in a shared package consumed by both frontend forms and backend handlers.
3. **Do NOT validate between internal functions** that already receive typed data.
4. **Generate types from validators**, not the other way around. Use `v.InferOutput<typeof schema>` (or Zod equivalent).
5. **Derive DB validators from the schema.** Use `drizzle-valibot` / `drizzle-zod` rather than hand-writing schemas that duplicate columns.

---

## Database Access Rules

1. **Apps NEVER access the database directly.** Only backend services may import the DB client.
2. **Apps fetch data via typed API calls** (e.g. Eden Treaty, tRPC, OpenAPI client).
3. **Apps may import schema types** for inference — never for query execution.
4. **All schema changes MUST go through migrations.** No `db push` in production. Generate migration files, then apply.
5. **Never modify the schema without a migration.** Every change = a tracked migration file.

---

## Client API Communication — End-to-End Type Safety

Apps communicate with backend services via a **type-safe client** (Eden Treaty for Elysia, tRPC, or generated OpenAPI client).

1. **Always use the type-safe client.** Never raw `fetch()` with manually typed responses.
2. **Never manually type API responses.** Let the framework infer return types from route handlers.
3. **Handle errors explicitly.** Most type-safe clients return `{ data, error }` — always check `error` before using `data`.
4. **Cast narrow enum types when the client expects literals.** URL search params are always `string` — cast to the union type.

---

## UI / Styling Rules

- **Component library:** shadcn/ui (or equivalent unstyled primitives library). Check existing before creating custom.
- **TailwindCSS** for styling.
- **Semantic colors only:** `bg-primary`, `text-muted-foreground` — never raw `bg-blue-500`.
- **`cn()` for conditional classes.** No manual template literal ternaries.
- **`gap-*` not `space-x-*`/`space-y-*`.** Use flex/grid with gap.
- **`size-*` when width === height.** `size-10` not `w-10 h-10`.
- **`className` for layout only.** Don't override component internal styling.

---

## Code Quality

- **Biome** for linting and formatting.
- **No `console.log` in production code.** Use a structured logger.
- **No commented-out code.** Delete it; git has history.
- **No TODO without a linked issue.** `// TODO(#123): description`
- **Imports organized by Biome.** External → Internal → Relative.

---

## File Naming Conventions

| Type | Convention | Example |
|---|---|---|
| React component | kebab-case | `product-card.tsx` |
| Hook | `use-` prefix | `use-cart.ts` |
| Utility | kebab-case | `format-price.ts` |
| Validator schema | kebab-case | `product.ts` |
| Route (Next.js) | folder-based | `app/products/[slug]/page.tsx` |
| Type definition | kebab-case | `product-types.ts` |

---

## Security

- **Validate all inputs at boundaries** (HTTP handlers, server actions, RPC endpoints).
- **Never trust the client.** Always re-validate and re-authorize on the server.
- **Server-side session checks only** for authorization. Client-side session is for UX, not security.
- **No secrets in client bundles.** Use server-only env vars; expose only what's needed via public prefixes.
- **Sanitize all rendered HTML** when using `dangerouslySetInnerHTML`. Prefer not using it.
- **CSRF protection** on state-changing endpoints.
- **Rate limit** auth and mutation endpoints.

---

## Summary Checklist for Every PR

- [ ] No `any`, no `unknown` without narrowing
- [ ] No `useState`, no `useEffect` (or named + justified)
- [ ] No barrel files, direct sub-path imports
- [ ] Pages/layouts are composition shells — no data fetching
- [ ] Each data-fetching component wrapped in its own `<Suspense>`
- [ ] No boolean trap — variants are distinct compositions
- [ ] All inputs validated on frontend AND backend
- [ ] Files under 300 lines, functions do one thing
- [ ] Commands run via `bun run <script>`, not `turbo` directly
- [ ] Typecheck + lint + tests green
