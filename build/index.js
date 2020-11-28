"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./utils/util");
const minimist_1 = __importDefault(require("minimist"));
const wine_service_1 = __importDefault(require("./services/wine.service"));
const args = minimist_1.default(process.argv.slice(2));
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
    const winesList = await new wine_service_1.default().getWinesData({
        grapes: util_1.paramToString(grapes),
        minRating: parseFloat(util_1.paramToString(minRating)),
        minPrice: parseFloat(util_1.paramToString(minPrice)),
        maxPrice: parseFloat(util_1.paramToString(maxPrice)),
        minNoRatings: parseFloat(util_1.paramToString(minNoRatings)),
        maxNoRatings: parseFloat(util_1.paramToString(maxNoRatings)),
        wineStyles: util_1.paramToString(wineStyles),
        foodPairings: util_1.paramToString(foodPairings),
        countryCodes: util_1.paramToString(countryCodes),
        regions: util_1.paramToString(regions),
        wineTypes: util_1.paramToString(wineTypes),
        orderBy: util_1.paramToString(orderBy),
        order: util_1.paramToString(order),
    });
    console.log(winesList);
})();
//# sourceMappingURL=index.js.map