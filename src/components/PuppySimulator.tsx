/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Pizza, Heart, Moon, Smile, Flame, Settings } from 'lucide-react';
import { VirtualPetState } from '../types';
import { playBarkSound } from '../utils/audio';

const HOODIE_COLORS = [
  { name: 'Mustard Gold', hex: '#F59E0B', bg: 'bg-amber-500' },
  { name: 'Snuggly Pink', hex: '#EC4899', bg: 'bg-pink-500' },
  { name: 'Sage Mint', hex: '#10B981', bg: 'bg-emerald-500' },
  { name: 'Dream Lavender', hex: '#8B5CF6', bg: 'bg-violet-500' },
  { name: 'Sky Cozy Blue', hex: '#3B82F6', bg: 'bg-blue-500' },
];

const HOODIE_STYLES = [
  { id: 'solid', label: 'Classic Solid', icon: '🧥', desc: 'Sleek, sleek minimalist look' },
  { id: 'striped', label: 'Cozy Stripes', icon: '🦓', desc: 'Charming warm layers' },
  { id: 'polkadots', label: 'Sweet Polka', icon: '🔴', desc: 'Cute bubble polka dots' },
  { id: 'starry', label: 'Star Magic', icon: '⭐', desc: 'Wizardly glowing stars' },
  { id: 'sporty', label: 'Athletic Track', icon: '⚡', desc: 'Sporty double-side racing strip' },
] as const;

const ACCESSORIES = [
  { id: 'none', label: 'No Accessory', icon: '❌' },
  { id: 'glasses', label: 'Cool Glasses', icon: '👓' },
  { id: 'shades', label: 'Meme Shades', icon: '😎' },
  { id: 'chain', label: 'Gold Chain', icon: '🪙' },
  { id: 'bandana', label: 'Bandana', icon: '🧣' },
  { id: 'crown', label: 'Pet Crown', icon: '👑' },
  { id: 'headphones', label: 'Headphones', icon: '🎧' },
] as const;

const MEME_THOUGHTS = [
  "such cozy! very hoodie!",
  "much run, many speed! 🐾",
  "1 $NEIRO = 1 $NEIRO. so secure!",
  "wen moon? 🚀",
  "wow! spirit of the streets!",
  "please gib treat, so hunger",
  "such blockchain. so robinhood chain!",
  "very fashion! much look!",
  "much love! such high happiness!",
  "wow! such zoomies! 🏃",
  "much smart, very genius!",
  "doge style is the lifestyle!"
];

