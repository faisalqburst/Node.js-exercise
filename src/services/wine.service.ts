import ScrapData from '../utils/scrap_data';

class WineService {
  public getWinesData = async (
    name: string,
    minRating: number,
    maxRating: number,
    minPrice: number,
    maxPrice: number,
    minNoRatings: number,
    maxNoRatings: number,
  ) => {
    const wines = await new ScrapData().getWinesDataFromVivino(name);
    minRating = isNaN(minRating) ? 0 : minRating;
    maxRating = isNaN(maxRating) ? Number.POSITIVE_INFINITY : maxRating;
    minPrice = isNaN(minPrice) ? 0 : minPrice;
    maxPrice = isNaN(maxPrice) ? Number.POSITIVE_INFINITY : maxPrice;
    minNoRatings = isNaN(minNoRatings) ? 0 : minNoRatings;
    maxNoRatings = isNaN(maxNoRatings) ? Number.POSITIVE_INFINITY : maxNoRatings;

    return wines.filter(wine => {
      return (
        wine.averagePrice >= minPrice &&
        wine.averagePrice <= maxPrice &&
        wine.averageRating >= minRating &&
        wine.averageRating <= maxRating &&
        wine.numberOfRatings >= minNoRatings &&
        wine.numberOfRatings <= maxNoRatings
      );
    });
  };
}

export default WineService;
