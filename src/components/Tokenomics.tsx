/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Flame, Layers, Copy, Check, Info } from 'lucide-react';

export default function Tokenomics() {
  const [copied, setCopied] = useState(false);
  const contractAddress = '0x0000000000000000000000000';

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      label: 'Token Symbol',
      value: '$NEIRO',
      icon: '💎',
      color: 'from-amber-400 to-orange-400 dark:from-violet-500 dark:to-indigo-500',
    },
    {
      label: 'Network',
      value: 'Robinhood Chain',
      icon: '🏹',
      color: 'from-emerald-400 to-teal-500 dark:from-emerald-600 dark:to-teal-600',
    },
    {
      label: 'Total Supply',
      value: '1,000,000,000',
      icon: '📈',
      color: 'from-pink-400 to-rose-400 dark:from-pink-600 dark:to-rose-600',
    },
    {
      label: 'Transaction Tax',
      value: '0% Buy / Sell',
      icon: '🛡️',
      color: 'from-sky-400 to-blue-400 dark:from-sky-600 dark:to-blue-600',
    },
  ];

  return (
    <div className="bg-white dark:bg-indigo-950/30 border border-orange-100 dark:border-indigo-900/40 rounded-3xl p-6 lg:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
            NEIRO Tokenomics
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Decentralized, fair, and community-owned on the high-efficiency Robinhood Chain.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-orange-50/30 dark:bg-slate-900/40 border border-orange-100/50 dark:border-slate-800 flex flex-col justify-between space-y-3"
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold text-slate-400 dark:text-slate-400">
                {stat.label}
              </span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <div className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Copy Contract Widget */}
      <div className="bg-gradient-to-r from-orange-50/50 to-amber-50/30 dark:from-slate-900/40 dark:to-indigo-950/20 p-4 rounded-2xl border border-orange-100/40 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-violet-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Contract Address</span>
          </div>
          <p className="font-mono text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 break-all select-all pr-2">
            {contractAddress}
          </p>
        </div>

        <button
          id="copy-contract-btn"
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 bg-amber-500 hover:bg-amber-600 text-white shadow-sm dark:bg-violet-600 dark:hover:bg-violet-700 cursor-pointer w-full md:w-auto shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Address</span>
            </>
          )}
        </button>
      </div>

      {/* Community Resilience Disclaimer */}
      <div className="flex items-start gap-3 text-xs bg-orange-100/30 dark:bg-indigo-950/20 p-4.5 rounded-2xl border border-orange-100/20 dark:border-slate-800">
        <Info className="w-5 h-5 text-amber-600 dark:text-violet-400 shrink-0 mt-0.5" />
        <p className="text-slate-500 dark:text-indigo-200/60 leading-relaxed">
          NEIRO is built with a 100% fair launch mechanism. No presales, no developer tokens, and liquidity pool burned permanently. This project belongs strictly to the community, carrying forward the street-built legacy of resilience.
        </p>
      </div>
    </div>
  );
}
