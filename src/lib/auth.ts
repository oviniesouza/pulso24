export interface SessionUser {
  email: string;
  role: 'super_admin' | 'client';
  exp: number;
}

const DEFAULT_SECRET = 'pulso24-prod-auth-session-secret-salt-2026';
const SECRET_KEY = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SECRET;

export const MASTER_ADMIN_EMAILS = [
  'admin@pulso24.com.br',
  'vinisouza.marketing@gmail.com',
];

export const MASTER_ADMIN_PASSWORD = process.env.ADMIN_MASTER_PASSWORD || 'Pulso24#SecureCEO!2026';

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createSessionToken(user: Omit<SessionUser, 'exp'> & { expiresInDays?: number }): Promise<string> {
  const exp = Date.now() + (user.expiresInDays || 7) * 24 * 60 * 60 * 1000;
  const payload: SessionUser = {
    email: user.email.toLowerCase().trim(),
    role: user.role,
    exp,
  };

  const enc = new TextEncoder();
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = toBase64Url(enc.encode(payloadJson));

  const key = await getHmacKey(SECRET_KEY);
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, enc.encode(payloadB64));
  const signatureB64 = toBase64Url(new Uint8Array(signatureBuffer));

  return `${payloadB64}.${signatureB64}`;
}

export async function verifySessionToken(token?: string | null): Promise<SessionUser | null> {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signatureB64] = parts;

  try {
    const key = await getHmacKey(SECRET_KEY);
    const enc = new TextEncoder();
    const signatureBytes = fromBase64Url(signatureB64);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as ArrayBuffer,
      enc.encode(payloadB64)
    );

    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(fromBase64Url(payloadB64));
    const payload = JSON.parse(payloadJson) as SessionUser;

    if (Date.now() > payload.exp) {
      return null; // Token expired
    }

    return payload;
  } catch {
    return null;
  }
}
