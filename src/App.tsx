import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Zap, Clock, Gauge, Copy, Check, Trash2, Languages, Plus, Minus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Constants
const CHARS_PER_TOKEN = 4;
const MAX_DISPLAY_LENGTH = 5000;
const MAX_TPS = 1500;
const MIN_TPS = 1;

interface Translation {
  title: string;
  description: string;
  speedConfig: string;
  tps: string;
  sourceContent: string;
  placeholder: string;
  repeatNote: string;
  start: string;
  pause: string;
  reset: string;
  time: string;
  tokens: string;
  realTimeSpeed: string;
  tpsUnit: string;
  status: string;
  idle: string;
  streaming: string;
  completed: string;
  whatIsToken: string;
  whatIsTokenDesc: string;
  typicalSpeeds: string;
  whySpeedMatters: string;
  whySpeedMattersDesc: string;
  clear: string;
  copy: string;
  autoMarkdown: string;
}

const translations: Record<'en' | 'zh', Translation> = {
  en: {
    title: "Token Speed Simulator",
    description: "Visualize how different streaming speeds feel. Paste your own text below and adjust the tokens per second (TPS) to see the difference in real-time.",
    speedConfig: "Speed Configuration",
    tps: "Tokens Per Second",
    sourceContent: "Source Content",
    placeholder: "Paste text here...",
    repeatNote: "* Text will automatically repeat. For performance, only the last 5000 chars are displayed at high speeds.",
    start: "Start Demo",
    pause: "Pause",
    reset: "Reset",
    time: "Time",
    tokens: "Tokens",
    realTimeSpeed: "Real-time Speed",
    tpsUnit: "Tokens / Sec",
    status: "Status",
    idle: "Idle",
    streaming: "Streaming...",
    completed: "Completed",
    whatIsToken: "What is a Token?",
    whatIsTokenDesc: "In LLMs, tokens are chunks of text. On average, 1,000 tokens is about 750 words. This simulator uses a 4-character approximation for demonstration.",
    typicalSpeeds: "Typical Speeds",
    whySpeedMatters: "Why Speed Matters",
    whySpeedMattersDesc: "Higher TPS enables real-time voice interaction, faster agentic workflows, and better user experiences in long-form content generation.",
    clear: "Clear Output",
    copy: "Copy output",
    autoMarkdown: "Auto-render Markdown"
  },
  zh: {
    title: "Token 输出速度演示",
    description: "可视化不同流式输出速度的感受。在下方粘贴您的文本，调整每秒 Token 数 (TPS)，实时查看差异。",
    speedConfig: "速度配置",
    tps: "每秒 Token 数",
    sourceContent: "源内容",
    placeholder: "在此粘贴文本...",
    repeatNote: "* 文字将自动重复。为了性能，高速下仅显示最后 5000 个字符。",
    start: "开始演示",
    pause: "暂停",
    reset: "重置",
    time: "用时",
    tokens: "Token 数",
    realTimeSpeed: "实时速度",
    tpsUnit: "Tokens / 秒",
    status: "状态",
    idle: "空闲",
    streaming: "正在输出...",
    completed: "已完成",
    whatIsToken: "什么是 Token？",
    whatIsTokenDesc: "在 LLM 中，Token 是文本块。平均而言，1,000 个 Token 约等于 750 个单词。本演示使用 4 字符近似值进行展示。",
    typicalSpeeds: "典型速度",
    whySpeedMatters: "为什么速度很重要",
    whySpeedMattersDesc: "更高的 TPS 支持实时语音交互、更快的智能体工作流以及长文本生成中更好的用户体验。",
    clear: "清除输出",
    copy: "复制输出",
    autoMarkdown: "自动渲染 Markdown"
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'zh'>('zh');
  const t = translations[lang];

  const [inputText, setInputText] = useState(
    lang === 'en' 
    ? "The quick brown fox jumps over the lazy dog. This is a demonstration of token output speed. Large language models generate text token by token."
    : "大语言模型以流式方式输出内容。Token 是模型处理文本的基本单位。通过调整 TPS（每秒 Token 数），您可以直观地感受到不同模型的响应速度差异。"
  );
  const [tps, setTps] = useState(30);
  const [autoMarkdown, setAutoMarkdown] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [totalTokensGenerated, setTotalTokensGenerated] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [copied, setCopied] = useState(false);

  const streamRef = useRef<HTMLDivElement>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const outputSectionRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const lastUpdateRef = useRef<number>(0);
  const charCountRef = useRef<number>(0);
  const fractionalCharRef = useRef<number>(0);

  const [rollingSpeed, setRollingSpeed] = useState(0);
  const speedWindowRef = useRef<{ time: number; tokens: number }[]>([]);

  const currentSpeed = useMemo(() => {
    return rollingSpeed.toFixed(1);
  }, [rollingSpeed]);

  // Use a ref for inputText to avoid effect re-runs when typing
  const inputTextRef = useRef(inputText);
  useEffect(() => {
    inputTextRef.current = inputText;
  }, [inputText]);

  const startStreaming = () => {
    if (!inputText.trim()) return;
    
    setStreamedText("");
    setTotalTokensGenerated(0);
    const now = performance.now();
    setStartTime(now);
    setElapsedTime(0);
    charCountRef.current = 0;
    setIsStreaming(true);
    lastUpdateRef.current = now;

    // Scroll to output section
    requestAnimationFrame(() => {
      outputSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
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
    setRollingSpeed(0);
    speedWindowRef.current = [];
    charCountRef.current = 0;
    fractionalCharRef.current = 0;
  };

  const clearOutput = () => {
    setStreamedText("");
    // If we are not streaming, we also reset the counters to keep it clean
    if (!isStreaming) {
      setTotalTokensGenerated(0);
      setElapsedTime(0);
      setStartTime(null);
      charCountRef.current = 0;
    }
  };

  useEffect(() => {
    if (!isStreaming || startTime === null) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (time: number) => {
      const deltaTime = time - lastUpdateRef.current;
      lastUpdateRef.current = time;
      
      const totalElapsed = time - startTime;
      setElapsedTime(totalElapsed);

      // Calculate delta characters based on current TPS and delta time
      // This ensures that changing TPS affects the rate immediately
      const charsToAddFloat = (tps * (deltaTime / 1000)) * CHARS_PER_TOKEN;
      
      // Use a ref to track fractional characters to avoid losing precision at low speeds
      if (!fractionalCharRef.current) fractionalCharRef.current = 0;
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

          setStreamedText(prev => {
            let addedText = "";
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

          // Update rolling speed window (last 2 seconds)
          const now = performance.now();
          if (tokensAdded > 0) {
            speedWindowRef.current.push({ time: now, tokens: tokensAdded });
          }
        }
      }

      // Always update rolling speed to ensure it drops to 0 if no tokens are added
      const now = performance.now();
      const windowStart = now - 2000;
      speedWindowRef.current = speedWindowRef.current.filter(entry => entry.time > windowStart);
      
      const windowTokens = speedWindowRef.current.reduce((sum, entry) => sum + entry.tokens, 0);
      const windowDuration = speedWindowRef.current.length > 1 
        ? (now - speedWindowRef.current[0].time) / 1000 
        : 2.0; // Default to window size if not enough data
      
      if (speedWindowRef.current.length > 0) {
        // Use the actual window duration but cap it at 2s for the denominator
        const effectiveDuration = Math.max(windowDuration, 0.5); 
        setRollingSpeed(windowTokens / effectiveDuration);
      } else {
        setRollingSpeed(0);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
    // Removed streamedText from dependencies to prevent effect restart on every character
  }, [isStreaming, tps, startTime]);

  // Auto-scroll to bottom
  React.useLayoutEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
    }
  }, [streamedText]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(streamedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">{t.title}</h1>
            </div>
            <p className="text-zinc-400 max-w-2xl">
              {t.description}
            </p>
          </div>
          <button 
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-sm font-medium transition-colors"
          >
            <Languages className="w-4 h-4" />
            {lang === 'en' ? '中文' : 'English'}
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls & Input */}
          <div className="lg:col-span-4 space-y-6">
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
                        onClick={() => setTps(prev => Math.max(1, prev - 1))}
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
                        onClick={() => setTps(prev => Math.min(MAX_TPS, prev + 1))}
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
                    step="5"
                    value={tps} 
                    onChange={(e) => setTps(Math.max(MIN_TPS, parseInt(e.target.value)))}
                    aria-label={t.tps}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
                    <span>{MIN_TPS} TPS</span>
                    <span>{MAX_TPS / 2} TPS</span>
                    <span>{MAX_TPS} TPS</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="autoMarkdown"
                      checked={autoMarkdown}
                      onChange={(e) => setAutoMarkdown(e.target.checked)}
                      className="w-4 h-4 rounded border-white/10 bg-zinc-950 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="autoMarkdown" className="text-xs text-zinc-400 cursor-pointer select-none">
                      {t.autoMarkdown}
                    </label>
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
                  aria-label={t.sourceContent}
                  className="w-full h-48 bg-zinc-950 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none font-mono leading-relaxed"
                />
                <p className="text-[10px] text-zinc-500 italic">
                  {t.repeatNote}
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                {!isStreaming ? (
                  <button 
                    onClick={startStreaming}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    {t.start}
                  </button>
                ) : (
                  <button 
                    onClick={stopStreaming}
                    className="flex-1 bg-zinc-100 hover:bg-white text-black font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <Pause className="w-4 h-4 fill-current" />
                    {t.pause}
                  </button>
                )}
                <button 
                  onClick={reset}
                  className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition-colors active:scale-[0.98]"
                  title={t.reset}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </section>

            {/* Stats Card */}
            <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {t.time}
                </span>
                <p className="text-2xl font-mono font-medium text-white">
                  {(elapsedTime / 1000).toFixed(2)}<span className="text-sm text-zinc-500 ml-1">s</span>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {t.tokens}
                </span>
                <p className="text-2xl font-mono font-medium text-white">
                  {totalTokensGenerated}
                </p>
              </div>
              <div className="col-span-2 pt-4 border-t border-white/5 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">{t.realTimeSpeed}</span>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-mono font-bold text-emerald-400">
                    {currentSpeed}
                  </p>
                  <span className="text-sm text-zinc-500 uppercase font-semibold">{t.tpsUnit}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Output Display */}
          <div ref={outputSectionRef} className="lg:col-span-8 flex flex-col h-[700px] lg:h-[800px]">
            <div className="flex-1 bg-zinc-950 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
              <div className="bg-zinc-900/80 border-b border-white/5 px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                  </div>
                  <span className="ml-4 text-xs font-mono text-zinc-500">streaming_output.log</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={clearOutput}
                    className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-zinc-500 hover:text-red-400"
                    title={t.clear}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={copyToClipboard}
                    className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-zinc-500 hover:text-zinc-300"
                    title={t.copy}
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div 
                ref={streamRef}
                className="flex-1 p-8 overflow-y-auto font-mono text-lg leading-relaxed relative markdown-body"
              >
                <div className="whitespace-pre-wrap break-words">
                  {autoMarkdown ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {streamedText}
                    </ReactMarkdown>
                  ) : (
                    streamedText
                  )}
                  {isStreaming && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2.5 h-5 bg-emerald-400 ml-1 align-middle"
                    />
                  )}
                </div>
                <div ref={scrollAnchorRef} className="h-0 w-0" />
                
                {streamedText.length === 0 && !isStreaming && (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-700 space-y-4">
                    <Zap className="w-12 h-12 opacity-20" />
                    <p className="text-sm uppercase tracking-[0.2em]">Awaiting Simulation</p>
                  </div>
                )}
              </div>

              <div className="bg-zinc-900/30 px-6 py-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                <span>{t.status}: {isStreaming ? t.streaming : streamedText.length > 0 ? t.completed : t.idle}</span>
                <span>Encoding: UTF-8</span>
              </div>
            </div>
          </div>

        </main>

        {/* Footer Info */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">{t.whatIsToken}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t.whatIsTokenDesc}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">{t.typicalSpeeds}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              GPT-4o: ~80-100 TPS<br />
              Gemini 1.5 Flash: ~100+ TPS<br />
              Local Models (Llama 3 8B): ~20-50 TPS
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">{t.whySpeedMatters}</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {t.whySpeedMattersDesc}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
