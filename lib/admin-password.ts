import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const HASH_LENGTH = 64;

export function hashAdminPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, HASH_LENGTH).toString('hex');

  return `${salt}:${derivedKey}`;
}

export function verifyAdminPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;

  const derivedKey = scryptSync(password, salt, HASH_LENGTH).toString('hex');
  const storedBuffer = Buffer.from(hash, 'hex');
  const derivedBuffer = Buffer.from(derivedKey, 'hex');

  if (storedBuffer.length !== derivedBuffer.length) return false;

  return timingSafeEqual(storedBuffer, derivedBuffer);
}
