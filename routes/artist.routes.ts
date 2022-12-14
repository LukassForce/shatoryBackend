import { Router } from "express";
const router = Router();

import * as artistController from '../controllers/artistas.controller';

router.get('/getRandom', artistController.getRandomArtists);
router.post('/', artistController.createArtist);
router.get('/', artistController.getAllArtists);
router.get('/getArtistById/:id', artistController.getArtistsById);
router.delete('/deleteArtistById/:id', artistController.deleteArtistById);
router.put('/updateArtistById/:id', artistController.updateArtistById);

export default router;