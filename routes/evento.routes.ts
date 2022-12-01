import { Router } from "express";
const router = Router();

import * as eventoController from '../controllers/evento.controller';

router.post('/addEvento', eventoController.addEvento);
router.get('/getEvento/:id', eventoController.getEventoById);
router.get('/getAllEvento', eventoController.getAllEvento);
router.delete('/deleteEvento/:id', eventoController.deleteEventoById);
router.put('/updateEvento/:id', eventoController.updateEventoById);

export default router;