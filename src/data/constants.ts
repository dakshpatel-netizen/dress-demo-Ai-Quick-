import { CategoryOption, SampleGarment, CategoryId, AdvanceModel, AdvanceGender } from '../types';

export const CATEGORIES: CategoryOption[] = [
  // Row 1 (5 items)
  {
    id: 'saree',
    label: 'Saree',
    image: '/src/assets/images/generated_result_saree_1790829363169.jpg',
  },
  {
    id: 'lehenga',
    label: 'Lehenga',
    image: '/src/assets/images/cat_lehenga_1790846836833.jpg',
  },
  {
    id: 'dress',
    label: 'Dress',
    image: '/src/assets/images/generated_result_female_1790827541105.jpg',
  },
  {
    id: 'garba_dress',
    label: 'Garba Dress',
    image: '/src/assets/images/cat_garba_dress_1790846849526.jpg',
  },
  {
    id: 'dupatta',
    label: 'Dupatta',
    image: '/src/assets/images/cat_dupatta_1790846862404.jpg',
  },

  // Row 2 (5 items)
  {
    id: 'western_female',
    label: 'Western Female',
    image: '/src/assets/images/gender_female_model_1790827554092.jpg',
  },
  {
    id: 'western_male',
    label: 'Western Male',
    image: '/src/assets/images/generated_male_green_1790828058173.jpg',
  },
  {
    id: 'sherwani',
    label: 'Sherwani',
    image: '/src/assets/images/generated_male_ethnic_1790829382262.jpg',
  },
  {
    id: 'kurta',
    label: 'Kurta',
    image: '/src/assets/images/cat_kurta_1790846872629.jpg',
  },
  {
    id: 'suits',
    label: 'Suits',
    image: '/src/assets/images/gender_male_model_1790827497285.jpg',
  },

  // Row 3 (5 items)
  {
    id: 'kids_wear',
    label: 'Kids Wear',
    image: '/src/assets/images/gender_kids_model_1790827510847.jpg',
  },
  {
    id: 'bedsheet',
    label: 'Bedsheet',
    image: '/src/assets/images/cat_bedsheet_1790846885150.jpg',
  },
  {
    id: 'eyewear',
    label: 'Eyewear',
    image: '/src/assets/images/cat_eyewear_1790846903069.jpg',
  },
  {
    id: 'product',
    label: 'Product',
    image: '/src/assets/images/cat_product_1790846917177.jpg',
  },
  {
    id: 'jewellery',
    label: 'Jewellery',
    image: '/src/assets/images/cat_jewellery_1790846933207.jpg',
  },
];

export const SAMPLE_PRODUCTS: SampleGarment[] = [
  {
    id: 'saree-1',
    name: 'Banarasi Silk Saree',
    image: '/src/assets/images/sample_product_saree_1790829350284.jpg',
    categoryId: 'saree',
  },
  {
    id: 'dress-1',
    name: 'Satin Slip Dress',
    image: '/src/assets/images/sample_product_dress_1790827524274.jpg',
    categoryId: 'dress',
  },
  {
    id: 'jacket-1',
    name: 'Utility Blazer',
    image: '/src/assets/images/sample_product_jacket_1790827598623.jpg',
    categoryId: 'suits',
  },
  {
    id: 'kidswear-1',
    name: 'Striped Sweatshirt',
    image: '/src/assets/images/sample_product_kidswear_1790827608807.jpg',
    categoryId: 'kids_wear',
  },
];

export function getCategoryPhoto(categoryId: CategoryId): string {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.image : CATEGORIES[0].image;
}

