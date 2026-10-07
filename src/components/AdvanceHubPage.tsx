import React from 'react';
import {
  Shirt,
  Gem,
  Bed,
  Glasses,
  LayoutGrid,
  Eraser,
  Wand2,
  Video,
  Users,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { AdvanceStudioCategory } from '../types';

interface AdvanceHubPageProps {
  onSelectCategory: (category: AdvanceStudioCategory) => void;
  onBackToResult: () => void;
}

interface HubCategoryItem {
  id: AdvanceStudioCategory;
  title: string;
  icon: React.FC<{ className?: string }>;
  accentColor: string;
  bgColor: string;
}

export const AdvanceHubPage: React.FC<AdvanceHubPageProps> = ({
  onSelectCategory,
}) => {
  const categories: HubCategoryItem[] = [
    {
      id: 'garment',
      title: 'Garment',
      icon: Shirt,
      accentColor: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200/80',
    },
    {
      id: 'jewellery',
      title: 'Jewellery',
      icon: Gem,
      accentColor: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200/80',
    },
    {
      id: 'bedsheet',
      title: 'Bedsheet',
      icon: Bed,
      accentColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200/80',
    },
    {
      id: 'eyewear',
      title: 'Eyewear',
      icon: Glasses,
      accentColor: 'text-sky-600',
      bgColor: 'bg-sky-50 border-sky-200/80',
    },
    {
      id: 'collage',
      title: 'Collage',
      icon: LayoutGrid,
      accentColor: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200/80',
    },
    {
      id: 'remove_bg',
      title: 'Remove BG',
      icon: Eraser,
      accentColor: 'text-rose-600',
      bgColor: 'bg-rose-50 border-rose-200/80',
    },
    {
      id: 'custom_gen',
      title: 'Custom Gen',
      icon: Wand2,
      accentColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-200/80',
    },
    {
      id: 'customer_video',
      title: 'Customer Video',
      icon: Video,
      accentColor: 'text-pink-600',
      bgColor: 'bg-pink-50 border-pink-200/80',
    },
    {
      id: 'models',
      title: 'Models',
      icon: Users,
      accentColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50 border-cyan-200/80',
    },
    {
      id: 'history',
      title: 'History',
      icon: Clock,
      accentColor: 'text-neutral-600',
      bgColor: 'bg-neutral-100 border-neutral-200',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-3 sm:px-6 pt-2 pb-4 animate-in fade-in duration-300 text-left">
      {/* Header Title with Premium Centered Mode Badge */}
      <div className="text-center mb-3 sm:mb-4 flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/90 text-[11px] sm:text-xs font-bold tracking-wide shadow-2xs mb-1.5 select-none">
          <Wand2 className="w-3.5 h-3.5 text-orange-500" />
          <span>Advance Mode</span>
        </div>
        <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-neutral-900">
          Studio Tools
        </h1>
      </div>

      {/* Category Selection Grid - 2 Columns on Mobile / 2-3 Columns on Desktop to fit 100% No Scroll */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2 sm:gap-2.5">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative rounded-xl sm:rounded-2xl border border-neutral-200/90 bg-white p-2.5 sm:p-3 hover:border-orange-500/80 hover:shadow-md hover:shadow-orange-500/10 transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                {/* Icon Container */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${cat.bgColor} ${cat.accentColor} group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-200 shadow-2xs`}
                >
                  <IconComp className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
                </div>

                {/* Heading */}
                <h3 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-orange-600 transition-colors truncate">
                  {cat.title}
                </h3>
              </div>

              {/* Arrow Indicator */}
              <div className="w-6 h-6 rounded-full bg-neutral-50 group-hover:bg-orange-500 text-neutral-400 group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-2xs ml-1">
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
