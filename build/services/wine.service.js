"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrap_data_1 = require("../utils/scrap_data");
class WineService {
    constructor() {
        this.getWinesData = async (name, minRating, maxRating, minPrice, maxPrice) => {
            const wines = await scrap_data_1.getWinesDataFromVivino(name);
            return wines;
        };
    }
}
exports.default = WineService;
//# sourceMappingURL=wine.service.js.map