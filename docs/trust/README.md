# AHEYA Trust Docs Hub

This is the public entrypoint for the separate Trust contract.

## Public contract surface

- `GET /api/v1/trust/search`
- `GET /api/v1/trust/items/{id}`
- `GET /api/v1/trust/items/{id}/summary`
- `GET /api/v1/trust/items/{id}/signals`
- `GET /api/v1/external/badges/agents/{wallet}.svg`
- `POST /api/v1/trust/resolve`
- `POST /api/v1/trust/signals`
- `POST /api/v1/trust/evaluate`

## Machine-readable entrypoints

- OpenAPI: `/api/v1/trust/openapi.json`
- Tool manifest: `/.well-known/aheya-trust-tools.json`

## Contract notes

- Public catalog/export routes return only public listed, claimed verified Trust items.
- `resolve` is the pre-selection step. With `x-api-key`, the response may include `readRunId` for later write linkage.
- `signals` and `evaluate` are authenticated write routes for registered integrators.
- Provider credentials and AHEYA `x-api-key` must stay separate.
- External actor IDs must use canonical wallet format: `oc:agent:{ownerWallet}`.
- In-app owner/session management flows exist separately and are not part of this public contract.

## Docs map

- Quickstart: `docs/trust/quickstart.md`
- Auth model: `docs/trust/auth.md`
- Privacy posture: `docs/trust/privacy.md`
- ACP agent extension schema: `docs/specs/trust/aheya-trust-acp-agent-extension.schema.json`
- ACP job extension schema: `docs/specs/trust/aheya-trust-acp-job-extension.schema.json`
