"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class AuthService {
    constructor() {
        this.users = users_model_1.default;
    }
    async signup(userData) {
        if (util_1.isEmptyObject(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = this.users.find(user => user.email === userData.email);
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const createUserData = Object.assign(Object.assign({ id: this.users.length + 1 }, userData), { password: hashedPassword });
        return createUserData;
    }
    async login(userData) {
        if (util_1.isEmptyObject(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = this.users.find(user => user.email === userData.email);
        if (!findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} not found`);
        const isPasswordMatching = await bcrypt_1.default.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.default(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser };
    }
    async logout(userData) {
        if (util_1.isEmptyObject(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = this.users.find(user => user.password === userData.password);
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60;
        return { expiresIn, token: jsonwebtoken_1.default.sign(dataStoredInToken, secret, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map