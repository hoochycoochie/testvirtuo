import 'dotenv/config';
import mongoose from 'mongoose';
import App from './app';
import CarController from './controllers/car.controller';
import StationController from './controllers/station.controller';

process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});

process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
});
(async () => {
  try {
    const HOST = process.env.MONGO_HOST || 'localhost';
    await mongoose.connect(`mongodb://${HOST}:27017/testnode`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App([new CarController(), new StationController()]);
  app.listen();
})();
