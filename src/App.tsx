/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Heart, Sparkles, Volume2, Award, Bone, Info, Star, Flame, Compass } from 'lucide-react';

import TailWaggingCursor from './components/TailWaggingCursor';
import InteractiveGallery from './components/InteractiveGallery';
import PuppySimulator from './components/PuppySimulator';
import Tokenomics from './components/Tokenomics';
import DexscreenerChart from './components/DexscreenerChart';
import HowToBuy from './components/HowToBuy';
import { playBarkSound, playWebClickSound } from './utils/audio';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [barksCount, setBarksCount] = useState<number>(0);
  const [treatsFed, setTreatsFed] = useState<number>(0);
  const [lovePawsCount, setLovePawsCount] = useState<number>(12042);
  const [pawPrints, setPawPrints] = useState<{ id: number; top: number; left: number; size: number; rotate: number; opacity: number }[]>([]);
  const [dogeWords, setDogeWords] = useState<{ id: number; text: string; top: number; left: number; color: string; size: number; rotate: number }[]>([]);

  // Sync dark mode style, global click sound, and random background paw footprints
  useEffect(() => {
    const savedTheme = localStorage.getItem('puppy_theme_dark');
    if (savedTheme === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Load initial stats
    const savedBarks = localStorage.getItem('stat_barks_count');
    if (savedBarks) setBarksCount(parseInt(savedBarks, 10));

    const savedTreats = localStorage.getItem('stat_treats_count');
    if (savedTreats) setTreatsFed(parseInt(savedTreats, 10));

    // Generate random background marks of a dog's feet with random shape (size), rotation, and position
    const prints = Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      top: Math.random() * 95 + 2,
      left: Math.random() * 92 + 4,
      size: Math.random() * 28 + 14, // 14px to 42px
      rotate: Math.random() * 360,
      opacity: Math.random() * 0.08 + 0.04, // 4% to 12% opacity
    }));
    setPawPrints(prints);

    // Generate random floating doge captions
    const colors = [
      'text-pink-500/35 dark:text-pink-400/25',
      'text-emerald-500/35 dark:text-emerald-400/25',
      'text-cyan-500/35 dark:text-cyan-400/25',
      'text-amber-500/35 dark:text-amber-400/25',
      'text-rose-500/35 dark:text-rose-400/25',
      'text-violet-500/35 dark:text-violet-400/25',
      'text-lime-500/35 dark:text-lime-400/25'
    ];
    const slogans = [
      'much coin!', 'such neiro!', 'very street!', 'so click!', 'wow!', 'many liquidity!', 
      'such dexscreener!', 'very utility!', 'so fast paws!', 'much cozy!', 'wow so token!',
      '1 $NEIRO = 1 $NEIRO', 'very hood!', 'spirit of street!', 'much care!', 'such fashion!'
    ];
    const words = slogans.map((slogan, i) => ({
      id: i,
      text: slogan,
      top: Math.random() * 88 + 6,
      left: Math.random() * 85 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 15, // 15px to 27px
      rotate: Math.random() * 30 - 15, // -15deg to +15deg
    }));
    setDogeWords(words);

    // Global listener for sound on each click of the website
    const handleGlobalClick = () => {
      playWebClickSound();
    };
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('puppy_theme_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('puppy_theme_dark', 'false');
    }
    // Play a tiny happy chime-like bark when toggling themes
    playBarkSound(newMode ? 300 : 450, 150, 0.12, 'tiny');
  };

  const incrementBarks = () => {
    const newVal = barksCount + 1;
    setBarksCount(newVal);
    localStorage.setItem('stat_barks_count', newVal.toString());
  };

  const handleQuickBark = () => {
    playBarkSound(380, 200, 0.18, 'playful');
    incrementBarks();
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-700 ease-in-out font-sans overflow-x-hidden ${
      darkMode 
        ? 'bg-[#04060C] text-indigo-100 selection:bg-violet-800/60 selection:text-white' 
        : 'bg-[#DED8BE] text-slate-900 selection:bg-amber-200/60 selection:text-slate-900'
    }`}>
      {/* Whimsical custom cursor effect */}
      <TailWaggingCursor />

      {/* Subtle random dog paw print background pattern & Comic doge slogans */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {pawPrints.map((print) => (
          <span
            key={print.id}
            className="absolute text-amber-500/15 dark:text-violet-400/10 transition-all duration-1000"
            style={{
              top: `${print.top}%`,
              left: `${print.left}%`,
              fontSize: `${print.size}px`,
              transform: `rotate(${print.rotate}deg)`,
              opacity: print.opacity,
              lineHeight: 1,
            }}
          >
            🐾
          </span>
        ))}
        {dogeWords.map((word) => (
          <span
            key={`word-${word.id}`}
            className={`absolute font-black uppercase tracking-wide transition-all duration-1000 ${word.color}`}
            style={{
              top: `${word.top}%`,
              left: `${word.left}%`,
              fontSize: `${word.size}px`,
              transform: `rotate(${word.rotate}deg)`,
              fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", sans-serif',
              lineHeight: 1,
            }}
          >
            {word.text}
          </span>
        ))}
      </div>

      {/* Decorative Night Stars (Only visible in Night Mode) */}
      <AnimatePresence>
        {darkMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-transparent to-transparent z-0 overflow-hidden"
          >
            {/* Soft twinkling dots simulating starry sky */}
            <div className="absolute top-12 left-[10%] w-1.5 h-1.5 bg-violet-300 rounded-full animate-ping" />
            <div className="absolute top-24 right-[15%] w-1 h-1 bg-white rounded-full animate-pulse" />
            <div className="absolute top-[40%] left-[25%] w-1 h-1 bg-violet-400 rounded-full animate-pulse" />
            <div className="absolute top-[60%] right-[30%] w-1.5 h-1.5 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Wrap */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        
        {/* Navigation Bar */}
        <header className="flex justify-between items-center py-4 border-b border-orange-100/50 dark:border-indigo-950/40">
          {/* Logo */}
          <div 
            onClick={handleQuickBark}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <motion.div
              whileHover={{ rotate: [0, -15, 15, -15, 0] }}
              transition={{ duration: 0.4 }}
              className="text-amber-500 dark:text-violet-400 text-2xl"
            >
              🐕
            </motion.div>
            <div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-amber-600 to-orange-500 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
                NEIRO
              </span>
              <span className="font-bold text-xl tracking-tight text-slate-700 dark:text-indigo-200 ml-1">
                Haven
              </span>
            </div>
          </div>

          {/* Right Header Options */}
          <div className="flex items-center gap-3">
            {/* Telegram Link */}
            <a
              href="https://t.me/neirohaven"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-sky-100/60 text-sky-800 hover:bg-sky-200/50 dark:bg-indigo-950/60 dark:text-sky-300 dark:hover:bg-indigo-900/40 transition-all cursor-pointer transform active:scale-90 shadow-sm border border-sky-100/10 flex items-center gap-1.5 text-xs font-black"
              title="Join Telegram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.66-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.88-1.69 6.47-2.8 7.77-3.32 3.7-1.49 4.46-1.75 4.96-1.76.11 0 .36.03.52.16.14.11.18.26.2.37-.02.13 0 .28-.02.43z"/>
              </svg>
              <span className="hidden md:inline">Telegram</span>
            </a>

            {/* Twitter Link */}
            <a
              href="https://twitter.com/neirohaven"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-100/60 text-slate-850 hover:bg-slate-200/50 dark:bg-indigo-950/60 dark:text-slate-300 dark:hover:bg-indigo-900/40 transition-all cursor-pointer transform active:scale-90 shadow-sm border border-slate-100/10 flex items-center gap-1.5 text-xs font-black"
              title="Follow Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="hidden md:inline">Twitter</span>
            </a>

            {/* Robinhood Chain Badge */}
            <span className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400">
              🏹 Robinhood Chain
            </span>
            
            {/* Dark Mode Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2.5 sm:p-3 rounded-full bg-orange-100/60 text-amber-800 hover:bg-orange-200/50 dark:bg-indigo-950/60 dark:text-violet-300 dark:hover:bg-indigo-900/40 transition-all cursor-pointer transform active:scale-90 shadow-sm border border-orange-100/20 flex items-center gap-1.5 text-xs font-bold"
              title={darkMode ? 'Switch to Street Active Mode' : 'Switch to Midnight Sleepy Mode'}
            >
              {darkMode ? (
                <>
                  <Moon className="w-4 h-4 text-violet-400 animate-pulse" />
                  <span className="hidden sm:inline">Sleepy Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
                  <span className="hidden sm:inline">Street Mode</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Official Banner Image */}
        <div className="w-full rounded-3xl overflow-hidden border border-orange-100/40 dark:border-indigo-950/40 shadow-sm relative aspect-[21/9] sm:aspect-[21/7] lg:aspect-[21/5]">
          <img
            src="https://sf4service.site/raw/img_e8ttxc099.jpg"
            alt="NEIRO Official Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-100/35 via-orange-50/20 to-transparent dark:from-indigo-950/15 dark:to-transparent rounded-3xl p-6 sm:p-8 lg:p-12 border border-orange-100/40 dark:border-indigo-950/20 flex flex-col lg:flex-row gap-8 items-center">
          
          {/* Main Visual Frame */}
          <div className="lg:w-5/12 flex justify-center relative w-full">
            {/* Visual background decorative blobs */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/20 to-pink-400/10 dark:from-violet-600/10 dark:to-transparent rounded-full blur-2xl filter scale-95" />
            
            {/* Beautiful Interactive Photo Frame */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl max-w-sm w-full"
            >
              <img
                src="https://sf4service.site/raw/img_b7q5maia9.jpg"
                alt="Neiro the street leader in golden hoodie"
                referrerPolicy="no-referrer"
                className="w-full object-cover aspect-square"
              />
              
              {/* Sweet visual captions */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                  Neiro Street Fashion
                </span>
                <h3 className="text-lg font-black mt-0.5 leading-tight">
                  Spirit of the Streets
                </h3>
              </div>
            </motion.div>
          </div>

          {/* Hero Welcome Words */}
          <div className="lg:w-7/12 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Exclusively on Robinhood Chain</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Embrace the Spirit of{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-400 dark:from-violet-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  NEIRO
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-800 dark:text-indigo-100 font-medium leading-relaxed max-w-xl">
                NEIRO represents the spirit of the streets—built on resilience, ambition, and community. From humble beginnings to a global stage, NEIRO is creating a movement driven by people who believe in building something bigger together. The journey is just beginning.
              </p>
            </div>

            {/* Quick Action Button & Stats Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2 w-full">
              <button
                id="hero-bark-button"
                onClick={handleQuickBark}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-extrabold px-6 py-3.5 rounded-full text-sm shadow-md shadow-amber-500/20 dark:shadow-violet-800/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear NEIRO Bark! 🐕</span>
              </button>

              {/* Telegram & Twitter Quick Badges */}
              <div className="flex items-center gap-2.5">
                <a
                  href="https://t.me/neirohaven"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-md active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  title="Telegram Chat"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.66-.52.36-.99.53-1.41.52-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.88-1.69 6.47-2.8 7.77-3.32 3.7-1.49 4.46-1.75 4.96-1.76.11 0 .36.03.52.16.14.11.18.26.2.37-.02.13 0 .28-.02.43z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/neirohaven"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-slate-900 hover:bg-black text-white dark:bg-slate-800 dark:hover:bg-slate-700 shadow-md active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                  title="Twitter Feed"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>

              {/* Mini Stats Column */}
              <div className="flex gap-4 text-xs font-bold text-slate-750 dark:text-indigo-200 pl-1">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-pink-500 fill-current" />
                  <span>12K+ Believers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bone className="w-4 h-4 text-amber-500" />
                  <span>{barksCount} Barks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Market Analysis */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Flame className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
              Live Market Analysis
            </h2>
          </div>
          <DexscreenerChart />
        </section>

        {/* Resilient Tokenomics */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Compass className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
              Resilient Tokenomics
            </h2>
          </div>
          <Tokenomics />
        </section>

        {/* How To Buy Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
              Onboarding Guide
            </h2>
          </div>
          <HowToBuy />
        </section>

        {/* Street Dress-up Care & Stylist */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">
              Street Dress-up Care & Stylist
            </h2>
          </div>
          <PuppySimulator />
        </section>

        {/* Gallery Section */}
        <section className="space-y-6 pt-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-indigo-950/40 text-orange-800 dark:text-indigo-200 text-[10px] font-extrabold uppercase tracking-widest">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Featured Neiro Gallery Logs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
              Community Gallery & Memes
            </h2>
            <p className="text-xs sm:text-sm text-slate-850 dark:text-indigo-100 font-medium max-w-xl mx-auto">
              Browse through our officially shared street captures. Zoom in, vote on reviews, and spread the love-paws!
            </p>
          </div>

          {/* Gallery Component */}
          <InteractiveGallery />
        </section>

        {/* Footer Area */}
        <footer className="pt-8 border-t border-orange-100/50 dark:border-indigo-950/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-750 dark:text-indigo-200">
          <div className="flex items-center gap-1.5">
            <span>Made with 🐾 and 🐕 for the best community on Robinhood Chain.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/neirohaven" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 dark:hover:text-sky-400 font-extrabold transition-colors">Telegram</a>
            <span className="opacity-40">•</span>
            <a href="https://twitter.com/neirohaven" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-slate-100 font-extrabold transition-colors">Twitter</a>
            <span className="opacity-40">•</span>
            <span>© 2026 NEIRO Haven • All Paws Reserved.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
