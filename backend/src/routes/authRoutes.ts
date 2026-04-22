import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', protect, admin, registerUser);

export default router;
