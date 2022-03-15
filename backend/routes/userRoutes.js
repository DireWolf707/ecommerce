import express from 'express';
import { login, signup ,userProfile, loginRequired } from '../controllers/authContoller.js';

const router = express.Router()

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/me').get(loginRequired, userProfile);

export default router