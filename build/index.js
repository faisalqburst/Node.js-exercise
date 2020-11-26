"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./utils/util");
const wine_service_1 = __importDefault(require("./services/wine.service"));
const args = process.argv;
const wineName = args[2];
const minRating = args[3];
const maxRating = args[4];
const minPrice = args[5];
const maxPrice = args[6];
(async () => {
    const winesList = await new wine_service_1.default().getWinesData(util_1.paramToString(wineName), parseFloat(util_1.paramToString(minRating)), parseFloat(util_1.paramToString(maxRating)), parseFloat(util_1.paramToString(minPrice)), parseFloat(util_1.paramToString(maxPrice)));
    console.log(winesList);
})();
//# sourceMappingURL=index.js.map