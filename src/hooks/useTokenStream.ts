import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CHARS_PER_TOKEN, MAX_DISPLAY_LENGTH } from '../constants';

interface UseTokenStreamProps {
  inputText: string;
  tps: number;
  outputSectionRef: React.RefObject<HTMLDivElement | null>;
}

export function useTokenStream({ inputText, tps, outputSectionRef }: UseTokenStreamProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [totalTokensGenerated, setTotalTokensGenerated] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const requestRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const charCountRef = useRef<number>(0);

  const tokensCount = totalTokensGenerated;
  const currentSpeed = useMemo(() => {
    if (elapsedTime === 0) return 0;
    return (tokensCount / (elapsedTime / 1000)).toFixed(1);
  }, [tokensCount, elapsedTime]);

  const startStreaming = () => {
    setStreamedText("");
    setTotalTokensGenerated(0);
    setStartTime(performance.now());
    setElapsedTime(0);
    charCountRef.current = 0;
    setIsStreaming(true);
    lastUpdateRef.current = performance.now();

    // Scroll to output section
    setTimeout(() => {
      outputSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const stopStreaming = () => {
    setIsStreaming(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  };

  const reset = () => {
    stopStreaming();
    setStreamedText("");
    setTotalTokensGenerated(0);
    setElapsedTime(0);
    setStartTime(null);
    charCountRef.current = 0;
  };

  const clearOutput = () => {
    setStreamedText("");
    if (!isStreaming) {
      setTotalTokensGenerated(0);
      setElapsedTime(0);
      setStartTime(null);
      charCountRef.current = 0;
    }
  };

  useEffect(() => {
    const animate = (time: number) => {
      if (!isStreaming || !startTime) return;

      const totalElapsed = time - startTime;
      setElapsedTime(totalElapsed);

      const targetCharCount = Math.floor((tps * (totalElapsed / 1000)) * CHARS_PER_TOKEN);
      
      if (targetCharCount > charCountRef.current) {
        const charsToAdd = targetCharCount - charCountRef.current;
        
        setStreamedText(prev => {
          let newText = prev;
          for (let i = 0; i < charsToAdd; i++) {
            const charIndex = (charCountRef.current + i) % inputText.length;
            newText += inputText[charIndex];
          }
          
          if (newText.length > MAX_DISPLAY_LENGTH) {
            return newText.slice(-MAX_DISPLAY_LENGTH);
          }
          return newText;
        });

        setTotalTokensGenerated(Math.ceil(targetCharCount / CHARS_PER_TOKEN));
        charCountRef.current = targetCharCount;
      }

      lastUpdateRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    if (isStreaming) {
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isStreaming, tps, inputText, startTime]);

  return {
    isStreaming,
    streamedText,
    tokensCount,
    elapsedTime,
    currentSpeed,
    startStreaming,
    stopStreaming,
    reset,
    clearOutput
  };
}
