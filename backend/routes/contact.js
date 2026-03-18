import express from 'express';
import { submitContact } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - Submit contact form (DEPRECATED: Using Frontend EmailJS)
// router.post('/', submitContact);
router.post('/', (req, res) => {
  res.status(410).json({ 
    success: false, 
    message: 'This endpoint is deprecated. Use frontend EmailJS integration.' 
  });
});

export default router;
