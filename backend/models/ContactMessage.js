import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactSchema);
export default ContactMessage;
