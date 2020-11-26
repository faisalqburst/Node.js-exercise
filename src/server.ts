import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import WinesRoute from './routes/wines.route';

const app = new App([new IndexRoute(), new WinesRoute()]);

app.listen();
