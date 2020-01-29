import { Db } from '../../utils/db';

import { CarService } from '../../services/car.service';

beforeAll(async () => await Db.connect());

//afterEach(async () => await Db.clearDatabase());

afterAll(async () => {
  await Db.clearDatabase();
  await Db.closeDatabase();
});

describe('Car service ', () => {
  const carData = {
    name: 'iPhone 11',
    available: true,
  };

  let car = null;
  const carService = new CarService();
  it('can be created correctly', async () => {
    car = await carService.save(carData);

    expect(async () => car._id).toBeDefined();
  });

  it('can read Car by id', async () => {
    const CarFound = await carService.read(car._id);
    expect(CarFound._id).toEqual(car._id);
  });

  it('can update Car', async () => {
    const data = { email: 'toto1@live.fr' };
    const carUpdated = await carService.update(car._id, data);
    expect(carUpdated.email).toEqual(data.email);
  });

  it('can find list of Cars', async () => {
    const cars = await carService.find();

    expect(cars.docs).toBeInstanceOf(Array);
  });

  it('can be removed', async () => {
    const removedService = await carService.remove(car._id);

    expect(removedService.deletedCount).toEqual(1);
  });

  it('name should be at least 3 characters', async () => {
    try {
      await carService.save({ name: 'a' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('name should be unique at least 3 characters', async () => {
    try {
      await carService.save({ name: 'abcd' });
      await carService.save({ name: 'abcd' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
