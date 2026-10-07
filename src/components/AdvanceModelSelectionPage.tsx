import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Check,
  X,
  Sparkles,
  Camera,
  Sun,
  ShieldCheck,
  Upload,
  ArrowUp,
  Trash2,
  History,
  Clock,
  Download,
} from 'lucide-react';
import { AdvanceGender, AdvanceModel, CategoryId } from '../types';
import { ADVANCE_MODELS, GENDER_FEATURES, FeatureOption } from '../data/constants';

interface AdvanceModelSelectionPageProps {
  selectedCategory: CategoryId;
  uploadedImage?: string;
  uploadedImageName?: string | null;
  onBackToResult: () => void;
  onApplyModelAndGenerate: (
    model: AdvanceModel,
    feature: FeatureOption,
    options: {
      background: string;
      pose: string;
      lighting: string;
      aspectRatio: string;
      customPrompt: string;
      drapeStyle?: string;
      blouseStyle?: string;
      poseCategory?: string;
      logoImage?: string;
      additionalPrompt?: string;
      quality?: 'standard' | 'hd' | '4k';
      enhance2x?: boolean;
    }
  ) => void;
}

export type AdvanceSubStep =
  | 'model'
  | 'feature'
  | 'upload'
  | 'drape'
  | 'blouse'
  | 'pose'
  | 'background'
  | 'customization'
  | 'generate';

export interface AdvanceStepDef {
  id: AdvanceSubStep;
  stepNumber: number;
  title: string;
}

export const ADVANCE_STEPS: AdvanceStepDef[] = [
  { id: 'model', stepNumber: 1, title: 'Select AI Model' },
  { id: 'feature', stepNumber: 2, title: 'Select Feature' },
  { id: 'upload', stepNumber: 3, title: 'Upload Garment' },
  { id: 'drape', stepNumber: 4, title: 'Drape Style' },
  { id: 'blouse', stepNumber: 5, title: 'Blouse Customization' },
  { id: 'pose', stepNumber: 6, title: 'Category & Pose' },
  { id: 'background', stepNumber: 7, title: 'Background' },
  { id: 'customization', stepNumber: 8, title: 'Logo & Additional Prompt' },
  { id: 'generate', stepNumber: 9, title: 'Generate Image' },
];

export interface DrapeStyleItem {
  id: string;
  name: string;
  image: string;
}

export interface BlouseCustomizationItem {
  id: string;
  name: string;
  image: string;
}

export interface PoseOptionItem {
  id: string;
  name: string;
  image: string;
  category: 'standing' | 'sitting';
}

export interface BackgroundOptionItem {
  id: string;
  name: string;
  image: string;
  type: 'auto' | 'state' | 'festival';
}

export const DRAPE_STYLES: DrapeStyleItem[] = [
  {
    id: 'nivi_modern',
    name: 'Nivi Modern',
    image: '/src/assets/images/drape_nivi_modern_1790918945323.jpg',
  },
  {
    id: 'marathi',
    name: 'Marathi',
    image: '/src/assets/images/drape_marathi_1790918963516.jpg',
  },
];

export const BLOUSE_CUSTOMIZATIONS: BlouseCustomizationItem[] = [
  {
    id: 'none_as_image',
    name: 'None (As Per Image)',
    image: '/src/assets/images/blouse_none_default_1790919369987.jpg',
  },
  {
    id: 'no_border',
    name: 'No Border',
    image: '/src/assets/images/blouse_no_border_1790919388107.jpg',
  },
  {
    id: 'thin_border',
    name: 'Thin Border',
    image: '/src/assets/images/blouse_thin_border_1790919400980.jpg',
  },
];

export const STANDING_POSES: PoseOptionItem[] = [
  {
    id: 'front',
    name: 'Front',
    category: 'standing',
    image: '/src/assets/images/drape_nivi_modern_1790918945323.jpg',
  },
  {
    id: 'front_pallu_view',
    name: 'Front Pallu View',
    category: 'standing',
    image: '/src/assets/images/generated_result_saree_1790829363169.jpg',
  },
  {
    id: 'left',
    name: 'Left',
    category: 'standing',
    image: '/src/assets/images/gender_female_model_1790827554092.jpg',
  },
  {
    id: 'right',
    name: 'Right',
    category: 'standing',
    image: '/src/assets/images/cat_lehenga_1790846836833.jpg',
  },
  {
    id: 'back',
    name: 'Back',
    category: 'standing',
    image: '/src/assets/images/pose_standing_back_1790920418296.jpg',
  },
  {
    id: 'ramp_walk',
    name: 'Ramp Walk',
    category: 'standing',
    image: '/src/assets/images/drape_marathi_1790918963516.jpg',
  },
  {
    id: 'dynamic_pose',
    name: 'Dynamic Pose',
    category: 'standing',
    image: '/src/assets/images/cat_garba_dress_1790846849526.jpg',
  },
  {
    id: 'close_up',
    name: 'Close-Up',
    category: 'standing',
    image: '/src/assets/images/blouse_thin_border_1790919400980.jpg',
  },
  {
    id: 'arms_extended',
    name: 'Arms Extended',
    category: 'standing',
    image: '/src/assets/images/cat_dupatta_1790846862404.jpg',
  },
  {
    id: '45_turned_back',
    name: '45° Turned-Back',
    category: 'standing',
    image: '/src/assets/images/generated_result_female_1790827541105.jpg',
  },
  {
    id: 'triview',
    name: 'Triview',
    category: 'standing',
    image: '/src/assets/images/cat_product_1790846917177.jpg',
  },
];

export const SITTING_POSES: PoseOptionItem[] = [
  {
    id: 'sitting_front',
    name: 'Front',
    category: 'sitting',
    image: '/src/assets/images/pose_sitting_front_1790920385183.jpg',
  },
  {
    id: 'sitting_left',
    name: 'Left',
    category: 'sitting',
    image: '/src/assets/images/pose_sitting_side_1790920400636.jpg',
  },
  {
    id: 'sitting_right',
    name: 'Right',
    category: 'sitting',
    image: '/src/assets/images/pose_sitting_side_1790920400636.jpg',
  },
  {
    id: 'sitting_back',
    name: 'Back',
    category: 'sitting',
    image: '/src/assets/images/pose_standing_back_1790920418296.jpg',
  },
  {
    id: 'sitting_triview',
    name: 'Triview',
    category: 'sitting',
    image: '/src/assets/images/pose_sitting_front_1790920385183.jpg',
  },
];

