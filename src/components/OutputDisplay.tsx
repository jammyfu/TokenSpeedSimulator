import React from 'react';
import { motion } from 'motion/react';
import { Trash2, Copy, Check, Zap } from 'lucide-react';
import { Translation } from '../types';

interface OutputDisplayProps {
  t: Translation;
  streamedText: string;
  isStreaming: boolean;
  onClear: () => void;
  onCopy: () => void;
  copied: boolean;
  streamRef: React.RefObject<HTMLDivElement | null>;
  scrollAnchorRef: React.RefObject<HTMLDivElement | null>;
  outputSectionRef: React.RefObject<HTMLDivElement | null>;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({
  t, streamedText, isStreaming, onClear, onCopy, copied, streamRef, scrollAnchorRef, outputSectionRef
}) => {
  return (
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
              onClick={onClear}
              className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-zinc-500 hover:text-red-400"
              title={t.clear}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onCopy}
              className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-zinc-500 hover:text-zinc-300"
              title={t.copy}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div 
          ref={streamRef}
          className="flex-1 p-8 overflow-y-auto font-mono text-lg leading-relaxed relative"
        >
          <div className="whitespace-pre-wrap break-words">
            {streamedText}
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
  );
};
