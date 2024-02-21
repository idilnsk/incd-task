
import app from './App';
import { setupSwagger } from './swaggerSetup';

const startServer = async () => {
  try {

    if (process.env.NODE_ENV !== 'test') {
      setupSwagger(app);
      const port = process.env.PORT || 3000;

      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); 
  }
};

startServer();
