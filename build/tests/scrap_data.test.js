"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mock_puppeteer_1 = require("./mocks/mock.puppeteer");
const scrap_data_1 = __importDefault(require("../utils/scrap_data"));
const wineExploreApiResponse_1 = require("./data/wines/wineExploreApiResponse");
jest.mock('puppeteer', () => ({
    launch() {
        return mock_puppeteer_1.stubBrowser;
    },
}));
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(''), 500));
});
describe('Testing DataScrap class methods', () => {
    it('should generate url for searching', async () => {
        const url = getSearchUrl(1, 'malbec', null);
        expect(url).toBe('https://www.vivino.com/api/explore/explore?country_code=US&currency_code=USD&grape_filter=varietal&order_by=ratings_average&order=desc&page=1&grape_ids[]=1&min_rating=1&price_range_min=10&price_range_max=40');
        const url2 = getSearchUrl(2, 'malbec', null);
        expect(url2).toBe('https://www.vivino.com/api/explore/explore?country_code=US&currency_code=USD&grape_filter=varietal&order_by=ratings_average&order=desc&page=2&grape_ids[]=1&min_rating=1&price_range_min=10&price_range_max=40');
    });
    it('should have two grapes params in the url', () => {
        const url = getSearchUrl(1, 'malbec,merlot', 'Argentinian Malbec');
        expect(url).toBe('https://www.vivino.com/api/explore/explore?country_code=US&currency_code=USD&grape_filter=varietal&order_by=ratings_average&order=desc&page=1&grape_ids[]=1&grape_ids[]=2&wine_style_ids[]=1&min_rating=1&price_range_min=10&price_range_max=40');
    });
    it('should have wine types in the url', () => {
        const url = getSearchUrl(1, 'malbec', 'Argentinian Malbec');
        expect(url).toBe('https://www.vivino.com/api/explore/explore?country_code=US&currency_code=USD&grape_filter=varietal&order_by=ratings_average&order=desc&page=1&grape_ids[]=1&wine_style_ids[]=1&min_rating=1&price_range_min=10&price_range_max=40');
    });
    it('should return query string with id when array passed', () => {
        const list = [
            {
                id: 1,
                name: 'Pinot Noir',
            },
            {
                id: 2,
                name: 'Merlot',
            },
        ];
        const res = new scrap_data_1.default().appendParam('Pinot Noir', 'grape_ids[]', list);
        expect(res).toBe('&grape_ids[]=1');
        const res2 = new scrap_data_1.default().appendParam('Pinot Noir,Merlot', 'grape_ids[]', list);
        expect(res2).toBe('&grape_ids[]=1&grape_ids[]=2');
    });
    it('should append param as the passed string', () => {
        const res = new scrap_data_1.default().appendParam('IN', 'country_codes[]');
        expect(res).toBe('&country_codes[]=IN');
        const res2 = new scrap_data_1.default().appendParam('IN,US', 'country_codes[]');
        expect(res2).toBe('&country_codes[]=IN&country_codes[]=US');
    });
    it('should convert the api response to the wine response', () => {
        var _a;
        const res = new scrap_data_1.default().mapWinesToWineObjects((_a = wineExploreApiResponse_1.WINE_EXPLORE_API_RESPONSE === null || wineExploreApiResponse_1.WINE_EXPLORE_API_RESPONSE === void 0 ? void 0 : wineExploreApiResponse_1.WINE_EXPLORE_API_RESPONSE.explore_vintage) === null || _a === void 0 ? void 0 : _a.matches);
        const expectedResult = [
            {
                averagePrice: 35.61,
                averageRating: 4.2,
                bottleVolume: 750,
                country: 'Argentina',
                currency: 'USD',
                discountPercent: null,
                imageUrl: '//images.vivino.com/thumbs/XsKgXfl8SLWLmZ2gUr04_A_pl_480x640.png',
                numberOfRatings: 503,
                region: 'Mendoza',
                title: 'Matías Riccitelli Malbec 2016',
                vintage: 2016,
            },
        ];
        expect(res).toEqual(expectedResult);
    });
});
const getSearchUrl = (page, grape, style) => {
    const scrapData = new scrap_data_1.default();
    scrapData.grapes = [
        {
            id: 1,
            name: 'malbec',
        },
        {
            id: 2,
            name: 'merlot',
        },
    ];
    scrapData.wineStyles = [
        {
            id: 1,
            name: 'Argentinian Malbec',
        },
    ];
    const params = {
        grapes: grape,
        maxPrice: 40,
        minPrice: 10,
        minRating: 1,
        wineStyles: style,
    };
    return scrapData.getVivinoSearchUrl(page, params);
};
//# sourceMappingURL=scrap_data.test.js.map