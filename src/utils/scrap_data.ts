import puppeteer, { Browser, Page } from 'puppeteer';
import { Wine } from '../interfaces/wine.interface';
export const getWinesDataFromVivino = async (name: string) => {
  try {
    const browser: Browser = await puppeteer.launch({ headless: false });
    const page: Page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image') request.abort();
      else request.continue();
    });
    await page.goto(`http://vivino.com/search/wines?q=${name ? name : '*'}`);
    await page.waitForSelector('div.search-page__container');

    const list: Wine[] = await page.evaluate(() => {
      const wineCards = Array.from(document.querySelectorAll(`div.search-page__container .card`));
      return wineCards.map(wine => {
        const titleElement: HTMLElement = wine.querySelector('.wine-card__name');
        const countrySectionElement: NodeListOf<Element> = wine.querySelectorAll('.wine-card__region a');
        const averageContainers: NodeListOf<Element> = wine.querySelectorAll('.average__container');
        const averageNumberElement: HTMLElement = averageContainers[0].querySelector('.average__number');
        const averagePriceElement: HTMLElement = averageContainers[1].querySelector('.wine-price');
        const numberOfRatingsElement: HTMLElement = wine.querySelector('.average__stars .text-micro');

        return <Wine>{
          title: titleElement.innerText,
          region: (<HTMLElement>countrySectionElement[0]).innerText,
          country: (<HTMLElement>countrySectionElement[1]).innerText,
          averageRating: parseFloat(averageNumberElement.innerText),
          numberOfRatings: parseInt(numberOfRatingsElement.innerText),
          averagePrice: parseFloat(averagePriceElement.innerText),
        };
      });
    });

    await browser.close();

    return list;
    // return list.filter(wine=>wine.);
  } catch (err) {
    return [];
  }
};
