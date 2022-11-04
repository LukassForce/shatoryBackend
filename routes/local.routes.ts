import { Router } from "express";
const router = Router();

import * as localController from '../controllers/local.controller'

router.get('/', localController.getAllLocals);
router.post('/', localController.createLocal);
// router.post('/', artistController.createArtist);
// router.get('/', artistController.getAllArtists);
// router.get('/getByName', artistController.getArtistsByName);
// router.delete('/:id', artistController.deleteArtistById);
// router.put('/:id', artistController.updateArtistById);

export default router;