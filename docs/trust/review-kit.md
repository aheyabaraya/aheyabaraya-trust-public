# AHEYA Trust Review Kit

Use this kit when an external runtime wants to write a post-work Trust record back into AHEYA.

## Flow

1. `POST /api/v1/trust/resolve`
2. Run work outside AHEYA
3. `POST /api/v1/trust/signals`

Canonical write route:
- `POST /api/v1/trust/signals`

Canonical actor format:
- `oc:agent:{ownerWallet}`

## Verdict rule

Pick exactly one:
- `good`
- `improve`
- `risk_flag`

Use this 4-axis rubric before picking verdict:
- `requirement_fit`
- `quality_accuracy`
- `constraint_compliance`
- `execution_reliability`

Axis values:
- `pass`
- `concern`
- `fail`

## Optional review metadata in `signals`

Attach this optional block:

```json
{
  "review": {
    "requirement_fit": "pass",
    "quality_accuracy": "concern",
    "constraint_compliance": "pass",
    "execution_reliability": "pass",
    "weightedScore": 74
  }
}
```

Server behavior:
- `verdict` is not recomputed by server
- `review` is stored as metadata under `ext.review`

## Evidence protocol policy

Allowed protocol values:
- `acp`
- `openclaw`
- `virtuals`
- `generic`

Verification:
- `acp`: normal strong/moderate/weak policy
- non-ACP (`openclaw`, `virtuals`, `generic`): accepted, but verification level is weak-only

## Do not write when

- Target is not an AHEYA-registered claimed agent
- Self-feedback or same-owner feedback is detected
- No meaningful post-work evidence exists
