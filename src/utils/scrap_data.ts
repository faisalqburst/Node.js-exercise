import puppeteer, { Browser, Page } from 'puppeteer';
import { VIVINO_SEARCH_URL } from '../const/const';
import { Wine } from '../interfaces/wine.interface';

class ScrapData {
  public getWinesDataFromVivino = async (name: string): Promise<Wine[]> => {
    try {
      const browser: Browser = await puppeteer.launch({ headless: true });
      const page: Page = await browser.newPage();

      // setting user agent because puppeteer fails when setting headerless true
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

      // disable loading images in the browser to speed up execution
      await page.setRequestInterception(true);
      page.on('request', request => {
        if (request.resourceType() === 'image') request.abort();
        else request.continue();
      });

      await page.goto(`${VIVINO_SEARCH_URL}?q=${name ? name : '*'}`, { waitUntil: 'load', timeout: 0 });
      await page.waitForSelector('div.search-page__container');

      const list: Wine[] = await page.evaluate(() => {
        const wineCards = Array.from(document.querySelectorAll(`div.search-page__container .card`));
        return wineCards.map(wine => {
          const titleElement: HTMLElement = wine.querySelector('.wine-card__name');
          const countrySectionElement: NodeListOf<Element> = wine.querySelectorAll('.wine-card__region a');
          const averageContainers: NodeListOf<Element> = wine.querySelectorAll('.average__container');
          const averageNumberElement: HTMLElement = averageContainers[0].querySelector('.average__number');
          const averagePriceSecttion: HTMLElement = averageContainers[1].querySelector('.wine-price');
          const averagePriceElement: HTMLElement = averagePriceSecttion.querySelector('.wine-price-value');
          const pricePrefixElement: HTMLElement = averagePriceSecttion.querySelector('.wine-price-prefix');
          const numberOfRatingsElement: HTMLElement = wine.querySelector('.average__stars .text-micro');

          return <Wine>{
            title: titleElement.innerText,
            region: (<HTMLElement>countrySectionElement[0]).innerText,
            country: (<HTMLElement>countrySectionElement[1]).innerText,
            averageRating: parseFloat(averageNumberElement.innerText),
            numberOfRatings: parseInt(numberOfRatingsElement.innerText),
            averagePrice: parseFloat(averagePriceElement.innerText.replace(/[^0-9.-]+/g, '')),
            pricePrefix: pricePrefixElement.innerText,
          };
        });
      });

      await browser.close();
      return list;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
}

export default ScrapData;
