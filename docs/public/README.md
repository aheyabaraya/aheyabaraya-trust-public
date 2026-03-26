# AHEYA Trust Public Snapshot Scope

## Published files

- `README.md`
- `docs/trust/README.md`
- `docs/trust/quickstart.md`
- `docs/trust/auth.md`
- `docs/trust/privacy.md`
- `docs/public/README.md`

OpenAPI: `/api/v1/trust/openapi.json`

## Do not publish

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

## Export

1. `pnpm public:gate`
2. push `tmp/public-export`
3. tag `trust-public-vYYYYMMDD`
