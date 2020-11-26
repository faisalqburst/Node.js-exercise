import { NextFunction, Request, Response } from 'express';
import WineService from '../services/wine.service';
import { paramToString } from '../utils/util';

class WineController {
  public wineService = new WineService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, minPrice, maxPrice, minRating, maxRating } = req.query;
      const winesList = await this.wineService.getWinesData(
        paramToString(name),
        parseFloat(paramToString(minRating)),
        parseFloat(paramToString(maxRating)),
        parseFloat(paramToString(minPrice)),
        parseFloat(paramToString(maxPrice)),
      );
      res.status(200).send(JSON.stringify(winesList));
    } catch (error) {
      next(error);
    }
  };
}

export default WineController;
