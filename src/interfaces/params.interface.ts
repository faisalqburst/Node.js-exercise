export interface WineParams {
  grapes: string;
  wineStyles: string;
  foodPairings: string;
  minRating: number;
  minPrice: number;
  maxPrice: number;
  minNoRatings?: number;
  maxNoRatings?: number;
  countryCodes: string;
  regions: string;
  wineTypes: string;
  orderBy: string;
  order: string;
}
