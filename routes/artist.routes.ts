import { Router } from "express";
const router = Router();

import * as artistController from '../controllers/artistas.controller';

router.get('/getRandom', artistController.getRandomArtists);
router.post('/', artistController.createArtist);
router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistsById);
router.delete('/:id', artistController.deleteArtistById);
router.put('/:id', artistController.updateArtistById);

export default router;