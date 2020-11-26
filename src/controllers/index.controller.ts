import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(200).send("API Working")
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
