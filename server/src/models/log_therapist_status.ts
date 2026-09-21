// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ILogTherapistStatus extends Document {
id : string;
name: string;
}

const logTherapistStatusSchema = new Schema<ILogTherapistStatus>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  
});

export default mongoose.model<ILogTherapistStatus>('LogTherapistStatus', logTherapistStatusSchema);