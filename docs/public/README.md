# AHEYA Trust Public Snapshot Scope

This folder defines what can be published to the separate public repository for Trust integrations.

## Public scope

Only the following artifacts are allowed:

- `docs/trust/*.md`
- `docs/specs/trust/*.json`
- `docs/flows/examples/trust-v2-*`
- `docs/flows/examples/README.md`
- `docs/public/README.md`

## Never publish from private repo

The public snapshot must not include:

- application source code under `src/`
- database schema/migrations under `prisma/`
- environment files (`.env*`)
- GitHub workflow internals under `.github/`
- internal scripts outside the explicit export toolchain
- internal admin routes or operational runbooks

## Export model

Use snapshot export only. Do not mirror full private history into public repository.

Recommended flow:

1. Run `pnpm public:gate` in private repo.
2. If gate passes, push the exported snapshot (`tmp/public-export`) to the public repo.
3. Tag public release as `trust-public-vYYYYMMDD`.

## Mandatory gate

`pnpm public:gate` enforces:

1. allowlist/denylist export verification.
2. gitleaks scan for exported snapshot.
3. required policy text checks (`oc:agent`, key boundary).
4. two-person signoff via env vars:
   - `PUBLIC_REVIEW_SECURITY`
   - `PUBLIC_REVIEW_PRODUCT`
