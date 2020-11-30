"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mock_puppeteer_1 = require("./mocks/mock.puppeteer");
const wine_service_1 = __importDefault(require("../services/wine.service"));
const wines_1 = require("./data/wines/wines");
jest.mock('puppeteer', () => ({
    launch() {
        return mock_puppeteer_1.stubBrowser;
    },
}));
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(''), 500));
});
describe('Testing Wines Service', () => {
    it('should recieve grapes as parameter', async () => {
        const res = await new wine_service_1.default().getWinesData({
            grapes: null,
        });
        expect(res).toBe('Please enter the grape name');
    });
    it('should filter data with minNoRatings and maxNoRatings if those params are given', async () => {
        const wines = new wine_service_1.default().filterWinesAccordingToNumberOfRatings(wines_1.WINES, {
            minNoRatings: 10,
            maxNoRatings: 100,
            grapes: 'malbec',
        });
        const check = wines.filter(w => w.numberOfRatings < 10 && w.numberOfRatings > 100);
        expect(check.length).toBe(0);
    });
});
//# sourceMappingURL=wines.service.test.js.map