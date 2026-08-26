import type { NextProxy } from 'next/server'
import { withCsp, CSP_HEADER_NAME } from '../csp.middleware'

const mockResponseHeadersSet = vi.fn()

vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn(() => ({ headers: { set: mockResponseHeadersSet } })),
  },
}))

function makeRequest() {
  return {
    headers: new Headers(),
  } as any
}

function makeMockNext(response: unknown = undefined) {
  return vi.fn(() => response) as unknown as NextProxy
}

describe('withCsp middleware', () => {
  beforeEach(() => {
    mockResponseHeadersSet.mockReset()
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'https://api.example.com')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('sets a report-only CSP header on the request and response', async () => {
    const request = makeRequest()
    const response = { headers: { set: mockResponseHeadersSet } }
    const next = makeMockNext(response)

    await withCsp(next)(request, undefined as any)

    expect(request.headers.get(CSP_HEADER_NAME)).toContain("default-src 'self'")
    expect(mockResponseHeadersSet).toHaveBeenCalledWith(
      CSP_HEADER_NAME,
      expect.stringContaining("default-src 'self'"),
    )
  })

  it('includes a nonce shared between the script-src and style-src directives', async () => {
    const request = makeRequest()
    const next = makeMockNext({ headers: { set: mockResponseHeadersSet } })

    await withCsp(next)(request, undefined as any)

    const header = request.headers.get(CSP_HEADER_NAME) as string
    const [, nonce] = header.match(/'nonce-([^']+)'/) ?? []
    expect(nonce).toBeTruthy()
    expect(header.match(new RegExp(`'nonce-${nonce}'`, 'g'))).toHaveLength(2)
    expect(request.headers.get('x-nonce')).toBe(nonce)
  })

  it('includes the API origin in connect-src', async () => {
    const request = makeRequest()
    const next = makeMockNext({ headers: { set: mockResponseHeadersSet } })

    await withCsp(next)(request, undefined as any)

    const header = request.headers.get(CSP_HEADER_NAME) as string
    expect(header).toContain("connect-src 'self' https://api.example.com")
  })

  it('omits the API origin when NEXT_PUBLIC_API_BASE_URL is not set', async () => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', '')
    const request = makeRequest()
    const next = makeMockNext({ headers: { set: mockResponseHeadersSet } })

    await withCsp(next)(request, undefined as any)

    const header = request.headers.get(CSP_HEADER_NAME) as string
    expect(header).toContain("connect-src 'self';")
  })

  it('does not include unsafe-eval in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    const request = makeRequest()
    const next = makeMockNext({ headers: { set: mockResponseHeadersSet } })

    await withCsp(next)(request, undefined as any)

    const header = request.headers.get(CSP_HEADER_NAME) as string
    expect(header).not.toContain("'unsafe-eval'")
  })

  it('includes unsafe-eval in development', async () => {
    vi.stubEnv('NODE_ENV', 'development')
    const request = makeRequest()
    const next = makeMockNext({ headers: { set: mockResponseHeadersSet } })

    await withCsp(next)(request, undefined as any)

    const header = request.headers.get(CSP_HEADER_NAME) as string
    expect(header).toContain("'unsafe-eval'")
  })

  it('falls back to NextResponse.next() when the inner chain returns nothing', async () => {
    const request = makeRequest()
    const next = makeMockNext(undefined)

    const response = await withCsp(next)(request, undefined as any)

    expect(response).toEqual({ headers: { set: mockResponseHeadersSet } })
    expect(mockResponseHeadersSet).toHaveBeenCalledWith(
      CSP_HEADER_NAME,
      expect.any(String),
    )
  })
})
