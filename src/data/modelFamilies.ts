import { ModelFamilyGroup, ModelFamilyId, ModelSpeedRanking, Translation } from '../types';

/**
 * Household Western + Chinese model lines, then diffusion / fast outliers.
 * Doubao and ERNIE stay off the list until AA publishes a median TPS.
 */
export const MODEL_FAMILY_ORDER: ModelFamilyId[] = [
  'openai',
  'anthropic',
  'google',
  'spacexai',
  'deepseek',
  'alibaba',
  'zai',
  'kimi',
  'minimax',
  'specialists',
];

const FAMILY_LABEL_KEY: Record<ModelFamilyId, keyof Translation> = {
  openai: 'familyOpenAI',
  anthropic: 'familyAnthropic',
  google: 'familyGoogle',
  spacexai: 'familySpaceXAI',
  deepseek: 'familyDeepSeek',
  alibaba: 'familyAlibaba',
  zai: 'familyZai',
  kimi: 'familyKimi',
  minimax: 'familyMiniMax',
  specialists: 'familySpecialists',
};

const LINE_NAME: Record<ModelFamilyId, string> = {
  openai: 'GPT',
  anthropic: 'Claude',
  google: 'Gemini',
  spacexai: 'Grok',
  deepseek: 'DeepSeek',
  alibaba: 'Qwen',
  zai: 'GLM',
  kimi: 'Kimi',
  minimax: 'MiniMax',
  specialists: 'Other',
};

export function getFamilyLabel(t: Translation, id: ModelFamilyId): string {
  return String(t[FAMILY_LABEL_KEY[id]]);
}

/** Short name for the model-line dropdown: GPT, Claude, and the rest. */
export function getLineLabel(t: Translation, id: ModelFamilyId): string {
  if (id === 'alibaba') return t.lineAlibaba;
  if (id === 'specialists') return t.lineOther;
  return LINE_NAME[id];
}

export function groupRankingsByFamily(rows: ModelSpeedRanking[]): ModelFamilyGroup[] {
  const buckets = new Map<ModelFamilyId, ModelSpeedRanking[]>();
  for (const id of MODEL_FAMILY_ORDER) {
    buckets.set(id, []);
  }

  for (const row of rows) {
    const list = buckets.get(row.family) ?? buckets.get('specialists');
    list?.push(row);
  }

  return MODEL_FAMILY_ORDER.map((id) => ({
    id,
    models: [...(buckets.get(id) ?? [])].sort((a, b) => b.medianTps - a.medianTps),
  })).filter((group) => group.models.length > 0);
}

export function globalRankById(rows: ModelSpeedRanking[]): Map<string, number> {
  return new Map(rows.map((row, index) => [row.id, index + 1]));
}
