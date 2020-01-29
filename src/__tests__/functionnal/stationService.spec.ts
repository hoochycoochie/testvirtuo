import { Db } from '../../utils/db';

import { StationService } from '../../services/station.service';

beforeAll(async () => await Db.connect());

//afterEach(async () => await Db.clearDatabase());

afterAll(async () => {
  await Db.clearDatabase();
  await Db.closeDatabase();
});

describe('Station service ', () => {
  const stationData = {
    name: 'iPhone 11',
  };

  let station = null;
  const stationService = new StationService();
  it('can be created correctly', async () => {
    station = await stationService.save(stationData);

    expect(async () => station).toBeDefined();
  });

  it('can read Station by id', async () => {
    const stationFound = await stationService.read(station._id);
    expect(stationFound._id).toEqual(station._id);
  });

  it('can update Station', async () => {
    const data = { name: 'toto1' };
    const stationUpdated = await stationService.update(station._id, data);
    expect(stationUpdated.name).toEqual(data.name);
  });

  it('can find list of Stations', async () => {
    const stations = await stationService.find();

    expect(stations.docs).toBeInstanceOf(Array);
  });

  it("can be removed",async()=>{
      const removedStation = await stationService.remove(station._id);
      
      expect(removedStation.deletedCount).toEqual(1)
  })


  it('name should be at least 3 characters', async () => {
    try {
      await stationService.save({ name: 'a' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('name should be unique at least 3 characters', async () => {
    try {
      await stationService.save({ name: 'abcd' });
      await stationService.save({ name: 'abcd' });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
