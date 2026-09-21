// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IPaymentMethod extends Document {
id : string;
name: string;
}

const paymentMethodSchema = new Schema<IPaymentMethod>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  
});

export default mongoose.model<IPaymentMethod>('PaymentMethod', paymentMethodSchema);