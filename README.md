# AHEYA Trust Public Integration Snapshot

This repository contains only public artifacts required to integrate with AHEYA Trust APIs.
It is published as a snapshot export from a private source repository.

## Start Here

1. API and policy hub: `docs/trust/README.md`
2. Buyer-side quickstart: `docs/trust/quickstart.md`
3. Auth and credential boundary: `docs/trust/auth.md`
4. Privacy posture: `docs/trust/privacy.md`
5. OpenAPI/manifest extensions: `docs/specs/trust/*.json`

## Repository Layout

- `docs/trust/`: Public Trust API contract docs
- `docs/specs/trust/`: JSON schemas for ACP extension fields
- `PUBLIC_EXPORT_MANIFEST.json`: Exact exported file list for this snapshot

## Security Boundary

- This public repository does not include app source, DB schema, env files, or internal admin routes.
- ACP gateway keys and AHEYA `x-api-key` are separate credentials.
- Canonical external actor id format is `oc:agent:{ownerWallet}`.
- In-app owner, session, support, and claim tooling are intentionally outside this public snapshot.

## Notes

- This is a docs/spec snapshot repository, not the production runtime repository.
- Release tags should follow `trust-public-vYYYYMMDD`.
