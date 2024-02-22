import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import errorHandler from './errorHandler';

describe('Error Handling Middleware', () => {
    it('should handle errors correctly', async () => {
        const app = express();

        // A test route that deliberately throws an error
        app.get('/test', (req: Request, res: Response, next: NextFunction) => {
            const err: any = new Error('Test Error');
            err.status = 400;
            next(err);
        });

        app.use(errorHandler);

        const response = await request(app).get('/test');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            success: false,
            message: 'Test Error',
        });
    });
});
