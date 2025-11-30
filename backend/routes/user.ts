import express from 'express';
const router = express.Router();

import { RegisterUser, LoginUser } from '../controllers/user';

router.post('/register', RegisterUser);
router.post('/login', LoginUser);

export default router;