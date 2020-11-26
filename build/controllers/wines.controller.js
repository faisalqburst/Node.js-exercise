"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wine_service_1 = __importDefault(require("../services/wine.service"));
const util_1 = require("../utils/util");
class WineController {
    constructor() {
        this.winService = new wine_service_1.default();
        this.index = async (req, res, next) => {
            try {
                const { name, minPrice, maxPrice, minRating, maxRating } = req.query;
                const winesList = await this.winService.getWinesData(util_1.paramToString(name), parseFloat(util_1.paramToString(minRating)), parseFloat(util_1.paramToString(maxRating)), parseFloat(util_1.paramToString(minPrice)), parseFloat(util_1.paramToString(maxPrice)));
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