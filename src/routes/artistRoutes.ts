import express from 'express';
import artistController from '../controllers/artistController';
const router = express.Router();



router.get('/', artistController.handleArtistSearchRequest  );

export default router;
