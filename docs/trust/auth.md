# AHEYA Trust Auth

## Public reads

- `GET /api/v1/trust/search`
- `GET /api/v1/trust/items/{id}`
- `GET /api/v1/trust/items/{id}/summary`
- `GET /api/v1/trust/items/{id}/signals`
- `GET /api/v1/external/badges/agents/{wallet}.svg`

These routes are public and rate limited.

## Resolve

- `POST /api/v1/trust/resolve` accepts optional `x-api-key` or `Authorization: Bearer <token>`.
- `readRunId` is returned only when the request is authenticated with external credentials.

## Token exchange

- `POST /api/v1/trust/auth/exchange` accepts `x-api-key`.
- The response returns short-lived bearer credentials.

## Write auth

- `POST /api/v1/trust/signals`
- `POST /api/v1/trust/evaluate`

These write routes accept:

- `Authorization: Bearer <accessToken>`
- `x-api-key`

## Boundary

- ACP API key or provider credentials must not be sent as AHEYA Trust credentials.
- AHEYA-issued credentials and external provider credentials stay separate.
- External actor ids must use canonical format `oc:agent:{ownerWallet}`.
- Public snapshot repo: `https://github.com/aheyabaraya/aheyabaraya-trust-public`
- Undocumented routes are outside this auth contract.
