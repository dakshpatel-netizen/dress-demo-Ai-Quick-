import React from 'react';
import { Sparkles, Layers } from 'lucide-react';
import { WizardStep, WizardStatus } from '../types';

interface StepProgressIndicatorProps {
  currentStep: WizardStep | number;
  totalSteps?: number;
  modeLabel?: string;
  isAdvanceMode?: boolean;
  status?: WizardStatus;
}

export const StepProgressIndicator: React.FC<StepProgressIndicatorProps> = ({
  currentStep,
  totalSteps = 3,
  isAdvanceMode = false,
  status = 'wizard',
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-2 sm:mb-3.5 select-none">
      {/* Premium Centered Mode Badge */}
      {isAdvanceMode ? (
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/90 text-[11px] sm:text-xs font-bold tracking-wide shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Advance Mode</span>
        </div>
      ) : (
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200/90 text-[11px] sm:text-xs font-bold tracking-wide shadow-2xs">
          <Layers className="w-3.5 h-3.5 text-neutral-500" />
          <span>Simple Mode</span>
        </div>
      )}

      {/* Steps 1, 2, 3... Circles Centered */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4">
        {steps.map((step) => {
          const isCompleted = status === 'result' || currentStep > step;
          const isCurrent = status !== 'result' && currentStep === step;

          return (
            <div
              key={step}
              className={`w-5.5 h-5.5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-sm font-bold transition-all duration-200 ${
                isCurrent
                  ? 'bg-orange-500 text-white ring-2 sm:ring-4 ring-orange-100 shadow-sm shadow-orange-500/25'
                  : isCompleted
                  ? 'bg-orange-500 text-white'
                  : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
};
