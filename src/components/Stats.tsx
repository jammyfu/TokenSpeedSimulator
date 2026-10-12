import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { Translation } from '../types';

interface StatsProps {
  t: Translation;
  elapsedTime: number;
  tokensCount: number;
  currentSpeed: string | number;
  compact?: boolean;
  costPerSecLabel?: string;
  spentLabel?: string;
}

export const Stats: React.FC<StatsProps> = ({
  t,
  elapsedTime,
  tokensCount,
  currentSpeed,
  compact = false,
  costPerSecLabel,
  spentLabel,
}) => {
  if (compact) {
    return (
      <section className="shrink-0 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted flex items-center justify-center gap-1">
            <Clock className="w-3 h-3" /> {t.time}
          </p>
          <p className="text-sm font-mono text-ink tabular-nums">
            {(elapsedTime / 1000).toFixed(1)}
            <span className="text-[10px] text-muted ml-0.5">s</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted flex items-center justify-center gap-1">
            <Zap className="w-3 h-3" /> {t.tokens}
          </p>
          <p className="text-sm font-mono text-ink tabular-nums">{tokensCount}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted">{t.realTimeSpeed}</p>
          <p className="text-sm font-mono font-semibold text-accent tabular-nums">{currentSpeed}</p>
        </div>
        {(costPerSecLabel || spentLabel) && (
          <div
            className="col-span-3 flex justify-between gap-2 text-[10px] font-mono text-secondary"
            title={`${t.costPerSec} / ${t.costPerMin} / ${t.costPerHour}`}
          >
            <span>
              {t.costPerSec} {costPerSecLabel ?? t.costNa}
            </span>
            <span>
              {t.spent} {spentLabel ?? t.costNa}
            </span>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="bg-surface border border-line rounded-2xl p-6 grid grid-cols-2 gap-4">
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-widest text-muted flex items-center gap-1">
          <Clock className="w-3 h-3" /> {t.time}
        </span>
        <p className="text-2xl font-mono font-medium text-ink">
          {(elapsedTime / 1000).toFixed(2)}
          <span className="text-sm text-muted ml-1">s</span>
        </p>
      </div>
      <div className="space-y-1">
        <span className="text-[10px] uppercase tracking-widest text-muted flex items-center gap-1">
          <Zap className="w-3 h-3" /> {t.tokens}
        </span>
        <p className="text-2xl font-mono font-medium text-ink">{tokensCount}</p>
      </div>
      <div className="col-span-2 pt-4 border-t border-line space-y-1">
        <span className="text-[10px] uppercase tracking-widest text-muted">{t.realTimeSpeed}</span>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-mono font-bold text-accent">{currentSpeed}</p>
          <span className="text-sm text-muted uppercase font-semibold">{t.tpsUnit}</span>
        </div>
      </div>
    </section>
  );
};
