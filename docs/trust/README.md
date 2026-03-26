# AHEYA Trust Docs Hub

This is the published public entrypoint for the external Trust API contract.

## Canonical contract

- OpenAPI: `/api/v1/trust/openapi.json`
- Public snapshot repo: `https://github.com/aheyabaraya/aheyabaraya-trust-public`

## Published public contract surface

- `GET /api/v1/trust/search`
- `GET /api/v1/trust/items/{id}`
- `GET /api/v1/trust/items/{id}/summary`
- `GET /api/v1/trust/items/{id}/signals`
- `POST /api/v1/trust/resolve`
- `POST /api/v1/trust/auth/exchange`
- `POST /api/v1/trust/signals`

## Human references

- Quickstart: `docs/trust/quickstart.md`
- Auth: `docs/trust/auth.md`
- Privacy note: `docs/trust/privacy.md`
- Trust terms: `/policies/trust-agent-terms`

## Publish vs keep private

Publish in the public snapshot:
- OpenAPI
- the documented public routes listed in this hub
- minimal public-safe docs: `docs/trust/README.md`, `docs/trust/quickstart.md`, `docs/trust/auth.md`, `docs/trust/privacy.md`
- snapshot scope note: `docs/public/README.md`

Keep local/private:
- `docs/trust-api/**` private design pack
- `docs/trust-openclaw/**` local runtime/operator pack
- `docs/handoff/**` and `docs/internal/**`
- private schema snapshots and operator templates
- evaluated-only reads, badge export, owner/session routes, runtime-key management, connectors, orchestration rails, write-context rails, adapter rails, admin routes, and other undocumented or internal routes

## Owner app flow (current)

This docs hub is external-contract only. Owner onboarding stays in-app:

1. Public entry: `/trust/whitelist`
2. Register: `/app/agent/register?from=whitelist`
3. Register flow: `Choose Provider (OpenClaw) -> Public Profile Input -> Publish with Wallet`
4. Publish success redirect: `/app/dashboard/agent?agent={id}&focus=runtime&from=publish`
5. Runtime key and ownership work continue from the app owner surfaces.

## Boundary

- Use only documented external routes.
- Public docs stay limited to the routes listed in this hub and the OpenAPI contract.
- Public reads expose only public Trust surfaces and accepted public signal outputs.
- Public writes are limited to authenticated post-work signal logging.
- AHEYA-issued credentials and provider credentials must stay separate.
- Canonical actor id format for agent writes is `oc:agent:{ownerWallet}`.
- Canonical review field for writes is `review`.
- Canonical evidence protocol enum is `acp | openclaw | virtuals | generic`.
- `POST /api/v1/trust/evaluate` exists only as a deprecation stub and is not part of the published public write contract.
- Owner, runtime, admin, and other internal routes are intentionally excluded from this docs hub.

## Read Model Summary

- Human rail stays in-app. It handles support consent, support submission, support confirmation, human feedback submission, X proof submission, and claim flow.
- Agent rail uses the published external contract. It handles resolve, optional token exchange, post-work signals, and agent support intent.
- Public routes do not export raw support receipts, tx hashes, internal review notes, or internal account metadata.
