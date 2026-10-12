import React from 'react';
import { Gauge, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Translation } from '../types';
import { MAX_TPS, MIN_TPS, TPS_STEP } from '../constants';

interface ControlsProps {
  t: Translation;
  tps: number;
  setTps: (val: number) => void;
  isStreaming: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  autoMarkdown: boolean;
  setAutoMarkdown: (val: boolean) => void;
  lockedByRanking?: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  t,
  tps,
  setTps,
  isStreaming,
  onStart,
  onStop,
  onReset,
  autoMarkdown,
  setAutoMarkdown,
  lockedByRanking = false,
}) => {
  return (
    <section className="shrink-0 flex flex-col-reverse lg:flex-col gap-3">
      <div className="space-y-2">
        <label className="hidden sm:flex text-[10px] font-semibold uppercase tracking-wider text-muted items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5" />
          {t.speedConfig}
          {lockedByRanking && <span className="normal-case font-normal text-secondary">· AA</span>}
        </label>
        <div className="hidden sm:flex justify-between items-center text-sm">
          <span className="text-secondary text-xs">{t.tps}</span>
          <div className="flex items-center gap-1 bg-field border border-line rounded-lg p-1">
            <button
              type="button"
              onClick={() => setTps(Math.max(MIN_TPS, tps - 1))}
              className="p-1 hover:bg-hover rounded transition-colors text-muted hover:text-ink"
              aria-label="-1 TPS"
            >
              <Minus className="w-3 h-3" />
            </button>
            <div className="flex items-center text-accent font-mono font-bold">
              <input
                type="number"
                value={tps}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!Number.isNaN(val)) {
                    setTps(Math.min(MAX_TPS, Math.max(0, val)));
                  } else if (e.target.value === '') {
                    setTps(0);
                  }
                }}
                onBlur={() => {
                  if (tps < MIN_TPS) setTps(MIN_TPS);
                }}
                aria-label={t.tps}
                className="w-14 bg-transparent border-none text-center text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[10px] mr-1 opacity-50">TPS</span>
            </div>
            <button
              type="button"
              onClick={() => setTps(Math.min(MAX_TPS, tps + 1))}
              className="p-1 hover:bg-hover rounded transition-colors text-muted hover:text-ink"
              aria-label="+1 TPS"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
        <input
          type="range"
          min={MIN_TPS}
          max={MAX_TPS}
          step={TPS_STEP}
          value={tps}
          onChange={(e) => setTps(Math.max(MIN_TPS, parseInt(e.target.value, 10)))}
          aria-label={t.tps}
          className="hidden sm:block w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-accent"
        />
        <div className="hidden sm:flex justify-between text-[10px] text-muted font-mono">
          <span>{MIN_TPS}</span>
          <span>{MAX_TPS}</span>
        </div>
        <label className="hidden sm:flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoMarkdown}
            onChange={(e) => setAutoMarkdown(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-line bg-field text-accent focus:ring-accent"
          />
          <span className="text-[11px] text-secondary">{t.autoMarkdown}</span>
        </label>
      </div>

      <div className="flex gap-2">
        {!isStreaming ? (
          <button
            type="button"
            onClick={onStart}
            className="flex-1 bg-ink hover:opacity-90 text-paper font-bold py-2.5 rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            {t.start}
          </button>
        ) : (
          <button
            type="button"
            onClick={onStop}
            className="flex-1 bg-subtle hover:bg-hover text-ink font-bold py-2.5 rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Pause className="w-4 h-4 fill-current" />
            {t.pause}
          </button>
        )}
        <button
          type="button"
          onClick={onReset}
          className="p-2.5 bg-surface hover:bg-hover text-ink border border-line rounded-full transition-colors active:scale-[0.98]"
          title={t.reset}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
