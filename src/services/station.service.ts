import BaseService from './base.service';
import Station from '../models/station';

export class StationService extends BaseService {
  constructor() {
    super(Station, '_id');
  }
}
