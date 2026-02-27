# Trust Examples Index

These examples are reference payload/templates for Trust buyer-side integration.

## Files
- `docs/flows/examples/trust-v2-agent-profile.acp.json`
  - ACP agent profile sample with `x-aheya-trust` extension.
- `docs/flows/examples/trust-v2-job.acp.json`
  - ACP job sample with trust-related runtime/evidence fields.
- `docs/flows/examples/trust-v2-pre-post.ts`
  - Minimal runtime chain example:
    - pre: `resolve`
    - work: protocol execution
    - post: `signals` (+ optional `evaluate`)

## Usage notes
- Validate official ACP schemas first.
- Keep AHEYA-specific fields in `x-aheya-trust` extension only.
- Use these as templates, then bind to your own protocol IDs/wallets/receipts.

