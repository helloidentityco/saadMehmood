export interface AdminProductActionState {
  success?: boolean;
  error?: string;
  productId?: number;
  slug?: string;
  fieldErrors?: Record<string, string>;
}

export interface UploadImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

export interface ProductFormData {
  name: string;
  collection: string;
  fabricType: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  description: string;
  royalTale?: string;
  texture?: string;
  recommendedUse?: string;
  careInstructions?: string;
  meters?: string;
  isFeatured?: boolean;
  images: string[];
}
