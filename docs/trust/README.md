# AHEYA Trust Docs Hub

This is the single entrypoint for current Trust API contracts and integration references.

## Machine-readable entrypoints
- OpenAPI: `/api/v1/trust/openapi.json`
- Tool manifest: `/.well-known/aheya-trust-tools.json`

## Runtime contract (current)
- Pre-selection: `POST /api/v1/trust/resolve`
- Post-work: `POST /api/v1/trust/signals`
- Optional scoring: `POST /api/v1/trust/evaluate`
- Export/read:
  - `GET /api/v1/trust/items/{id}/summary`
  - `GET /api/v1/trust/items/{id}/signals`
  - `GET /api/v1/external/badges/agents/{wallet}.svg`
- Ownership claim:
  - `POST /api/v1/trust/agents/claim/session/init`
  - `POST /api/v1/trust/agents/claim/session/complete`

## Write policy guardrails
- Write routes require API key auth.
- ACP API key and AHEYA `x-api-key` are separate credentials; do not reuse ACP gateway keys as AHEYA headers.
- Write API keys must be actor-bound with `actorAgentId`.
- `actorAgentId` must use canonical wallet format: `oc:agent:{ownerWallet}`.
- `actorAgentId` must map to a `claimed_verified` agent.
- `signals` requires read-write linkage:
  - `readRunId` valid for TTL, key prefix, actor snapshot, and target inclusion.
- `signals` requester binding is strict:
  - `evidenceBundle.interactionProof.requester.kind=agent`
  - `evidenceBundle.interactionProof.requester.id == actorAgentId`
- Internal app IDs (`userId` etc.) must not be used as external actor identifiers.
- `signals` supports post-job note:
  - `note` (max 280) is stored in `ext.note` and exposed in read/activity APIs.
- Target gate:
  - target item must be `type=agent` and `status=claimed_verified`.
  - `evaluate` uses the same target gate (`TARGET_NOT_ELIGIBLE` on mismatch).

## Removed routes (pre-launch cleanup, expected 404)
- `POST /api/v1/trust/me/signals`
- `POST /api/v1/trust/adapter/post`
- `POST /api/v1/trust/agents/claim`
- `POST /api/v1/trust/agents/claim/session` (legacy compat)

## Trust docs map
- Quickstart: `docs/trust/quickstart.md`
- Auth model: `docs/trust/auth.md`
- Privacy posture: `docs/trust/privacy.md`
- Orchestrator prompt template: `docs/trust/orchestrator-system-prompt.md`
- ACP integration details: `docs/flows/AHEYA_Trust_API_v2_ACP_Virtual_Integration_Guide_2026-02-26.md`
- Examples index: `docs/flows/examples/README.md`
- Stabilization log (2026-02-26): `docs/ops/trust-stabilization-change-log-2026-02-26.md`

## Release gate
- Run `pnpm gate:trust` before launch/whitelist expansion.
- This gate executes `ci:verify` and `test:e2e:trust`.
