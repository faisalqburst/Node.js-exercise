import { NextFunction, Request, Response } from 'express';
import WineService from '../services/wine.service';
import { paramToString } from '../utils/util';

class WineController {
  public wineService = new WineService();

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        grapes,
        minPrice,
        maxPrice,
        minRating,
        minNoRatings,
        maxNoRatings,
        wineStyles,
        foodPairings,
        countryCodes,
        regions,
        wineTypes,
        orderBy,
        order,
      } = req.query;
      const winesList = await this.wineService.getWinesData({
        grapes: paramToString(grapes),
        minRating: parseFloat(paramToString(minRating)),
        minPrice: parseFloat(paramToString(minPrice)),
        maxPrice: parseFloat(paramToString(maxPrice)),
        minNoRatings: parseFloat(paramToString(minNoRatings)),
        maxNoRatings: parseFloat(paramToString(maxNoRatings)),
        wineStyles: paramToString(wineStyles),
        foodPairings: paramToString(foodPairings),
        countryCodes: paramToString(countryCodes),
        regions: paramToString(regions),
        wineTypes: paramToString(wineTypes),
        orderBy: paramToString(orderBy),
        order: paramToString(order),
      });
      res.status(200).send(JSON.stringify(winesList));
    } catch (error) {
      next(error);
    }
  };
}

export default WineController;
