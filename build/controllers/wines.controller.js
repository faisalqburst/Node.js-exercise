"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wine_service_1 = __importDefault(require("../services/wine.service"));
const util_1 = require("../utils/util");
class WineController {
    constructor() {
        this.wineService = new wine_service_1.default();
        this.index = async (req, res, next) => {
            try {
                const { grapes, minPrice, maxPrice, minRating, minNoRatings, maxNoRatings, wineStyles, foodPairings, countryCodes, regions, wineTypes, orderBy, order, } = req.query;
                const winesList = await this.wineService.getWinesData({
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
                res.status(200).send(JSON.stringify(winesList));
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = WineController;
//# sourceMappingURL=wines.controller.js.map