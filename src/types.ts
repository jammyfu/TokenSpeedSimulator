export type Language = 'en' | 'zh';

export interface Translation {
  title: string;
  description: string;
  speedConfig: string;
  tps: string;
  sourceContent: string;
  sourceToggle: string;
  placeholder: string;
  repeatNote: string;
  sampleText: string;
  start: string;
  pause: string;
  reset: string;
  time: string;
  tokens: string;
  realTimeSpeed: string;
  tpsUnit: string;
  status: string;
  idle: string;
  streaming: string;
  completed: string;
  whatIsToken: string;
  whatIsTokenDesc: string;
  whySpeedMatters: string;
  whySpeedMattersDesc: string;
  clear: string;
  copy: string;
  autoMarkdown: string;
  awaitingSimulation: string;
  language: string;
  rankingTitle: string;
  rankingSubtitle: string;
  rankingSource: string;
  rankingDisclaimer: string;
  rankingSelectHint: string;
  compare: string;
  compareOn: string;
  compareOff: string;
  compareA: string;
  compareB: string;
  setAsCompare: string;
  clearCompare: string;
  selectedModel: string;
  fastestBadge: string;
  contrastBadge: string;
  medianTps: string;
  creator: string;
}

export interface ModelSpeedRanking {
  id: string;
  displayName: string;
  creator: string;
  medianTps: number;
  note?: string;
  source: string;
  fetchedAt: string;
  highlight?: 'fastest' | 'contrast';
}

export interface RankingSourceMeta {
  name: string;
  url: string;
  metric: string;
  fetchedAt: string;
}
