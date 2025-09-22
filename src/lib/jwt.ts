// Minimal HS256 JWT utilities using Web Crypto. No external deps.
// Works on Edge Runtime and Node 18+ used by Next.js 15.

const textEncoder = new TextEncoder();

function base64UrlEncode(input: ArrayBuffer | Uint8Array): string {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 =
    typeof btoa !== 'undefined'
      ? btoa(binary)
      : Buffer.from(binary, 'binary').toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(input: string): Uint8Array {
  const padLength = (4 - (input.length % 4)) % 4;
  const base64 =
    input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(padLength);
  const binary =
    typeof atob !== 'undefined'
      ? atob(base64)
      : Buffer.from(base64, 'base64').toString('binary');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export type JwtPayload = Record<string, unknown> & {
  exp?: number;
  iat?: number;
};

export async function signJwt(
  payload: JwtPayload,
  secret: string,
  expiresInSeconds = 60 * 60
): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JwtPayload = {
    iat: now,
    exp: now + expiresInSeconds,
    ...payload,
  };

  const headerB64 = base64UrlEncode(textEncoder.encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(
    textEncoder.encode(JSON.stringify(fullPayload))
  );
  const data = `${headerB64}.${payloadB64}`;

  const key = await importHmacKey(secret);
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    textEncoder.encode(data)
  );
  const signatureB64 = base64UrlEncode(signature);

  return `${data}.${signatureB64}`;
}

export async function verifyJwt(
  token: string,
  secret: string
): Promise<JwtPayload | null> {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    if (!headerB64 || !payloadB64 || !signatureB64) return null;

    const data = `${headerB64}.${payloadB64}`;
    const key = await importHmacKey(secret);
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlDecode(signatureB64),
      textEncoder.encode(data)
    );
    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(base64UrlDecode(payloadB64));
    const payload = JSON.parse(payloadJson) as JwtPayload;
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
