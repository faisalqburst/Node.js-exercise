import { NextFunction, Request, Response } from 'express';
import WineService from '../services/wine.service';

class WineController {
  public winService = new WineService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.query;
      const winesList = await this.winService.getWinesData(`${name}`);
      res.status(200).send(JSON.stringify(winesList));
    } catch (error) {
      next(error);
    }
  };
}

export default WineController;
