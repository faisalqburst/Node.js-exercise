import { WineParams } from '../interfaces/params.interface';
import { Wine } from '../interfaces/wine.interface';
import ScrapData from '../utils/scrap_data';

class WineService {
  filterWinesAccordingToNumberOfRatings = (wines: Wine[], wineParams: WineParams) => {
    wineParams.minNoRatings = isNaN(wineParams.minNoRatings) ? 0 : wineParams.minNoRatings;
    wineParams.maxNoRatings = isNaN(wineParams.maxNoRatings) ? Number.POSITIVE_INFINITY : wineParams.maxNoRatings;
    return wines.filter(wine => {
      return wine.numberOfRatings >= wineParams.minNoRatings && wine.numberOfRatings <= wineParams.maxNoRatings;
    });
  };

  public getWinesData = async (wineParams: WineParams) => {
    if (!wineParams.grapes) {
      return 'Please enter the grape name';
    }
    const wines: Wine[] = await new ScrapData().getWinesDataFromVivino(wineParams);
    return this.filterWinesAccordingToNumberOfRatings(wines, wineParams);
  };
}

export default WineService;
