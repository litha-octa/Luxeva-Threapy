// models/Service.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IRole extends Document {
id : string;
name: string;
}

const roleSchema = new Schema<IRole>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  
});

export default mongoose.model<IRole>('Role', roleSchema);