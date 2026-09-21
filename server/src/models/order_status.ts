// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IOrderStatus extends Document {
id : string;
name: string;
}

const orderStatusSchema = new Schema<IOrderStatus>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  
});

export default mongoose.model<IOrderStatus>('OrderStatus', orderStatusSchema);