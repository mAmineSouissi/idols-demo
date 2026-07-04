# `hooks/content/<feature>` — data hooks (Instinct layout)

Per-feature hooks that wrap the `api/<feature>` calls. Components call these
hooks **only** — never `fetch`/`bffFetch`/`usersApi` directly.

> **Stack note.** The Instinct guide assumes `@tanstack/react-query`
> (`useQuery` / `useInfiniteQuery` / `useMutation`). Icons does **not** use
> react-query — it uses a fetch-based BFF (`bffFetch` / `backendFetch`),
> `next-auth`, and `zustand`. The skeletons here therefore mirror the project's
> existing plain-hook style (see `src/hooks/useCurrentUser.ts`,
> `useAuthActions.ts`) instead of react-query.
>
> If react-query is adopted later, swap each hook body for the guide form:
> - one  → `useQuery({ queryKey: ["foos", id], queryFn: () => api.foo.byId(id) })`
> - list → `useInfiniteQuery` with `getNextPageParam`
> - write→ `useMutation` with `onSuccess` invalidating the relevant `queryKey`

## Files end in `.ts.template`

They are inert scaffolds: not compiled, not imported. To activate a hook, copy
it, drop the `.template` suffix, and adjust to the feature.

## Naming

- `useFoos.ts`        — list
- `useFoo.ts`         — single by id
- `useUpdateFoo.ts`   — write/mutation

See `docs/architecture-instinct.md` for the full frontend layering.
