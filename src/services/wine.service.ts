import { WineParams } from '../interfaces/params.interface';
import ScrapData from '../utils/scrap_data';

class WineService {
  public getWinesData = async (wineParams: WineParams) => {
    if (!wineParams.grapes) {
      return 'Please enter the grape name';
    }
    const wines = await new ScrapData().getWinesDataFromVivino(wineParams);

    wineParams.minNoRatings = isNaN(wineParams.minNoRatings) ? 0 : wineParams.minNoRatings;
    wineParams.maxNoRatings = isNaN(wineParams.maxNoRatings) ? Number.POSITIVE_INFINITY : wineParams.maxNoRatings;

    return wines.filter(wine => {
      return wine.numberOfRatings >= wineParams.minNoRatings && wine.numberOfRatings <= wineParams.maxNoRatings;
    });
  };
}

export default WineService;
