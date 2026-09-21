// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface ITherapistLog extends Document {
id : string;
therapist_id: string;
order_id: string;
status_id: string;
}

const therapistLogSchema = new Schema<ITherapistLog>({
  id: { type: String, required: true, unique: true },
  therapist_id: { type: String, required: true },
  order_id: { type: String, required: true },
  status_id: { type: String, required: true },
});

export default mongoose.model<ITherapistLog>('TherapistLog', therapistLogSchema);