import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Email address is not valid.' });
  }

  try {
    const contact = await ContactMessage.create({ name, email, subject, message });
    return res.status(201).json({ success: true, message: 'Message sent successfully.', data: { id: contact._id } });
  } catch (error) {
    console.error('Contact save error:', error);
    return res.status(500).json({ success: false, message: 'Unable to save your message right now.' });
  }
});

export default router;
