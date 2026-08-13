/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, Music, Sparkles, AlertCircle } from 'lucide-react';
import { playBarkSound } from '../utils/audio';
import { BarkPreset } from '../types';

const BARK_PRESETS: BarkPreset[] = [
  {
    id: 'tiny',
    name: 'Tiny Squeak',
    icon: '🐣',
    pitch: 1.6,
    decay: 0.12,
    frequency: 620,
    description: 'A tiny, airy squeak bark of a miniature newborn puppy.',
  },
  {
    id: 'playful',
    name: 'Playful Woof',
    icon: '🐕',
    pitch: 1.0,
    decay: 0.18,
    frequency: 380,
    description: 'A friendly, happy woof of a golden retriever in a park.',
  },
  {
    id: 'big',
    name: 'Guard Ruff',
    icon: '🦁',
    pitch: 0.6,
    decay: 0.28,
    frequency: 180,
    description: 'A deep, guttural bark of a cozy giant guard dog.',
  },
  {
    id: 'space',
    name: 'Space Echo',
    icon: '🚀',
    pitch: 1.1,
    decay: 0.24,
    frequency: 410,
    description: 'A futuristic bark running through an cosmic delay echo loop.',
  },
];

// Piano / Xylophone notes
const NOTES = [
  { note: 'C', freq: 261.63, color: 'bg-red-400 border-red-500 hover:bg-red-500' },
  { note: 'D', freq: 293.66, color: 'bg-orange-400 border-orange-500 hover:bg-orange-500' },
  { note: 'E', freq: 329.63, color: 'bg-yellow-400 border-yellow-500 hover:bg-yellow-500' },
  { note: 'F', freq: 349.23, color: 'bg-emerald-400 border-emerald-500 hover:bg-emerald-500' },
  { note: 'G', freq: 392.00, color: 'bg-sky-400 border-sky-500 hover:bg-sky-500' },
  { note: 'A', freq: 440.00, color: 'bg-indigo-400 border-indigo-500 hover:bg-indigo-500' },
  { note: 'B', freq: 493.88, color: 'bg-violet-400 border-violet-500 hover:bg-violet-500' },
  { note: 'C2', freq: 523.25, color: 'bg-rose-400 border-rose-500 hover:bg-rose-500' },
];

export default function BarkerSoundboard() {
  const [selectedPresetId, setSelectedPresetId] = useState<'tiny' | 'playful' | 'big' | 'space'>('playful');
  const [isWobbling, setIsWobbling] = useState(false);

  const activePreset = BARK_PRESETS.find((p) => p.id === selectedPresetId) || BARK_PRESETS[1];

  const triggerMainBark = () => {
    setIsWobbling(true);
    // Play sound based on active preset
    const pitchDrop = selectedPresetId === 'tiny' ? 350 : selectedPresetId === 'big' ? 100 : 200;
    playBarkSound(activePreset.frequency, pitchDrop, activePreset.decay, selectedPresetId);

    setTimeout(() => {
      setIsWobbling(false);
    }, 300);
  };

  const playPianoKey = (freq: number) => {
    // Pitch offset calculation based on standard note frequencies
    const pitchDrop = selectedPresetId === 'tiny' ? freq * 0.5 : selectedPresetId === 'big' ? freq * 0.35 : freq * 0.45;
    playBarkSound(freq, pitchDrop, activePreset.decay, selectedPresetId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* 1. Main Bark Trigger & Presets (LHS) */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-amber-50 to-orange-100/50 dark:from-slate-950/80 dark:to-indigo-950/50 border border-orange-100 dark:border-indigo-900/40 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Interactive Puppy Barker
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click the huge central bark button or choose an adorable puppy sound preset below.
          </p>
        </div>

        {/* Central Big Bark Button */}
        <div className="my-8 flex justify-center items-center">
          <motion.button
            id="main-bark-soundboard-btn"
            onClick={triggerMainBark}
            animate={isWobbling ? { scale: [1, 1.15, 0.95, 1], rotate: [-8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.35 }}
            className="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 hover:from-amber-600 hover:to-orange-500 dark:from-violet-600 dark:to-indigo-500 dark:hover:from-violet-700 dark:hover:to-indigo-600 shadow-lg shadow-amber-500/30 dark:shadow-violet-600/30 flex flex-col justify-center items-center cursor-pointer border-4 border-white dark:border-slate-800 transform active:scale-90 select-none group"
          >
            <span className="text-3xl filter drop-shadow">🐶</span>
            <span className="text-xs font-black uppercase tracking-widest text-white mt-1 group-hover:scale-105 transition-transform">
              WOOF BARK
            </span>
            <span className="text-[9px] text-orange-100 font-medium tracking-wide mt-0.5">
              Click Me!
            </span>
          </motion.button>
        </div>

        {/* Selected Preset Tagline */}
        <div className="bg-white/80 dark:bg-slate-950/40 border border-orange-100/60 dark:border-slate-800 p-3 rounded-2xl flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-500 dark:text-violet-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Current: {activePreset.name} {activePreset.icon}
            </p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              {activePreset.description}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Presets Grid & Piano (RHS) */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
        
        {/* Presets Row */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Puppy Voices / Presets
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BARK_PRESETS.map((p) => (
              <button
                key={p.id}
                id={`preset-btn-${p.id}`}
                onClick={() => setSelectedPresetId(p.id as any)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left flex flex-col justify-between gap-1.5 transform active:scale-95 ${
                  selectedPresetId === p.id
                    ? 'bg-white dark:bg-slate-900 border-amber-400 dark:border-violet-600 shadow-md ring-1 ring-amber-300 dark:ring-violet-800'
                    : 'bg-white/40 border-slate-200 dark:bg-indigo-950/20 dark:border-indigo-900/30 hover:border-amber-300 dark:hover:border-violet-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-2xl">{p.icon}</span>
                <span className="text-xs font-bold block leading-tight text-slate-800 dark:text-slate-100">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Piano / Xylophone */}
        <div className="space-y-3 bg-white dark:bg-indigo-950/70 border border-orange-100 dark:border-indigo-900/40 rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Playful Bark Piano Xylophone
              </h4>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-violet-950 dark:text-violet-200 px-2 py-0.5 rounded-full font-bold">
              Bark Synth
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Play music using different pitch-scaled barks. Perfect for quick tunes!
          </p>

          {/* Keys row */}
          <div className="flex items-stretch gap-1.5 h-36 pt-3 select-none">
            {NOTES.map((note) => (
              <button
                key={note.note}
                id={`piano-key-${note.note}`}
                onClick={() => playPianoKey(note.freq)}
                className={`flex-1 flex flex-col justify-between items-center py-3 rounded-xl border-b-4 text-white font-extrabold text-xs transition-all active:translate-y-1 active:border-b-0 cursor-pointer ${note.color}`}
              >
                <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                <span className="font-mono tracking-tighter opacity-90">{note.note}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
