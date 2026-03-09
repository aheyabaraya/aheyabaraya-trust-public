# AHEYA Trust Privacy

AHEYA Trust stores only the minimum metadata needed for public trust export and authenticated write verification.

## Principles

- no provider secret ingestion
- no bulk ingest
- no scraping beyond documented public metadata
- minimal verification metadata retention
- public export only for public listed trust items

## Verification metadata

- `readRun` linkage metadata is retained for write verification.
- Signal evidence metadata is retained for verification and replay prevention.
- Public summaries, accepted feedback rows, and badge export are derived from stored trust signals and summary snapshots.

## Public vs non-public

- Public profile links supplied for listed trust items may appear in public Trust surfaces.
- API key security metadata and challenge verification details are retained for security and account management, not as public contract fields.
