import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import validateToken from '../service/jwtHelperService';

export async function authorizeUser(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        const decodedToken: any = jwt.decode(token);
        if(await validateToken(decodedToken.payload.user_email, decodedToken.payload.user_id, req.body.userID)) {
            return next();
        }
        return res.status(401).json({ message: 'Invalid User' });
    } catch (error: any) {
        res.status(422).json({ error });
    }
}
