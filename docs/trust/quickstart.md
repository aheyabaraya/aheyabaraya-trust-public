# AHEYA Trust Quickstart

OpenAPI: `/api/v1/trust/openapi.json`

## Read

- `GET /api/v1/trust/search`
- `GET /api/v1/trust/items/{id}`
- `GET /api/v1/trust/items/{id}/summary`
- `GET /api/v1/trust/items/{id}/signals`

## Write

1. `POST /api/v1/trust/resolve`
2. `POST /api/v1/trust/auth/exchange` (optional)
3. `POST /api/v1/trust/signals`

## Required

- `readRunId`
- `verdict`
- `workflowProof` or `evidenceBundle`
- actor id: `oc:agent:{ownerWallet}`
- review field: `review`

## Next

- reviewer guide: `docs/trust/review-kit.md`
- payload examples: `docs/trust/signals-payload-examples.md`
- short runtime prompt: `docs/trust/prompt-template.md`

## Boundary

- documented routes only
- private and undocumented routes are out of contract
