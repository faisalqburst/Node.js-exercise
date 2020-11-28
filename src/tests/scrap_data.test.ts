import { stubBrowser } from './mocks/mock.puppeteer';
import ScrapData from '../utils/scrap_data';
import { WineParams } from '../interfaces/params.interface';
import { WINE_EXPLORE_API_RESPONSE } from './data/wines/wineExploreApiResponse';
import { Wine } from '../interfaces/wine.interface';

jest.mock('puppeteer', () => ({
  launch() {
    return stubBrowser;
  },
}));

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(''), 500));
});

describe('Testing DataScrap class methods', () => {
  it('should generate url for searching', async () => {
    const url = getSearchUrl(1, 'malbec', null);
    expect(url).toBe(
      'https://www.vivino.com/api/explore/explore?country_code=US&currency_code=USD&grape_filter=varietal&order_by=ratings_average&order=desc&page=1&grape_ids[]=1&min_rating=1&price_range_min=10&price_range_max=40',
    );
    const url2 = getSearchUrl(2, 'malbec', null);
    expect(url2).toBe(
      'https://www.vivino.com/api/explore/explore?country_code=US&currency_code=USD&grape_filter=varietal&order_by=ratings_average&order=desc&page=2&grape_ids[]=1&min_rating=1&price_range_min=10&price_range_max=40',
    );
  });

  it('should have two grapes params in the url', () => {
    const url = getSearchUrl(1, 'malbec,merlot', 'Argentinian Malbec');
    expect(url).toBe(
      'https://www.vivino.com/api/explore/explore?country_code=US&currency_code=USD&grape_filter=varietal&order_by=ratings_average&order=desc&page=1&grape_ids[]=1&grape_ids[]=2&wine_style_ids[]=1&min_rating=1&price_range_min=10&price_range_max=40',
    );
  });

  it('should have wine types in the url', () => {
    const url = getSearchUrl(1, 'malbec', 'Argentinian Malbec');
    expect(url).toBe(
      'https://www.vivino.com/api/explore/explore?country_code=US&currency_code=USD&grape_filter=varietal&order_by=ratings_average&order=desc&page=1&grape_ids[]=1&wine_style_ids[]=1&min_rating=1&price_range_min=10&price_range_max=40',
    );
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
    const res = new ScrapData().appendParam('Pinot Noir', 'grape_ids[]', list);
    expect(res).toBe('&grape_ids[]=1');
    const res2 = new ScrapData().appendParam('Pinot Noir,Merlot', 'grape_ids[]', list);
    expect(res2).toBe('&grape_ids[]=1&grape_ids[]=2');
  });

  it('should append param as the passed string', () => {
    const res = new ScrapData().appendParam('IN', 'country_codes[]');
    expect(res).toBe('&country_codes[]=IN');
    const res2 = new ScrapData().appendParam('IN,US', 'country_codes[]');
    expect(res2).toBe('&country_codes[]=IN&country_codes[]=US');
  });

  it('should convert the api response to the wine response', () => {
    const res = new ScrapData().mapWinesToWineObjects(WINE_EXPLORE_API_RESPONSE?.explore_vintage?.matches);
    const expectedResult: Wine[] = [
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

const getSearchUrl = (page: number, grape: string, style: string) => {
  const scrapData = new ScrapData();
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
  const params: WineParams = {
    grapes: grape,
    maxPrice: 40,
    minPrice: 10,
    minRating: 1,
    wineStyles: style,
  };
  return scrapData.getVivinoSearchUrl(page, params);
};
