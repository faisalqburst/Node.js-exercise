"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const const_1 = require("../const/const");
class ScrapData {
    constructor() {
        this.getWinesDataFromVivino = async (name) => {
            try {
                const browser = await puppeteer_1.default.launch({ headless: true });
                const page = await browser.newPage();
                // setting user agent because pupeteer fails when setting headerless true
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
                // disable loading images in the browser to speed up execution
                await page.setRequestInterception(true);
                page.on('request', request => {
                    if (request.resourceType() === 'image')
                        request.abort();
                    else
                        request.continue();
                });
                await page.goto(`${const_1.VIVINO_SEARCH_URL}?q=${name ? name : '*'}`, { waitUntil: 'load', timeout: 0 });
                await page.waitForSelector('div.search-page__container');
                const list = await page.evaluate(() => {
                    const wineCards = Array.from(document.querySelectorAll(`div.search-page__container .card`));
                    return wineCards.map(wine => {
                        const titleElement = wine.querySelector('.wine-card__name');
                        const countrySectionElement = wine.querySelectorAll('.wine-card__region a');
                        const averageContainers = wine.querySelectorAll('.average__container');
                        const averageNumberElement = averageContainers[0].querySelector('.average__number');
                        const averagePriceSecttion = averageContainers[1].querySelector('.wine-price');
                        const averagePriceElement = averagePriceSecttion.querySelector('.wine-price-value');
                        const pricePrefixElement = averagePriceSecttion.querySelector('.wine-price-prefix');
                        const numberOfRatingsElement = wine.querySelector('.average__stars .text-micro');
                        return {
                            title: titleElement.innerText,
                            region: countrySectionElement[0].innerText,
                            country: countrySectionElement[1].innerText,
                            averageRating: parseFloat(averageNumberElement.innerText),
                            numberOfRatings: parseInt(numberOfRatingsElement.innerText),
                            averagePrice: parseFloat(averagePriceElement.innerText.replace(/[^0-9.-]+/g, '')),
                            pricePrefix: pricePrefixElement.innerText,
                        };
                    });
                });
                await browser.close();
                return list;
            }
            catch (err) {
                console.log(err);
                return [];
            }
        };
    }
}
exports.default = ScrapData;
//# sourceMappingURL=scrap_data.js.map