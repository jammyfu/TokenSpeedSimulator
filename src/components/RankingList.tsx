import React, { useEffect, useMemo, useState } from 'react';
import { ModelFamilyId, ModelSpeedRanking, RankingSourceMeta, Translation } from '../types';
import { formatMedianTps } from '../data/modelSpeedRankings';
import { formatUsdPerMillion } from '../lib/tokenCost';
import { getLineLabel, globalRankById, groupRankingsByFamily } from '../data/modelFamilies';

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

interface RankingRowProps {
  t: Translation;
  row: ModelSpeedRanking;
  rank: number;
  maxTps: number;
  selectedId: string | null;
  compareId: string | null;
  compareEnabled: boolean;
  onSelect: (id: string) => void;
  onSetCompare: (id: string) => void;
}

const selectClass =
  'mt-0.5 block w-full rounded-[5px] border border-line bg-surface px-1.5 py-[7px] text-xs text-ink';

const RankingRow: React.FC<RankingRowProps> = ({
  t,
  row,
  rank,
  maxTps,
  selectedId,
  compareId,
  compareEnabled,
  onSelect,
  onSetCompare,
}) => {
  const isA = selectedId === row.id;
  const isB = compareId === row.id;
  const active = isA || isB;
  const width = `${Math.max(6, (row.medianTps / maxTps) * 100)}%`;

  return (
    <li className="snap-start shrink-0 w-40 lg:w-auto">
      <div
        className={`relative flex items-stretch rounded-lg border transition-colors ${
          active
            ? 'border-accent/40 bg-selected'
            : 'border-line lg:border-transparent hover:bg-hover'
        }`}
      >
        <button
          type="button"
          onClick={() => onSelect(row.id)}
          className="min-w-0 flex-1 px-2 py-1.5 flex items-center gap-2 text-left"
        >
          <span className="w-5 shrink-0 text-[10px] font-mono text-muted tabular-nums">
            {row.speedBasis === 'vendor-ceiling' ? t.speedCeiling : rank}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5">
              <span className="text-xs text-ink truncate">{row.displayName}</span>
              {isA && (
                <span className="shrink-0 text-[9px] px-1 rounded bg-ink text-paper font-bold">
                  {t.compareA}
                </span>
              )}
              {isB && (
                <span className="shrink-0 text-[9px] px-1 rounded bg-accent text-paper font-bold">
                  {t.compareB}
                </span>
              )}
              {row.highlight === 'fastest' && !isA && !isB && (
                <span className="hidden lg:inline shrink-0 text-[9px] px-1 rounded bg-selected text-accent">
                  {t.fastestBadge}
                </span>
              )}
              {row.highlight === 'contrast' && !isA && !isB && (
                <span className="hidden lg:inline shrink-0 text-[9px] px-1 rounded bg-subtle text-muted">
                  {t.contrastBadge}
                </span>
              )}
            </span>
            <span className="hidden lg:block text-[10px] text-muted truncate">{row.creator}</span>
            <span className="mt-1 hidden lg:block h-0.5 rounded-full bg-subtle overflow-hidden">
              <span className="block h-full bg-accent/80" style={{ width }} />
            </span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block text-xs font-mono text-accent tabular-nums">
              {formatMedianTps(row.medianTps)}
            </span>
            <span className="hidden lg:block text-[9px] font-mono text-muted tabular-nums">
              {row.outputPricePerMillionUsd != null
                ? formatUsdPerMillion(row.outputPricePerMillionUsd)
                : t.costNa}
            </span>
          </span>
        </button>
        {compareEnabled && !isA && (
          <button
            type="button"
            onClick={() => onSetCompare(row.id)}
            title={t.setAsCompare}
            className={`shrink-0 px-1.5 text-[10px] font-bold ${
              isB ? 'text-accent' : 'text-muted hover:text-accent'
            }`}
          >
            {t.compareB}
          </button>
        )}
      </div>
    </li>
  );
};

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
  const groups = useMemo(() => groupRankingsByFamily(rankings), [rankings]);
  const ranks = useMemo(
    () => globalRankById(rankings.filter((row) => row.speedBasis !== 'vendor-ceiling')),
    [rankings]
  );
  const selectedFamily = rankings.find((row) => row.id === selectedId)?.family;
  const [browseFamily, setBrowseFamily] = useState<ModelFamilyId>(
    () => selectedFamily ?? groups[0]?.id ?? 'openai'
  );

  useEffect(() => {
    if (selectedFamily) {
      setBrowseFamily(selectedFamily);
    }
  }, [selectedFamily]);

  const group = groups.find((item) => item.id === browseFamily) ?? groups[0];
  const versions = group?.models ?? [];
  const versionValue = versions.some((row) => row.id === selectedId) ? (selectedId ?? '') : '';

  return (
    <section className="min-h-0 min-w-0 shrink-0 lg:flex-1 flex flex-col overflow-hidden">
      <div className="shrink-0 px-3 pt-2.5 pb-1.5 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-xs font-semibold text-ink">{t.rankingTitle}</h2>
            <p className="hidden lg:block text-[10px] text-muted leading-snug">{t.rankingSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={onToggleCompare}
            aria-pressed={compareEnabled}
            className={`shrink-0 px-2 py-1 rounded-md text-[10px] font-medium border transition-colors ${
              compareEnabled
                ? 'bg-ink text-paper border-ink'
                : 'bg-surface text-muted border-line hover:text-ink'
            }`}
          >
            {compareEnabled ? t.compareOn : t.compare}
          </button>
        </div>
        <p className="text-[10px] text-muted leading-snug truncate">
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-secondary hover:text-accent underline-offset-2 hover:underline"
          >
            {sourceLabel}
          </a>
        </p>
        {compareEnabled && compareId && (
          <button
            type="button"
            onClick={onClearCompare}
            className="text-[10px] text-muted hover:text-ink"
          >
            {t.clearCompare}
          </button>
        )}
      </div>

      <div className="shrink-0 grid grid-cols-2 gap-1.5 px-3 pb-1.5">
        <label className="min-w-0 text-[10px] text-muted">
          {t.modelLine}
          <select
            aria-label={t.modelLine}
            value={group?.id ?? ''}
            onChange={(event) => setBrowseFamily(event.target.value as ModelFamilyId)}
            className={selectClass}
          >
            {groups.map((item) => (
              <option key={item.id} value={item.id}>
                {getLineLabel(t, item.id)}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0 text-[10px] text-muted">
          {t.modelVersion}
          <select
            aria-label={t.modelVersion}
            value={versionValue}
            onChange={(event) => {
              if (event.target.value) onSelect(event.target.value);
            }}
            className={selectClass}
          >
            {versionValue === '' && <option value="">{t.pickVersion}</option>}
            {versions.map((row) => (
              <option key={row.id} value={row.id}>
                {row.displayName} · {formatMedianTps(row.medianTps)}
              </option>
            ))}
          </select>
        </label>
      </div>
      {group?.id === 'openai' && (
        <p className="shrink-0 px-3 pb-1.5 text-[10px] text-muted leading-snug">{t.gptSpeedTierNote}</p>
      )}

      <div className="min-w-0 h-[5rem] lg:h-auto lg:flex-1 flex flex-col overflow-hidden">
        <div className="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto px-2 pb-2">
          {group && (
            <section>
              <h3 className="hidden lg:sticky lg:top-0 lg:z-10 lg:flex items-center justify-between gap-2 py-1.5 px-1 bg-paper text-[10px] font-semibold uppercase tracking-wider text-muted">
                <span>{getLineLabel(t, group.id)}</span>
                <span className="font-mono font-normal text-secondary tabular-nums">
                  {group.models.length}
                </span>
              </h3>
              <ol className="flex lg:block gap-1.5 lg:space-y-0.5 snap-x snap-mandatory lg:snap-none">
                {group.models.map((row) => (
                  <RankingRow
                    key={row.id}
                    t={t}
                    row={row}
                    rank={ranks.get(row.id) ?? 0}
                    maxTps={maxTps}
                    selectedId={selectedId}
                    compareId={compareId}
                    compareEnabled={compareEnabled}
                    onSelect={(id) => {
                      setBrowseFamily(row.family);
                      onSelect(id);
                    }}
                    onSetCompare={onSetCompare}
                  />
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};
