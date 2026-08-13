/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Wallet, ArrowDownCircle, RefreshCw, ShoppingCart, HelpCircle } from 'lucide-react';

export default function HowToBuy() {
  const steps = [
    {
      num: '01',
      title: 'Get a Robinhood Wallet',
      desc: 'Download and install the official Robinhood Wallet app (or other compatible Web3 browser wallets like MetaMask) from your app store.',
      icon: <Wallet className="w-6 h-6 text-amber-600 dark:text-violet-400" />,
      color: 'bg-amber-100 dark:bg-violet-950/50',
    },
    {
      num: '02',
      title: 'Deposit Robinhood Gas',
      desc: 'Purchase or deposit native gas tokens directly into your wallet. Ensure you select the "Robinhood Chain" network option when withdrawing.',
      icon: <ArrowDownCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      color: 'bg-emerald-100 dark:bg-emerald-950/50',
    },
    {
      num: '03',
      title: 'Connect to Robinhood Swap',
      desc: 'Navigate to Robinhood Chain Swap/DEX inside your Web3 wallet browser. Click "Connect Wallet" and confirm the connection request.',
      icon: <RefreshCw className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      color: 'bg-sky-100 dark:bg-sky-950/50',
    },
    {
      num: '04',
      title: 'Swap for $NEIRO',
      desc: 'Paste the official $NEIRO contract address into the swap target. Enter the amount you want to buy, adjust slippage, and tap Swap! 🐾',
      icon: <ShoppingCart className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
      color: 'bg-pink-100 dark:bg-pink-950/50',
    },
  ];

  return (
    <div className="bg-white dark:bg-indigo-950/30 border border-orange-100 dark:border-indigo-900/40 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
            How to Buy $NEIRO
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Follow this quick 4-step guide to secure your position in the street-built Neiro movement.
        </p>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex flex-col justify-between p-5 bg-orange-50/25 dark:bg-slate-900/30 rounded-2xl border border-orange-100/10 dark:border-slate-800/60 relative group hover:border-amber-200 dark:hover:border-violet-800 transition-all"
          >
            {/* Step Number Backdrop */}
            <span className="absolute top-3 right-4 font-black text-3xl text-orange-200/40 dark:text-indigo-900/20 select-none">
              {step.num}
            </span>

            <div className="space-y-4">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.color}`}>
                {step.icon}
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pr-2">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Tip Box */}
      <div className="flex items-start gap-3 bg-amber-500/10 text-amber-800 dark:bg-violet-600/10 dark:text-violet-300 p-4 rounded-2xl border border-amber-500/20 dark:border-violet-800/30">
        <HelpCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <span className="font-bold block">🚨 Important Security Reminder:</span>
          <p className="opacity-90 leading-relaxed">
            Never share your wallet private keys or seed phrase with anyone. The NEIRO team will never message you first asking to validate your wallet. Always verify the contract address matches exactly: <code className="font-mono bg-amber-500/20 dark:bg-violet-600/30 px-1 py-0.5 rounded text-amber-900 dark:text-violet-200 select-all">0x0000000000000000000000000</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
