import React from 'react';
import { Translation, ModelSpeedRanking, RankingSourceMeta } from '../types';
import { formatMedianTps } from '../data/modelSpeedRankings';

interface RankingListProps {
  t: Translation;
  rankings: ModelSpeedRanking[];
  source: RankingSourceMeta;
  selectedId: string | null;
  compareId: string | null;
  compareEnabled: boolean;
  onSelect: (id: string) => void;
  onSetCompare: (id: string) => void;
  onClearCompare: () => void;
  onToggleCompare: () => void;
}

export const RankingList: React.FC<RankingListProps> = ({
  t,
  rankings,
  source,
  selectedId,
  compareId,
  compareEnabled,
  onSelect,
  onSetCompare,
  onClearCompare,
  onToggleCompare,
}) => {
  const maxTps = rankings[0]?.medianTps ?? 1;
  const sourceLabel = t.rankingSource.replace('{date}', source.fetchedAt);

  return (
    <section className="min-h-0 min-w-0 shrink-0 lg:flex-1 flex flex-col overflow-hidden">
      <div className="shrink-0 px-3 pt-2.5 pb-1.5 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-white">{t.rankingTitle}</h2>
            <p className="hidden lg:block text-[10px] text-zinc-500 leading-snug">{t.rankingSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={onToggleCompare}
            aria-pressed={compareEnabled}
            className={`shrink-0 px-2 py-1 rounded-md text-[10px] font-medium border transition-colors ${
              compareEnabled
                ? 'bg-emerald-500 text-black border-emerald-400'
                : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
            }`}
          >
            {compareEnabled ? t.compareOn : t.compare}
          </button>
        </div>
        <p className="text-[10px] text-zinc-600 leading-snug truncate">
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-emerald-400 underline-offset-2 hover:underline"
          >
            {sourceLabel}
          </a>
        </p>
        {compareEnabled && compareId && (
          <button
            type="button"
            onClick={onClearCompare}
            className="text-[10px] text-zinc-500 hover:text-white"
          >
            {t.clearCompare}
          </button>
        )}
      </div>

      <ol className="min-w-0 h-[6.25rem] lg:h-auto lg:flex-1 overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto px-2 pb-2 flex lg:block gap-1.5 lg:space-y-0.5 snap-x snap-mandatory lg:snap-none">
        {rankings.map((row, index) => {
          const isA = selectedId === row.id;
          const isB = compareId === row.id;
          const active = isA || isB;
          const width = `${Math.max(6, (row.medianTps / maxTps) * 100)}%`;

          return (
            <li key={row.id} className="snap-start shrink-0 w-40 lg:w-auto">
              <div
                className={`relative flex items-stretch rounded-lg border transition-colors ${
                  active
                    ? 'border-emerald-500/40 bg-emerald-500/10'
                    : 'border-white/5 lg:border-transparent hover:bg-white/5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(row.id)}
                  className="min-w-0 flex-1 px-2 py-1.5 flex items-center gap-2 text-left"
                >
                  <span className="w-5 shrink-0 text-[10px] font-mono text-zinc-600 tabular-nums">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs text-zinc-100 truncate">{row.displayName}</span>
                      {isA && (
                        <span className="shrink-0 text-[9px] px-1 rounded bg-emerald-500 text-black font-bold">
                          {t.compareA}
                        </span>
                      )}
                      {isB && (
                        <span className="shrink-0 text-[9px] px-1 rounded bg-sky-400 text-black font-bold">
                          {t.compareB}
                        </span>
                      )}
                      {row.highlight === 'fastest' && !isA && !isB && (
                        <span className="hidden lg:inline shrink-0 text-[9px] px-1 rounded bg-amber-500/20 text-amber-300">
                          {t.fastestBadge}
                        </span>
                      )}
                      {row.highlight === 'contrast' && !isA && !isB && (
                        <span className="hidden lg:inline shrink-0 text-[9px] px-1 rounded bg-zinc-800 text-zinc-400">
                          {t.contrastBadge}
                        </span>
                      )}
                    </span>
                    <span className="block text-[10px] text-zinc-500 truncate">{row.creator}</span>
                    <span className="mt-1 block h-0.5 rounded-full bg-zinc-800 overflow-hidden">
                      <span className="block h-full bg-emerald-500/70" style={{ width }} />
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-mono text-emerald-400 tabular-nums">
                    {formatMedianTps(row.medianTps)}
                  </span>
                </button>
                {compareEnabled && !isA && (
                  <button
                    type="button"
                    onClick={() => onSetCompare(row.id)}
                    title={t.setAsCompare}
                    className={`shrink-0 px-1.5 text-[10px] font-bold ${
                      isB ? 'text-sky-300' : 'text-zinc-600 hover:text-sky-300'
                    }`}
                  >
                    {t.compareB}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
