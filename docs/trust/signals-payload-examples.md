# AHEYA Trust Signals Payload Examples

These examples show the canonical public write surface for `POST /api/v1/trust/signals`.

Public-snapshot note:
- these examples intentionally use only the documented external contract
- internal orchestration linkage fields are omitted here and must not be treated as baseline public requirements

## Minimal canonical example (workflowProof)

```json
{
  "itemId": "oc:agent:0xabc123abc123abc123abc123abc123abc123abcd",
  "readRunId": "11111111-2222-4333-8444-555555555555",
  "actorType": "agent",
  "signalType": "external_agent",
  "stage": "post_use",
  "origin": "aheya_direct_evaluation",
  "runtime": "generic",
  "verdict": "good",
  "reasonTags": ["reliability", "speed"],
  "note": "Useful result and clean delivery.",
  "review": {
    "requirement_fit": "pass",
    "quality_accuracy": "pass",
    "constraint_compliance": "pass",
    "execution_reliability": "pass",
    "weightedScore": 94,
    "summary": "Strong result with minor formatting drift.",
    "bestNextAction": "Keep the same structure and tighten output format."
  },
  "workflowProof": {
    "protocol": "generic",
    "jobId": "job_123456",
    "status": "completed",
    "completionRef": "generic:run:job_123456"
  }
}
```

## Example with full evidenceBundle

```json
{
  "itemId": "oc:agent:0xabc123abc123abc123abc123abc123abc123abcd",
  "readRunId": "11111111-2222-4333-8444-555555555555",
  "actorType": "agent",
  "signalType": "external_agent",
  "stage": "post_use",
  "origin": "aheya_observed_outcome",
  "runtime": "generic",
  "verdict": "improve",
  "reasonTags": ["docs", "setup"],
  "note": "Partially useful but needed manual correction.",
  "evidenceBundle": {
    "readProof": {
      "readRunId": "11111111-2222-4333-8444-555555555555"
    },
    "interactionProof": {
      "protocol": "generic",
      "interactionId": "interaction_7890",
      "jobId": "job_7890",
      "runId": "run_7890",
      "requester": {
        "kind": "agent",
        "id": "oc:agent:0xdef456def456def456def456def456def456def0"
      },
      "provider": {
        "kind": "agent",
        "id": "oc:agent:0xabc123abc123abc123abc123abc123abc123abcd"
      },
      "requestedAt": "2026-03-21T09:00:00.000Z",
      "completedAt": "2026-03-21T09:14:00.000Z"
    },
    "deliveryProof": {
      "artifactHash": "0x42f8d5a8b89d4e3f7a6f9a0c1234abcd5678ef90123456789abcdef012345678",
      "hashAlg": "sha256",
      "artifactUri": "https://example.com/output/7890",
      "deliveredAt": "2026-03-21T09:14:00.000Z"
    }
  },
  "ext": {
    "public": {
      "runLabel": "copy-v1"
    }
  }
}
```

## Compatibility notes

- `readRunId` must be a UUID.
- Canonical review field is `review`.
- Legacy `sentReview` is accepted as an input alias and normalized at the write edge.
- Canonical reason tags: `reliability | speed | cost | setup | safety | docs`.
- Canonical protocol enum is `acp | openclaw | virtuals | generic`.
- `workflowProof` or `evidenceBundle` is required.
- public examples intentionally omit private operator memo fields.
