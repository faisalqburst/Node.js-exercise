"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wines_controller_1 = __importDefault(require("../controllers/wines.controller"));
class WinesRoute {
    constructor() {
        this.path = '/wines';
        this.router = express_1.Router();
        this.winesController = new wines_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.winesController.index);
    }
}
exports.default = WinesRoute;
//# sourceMappingURL=wines.route.js.map