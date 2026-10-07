import React, { useRef, useState } from 'react';
import { RefreshCw, Sparkles, ArrowRight, ArrowLeft, UploadCloud } from 'lucide-react';
import { CategoryId } from '../types';
import { StepProgressIndicator } from './StepProgressIndicator';

interface Step2UploadProps {
  uploadedImage: string | null;
  uploadedImageName: string | null;
  selectedCategory: CategoryId | null;
  onImageSelected: (imageUri: string, name: string) => void;
  onClearImage: () => void;
  onDirectGenerate?: () => void;
  onBack: () => void;
}

export const Step2Upload: React.FC<Step2UploadProps> = ({
  uploadedImage,
  onImageSelected,
  onDirectGenerate,
  onBack,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 sm:px-6 py-6 my-auto">
      {/* Top Center Step Progress Indicator & Title */}
      <div className="mb-6 sm:mb-8 text-center flex flex-col items-center">
        <StepProgressIndicator currentStep={2} />
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 balance">
          Upload Your Product
        </h1>
      </div>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Box / Uploaded Image Preview */}
      <div className="w-full">
        {!uploadedImage ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full aspect-[4/3.2] sm:aspect-[16/11] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center transition-all duration-200 cursor-pointer select-none active:scale-[0.99] ${
              isDragging
                ? 'border-orange-500 bg-orange-50/80 scale-[1.01]'
                : 'border-neutral-300 bg-neutral-50/60 hover:border-orange-400 hover:bg-orange-50/30'
            }`}
          >
            {/* Upload Icon Circle */}
            <div className="w-16 h-16 rounded-2xl bg-orange-50 shadow-xs border border-orange-200/70 flex items-center justify-center text-orange-500 mb-4 transition-transform hover:scale-110">
              <UploadCloud className="w-8 h-8 stroke-[2.2]" />
            </div>

            <span className="text-lg font-bold text-neutral-900">
              Upload Product Photo
            </span>
            <span className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
              Tap to choose an image or drag & drop
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Image Container with preview */}
            <div className="relative w-full aspect-[4/3.2] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-sm flex items-center justify-center">
              <img
                src={uploadedImage}
                alt="Uploaded product preview"
                className="w-full h-full object-contain p-3"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Change Image Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-10 rounded-xl bg-neutral-100 hover:bg-orange-50 text-neutral-700 hover:text-orange-600 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors active:scale-[0.99] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Image</span>
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons Row: Back & Generate Button */}
      <div className="flex items-center gap-3 w-full mt-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="h-14 px-6 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-base flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
          <span>Back</span>
        </button>

        {/* Generate Button */}
        <button
          type="button"
          onClick={onDirectGenerate}
          disabled={!uploadedImage}
          className={`flex-1 h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-200 ${
            !uploadedImage
              ? 'bg-neutral-100 text-neutral-400 border border-neutral-200/70 cursor-not-allowed pointer-events-none select-none'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/25 active:scale-[0.98] cursor-pointer'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${uploadedImage ? 'fill-white stroke-white' : 'stroke-neutral-400'}`} />
          <span>Generate</span>
          <ArrowRight className="w-5 h-5 stroke-[2.4] ml-0.5" />
        </button>
      </div>
    </div>
  );
};
