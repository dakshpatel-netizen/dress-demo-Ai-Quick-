import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface StickyBottomCTAProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: 'arrow' | 'sparkle' | 'none';
}

export const StickyBottomCTA: React.FC<StickyBottomCTAProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  icon = 'arrow',
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px] pointer-events-auto">
      <div className="max-w-md md:max-w-xl mx-auto">
        <button
          onClick={onClick}
          disabled={disabled || loading}
          className={`w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] ${
            disabled
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200/70'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/25 active:shadow-sm cursor-pointer'
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <>
              <span>{label}</span>
              {icon === 'arrow' && !disabled && (
                <ArrowRight className="w-5 h-5 stroke-[2.4]" />
              )}
              {icon === 'sparkle' && (
                <Sparkles className="w-5 h-5 fill-white stroke-white" />
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};
