import { cookies } from 'next/headers';

export const getCookieValue = async (key: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
}

export const getCookieAsObject = async (key: string) => {
  const cookieVal = await getCookieValue(key);
  if (cookieVal) {
    try {
      return JSON.parse(cookieVal);
    } catch {
      return null;
    }
  }
  return null;
}
