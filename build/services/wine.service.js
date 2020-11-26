"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrap_data_1 = __importDefault(require("../utils/scrap_data"));
class WineService {
    constructor() {
        this.getWinesData = async (name, minRating, maxRating, minPrice, maxPrice) => {
            const wines = await new scrap_data_1.default().getWinesDataFromVivino(name);
            minRating = isNaN(minRating) ? 0 : minRating;
            maxRating = isNaN(maxRating) ? Number.POSITIVE_INFINITY : maxRating;
            minPrice = isNaN(minPrice) ? 0 : minPrice;
            maxPrice = isNaN(maxPrice) ? Number.POSITIVE_INFINITY : maxPrice;
            return wines.filter(wine => {
                return wine.averagePrice >= minPrice && wine.averagePrice <= maxPrice && wine.averageRating >= minRating && wine.averageRating <= maxRating;
            });
        };
    }
}
exports.default = WineService;
//# sourceMappingURL=wine.service.js.map