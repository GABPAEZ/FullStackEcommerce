//middlewares para permitir que solos los usuarios con token y utenticados puedan crear productos
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export function verifyToken(req: Request, res: Response, next: NextFunction) {
    
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ error: 'Access denied' })
        return;
    }
    try {

        //decodo jwt token data
        const decoded = jwt.verify(token, 'your-secret');
        if (typeof decoded !== 'object' || !decoded?.userId) {
            res.status(401).json({ error: 'Access denied' })
        }
        //console.log(decoded);
        req.userId = decoded?.userId;
        req.role = decoded?.role;

        next();
        
    } catch (error) {
        res.status(401).json({ error: 'Access denied' })
    }

}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
    const role = req.role;
    if (role != 'seller') {
        res.status(401).json({ error: 'Access denied' })
        return;
    }
    next();
}