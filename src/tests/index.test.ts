import request from 'supertest';
import App from '../app';
import IndexRoute from '../routes/index.route';

const indexRoute = new IndexRoute();

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(''), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const app = new App([indexRoute]);

      return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
    });
  });
});
