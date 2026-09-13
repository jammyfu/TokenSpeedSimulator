import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CHARS_PER_TOKEN, MAX_DISPLAY_LENGTH } from '../constants';

interface UseTokenStreamOptions {
  inputText: string;
  tps: number;
}

export function useTokenStream({ inputText, tps }: UseTokenStreamOptions) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [totalTokensGenerated, setTotalTokensGenerated] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [rollingSpeed, setRollingSpeed] = useState(0);

  const requestRef = useRef<number | null>(null);
  const lastUpdateRef = useRef(0);
  const charCountRef = useRef(0);
  const fractionalCharRef = useRef(0);
  const speedWindowRef = useRef<{ time: number; tokens: number }[]>([]);
  const inputTextRef = useRef(inputText);
  const tpsRef = useRef(tps);

  useEffect(() => {
    inputTextRef.current = inputText;
  }, [inputText]);

  useEffect(() => {
    tpsRef.current = tps;
  }, [tps]);

  const currentSpeed = useMemo(() => rollingSpeed.toFixed(1), [rollingSpeed]);

  const startStreaming = useCallback(() => {
    if (!inputTextRef.current.trim()) return;
    setStreamedText('');
    setTotalTokensGenerated(0);
    const now = performance.now();
    setStartTime(now);
    setElapsedTime(0);
    charCountRef.current = 0;
    fractionalCharRef.current = 0;
    speedWindowRef.current = [];
    setRollingSpeed(0);
    setIsStreaming(true);
    lastUpdateRef.current = now;
  }, []);

  const stopStreaming = useCallback(() => {
    setIsStreaming(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setIsStreaming(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = null;
    setStreamedText('');
    setTotalTokensGenerated(0);
    setElapsedTime(0);
    setStartTime(null);
    setRollingSpeed(0);
    speedWindowRef.current = [];
    charCountRef.current = 0;
    fractionalCharRef.current = 0;
  }, []);

  const clearOutput = useCallback(() => {
    setStreamedText('');
    if (!isStreaming) {
      setTotalTokensGenerated(0);
      setElapsedTime(0);
      setStartTime(null);
      charCountRef.current = 0;
      fractionalCharRef.current = 0;
      setRollingSpeed(0);
      speedWindowRef.current = [];
    }
  }, [isStreaming]);

  useEffect(() => {
    if (!isStreaming || startTime === null) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      return;
    }

    const animate = (time: number) => {
      const deltaTime = time - lastUpdateRef.current;
      lastUpdateRef.current = time;
      setElapsedTime(time - startTime);

      const charsToAddFloat = tpsRef.current * (deltaTime / 1000) * CHARS_PER_TOKEN;
      fractionalCharRef.current += charsToAddFloat;
      const charsToAdd = Math.floor(fractionalCharRef.current);

      if (charsToAdd > 0) {
        fractionalCharRef.current -= charsToAdd;
        const currentInput = inputTextRef.current;

        if (currentInput.length > 0) {
          const prevTokens = Math.ceil(charCountRef.current / CHARS_PER_TOKEN);
          charCountRef.current += charsToAdd;
          const newTokensGenerated = Math.ceil(charCountRef.current / CHARS_PER_TOKEN);
          const tokensAdded = newTokensGenerated - prevTokens;

          setStreamedText((prev) => {
            let addedText = '';
            for (let i = 0; i < charsToAdd; i++) {
              const charIndex = (charCountRef.current - charsToAdd + i) % currentInput.length;
              addedText += currentInput[charIndex];
            }
            const combined = prev + addedText;
            return combined.length > MAX_DISPLAY_LENGTH
              ? combined.slice(-MAX_DISPLAY_LENGTH)
              : combined;
          });

          setTotalTokensGenerated(newTokensGenerated);

          if (tokensAdded > 0) {
            speedWindowRef.current.push({ time: performance.now(), tokens: tokensAdded });
          }
        }
      }

      const now = performance.now();
      const windowStart = now - 2000;
      speedWindowRef.current = speedWindowRef.current.filter((entry) => entry.time > windowStart);
      const windowTokens = speedWindowRef.current.reduce((sum, entry) => sum + entry.tokens, 0);
      const windowDuration =
        speedWindowRef.current.length > 1
          ? (now - speedWindowRef.current[0].time) / 1000
          : 2.0;

      if (speedWindowRef.current.length > 0) {
        setRollingSpeed(windowTokens / Math.max(windowDuration, 0.5));
      } else {
        setRollingSpeed(0);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isStreaming, startTime]);

  return {
    isStreaming,
    streamedText,
    tokensCount: totalTokensGenerated,
    elapsedTime,
    currentSpeed,
    startStreaming,
    stopStreaming,
    reset,
    clearOutput,
  };
}
