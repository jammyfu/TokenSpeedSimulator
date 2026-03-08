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
}

export const Controls: React.FC<ControlsProps> = ({
  t, tps, setTps, inputText, setInputText, isStreaming, onStart, onStop, onReset
}) => {
  return (
    <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
      <div className="space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          {t.speedConfig}
        </label>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">{t.tps}</span>
            <div className="flex items-center gap-2 bg-zinc-950 border border-white/10 rounded-lg p-1">
              <button 
                onClick={() => setTps(Math.max(MIN_TPS, tps - 1))}
                className="p-1 hover:bg-white/5 rounded transition-colors text-zinc-400 hover:text-white"
              >
                <Minus className="w-3 h-3" />
              </button>
              <div className="flex items-center text-emerald-400 font-mono font-bold">
                <input 
                  type="number"
                  value={tps}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) {
                      setTps(Math.min(MAX_TPS, Math.max(0, val)));
                    } else if (e.target.value === '') {
                      setTps(0); 
                    }
                  }}
                  onBlur={() => {
                    if (tps < MIN_TPS) setTps(MIN_TPS);
                  }}
                  className="w-12 bg-transparent border-none text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[10px] ml-0.5 opacity-50">TPS</span>
              </div>
              <button 
                onClick={() => setTps(Math.min(MAX_TPS, tps + 1))}
                className="p-1 hover:bg-white/5 rounded transition-colors text-zinc-400 hover:text-white"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <input 
            type="range" 
            min="0" 
            max={MAX_TPS} 
            step={TPS_STEP}
            value={tps} 
            onChange={(e) => setTps(Math.max(MIN_TPS, parseInt(e.target.value)))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
            <span>{MIN_TPS} TPS</span>
            <span>{MAX_TPS / 2} TPS</span>
            <span>{MAX_TPS} TPS</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          {t.sourceContent}
        </label>
        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.placeholder}
          className="w-full h-48 bg-zinc-950 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none font-mono leading-relaxed"
        />
        <p className="text-[10px] text-zinc-500 italic">
          {t.repeatNote}
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        {!isStreaming ? (
          <button 
            onClick={onStart}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            {t.start}
          </button>
        ) : (
          <button 
            onClick={onStop}
            className="flex-1 bg-zinc-100 hover:bg-white text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Pause className="w-4 h-4 fill-current" />
            {t.pause}
          </button>
        )}
        <button 
          onClick={onReset}
          className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors active:scale-[0.98]"
          title={t.reset}
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
