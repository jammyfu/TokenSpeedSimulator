import { ModelFamilyId, ModelSpeedRanking, RankingSourceMeta } from '../types';

/**
 * Curated snapshot of Artificial Analysis LLM leaderboard output speed.
 * Metric: median output tokens/s. Not a live API benchmark.
 *
 * Verified against the public leaderboard on 2026-09-13:
 * https://artificialanalysis.ai/leaderboards/models
 *
 * AA FAQ on that page: Celeris-1 1,411.9 t/s, Mercury 2 734.0 t/s,
 * Gemini 3.5 Flash-Lite 372.4 t/s. Other rows use the published table
 * median Tokens/s. Curated top-speed names plus well-known slower
 * frontier/chat models for contrast — not the full 300-row catalog.
 *
 * Extra household CN / Grok rows added from the same public table
 * (2026-09-13). Doubao Seed Code and ERNIE 5.0/4.5 have no AA median
 * Tokens/s on that table, so they are omitted rather than invented.
 *
 * outputPricePerMillionUsd is USD / 1M output tokens from the matching
 * AA model page when published. Missing price stays undefined (UI: —).
 */
export const RANKING_SOURCE: RankingSourceMeta = {
  name: 'Artificial Analysis',
  url: 'https://artificialanalysis.ai/leaderboards/models',
  metric: 'median output tokens/s',
  fetchedAt: '2026-09-13',
};

const SOURCE = RANKING_SOURCE.name;
const FETCHED_AT = RANKING_SOURCE.fetchedAt;

