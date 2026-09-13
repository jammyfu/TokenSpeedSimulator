import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Controls } from './components/Controls';
import { Stats } from './components/Stats';
import { OutputDisplay } from './components/OutputDisplay';
import { RankingList } from './components/RankingList';
import { useLanguage } from './hooks/useLanguage';
import { useTokenStream } from './hooks/useTokenStream';
import {
  MODEL_SPEED_RANKINGS,
  RANKING_SOURCE,
  findRanking,
  isSameFamily,
  rankingToTps,
} from './data/modelSpeedRankings';
import { MAX_TPS } from './constants';
import { cumulativeCostUsd, formatUsd, streamingCostUsd } from './lib/tokenCost';
import { translations } from './i18n/translations';
import { Language } from './types';

const DEFAULT_MODEL_ID = MODEL_SPEED_RANKINGS[0]?.id ?? 'celeris-1';

export default function App() {
  const { lang, setLang, t } = useLanguage();
  const [inputText, setInputText] = useState(() => translations[lang].sampleText);
  const [selectedId, setSelectedId] = useState<string>(DEFAULT_MODEL_ID);
  const [compareId, setCompareId] = useState<string | null>(null);
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [tps, setTpsState] = useState(() => {
    const row = findRanking(DEFAULT_MODEL_ID);
    return row ? rankingToTps(row) : 30;
  });
  const [autoMarkdown, setAutoMarkdown] = useState(true);
  const [copiedA, setCopiedA] = useState(false);
  const [copiedB, setCopiedB] = useState(false);

  const selected = findRanking(selectedId);
  const compare = compareId ? findRanking(compareId) : undefined;
  const compareTps = compare ? rankingToTps(compare) : tps;
  const racing = compareEnabled && Boolean(compare);

  const streamA = useTokenStream({ inputText, tps });
  const streamB = useTokenStream({ inputText, tps: compareTps });

  const setTps = useCallback((value: number) => {
    setTpsState(Math.min(MAX_TPS, Math.max(0, value)));
  }, []);

  const handleLanguageChange = useCallback(
    (next: Language) => {
      const previousSample = translations[lang].sampleText;
      setLang(next);
      setInputText((current) => (current === previousSample ? translations[next].sampleText : current));
    },
    [lang, setLang]
  );

  const handleSelect = useCallback((id: string) => {
    const row = findRanking(id);
    if (!row) return;
    if (!isSameFamily(selectedId, id)) {
      streamA.reset();
    }
    setSelectedId(id);
    setTpsState(rankingToTps(row));
    if (compareId === id) {
      setCompareId(null);
    }
  }, [compareId, selectedId, streamA.reset]);

  const handleSetCompare = useCallback((id: string) => {
    if (id === selectedId) return;
    if (!isSameFamily(compareId, id)) {
      streamB.reset();
    }
    setCompareId(id);
    setCompareEnabled(true);
  }, [selectedId, compareId, streamB.reset]);

  const handleClearCompare = useCallback(() => {
    setCompareId(null);
  }, []);

  const handleToggleCompare = useCallback(() => {
    setCompareEnabled((on) => {
      if (on) {
        setCompareId(null);
        return false;
      }
      return true;
    });
  }, []);

  const handleStart = useCallback(() => {
    streamA.startStreaming();
    if (compareEnabled && compare) {
      streamB.startStreaming();
    }
  }, [streamA, streamB, compareEnabled, compare]);

  const handleStop = useCallback(() => {
    streamA.stopStreaming();
    streamB.stopStreaming();
  }, [streamA, streamB]);

  const handleReset = useCallback(() => {
    streamA.reset();
    streamB.reset();
  }, [streamA, streamB]);

  const copyPane = useCallback(async (text: string, which: 'a' | 'b') => {
    try {
      await navigator.clipboard.writeText(text);
      if (which === 'a') {
        setCopiedA(true);
        setTimeout(() => setCopiedA(false), 2000);
      } else {
        setCopiedB(true);
        setTimeout(() => setCopiedB(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, []);

  useEffect(() => {
    if (!compareEnabled) {
      streamB.stopStreaming();
    }
  }, [compareEnabled, streamB.stopStreaming]);

  const isStreaming = streamA.isStreaming || (racing && streamB.isStreaming);
  const combinedTokens = racing ? streamA.tokensCount + streamB.tokensCount : streamA.tokensCount;
  const elapsed = Math.max(streamA.elapsedTime, racing ? streamB.elapsedTime : 0);
  const raceLead = Math.max(streamA.tokensCount, streamB.tokensCount, 1);
  const rateA = streamingCostUsd(tps, selected?.outputPricePerMillionUsd);
  const rateB = streamingCostUsd(compareTps, compare?.outputPricePerMillionUsd);
  const spentA = cumulativeCostUsd(streamA.tokensCount, selected?.outputPricePerMillionUsd);
  const spentB = cumulativeCostUsd(streamB.tokensCount, compare?.outputPricePerMillionUsd);
  const costPerSecLabel = racing
    ? `${rateA ? formatUsd(rateA.perSec) : t.costNa} / ${rateB ? formatUsd(rateB.perSec) : t.costNa}`
    : rateA
      ? `${formatUsd(rateA.perSec)}/s · ${formatUsd(rateA.perMin)}/min`
      : t.costNa;
  const spentLabel = racing
    ? `${spentA != null ? formatUsd(spentA) : t.costNa} / ${spentB != null ? formatUsd(spentB) : t.costNa}`
    : spentA != null
      ? formatUsd(spentA)
      : t.costNa;

  return (
    <div className="h-dvh w-full overflow-hidden bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-emerald-500/30 flex flex-col">
      <Header t={t} lang={lang} onLanguageChange={handleLanguageChange} />

      <div className="flex-1 min-h-0 min-w-0 grid grid-rows-[minmax(0,1fr)_auto] lg:grid-rows-1 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="min-h-0 min-w-0 p-2 md:p-3">
          {racing ? (
            <div className="h-full min-h-0 grid grid-cols-2 gap-2">
              <OutputDisplay
                t={t}
                streamedText={streamA.streamedText}
                isStreaming={streamA.isStreaming}
                onClear={streamA.clearOutput}
                onCopy={() => copyPane(streamA.streamedText, 'a')}
                copied={copiedA}
                autoMarkdown={autoMarkdown}
                label={`${t.compareA} · ${selected?.displayName ?? 'A'}`}
                creator={selected?.creator}
                targetTps={selected?.medianTps ?? tps}
                liveSpeed={streamA.currentSpeed}
                tokensCount={streamA.tokensCount}
                raceShare={streamA.tokensCount / raceLead}
                spentLabel={spentA != null ? formatUsd(spentA) : t.costNa}
                compact
              />
              <OutputDisplay
                t={t}
                streamedText={streamB.streamedText}
                isStreaming={streamB.isStreaming}
                onClear={streamB.clearOutput}
                onCopy={() => copyPane(streamB.streamedText, 'b')}
                copied={copiedB}
                autoMarkdown={autoMarkdown}
                label={`${t.compareB} · ${compare?.displayName ?? 'B'}`}
                creator={compare?.creator}
                targetTps={compare?.medianTps}
                liveSpeed={streamB.currentSpeed}
                tokensCount={streamB.tokensCount}
                raceShare={streamB.tokensCount / raceLead}
                spentLabel={spentB != null ? formatUsd(spentB) : t.costNa}
                compact
              />
            </div>
          ) : (
            <OutputDisplay
              t={t}
              streamedText={streamA.streamedText}
              isStreaming={streamA.isStreaming}
              onClear={streamA.clearOutput}
              onCopy={() => copyPane(streamA.streamedText, 'a')}
              copied={copiedA}
              autoMarkdown={autoMarkdown}
              label={selected ? selected.displayName : undefined}
              creator={selected?.creator}
              targetTps={selected?.medianTps ?? tps}
              liveSpeed={streamA.currentSpeed}
              tokensCount={streamA.tokensCount}
              spentLabel={spentA != null ? formatUsd(spentA) : undefined}
            />
          )}
        </section>

        <aside className="w-full min-h-0 min-w-0 max-h-[46dvh] lg:max-h-none flex flex-col overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0a0a0a]">
          <RankingList
            t={t}
            rankings={MODEL_SPEED_RANKINGS}
            source={RANKING_SOURCE}
            selectedId={selectedId}
            compareId={compareId}
            compareEnabled={compareEnabled}
            onSelect={handleSelect}
            onSetCompare={handleSetCompare}
            onClearCompare={handleClearCompare}
            onToggleCompare={handleToggleCompare}
          />
          <div className="shrink-0 min-w-0 px-3 pb-2 space-y-2 border-t border-white/5 overflow-y-auto max-h-[14rem] lg:max-h-none">
            <p className="pt-2 text-[10px] text-zinc-500 truncate">
              {t.selectedModel}: {selected?.displayName ?? '—'}
              {racing && compare ? `  vs  ${compare.displayName}` : ''}
            </p>
            <div className="hidden lg:block">
              <Stats
                t={t}
                elapsedTime={elapsed}
                tokensCount={combinedTokens}
                currentSpeed={racing ? `${streamA.currentSpeed} / ${streamB.currentSpeed}` : streamA.currentSpeed}
                compact
                costPerSecLabel={costPerSecLabel}
                spentLabel={spentLabel}
              />
            </div>
            <Controls
              t={t}
              tps={tps}
              setTps={setTps}
              inputText={inputText}
              setInputText={setInputText}
              isStreaming={isStreaming}
              onStart={handleStart}
              onStop={handleStop}
              onReset={handleReset}
              autoMarkdown={autoMarkdown}
              setAutoMarkdown={setAutoMarkdown}
              lockedByRanking={Boolean(selected)}
            />
          </div>
          <Footer t={t} />
        </aside>
      </div>
    </div>
  );
}
