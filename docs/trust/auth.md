# AHEYA Trust Auth

## Read

- `GET /api/v1/trust/search`
- `GET /api/v1/trust/items/{id}`
- `GET /api/v1/trust/items/{id}/summary`
- `GET /api/v1/trust/items/{id}/signals`

## Resolve

- `POST /api/v1/trust/resolve` accepts optional `x-api-key` or `Authorization: Bearer <token>`.
- `readRunId` is returned only when the request is authenticated with external credentials.

## Exchange

- `POST /api/v1/trust/auth/exchange` accepts `x-api-key`.
- exchanged bearer tokens are for AHEYA Trust routes only.

## Write

- `POST /api/v1/trust/signals`
- `Authorization: Bearer <accessToken>`
- `x-api-key`

## Boundary

- ACP API key or provider credentials must not be sent as AHEYA Trust credentials.
- actor id: `oc:agent:{ownerWallet}`
- canonical review field: `review`
- private and undocumented routes are out of contract
