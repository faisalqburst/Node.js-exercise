"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const const_1 = require("../const/const");
const regions_1 = require("../const/regions");
const wine_types_1 = require("../const/wine_types");
const explore_api_params_enum_1 = require("../enums/explore_api_params.enum");
class ScrapData {
    constructor() {
        this.grapes = [];
        this.wineStyles = [];
        this.appendParam = (param, queryKey, list = []) => {
            if (!param) {
                return '';
            }
            let queryString = '';
            const paramNames = param.split(',');
            paramNames.forEach(name => {
                if (list.length == 0) {
                    queryString += `&${queryKey}=${name}`;
                }
                else {
                    const obj = list.find((g) => g.name.toUpperCase().indexOf(name.toUpperCase()) > -1);
                    if (obj) {
                        queryString += `&${queryKey}=${obj.id}`;
                    }
                }
            });
            return queryString;
        };
        this.getVivinoSearchUrl = (pageIndex, wineParams) => {
            wineParams.minPrice = isNaN(wineParams.minPrice) ? 0 : wineParams.minPrice;
            wineParams.maxPrice = isNaN(wineParams.maxPrice) ? 99999999 : wineParams.maxPrice;
            wineParams.minRating = isNaN(wineParams.minRating) ? 1 : wineParams.minRating;
            wineParams.orderBy = !wineParams.orderBy ? 'ratings_average' : wineParams.orderBy;
            let url = `${const_1.VIVINO_EXPLORE_API}?${explore_api_params_enum_1.EXPLORE_API_PARAMS.country_code}=US&${explore_api_params_enum_1.EXPLORE_API_PARAMS.currency_code}=USD&${explore_api_params_enum_1.EXPLORE_API_PARAMS.grape_filter}=varietal`;
            url += `&${explore_api_params_enum_1.EXPLORE_API_PARAMS.order_by}=${wineParams.orderBy}&${explore_api_params_enum_1.EXPLORE_API_PARAMS.order}=desc&${explore_api_params_enum_1.EXPLORE_API_PARAMS.page}=${pageIndex}`;
            url += this.appendParam(wineParams.grapes, explore_api_params_enum_1.EXPLORE_API_PARAMS.grape_ids, this.grapes);
            url += this.appendParam(wineParams.wineStyles, explore_api_params_enum_1.EXPLORE_API_PARAMS.wine_style_ids, this.wineStyles);
            url += this.appendParam(wineParams.foodPairings, explore_api_params_enum_1.EXPLORE_API_PARAMS.food_ids, this.foods);
            url += `&${explore_api_params_enum_1.EXPLORE_API_PARAMS.min_rating}=${wineParams.minRating}`;
            url += `&${explore_api_params_enum_1.EXPLORE_API_PARAMS.price_range_min}=${wineParams.minPrice}`;
            url += `&${explore_api_params_enum_1.EXPLORE_API_PARAMS.price_range_max}=${wineParams.maxPrice}`;
            if (wineParams.countryCodes) {
                url += this.appendParam(wineParams.countryCodes, explore_api_params_enum_1.EXPLORE_API_PARAMS.country_codes);
            }
            if (wineParams.regions) {
                url += this.appendParam(wineParams.regions, explore_api_params_enum_1.EXPLORE_API_PARAMS.region_ids, regions_1.REGIONS);
            }
            if (wineParams.wineTypes) {
                url += this.appendParam(wineParams.wineTypes, explore_api_params_enum_1.EXPLORE_API_PARAMS.wine_type_ids, wine_types_1.WINE_TYPES);
            }
            return url;
        };
        this.getGrapes = async (page) => {
            const grapesResponse = await page.evaluate(async (apiUrl) => {
                const cacheKey = localStorage.getItem('local_cache_key') + window['vivinoCacheKey'];
                return fetch(`${apiUrl}?cache_key=${cacheKey}`).then((res) => {
                    return res.text().then((r) => JSON.parse(r));
                });
            }, const_1.VIVINO_GRAPES_API);
            return grapesResponse === null || grapesResponse === void 0 ? void 0 : grapesResponse.grapes;
        };
        this.isGrapeIsValid = (grapes) => {
            const grapesQuery = this.appendParam(grapes, explore_api_params_enum_1.EXPLORE_API_PARAMS.grape_ids, this.grapes);
            if (grapesQuery.indexOf(explore_api_params_enum_1.EXPLORE_API_PARAMS.grape_ids) > -1) {
                return true;
            }
            return false;
        };
        this.getWineStyles = async (page) => {
            const wineStylesResponse = await page.evaluate(async (apiUrl) => {
                const cacheKey = localStorage.getItem('local_cache_key') + window['vivinoCacheKey'];
                return fetch(`${apiUrl}?cache_key=${cacheKey}`).then((res) => {
                    return res.text().then((r) => JSON.parse(r));
                });
            }, const_1.VIVINO_WINE_STYLES_API);
            return wineStylesResponse === null || wineStylesResponse === void 0 ? void 0 : wineStylesResponse.wine_styles;
        };
        this.getFoods = async (page) => {
            const wineStylesResponse = await page.evaluate(async (apiUrl) => {
                const cacheKey = localStorage.getItem('local_cache_key') + window['vivinoCacheKey'];
                return fetch(`${apiUrl}?cache_key=${cacheKey}`).then((res) => {
                    return res.text().then((r) => JSON.parse(r));
                });
            }, const_1.VIVINO_FOODS_API);
            return wineStylesResponse === null || wineStylesResponse === void 0 ? void 0 : wineStylesResponse.foods;
        };
        this.getAllWineListResponse = async (page, wineParams) => {
            const winesList = [];
            const firstPageResponse = await this.getWinesListResponsePerPage(page, 1, wineParams);
            const totalRecords = firstPageResponse === null || firstPageResponse === void 0 ? void 0 : firstPageResponse.records_matched;
            winesList.push(...this.mapWinesToWineObjects(firstPageResponse === null || firstPageResponse === void 0 ? void 0 : firstPageResponse.matches));
            const totalPagesToFetch = Math.ceil(totalRecords / const_1.WINES_PER_PAGE);
            console.log('total records', totalRecords);
            console.log('total pages to fetch', totalPagesToFetch);
            for (let pageIndex = 2; pageIndex <= totalPagesToFetch; pageIndex++) {
                const response = await this.getWinesListResponsePerPage(page, pageIndex, wineParams);
                winesList.push(...this.mapWinesToWineObjects(response === null || response === void 0 ? void 0 : response.matches));
            }
            return winesList;
        };
        this.getWinesListResponsePerPage = async (page, pageIndex, wineParams) => {
            const url = this.getVivinoSearchUrl(pageIndex, wineParams);
            const grapesResponse = await page.evaluate(async (url) => {
                return fetch(url).then((res) => {
                    return res.text().then((r) => JSON.parse(r));
                });
            }, url);
            return grapesResponse === null || grapesResponse === void 0 ? void 0 : grapesResponse.explore_vintage;
        };
        this.getWinesDataFromVivino = async (wineParams) => {
            try {
                const browser = await puppeteer_1.default.launch({ headless: false, timeout: 100000000 });
                const page = await browser.newPage();
                // setting user agent because puppeteer fails when setting headerless true
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                // disable loading images in the browser to speed up execution
                await page.setRequestInterception(true);
                page.on('request', request => {
                    if (request.resourceType() === 'image')
                        request.abort();
                    else
                        request.continue();
                });
                await page.goto(`${const_1.VIVINO_SEARCH_URL}`);
                await page.waitForSelector('.simpleLabel__selectedKey--11QuD');
                await page.click('.simpleLabel__selectedKey--11QuD');
                await page.click('.shipToDropdown__list--1_3yJ li:last-child a');
                await page.waitForNavigation({ waitUntil: 'networkidle0' });
                this.grapes = await this.getGrapes(page);
                if (!this.isGrapeIsValid(wineParams.grapes)) {
                    await browser.close();
                    throw 'Grape is invalid';
                }
                this.wineStyles = await this.getWineStyles(page);
                this.foods = await this.getFoods(page);
                const winesListResponse = await this.getAllWineListResponse(page, wineParams);
                await browser.close();
                return winesListResponse;
            }
            catch (err) {
                console.log(err);
                return [];
            }
        };
    }
    mapWinesToWineObjects(response = []) {
        return response.map((wine) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
            return {
                title: (_a = wine === null || wine === void 0 ? void 0 : wine.vintage) === null || _a === void 0 ? void 0 : _a.name,
                vintage: (_b = wine === null || wine === void 0 ? void 0 : wine.vintage) === null || _b === void 0 ? void 0 : _b.year,
                averagePrice: (_c = wine === null || wine === void 0 ? void 0 : wine.price) === null || _c === void 0 ? void 0 : _c.amount,
                currency: (_e = (_d = wine === null || wine === void 0 ? void 0 : wine.price) === null || _d === void 0 ? void 0 : _d.currency) === null || _e === void 0 ? void 0 : _e.code,
                averageRating: (_g = (_f = wine === null || wine === void 0 ? void 0 : wine.vintage) === null || _f === void 0 ? void 0 : _f.statistics) === null || _g === void 0 ? void 0 : _g.ratings_average,
                numberOfRatings: (_j = (_h = wine === null || wine === void 0 ? void 0 : wine.vintage) === null || _h === void 0 ? void 0 : _h.statistics) === null || _j === void 0 ? void 0 : _j.ratings_count,
                imageUrl: (_l = (_k = wine === null || wine === void 0 ? void 0 : wine.vintage) === null || _k === void 0 ? void 0 : _k.image) === null || _l === void 0 ? void 0 : _l.location,
                region: (_p = (_o = (_m = wine === null || wine === void 0 ? void 0 : wine.vintage) === null || _m === void 0 ? void 0 : _m.wine) === null || _o === void 0 ? void 0 : _o.region) === null || _p === void 0 ? void 0 : _p.name,
                country: (_t = (_s = (_r = (_q = wine === null || wine === void 0 ? void 0 : wine.vintage) === null || _q === void 0 ? void 0 : _q.wine) === null || _r === void 0 ? void 0 : _r.region) === null || _s === void 0 ? void 0 : _s.country) === null || _t === void 0 ? void 0 : _t.name,
                bottleVolume: (_v = (_u = wine === null || wine === void 0 ? void 0 : wine.price) === null || _u === void 0 ? void 0 : _u.bottle_type) === null || _v === void 0 ? void 0 : _v.volume_ml,
                discountPercent: (_w = wine === null || wine === void 0 ? void 0 : wine.price) === null || _w === void 0 ? void 0 : _w.discount_percent,
            };
        });
    }
}
exports.default = ScrapData;
//# sourceMappingURL=scrap_data.js.map