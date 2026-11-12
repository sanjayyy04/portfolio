import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(100, 'Name must be 100 characters or fewer.'),
  email: z.string().trim().email('Enter a valid email address.').max(254, 'Email must be 254 characters or fewer.'),
  message: z.string().trim().min(1, 'Message is required.').max(4000, 'Message must be 4000 characters or fewer.'),
}).strict();

const submissionLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many messages. Please wait a little while before trying again.' },
});

router.post('/', submissionLimit, async (req, res, next) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Please check the form fields and try again.',
      fields: result.error.issues.map(({ path, message }) => ({
        field: path[0],
        message,
      })),
    });
  }

  try {
    await ContactMessage.create(result.data);
    return res.status(201).json({ message: 'Your message was sent successfully.' });
  } catch (error) {
    return next(error);
  }
});

export default router;
