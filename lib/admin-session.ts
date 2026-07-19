const ADMIN_SESSION_COOKIE = 'nemosa_admin_session';
const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const ADMIN_SESSION_SECRET = 'nemosa-admin-session-secret-v1';

type AdminSessionPayload = {
  email: string;
  exp: number;
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array) {
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(input: string) {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4 || 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function importSessionKey() {
  return crypto.subtle.importKey(
    'raw',
    textEncoder.encode(ADMIN_SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

async function signValue(value: string) {
  const key = await importSessionKey();
  const signature = await crypto.subtle.sign('HMAC', key, textEncoder.encode(value));
  return toBase64Url(new Uint8Array(signature));
}

async function verifySignature(value: string, signature: string) {
  const key = await importSessionKey();
  return crypto.subtle.verify('HMAC', key, fromBase64Url(signature), textEncoder.encode(value));
}

export async function createAdminSessionToken(email: string, remember = false) {
  const exp = Date.now() + (remember ? ADMIN_SESSION_TTL_MS : 1000 * 60 * 60 * 24);
  const payload: AdminSessionPayload = { email, exp };
  const payloadText = JSON.stringify(payload);
  const encodedPayload = toBase64Url(textEncoder.encode(payloadText));
  const signature = await signValue(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const isValid = await verifySignature(encodedPayload, signature);
  if (!isValid) return null;

  try {
    const payloadText = textDecoder.decode(fromBase64Url(encodedPayload));
    const payload = JSON.parse(payloadText) as AdminSessionPayload;

    if (!payload.email || typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}
