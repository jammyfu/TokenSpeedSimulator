export type SourceFetchErrorCode = 'invalid' | 'blocked' | 'empty' | 'failed';

export class SourceFetchError extends Error {
  readonly code: SourceFetchErrorCode;

  constructor(code: SourceFetchErrorCode, message?: string) {
    super(message ?? code);
    this.name = 'SourceFetchError';
    this.code = code;
  }
}

const BLOCKED_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1', 'metadata.google.internal']);

export function parsePublicHttpUrl(value: string): URL {
  const trimmed = value.trim();
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new SourceFetchError('invalid');
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new SourceFetchError('invalid');
  }
  const host = parsed.hostname.toLowerCase().replace(/\.+$/, '');
  if (BLOCKED_HOSTS.has(host) || host.endsWith('.localhost') || host.endsWith('.local')) {
    throw new SourceFetchError('blocked');
  }
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host) && isPrivateIPv4(host)) {
    throw new SourceFetchError('blocked');
  }
  return parsed;
}

function isPrivateIPv4(host: string): boolean {
  const [a, b] = host.split('.').map((part) => Number(part));
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}
