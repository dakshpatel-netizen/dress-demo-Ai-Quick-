import React from 'react';
import { ArrowLeft, Moon, History } from 'lucide-react';
import { WizardStep, WizardStatus } from '../types';

interface HeaderProps {
  currentStep: WizardStep;
  status: WizardStatus;
  isAdvanceMode?: boolean;
  onBack: () => void;
  canGoBack: boolean;
  onOpenHistory?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onBack,
  canGoBack,
  onOpenHistory,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100 px-3 sm:px-8 py-2 sm:py-3.5 shrink-0 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Brand & Back Button */}
        <div className="flex items-center gap-2.5">
          {canGoBack ? (
            <button
              onClick={onBack}
              aria-label="Go back to previous step"
              className="h-8 w-8 sm:h-10 sm:w-10 -ml-1.5 rounded-lg sm:rounded-xl flex items-center justify-center text-neutral-700 hover:text-orange-600 hover:bg-orange-50 active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          ) : (
            <div className="w-1" />
          )}

          {/* Logo with DressDemo Orange Website Theme */}
          <div className="flex items-center gap-2 select-none">
            <div className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-orange-500 text-white font-bold text-xs sm:text-sm tracking-tight shadow-md shadow-orange-500/25">
              D
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-neutral-900">
                Dress<span className="text-orange-500">Demo</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Controls: Credits | Buy, History Icon, Theme Toggle, Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-2.5 select-none">
          {/* Credits & Buy */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
            <span className="text-red-500 font-medium tracking-tight">10 Credits</span>
            <span className="text-neutral-300 font-light">|</span>
            <button
              type="button"
              className="text-amber-700 hover:text-orange-600 font-medium transition-colors cursor-pointer"
            >
              Buy
            </button>
          </div>

          {/* History Icon Button */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-slate-100/90 hover:bg-orange-50 hover:text-orange-600 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Photoshoot History"
            aria-label="Photoshoot History"
          >
            <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          </button>

          {/* Theme Toggle Icon (Moon) */}
          <button
            type="button"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            title="Theme Toggle"
          >
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-slate-800 text-slate-800" />
          </button>

          {/* User Profile Avatar with Orange Border Ring and 'V' */}
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-amber-600 bg-slate-100 flex items-center justify-center text-sky-800 font-bold text-xs sm:text-sm shadow-2xs cursor-pointer select-none"
            title="User Profile"
          >
            V
          </div>
        </div>
      </div>
    </header>
  );
};
