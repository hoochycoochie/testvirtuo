import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const stationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    trim: true,
  },
  cars: [{ type: Schema.Types.ObjectId, ref: 'cars', default: [] }],
});

stationSchema.plugin(mongoosePaginate);
const Station = mongoose.model<mongoose.Document>('stations', stationSchema);

export default Station;
