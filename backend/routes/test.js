
import express from 'express';
import { submitTest, getUserResults } from '../controllers/testController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All test routes are protected
router.use(protect);

router.post('/submit', submitTest);
router.get('/results', getUserResults);

export default router;
