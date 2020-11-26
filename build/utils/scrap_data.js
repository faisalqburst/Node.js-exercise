"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWinesDataFromVivino = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const getWinesDataFromVivino = async (name) => {
    try {
        const browser = await puppeteer_1.default.launch({ headless: false });
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.resourceType() === 'image')
                request.abort();
            else
                request.continue();
        });
        await page.goto('http://vivino.com/search/wines?q=*');
        await page.waitForSelector('div.search-page__container');
        const list = await page.evaluate(() => {
            const wineCards = Array.from(document.querySelectorAll(`div.search-page__container .card`));
            return wineCards.map(wine => {
                const titleElement = wine.querySelector('.wine-card__name');
                const countrySectionElement = wine.querySelectorAll('.wine-card__region a');
                const averageContainers = wine.querySelectorAll('.average__container');
                const averageNumberElement = averageContainers[0].querySelector('.average__number');
                const averagePriceElement = averageContainers[1].querySelector('.wine-price');
                const numberOfRatingsElement = wine.querySelector('.average__stars .text-micro');
                return {
                    title: titleElement.innerText,
                    region: countrySectionElement[0].innerText,
                    country: countrySectionElement[1].innerText,
                    averageRating: parseFloat(averageNumberElement.innerText),
                    numberOfRatings: parseInt(numberOfRatingsElement.innerText),
                    averagePrice: parseFloat(averagePriceElement.innerText),
                };
            });
        });
        await browser.close();
        return list;
        // return list.filter(wine=>wine.);
    }
    catch (err) {
        return [];
    }
};
exports.getWinesDataFromVivino = getWinesDataFromVivino;
//# sourceMappingURL=scrap_data.js.map