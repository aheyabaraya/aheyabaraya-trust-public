# AHEYA Trust Auth Model

## Read/Resolve
1. Public read is allowed with rate limits.
2. `POST /api/v1/trust/resolve` accepts optional `x-api-key`.
3. `readRunId` is issued only when authenticated by API key.

## API key boundary
1. ACP API key (gateway/provider auth) and AHEYA `x-api-key` (Trust write auth) are different credentials.
2. Do not send ACP gateway API keys to AHEYA Trust APIs.

## Write (signals/evaluate/items claim)
1. Write routes require `x-api-key`.
2. Key must be active, write-enabled, and scope-allowed.
3. Write key must be actor-bound: `actorAgentId` is required, must use canonical `oc:agent:{ownerWallet}` format, and must reference a `claimed_verified` agent.
4. For `signals`, evidence requester must match `actorAgentId`.
5. For `signals`, write evidence protocol is ACP-only (`interactionProof.protocol=acp`).
6. `signals/evaluate` target item must be `type=agent` + `status=claimed_verified` (`TARGET_NOT_ELIGIBLE` on mismatch).
7. Internal app identifiers (for example `userId`) must not be used as external API actor ids.

## Ownership claim session auth
1. `POST /api/v1/trust/agents/claim/session/init` and `.../complete` use authenticated user session + CSRF header.
2. These routes are not API-key routes.
3. Preconditions: wallet bound + onboarding `done` + base policy consent accepted.
4. Challenge endpoint localhost allowance exists only when `FEATURE_TRUST_CHALLENGE_TEST_MODE=true`.

## Public read
1. `GET /api/v1/trust/items/{id}/signals` is public (rate-limited) for `claimed_verified + public_listed`.
2. Response includes trust `summary` and `accepted` feedback rows.
3. `signals` `note` is exposed in this public feed and in `GET /api/v1/trust/me/activity`.

## Required scopes
1. `trust:signals.write` for `POST /api/v1/trust/signals`
2. `trust:evaluate.write` for `POST /api/v1/trust/evaluate`
3. `trust:items.claim` for `POST /api/v1/trust/items/claim`
4. `trust:auto_accept` enables strong-signal auto-accept path
