type ApiCallOptions =
  | { get: Record<string, string> | undefined }
  | { post: unknown }
  | { put: unknown }
  | { patch: unknown }
  | { delete: unknown };

export async function baseApiCall(
  endpoint: string,
  options: ApiCallOptions,
  token?: string,
): Promise<Response> {
  const baseUrl =
    typeof window === 'undefined' && process.env.API_INTERNAL_URL
      ? process.env.API_INTERNAL_URL
      : process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
  }

  const authHeader: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  if ('get' in options) {
    const params = options.get
      ? '?' + new URLSearchParams(options.get).toString()
      : '';
    return token
      ? fetch(baseUrl + endpoint + params, { headers: authHeader })
      : fetch(baseUrl + endpoint + params);
  }

  if ('post' in options) {
    return fetch(baseUrl + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(options.post),
    });
  }

  if ('put' in options) {
    return fetch(baseUrl + endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(options.put),
    });
  }

  if ('patch' in options) {
    return fetch(baseUrl + endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeader },
      body: JSON.stringify(options.patch),
    });
  }

  return fetch(baseUrl + endpoint, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', ...authHeader },
    body: JSON.stringify(options.delete),
  });
}

export const get = (
  endpoint: string,
  params?: Record<string, string>,
): Promise<Response> => baseApiCall(endpoint, { get: params });

export const post = (
  endpoint: string,
  body?: unknown,
  token?: string,
): Promise<Response> => baseApiCall(endpoint, { post: body }, token);

export const put = (
  endpoint: string,
  body?: unknown,
): Promise<Response> => baseApiCall(endpoint, { put: body });

export const patch = (
  endpoint: string,
  body?: unknown,
): Promise<Response> => baseApiCall(endpoint, { patch: body });

export const del = (
  endpoint: string,
  body?: unknown,
  token?: string,
): Promise<Response> => baseApiCall(endpoint, { delete: body }, token);

export const postFile = (endpoint: string, body: FormData, token: string): Promise<Response> => {
  const baseUrl =
    typeof window === 'undefined' && process.env.API_INTERNAL_URL
      ? process.env.API_INTERNAL_URL
      : process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not set');
  }
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    body,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};
