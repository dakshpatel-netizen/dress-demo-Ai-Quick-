import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Download,
  Trash2,
  Play,
  RotateCcw,
  Check,
  Layers,
  Wand2,
  Eraser,
  Video,
  Gem,
  Bed,
  Glasses,
  Clock,
  Image as ImageIcon,
} from 'lucide-react';
import { AdvanceStudioCategory, CategoryId, AdvanceModel } from '../types';
import { ADVANCE_MODELS, CATEGORIES, FeatureOption } from '../data/constants';

interface AdvanceToolViewProps {
  category: AdvanceStudioCategory;
  uploadedImage: string | null;
  uploadedImageName: string | null;
  currentLookImage: string | null;
  currentModelName: string | null;
  onBackToHub: () => void;
  onApplyAndGenerate: (lookImage: string, title: string) => void;
}

export const AdvanceToolView: React.FC<AdvanceToolViewProps> = ({
  category,
  uploadedImage,
  uploadedImageName,
  currentLookImage,
  currentModelName,
  onBackToHub,
  onApplyAndGenerate,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewResult, setPreviewResult] = useState<string | null>(null);

  // Tool specific options
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedSubStyle, setSelectedSubStyle] = useState('Default Luxury');

  // Titles and metadata based on category
  const toolMeta: Record<
    string,
    {
      title: string;
      description: string;
      sampleImage: string;
      presets: string[];
    }
  > = {
    jewellery: {
      title: 'Jewellery AI Studio',
      description: 'Render fine necklaces, earrings, and rings with high-glamour fashion models.',
      sampleImage: '/src/assets/images/cat_jewellery_1790846933207.jpg',
      presets: ['Royal Gold & Polki', 'Diamond Solitaire', 'Heritage Kundan', 'Modern Minimal'],
    },
    bedsheet: {
      title: 'Bedsheet & Linen Staging',
      description: 'Staging bedlinen and home fabrics in photorealistic designer bedrooms.',
      sampleImage: '/src/assets/images/cat_bedsheet_1790846885150.jpg',
      presets: ['Master Suite Staging', 'Boho Chic Bedroom', 'Hotel Luxury King', 'Cozy Minimalist'],
    },
    eyewear: {
      title: 'Eyewear & Optics Studio',
      description: 'Showcase sunglasses, optical frames, and lenses on stylish fashion models.',
      sampleImage: '/src/assets/images/cat_eyewear_1790846903069.jpg',
      presets: ['Urban Aviator', 'Retro Wayfarer', 'High Fashion Cat-Eye', 'Executive Frameless'],
    },
    collage: {
      title: 'Lookbook Collage Creator',
      description: 'Generate multi-angle 3-shot lookbooks and Instagram catalog story grids.',
      sampleImage: '/src/assets/images/cat_product_1790846917177.jpg',
      presets: ['3-Shot Lookbook Grid', 'Catalog Hero + Details', 'Split Runway & Portrait', 'Story Banner'],
    },
    remove_bg: {
      title: 'Remove Background (Cutout AI)',
      description: 'Isolate apparel from backgrounds with crisp edge precision and natural soft shadows.',
      sampleImage: uploadedImage || '/src/assets/images/sample_product_saree_1790829350284.jpg',
      presets: ['Pure White Studio (Amazon/Myntra)', 'Transparent PNG Cutout', 'Soft Shadow Pedestal', 'Warm Grey Gradient'],
    },
    custom_gen: {
      title: 'Custom AI Generation',
      description: 'Type exact styling, backdrop, camera lens, and lighting prompts for full creative freedom.',
      sampleImage: '/src/assets/images/generated_female_jacket_1790828045755.jpg',
      presets: ['Vogue Cover Lighting', 'Outdoor Golden Hour', 'Cyberpunk Neon Fashion', 'Heritage Fort Sunset'],
    },
    customer_video: {
      title: 'Customer Video & Reels',
      description: 'Transform high-res garment photos into realistic 4-second runway video clips.',
      sampleImage: currentLookImage || '/src/assets/images/generated_result_saree_1790829363169.jpg',
      presets: ['Slow-Mo Runway Walk', '360 Garment Turn', 'Cinematic Fashion Pan', 'Studio Close-up Flow'],
    },
  };

  const currentMeta = toolMeta[category];

  const handleRunTool = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPreviewResult(currentMeta?.sampleImage || currentLookImage || '/src/assets/images/generated_result_saree_1790829363169.jpg');
    }, 1800);
  };

  const handleApplyToMain = () => {
    if (previewResult || currentMeta?.sampleImage) {
      onApplyAndGenerate(
        previewResult || currentMeta?.sampleImage || '',
        `${currentMeta?.title || 'Advance Studio'} Look`
      );
    }
  };

  // Special View: History (Displays top centered title, category subheadings, and 1 row 3 images per category)
  if (category === 'history') {
    const historySections: {
      categoryId: string;
      title: string;
      images: string[];
    }[] = [
      {
        categoryId: 'garment',
        title: 'Garment',
        images: [
          ...(currentLookImage ? [currentLookImage] : []),
          '/src/assets/images/generated_result_saree_1790829363169.jpg',
          '/src/assets/images/generated_result_female_1790827541105.jpg',
          '/src/assets/images/generated_male_ethnic_1790829382262.jpg',
          '/src/assets/images/generated_female_jacket_1790828045755.jpg',
          '/src/assets/images/cat_garba_dress_1790846849526.jpg',
        ],
      },
      {
        categoryId: 'bedsheet',
        title: 'Bedsheet',
        images: [
          '/src/assets/images/cat_bedsheet_1790846885150.jpg',
          '/src/assets/images/cat_product_1790846917177.jpg',
          '/src/assets/images/sample_product_dress_1790827524274.jpg',
        ],
      },
      {
        categoryId: 'jewellery',
        title: 'Jewellery',
        images: [
          '/src/assets/images/cat_jewellery_1790846933207.jpg',
          '/src/assets/images/cat_eyewear_1790846903069.jpg',
          '/src/assets/images/generated_result_female_1790827541105.jpg',
        ],
      },
      {
        categoryId: 'eyewear',
        title: 'Eyewear',
        images: [
          '/src/assets/images/cat_eyewear_1790846903069.jpg',
          '/src/assets/images/generated_female_jacket_1790828045755.jpg',
          '/src/assets/images/generated_male_green_1790828058173.jpg',
        ],
      },
    ];

    return (
      <div className="flex flex-col w-full max-w-4xl mx-auto px-3 sm:px-6 pt-2 pb-16 animate-in fade-in duration-300 text-left">
        {/* Top Header Bar: Back Button (Left), Centered History Title */}
        <div className="relative flex items-center justify-between mb-6 pb-3 border-b border-neutral-100">
          <button
            type="button"
            onClick={onBackToHub}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs transition-colors cursor-pointer shrink-0 z-10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Centered History Title */}
          <h1 className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl font-extrabold text-neutral-900 pointer-events-none">
            History
          </h1>

          <div className="w-16 shrink-0" />
        </div>

        {/* Category History Sections */}
        <div className="space-y-8 w-full">
          {historySections.map((section) => (
            <div key={section.categoryId} className="w-full space-y-3">
              {/* Category Subheading (Left-aligned) */}
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-neutral-900 tracking-tight">
                  {section.title}
                </h2>
              </div>

              {/* 1 Row 3 Images (Horizontal Grid) */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full">
                {section.images.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-orange-400 transition-all group"
                  >
                    <img
                      src={imgSrc}
                      alt={`${section.title} item ${idx + 1}`}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Hover Download Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <a
                        href={imgSrc}
                        download={`${section.title.toLowerCase()}-photoshoot-${idx + 1}.jpg`}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center shadow-lg hover:bg-orange-500 hover:text-white transition-all transform scale-90 group-hover:scale-100"
                        title="Download Image"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Standard Tool View (Jewellery, Bedsheet, Eyewear, Collage, Remove BG, Custom Gen, Customer Video)
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-4 sm:px-6 pt-3 pb-32 animate-in fade-in duration-300 text-left">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBackToHub}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Categories</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Advance AI Tool</span>
        </div>
      </div>

      {/* Tool Title */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/90 text-[11px] sm:text-xs font-bold tracking-wide shadow-2xs mb-1.5 select-none">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Advance Mode</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
          {currentMeta?.title || 'Advance Studio Tool'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium max-w-md mx-auto">
          {currentMeta?.description}
        </p>
      </div>

      {/* Main Interactive Card */}
      <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50 p-5 sm:p-6 mb-6 space-y-5">
        {/* Style Presets */}
        {currentMeta?.presets && (
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Select Preset Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentMeta.presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSelectedSubStyle(preset)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold text-center transition-all border cursor-pointer ${
                    selectedSubStyle === preset
                      ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                      : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Prompt Input */}
        <div>
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            Styling / Directives (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Luxurious studio lighting, 8k resolution, photorealistic..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full px-4 py-2.5 text-xs bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-900 placeholder:text-neutral-400"
          />
        </div>

        {/* Preview Container */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
            {isProcessing ? 'Processing AI Output...' : 'Studio Preview'}
          </label>
          <div className="relative aspect-[4/3] sm:aspect-[16/9] w-full max-w-lg mx-auto rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-md flex items-center justify-center">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-3 text-white">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-bold tracking-wide">Rendering high quality AI asset...</span>
              </div>
            ) : (
              <img
                src={previewResult || currentMeta?.sampleImage}
                alt="Tool Output Preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={handleRunTool}
            disabled={isProcessing}
            className="h-14 px-5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer border border-neutral-700"
          >
            <RotateCcw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>Re-Generate Preview</span>
          </button>

          <button
            type="button"
            onClick={handleApplyToMain}
            disabled={isProcessing}
            className="flex-1 h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5 fill-white stroke-white" />
            <span>Apply & View Result</span>
          </button>
        </div>
      </div>
    </div>
  );
};
