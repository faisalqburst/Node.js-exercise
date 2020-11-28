import { stubBrowser } from './mocks/mock.puppeteer';
import WineService from '../services/wine.service';
import { WINES } from './data/wines/wines';

jest.mock('puppeteer', () => ({
  launch() {
    return stubBrowser;
  },
}));

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(''), 500));
});

describe('Testing Wines Service', () => {
  it('should recieve grapes as parameter', async () => {
    const res = await new WineService().getWinesData({
      grapes: null,
    });
    expect(res).toBe('Please enter the grape name');
  });

  it('should filter data with minNoRatings and maxNoRatings if those params are given', async () => {
    const wines = new WineService().filterWinesAccordingToNumberOfRatings(WINES, {
      minNoRatings: 10,
      maxNoRatings: 100,
      grapes: 'malbec',
    });
    const check = wines.filter(w => w.numberOfRatings < 10 && w.numberOfRatings > 100);
    expect(check.length).toBe(0);
  });
});
