// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IPaymentStatus extends Document {
id : string;
name: string;
}

const paymentStatusSchema = new Schema<IPaymentStatus>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  
});

export default mongoose.model<IPaymentStatus>('PaymentStatus', paymentStatusSchema);