export const ADVANCE_MODELS: AdvanceModel[] = [
  // Female Models
  {
    id: 'f-ananya',
    name: 'Ananya',
    gender: 'female',
    image: '/src/assets/images/gender_female_model_1790827554092.jpg',
    tag: 'Trending Ethnic',
    styleDescription: 'Indian Classical • Saree & Festive Specialist',
  },
  {
    id: 'f-priya',
    name: 'Priya',
    gender: 'female',
    image: '/src/assets/images/generated_result_female_1790827541105.jpg',
    tag: 'Editorial',
    styleDescription: 'Western Chic • Runway & High Fashion',
  },
  {
    id: 'f-meera',
    name: 'Meera',
    gender: 'female',
    image: '/src/assets/images/cat_lehenga_1790846836833.jpg',
    tag: 'Royal Bridal',
    styleDescription: 'Bridal Lehenga • Heavy Embroidery & Jewelry',
  },
  {
    id: 'f-zara',
    name: 'Zara',
    gender: 'female',
    image: '/src/assets/images/generated_female_jacket_1790828045755.jpg',
    tag: 'Contemporary',
    styleDescription: 'Blazer & Suits • Modern Fashion Runway',
  },
  {
    id: 'f-diya',
    name: 'Diya',
    gender: 'female',
    image: '/src/assets/images/cat_garba_dress_1790846849526.jpg',
    tag: 'Festive Vibrant',
    styleDescription: 'Garba & Traditional Festive Attire',
  },
  {
    id: 'f-tara',
    name: 'Tara',
    gender: 'female',
    image: '/src/assets/images/cat_dupatta_1790846862404.jpg',
    tag: 'Studio Classic',
    styleDescription: 'Dupatta & Soft Drape Styling',
  },

  // Male Models
  {
    id: 'm-kabir',
    name: 'Kabir',
    gender: 'male',
    image: '/src/assets/images/gender_male_model_1790827497285.jpg',
    tag: 'Executive',
    styleDescription: 'Modern Urban Suit & Smart Casuals',
  },
  {
    id: 'm-ranveer',
    name: 'Ranveer',
    gender: 'male',
    image: '/src/assets/images/generated_male_ethnic_1790829382262.jpg',
    tag: 'Royal Ethnic',
    styleDescription: 'Heritage Sherwani & Wedding Wear',
  },
  {
    id: 'm-aarav',
    name: 'Aarav',
    gender: 'male',
    image: '/src/assets/images/generated_male_green_1790828058173.jpg',
    tag: 'Designer Look',
    styleDescription: 'Contemporary Designer Blazers & Jackets',
  },
  {
    id: 'm-rohan',
    name: 'Rohan',
    gender: 'male',
    image: '/src/assets/images/cat_kurta_1790846872629.jpg',
    tag: 'Traditional',
    styleDescription: 'Classic Silk Kurta & Indian Ethnic Wear',
  },
  {
    id: 'm-vikram',
    name: 'Vikram',
    gender: 'male',
    image: '/src/assets/images/generated_result_male_1790827567303.jpg',
    tag: 'Editorial Model',
    styleDescription: 'High Fashion Male Editorial & Runway',
  },

  // Children Models
  {
    id: 'c-leo',
    name: 'Leo',
    gender: 'children',
    image: '/src/assets/images/gender_kids_model_1790827510847.jpg',
    tag: 'Playful Casual',
    styleDescription: 'Kids Sweatshirts & Everyday Fun Wear',
  },
  {
    id: 'c-aria',
    name: 'Aria',
    gender: 'children',
    image: '/src/assets/images/generated_kids_jacket_1790828070374.jpg',
    tag: 'Urban Junior',
    styleDescription: 'Kids Winter Jackets & Trendy Fashion',
  },
  {
    id: 'c-advik',
    name: 'Advik',
    gender: 'children',
    image: '/src/assets/images/generated_result_kids_1790827581811.jpg',
    tag: 'Festive Junior',
    styleDescription: 'Junior Traditional Kurta & Partywear',
  },
  {
    id: 'c-kavya',
    name: 'Kavya',
    gender: 'children',
    image: '/src/assets/images/sample_product_kidswear_1790827608807.jpg',
    tag: 'Casual Kidswear',
    styleDescription: 'Junior Fashion Studio',
  },
];

export interface FeatureOption {
  id: string;
  label: string;
  image: string;
}

export const GENDER_FEATURES: Record<AdvanceGender, FeatureOption[]> = {
  female: [
    {
      id: 'saree',
      label: 'Saree',
      image: '/src/assets/images/generated_result_saree_1790829363169.jpg',
    },
    {
      id: 'lehenga',
      label: 'Lehenga',
      image: '/src/assets/images/cat_lehenga_1790846836833.jpg',
    },
    {
      id: 'dress',
      label: 'Dress',
      image: '/src/assets/images/generated_result_female_1790827541105.jpg',
    },
    {
      id: 'garba_dress',
      label: 'Garba Dress',
      image: '/src/assets/images/cat_garba_dress_1790846849526.jpg',
    },
    {
      id: 'bridal',
      label: 'Bridal',
      image: '/src/assets/images/cat_jewellery_1790846933207.jpg',
    },
    {
      id: 'western',
      label: 'Western',
      image: '/src/assets/images/gender_female_model_1790827554092.jpg',
    },
    {
      id: 'dupatta',
      label: 'Dupatta',
      image: '/src/assets/images/cat_dupatta_1790846862404.jpg',
    },
  ],
  male: [
    {
      id: 'sherwani',
      label: 'Sherwani',
      image: '/src/assets/images/generated_male_ethnic_1790829382262.jpg',
    },
    {
      id: 'kurta',
      label: 'Kurta',
      image: '/src/assets/images/cat_kurta_1790846872629.jpg',
    },
    {
      id: 'suits',
      label: 'Suits',
      image: '/src/assets/images/gender_male_model_1790827497285.jpg',
    },
    {
      id: 'western_male',
      label: 'Western Male',
      image: '/src/assets/images/generated_male_green_1790828058173.jpg',
    },
  ],
  children: [
    {
      id: 'kids_wear',
      label: 'Kids Wear',
      image: '/src/assets/images/gender_kids_model_1790827510847.jpg',
    },
    {
      id: 'jacket',
      label: 'Winter Jacket',
      image: '/src/assets/images/generated_kids_jacket_1790828070374.jpg',
    },
    {
      id: 'junior_ethnic',
      label: 'Junior Festive',
      image: '/src/assets/images/generated_result_kids_1790827581811.jpg',
    },
    {
      id: 'sweatshirt',
      label: 'Casual Sweatshirt',
      image: '/src/assets/images/sample_product_kidswear_1790827608807.jpg',
    },
  ],
};



