export interface Wine {
  title: string;
  vintage: number | string;
  region: string;
  country: string;
  averageRating: number;
  numberOfRatings: number;
  averagePrice: number;
  currency: string;
  imageUrl: string;
  bottleVolume: number;
  discountPercent: number;
}

export interface CommonParams {
  id: number;
  name: string;
}
export interface Grape extends CommonParams {}

export interface WineStyle extends CommonParams {}

export interface Food extends CommonParams {}

export interface Region extends CommonParams {}

export interface WineType extends CommonParams {}
