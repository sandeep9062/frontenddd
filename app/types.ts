export interface ProductImage {
  url: string;
  public_id?: string;
}

export interface Product {
  _id: string;
  name: string;
  brand?: string;
  category: string;
  description?: string;
  composition?: string;
  dosage?: string;
  prescriptionRequired?: boolean;
  price: number;
  discountPrice?: number;
  stockCount: number;
  expiryDate?: string;
  manufacturingDate?: string;
  manufacturer?: string;
  storageConditions?: string;
  weight?: number;
  images: ProductImage[];
  tags?: string[];
  rating?: number;
  numReviews?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
