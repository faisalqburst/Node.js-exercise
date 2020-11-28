"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const wines_route_1 = __importDefault(require("../routes/wines.route"));
const mock_puppeteer_1 = require("./mocks/mock.puppeteer");
const wines_1 = require("./data/wines/wines");
const winesRoute = new wines_route_1.default();
jest.mock('puppeteer', () => ({
    launch() {
        return mock_puppeteer_1.stubBrowser;
    },
}));
beforeEach(() => {
    jest.restoreAllMocks();
});
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(''), 500));
});
describe('Testing Wines', () => {
    describe('Testing [GET] /wines', () => {
        it('should return statusCode 200 and all the wines list', async () => {
            const app = new app_1.default([winesRoute]);
            return supertest_1.default(app.getServer())
                .get(`${winesRoute.path}`)
                .expect(200)
                .expect(`${JSON.stringify(wines_1.WINES)}`);
        }, 50000);
        it('should return wines with price higher than or equal to 1000', async () => {
            const app = new app_1.default([winesRoute]);
            return supertest_1.default(app.getServer())
                .get(`${winesRoute.path}?minPrice=1000`)
                .expect(200)
                .expect(`${JSON.stringify(wines_1.WINES_WITH_PRICE)}`);
        }, 50000);
        it('should return wines with price higher than 1000 and rating higher than or equal to 4.4', async () => {
            const app = new app_1.default([winesRoute]);
            return supertest_1.default(app.getServer())
                .get(`${winesRoute.path}?minPrice=1000&minRating=4.4`)
                .expect(200)
                .expect(`${JSON.stringify(wines_1.WINES_WITH_PRICE_AND_MIN_RATING)}`);
        }, 50000);
    });
});
//# sourceMappingURL=wines.test.js.map