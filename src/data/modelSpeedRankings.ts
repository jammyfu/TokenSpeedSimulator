import { ModelFamilyId, ModelSpeedRanking, RankingSourceMeta } from '../types';

/**
 * Curated snapshot of Artificial Analysis LLM leaderboard output speed.
 * Metric: median output tokens/s. Not a live API benchmark.
 *
 * Verified against the public leaderboard on 2026-10-12:
 * https://artificialanalysis.ai/leaderboards/models
 *
 * AA names Celeris-1 and Mercury 2.5 as the fastest, then Mercury 2 and
 * Gemini 3.5 Flash-Lite. This snapshot uses the page's median output
 * tokens/s: Celeris-1 1,532.0, Mercury 2.5 711.8, Gemini 3.5 Flash-Lite
 * 419.6. Curated current rows per model line, plus slower frontier
 * models for contrast. Not the full catalog.
 *
 * DeepSeek V4.1 Flash 1017 (released 2026-10-17) has no AA median yet;
 * its row uses OpenRouter live p50 throughput (speedBasis openrouter-p50)
 * and is kept out of the AA rank numbers.
 *
 * DeepSeek V4.1 Flash (max) was re-checked on 2026-10-17 against
 * https://artificialanalysis.ai/models/deepseek-v4-1-flash (175.9 t/s).
 *
 * Gemini 4 Argon has no published median tokens/s on that page, so it is
 * omitted. Deprecated rows are left out when a current replacement exists.
 *
 * outputPricePerMillionUsd is USD / 1M output tokens from the matching
 * AA model page when published. Missing price stays undefined (UI: —).
 */
export const RANKING_SOURCE: RankingSourceMeta = {
  name: 'Artificial Analysis',
  url: 'https://artificialanalysis.ai/leaderboards/models',
  metric: 'median output tokens/s',
  fetchedAt: '2026-10-12',
};

const SOURCE = RANKING_SOURCE.name;
const FETCHED_AT = RANKING_SOURCE.fetchedAt;

