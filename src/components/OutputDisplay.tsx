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
    <div className="h-full min-h-0 flex flex-col bg-field border border-line rounded-xl overflow-hidden shadow-sm">
      <div className="shrink-0 bg-surface border-b border-line px-3 py-2 flex justify-between items-center gap-2">
        <div className="min-w-0 flex items-center gap-2">
          <div className="hidden sm:flex gap-1.5 shrink-0">
            <div className="w-2 h-2 rounded-full bg-accent/25 border border-accent/50" />
            <div className="w-2 h-2 rounded-full bg-subtle border border-line" />
            <div className="w-2 h-2 rounded-full bg-hover border border-line" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-ink truncate">
              {label ?? 'streaming_output.log'}
            </p>
            {(creator || targetTps != null) && (
              <p className="text-[10px] font-mono text-muted truncate">
                {[creator, targetTps != null ? `${formatMedianTps(targetTps)} t/s` : null]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {tokensCount != null && (
            <span className="hidden sm:inline text-[10px] font-mono text-secondary tabular-nums">
              {tokensCount}
            </span>
          )}
          {spentLabel && (
            <span className="hidden sm:inline text-[10px] font-mono text-muted tabular-nums">
              {spentLabel}
            </span>
          )}
          {liveSpeed != null && (
            <span className="text-[11px] font-mono text-accent tabular-nums">
              {liveSpeed}
            </span>
          )}
          <button
            type="button"
            onClick={onClear}
            className="p-1.5 hover:bg-hover rounded-md transition-colors text-muted hover:text-accent"
            title={t.clear}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onCopy}
            className="p-1.5 hover:bg-hover rounded-md transition-colors text-muted hover:text-ink"
            title={t.copy}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      {raceShare != null && (
        <div className="shrink-0 h-1 bg-subtle" aria-hidden="true">
          <div
            className="h-full bg-accent transition-[width] duration-150"
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
              className="inline-block w-2 h-4 md:w-2.5 md:h-5 bg-accent ml-1 align-middle cursor"
            />
          )}
        </div>

        {streamedText.length === 0 && !isStreaming && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted space-y-3 pointer-events-none">
            <Zap className="w-8 h-8 opacity-20" />
            <p className="text-[11px] uppercase tracking-[0.18em] text-center px-4">
              {t.awaitingSimulation}
            </p>
          </div>
        )}
      </div>

      <div className="shrink-0 bg-surface px-3 py-1.5 border-t border-line flex justify-between items-center text-[10px] font-mono text-muted uppercase tracking-widest">
        <span>
          {t.status}: {statusLabel}
        </span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};
