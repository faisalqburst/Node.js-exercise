"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const users_dto_1 = require("../dtos/users.dto");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
class AuthRoute {
    constructor() {
        this.router = express_1.Router();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/signup`, validation_middleware_1.default(users_dto_1.CreateUserDto, 'body'), this.authController.signUp);
        this.router.post(`/login`, validation_middleware_1.default(users_dto_1.CreateUserDto, 'body'), this.authController.logIn);
        this.router.post(`/logout`, auth_middleware_1.default, this.authController.logOut);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map