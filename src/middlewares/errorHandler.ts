import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error('Error Handling Middleware Invoked');
    console.error('Error Status:', err.status);
    console.error('Error Message:', err.message);

    if (!res.headersSent) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Internal Server Error',
        });
    }
}
