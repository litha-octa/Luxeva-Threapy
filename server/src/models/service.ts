// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IService extends Document {
  id : string;
  name: string;
    duration: number;
    price: number;
}

const serviceSchema = new Schema<IService>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true }
});

export default mongoose.model<IService>('Service', serviceSchema);