export default function PuppySimulator() {
  const [pet, setPet] = useState<VirtualPetState>({
    happiness: 85,
    energy: 70,
    hunger: 20,
    hoodieColor: '#F59E0B', // Default matching mustard hoodie
    accessory: 'none',
    currentAction: 'idle',
  });
  const [hoodieStyle, setHoodieStyle] = useState<'solid' | 'striped' | 'polkadots' | 'starry' | 'sporty'>('solid');
  const [activeTrick, setActiveTrick] = useState<'spin' | 'flip' | 'moonwalk' | 'none'>('none');
  const [thought, setThought] = useState<string>("much run, very speed");

  const [floatHearts, setFloatHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [crumbCount, setCrumbCount] = useState<number[]>([]);

  // Periodically select a random cute Doge thought
  useEffect(() => {
    const thoughtTimer = setInterval(() => {
      const idx = Math.floor(Math.random() * MEME_THOUGHTS.length);
      setThought(MEME_THOUGHTS[idx]);
    }, 4500);
    return () => clearInterval(thoughtTimer);
  }, []);

  // Periodically decay pet stats slightly over time for simulation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setPet((prev) => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 2),
        energy: Math.max(0, prev.energy - 1),
        happiness: Math.max(0, prev.happiness - 1),
      }));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePet = () => {
    setPet((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      energy: Math.min(100, prev.energy + 5),
      currentAction: 'barking',
    }));

    // Spawn cute heart animations
    const newHeart = { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 40 + 10 };
    setFloatHearts((prev) => [...prev, newHeart]);

    // Play synthesized happy bark!
    playBarkSound(420, 220, 0.16, 'playful');

    setTimeout(() => {
      setPet((prev) => ({ ...prev, currentAction: 'idle' }));
    }, 800);
  };

  const handleFeed = () => {
    if (pet.hunger === 0) return;
    setPet((prev) => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 25),
      happiness: Math.min(100, prev.happiness + 8),
      currentAction: 'eating',
    }));

    // Spawn falling crumb animations
    setCrumbCount([1, 2, 3]);
    // Play a tiny high pitch chewing/squeaking bark effect
    playBarkSound(650, 450, 0.08, 'tiny');

    setTimeout(() => {
      setCrumbCount([]);
      setPet((prev) => ({ ...prev, currentAction: 'idle' }));
    }, 1200);
  };

  const handleSleep = () => {
    setPet((prev) => ({
      ...prev,
      energy: Math.min(100, prev.energy + 40),
      currentAction: 'sleeping',
    }));

    setTimeout(() => {
      setPet((prev) => ({ ...prev, currentAction: 'idle' }));
    }, 2500);
  };

  // Remove floating items once finished
  useEffect(() => {
    if (floatHearts.length === 0) return;
    const timer = setTimeout(() => {
      setFloatHearts((prev) => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [floatHearts]);

  return (
    <div className="bg-white dark:bg-indigo-950/30 border border-orange-100 dark:border-indigo-900/40 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col xl:flex-row gap-8">
      
      {/* 1. Interactive Visual Panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-orange-50/50 dark:bg-slate-950/40 rounded-2xl p-6 relative overflow-hidden min-h-[350px]">
        
        {/* Sky / Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {pet.currentAction === 'sleeping' && (
            <div className="absolute top-8 right-8 flex flex-col gap-1 items-end">
              <motion.span
                animate={{ y: [-10, -30], x: [0, 15], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                className="text-2xl font-bold text-violet-400"
              >
                Zzz
              </motion.span>
              <motion.span
                animate={{ y: [-5, -20], x: [0, 10], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: 'easeOut' }}
                className="text-lg font-bold text-violet-300"
              >
                zz
              </motion.span>
            </div>
          )}

          {/* Sparkles when happy */}
          {pet.happiness > 80 && pet.currentAction !== 'sleeping' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="absolute top-6 left-6 text-yellow-400 opacity-60"
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          )}
        </div>

        {/* Floating Hearts */}
        <AnimatePresence>
          {floatHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: 80, opacity: 0, scale: 0.5 }}
              animate={{ y: -60, opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
              className="absolute text-red-500 z-10"
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Falling Crumbs when eating */}
        <AnimatePresence>
          {crumbCount.map((crumb, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, x: (idx - 1) * 15, opacity: 1 }}
              animate={{ y: 150, opacity: 0, rotate: 360 }}
              transition={{ duration: 1 }}
              className="absolute top-[20%] text-amber-800 text-xs"
            >
              🍪
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Neiro's Meme Speech Thought Bubble */}
        <AnimatePresence mode="wait">
          {pet.currentAction !== 'sleeping' && (
            <motion.div
              key={thought}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.35 }}
              className="absolute top-1 z-20 px-4 py-2.5 rounded-2xl bg-amber-500 dark:bg-violet-600 text-white font-black text-xs shadow-md border-2 border-white dark:border-slate-800 flex items-center justify-center text-center max-w-[190px]"
              style={{ fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", sans-serif' }}
            >
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-amber-500 dark:border-t-violet-600" />
              <span>{thought}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The SVG Puppy Illustration */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Main dog graphics */}
          <motion.svg
            id="puppy-illustration"
            viewBox="0 0 200 200"
            className="w-full h-full"
            animate={
              activeTrick === 'spin'
                ? { rotate: [0, 360], scale: [1, 1.1, 1] }
                : activeTrick === 'flip'
                ? { rotate: [0, 360], y: [0, -60, 0], scale: [1, 1.2, 1] }
                : activeTrick === 'moonwalk'
                ? { x: [0, -35, 35, 0], rotate: [-6, 6, -6, 6, 0] }
                : pet.currentAction === 'sleeping'
                ? { y: [0, 3, 0] }
                : pet.currentAction === 'barking'
                ? { scale: [1, 1.05, 0.98, 1], y: [0, -6, 0] }
                : pet.currentAction === 'eating'
                ? { rotate: [-2, 2, -2, 2, 0] }
                : { y: [0, -12, 0], rotate: [-4, 4, -4] } // Playful jumping and tilting
            }
            transition={{
              repeat: activeTrick !== 'none' ? 0 : (pet.currentAction === 'sleeping' || pet.currentAction === 'idle' ? Infinity : 0),
              duration: activeTrick === 'spin' ? 0.7 : activeTrick === 'flip' ? 0.85 : activeTrick === 'moonwalk' ? 1.4 : (pet.currentAction === 'sleeping' ? 3 : pet.currentAction === 'idle' ? 1.2 : 0.4),
              ease: 'easeInOut',
            }}
          >
            {/* 1. Tail */}
            <motion.path
              d="M140 145 C155 130, 165 145, 175 125 C170 155, 150 160, 140 145"
              fill="#FFF0DF" // Cream/Beige fur
              className="origin-left"
              animate={{
                rotate: pet.currentAction === 'barking' || pet.happiness > 75
                  ? [-40, 40, -40]
                  : [-15, 15, -15],
              }}
              transition={{
                repeat: Infinity,
                duration: pet.currentAction === 'barking' || pet.happiness > 75 ? 0.15 : 0.45,
                ease: 'easeInOut',
              }}
            />

            {/* 2. Hind legs (Animate running/trotting movement) */}
            <motion.circle
              cx="65"
              cy="155"
              r="14"
              fill="#D4B48F"
              animate={pet.currentAction === 'sleeping' ? { cy: 155, cx: 65 } : {
                cy: [155, 151, 155, 159, 155],
                cx: [65, 69, 65, 61, 65]
              }}
              transition={{
                repeat: Infinity,
                duration: pet.currentAction === 'idle' ? 0.75 : 0.35,
                ease: 'linear'
              }}
            />
            <motion.circle
              cx="135"
              cy="155"
              r="14"
              fill="#D4B48F"
              animate={pet.currentAction === 'sleeping' ? { cy: 155, cx: 135 } : {
                cy: [155, 159, 155, 151, 155],
                cx: [135, 131, 135, 139, 135]
              }}
              transition={{
                repeat: Infinity,
                duration: pet.currentAction === 'idle' ? 0.75 : 0.35,
                ease: 'linear'
              }}
            />

            {/* Definitions for Hoodie Patterns */}
            <defs>
              <clipPath id="hoodie-clip">
                <rect x="62" y="110" width="76" height="50" rx="25" />
              </clipPath>
              <clipPath id="hood-on-head-clip">
                <circle cx="100" cy="85" r="41" />
              </clipPath>
            </defs>

            {/* HOOD BACKGROUND (Back part of the hood on head) */}
            <circle cx="100" cy="85" r="41" fill={pet.hoodieColor} className="transition-colors duration-500" />

            {/* Patterns applied on the Hood background */}
            <g clipPath="url(#hood-on-head-clip)">
              {hoodieStyle === 'striped' && (
                <g opacity="0.35">
                  <line x1="50" y1="60" x2="150" y2="60" stroke="#FFFFFF" strokeWidth="4.5" />
                  <line x1="50" y1="75" x2="150" y2="75" stroke="#FFFFFF" strokeWidth="4.5" />
                  <line x1="50" y1="90" x2="150" y2="90" stroke="#FFFFFF" strokeWidth="4.5" />
                  <line x1="50" y1="105" x2="150" y2="105" stroke="#FFFFFF" strokeWidth="4.5" />
                </g>
              )}
              {hoodieStyle === 'polkadots' && (
                <g opacity="0.45" fill="#FFFFFF">
                  <circle cx="80" cy="65" r="3" />
                  <circle cx="100" cy="60" r="3" />
                  <circle cx="120" cy="65" r="3" />
                  <circle cx="70" cy="80" r="3" />
                  <circle cx="130" cy="80" r="3" />
                  <circle cx="72" cy="100" r="3" />
                  <circle cx="128" cy="100" r="3" />
                </g>
              )}
              {hoodieStyle === 'starry' && (
                <g fill="#FDE047" opacity="0.9">
                  <polygon points="100,55 102,57 106,57 103,59 104,62 100,60 96,62 97,59 94,57 98,57" />
                  <polygon points="76,75 78,77 82,77 79,79 80,82 76,80 72,82 73,79 70,77 74,77" />
                  <polygon points="124,75 126,77 130,77 127,79 128,82 124,80 120,82 121,79 118,77 122,77" />
                </g>
              )}
              {hoodieStyle === 'sporty' && (
                <g>
                  <circle cx="100" cy="85" r="41" stroke="#FFFFFF" strokeWidth="3" fill="none" opacity="0.5" />
                </g>
              )}
            </g>

            {/* 3. Main Hoodie Body */}
            <rect
              x="62"
              y="110"
              width="76"
              height="50"
              rx="25"
              fill={pet.hoodieColor}
              className="transition-colors duration-500"
            />

            {/* Pattern Layers based on hoodieStyle */}
            <g clipPath="url(#hoodie-clip)">
              {hoodieStyle === 'striped' && (
                <g opacity="0.35">
                  <line x1="62" y1="118" x2="138" y2="118" stroke="#FFFFFF" strokeWidth="4.5" />
                  <line x1="62" y1="128" x2="138" y2="128" stroke="#FFFFFF" strokeWidth="4.5" />
                  <line x1="62" y1="138" x2="138" y2="138" stroke="#FFFFFF" strokeWidth="4.5" />
                  <line x1="62" y1="148" x2="138" y2="148" stroke="#FFFFFF" strokeWidth="4.5" />
                </g>
              )}

              {hoodieStyle === 'polkadots' && (
                <g opacity="0.45" fill="#FFFFFF">
                  <circle cx="75" cy="120" r="3" />
                  <circle cx="90" cy="125" r="3" />
                  <circle cx="106" cy="118" r="3" />
                  <circle cx="125" cy="122" r="3" />
                  <circle cx="82" cy="138" r="3" />
                  <circle cx="118" cy="138" r="3" />
                  <circle cx="100" cy="133" r="3" />
                  <circle cx="72" cy="146" r="3" />
                  <circle cx="132" cy="144" r="3" />
                </g>
              )}

              {hoodieStyle === 'starry' && (
                <g fill="#FDE047" opacity="0.9">
                  {/* Miniature Stars */}
                  <polygon points="75,120 77,122 81,122 78,124 79,127 75,125 71,127 72,124 69,122 73,122" />
                  <polygon points="100,121 102,123 106,123 103,125 104,128 100,126 96,128 97,125 94,123 98,123" />
                  <polygon points="125,119 127,121 131,121 128,123 129,126 125,124 121,126 122,123 119,121 123,121" />
                  <polygon points="85,142 87,144 91,144 88,146 89,149 85,147 81,149 82,146 79,144 83,144" />
                  <polygon points="115,142 117,144 121,144 118,146 119,149 115,147 111,149 112,146 109,144 113,144" />
                </g>
              )}

              {hoodieStyle === 'sporty' && (
                <g>
                  {/* Athletic shoulder stripes */}
                  <line x1="74" y1="110" x2="74" y2="160" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
                  <line x1="79" y1="110" x2="79" y2="160" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
                  {/* Varsity number patch */}
                  <circle cx="112" cy="133" r="8.5" fill="#FFFFFF" />
                  <text x="112.5" y="136" fontSize="8.5" fontWeight="black" fill={pet.hoodieColor} textAnchor="middle" fontFamily="monospace">9</text>
                </g>
              )}
            </g>

            {/* Hoodie pocket */}
            <path
              d="M80 140 Q100 155, 120 140 Z"
              fill="rgba(255,255,255,0.25)"
              className="transition-colors duration-500"
            />

            {/* Hoodie hanging drawstrings */}
            <line x1="93" y1="110" x2="93" y2="128" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            <line x1="107" y1="110" x2="107" y2="128" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            <circle cx="93" cy="128" r="3.5" fill="#E2E8F0" />
            <circle cx="107" cy="128" r="3.5" fill="#E2E8F0" />

            {/* 4. Head of Puppy (Face sits beautifully nested inside the hood opening) */}
            <circle cx="100" cy="85" r="34" fill="#FFF0DF" />

            {/* Floppy Ears (peeking out snug from the hood) */}
            {/* Left Ear */}
            <motion.path
              d="M68 67 C53 67, 48 98, 60 106 C69 110, 75 88, 73 74 Z"
              fill="#D4B48F"
              animate={pet.currentAction === 'barking' ? { rotate: [-10, 10, -10] } : {}}
              transition={{ duration: 0.3, repeat: pet.currentAction === 'barking' ? Infinity : 0 }}
            />
            {/* Right Ear */}
            <motion.path
              d="M132 67 C147 67, 152 98, 140 106 C131 110, 125 88, 127 74 Z"
              fill="#D4B48F"
              animate={pet.currentAction === 'barking' ? { rotate: [10, -10, 10] } : {}}
              transition={{ duration: 0.3, repeat: pet.currentAction === 'barking' ? Infinity : 0 }}
            />

            {/* 5. Face Elements */}
            {/* Snout */}
            <ellipse cx="100" cy="95" rx="12" ry="8" fill="#FFFFFF" />
            
            {/* Eyes */}
            {pet.currentAction === 'sleeping' ? (
              <>
                {/* Closed sleeping eyes */}
                <path d="M78 83 Q85 90, 92 83" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M108 83 Q115 90, 122 83" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Happy alert shiny eyes */}
                <circle cx="85" cy="82" r="6.5" fill="#451A03" />
                <circle cx="83.5" cy="80.5" r="2.2" fill="#FFFFFF" />
                <circle cx="115" cy="82" r="6.5" fill="#451A03" />
                <circle cx="113.5" cy="80.5" r="2.2" fill="#FFFFFF" />
              </>
            )}

            {/* Nose */}
            <polygon points="96,92 104,92 100,98" fill="#1E293B" />

            {/* Mouth / Tongue */}
            {pet.currentAction === 'eating' ? (
              <circle cx="100" cy="101" r="3.5" fill="#EF4444" />
            ) : pet.currentAction === 'barking' ? (
              <circle cx="100" cy="102" r="6" fill="#E11D48" />
            ) : (
              // Happy little tongue
              <path d="M97 99 Q100 107, 103 99" stroke="#451A03" strokeWidth="1.5" fill="#F472B6" />
            )}

            {/* Front paws sticking out of hoodie (Animate running/walking stride) */}
            <motion.circle
              cx="85"
              cy="158"
              r="9"
              fill="#FFF0DF"
              animate={pet.currentAction === 'sleeping' ? { cy: 158, cx: 85 } : {
                cy: [158, 161, 158, 154, 158],
                cx: [85, 82, 85, 88, 85]
              }}
              transition={{
                repeat: Infinity,
                duration: pet.currentAction === 'idle' ? 0.75 : 0.35,
                ease: 'linear'
              }}
            />
            <motion.circle
              cx="115"
              cy="158"
              r="9"
              fill="#FFF0DF"
              animate={pet.currentAction === 'sleeping' ? { cy: 158, cx: 115 } : {
                cy: [158, 154, 158, 161, 158],
                cx: [115, 118, 115, 112, 115]
              }}
              transition={{
                repeat: Infinity,
                duration: pet.currentAction === 'idle' ? 0.75 : 0.35,
                ease: 'linear'
              }}
            />

            {/* ACCESSORY OVERLAYS */}
            {/* A. Glasses */}
            {pet.accessory === 'glasses' && (
              <g id="accessory-glasses">
                {/* Left lens */}
                <circle cx="85" cy="84" r="11" stroke="#EF4444" strokeWidth="3" fill="rgba(239, 68, 68, 0.1)" />
                {/* Right lens */}
                <circle cx="115" cy="84" r="11" stroke="#EF4444" strokeWidth="3" fill="rgba(239, 68, 68, 0.1)" />
                {/* Bridge */}
                <path d="M96 84 L104 84" stroke="#EF4444" strokeWidth="3" />
                {/* Side arms */}
                <path d="M74 84 L65 82" stroke="#EF4444" strokeWidth="3" />
                <path d="M126 84 L135 82" stroke="#EF4444" strokeWidth="3" />
              </g>
            )}

            {/* Meme Shades */}
            {pet.accessory === 'shades' && (
              <g id="accessory-shades">
                {/* Thug life style black pixel sunglasses */}
                <rect x="71" y="78" width="58" height="10" fill="#000000" />
                <rect x="74" y="88" width="16" height="6" fill="#000000" />
                <rect x="110" y="88" width="16" height="6" fill="#000000" />
                {/* Pixel shines */}
                <rect x="76" y="80" width="4" height="4" fill="#FFFFFF" />
                <rect x="112" y="80" width="4" height="4" fill="#FFFFFF" />
              </g>
            )}

            {/* Gold Chain */}
            {pet.accessory === 'chain' && (
              <g id="accessory-chain">
                {/* Gold collar loops */}
                <path d="M 74,114 Q 100,126 126,114" fill="none" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 76,114 Q 100,129 124,114" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                {/* Gold medallion center */}
                <circle cx="100" cy="125" r="9" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
                {/* Dollar sign symbol inside the medallion */}
                <text x="100" y="128.5" fontSize="10" fontWeight="900" textAnchor="middle" fill="#78350F">$</text>
              </g>
            )}

            {/* B. Crown */}
            {pet.accessory === 'crown' && (
              <g id="accessory-crown">
                <polygon points="85,45 92,30 100,42 108,30 115,45" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                <circle cx="85" cy="45" r="1.5" fill="#EF4444" />
                <circle cx="92" cy="30" r="1.5" fill="#3B82F6" />
                <circle cx="100" cy="42" r="1.5" fill="#EF4444" />
                <circle cx="108" cy="30" r="1.5" fill="#3B82F6" />
                <circle cx="115" cy="45" r="1.5" fill="#EF4444" />
              </g>
            )}

            {/* C. Bandana */}
            {pet.accessory === 'bandana' && (
              <path
                d="M74 112 Q100 135, 126 112 L100 128 Z"
                fill="#3B82F6"
                stroke="#1D4ED8"
                strokeWidth="1"
              />
            )}

            {/* D. Headphones */}
            {pet.accessory === 'headphones' && (
              <g id="accessory-headphones">
                {/* Head band */}
                <path d="M68 85 A 36 36 0 0 1 132 85" stroke="#8B5CF6" strokeWidth="5" fill="none" />
                {/* Left cup */}
                <rect x="61" y="75" width="10" height="18" rx="5" fill="#1E1B4B" stroke="#8B5CF6" strokeWidth="2" />
                {/* Right cup */}
                <rect x="129" y="75" width="10" height="18" rx="5" fill="#1E1B4B" stroke="#8B5CF6" strokeWidth="2" />
              </g>
            )}
          </motion.svg>
        </div>

        {/* Dynamic Action State Badge */}
        <div className="mt-4 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 text-xs font-semibold text-amber-700 dark:text-violet-300 shadow-sm flex items-center gap-1.5">
          {pet.currentAction === 'idle' && '⭐ Sitting Happily'}
          {pet.currentAction === 'barking' && '🐶 WOOF! Happy Barking!'}
          {pet.currentAction === 'eating' && '🍪 Munch Munch... Yum!'}
          {pet.currentAction === 'sleeping' && '😴 Sleepy Time... Shh'}
        </div>
      </div>

      {/* 2. Control Panel */}
      <div className="flex-1 flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Care & Dress Up Studio</span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Feed, pet, or dress up your digital puppy to keep him styling and happy!
          </p>
        </div>

        {/* Vital Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Happiness */}
          <div className="bg-orange-50/45 dark:bg-indigo-950/20 p-3 rounded-2xl border border-orange-100/50 dark:border-indigo-900/20">
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">💖 Love</span>
              <span>{pet.happiness}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-pink-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${pet.happiness}%` }}
              />
            </div>
          </div>

          {/* Hunger */}
          <div className="bg-orange-50/45 dark:bg-indigo-950/20 p-3 rounded-2xl border border-orange-100/50 dark:border-indigo-900/20">
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">🍪 Full</span>
              <span>{100 - pet.hunger}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${100 - pet.hunger}%` }}
              />
            </div>
          </div>

          {/* Energy */}
          <div className="bg-orange-50/45 dark:bg-indigo-950/20 p-3 rounded-2xl border border-orange-100/50 dark:border-indigo-900/20">
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">⚡ Energy</span>
              <span>{pet.energy}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${pet.energy}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Take Action
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <button
              id="action-pet-btn"
              onClick={handlePet}
              disabled={pet.currentAction !== 'idle' || activeTrick !== 'none'}
              className="flex-1 min-w-[110px] bg-pink-100 hover:bg-pink-200 text-pink-700 font-bold px-4 py-3 rounded-2xl text-xs active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Pet Puppy</span>
            </button>

            <button
              id="action-feed-btn"
              onClick={handleFeed}
              disabled={pet.currentAction !== 'idle' || activeTrick !== 'none'}
              className="flex-1 min-w-[110px] bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-4 py-3 rounded-2xl text-xs active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Pizza className="w-4 h-4" />
              <span>Feed Treat</span>
            </button>

            <button
              id="action-sleep-btn"
              onClick={handleSleep}
              disabled={pet.currentAction !== 'idle' || activeTrick !== 'none'}
              className="flex-1 min-w-[110px] bg-violet-100 hover:bg-violet-200 text-violet-700 font-bold px-4 py-3 rounded-2xl text-xs active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Moon className="w-4 h-4" />
              <span>Nap Time</span>
            </button>
          </div>
        </div>

        {/* Teach Neiro a Meme Trick */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Teach Neiro a Meme Trick!
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <button
              id="trick-spin-btn"
              onClick={() => {
                if (activeTrick !== 'none' || pet.currentAction !== 'idle') return;
                setActiveTrick('spin');
                playBarkSound(550, 300, 0.15, 'playful');
                setTimeout(() => setActiveTrick('none'), 700);
              }}
              disabled={activeTrick !== 'none' || pet.currentAction !== 'idle'}
              className="flex-1 min-w-[95px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 dark:bg-amber-500/5 font-extrabold px-3 py-2.5 rounded-xl text-xs active:scale-95 transition-all flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer border border-amber-500/20"
            >
              <span>🔄</span>
              <span>Spin Around</span>
            </button>

            <button
              id="trick-flip-btn"
              onClick={() => {
                if (activeTrick !== 'none' || pet.currentAction !== 'idle') return;
                setActiveTrick('flip');
                playBarkSound(680, 480, 0.12, 'tiny');
                setTimeout(() => setActiveTrick('none'), 850);
              }}
              disabled={activeTrick !== 'none' || pet.currentAction !== 'idle'}
              className="flex-1 min-w-[95px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 dark:bg-emerald-500/5 font-extrabold px-3 py-2.5 rounded-xl text-xs active:scale-95 transition-all flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer border border-emerald-500/20"
            >
              <span>🤸</span>
              <span>Backflip</span>
            </button>

            <button
              id="trick-moonwalk-btn"
              onClick={() => {
                if (activeTrick !== 'none' || pet.currentAction !== 'idle') return;
                setActiveTrick('moonwalk');
                playBarkSound(350, 180, 0.25, 'playful');
                setTimeout(() => setActiveTrick('none'), 1400);
              }}
              disabled={activeTrick !== 'none' || pet.currentAction !== 'idle'}
              className="flex-1 min-w-[95px] bg-violet-500/10 hover:bg-violet-500/20 text-violet-700 dark:text-violet-300 dark:bg-violet-500/5 font-extrabold px-3 py-2.5 rounded-xl text-xs active:scale-95 transition-all flex items-center justify-center gap-1 disabled:opacity-50 cursor-pointer border border-violet-500/20"
            >
              <span>🚶</span>
              <span>Moonwalk</span>
            </button>
          </div>
        </div>

        {/* Customize Hoodie & Accessories */}
        <div className="space-y-4 pt-4 border-t border-orange-50 dark:border-indigo-950/40">
          {/* Hoodie Color Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hoodie Color Style
            </label>
            <div className="flex items-center gap-3">
              {HOODIE_COLORS.map((col) => (
                <button
                  key={col.hex}
                  id={`hoodie-color-${col.name.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setPet((prev) => ({ ...prev, hoodieColor: col.hex }))}
                  className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer transform active:scale-90 flex items-center justify-center ${col.bg} ${
                    pet.hoodieColor === col.hex
                      ? 'border-slate-800 dark:border-slate-100 scale-110 shadow-md'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title={col.name}
                >
                  {pet.hoodieColor === col.hex && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Hoodie Pattern Style Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Jacket Style / Patterns
            </label>
            <div className="flex flex-wrap gap-2">
              {HOODIE_STYLES.map((style) => (
                <button
                  key={style.id}
                  id={`hoodie-style-${style.id}`}
                  onClick={() => setHoodieStyle(style.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    hoodieStyle === style.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm dark:bg-violet-600 dark:border-violet-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                  }`}
                  title={style.desc}
                >
                  <span>{style.icon}</span>
                  <span>{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Accessory Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Accessories
            </label>
            <div className="flex flex-wrap gap-2">
              {ACCESSORIES.map((acc) => (
                <button
                  key={acc.id}
                  id={`accessory-${acc.id}`}
                  onClick={() => setPet((prev) => ({ ...prev, accessory: acc.id }))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    pet.accessory === acc.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm dark:bg-violet-600 dark:border-violet-600'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'
                  }`}
                >
                  <span>{acc.icon}</span>
                  <span>{acc.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
