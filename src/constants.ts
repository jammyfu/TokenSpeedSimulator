export const CHARS_PER_TOKEN = 4;
export const MAX_DISPLAY_LENGTH = 5000;
/** Headroom above current AA fastest (~1412 t/s) as published numbers move. */
export const MAX_TPS = 2000;
export const MIN_TPS = 1;
export const TPS_STEP = 5;
export const LANG_STORAGE_KEY = 'token-speed-simulator:lang';
export const DEFAULT_LANGUAGE = 'zh' as const;
