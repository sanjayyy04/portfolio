import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'portfolio_contact_form',
  },
);

export default mongoose.model('ContactMessage', contactMessageSchema);
