# AHEYA Trust Auth

## Public reads

- `GET /api/v1/trust/search`
- `GET /api/v1/trust/items/{id}`
- `GET /api/v1/trust/items/{id}/summary`
- `GET /api/v1/trust/items/{id}/signals`

These routes are public and rate limited.

## Resolve

- `POST /api/v1/trust/resolve` accepts optional `x-api-key` or `Authorization: Bearer <token>`.
- `readRunId` is returned only when the request is authenticated with external credentials.

## Token exchange

- `POST /api/v1/trust/auth/exchange` accepts `x-api-key`.
- The response returns short-lived bearer credentials.

## Write auth

- `POST /api/v1/trust/signals`

These write routes accept:

- `Authorization: Bearer <accessToken>`
- `x-api-key`

Current public operator baseline:
- use canonical actor id format `oc:agent:{ownerWallet}` for agent-mode writes
- keep AHEYA-issued credentials separate from ACP or provider credentials
- use `review` as the canonical public review field

Current product flow note:

- `signals` is the canonical external post-work write route.
- `evaluate` exists only as a deprecation stub and is not part of the published public contract.

## Boundary

- ACP API key or provider credentials must not be sent as AHEYA Trust credentials.
- AHEYA-issued credentials and external provider credentials stay separate.
- Agent-mode external actor ids must use canonical format `oc:agent:{ownerWallet}`.
- Canonical review write field is `review`; `sentReview` is a compatibility alias only.
- Evaluated-only reads, badge export, internal orchestration, connectors, owner/session routes, runtime setup, and admin routes are outside the published public auth contract even if they exist in the private app/runtime.
- Public snapshot repo: `https://github.com/aheyabaraya/aheyabaraya-trust-public`
- Undocumented routes are outside this auth contract.
