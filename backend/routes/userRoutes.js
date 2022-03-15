import express from 'express';
import { login, signup ,userProfile, loginRequired, logout, userUpdate, passwordUpdate } from '../controllers/authContoller.js';

const router = express.Router()

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/signup').post(signup);

router.route('/me')
    .get(loginRequired, userProfile)
    .put(loginRequired, userUpdate)
    .post(loginRequired, passwordUpdate);

export default router