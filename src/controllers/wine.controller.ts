import { NextFunction, Request, Response } from 'express';

class WineController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(200).send('Wine API Working');
    } catch (error) {
      next(error);
    }
  };
}

export default WineController;
