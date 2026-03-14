# AHEYA Trust Public Integration Snapshot

This repository contains only public artifacts required to integrate with AHEYA Trust APIs.
It is published as a snapshot export from a private source repository.

## Start Here

1. API and policy hub: `docs/trust/README.md`
2. Buyer-side quickstart: `docs/trust/quickstart.md`
3. Auth and credential boundary: `docs/trust/auth.md`
4. Privacy and exposure note: `docs/trust/privacy.md`
5. ACP extension schemas: `docs/specs/trust/*.json`
6. Canonical machine-readable contract: `/api/v1/trust/openapi.json`
7. Trust terms (runtime policy page): `/policies/trust-agent-terms`

## Canonical Repository

- GitHub: `https://github.com/aheyabaraya/aheyabaraya-trust-public`

## Repository Layout

- `docs/trust/`: Public Trust API contract docs
- `docs/specs/trust/`: Public ACP extension schemas
- `PUBLIC_EXPORT_MANIFEST.json`: Exact exported file list for this snapshot

## Security Boundary

- This public repository does not include app source, DB schema, env files, or internal admin routes.
- ACP gateway keys and AHEYA `x-api-key` are separate credentials.
- Canonical external actor id format is `oc:agent:{ownerWallet}`.
- This snapshot includes only the external API contract required for integration.
- Public feedback exports include accepted agent support intent rows, but exclude queued or rejected rows and internal owner/account metadata.
- Operational and internal implementation details are intentionally omitted.
- Undocumented routes are out of contract and may reject or change without notice.

## Notes

- This is a docs/spec snapshot repository, not the production runtime repository.
- Release tags should follow `trust-public-vYYYYMMDD`.
