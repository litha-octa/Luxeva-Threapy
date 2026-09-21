// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IUsers extends Document {
  id : string;
  username: string;  
  password: string;
  fullname: string;
  email: string; 
  role_id: string;
  phone: string;
  createdAt: Date;
}

const userSchema = new Schema<IUsers>({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
  role_id: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUsers>('User', userSchema);