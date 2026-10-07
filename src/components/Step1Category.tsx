import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/constants';
import { StepProgressIndicator } from './StepProgressIndicator';

interface Step1CategoryProps {
  selectedCategory: CategoryId | null;
  onSelectCategory: (category: CategoryId) => void;
  onNext: () => void;
}

export const Step1Category: React.FC<Step1CategoryProps> = ({
  selectedCategory,
  onSelectCategory,
  onNext,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-2 sm:px-6 py-1.5 sm:py-6 my-auto">
      {/* Top Center Step Progress Indicator & Title */}
      <div className="mb-2 sm:mb-6 text-center flex flex-col items-center shrink-0">
        <StepProgressIndicator currentStep={1} />
        <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 balance">
          Select Category
        </h1>
      </div>

      {/* Grid: 4 categories per row on mobile (aspect-square for perfect compact fit without scroll), 5 on desktop */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-3.5 w-full max-w-4xl">
        {CATEGORIES.map((option) => {
          const isSelected = selectedCategory === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectCategory(option.id)}
              className={`group relative w-full flex flex-col items-center p-1 sm:p-2 rounded-xl sm:rounded-2xl border text-center transition-all duration-200 active:scale-[0.97] cursor-pointer select-none ${
                isSelected
                  ? 'border-orange-500 bg-orange-50/40 shadow-xs sm:shadow-md shadow-orange-500/15 ring-1.5 sm:ring-2 ring-orange-500'
                  : 'border-neutral-200/90 bg-white hover:border-orange-300 hover:bg-orange-50/20'
              }`}
            >
              {/* Category Image - square on mobile so all 15 fit without scrolling, 3:4 portrait on desktop */}
              <div className="relative w-full aspect-square sm:aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/70 mb-0.5 sm:mb-1.5">
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Selected Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
                    <Check className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Category Title */}
              <span className={`text-[8.5px] sm:text-xs font-semibold sm:font-bold tracking-tight leading-none truncate w-full px-0.5 transition-colors ${
                isSelected ? 'text-orange-600 font-extrabold' : 'text-neutral-800'
              }`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Next Button placed directly below categories, completely visible on mobile screen without scroll */}
      <div className="mt-3 sm:mt-6 w-full max-w-md mx-auto shrink-0">
        <button
          type="button"
          onClick={onNext}
          disabled={!selectedCategory}
          className={`w-full h-11 sm:h-14 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
            !selectedCategory
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200/70'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 active:shadow-sm cursor-pointer'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.4]" />
        </button>
      </div>
    </div>
  );
};
