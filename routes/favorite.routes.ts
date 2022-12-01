import { Router } from "express";
const router = Router();

import * as favoriteController from '../controllers/favorite.controller';

router.post('/addFavorite', favoriteController.addFav);
router.get('/getFavorite/:rut', favoriteController.getFavByRut);

export default router;