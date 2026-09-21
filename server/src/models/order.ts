// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
id : string;
user_id: string;
therapist_id: string;
schedule_at: Date;
address_id: string;
status: string;
payment_status: string;
payment_method: string;
created_at: Date;
updated_at: Date;


}

const orderSchema = new Schema<IOrder>({
  id: { type: String, required: true, unique: true },
    user_id: { type: String, required: true },
    therapist_id: { type: String, required: true },
    schedule_at: { type: Date, required: true },
    address_id: { type: String, required: true },
    status: { type: String, required: true },
    payment_status: { type: String, required: true },
    payment_method: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', orderSchema);