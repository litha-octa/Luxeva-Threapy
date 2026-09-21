// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ITherapistProfile extends Document {
id : string;
user_id: string;
name: string;
speciality: string;
rate: number;
}

const therapistProfileSchema = new Schema<ITherapistProfile>({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  rate: { type: Number, required: true },
});

export default mongoose.model<ITherapistProfile>('TherapistProfile', therapistProfileSchema);