// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IAddress extends Document {
  id : string;
    user_id: string;
    name: string;
    street: string;
    details: string;
    maps_link: string;
}

const addressSchema = new Schema<IAddress>({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  street: { type: String, required: true },
  details: { type: String, required: true },
  maps_link: { type: String, required: true }
});

export default mongoose.model<IAddress>('Address', addressSchema);