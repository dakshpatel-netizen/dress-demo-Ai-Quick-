export type CategoryId =
  | 'saree'
  | 'lehenga'
  | 'dress'
  | 'garba_dress'
  | 'dupatta'
  | 'western_female'
  | 'western_male'
  | 'sherwani'
  | 'kurta'
  | 'suits'
  | 'kids_wear'
  | 'bedsheet'
  | 'eyewear'
  | 'product'
  | 'jewellery';

export interface CategoryOption {
  id: CategoryId;
  label: string;
  image: string;
}

export interface SampleGarment {
  id: string;
  name: string;
  image: string;
  categoryId?: CategoryId;
}

export type AdvanceGender = 'female' | 'male' | 'children';

export interface AdvanceModel {
  id: string;
  name: string;
  gender: AdvanceGender;
  image: string;
  tag: string;
  styleDescription: string;
}

export type AdvanceStudioCategory =
  | 'garment'
  | 'jewellery'
  | 'bedsheet'
  | 'eyewear'
  | 'collage'
  | 'remove_bg'
  | 'custom_gen'
  | 'customer_video'
  | 'models'
  | 'history';

export type WizardStep = 1 | 2 | 3;
export type WizardStatus = 'wizard' | 'generating' | 'result' | 'advance_mode';
