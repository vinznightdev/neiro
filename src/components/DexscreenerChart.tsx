/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Award, Clock, ArrowUpRight, ArrowDownRight, Maximize2 } from 'lucide-react';

interface Trade {
  id: string;
  time: string;
  type: 'buy' | 'sell';
  price: number;
  amount: string;
  valueUsd: number;
}

export default function DexscreenerChart() {
  return (
    <div className="bg-white dark:bg-indigo-950/70 border border-orange-100 dark:border-indigo-900/40 rounded-3xl p-4 sm:p-5 lg:p-6 shadow-sm flex flex-col space-y-4">
      {/* Chart Title / Dexscreener Meta */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-xl shadow-sm border border-slate-800">
            🦅
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                NEIRO / ROBINHOOD
              </h3>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/20 animate-pulse">
                LIVE CHART
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Official Embedded Feed • Robinhood Chain
            </p>
          </div>
        </div>
      </div>

      {/* Primary Display Area - strictly the Live Dexscreener Frame */}
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 bg-slate-950 min-h-[280px] sm:min-h-[360px]">
        <iframe
          id="dexscreener-iframe"
          src="https://dexscreener.com/robinhood/neiro?embed=1&theme=dark"
          title="Dexscreener Realtime NEIRO Chart"
          className="w-full h-full absolute inset-0 border-0"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          loading="lazy"
        />
      </div>
    </div>
  );
}
