import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { runInNewContext } from 'vm';
import Station from './station';
const carSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    trim: true,
  },
  available: { type: Boolean },
  station: { type: Schema.Types.ObjectId, ref: 'stations' },
});

carSchema.plugin(mongoosePaginate);
// carSchema.pre('save', function(this: any, next: any): void {
//   const car = this;
//   if (car.station) {
//     const station = Station.findById(car.station);
//     if (!station) {
//       throw new Error('unknown station');
//     }
//   }
//   next();
// });

// carSchema.post('save', function(this: any, next: any): void {
//   const car = this;
//   if (car.station) {
//     const station = Station.findById(car.station);
//     //@ts-ignore
//     station.cars = [station.cars? [...station.cars,station]:station];
//     //@ts-ignore
//     station.update();
//   }
//   //@ts-ignore
//   next();
// });
const userModel = mongoose.model<mongoose.Document>('cars', carSchema);

export default userModel;
