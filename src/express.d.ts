import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any; // Puedes cambiar 'any' por un tipo más específico si lo conoces
        }
    }
}