const RANKING_ROWS: ModelSpeedRanking[] = [
  {
    id: 'celeris-1',
    displayName: 'Celeris-1',
    creator: 'Celeris',
    family: 'specialists',
    medianTps: 1532,
    outputPricePerMillionUsd: 0.7,
    note: 'Fastest published median on the 2026-10-12 leaderboard. Output $0.70/1M.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'fastest',
  },
  {
    id: 'mercury-2-5',
    displayName: 'Mercury 2.5',
    creator: 'Inception',
    family: 'specialists',
    medianTps: 711.8,
    outputPricePerMillionUsd: 0.75,
    note: 'Current Inception speed model. AA lists it with Celeris-1 at the top.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'fastest',
  },
  {
    id: 'gemini-3-5-flash-lite',
    displayName: 'Gemini 3.5 Flash-Lite',
    creator: 'Google',
    family: 'google',
    medianTps: 419.6,
    outputPricePerMillionUsd: 2.5,
    note: 'Fastest current Gemini row on this snapshot.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'trinity-large-thinking',
    displayName: 'Trinity Large Thinking',
    creator: 'Arcee AI',
    family: 'specialists',
    medianTps: 346.8,
    outputPricePerMillionUsd: 0.8,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'ling-3-0-flash-fin',
    displayName: 'Ling 3.0 Flash Fin',
    creator: 'InclusionAI',
    family: 'specialists',
    medianTps: 317.4,
    outputPricePerMillionUsd: 0.22,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'nemotron-3-5-lightning',
    displayName: 'Nemotron 3.5 Lightning',
    creator: 'NVIDIA',
    family: 'specialists',
    medianTps: 302.3,
    outputPricePerMillionUsd: 0.2,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'muse-spark-1-3-xhigh',
    displayName: 'Muse Spark 1.3 (xhigh)',
    creator: 'Meta',
    family: 'specialists',
    medianTps: 239.5,
    outputPricePerMillionUsd: 4.25,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'claude-haiku-5-5-max',
    displayName: 'Claude Haiku 5.5 (max)',
    creator: 'Anthropic',
    family: 'anthropic',
    medianTps: 235.8,
    outputPricePerMillionUsd: 0.5,
    note: 'Current fast Claude. Replaces the older Haiku 4.5 row.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'qwen3-5-omni-flash',
    displayName: 'Qwen3.5 Omni Flash',
    creator: 'Alibaba',
    family: 'alibaba',
    medianTps: 231.1,
    outputPricePerMillionUsd: 0.8,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'ling-3-1-flash',
    displayName: 'Ling 3.1 Flash',
    creator: 'InclusionAI',
    family: 'specialists',
    medianTps: 212.1,
    outputPricePerMillionUsd: 0.9,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'deepseek-v4-1-flash-1017',
    displayName: 'DeepSeek V4.1 Flash 1017',
    creator: 'DeepSeek',
    family: 'deepseek',
    medianTps: 149,
    speedBasis: 'openrouter-p50',
    outputPricePerMillionUsd: 1.2,
    note: 'Released 2026-10-17; now behind deepseek-flash on the DeepSeek API. AA has no median yet. 149 t/s is OpenRouter live p50 throughput for the DeepSeek endpoint, checked 2026-10-17: https://openrouter.ai/deepseek/deepseek-v4.1-flash-1017 . DeepSeek publishes no tokens/s. Output $1.20/1M peak ($0.60 off-peak) per https://api-docs.deepseek.com/quick_start/pricing.',
    source: 'OpenRouter',
    fetchedAt: '2026-10-17',
  },
  {
    id: 'deepseek-v4-1-flash-max',
    displayName: 'DeepSeek V4.1 Flash (max)',
    creator: 'DeepSeek',
    family: 'deepseek',
    medianTps: 175.9,
    outputPricePerMillionUsd: 1.2,
    note: 'Latest DeepSeek Flash. 175.9 t/s on DeepSeek API, AA model page 2026-10-17: https://artificialanalysis.ai/models/deepseek-v4-1-flash',
    source: SOURCE,
    fetchedAt: '2026-10-17',
  },
  {
    id: 'command-a-plus',
    displayName: 'Command A+',
    creator: 'Cohere',
    family: 'specialists',
    medianTps: 194.8,
    note: 'AA publishes speed here and no output price, so cost stays blank.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'gpt-5-5-instant',
    displayName: 'GPT-5.5 Instant',
    creator: 'OpenAI',
    family: 'openai',
    medianTps: 156.3,
    outputPricePerMillionUsd: 30,
    note: 'June 2026 Instant row, the current fast GPT chat SKU on the table.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'gpt-6-luna-max',
    displayName: 'GPT-6 Luna (max)',
    creator: 'OpenAI',
    family: 'openai',
    medianTps: 138,
    outputPricePerMillionUsd: 0.5,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'claude-sonnet-5-5-max',
    displayName: 'Claude Sonnet 5.5 (max)',
    creator: 'Anthropic',
    family: 'anthropic',
    medianTps: 137.4,
    outputPricePerMillionUsd: 10,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'gemini-3-8-flash-high',
    displayName: 'Gemini 3.8 Flash (high)',
    creator: 'Google',
    family: 'google',
    medianTps: 131.5,
    outputPricePerMillionUsd: 3.75,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'minimax-m3',
    displayName: 'MiniMax-M3',
    creator: 'MiniMax',
    family: 'minimax',
    medianTps: 106.7,
    outputPricePerMillionUsd: 1.2,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'claude-opus-5-5-max',
    displayName: 'Claude Opus 5.5 (max)',
    creator: 'Anthropic',
    family: 'anthropic',
    medianTps: 96,
    outputPricePerMillionUsd: 20,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'grok-4-7-xhigh',
    displayName: 'Grok 4.7 (xhigh)',
    creator: 'SpaceXAI',
    family: 'spacexai',
    medianTps: 83.8,
    outputPricePerMillionUsd: 6,
    note: 'Current Grok row. Grok 4.6 is no longer the current line.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'claude-fable-5-1-max',
    displayName: 'Claude Fable 5.1 (max)',
    creator: 'Anthropic',
    family: 'anthropic',
    medianTps: 66.8,
    outputPricePerMillionUsd: 50,
    note: 'Frontier Claude tier, slower for contrast.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'contrast',
  },
  {
    id: 'gpt-6-astra-max',
    displayName: 'GPT-6 Astra (max)',
    creator: 'OpenAI',
    family: 'openai',
    medianTps: 65.8,
    outputPricePerMillionUsd: 50,
    note: 'Frontier GPT tier on the AA median table. Not a Fast or Ultrafast measurement.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'contrast',
  },
  {
    id: 'gpt-6-astra-ultrafast',
    displayName: 'GPT-6 Astra Ultrafast',
    creator: 'OpenAI',
    family: 'openai',
    medianTps: 300,
    speedBasis: 'vendor-ceiling',
    outputPricePerMillionUsd: 300,
    note: 'OpenAI Codex ceiling, 29 Sep 2026: up to 300 t/s and up to 8× Standard. API is up to 6×, output list price 6× Standard ($300/1M). Pro 500. Not an AA median. Pro Fast mode has no published Astra tokens/s.',
    source: 'OpenAI',
    fetchedAt: '2026-09-29',
  },
  {
    id: 'gpt-6-1-sol-max',
    displayName: 'GPT-6.1 Sol (max)',
    creator: 'OpenAI',
    family: 'openai',
    medianTps: 65.8,
    outputPricePerMillionUsd: 10,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'glm-5-3-max',
    displayName: 'GLM-5.3 (max)',
    creator: 'Z AI',
    family: 'zai',
    medianTps: 65.5,
    outputPricePerMillionUsd: 4.4,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'kimi-k2-7-code',
    displayName: 'Kimi K2.7 Code',
    creator: 'Kimi',
    family: 'kimi',
    medianTps: 65,
    outputPricePerMillionUsd: 4,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'glm-5-3-flash',
    displayName: 'GLM-5.3-Flash',
    creator: 'Z AI',
    family: 'zai',
    medianTps: 61.3,
    outputPricePerMillionUsd: 0.5,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'qwen3-8-flash-next',
    displayName: 'Qwen3.8-Flash-Next',
    creator: 'Alibaba',
    family: 'alibaba',
    medianTps: 50.9,
    outputPricePerMillionUsd: 0.47,
    source: SOURCE,
    fetchedAt: FETCHED_AT,
  },
  {
    id: 'kimi-k3-max',
    displayName: 'Kimi K3 (max)',
    creator: 'Kimi',
    family: 'kimi',
    medianTps: 41.2,
    outputPricePerMillionUsd: 15,
    note: 'Slower long-context row for contrast.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
    highlight: 'contrast',
  },
  {
    id: 'qwen3-8-max',
    displayName: 'Qwen3.8 Max',
    creator: 'Alibaba',
    family: 'alibaba',
    medianTps: 36.2,
    outputPricePerMillionUsd: 6,
    note: 'Current 0902 row.',
    source: SOURCE,
    fetchedAt: FETCHED_AT,
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
