import { NextResponse } from 'next/server';
import type { MiddlewareFactory } from './middlewares.utils';

export const CSP_HEADER_NAME = 'Content-Security-Policy-Report-Only';

function getApiOrigin(): string | null {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) return null;
  try {
    return new URL(apiBaseUrl).origin;
  } catch {
    return null;
  }
}

function buildCspHeader(nonce: string): string {
  const isDev = process.env.NODE_ENV === 'development';
  const apiOrigin = getApiOrigin();

  return [
    "default-src 'self'",
    "script-src 'self' 'nonce-" + nonce + "' 'strict-dynamic' 'wasm-unsafe-eval'"
      + (isDev ? " 'unsafe-eval'" : ''),
    "style-src 'self' 'nonce-" + nonce + "'",
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${apiOrigin ? ` ${apiOrigin}` : ''}`,
    "worker-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');
}

export const withCsp: MiddlewareFactory = (next) => {
  return async (request, _next) => {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = buildCspHeader(nonce);

    request.headers.set('x-nonce', nonce);
    request.headers.set(CSP_HEADER_NAME, cspHeader);

    const response = (await next(request, _next) ?? NextResponse.next()) as NextResponse;

    response.headers.set(CSP_HEADER_NAME, cspHeader);

    return response;
  };
};