export const STATE_BACKGROUNDS: BackgroundOptionItem[] = [
  {
    id: 'uttar_pradesh',
    name: 'Uttar Pradesh',
    type: 'state',
    image: '/src/assets/images/cat_kurta_1790846872629.jpg',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    type: 'state',
    image: '/src/assets/images/bg_rajasthan_palace_1790921631531.jpg',
  },
  {
    id: 'delhi',
    name: 'Delhi',
    type: 'state',
    image: '/src/assets/images/cat_product_1790846917177.jpg',
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    type: 'state',
    image: '/src/assets/images/cat_garba_dress_1790846849526.jpg',
  },
  {
    id: 'madhya_pradesh',
    name: 'Madhya Pradesh',
    type: 'state',
    image: '/src/assets/images/cat_jewellery_1790846933207.jpg',
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    type: 'state',
    image: '/src/assets/images/drape_marathi_1790918963516.jpg',
  },
  {
    id: 'tamil_nadu',
    name: 'Tamil Nadu',
    type: 'state',
    image: '/src/assets/images/drape_nivi_modern_1790918945323.jpg',
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    type: 'state',
    image: '/src/assets/images/cat_lehenga_1790846836833.jpg',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    type: 'state',
    image: '/src/assets/images/bg_kerala_scenic_1790921682560.jpg',
  },
  {
    id: 'west_bengal',
    name: 'West Bengal',
    type: 'state',
    image: '/src/assets/images/generated_result_saree_1790829363169.jpg',
  },
  {
    id: 'odisha',
    name: 'Odisha',
    type: 'state',
    image: '/src/assets/images/cat_dupatta_1790846862404.jpg',
  },
  {
    id: 'assam',
    name: 'Assam',
    type: 'state',
    image: '/src/assets/images/cat_bedsheet_1790846885150.jpg',
  },
];

export const FESTIVAL_BACKGROUNDS: BackgroundOptionItem[] = [
  {
    id: 'diwali',
    name: 'Diwali',
    type: 'festival',
    image: '/src/assets/images/bg_diwali_festival_1790921651783.jpg',
  },
  {
    id: 'navratri',
    name: 'Navratri',
    type: 'festival',
    image: '/src/assets/images/cat_garba_dress_1790846849526.jpg',
  },
  {
    id: 'pongal',
    name: 'Pongal',
    type: 'festival',
    image: '/src/assets/images/drape_nivi_modern_1790918945323.jpg',
  },
  {
    id: 'onam',
    name: 'Onam',
    type: 'festival',
    image: '/src/assets/images/bg_kerala_scenic_1790921682560.jpg',
  },
  {
    id: 'haldi_ceremony',
    name: 'Haldi Ceremony',
    type: 'festival',
    image: '/src/assets/images/bg_haldi_ceremony_1790921667666.jpg',
  },
  {
    id: 'wedding',
    name: 'Wedding',
    type: 'festival',
    image: '/src/assets/images/bg_rajasthan_palace_1790921631531.jpg',
  },
];

export const AUTO_BACKGROUNDS: BackgroundOptionItem[] = [
  {
    id: 'studio_softbox',
    name: 'Studio Softbox',
    type: 'auto',
    image: '/src/assets/images/drape_nivi_modern_1790918945323.jpg',
  },
  {
    id: 'heritage_palace',
    name: 'Heritage Palace',
    type: 'auto',
    image: '/src/assets/images/bg_rajasthan_palace_1790921631531.jpg',
  },
  {
    id: 'festive_glow',
    name: 'Festive Glow',
    type: 'auto',
    image: '/src/assets/images/bg_diwali_festival_1790921651783.jpg',
  },
  {
    id: 'minimalist_neutral',
    name: 'Minimalist Studio',
    type: 'auto',
    image: '/src/assets/images/cat_eyewear_1790846903069.jpg',
  },
];

