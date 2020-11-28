import puppeteer, { Browser, Page } from 'puppeteer';
import { VIVINO_GRAPES_API, VIVINO_SEARCH_URL, VIVINO_EXPLORE_API, WINES_PER_PAGE, VIVINO_WINE_STYLES_API, VIVINO_FOODS_API } from '../const/const';
import { REGIONS } from '../const/regions';
import { WINE_TYPES } from '../const/wine_types';
import { WineParams } from '../interfaces/params.interface';
import { EXPLORE_API_PARAMS } from '../enums/explore_api_params.enum';
import { Grape, Wine, WineStyle, Food } from '../interfaces/wine.interface';

class ScrapData {
  grapes: Grape[] = [];
  wineStyles: WineStyle[] = [];
  foods: Food[];

  appendParam = (param: string, queryKey: string, list: any = []) => {
    if (!param) {
      return '';
    }
    let queryString = '';
    const paramNames = param.split(',');
    paramNames.forEach(name => {
      if (list.length == 0) {
        queryString += `&${queryKey}=${name}`;
      } else {
        const obj = list.find((g: any) => g.name.toUpperCase().indexOf(name.toUpperCase()) > -1);
        if (obj) {
          queryString += `&${queryKey}=${obj.id}`;
        }
      }
    });
    return queryString;
  };

  getVivinoSearchUrl = (pageIndex: number, wineParams: WineParams): string => {
    wineParams.minPrice = isNaN(wineParams.minPrice) ? 0 : wineParams.minPrice;
    wineParams.maxPrice = isNaN(wineParams.maxPrice) ? 99999999 : wineParams.maxPrice;
    wineParams.minRating = isNaN(wineParams.minRating) ? 1 : wineParams.minRating;
    wineParams.orderBy = !wineParams.orderBy ? 'ratings_average' : wineParams.orderBy;

    let url = `${VIVINO_EXPLORE_API}?${EXPLORE_API_PARAMS.country_code}=US&${EXPLORE_API_PARAMS.currency_code}=USD&${EXPLORE_API_PARAMS.grape_filter}=varietal`;
    url += `&${EXPLORE_API_PARAMS.order_by}=${wineParams.orderBy}&${EXPLORE_API_PARAMS.order}=desc&${EXPLORE_API_PARAMS.page}=${pageIndex}`;
    url += this.appendParam(wineParams.grapes, EXPLORE_API_PARAMS.grape_ids, this.grapes);
    url += this.appendParam(wineParams.wineStyles, EXPLORE_API_PARAMS.wine_style_ids, this.wineStyles);
    url += this.appendParam(wineParams.foodPairings, EXPLORE_API_PARAMS.food_ids, this.foods);
    url += `&${EXPLORE_API_PARAMS.min_rating}=${wineParams.minRating}`;
    url += `&${EXPLORE_API_PARAMS.price_range_min}=${wineParams.minPrice}`;
    url += `&${EXPLORE_API_PARAMS.price_range_max}=${wineParams.maxPrice}`;
    if (wineParams.countryCodes) {
      url += this.appendParam(wineParams.countryCodes, EXPLORE_API_PARAMS.country_codes);
    }
    if (wineParams.regions) {
      url += this.appendParam(wineParams.regions, EXPLORE_API_PARAMS.region_ids, REGIONS);
    }
    if (wineParams.wineTypes) {
      url += this.appendParam(wineParams.wineTypes, EXPLORE_API_PARAMS.wine_type_ids, WINE_TYPES);
    }

    return url;
  };

  mapWinesToWineObjects(response: any = []): Wine[] {
    return response.map((wine: any) => {
      return {
        title: wine?.vintage?.name,
        vintage: wine?.vintage?.year,
        averagePrice: wine?.price?.amount,
        currency: wine?.price?.currency?.code,
        averageRating: wine?.vintage?.statistics?.ratings_average,
        numberOfRatings: wine?.vintage?.statistics?.ratings_count,
        imageUrl: wine?.vintage?.image?.location,
        region: wine?.vintage?.wine?.region?.name,
        country: wine?.vintage?.wine?.region?.country?.name,
        bottleVolume: wine?.price?.bottle_type?.volume_ml,
        discountPercent: wine?.price?.discount_percent,
      };
    });
  }

