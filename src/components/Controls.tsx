import React from 'react';
import { Gauge, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { Translation } from '../types';
import { MAX_TPS, MIN_TPS, TPS_STEP } from '../constants';

interface ControlsProps {
  t: Translation;
  tps: number;
  setTps: (val: number) => void;
  inputText: string;
  setInputText: (val: string) => void;
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
  inputText,
  setInputText,
  isStreaming,
  onStart,
  onStop,
  onReset,
  autoMarkdown,
  setAutoMarkdown,
  lockedByRanking = false,
}) => {
  return (
    <section className="shrink-0 space-y-3">
      <div className="space-y-2">
        <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5" />
          {t.speedConfig}
          {lockedByRanking && <span className="normal-case font-normal text-zinc-600">· AA</span>}
        </label>
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-400 text-xs">{t.tps}</span>
          <div className="flex items-center gap-1 bg-zinc-950 border border-white/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setTps(Math.max(MIN_TPS, tps - 1))}
              className="p-1 hover:bg-white/5 rounded transition-colors text-zinc-400 hover:text-white"
              aria-label="-1 TPS"
            >
              <Minus className="w-3 h-3" />
            </button>
            <div className="flex items-center text-emerald-400 font-mono font-bold">
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
              className="p-1 hover:bg-white/5 rounded transition-colors text-zinc-400 hover:text-white"
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
          className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
          <span>{MIN_TPS}</span>
          <span>{MAX_TPS}</span>
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoMarkdown}
            onChange={(e) => setAutoMarkdown(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-white/10 bg-zinc-950 text-emerald-500 focus:ring-emerald-500"
          />
          <span className="text-[11px] text-zinc-400">{t.autoMarkdown}</span>
        </label>
      </div>

      <details className="group border-t border-white/5 pt-2">
        <summary className="text-[11px] text-zinc-500 cursor-pointer list-none flex items-center justify-between">
          <span>{t.sourceToggle}</span>
          <span className="text-zinc-600 group-open:rotate-180 transition-transform">▾</span>
        </summary>
        <div className="pt-2 space-y-1.5">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.sourceContent}
            className="w-full h-24 bg-zinc-950 border border-white/10 rounded-lg p-2.5 text-xs focus:outline-none focus:border-emerald-500/50 transition-colors resize-none font-mono leading-relaxed"
          />
          <p className="text-[10px] text-zinc-600">{t.repeatNote}</p>
        </div>
      </details>

      <div className="flex gap-2 pt-1">
        {!isStreaming ? (
          <button
            type="button"
            onClick={onStart}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            {t.start}
          </button>
        ) : (
          <button
            type="button"
            onClick={onStop}
            className="flex-1 bg-zinc-100 hover:bg-white text-black font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Pause className="w-4 h-4 fill-current" />
            {t.pause}
          </button>
        )}
        <button
          type="button"
          onClick={onReset}
          className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors active:scale-[0.98]"
          title={t.reset}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
