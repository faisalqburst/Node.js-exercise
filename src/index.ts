import { paramToString } from './utils/util';
import WineService from './services/wine.service';

const args = process.argv;
const wineName = args[2];
const minRating = args[3];
const maxRating = args[4];
const minPrice = args[5];
const maxPrice = args[6];

(async () => {
  const winesList = await new WineService().getWinesData(
    paramToString(wineName),
    parseFloat(paramToString(minRating)),
    parseFloat(paramToString(maxRating)),
    parseFloat(paramToString(minPrice)),
    parseFloat(paramToString(maxPrice)),
  );

  console.log(winesList);
})();
