import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });


import express from 'express';

import artistRoutes from './routes/artistRoutes';
import  errorHandler  from './middlewares/errorHandler';



const app = express();



app.get('/', (req, res) => {
  
  res.send('Welcome to the API');
});

app.use(express.json());

app.use('/api/artists', artistRoutes);

app.use(errorHandler);

export default app;
