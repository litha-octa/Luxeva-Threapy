// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IOrderService extends Document {
id : string;
order_id: string;
service_id: string;
price: number;
}

const orderServiceSchema = new Schema<IOrderService>({
  id: { type: String, required: true, unique: true },
  order_id: { type: String, required: true },
  service_id: { type: String, required: true },
  price: { type: Number, required: true },
  
});

export default mongoose.model<IOrderService>('OrderService', orderServiceSchema);