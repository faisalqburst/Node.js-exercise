"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrap_data_1 = __importDefault(require("../utils/scrap_data"));
class WineService {
    constructor() {
        this.getWinesData = async (wineParams) => {
            if (!wineParams.grapes) {
                return 'Please enter the grape name';
            }
            const wines = await new scrap_data_1.default().getWinesDataFromVivino(wineParams);
            wineParams.minNoRatings = isNaN(wineParams.minNoRatings) ? 0 : wineParams.minNoRatings;
            wineParams.maxNoRatings = isNaN(wineParams.maxNoRatings) ? Number.POSITIVE_INFINITY : wineParams.maxNoRatings;
            return wines.filter(wine => {
                return wine.numberOfRatings >= wineParams.minNoRatings && wine.numberOfRatings <= wineParams.maxNoRatings;
            });
        };
    }
}
exports.default = WineService;
//# sourceMappingURL=wine.service.js.map