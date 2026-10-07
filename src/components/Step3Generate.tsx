import React, { useState, useEffect } from 'react';
import {
  Download,
  RotateCcw,
  Check,
  Wand2,
  History,
} from 'lucide-react';
import { CategoryId, WizardStatus } from '../types';
import { CATEGORIES } from '../data/constants';
import { generateTryonLook, TryonResult } from '../utils/tryonEngine';

interface Step3GenerateProps {
  selectedCategory: CategoryId;
  uploadedImage: string;
  uploadedImageName: string | null;
  status: WizardStatus;
  currentLookImage?: string | null;
  currentModelName?: string | null;
  isFromAdvanceMode?: boolean;
  onStartGeneration: () => void;
  onReset: () => void;
  onBackToUpload: () => void;
  onOpenAdvanceMode: () => void;
  onBackToAdvanceStudio?: () => void;
  onOpenHistory?: () => void;
}

export const Step3Generate: React.FC<Step3GenerateProps> = ({
  selectedCategory,
  uploadedImage,
  uploadedImageName,
  status,
  currentLookImage,
  currentModelName,
  isFromAdvanceMode = false,
  onStartGeneration,
  onReset,
  onOpenAdvanceMode,
  onBackToAdvanceStudio,
  onOpenHistory,
}) => {
  const catObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const [tryonResult, setTryonResult] = useState<TryonResult | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Compute initial Try-On Look when generation starts or inputs change
  useEffect(() => {
    let isMounted = true;
    if (uploadedImage && selectedCategory) {
      generateTryonLook(selectedCategory, uploadedImage, uploadedImageName).then((res) => {
        if (isMounted) {
          setTryonResult(res);
        }
      });
    }
    if (status === 'wizard') {
      onStartGeneration();
    }
    return () => {
      isMounted = false;
    };
  }, [selectedCategory, uploadedImage, uploadedImageName, status]);

  // Loading phase steps simulation
  useEffect(() => {
    if (status === 'generating') {
      setLoadingStep(0);
      const timer1 = setTimeout(() => setLoadingStep(1), 600);
      const timer2 = setTimeout(() => setLoadingStep(2), 1300);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [status]);

  const activeImage = currentLookImage || tryonResult?.imageUrl || uploadedImage;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = activeImage;
    link.download = `DressDemo-${selectedCategory}-${uploadedImageName || 'product'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const loadingMessages = [
    `Analyzing product details & texture...`,
    `Rendering realistic ${catObj.label.toLowerCase()} model photoshoot...`,
    `Applying professional lighting & background...`,
  ];

  // State 1: Generating Loading State
  if (status === 'generating') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] w-full max-w-xl mx-auto px-4 text-center animate-in fade-in duration-300">
        <div className="relative w-60 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl border border-orange-500/30 mb-6 animate-subtle-glow">
          <img
            src={activeImage}
            alt="Generating preview"
            className="w-full h-full object-cover blur-sm opacity-50 scale-105 transition-all"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400/20 to-transparent animate-pulse" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6">
            <div className="w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center mb-4">
              <span className="w-7 h-7 border-3 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            </div>
            <div className="px-4 py-2 rounded-full bg-neutral-900/90 border border-orange-500/40 text-orange-200 text-xs font-semibold tracking-tight shadow-md max-w-[240px] truncate">
              {loadingMessages[loadingStep]}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Creating your image...
        </h2>

        <div className="w-64 h-2 bg-neutral-200 rounded-full overflow-hidden mt-6">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-500"
            style={{ width: loadingStep === 0 ? '35%' : loadingStep === 1 ? '70%' : '95%' }}
          />
        </div>
      </div>
    );
  }

  // State 2: Clean Result State (Download & Advance Mode buttons, Create Another Look, and View History)
  if (status === 'result') {
    return (
      <div className="flex flex-col w-full max-w-md sm:max-w-lg mx-auto px-4 sm:px-6 pt-4 pb-28 animate-in fade-in duration-300">
        {/* High-Res Result Image */}
        <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-950 shadow-2xl border border-neutral-200 group">
          <img
            src={activeImage}
            alt="Generated Look"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Action Buttons directly underneath result image */}
        <div className="flex flex-col gap-2.5 mt-4">
          {isFromAdvanceMode ? (
            /* Single Full-Width Download Button for Advance Mode Generations */
            <div className="w-full">
              <button
                type="button"
                onClick={handleDownload}
                className="w-full h-13 sm:h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-white stroke-[3]" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 shrink-0" />
                    <span>Download High-Res</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Download & Advance Mode Buttons Side by Side for Standard Generations */
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* Download High-Res Button */}
              <button
                type="button"
                onClick={handleDownload}
                className="h-13 sm:h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm md:text-base flex items-center justify-center gap-1.5 sm:gap-2 shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[3]" />
                    <span className="truncate">Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span className="truncate">Download High-Res</span>
                  </>
                )}
              </button>

              {/* Advance Mode Button - Black Stroke & Black Text with Black Magic Stick Icon */}
              <button
                type="button"
                onClick={onOpenAdvanceMode}
                className="h-13 sm:h-14 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-900 font-extrabold text-xs sm:text-sm md:text-base flex items-center justify-center gap-1.5 sm:gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer border-2 border-neutral-900 group"
              >
                <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-900 group-hover:rotate-12 transition-transform shrink-0 stroke-[2.2]" />
                <span className="truncate">Advance Mode</span>
              </button>
            </div>
          )}

          {/* Create Another Look / Back to Advance Studio Button */}
          <button
            type="button"
            onClick={isFromAdvanceMode && onBackToAdvanceStudio ? onBackToAdvanceStudio : onReset}
            className="w-full h-11 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isFromAdvanceMode ? 'Create Another Look' : 'Create Another Look'}</span>
          </button>

          {/* View History Button - Opens Full History Page */}
          <button
            type="button"
            onClick={() => {
              if (onOpenHistory) {
                onOpenHistory();
              }
            }}
            className="w-full py-2 text-neutral-700 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer group"
          >
            <History className="w-4 h-4 text-orange-500 group-hover:rotate-[-45deg] transition-transform" />
            <span>View History</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};
