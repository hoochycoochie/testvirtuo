import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { CarService } from '../services/car.service';

class CarController implements Controller {
  public path = '/cars';
  public router: Router = express.Router();
  private carService = new CarService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,

      this.find
    );
    this.router.post(
      `${this.path}`,

      this.create
    );
    this.router.get(
      `${this.path}/:id`,

      this.read
    );

    this.router.put(
      `${this.path}/:id`,

      this.update
    );
  }

  private find = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.carService.find();

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.carService.save(req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.carService.update(req.params.id, req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private read = async (
    req: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params && req.params.id ? req.params.id : null;
      const data = await this.carService.read(id,["station"]);

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default CarController;
