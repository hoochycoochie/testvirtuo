import express, { Request, Response, NextFunction, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import { StationService } from '../services/station.service';

class CarController implements Controller {
  public path = '/stations';
  public router: Router = express.Router();
  private stationService = new StationService();

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
      const data = await this.stationService.find();

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.stationService.save(req.body);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.stationService.update(req.params.id, req.body);

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
      const data = await this.stationService.read(id,["cars"]);

      response.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  };
}

export default CarController;
