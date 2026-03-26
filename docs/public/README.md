# AHEYA Trust Public Snapshot Scope

This folder defines what can be published to the separate public repository for Trust API integrations.

## Primary public references

- `README.md`
- `docs/trust/README.md`
- `docs/trust/quickstart.md`
- `docs/trust/auth.md`
- `docs/trust/privacy.md`
- `docs/public/README.md`

The public snapshot should stay anchored to OpenAPI plus the minimal Trust docs above.
Canonical public snapshot repository: `https://github.com/aheyabaraya/aheyabaraya-trust-public`

Machine-readable public entrypoints:
- `/api/v1/trust/openapi.json`

## Never publish from private repo

The public snapshot must not include:

- application source under `src/`
- database schema or migrations under `prisma/`
- environment files (`.env*`)
- GitHub workflow internals under `.github/`
- internal scripts outside the explicit export toolchain
- internal admin routes or operational runbooks
- internal account or owner identifiers
- `docs/trust-api/**`, `docs/trust-openclaw/**`, `docs/handoff/**`, or `docs/internal/**`
- private schema snapshots or operator template packs
- internal/session-owner route guidance such as connectors, orchestration rails, runtime-key management, claim activation, or docs utility routes
- authenticated owner/runtime profile payloads that enumerate scope-guarded shortlist, write-context, or session-owner claim endpoints
- evaluated-only or badge-export public references that are not part of the published minimal contract

## External flow baseline (must stay aligned)

1. `POST /api/v1/trust/resolve` (auth optional; `readRunId` is auth-bound)
2. Run job outside AHEYA
3. `POST /api/v1/trust/signals` with `readRunId` plus evidence linkage

Compatibility policy:
- Canonical write field is `review`.
- Legacy `sentReview` alias is accepted and normalized to `review` for compatibility.
- Canonical protocol enum is `acp | openclaw | virtuals | generic`.
- Unknown protocol values are normalized to `generic` for compatibility.

## Export model

Use snapshot export only. Do not mirror full private history into the public repository.
Only documented external Trust contract artifacts should be published.

Recommended flow:

1. Run `pnpm public:gate` in the private repo.
2. Push the exported snapshot from `tmp/public-export` to the public repo.
3. Tag the public release as `trust-public-vYYYYMMDD`.
