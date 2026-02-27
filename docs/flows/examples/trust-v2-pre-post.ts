type TrustProtocol = 'acp'

type ResolveRequest = {
  task: string
  candidates: Array<{ id: string }>
}

type ResolveResponse = {
  data: {
    recommended: Array<{ id: string; trust_score: number }>
    warnings: Array<{ id: string; risk_flags: string[] }>
    readRunId: string | null
  }
}

type Principal = {
  kind: 'wallet' | 'agent' | 'service'
  id: string
  chainId?: number
}

type SignalRequest = {
  itemId: string
  readRunId: string
  actorType: 'agent'
  verdict: 'good' | 'improve' | 'risk_flag'
  reasonTags: Array<'reliability' | 'speed' | 'cost' | 'setup' | 'safety' | 'docs'>
  evidenceBundle: {
    readProof: {
      readRunId: string
    }
    interactionProof: {
      protocol: TrustProtocol
      interactionId: string
      jobId: string
      runId?: string
      receiptId?: string
      requester: Principal
      provider: Principal
      requestedAt: string
      completedAt?: string
    }
    deliveryProof?: {
      artifactHash: string
      hashAlg: 'sha256' | 'keccak256'
      artifactUri?: string
      deliveredAt: string
    }
    settlementProof?: {
      kind: 'onchain' | 'escrow' | 'pg'
      reference: string
      chainId?: number
      amount: number
      currency: string
      payer: Principal
      payee: Principal
      paidAt: string
    }
    counterpartyAttestation?: Array<{
      signerRole: 'requester' | 'provider' | 'observer'
      signer: Principal
      nonce: string
      issuedAt: string
      expiresAt: string
      message: string
      signature: string
      sigType: 'eip712' | 'eth_sign' | 'onchain_tx'
      chainId?: number
      reference?: string
    }>
  }
  // Legacy compatibility field only. Remove after migration window.
  workflowProof?: {
    protocol: TrustProtocol
    jobId: string
    status: 'completed'
    completionRef: string
  }
  actorRef?: string
  ext?: Record<string, unknown>
}

async function trustResolve(baseUrl: string, apiKey: string, payload: ResolveRequest): Promise<ResolveResponse['data']> {
  const response = await fetch(`${baseUrl}/api/v1/trust/resolve`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`resolve failed: ${response.status}`)
  }

  const parsed = (await response.json()) as ResolveResponse
  return parsed.data
}

async function trustSignal(baseUrl: string, apiKey: string, payload: SignalRequest): Promise<void> {
  const response = await fetch(`${baseUrl}/api/v1/trust/signals`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    throw new Error(`signals failed: ${response.status} ${JSON.stringify(errorBody)}`)
  }
}

export async function runAgentJobWithAheyaTrust(params: {
  baseUrl: string
  apiKey: string
  protocol: TrustProtocol
  jobId: string
  candidates: Array<{ id: string }>
  requester: Principal
  providerWallet: string
}) {
  // pre-stage: read (resolve) and receive readRunId
  const resolved = await trustResolve(params.baseUrl, params.apiKey, {
    task: 'pre-eval',
    candidates: params.candidates,
  })

  const target = resolved.recommended[0]
  if (!target || !resolved.readRunId) {
    throw new Error('No recommendation/readRunId from resolve')
  }

  // work stage: run your ACP job here
  const verdict: SignalRequest['verdict'] = 'good'
  const reasonTags: SignalRequest['reasonTags'] = ['reliability']

  const now = new Date().toISOString()

  // post-stage: write signal with readRunId + evidenceBundle
  await trustSignal(params.baseUrl, params.apiKey, {
    itemId: target.id,
    readRunId: resolved.readRunId,
    actorType: 'agent',
    verdict,
    reasonTags,
    evidenceBundle: {
      readProof: {
        readRunId: resolved.readRunId,
      },
      interactionProof: {
        protocol: params.protocol,
        interactionId: `acp:${params.jobId}`,
        jobId: params.jobId,
        runId: `acp:run:${params.jobId}`,
        receiptId: `acp:receipt:${params.jobId}`,
        requester: params.requester,
        provider: {
          kind: 'agent',
          id: target.id,
        },
        requestedAt: now,
        completedAt: now,
      },
      deliveryProof: {
        artifactHash: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        hashAlg: 'keccak256',
        artifactUri: `https://example.com/artifacts/${params.jobId}.json`,
        deliveredAt: now,
      },
      settlementProof: {
        kind: 'onchain',
        reference: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        chainId: 84532,
        amount: 10,
        currency: 'USDC',
        payer: params.requester,
        payee: {
          kind: 'wallet',
          id: params.providerWallet,
          chainId: 84532,
        },
        paidAt: now,
      },
      counterpartyAttestation: [
        {
          signerRole: 'provider',
          signer: {
            kind: 'wallet',
            id: params.providerWallet,
            chainId: 84532,
          },
          nonce: `nonce:${params.jobId}`,
          issuedAt: now,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          message: 'ACP job completed and settlement confirmed',
          signature: '0x1234',
          sigType: 'eip712',
          chainId: 84532,
        },
      ],
    },
    // Legacy compatibility only.
    workflowProof: {
      protocol: params.protocol,
      jobId: params.jobId,
      status: 'completed',
      completionRef: `acp:receipt:${params.jobId}`,
    },
    actorRef: `job:${params.jobId}`,
    ext: {
      recommendationScore: target.trust_score,
    },
  })
}
