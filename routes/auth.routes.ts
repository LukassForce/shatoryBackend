import { Router } from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller';
import * as checkSignUp from '../middlewares/checkSignUp';
import * as checkToken from '../middlewares/checkToken';

router.post('/signIn', authController.signIn);
router.post('/signUp', [checkSignUp.checkDuplicateUser], authController.signUp);
//router.get('/profile', [checkToken.checkToken], authController.getProfile);
router.get('/getAllProfile', authController.listar);

router.get('/getProfile', [checkToken.checkToken], authController.getProfile);

export default router;