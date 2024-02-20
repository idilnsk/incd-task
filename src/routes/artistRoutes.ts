import express from 'express';
import artistController from '../controllers/artistController';
const router = express.Router();
import { Request, Response, NextFunction } from 'express';



router.get('/', artistController.searchArtist);

export default router;
