# project-doxie-fe

Next.js 16 (App Router, React 19, Tailwind v4) frontend that consumes a **Laravel** API. Data is fetched primarily in **Server Components**; authentication uses a **Bearer token** stored in an httpOnly cookie.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure the environment**

   ```bash
   cp .env.example .env.local
   ```

   Set `LARAVEL_API_URL` to your Laravel API base URL (e.g. `http://localhost:8000/api`).

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The home page shows whether the Laravel API is reachable.

## How the API integration works

```
app/
  api/backend/[...path]/route.ts   Token-injecting proxy for client-side calls (/api/backend/*)
  page.tsx                         Example Server Component using the api client
lib/
  env.ts                           Validated, server-only env access (serverEnv)
  api/client.ts                    Server-side Laravel client (api.get/post/put/patch/delete)
  api/errors.ts                    ApiError (status, validationErrors, isUnauthorized)
  auth/session.ts                  Bearer-token cookie helpers (getToken/setToken/clearToken)
types/api.ts                       Laravel response shapes (resource, collection, validation error)
```

### Fetching data (Server Components — preferred)

Server Components run server-to-server: no CORS, and the token never reaches the
browser. `fetch` is uncached by default in Next.js 16, which suits per-user data.

```tsx
import { api } from "@/lib/api/client";
import type { ApiCollection } from "@/types/api";

type Post = { id: number; title: string };

export default async function PostsPage() {
  const { data } = await api.get<ApiCollection<Post>>("/posts");
  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

Opt into caching per call when a resource is safe to cache:

```ts
await api.get("/categories", { next: { revalidate: 3600, tags: ["categories"] } });
```

### Authentication

After the user logs in, persist the token from Laravel in the httpOnly cookie
from a Route Handler or Server Action:

```ts
import { setToken } from "@/lib/auth/session";
// const { token } = await api.post("/login", credentials, { skipAuth: true });
await setToken(token);
```

`api.*` then attaches `Authorization: Bearer <token>` automatically. Handle
expiry by catching `ApiError`:

```ts
import { ApiError } from "@/lib/api/errors";

try {
  await api.get("/user");
} catch (e) {
  if (e instanceof ApiError && e.isUnauthorized) redirect("/login");
}
```

### Client-side fetching (when you need it)

For polling or client-only Web APIs, call the same-origin proxy instead of
Laravel directly — it injects the token server-side, so there's no CORS and the
token stays out of client JS:

```ts
const res = await fetch("/api/backend/notifications");
```

## Notes

- This Next.js version has breaking changes vs. older releases. See the bundled
  docs in `node_modules/next/dist/docs/` before reaching for older patterns
  (e.g. Middleware is now **Proxy**; `cookies()`/`params` are **async**).
- Environment variables without the `NEXT_PUBLIC_` prefix stay server-side. Keep
  `LARAVEL_API_URL` unprefixed so it is never bundled into the browser.
