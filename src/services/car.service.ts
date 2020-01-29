import BaseService from './base.service';
import Car from '../models/car';

export class CarService extends BaseService {
  constructor() {
    super(Car, '_id');
  }
}
