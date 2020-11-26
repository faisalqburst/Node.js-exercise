import request from 'supertest';
import App from '../app';
import WinesRoute from '../routes/wines.route';
import { stubBrowser } from './mocks/mock.puppeteer';
import { WINES, WINES_WITH_PRICE, WINES_WITH_PRICE_AND_MIN_RATING } from './data/wines/wines';

const winesRoute = new WinesRoute();

jest.mock('puppeteer', () => ({
  launch() {
    return stubBrowser;
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
      const app = new App([winesRoute]);
      return request(app.getServer())
        .get(`${winesRoute.path}`)
        .expect(200)
        .expect(`${JSON.stringify(WINES)}`);
    }, 50000);

    it('should return wines with price higher than or equal to 1000', async () => {
      const app = new App([winesRoute]);
      return request(app.getServer())
        .get(`${winesRoute.path}?minPrice=1000`)
        .expect(200)
        .expect(`${JSON.stringify(WINES_WITH_PRICE)}`);
    }, 50000);

    it('should return wines with price higher than 1000 and rating higher than or equal to 4.4', async () => {
      const app = new App([winesRoute]);
      return request(app.getServer())
        .get(`${winesRoute.path}?minPrice=1000&minRating=4.4`)
        .expect(200)
        .expect(`${JSON.stringify(WINES_WITH_PRICE_AND_MIN_RATING)}`);
    }, 50000);
  });
});