const RANKING_ROWS: ModelSpeedRanking[] = [
  {
    id: 'celeris-1',
    displayName: 'Celeris-1',
    creator: 'Celeris',
    family: 'specialists',
    medianTps: 1411.9,
    outputPricePerMillionUsd: 0.7,
    note: 'AA fastest on the public leaderboard FAQ. Output $0.70/1M (AA model page).',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'fastest',
  },
  {
    id: 'mercury-2',
    displayName: 'Mercury 2',
    creator: 'Inception',
    family: 'specialists',
    medianTps: 734,
    outputPricePerMillionUsd: 0.75,
    note: 'Second-fastest in AA output-speed callout.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'fastest',
  },
  {
    id: 'gemini-3-5-flash-lite',
    displayName: 'Gemini 3.5 Flash-Lite',
    creator: 'Google',
    family: 'google',
    medianTps: 372.4,
    note: 'Fastest widely known Gemini Flash-family SKU on this snapshot.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'hypernova-60b-2605-high',
    displayName: 'HyperNova 60B 2605 (high)',
    creator: 'Multiverse Computing',
    family: 'specialists',
    medianTps: 361,
    note: 'High-effort HyperNova row from the AA table.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'trinity-large-thinking',
    displayName: 'Trinity Large Thinking',
    creator: 'Arcee AI',
    family: 'specialists',
    medianTps: 322,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'ling-3-0-flash',
    displayName: 'Ling 3.0 Flash',
    creator: 'InclusionAI',
    family: 'specialists',
    medianTps: 315,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'nemotron-3-5-lightning',
    displayName: 'Nemotron 3.5 Lightning',
    creator: 'NVIDIA',
    family: 'specialists',
    medianTps: 283,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'gemini-3-7-flash-high',
    displayName: 'Gemini 3.7 Flash (high)',
    creator: 'Google',
    family: 'google',
    medianTps: 295,
    note: 'Gemini Flash family, high-effort row.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'gemini-3-8-flash-high',
    displayName: 'Gemini 3.8 Flash (high)',
    creator: 'Google',
    family: 'google',
    medianTps: 269,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'command-a-plus',
    displayName: 'Command A+',
    creator: 'Cohere',
    family: 'specialists',
    medianTps: 241,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'deepseek-v4-1-flash-max',
    displayName: 'DeepSeek V4.1 Flash (max)',
    creator: 'DeepSeek',
    family: 'deepseek',
    medianTps: 213,
    outputPricePerMillionUsd: 1.2,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'muse-spark-1-3-max',
    displayName: 'Muse Spark 1.3 (max)',
    creator: 'Meta',
    family: 'specialists',
    medianTps: 206,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'gpt-5-5-instant',
    displayName: 'GPT-5.5 Instant',
    creator: 'OpenAI',
    family: 'openai',
    medianTps: 129,
    note: 'Well-known mid-speed GPT chat SKU.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'gpt-5-6-luna-max',
    displayName: 'GPT-5.6 Luna (max)',
    creator: 'OpenAI',
    family: 'openai',
    medianTps: 112,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'claude-4-5-haiku',
    displayName: 'Claude 4.5 Haiku',
    creator: 'Anthropic',
    family: 'anthropic',
    medianTps: 85,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'claude-sonnet-5-max',
    displayName: 'Claude Sonnet 5 (max)',
    creator: 'Anthropic',
    family: 'anthropic',
    medianTps: 74,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'contrast',
  },
  {
    id: 'claude-fable-5-1-max',
    displayName: 'Claude Fable 5.1 (max)',
    creator: 'Anthropic',
    family: 'anthropic',
    medianTps: 67,
    note: 'Frontier intelligence tier — slower for contrast.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'contrast',
  },
  {
    id: 'gpt-6-astra-max',
    displayName: 'GPT-6 Astra (max)',
    creator: 'OpenAI',
    family: 'openai',
    medianTps: 54,
    note: 'Frontier GPT tier — slower for contrast.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'contrast',
  },
  {
    id: 'claude-opus-5-max',
    displayName: 'Claude Opus 5 (max)',
    creator: 'Anthropic',
    family: 'anthropic',
    medianTps: 51,
    outputPricePerMillionUsd: 25,
    note: 'Frontier Claude tier — slower for contrast.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'contrast',
  },
  {
    id: 'glm-5-3-flash',
    displayName: 'GLM-5.3-Flash',
    creator: 'Z AI',
    family: 'zai',
    medianTps: 107,
    note: 'AA public leaderboard median Tokens/s, 2026-09-13.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'minimax-m3',
    displayName: 'MiniMax-M3',
    creator: 'MiniMax',
    family: 'minimax',
    medianTps: 97,
    outputPricePerMillionUsd: 1.2,
    note: 'AA model page: 97.0 t/s, output $1.20/1M.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'glm-5-3-max',
    displayName: 'GLM-5.3 (max)',
    creator: 'Z AI',
    family: 'zai',
    medianTps: 66,
    outputPricePerMillionUsd: 4.4,
    note: 'AA model page: 66.1 t/s, output $4.40/1M.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'grok-4-6-high',
    displayName: 'Grok 4.6 (high)',
    creator: 'SpaceXAI',
    family: 'spacexai',
    medianTps: 58,
    outputPricePerMillionUsd: 6,
    note: 'AA model page: 58.2 t/s, output $6.00/1M.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'qwen3-8-flash-next',
    displayName: 'Qwen3.8-Flash-Next',
    creator: 'Alibaba',
    family: 'alibaba',
    medianTps: 50,
    note: 'AA public leaderboard median Tokens/s, 2026-09-13.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'qwen3-8-max',
    displayName: 'Qwen3.8 Max',
    creator: 'Alibaba',
    family: 'alibaba',
    medianTps: 40,
    outputPricePerMillionUsd: 6,
    note: 'AA model page: 39.9 t/s, output $6.00/1M.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'kimi-k3-max',
    displayName: 'Kimi K3 (max)',
    creator: 'Kimi',
    family: 'kimi',
    medianTps: 38,
    note: 'Well-known long-context model, slower output for contrast.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'contrast',
  },
];

export const MODEL_SPEED_RANKINGS: ModelSpeedRanking[] = [...RANKING_ROWS].sort(
  (a, b) => b.medianTps - a.medianTps
);

export function findRanking(id: string): ModelSpeedRanking | undefined {
  return MODEL_SPEED_RANKINGS.find((row) => row.id === id);
}

export function rankingFamily(id: string | null | undefined): ModelFamilyId | undefined {
  if (!id) return undefined;
  return findRanking(id)?.family;
}

export function isSameFamily(
  a: string | null | undefined,
  b: string | null | undefined
): boolean {
  const familyA = rankingFamily(a);
  const familyB = rankingFamily(b);
  return familyA != null && familyA === familyB;
}

export function formatMedianTps(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  const isWhole = Number.isInteger(rounded);
  return rounded.toLocaleString('en-US', {
    minimumFractionDigits: isWhole ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

export function rankingToTps(row: ModelSpeedRanking): number {
  return Math.round(row.medianTps);
}