  getGrapes = async (page: Page): Promise<Grape[]> => {
    const grapesResponse = await page.evaluate(async apiUrl => {
      const cacheKey = localStorage.getItem('local_cache_key') + window['vivinoCacheKey'];
      return fetch(`${apiUrl}?cache_key=${cacheKey}`).then((res: any) => {
        return res.text().then((r: any) => JSON.parse(r));
      });
    }, VIVINO_GRAPES_API);
    return <Grape[]>grapesResponse?.grapes;
  };

  getWineStyles = async (page: Page): Promise<WineStyle[]> => {
    const wineStylesResponse = await page.evaluate(async apiUrl => {
      const cacheKey = localStorage.getItem('local_cache_key') + window['vivinoCacheKey'];
      return fetch(`${apiUrl}?cache_key=${cacheKey}`).then((res: any) => {
        return res.text().then((r: any) => JSON.parse(r));
      });
    }, VIVINO_WINE_STYLES_API);
    return wineStylesResponse?.wine_styles;
  };

  getFoods = async (page: Page): Promise<Food[]> => {
    const wineStylesResponse = await page.evaluate(async apiUrl => {
      const cacheKey = localStorage.getItem('local_cache_key') + window['vivinoCacheKey'];
      return fetch(`${apiUrl}?cache_key=${cacheKey}`).then((res: any) => {
        return res.text().then((r: any) => JSON.parse(r));
      });
    }, VIVINO_FOODS_API);
    return wineStylesResponse?.foods;
  };

  getAllWineListResponse = async (page: Page, wineParams: WineParams): Promise<Wine[]> => {
    const winesList: Wine[] = [];
    const firstPageResponse = await this.getWinesListResponsePerPage(page, 1, wineParams);
    const totalRecords = firstPageResponse?.records_matched;
    winesList.push(...this.mapWinesToWineObjects(firstPageResponse?.matches));
    const totalPagesToFetch = Math.ceil(totalRecords / WINES_PER_PAGE);
    for (let pageIndex = 2; pageIndex <= totalPagesToFetch; pageIndex++) {
      const response = await this.getWinesListResponsePerPage(page, pageIndex, wineParams);
      winesList.push(...this.mapWinesToWineObjects(response?.matches));
    }
    return winesList;
  };

  getWinesListResponsePerPage = async (page: Page, pageIndex: number, wineParams: WineParams): Promise<any> => {
    const url = this.getVivinoSearchUrl(pageIndex, wineParams);
    const grapesResponse = await page.evaluate(async url => {
      return fetch(url).then((res: any) => {
        return res.text().then((r: any) => JSON.parse(r));
      });
    }, url);
    return grapesResponse?.explore_vintage;
  };

  public getWinesDataFromVivino = async (wineParams: WineParams): Promise<Wine[]> => {
    try {
      const browser: Browser = await puppeteer.launch({ headless: false, timeout: 100000000 });
      const page: Page = await browser.newPage();

      // setting user agent because puppeteer fails when setting headerless true
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
      // disable loading images in the browser to speed up execution
      await page.setRequestInterception(true);
      page.on('request', request => {
        if (request.resourceType() === 'image') request.abort();
        else request.continue();
      });
      await page.goto(`${VIVINO_SEARCH_URL}`);
      await page.waitForSelector('.simpleLabel__selectedKey--11QuD');
      await page.click('.simpleLabel__selectedKey--11QuD');
      await page.click('.shipToDropdown__list--1_3yJ li:last-child a');
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      this.grapes = await this.getGrapes(page);
      this.wineStyles = await this.getWineStyles(page);
      this.foods = await this.getFoods(page);
      const winesListResponse = await this.getAllWineListResponse(page, wineParams);
      await browser.close();
      return winesListResponse;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
}

export default ScrapData;
