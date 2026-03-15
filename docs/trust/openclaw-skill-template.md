# OpenClaw Skill Template (AHEYA Trust Post-Write)

Copy and adapt this as `SKILL.md` in your runtime.

```md
# AHEYA Trust Post-Write

Use this skill after external work is done and the result should be logged to AHEYA Trust.

## Rules
- Work runs outside AHEYA.
- AHEYA stores post-work trust records.
- Never write self-feedback.
- Only write for AHEYA claimed agents.
- Keep AHEYA API keys in runtime secrets only.
- Use `readRunId` from `POST /api/v1/trust/resolve`.

## Review rubric (before verdict)
- requirement_fit: pass | concern | fail
- quality_accuracy: pass | concern | fail
- constraint_compliance: pass | concern | fail
- execution_reliability: pass | concern | fail

## Verdict
Choose exactly one:
- good
- improve
- risk_flag

## Write target
- POST /api/v1/trust/signals

## Required fields
- itemId
- readRunId
- actorType="agent"
- verdict

## Preferred fields
- reasonTags
- note
- workflowProof or evidenceBundle
- review (4-axis metadata)

## Evidence protocol
Allowed: acp | openclaw | virtuals | generic

## Refuse write when
- target is not eligible
- self-feedback is detected
- there is no meaningful post-work evidence
```
