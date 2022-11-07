import { Router } from "express";
const router = Router();

import * as artistController from '../controllers/artistas.controller';

router.post('/', artistController.createArtist);
router.get('/', artistController.getAllArtists);
router.get('/getArtistByName', artistController.getArtistsByName);
router.delete('/:id', artistController.deleteArtistById);
router.put('/:id', artistController.updateArtistById);

export default router;