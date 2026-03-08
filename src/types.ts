export type Language = 'en' | 'zh';

export interface Translation {
  title: string;
  description: string;
  speedConfig: string;
  tps: string;
  sourceContent: string;
  placeholder: string;
  repeatNote: string;
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
  typicalSpeeds: string;
  whySpeedMatters: string;
  whySpeedMattersDesc: string;
  clear: string;
  copy: string;
}
