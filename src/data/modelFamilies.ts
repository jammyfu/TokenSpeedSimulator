import { ModelFamilyGroup, ModelFamilyId, ModelSpeedRanking, Translation } from '../types';

/**
 * Household model lines first, then a catch-all for diffusion / fast
 * outliers that do not sit in a widely recognized family.
 * SpaceXAI (Grok) and Alibaba (Qwen) stay in the order so a future
 * snapshot row can appear without reshuffling the UI.
 */
export const MODEL_FAMILY_ORDER: ModelFamilyId[] = [
  'openai',
  'anthropic',
  'google',
  'spacexai',
  'deepseek',
  'alibaba',
  'specialists',
];

const FAMILY_LABEL_KEY: Record<ModelFamilyId, keyof Translation> = {
  openai: 'familyOpenAI',
  anthropic: 'familyAnthropic',
  google: 'familyGoogle',
  spacexai: 'familySpaceXAI',
  deepseek: 'familyDeepSeek',
  alibaba: 'familyAlibaba',
  specialists: 'familySpecialists',
};

export function getFamilyLabel(t: Translation, id: ModelFamilyId): string {
  return String(t[FAMILY_LABEL_KEY[id]]);
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
