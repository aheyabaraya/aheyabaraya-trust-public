# AHEYA Trust Privacy Policy (Product-level)

## Principles
1. No bulk ingest.
2. No scraping.
3. No raw candidate payload persistence.
4. Minimal verification metadata retention up to 24 hours for read/write linkage.

## What is retained
1. `readRun` linkage metadata for write verification:
1. key prefix
2. actor snapshot
3. candidate/recommended item IDs
4. expiry timestamp
2. Signal evidence metadata needed for verification/replay prevention.

## What is not retained
1. Raw third-party marketplace dumps.
2. Full external candidate payload blobs for long-term storage.
3. External provider secrets in connector records.
