import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { Translation } from '../types';
import { fetchSourcePage, SourceFetchError } from '../lib/fetchSourcePage';

interface SourceEditorProps {
  t: Translation;
  inputText: string;
  setInputText: (value: string) => void;
}

export const SourceEditor: React.FC<SourceEditorProps> = ({ t, inputText, setInputText }) => {
  const [sourceUrl, setSourceUrl] = useState('');
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchErrorMessage = (error: unknown): string => {
    if (error instanceof SourceFetchError) {
      if (error.code === 'invalid') return t.sourceFetchInvalid;
      if (error.code === 'blocked') return t.sourceFetchBlocked;
      if (error.code === 'empty') return t.sourceFetchEmpty;
    }
    return t.sourceFetchError;
  };

  const handleFetchSource = async () => {
    if (fetching) return;
    setFetching(true);
    setFetchError(null);
    try {
      const page = await fetchSourcePage(sourceUrl);
      setInputText(page.text);
    } catch (error) {
      setFetchError(fetchErrorMessage(error));
    } finally {
      setFetching(false);
    }
  };

  return (
    <section className="shrink-0 rounded-xl border-2 border-ink/25 bg-field shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-line bg-surface">
        <h2 className="text-sm font-semibold text-ink">{t.sourceContent}</h2>
        <p className="hidden sm:block text-[10px] text-muted truncate">{t.repeatNote}</p>
      </div>
      <textarea
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
        placeholder={t.placeholder}
        aria-label={t.sourceContent}
        className="block w-full min-h-36 lg:min-h-44 max-h-52 bg-field px-3 py-2.5 text-sm text-ink leading-relaxed font-sans resize-y focus:outline-none"
      />
      <div className="flex gap-1.5 px-3 pb-2.5">
        <label className="sr-only" htmlFor="source-url">
          {t.sourceUrl}
        </label>
        <input
          id="source-url"
          type="url"
          value={sourceUrl}
          onChange={(event) => {
            setSourceUrl(event.target.value);
            if (fetchError) setFetchError(null);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void handleFetchSource();
            }
          }}
          placeholder={t.sourceUrlPlaceholder}
          className="min-w-0 flex-1 bg-surface border border-line rounded-lg px-2.5 py-1.5 text-xs text-ink focus:outline-none focus:border-accent/50 font-mono"
        />
        <button
          type="button"
          onClick={() => void handleFetchSource()}
          disabled={fetching || !sourceUrl.trim()}
          className="shrink-0 px-2.5 py-1.5 rounded-lg border border-line bg-surface text-[11px] text-ink hover:bg-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
          <Link2 className="w-3 h-3" />
          {fetching ? t.sourceFetching : t.sourceFetch}
        </button>
      </div>
      {fetchError && (
        <p className="px-3 pb-2 text-[11px] text-accent" role="alert">
          {fetchError}
        </p>
      )}
      <p className="sm:hidden px-3 pb-2.5 text-[10px] text-muted">{t.repeatNote}</p>
    </section>
  );
};
