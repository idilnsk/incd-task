import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Incedo assignment',
      version: '1.0.0',
      description: 'api integration',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.ts', './swagger.yaml'],
};

const swaggerSpec = swaggerJsDoc(options);

export function setupSwagger(app:any) {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}
