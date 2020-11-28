import { paramToString } from './utils/util';
import minimist from 'minimist';
import WineService from './services/wine.service';

const args = minimist(process.argv.slice(2));
const grapes = args['grapes'];
const wineStyles = args['wineStyles'];
const foodPairings = args['foodPairings'];
const minRating = args['minRating'];
const minPrice = args['minPrice'];
const maxPrice = args['maxPrice'];
const minNoRatings = args['minNoRatings'];
const maxNoRatings = args['maxNoRatings'];
const countryCodes = args['countryCodes'];
const regions = args['regions'];
const wineTypes = args['wineTypes'];
const orderBy = args['orderBy'];
const order = args['order'];

(async () => {
  const winesList = await new WineService().getWinesData({
    grapes: paramToString(grapes),
    minRating: parseFloat(paramToString(minRating)),
    minPrice: parseFloat(paramToString(minPrice)),
    maxPrice: parseFloat(paramToString(maxPrice)),
    minNoRatings: parseFloat(paramToString(minNoRatings)),
    maxNoRatings: parseFloat(paramToString(maxNoRatings)),
    wineStyles: paramToString(wineStyles),
    foodPairings: paramToString(foodPairings),
    countryCodes: paramToString(countryCodes),
    regions: paramToString(regions),
    wineTypes: paramToString(wineTypes),
    orderBy: paramToString(orderBy),
    order: paramToString(order),
  });

  console.log(winesList);
})();
