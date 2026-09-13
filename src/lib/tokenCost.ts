/** Output-token list prices are USD per 1M tokens (Artificial Analysis model pages). */

export function usdPerOutputToken(pricePerMillionUsd: number): number {
  return pricePerMillionUsd / 1_000_000;
}

export function streamingCostUsd(
  tps: number,
  pricePerMillionUsd?: number
): { perSec: number; perMin: number; perHour: number } | null {
  if (pricePerMillionUsd == null) return null;
  const perSec = tps * usdPerOutputToken(pricePerMillionUsd);
  return {
    perSec,
    perMin: perSec * 60,
    perHour: perSec * 3600,
  };
}

export function cumulativeCostUsd(tokens: number, pricePerMillionUsd?: number): number | null {
  if (pricePerMillionUsd == null) return null;
  return tokens * usdPerOutputToken(pricePerMillionUsd);
}

export function formatUsd(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1) return `$${value.toFixed(2)}`;
  if (abs >= 0.01) return `$${value.toFixed(4)}`;
  if (abs >= 0.0001) return `$${value.toFixed(6)}`;
  return `$${value.toExponential(1)}`;
}

export function formatUsdPerMillion(value: number): string {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/M`;
}
