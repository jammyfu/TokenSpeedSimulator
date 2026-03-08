import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { Translation } from '../types';

interface StatsProps {
  t: Translation;
  elapsedTime: number;
  tokensCount: number;
  currentSpeed: string | number;
}

export const Stats: React.FC<StatsProps> = ({ t, elapsedTime, tokensCount, currentSpeed }) => {
  return (
    <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {t.time}
        </span>
        <p className="text-2xl font-mono font-medium text-white">
          {(elapsedTime / 1000).toFixed(2)}<span className="text-sm text-zinc-500 ml-1">s</span>
        </p>
      </div>
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-1">
          <Zap className="w-3 h-3" /> {t.tokens}
        </span>
        <p className="text-2xl font-mono font-medium text-white">
          {tokensCount}
        </p>
      </div>
      <div className="col-span-2 pt-4 border-t border-white/5 space-y-1">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">{t.realTimeSpeed}</span>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-mono font-bold text-emerald-400">
            {currentSpeed}
          </p>
          <span className="text-sm text-zinc-500 uppercase font-semibold">{t.tpsUnit}</span>
        </div>
      </div>
    </section>
  );
};
