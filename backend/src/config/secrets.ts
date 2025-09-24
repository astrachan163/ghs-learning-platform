export interface SecretSpec { key: string; required?: boolean; defaultValue?: string; }

const SPECS: SecretSpec[] = [
  { key: 'FIREBASE_API_KEY', required: true },
  { key: 'GOOGLE_OAUTH_CLIENT_ID', required: true }
];

export function loadSecrets() {
  const result: Record<string,string> = {};
  for (const s of SPECS) {
    const val = process.env[s.key] || s.defaultValue;
    if (!val && s.required) throw new Error(`Missing required secret: ${s.key}`);
    if (val) result[s.key] = val;
  }
  return result;
}