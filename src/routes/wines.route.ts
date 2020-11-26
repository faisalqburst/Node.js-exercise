import { Router } from 'express';
import WineController from '../controllers/wines.controller';
import Route from '../interfaces/routes.interface';

class WinesRoute implements Route {
  public path = '/wines';
  public router = Router();
  public winesController = new WineController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.winesController.index);
  }
}

export default WinesRoute;
