import { Router } from 'express';
import WineController from '../controllers/wines.controller';
import { GetWinesDto } from '../dtos/wines.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class WinesRoute implements Route {
  public path = '/wines';
  public router = Router();
  public winesController = new WineController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, validationMiddleware(GetWinesDto, 'query', true), this.winesController.index);
  }
}

export default WinesRoute;