export const AdvanceModelSelectionPage: React.FC<AdvanceModelSelectionPageProps> = ({
  selectedCategory,
  onBackToResult,
  onApplyModelAndGenerate,
}) => {
  // Step tracker inside Advance Mode
  const [advanceSubStep, setAdvanceSubStep] = useState<AdvanceSubStep>('model');
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Upload Garment mode: 'separate' | 'full'
  const [outfitMode, setOutfitMode] = useState<'separate' | 'full'>('separate');

  // Selected drape style & blouse customization
  const [selectedDrapeId, setSelectedDrapeId] = useState<string>('nivi_modern');
  const [selectedBlouseId, setSelectedBlouseId] = useState<string>('none_as_image');

  // Category & Pose selection
  const [poseCategory, setPoseCategory] = useState<'standing' | 'sitting'>('standing');
  const [selectedPoseId, setSelectedPoseId] = useState<string>('front');

  // Background selection: 'auto' | 'upload' | 'state' | 'festival'
  const [bgTab, setBgTab] = useState<'auto' | 'upload' | 'state' | 'festival'>('auto');
  const [selectedBgId, setSelectedBgId] = useState<string>('rajasthan');
  const [customBgImage, setCustomBgImage] = useState<string>('');

  // Logo upload & Additional prompt states
  const [uploadedLogos, setUploadedLogos] = useState<string[]>([]);
  const [selectedLogoIndex, setSelectedLogoIndex] = useState<number>(0);
  const [additionalPrompt, setAdditionalPrompt] = useState<string>('');

  // Step 9 Generate Image States
  const [genTier, setGenTier] = useState<'basic' | 'pro'>('pro');
  const [isAge18, setIsAge18] = useState<boolean>(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(true);
  const [isEnhance2x, setIsEnhance2x] = useState<boolean>(false);

  // Multi-part uploaded images state - starts fresh in Advance Mode so user uploads a new image
  const [partImages, setPartImages] = useState<Record<string, string>>({});

  // Initial gender default based on category
  const getInitialGender = (): AdvanceGender => {
    if (selectedCategory === 'kids_wear') return 'children';
    if (
      selectedCategory === 'western_male' ||
      selectedCategory === 'sherwani' ||
      selectedCategory === 'kurta' ||
      selectedCategory === 'suits'
    ) {
      return 'male';
    }
    return 'female';
  };

  const [selectedGender, setSelectedGender] = useState<AdvanceGender>(getInitialGender());
  const filteredModels = ADVANCE_MODELS.filter((m) => m.gender === selectedGender);

  // Default selected model to the first one in the category
  const [selectedModelId, setSelectedModelId] = useState<string>(
    filteredModels[0]?.id || ADVANCE_MODELS[0].id
  );

  // Available features for chosen gender
  const availableFeatures = GENDER_FEATURES[selectedGender] || GENDER_FEATURES.female;
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(
    availableFeatures[0]?.id || 'saree'
  );

  // Update selected model & feature when gender tab changes
  const handleGenderChange = (gender: AdvanceGender) => {
    setSelectedGender(gender);
    const newFiltered = ADVANCE_MODELS.filter((m) => m.gender === gender);
    if (newFiltered.length > 0) {
      setSelectedModelId(newFiltered[0].id);
    }
    const newFeatures = GENDER_FEATURES[gender] || GENDER_FEATURES.female;
    if (newFeatures.length > 0) {
      setSelectedFeatureId(newFeatures[0].id);
    }
  };

  const selectedModel =
    ADVANCE_MODELS.find((m) => m.id === selectedModelId) || filteredModels[0] || ADVANCE_MODELS[0];

  const selectedFeature =
    availableFeatures.find((f) => f.id === selectedFeatureId) || availableFeatures[0];

  // Helper to handle local file upload for parts
  const handleFileUpload = (partKey: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPartImages((prev) => ({
          ...prev,
          [partKey]: e.target!.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper to handle custom background image upload
  const handleBgUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setCustomBgImage(e.target!.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Helper to handle logo upload
  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedLogos((prev) => [...prev, e.target!.result as string]);
        setSelectedLogoIndex(uploadedLogos.length);
      }
    };
    reader.readAsDataURL(file);
  };

  // Garment Part Slots based on feature
  const getGarmentSlots = () => {
    if (outfitMode === 'full') {
      return [
        {
          key: 'full',
          label: `${selectedFeature.label || 'Full Outfit'}*`,
          optional: false,
        },
      ];
    }

    switch (selectedFeature.id) {
      case 'saree':
        return [
          { key: 'primary', label: 'Saree*', optional: false },
          { key: 'pallu', label: 'Pallu (Optional)', optional: true },
          { key: 'blouse', label: 'Blouse (Optional)', optional: true },
        ];
      case 'lehenga':
        return [
          { key: 'primary', label: 'Lehenga*', optional: false },
          { key: 'dupatta', label: 'Dupatta (Optional)', optional: true },
          { key: 'blouse', label: 'Choli / Blouse (Optional)', optional: true },
        ];
      case 'garba_dress':
        return [
          { key: 'primary', label: 'Chaniya (Skirt)*', optional: false },
          { key: 'dupatta', label: 'Dupatta (Optional)', optional: true },
          { key: 'blouse', label: 'Choli (Optional)', optional: true },
        ];
      case 'bridal':
        return [
          { key: 'primary', label: 'Bridal Outfit*', optional: false },
          { key: 'dupatta', label: 'Veil / Dupatta (Optional)', optional: true },
          { key: 'blouse', label: 'Blouse / Jewellery (Optional)', optional: true },
        ];
      case 'western':
      case 'western_male':
        return [
          { key: 'primary', label: 'Top / Shirt*', optional: false },
          { key: 'bottom', label: 'Pants / Bottom (Optional)', optional: true },
          { key: 'jacket', label: 'Jacket / Layer (Optional)', optional: true },
        ];
      case 'dupatta':
        return [
          { key: 'primary', label: 'Dupatta*', optional: false },
          { key: 'kurti', label: 'Kurti / Base (Optional)', optional: true },
          { key: 'bottom', label: 'Pants / Salwar (Optional)', optional: true },
        ];
      case 'kurta':
      case 'sherwani':
      case 'suits':
        return [
          { key: 'primary', label: `${selectedFeature.label}*`, optional: false },
          { key: 'bottom', label: 'Pajama / Bottom (Optional)', optional: true },
          { key: 'stole', label: 'Stole / Dupatta (Optional)', optional: true },
        ];
      default:
        return [
          { key: 'primary', label: `${selectedFeature.label}*`, optional: false },
          { key: 'pallu', label: 'Pallu / Layer (Optional)', optional: true },
          { key: 'blouse', label: 'Blouse / Inner (Optional)', optional: true },
        ];
    }
  };

  const slots = getGarmentSlots();

  const handleGenerateFinal = (quality: 'standard' | 'hd' | '4k' = 'standard') => {
    const chosenDrape = DRAPE_STYLES.find((d) => d.id === selectedDrapeId);
    const chosenBlouse = BLOUSE_CUSTOMIZATIONS.find((b) => b.id === selectedBlouseId);
    const currentPoseList = poseCategory === 'standing' ? STANDING_POSES : SITTING_POSES;
    const chosenPose = currentPoseList.find((p) => p.id === selectedPoseId) || currentPoseList[0];

    let backgroundName = 'Studio Ambient';
    if (bgTab === 'state') {
      const stateItem = STATE_BACKGROUNDS.find((s) => s.id === selectedBgId);
      if (stateItem) backgroundName = stateItem.name;
    } else if (bgTab === 'festival') {
      const festItem = FESTIVAL_BACKGROUNDS.find((f) => f.id === selectedBgId);
      if (festItem) backgroundName = festItem.name;
    } else if (bgTab === 'upload') {
      backgroundName = 'Custom Uploaded Background';
    } else {
      const autoItem = AUTO_BACKGROUNDS.find((a) => a.id === selectedBgId);
      if (autoItem) backgroundName = autoItem.name;
    }

    const chosenLogo = uploadedLogos.length > 0 ? uploadedLogos[selectedLogoIndex] : undefined;

    onApplyModelAndGenerate(
      selectedModel,
      {
        ...selectedFeature,
        image:
          poseCategory === 'sitting'
            ? '/src/assets/images/pose_sitting_front_1790920385183.jpg'
            : selectedDrapeId === 'marathi'
            ? '/src/assets/images/drape_marathi_1790918963516.jpg'
            : selectedDrapeId === 'nivi_modern'
            ? '/src/assets/images/drape_nivi_modern_1790918945323.jpg'
            : selectedFeature.image,
      },
      {
        background: backgroundName,
        pose: `${poseCategory} - ${chosenPose.name}`,
        lighting: 'Studio Softbox',
        aspectRatio: '3:4 Portrait',
        customPrompt: `Draped in ${chosenDrape?.name || 'Nivi Modern'} style, blouse style: ${
          chosenBlouse?.name || 'Standard'
        }, pose: ${chosenPose.name} (${poseCategory}), background: ${backgroundName}${
          additionalPrompt.trim() ? `. Custom details: ${additionalPrompt.trim()}` : ''
        }`,
        drapeStyle: chosenDrape?.name,
        blouseStyle: chosenBlouse?.name,
        poseCategory: poseCategory,
        logoImage: chosenLogo,
        additionalPrompt: additionalPrompt.trim(),
        quality: quality,
        enhance2x: isEnhance2x,
      }
    );
  };

  const currentPoses = poseCategory === 'standing' ? STANDING_POSES : SITTING_POSES;
  const isCustomizationFilled = uploadedLogos.length > 0 || additionalPrompt.trim().length > 0;

  // Selected background image resolution for preview strip
  const getSelectedBgImage = () => {
    if (bgTab === 'state') {
      return STATE_BACKGROUNDS.find((s) => s.id === selectedBgId)?.image || STATE_BACKGROUNDS[0].image;
    }
    if (bgTab === 'festival') {
      return FESTIVAL_BACKGROUNDS.find((f) => f.id === selectedBgId)?.image || FESTIVAL_BACKGROUNDS[0].image;
    }
    if (bgTab === 'upload') {
      return customBgImage || AUTO_BACKGROUNDS[0].image;
    }
    return AUTO_BACKGROUNDS.find((a) => a.id === selectedBgId)?.image || AUTO_BACKGROUNDS[0].image;
  };

  // Summary of all selections with 'Outfit' label in 1 horizontal row
  const selectedSummaryItems = [
    {
      tag: 'Model',
      title: selectedModel.name,
      image: selectedModel.image,
    },
    {
      tag: 'Feature',
      title: selectedFeature.label,
      image: selectedFeature.image,
    },
    {
      tag: 'Outfit',
      title: 'Outfit',
      image:
        partImages.primary ||
        partImages.full ||
        Object.values(partImages)[0] ||
        selectedFeature.image,
    },
    {
      tag: 'Drape',
      title: DRAPE_STYLES.find((d) => d.id === selectedDrapeId)?.name || 'Nivi Modern',
      image:
        DRAPE_STYLES.find((d) => d.id === selectedDrapeId)?.image || DRAPE_STYLES[0].image,
    },
    {
      tag: 'Blouse',
      title:
        BLOUSE_CUSTOMIZATIONS.find((b) => b.id === selectedBlouseId)?.name || 'Standard',
      image:
        BLOUSE_CUSTOMIZATIONS.find((b) => b.id === selectedBlouseId)?.image ||
        BLOUSE_CUSTOMIZATIONS[0].image,
    },
    {
      tag: 'Pose',
      title: currentPoses.find((p) => p.id === selectedPoseId)?.name || 'Pose',
      image: currentPoses.find((p) => p.id === selectedPoseId)?.image || currentPoses[0].image,
    },
    {
      tag: 'Background',
      title: 'Background',
      image: getSelectedBgImage(),
    },
    ...(uploadedLogos.length > 0
      ? [
          {
            tag: 'Logo',
            title: 'Logo',
            image: uploadedLogos[selectedLogoIndex],
          },
        ]
      : []),
  ];

  // Current step definition for unified top title
  const currentStepDef =
    ADVANCE_STEPS.find((s) => s.id === advanceSubStep) || ADVANCE_STEPS[0];

  // Mock / persisted history list
  const historyList = [
    {
      id: 'hist-1',
      image: '/src/assets/images/generated_result_saree_1790829363169.jpg',
      categoryLabel: 'Saree',
      modelName: 'Ananya • Studio Softbox',
      timestamp: 'Just now',
    },
    {
      id: 'hist-2',
      image: '/src/assets/images/generated_female_jacket_1790828045755.jpg',
      categoryLabel: 'Western Female',
      modelName: 'Tara • Modern Loft',
      timestamp: '2 hours ago',
    },
    {
      id: 'hist-3',
      image: '/src/assets/images/cat_garba_dress_1790846849526.jpg',
      categoryLabel: 'Garba Dress',
      modelName: 'Meera • Navratri Festive',
      timestamp: 'Yesterday',
    },
  ];

  return (
    <div
      className={`flex flex-col w-full max-w-4xl mx-auto px-3 sm:px-6 pt-1 ${
        advanceSubStep === 'generate' ? 'pb-4' : 'pb-20 sm:pb-24'
      } animate-in fade-in duration-300`}
    >
      {/* UNIFIED TOP STEP PROGRESS & TITLE HEADER - Exact Same Fixed Position for All Pages */}
      <div className="w-full flex flex-col items-center justify-center shrink-0 mb-3 pt-1">
        {/* Premium Centered Mode Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/90 text-[11px] sm:text-xs font-bold tracking-wide shadow-2xs mb-2 select-none">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>Advance Mode</span>
        </div>

        {/* Numbered Step Progress Circles (1 to 9) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 select-none">
          {ADVANCE_STEPS.map((s) => {
            const currentIdx = ADVANCE_STEPS.findIndex((x) => x.id === advanceSubStep);
            const stepIdx = ADVANCE_STEPS.findIndex((x) => x.id === s.id);
            const isCurrent = s.id === advanceSubStep;
            const isCompleted = stepIdx < currentIdx;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (isCompleted || isCurrent) {
                    setAdvanceSubStep(s.id);
                  }
                }}
                disabled={!isCompleted && !isCurrent}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold transition-all duration-200 ${
                  isCurrent
                    ? 'bg-orange-500 text-white ring-3 ring-orange-100 shadow-sm shadow-orange-500/25 scale-105'
                    : isCompleted
                    ? 'bg-orange-500 text-white cursor-pointer hover:bg-orange-600'
                    : 'bg-neutral-100 text-neutral-400 cursor-default'
                }`}
                title={`Step ${s.stepNumber}: ${s.title}`}
              >
                {s.stepNumber}
              </button>
            );
          })}
        </div>

        {/* Unified Page Title at identical top position for ALL pages */}
        <div className="relative mt-2 flex items-center justify-center w-full min-h-[32px]">
          <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-neutral-900 text-center">
            {currentStepDef.title}
          </h1>

          {/* Guidelines button for Feature selection */}
          {advanceSubStep === 'feature' && (
            <button
              type="button"
              onClick={() => setShowGuidelines(true)}
              className="absolute right-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">GUIDELINES</span>
            </button>
          )}

          {/* History button for Generate page */}
          {advanceSubStep === 'generate' && (
            <button
              type="button"
              onClick={() => setShowHistoryModal(true)}
              className="absolute right-0 inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold text-xs transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Step 1: Model Selection Page */}
      {advanceSubStep === 'model' && (
        <div className="flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center p-1 bg-white rounded-full border border-neutral-200/90 shadow-xs">
              <button
                type="button"
                onClick={() => handleGenderChange('female')}
                className={`px-4 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedGender === 'female'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-neutral-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                Female
              </button>

              <button
                type="button"
                onClick={() => handleGenderChange('male')}
                className={`px-4 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedGender === 'male'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-neutral-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                Male
              </button>

              <button
                type="button"
                onClick={() => handleGenderChange('children')}
                className={`px-4 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  selectedGender === 'children'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                    : 'text-neutral-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                Children
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4">
            {filteredModels.map((model) => {
              const isSelected = model.id === selectedModelId;
              return (
                <div
                  key={model.id}
                  onClick={() => setSelectedModelId(model.id)}
                  className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 border-2 transition-all duration-200 cursor-pointer aspect-[3/4] active:scale-[0.97] ${
                    isSelected
                      ? 'border-orange-500 ring-2 ring-orange-500/25 shadow-md shadow-orange-500/15 scale-[1.01]'
                      : 'border-neutral-200/80 hover:border-neutral-300 hover:shadow-xs'
                  }`}
                >
                  <img
                    src={model.image}
                    alt="AI Model"
                    className={`w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 ${
                      isSelected ? 'brightness-100' : 'brightness-95 hover:brightness-100'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-1.5 right-1.5 pointer-events-none">
                    <div
                      className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-orange-500 text-white shadow-md ring-1 ring-white scale-100'
                          : 'bg-black/30 border border-white/60 text-transparent opacity-0 group-hover:opacity-100 scale-90'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={onBackToResult}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Cancel</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvanceSubStep('feature')}
                className="flex-1 h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Step 2: Feature Selection Page - 1 Row 4 Images Horizontally */}
      {advanceSubStep === 'feature' && (
        <div className="flex flex-col animate-in fade-in duration-200">
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 w-full">
            {availableFeatures.map((feature) => {
              const isSelected = feature.id === selectedFeatureId;
              return (
                <div
                  key={feature.id}
                  onClick={() => setSelectedFeatureId(feature.id)}
                  className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border-2 transition-all duration-200 cursor-pointer text-left flex flex-col active:scale-[0.97] ${
                    isSelected
                      ? 'border-orange-500 ring-2 ring-orange-500/25 shadow-md shadow-orange-500/15 scale-[1.01]'
                      : 'border-neutral-200 hover:border-neutral-300 shadow-2xs'
                  }`}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={feature.image}
                      alt={feature.label}
                      className={`w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105 ${
                        isSelected ? 'scale-102 brightness-100' : 'brightness-95 hover:brightness-100'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute top-1.5 right-1.5">
                      <div
                        className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-orange-500 text-white shadow-md ring-1 ring-white scale-100'
                            : 'bg-black/30 border border-white/60 text-transparent opacity-0 group-hover:opacity-100 scale-90'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`py-1.5 px-1 sm:px-2 text-center transition-colors ${
                      isSelected
                        ? 'bg-orange-500 text-white font-extrabold text-[11px] sm:text-xs'
                        : 'bg-white text-neutral-800 font-bold text-[11px] sm:text-xs group-hover:text-orange-600'
                    }`}
                  >
                    <span className="truncate block">{feature.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdvanceSubStep('model')}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvanceSubStep('upload')}
                className="flex-1 h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Step 3: Upload Garment Page - Compact No-Scroll Layout */}
      {advanceSubStep === 'upload' && (
        <div className="flex flex-col animate-in fade-in duration-200">
          {/* Toggle pill */}
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center p-1 bg-neutral-100 rounded-full border border-neutral-200/90 shadow-2xs">
              <button
                type="button"
                onClick={() => setOutfitMode('separate')}
                className={`px-4 sm:px-5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  outfitMode === 'separate'
                    ? 'bg-slate-200 text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Separate Parts
              </button>

              <button
                type="button"
                onClick={() => setOutfitMode('full')}
                className={`px-4 sm:px-5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  outfitMode === 'full'
                    ? 'bg-slate-200 text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Full Outfit
              </button>
            </div>
          </div>

          {/* Compact Upload Slots Grid (3 columns on both mobile & desktop) */}
          <div className={`grid ${slots.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' : slots.length === 2 ? 'grid-cols-2 max-w-md mx-auto' : 'grid-cols-3'} gap-2 sm:gap-3 mb-4 w-full`}>
            {slots.map((slot) => {
              const hasUploaded = !!partImages[slot.key];
              const fileInputRef = React.createRef<HTMLInputElement>();

              return (
                <div
                  key={slot.key}
                  className="rounded-xl sm:rounded-2xl border border-neutral-200/80 bg-slate-50/50 p-2 sm:p-3 transition-all flex flex-col justify-center"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(slot.key, file);
                    }}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full min-h-[115px] sm:min-h-[135px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2.5 cursor-pointer transition-all ${
                      hasUploaded
                        ? 'border-orange-400 bg-orange-50/20'
                        : 'border-slate-300 hover:border-orange-400 hover:bg-orange-50/20'
                    }`}
                  >
                    {hasUploaded ? (
                      <div className="relative flex flex-col items-center justify-center w-full">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-neutral-200 shadow-xs mb-1.5 bg-white">
                          <img
                            src={partImages[slot.key]}
                            alt={slot.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-orange-600 font-bold text-xs sm:text-sm text-center truncate w-full">
                          {slot.label}
                        </h4>
                        <span className="text-[10px] text-neutral-400 mt-0.5">
                          Tap to replace
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400 mb-1.5 stroke-[1.8]" />
                        <h4 className="text-orange-600 font-bold text-xs sm:text-sm text-center truncate w-full">
                          {slot.label}
                        </h4>
                        <p className="text-[10px] text-neutral-500 mt-0.5 text-center font-medium">
                          Upload image
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdvanceSubStep('feature')}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvanceSubStep('drape')}
                className="flex-1 h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Step 4: Drape Style Page - Small & Compact Cards Centered */}
      {advanceSubStep === 'drape' && (
        <div className="flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-fit mb-4">
              {DRAPE_STYLES.map((drape) => {
                const isSelected = drape.id === selectedDrapeId;
                return (
                  <div
                    key={drape.id}
                    onClick={() => setSelectedDrapeId(drape.id)}
                    className={`group relative w-28 sm:w-32 rounded-2xl overflow-hidden bg-white transition-all duration-200 cursor-pointer flex flex-col active:scale-[0.97] ${
                      isSelected
                        ? 'border-2 border-[#ea580c] shadow-lg shadow-orange-500/15'
                        : 'border border-neutral-200/90 hover:border-neutral-300 shadow-xs'
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={drape.image}
                        alt={drape.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                          <div className="w-4.5 h-4.5 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="py-1.5 px-1.5 bg-slate-100/90 text-center border-t border-neutral-100">
                      <span
                        className={`text-[11px] sm:text-xs font-bold block truncate ${
                          isSelected ? 'text-neutral-900 font-extrabold' : 'text-neutral-700'
                        }`}
                      >
                        {drape.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdvanceSubStep('upload')}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvanceSubStep('blouse')}
                className="flex-1 h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Step 5: Blouse Customization Page - 3 Cards in 1 Single Horizontal Row Centered */}
      {advanceSubStep === 'blouse' && (
        <div className="flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-fit mb-4">
              {BLOUSE_CUSTOMIZATIONS.map((blouse) => {
                const isSelected = blouse.id === selectedBlouseId;
                return (
                  <div
                    key={blouse.id}
                    onClick={() => setSelectedBlouseId(blouse.id)}
                    className={`group relative w-24 sm:w-32 rounded-2xl overflow-hidden bg-white transition-all duration-200 cursor-pointer flex flex-col active:scale-[0.97] ${
                      isSelected
                        ? 'border-2 border-[#ea580c] shadow-lg shadow-orange-500/15'
                        : 'border border-neutral-200/90 hover:border-neutral-300 shadow-xs'
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
                      <img
                        src={blouse.image}
                        alt={blouse.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                          <div className="w-4.5 h-4.5 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="py-1.5 px-1 bg-slate-100/90 text-center border-t border-neutral-100">
                      <span
                        className={`text-[10px] sm:text-xs font-bold block truncate ${
                          isSelected ? 'text-neutral-900 font-extrabold' : 'text-neutral-700'
                        }`}
                      >
                        {blouse.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdvanceSubStep('drape')}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAdvanceSubStep('pose');
                  setSelectedPoseId(STANDING_POSES[0].id);
                }}
                className="flex-1 h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Step 6: Category & Pose Page - Compact No-Scroll Grid (6 cols on desktop, 4 cols on mobile) */}
      {advanceSubStep === 'pose' && (
        <div className="flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-center items-center gap-2 mb-3">
            <span className="text-xs font-bold text-neutral-700">
              Category:
            </span>
            <div className="inline-flex items-center p-1 bg-neutral-100 rounded-full border border-neutral-200/90 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setPoseCategory('standing');
                  setSelectedPoseId(STANDING_POSES[0].id);
                }}
                className={`px-3.5 sm:px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  poseCategory === 'standing'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                Standing
              </button>

              <button
                type="button"
                onClick={() => {
                  setPoseCategory('sitting');
                  setSelectedPoseId(SITTING_POSES[0].id);
                }}
                className={`px-3.5 sm:px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  poseCategory === 'sitting'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                Sitting
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2.5 mb-4 text-left">
            {currentPoses.map((pose) => {
              const isSelected = pose.id === selectedPoseId;
              return (
                <div
                  key={pose.id}
                  onClick={() => setSelectedPoseId(pose.id)}
                  className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white transition-all duration-200 cursor-pointer flex flex-col active:scale-[0.97] ${
                    isSelected
                      ? 'border-2 border-[#ea580c] shadow-md shadow-orange-500/15'
                      : 'border border-neutral-200/90 hover:border-neutral-300 shadow-2xs'
                  }`}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                    <img
                      src={pose.image}
                      alt={pose.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5">
                        <div className="w-4 h-4 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="py-1 px-1 bg-slate-100/90 text-center border-t border-neutral-100">
                    <span
                      className={`text-[10px] sm:text-[11px] font-bold block truncate ${
                        isSelected ? 'text-neutral-900 font-extrabold' : 'text-neutral-700'
                      }`}
                    >
                      {pose.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdvanceSubStep('blouse')}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvanceSubStep('background')}
                className="flex-1 h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Step 7: 4. Background Page */}
      {advanceSubStep === 'background' && (
        <div className="flex flex-col animate-in fade-in duration-200">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center p-1 bg-neutral-100/90 rounded-full border border-neutral-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setBgTab('auto')}
                className={`px-3.5 sm:px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  bgTab === 'auto'
                    ? 'bg-[#ea580c] text-white shadow-xs'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                Auto
              </button>

              <button
                type="button"
                onClick={() => setBgTab('upload')}
                className={`px-3.5 sm:px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  bgTab === 'upload'
                    ? 'bg-[#ea580c] text-white shadow-xs'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                Upload
              </button>

              <button
                type="button"
                onClick={() => setBgTab('state')}
                className={`px-3.5 sm:px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  bgTab === 'state'
                    ? 'bg-[#ea580c] text-white shadow-xs'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                State
              </button>

              <button
                type="button"
                onClick={() => setBgTab('festival')}
                className={`px-3.5 sm:px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  bgTab === 'festival'
                    ? 'bg-[#ea580c] text-white shadow-xs'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                Festival
              </button>
            </div>
          </div>

          {/* Tab 1: Auto Presets */}
          {bgTab === 'auto' && (
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 text-left">
              {AUTO_BACKGROUNDS.map((bg) => {
                const isSelected = bg.id === selectedBgId;
                return (
                  <div
                    key={bg.id}
                    onClick={() => setSelectedBgId(bg.id)}
                    className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white transition-all duration-200 cursor-pointer flex flex-col active:scale-[0.97] ${
                      isSelected
                        ? 'border-2 border-[#ea580c] shadow-md shadow-orange-500/15'
                        : 'border border-neutral-200/90 hover:border-neutral-300 shadow-2xs'
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={bg.image}
                        alt={bg.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5">
                          <div className="w-4.5 h-4.5 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="py-1 px-1 sm:px-2 bg-slate-100/90 text-center border-t border-neutral-100">
                      <span
                        className={`text-[11px] sm:text-xs font-bold block truncate ${
                          isSelected ? 'text-neutral-900 font-extrabold' : 'text-neutral-700'
                        }`}
                      >
                        {bg.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Upload Option */}
          {bgTab === 'upload' && (
            <div className="mb-4 text-left">
              {(() => {
                const bgInputRef = React.createRef<HTMLInputElement>();
                return (
                  <div className="rounded-2xl border border-neutral-200/80 bg-slate-50/50 p-3 sm:p-5">
                    <input
                      type="file"
                      ref={bgInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleBgUpload(file);
                      }}
                    />

                    <div
                      onClick={() => bgInputRef.current?.click()}
                      className={`w-full min-h-[160px] sm:min-h-[190px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-4 cursor-pointer transition-all ${
                        customBgImage
                          ? 'border-orange-500 bg-orange-50/20'
                          : 'border-slate-300 hover:border-orange-400 hover:bg-orange-50/20'
                      }`}
                    >
                      {customBgImage ? (
                        <div className="relative flex flex-col items-center justify-center w-full">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-neutral-200 shadow-md mb-2 bg-white">
                            <img
                              src={customBgImage}
                              alt="Custom Background"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-orange-600 font-bold text-xs sm:text-sm text-center">
                            Custom Background Uploaded
                          </h4>
                          <span className="text-[11px] text-neutral-400 mt-0.5">
                            Click to replace background
                          </span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-7 h-7 text-neutral-400 mb-1.5 stroke-[1.8]" />
                          <h4 className="text-orange-600 font-bold text-sm sm:text-base text-center">
                            Upload Custom Background
                          </h4>
                          <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 text-center font-medium">
                            Click to browse scenic photo, studio setup, or interior
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Tab 3: State Option */}
          {bgTab === 'state' && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5 mb-4 text-left">
              {STATE_BACKGROUNDS.map((state) => {
                const isSelected = state.id === selectedBgId;
                return (
                  <div
                    key={state.id}
                    onClick={() => setSelectedBgId(state.id)}
                    className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white transition-all duration-200 cursor-pointer flex flex-col active:scale-[0.97] ${
                      isSelected
                        ? 'border-2 border-[#ea580c] shadow-md shadow-orange-500/15'
                        : 'border border-neutral-200/90 hover:border-neutral-300 shadow-2xs'
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={state.image}
                        alt={state.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5">
                          <div className="w-4.5 h-4.5 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="py-1 px-1 bg-slate-100/90 text-center border-t border-neutral-100">
                      <span
                        className={`text-[10px] sm:text-[11px] font-bold block truncate ${
                          isSelected ? 'text-neutral-900 font-extrabold' : 'text-neutral-700'
                        }`}
                      >
                        {state.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 4: Festival Option */}
          {bgTab === 'festival' && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5 mb-4 text-left">
              {FESTIVAL_BACKGROUNDS.map((fest) => {
                const isSelected = fest.id === selectedBgId;
                return (
                  <div
                    key={fest.id}
                    onClick={() => setSelectedBgId(fest.id)}
                    className={`group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white transition-all duration-200 cursor-pointer flex flex-col active:scale-[0.97] ${
                      isSelected
                        ? 'border-2 border-[#ea580c] shadow-md shadow-orange-500/15'
                        : 'border border-neutral-200/90 hover:border-neutral-300 shadow-2xs'
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={fest.image}
                        alt={fest.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5">
                          <div className="w-4.5 h-4.5 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="py-1 px-1 bg-slate-100/90 text-center border-t border-neutral-100">
                      <span
                        className={`text-[10px] sm:text-[11px] font-bold block truncate ${
                          isSelected ? 'text-neutral-900 font-extrabold' : 'text-neutral-700'
                        }`}
                      >
                        {fest.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdvanceSubStep('pose')}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvanceSubStep('customization')}
                className="flex-1 h-12 sm:h-13 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Step 8: Logo & Additional Prompt Page */}
      {advanceSubStep === 'customization' && (
        <div className="flex flex-col animate-in fade-in duration-200 text-left space-y-3">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-3.5 sm:p-5 shadow-2xs">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="text-xs sm:text-sm font-bold text-neutral-900">
                Brand Logo (Optional)
              </h2>

              {(() => {
                const logoInputRef = React.createRef<HTMLInputElement>();
                return (
                  <div>
                    <input
                      type="file"
                      ref={logoInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleLogoUpload(file);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-[#c2410c] text-[#c2410c] hover:bg-orange-50/60 font-bold text-xs transition-all cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Upload</span>
                    </button>
                  </div>
                );
              })()}
            </div>

            {uploadedLogos.length > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {uploadedLogos.map((logo, idx) => {
                  const isSelected = idx === selectedLogoIndex;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedLogoIndex(idx)}
                      className={`relative aspect-square rounded-xl p-1.5 bg-neutral-50 border-2 cursor-pointer transition-all flex items-center justify-center ${
                        isSelected
                          ? 'border-orange-500 ring-2 ring-orange-500/20'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <img src={logo} alt="Brand Logo" className="max-h-full max-w-full object-contain" />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedLogos((prev) => prev.filter((_, i) => i !== idx));
                          if (selectedLogoIndex >= idx && selectedLogoIndex > 0) {
                            setSelectedLogoIndex(selectedLogoIndex - 1);
                          }
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-3 text-center text-xs text-neutral-400 font-medium">
                Uploaded logos will appear here
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/90 p-3.5 sm:p-5 shadow-2xs">
            <h2 className="text-xs sm:text-sm font-bold text-neutral-900 mb-2">
              Additional Prompt (Optional)
            </h2>

            <div className="relative">
              <textarea
                value={additionalPrompt}
                onChange={(e) => setAdditionalPrompt(e.target.value)}
                rows={2}
                placeholder="E.g., 'Add sunglasses, luxury jewelry, handbag'..."
                className="w-full rounded-xl border border-neutral-200/90 p-3 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 resize-none transition-all"
              />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 sm:p-4 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-[4px]">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAdvanceSubStep('background')}
                className="h-12 sm:h-13 px-5 rounded-2xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setAdvanceSubStep('generate')}
                className="h-12 sm:h-13 px-6 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] cursor-pointer"
              >
                Skip
              </button>

              <button
                type="button"
                disabled={!isCustomizationFilled}
                onClick={() => setAdvanceSubStep('generate')}
                className={`flex-1 h-12 sm:h-13 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  isCustomizationFilled
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 active:scale-[0.98] cursor-pointer'
                    : 'bg-neutral-200/90 text-neutral-400 cursor-not-allowed pointer-events-none select-none'
                }`}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Step 9: 7. Generate Image Page */}
      {advanceSubStep === 'generate' && (
        <div className="flex flex-col animate-in fade-in duration-200 text-left max-w-lg mx-auto w-full space-y-2 sm:space-y-2.5">
          {/* Small Title Above Summary */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] sm:text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Your uploads and selections
            </span>
          </div>

          {/* 4 Images per Row (Horizontally 4-Column Grid, Larger & Clearer) */}
          <div className="rounded-2xl border border-neutral-200/90 bg-slate-50/80 p-2.5 sm:p-3 shadow-2xs">
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full">
              {selectedSummaryItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center"
                >
                  <div className="w-full aspect-[3/4] max-h-[85px] sm:max-h-[100px] rounded-xl overflow-hidden bg-white border border-neutral-200/90 shadow-xs">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-neutral-800 truncate w-full mt-1 text-center">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Basic / Pro Pill Switch - Horizontally Centered */}
          <div className="flex justify-center pt-0.5">
            <div className="inline-flex items-center p-1 bg-neutral-100 rounded-full border border-neutral-200/90 shadow-2xs">
              <button
                type="button"
                onClick={() => setGenTier('basic')}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  genTier === 'basic'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                Basic
              </button>

              <button
                type="button"
                onClick={() => setGenTier('pro')}
                className={`px-4 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  genTier === 'pro'
                    ? 'bg-[#d97706] text-white shadow-xs'
                    : 'text-neutral-700 hover:text-orange-600'
                }`}
              >
                Pro
              </button>
            </div>
          </div>

          {/* Checkboxes: 1st (Age) and 2nd (Terms & Privacy) */}
          <div className="space-y-1.5 text-xs text-neutral-800">
            <label className="flex items-center gap-2 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={isAge18}
                onChange={(e) => setIsAge18(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-neutral-300 text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
              />
              <span className="font-medium">
                I am 18 years of age or older
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-neutral-300 text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
              />
              <span className="font-medium">
                I agree to DressDemo{' '}
                <span className="text-orange-600 font-semibold hover:underline">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-orange-600 font-semibold hover:underline">
                  Privacy Policy
                </span>
              </span>
            </label>
          </div>

          {/* Warning Banner - Clean & Sleek */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl py-2 px-3 flex items-center gap-2 text-red-600 text-xs font-semibold">
            <div className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 text-[10px] font-black">
              !
            </div>
            <span>Insufficient balance. Please recharge to generate.</span>
          </div>

          {/* Enhance 2X Option - Directly Above Generate Buttons */}
          <div className="flex items-center justify-between px-0.5">
            <label className="flex items-center gap-2 cursor-pointer group select-none text-xs text-neutral-800">
              <input
                type="checkbox"
                checked={isEnhance2x}
                onChange={(e) => setIsEnhance2x(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-neutral-300 text-orange-600 focus:ring-orange-500 accent-orange-600 cursor-pointer"
              />
              <span className="font-medium text-neutral-900">
                Enhance image by 2X
              </span>
            </label>
          </div>

          {/* 3 Generation Buttons in 1 Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-0.5">
            {/* Button 1: Standard */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleGenerateFinal('standard')}
                className="w-full h-11 rounded-xl bg-[#d97706]/90 hover:bg-[#d97706] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md shadow-amber-600/15 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-white stroke-white shrink-0" />
                <span className="truncate">Generate</span>
              </button>
              <span className="text-[10px] text-neutral-500 font-medium mt-1">
                Uses 1 credit
              </span>
            </div>

            {/* Button 2: HD */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleGenerateFinal('hd')}
                className="w-full h-11 rounded-xl bg-[#d97706]/90 hover:bg-[#d97706] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md shadow-amber-600/15 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-white stroke-white shrink-0" />
                <span className="truncate">Generate (HD)</span>
              </button>
              <span className="text-[10px] text-neutral-500 font-medium mt-1">
                Uses 1.5 credits
              </span>
            </div>

            {/* Button 3: 4K */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleGenerateFinal('4k')}
                className="w-full h-11 rounded-xl bg-[#d97706]/90 hover:bg-[#d97706] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md shadow-amber-600/15 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-white stroke-white shrink-0" />
                <span className="truncate">Generate (4K)</span>
              </button>
              <span className="text-[10px] text-neutral-500 font-medium mt-1">
                Uses 3 credits
              </span>
            </div>
          </div>

          {/* Clean Bottom Navigation Bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setAdvanceSubStep('customization')}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-orange-50 text-neutral-800 hover:text-orange-600 font-bold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <p className="text-[11px] text-neutral-400 font-medium text-right">
              DressDemo AI can make mistakes
            </p>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl p-5 sm:p-6 shadow-2xl border border-neutral-200 text-left animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                  <History className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-neutral-900">
                    Generation History
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-medium">
                    Your previously generated photoshoots
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 pr-1 divide-y divide-neutral-100 flex-1">
              {historyList.map((item) => (
                <div
                  key={item.id}
                  className="pt-3 first:pt-0 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-14 h-18 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0 shadow-xs">
                      <img
                        src={item.image}
                        alt={item.categoryLabel}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 font-bold text-[10px] uppercase tracking-wider">
                        {item.categoryLabel}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate mt-1">
                        {item.modelName}
                      </h4>
                      <span className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5 font-medium">
                        <Clock className="w-3 h-3" />
                        {item.timestamp}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={item.image}
                      download={`DressDemo-${item.categoryLabel}.jpg`}
                      className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-orange-500 hover:text-white text-neutral-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowHistoryModal(false)}
              className="w-full h-12 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm mt-4 transition-colors cursor-pointer shrink-0"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Guidelines Modal */}
      {showGuidelines && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-neutral-200 text-left animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 stroke-[2.5]" />
                </div>
                <h3 className="text-base font-extrabold text-neutral-900">
                  Feature Guidelines
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuidelines(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-neutral-600">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <Camera className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Clear Garment Photo</strong>
                  <span>Upload high-resolution, unwrinkled apparel on a neutral or solid background for the cleanest fit.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <Sun className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Optimal Lighting</strong>
                  <span>Ensure even, diffused daylight or studio lighting to capture accurate colors, textures, and prints.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-bold">Accurate Drape & Sizing</strong>
                  <span>Select the matching feature category (Saree, Lehenga, Dupatta, etc.) so the AI can drape the fabric naturally.</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuidelines(false)}
              className="w-full h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm mt-5 shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
