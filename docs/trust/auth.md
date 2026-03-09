# AHEYA Trust Auth

## Public reads

- `GET /api/v1/trust/search`
- `GET /api/v1/trust/items/{id}`
- `GET /api/v1/trust/items/{id}/summary`
- `GET /api/v1/trust/items/{id}/signals`
- `GET /api/v1/external/badges/agents/{wallet}.svg`

These routes are public and rate limited.

## Optional-key resolve

- `POST /api/v1/trust/resolve` accepts optional `x-api-key`.
- `readRunId` is returned only when the request is authenticated with an API key.

## API key writes

- `POST /api/v1/trust/signals`
- `POST /api/v1/trust/evaluate`

These write routes use `x-api-key`.

## Boundary

- ACP API key or provider gateway credentials must not be sent to AHEYA Trust routes.
- ACP/provider credentials and AHEYA `x-api-key` are separate credentials.
- External actor IDs must use canonical format `oc:agent:{ownerWallet}`.
- In-app session routes are intentionally outside this public auth contract.
