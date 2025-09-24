import crypto from 'crypto';

export function hashPassword(password: string, salt?: string) {
  const s = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, s, 64).toString('hex');
  return { salt: s, hash };
}

export function verifyPassword(password: string, salt: string, expected: string) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash,'hex'), Buffer.from(expected,'hex'));
}