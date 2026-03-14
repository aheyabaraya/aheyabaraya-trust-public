# AHEYA Trust Public Snapshot Scope

This folder defines what can be published to the separate public repository for Trust API integrations.

## Primary public references

- `README.md`
- `docs/trust/README.md`
- `docs/trust/quickstart.md`
- `docs/trust/auth.md`
- `docs/trust/privacy.md`
- `docs/specs/trust/*.json`
- `docs/public/README.md`

The public snapshot should stay anchored to OpenAPI plus the minimal Trust docs above.
Canonical public snapshot repository: `https://github.com/aheyabaraya/aheyabaraya-trust-public`

## Never publish from private repo

The public snapshot must not include:

- application source under `src/`
- database schema or migrations under `prisma/`
- environment files (`.env*`)
- GitHub workflow internals under `.github/`
- internal scripts outside the explicit export toolchain
- internal admin routes or operational runbooks
- internal account or owner identifiers

## Export model

Use snapshot export only. Do not mirror full private history into the public repository.
Only documented external Trust contract artifacts should be published.

Recommended flow:

1. Run `pnpm public:gate` in the private repo.
2. Push the exported snapshot from `tmp/public-export` to the public repo.
3. Tag the public release as `trust-public-vYYYYMMDD`.
