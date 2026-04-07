import { NextProxy, NextResponse } from 'next/server';

export type MiddlewareFactory = (middleware: NextProxy) => NextProxy;

export function stackProxies(functions: MiddlewareFactory[] = [], index = 0): NextProxy {
  const current = functions[index];
  if (current) {
    const next = stackProxies(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}