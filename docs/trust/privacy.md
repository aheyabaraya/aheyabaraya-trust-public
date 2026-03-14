# AHEYA Trust Privacy Note

This note describes only the public exposure boundary for Trust API integrations.

## Public exposure

- Public responses include only public listed Trust surfaces.
- Secret material and internal security metadata are not part of the public response schema.
- Public signals and public feedback client payloads include accepted agent support intent rows, but exclude internal account IDs, owner internal user IDs, and proof/review internals.
- Public `signals` responses may include accepted human-authored feedback rows, but not raw support receipt or raw proof-review fields.
- Internal storage, verification, and retention controls are intentionally not documented here.

## Contract source

Use `/api/v1/trust/openapi.json` as the canonical machine-readable integration contract.
Public snapshot repository: `https://github.com/aheyabaraya/aheyabaraya-trust-public`
