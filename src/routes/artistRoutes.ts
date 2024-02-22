import express from 'express';
import artistController from '../controllers/artistController';
const router = express.Router();


// Defines a route to handle GET requests to the root endpoint.

router.get('/', artistController.handleArtistSearchRequest  );

export default router;