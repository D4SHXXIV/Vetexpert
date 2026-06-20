// src/lib/auth.ts
const JWT_SECRET = process.env.JWT_SECRET || "vetexpert-default-secret-key-xyz-98765";
const encoder = new TextEncoder();

async function getCryptoKey() {
  const keyBuffer = encoder.encode(JWT_SECRET);
  return crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signToken(username: string, expiresAt: number): Promise<string> {
  const key = await getCryptoKey();
  const payload = `${username}:${expiresAt}`;
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  
  // Convert signature to hex string
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `${payload}:${signatureHex}`;
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return false;
    
    const [username, expiresAtStr, signatureHex] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    
    // Check expiration
    if (Date.now() > expiresAt) return false;
    
    // Verify signature
    const key = await getCryptoKey();
    const payload = `${username}:${expiresAt}`;
    
    // Reconstruct signature buffer from hex string
    const hexArray = signatureHex.match(/.{1,2}/g);
    if (!hexArray) return false;
    const signatureBuffer = new Uint8Array(hexArray.map(byte => parseInt(byte, 16)));
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      encoder.encode(payload)
    );
    
    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    return isValid && username === expectedUsername;
  } catch (e) {
    return false;
  }
}
