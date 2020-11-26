"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wines_controller_1 = __importDefault(require("../controllers/wines.controller"));
const wines_dto_1 = require("../dtos/wines.dto");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
class WinesRoute {
    constructor() {
        this.path = '/wines';
        this.router = express_1.Router();
        this.winesController = new wines_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, validation_middleware_1.default(wines_dto_1.GetWinesDto, 'query', true), this.winesController.index);
    }
}
exports.default = WinesRoute;
//# sourceMappingURL=wines.route.js.map