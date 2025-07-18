import mongoose from 'mongoose';
import { ResumeData } from '../../src/types/resume';

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: 'My Resume'
  },
  data: {
    type: Object as () => ResumeData,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Resume', ResumeSchema);
