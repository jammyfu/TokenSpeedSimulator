import React, { useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { Trash2, Copy, Check, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Translation } from '../types';
import { formatMedianTps } from '../data/modelSpeedRankings';

interface OutputDisplayProps {
  t: Translation;
  streamedText: string;
  isStreaming: boolean;
  onClear: () => void;
  onCopy: () => void;
  copied: boolean;
  autoMarkdown: boolean;
  label?: string;
  creator?: string;
  targetTps?: number;
  liveSpeed?: string;
  tokensCount?: number;
  raceShare?: number;
  compact?: boolean;
  spentLabel?: string;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  t,
  streamedText,
  isStreaming,
  onClear,
  onCopy,
  copied,
  autoMarkdown,
  label,
  creator,
  targetTps,
  liveSpeed,
  tokensCount,
  raceShare,
  compact = false,
  spentLabel,
}) => {
  const streamRef = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = streamRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [streamedText]);

  const statusLabel = isStreaming ? t.streaming : streamedText.length > 0 ? t.completed : t.idle;

  return (
    <div className="h-full min-h-0 flex flex-col bg-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <div className="shrink-0 bg-zinc-900/80 border-b border-white/5 px-3 py-2 flex justify-between items-center gap-2">
        <div className="min-w-0 flex items-center gap-2">
          <div className="hidden sm:flex gap-1.5 shrink-0">
            <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/40" />
            <div className="w-2 h-2 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-zinc-200 truncate">
              {label ?? 'streaming_output.log'}
            </p>
            {(creator || targetTps != null) && (
              <p className="text-[10px] font-mono text-zinc-500 truncate">
                {[creator, targetTps != null ? `${formatMedianTps(targetTps)} t/s` : null]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {tokensCount != null && (
            <span className="hidden sm:inline text-[10px] font-mono text-zinc-400 tabular-nums">
              {tokensCount}
            </span>
          )}
          {spentLabel && (
            <span className="hidden sm:inline text-[10px] font-mono text-amber-300/80 tabular-nums">
              {spentLabel}
            </span>
          )}
          {liveSpeed != null && (
            <span className="text-[11px] font-mono text-emerald-400 tabular-nums">
              {liveSpeed}
            </span>
          )}
          <button
            type="button"
            onClick={onClear}
            className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-zinc-500 hover:text-red-400"
            title={t.clear}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-zinc-500 hover:text-zinc-300"
            title={t.copy}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      {raceShare != null && (
        <div className="shrink-0 h-1 bg-zinc-800" aria-hidden="true">
          <div
            className="h-full bg-emerald-400 transition-[width] duration-150"
            style={{ width: `${Math.max(2, Math.min(100, raceShare * 100))}%` }}
          />
        </div>
      )}

      <div
        ref={streamRef}
        className={`flex-1 min-h-0 overflow-y-auto font-mono leading-relaxed relative markdown-body ${
          compact ? 'p-3 text-sm' : 'p-4 md:p-6 text-base md:text-lg'
        } ${isStreaming ? 'is-streaming' : ''}`}
      >
        <div className={autoMarkdown ? 'break-words' : 'whitespace-pre-wrap break-words'}>
          {autoMarkdown ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{streamedText}</ReactMarkdown>
          ) : (
            <span>{streamedText}</span>
          )}
          {isStreaming && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 h-4 md:w-2.5 md:h-5 bg-emerald-400 ml-1 align-middle cursor"
            />
          )}
        </div>

        {streamedText.length === 0 && !isStreaming && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700 space-y-3 pointer-events-none">
            <Zap className="w-8 h-8 opacity-20" />
            <p className="text-[11px] uppercase tracking-[0.18em] text-center px-4">
              {t.awaitingSimulation}
            </p>
          </div>
        )}
      </div>

      <div className="shrink-0 bg-zinc-900/30 px-3 py-1.5 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
        <span>
          {t.status}: {statusLabel}
        </span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};
